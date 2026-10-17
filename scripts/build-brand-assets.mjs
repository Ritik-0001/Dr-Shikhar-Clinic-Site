#!/usr/bin/env node
/**
 * Brand asset pipeline
 * --------------------
 * The client supplied two flat JPEG logos on a black background (a Gujarati and an English
 * wordmark sharing one emblem). A JPEG on black can't sit on a web page, so this script:
 *
 *   1. measures the exact brand red / blue from the artwork,
 *   2. un-mixes each colour from the black background into its own alpha mask
 *      (so anti-aliased edges stay clean, no black halos),
 *   3. traces the masks to vector paths (potrace) → crisp at any size and only a few KB,
 *   4. writes SVG logos (full-colour + "reversed" for dark backgrounds), PNG fallbacks,
 *      the favicon set and the web-app manifest icons.
 *
 * Run with `npm run brand`. Sources: assets/brand/source/*  →  Outputs: public/brand/* and src/app/*
 * The originals are never modified.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import potrace from "potrace";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets/brand/source");
const OUT_DIR = path.join(ROOT, "public/brand");
const APP_DIR = path.join(ROOT, "src/app");

/**
 * `splitY` is the empty horizontal band between the emblem (above) and the wordmark (below),
 * found by scanning each source for fully-black rows.
 */
const SOURCES = {
  gujarati: { file: "shree-hari-dental-care_logo_gujarati_source.jpeg", splitY: 898 },
  english: { file: "shree-hari-dental-care_logo_english_source.jpeg", splitY: 952 },
};

const REVERSED_BLUE = "#ffffff"; // brand blue has no contrast on navy, so it flips to white
const REVERSED_RED = "#ff5a64"; // brand red lifted slightly so it still reads on navy
const UPSCALE = 2; // trace at 2x so thin strokes get smooth curves

/* -------------------------------------------------------------------------------------------- */
/* helpers                                                                                      */
/* -------------------------------------------------------------------------------------------- */

const hex = (c) => "#" + c.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const median = (values) => values.slice().sort((a, b) => a - b)[Math.floor(values.length / 2)];

/** Median colour of "solid" pixels matching a predicate, robust against JPEG noise. */
function measureColour(rgb, predicate) {
  const r = [], g = [], b = [];
  for (let i = 0; i < rgb.length; i += 3) {
    if (predicate(rgb[i], rgb[i + 1], rgb[i + 2])) {
      r.push(rgb[i]); g.push(rgb[i + 1]); b.push(rgb[i + 2]);
    }
  }
  return [median(r), median(g), median(b)];
}

/**
 * Solves  pixel ≈ a·RED + b·BLUE  per pixel (least squares), i.e. how much of each brand
 * colour is present, on top of the black background. Returns two alpha maps in 0..1.
 */
function unmix(rgb, width, height, red, blue) {
  const rr = red[0] * red[0] + red[1] * red[1] + red[2] * red[2];
  const bb = blue[0] * blue[0] + blue[1] * blue[1] + blue[2] * blue[2];
  const rb = red[0] * blue[0] + red[1] * blue[1] + red[2] * blue[2];
  const det = rr * bb - rb * rb;
  const alphaRed = new Float32Array(width * height);
  const alphaBlue = new Float32Array(width * height);
  for (let p = 0, i = 0; p < width * height; p++, i += 3) {
    const rp = red[0] * rgb[i] + red[1] * rgb[i + 1] + red[2] * rgb[i + 2];
    const bp = blue[0] * rgb[i] + blue[1] * rgb[i + 1] + blue[2] * rgb[i + 2];
    const a = (bb * rp - rb * bp) / det;
    const b = (rr * bp - rb * rp) / det;
    alphaRed[p] = a < 0.12 ? 0 : Math.min(a, 1); // < 0.12 is JPEG haze, not artwork
    alphaBlue[p] = b < 0.12 ? 0 : Math.min(b, 1);
  }
  return { alphaRed, alphaBlue };
}

function bounds(alpha, width, y0, y1, cutoff = 0.5) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < width; x++) {
      if (alpha[y * width + x] >= cutoff) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { x0: minX, y0: minY, x1: maxX + 1, y1: maxY + 1 };
}

const union = (a, b) => ({
  x0: Math.min(a.x0, b.x0), y0: Math.min(a.y0, b.y0),
  x1: Math.max(a.x1, b.x1), y1: Math.max(a.y1, b.y1),
});

/** Re-maps every coordinate pair in a potrace path (M/L/C/Z, absolute) and rounds to 1 decimal. */
function transformPath(d, scale, tx, ty) {
  const tokens = d.match(/[MLCZ]|-?\d*\.?\d+/g) ?? [];
  const out = [];
  let isX = true;
  for (const token of tokens) {
    if (/[MLCZ]/.test(token)) {
      out.push(token);
      isX = true;
    } else {
      const v = parseFloat(token);
      out.push(((isX ? v * scale + tx : v * scale + ty)).toFixed(1).replace(/\.0$/, ""));
      isX = !isX;
    }
  }
  // join: letters stay attached to following number, numbers separated by space
  return out.join(" ").replace(/([MLCZ]) /g, "$1").replace(/ ([MLCZ])/g, "$1");
}

function tracePath(grayPng) {
  return new Promise((resolve, reject) => {
    const tracer = new potrace.Potrace({ threshold: 128, turdSize: 3, alphaMax: 1, optTolerance: 0.55 });
    tracer.loadImage(grayPng, function (err) {
      if (err) return reject(err);
      try {
        resolve(/ d="([^"]*)"/.exec(this.getPathTag("#000"))[1]);
      } catch (e) {
        reject(e);
      }
    });
  });
}

/** Traces one colour layer inside `box` (source pixel space) → path in source pixel space. */
async function traceLayer(alpha, width, box, pad = 6) {
  const x0 = Math.max(0, box.x0 - pad), y0 = Math.max(0, box.y0 - pad);
  const w = box.x1 + pad - x0, h = box.y1 + pad - y0;
  const gray = Buffer.alloc(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      gray[y * w + x] = 255 - Math.round(alpha[(y0 + y) * width + (x0 + x)] * 255);
    }
  }
  const png = await sharp(gray, { raw: { width: w, height: h, channels: 1 } })
    .resize(w * UPSCALE, h * UPSCALE, { kernel: "lanczos3" })
    .png()
    .toBuffer();
  const d = await tracePath(png);
  return transformPath(d, 1 / UPSCALE, x0, y0);
}

const svgDoc = (box, layers, { title, pad = 2 } = {}) => {
  const x = +(box.x0 - pad).toFixed(1), y = +(box.y0 - pad).toFixed(1);
  const w = +(box.x1 - box.x0 + pad * 2).toFixed(1), h = +(box.y1 - box.y0 + pad * 2).toFixed(1);
  const paths = layers.filter((l) => l.d).map((l) => `<path fill="${l.fill}" fill-rule="evenodd" d="${l.d}"/>`).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${x} ${y} ${w} ${h}" width="${w}" height="${h}" role="img"` +
    `${title ? ` aria-label="${title}"` : ""}>${title ? `<title>${title}</title>` : ""}${paths}</svg>`
  );
};

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + " KB";

/** Minimal ICO writer: packs PNG frames into a .ico (PNG-in-ICO is valid for all modern browsers). */
function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(frames.length, 4);
  let offset = 6 + frames.length * 16;
  const entries = frames.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2); e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8); e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...frames.map((f) => f.data)]);
}

/* -------------------------------------------------------------------------------------------- */
/* main                                                                                         */
/* -------------------------------------------------------------------------------------------- */

await fs.mkdir(OUT_DIR, { recursive: true });
const written = [];
const write = async (rel, data) => {
  const file = path.join(ROOT, rel);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, data);
  written.push(`${rel}  (${(Buffer.byteLength(data) / 1024).toFixed(1)} KB)`);
};

const parts = {};
let measured;

for (const [name, { file, splitY }] of Object.entries(SOURCES)) {
  const { data, info } = await sharp(path.join(SRC_DIR, file)).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // 1. measure the brand colours once (from the English file, both files share the palette)
  if (!measured) {
    const red = measureColour(data, (r, g, b) => r > 140 && g < 90 && b < 90);
    const blue = measureColour(data, (r, g, b) => b > 110 && r < 70 && g < 120);
    measured = { red, blue, redHex: hex(red), blueHex: hex(blue) };
    console.log(`Measured brand colours → red ${measured.redHex}, blue ${measured.blueHex}`);
  }

  // 2. un-mix into per-colour alpha masks
  const { alphaRed, alphaBlue } = unmix(data, width, height, measured.red, measured.blue);

  // 3. trace emblem (rows above splitY) and wordmark (rows below), per colour
  const regions = { emblem: [0, splitY], wordmark: [splitY, height] };
  parts[name] = {};
  for (const [region, [y0, y1]] of Object.entries(regions)) {
    const box = union(bounds(alphaRed, width, y0, y1), bounds(alphaBlue, width, y0, y1));
    parts[name][region] = {
      box,
      red: await traceLayer(alphaRed, width, box),
      blue: await traceLayer(alphaBlue, width, box),
    };
  }
}

const BRAND = { red: measured.redHex, blue: measured.blueHex };
const palettes = {
  "": { red: BRAND.red, blue: BRAND.blue },
  "-reversed": { red: REVERSED_RED, blue: REVERSED_BLUE },
};

const emblemEn = parts.english.emblem;
const emblemGu = parts.gujarati.emblem;
const wordEn = parts.english.wordmark;
const wordGu = parts.gujarati.wordmark;
const NAME_EN = "Shree Hari Dental Care";
const NAME_GU = "શ્રી હરિ ડેન્ટલ કેર";

const layersOf = (part, pal) => [
  { d: part.blue, fill: pal.blue },
  { d: part.red, fill: pal.red },
];

// Horizontal lock-up (emblem left, English wordmark right) for headers/footers.
// Built from the client's own traced artwork, only re-arranged, never redrawn.
const emblemH = emblemGu.box.y1 - emblemGu.box.y0;
const emblemW = emblemGu.box.x1 - emblemGu.box.x0;
const WORDMARK_H_RATIO = 0.74; // wordmark height relative to emblem height
const wordScale = (emblemH * WORDMARK_H_RATIO) / (wordEn.box.y1 - wordEn.box.y0);
const gap = emblemH * 0.12;
const wordW = (wordEn.box.x1 - wordEn.box.x0) * wordScale;
const horizontalBox = { x0: 0, y0: 0, x1: emblemW + gap + wordW, y1: emblemH };
const wordTx = emblemW + gap - wordEn.box.x0 * wordScale;
const wordTy = (emblemH - (wordEn.box.y1 - wordEn.box.y0) * wordScale) / 2 - wordEn.box.y0 * wordScale;

const rebase = (part, scale, tx, ty) => ({
  red: transformPath(part.red, scale, tx, ty),
  blue: transformPath(part.blue, scale, tx, ty),
});
const emblemInH = rebase(emblemGu, 1, -emblemGu.box.x0, -emblemGu.box.y0);
const wordInH = rebase(wordEn, wordScale, wordTx, wordTy);

const svgs = {};
for (const [suffix, pal] of Object.entries(palettes)) {
  svgs[`emblem${suffix}`] = svgDoc(emblemGu.box, layersOf(emblemGu, pal), { title: "SHDC emblem" });
  svgs[`wordmark-english${suffix}`] = svgDoc(wordEn.box, layersOf(wordEn, pal), { title: NAME_EN });
  svgs[`wordmark-gujarati${suffix}`] = svgDoc(wordGu.box, layersOf(wordGu, pal), { title: NAME_GU });
  svgs[`logo-stacked-english${suffix}`] = svgDoc(
    union(emblemEn.box, wordEn.box),
    [...layersOf(emblemEn, pal), ...layersOf(wordEn, pal)],
    { title: NAME_EN },
  );
  svgs[`logo-stacked-gujarati${suffix}`] = svgDoc(
    union(emblemGu.box, wordGu.box),
    [...layersOf(emblemGu, pal), ...layersOf(wordGu, pal)],
    { title: NAME_GU },
  );
  svgs[`logo-horizontal${suffix}`] = svgDoc(
    horizontalBox,
    [
      { d: emblemInH.blue, fill: pal.blue }, { d: emblemInH.red, fill: pal.red },
      { d: wordInH.blue, fill: pal.blue }, { d: wordInH.red, fill: pal.red },
    ],
    { title: NAME_EN },
  );
}

for (const [name, svg] of Object.entries(svgs)) await write(`public/brand/${name}.svg`, svg);

// PNG fallbacks (transparent) for email signatures, social profiles, print-outs, etc.
const png = (svg, width) => sharp(Buffer.from(svg), { density: 300 }).resize({ width }).png({ compressionLevel: 9 }).toBuffer();
await write("public/brand/emblem.png", await png(svgs.emblem, 512));
await write("public/brand/logo-horizontal.png", await png(svgs["logo-horizontal"], 1200));
await write("public/brand/logo-stacked-english.png", await png(svgs["logo-stacked-english"], 1000));
await write("public/brand/logo-stacked-gujarati.png", await png(svgs["logo-stacked-gujarati"], 1000));

// App icons: emblem on white so it stays legible on dark browser chrome and iOS home screens.
const emblemInner = svgs.emblem.replace(/^<svg[^>]*>/, "").replace(/<\/svg>$/, "").replace(/<title>.*?<\/title>/, "");
const iconSvg = (size, padRatio, radiusRatio) => {
  const { x0, y0, x1, y1 } = emblemGu.box;
  const ew = x1 - x0, eh = y1 - y0;
  const inner = size * (1 - padRatio * 2);
  const s = Math.min(inner / ew, inner / eh);
  const tx = (size - ew * s) / 2 - x0 * s, ty = (size - eh * s) / 2 - y0 * s;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">` +
    `<rect width="${size}" height="${size}" rx="${size * radiusRatio}" fill="#ffffff"/>` +
    `<g transform="translate(${tx.toFixed(2)} ${ty.toFixed(2)}) scale(${s.toFixed(5)})">${emblemInner}</g></svg>`
  );
};
await write("src/app/icon.svg", iconSvg(128, 0.1, 0.22));
await write("src/app/apple-icon.png", await sharp(Buffer.from(iconSvg(180, 0.14, 0)), { density: 300 }).resize(180, 180).png({ compressionLevel: 9 }).toBuffer());
await write("public/icons/icon-192.png", await sharp(Buffer.from(iconSvg(192, 0.12, 0)), { density: 300 }).resize(192, 192).png({ compressionLevel: 9 }).toBuffer());
await write("public/icons/icon-512.png", await sharp(Buffer.from(iconSvg(512, 0.12, 0)), { density: 300 }).resize(512, 512).png({ compressionLevel: 9 }).toBuffer());
// maskable: emblem kept inside the central 60% "safe zone"
await write("public/icons/icon-maskable-512.png", await sharp(Buffer.from(iconSvg(512, 0.22, 0)), { density: 300 }).resize(512, 512).png({ compressionLevel: 9 }).toBuffer());
const icoFrames = [];
for (const size of [16, 32, 48]) {
  icoFrames.push({ size, data: await sharp(Buffer.from(iconSvg(size * 4, 0.06, 0.2)), { density: 300 }).resize(size, size).png().toBuffer() });
}
await write("src/app/favicon.ico", buildIco(icoFrames));

// Handy for the design tokens in globals.css
await write(
  "assets/brand/brand-colors.json",
  JSON.stringify({ red: BRAND.red, blue: BRAND.blue, reversedRed: REVERSED_RED, reversedBlue: REVERSED_BLUE }, null, 2) + "\n",
);

console.log("\nWritten:\n  " + written.join("\n  "));
console.log("\nHorizontal lock-up aspect ratio:", (horizontalBox.x1 / horizontalBox.y1).toFixed(3));
console.log("SVG sizes:", Object.entries(svgs).map(([k, v]) => `${k}=${kb(v)}`).join(", "));
