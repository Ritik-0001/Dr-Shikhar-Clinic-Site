import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const dataUri = (mime: string, file: Buffer) => `data:${mime};base64,${file.toString("base64")}`;

/** Default social-share card (WhatsApp, Facebook, LinkedIn, X...): logo, tagline and the clinic's areas. */
export default async function OpengraphImage() {
  const [logo, emblem] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/logo-horizontal.png")),
    readFile(path.join(process.cwd(), "public/brand/emblem-reversed.svg")),
  ]);
  const line = { fontSize: 92, lineHeight: 1.03, fontWeight: 700, letterSpacing: -2 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 72px",
          background:
            "radial-gradient(circle at 92% 0%, rgba(240,207,160,0.6), rgba(250,245,236,0) 42%), radial-gradient(circle at 0% 100%, rgba(246,205,188,0.85), rgba(250,245,236,0) 40%), #faf5ec",
          position: "relative",
        }}
      >
        {/* brand arch: blush offset behind, navy arch with the emblem in front */}
        <div style={{ position: "absolute", right: 66, top: 78, width: 380, height: 430, display: "flex", borderRadius: "190px 190px 36px 36px", background: "#f8c9bd" }} />
        <div
          style={{
            position: "absolute",
            right: 90,
            top: 54,
            width: 380,
            height: 430,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "190px 190px 36px 36px",
            background: "linear-gradient(160deg, #1b3f78 0%, #0a1f3f 55%, #0a1f3f 100%)",
          }}
        >
          {/* Satori (ImageResponse) renders plain <img>; next/image does not apply here. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUri("image/svg+xml", emblem)} width={176} height={224} alt="" style={{ marginBottom: 24 }} />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={dataUri("image/png", logo)} width={500} height={130} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ ...line, color: "#0e1d33" }}>Healthy Teeth.</div>
          <div style={{ ...line, color: "#c3262f" }}>Happy Life.</div>
          <div style={{ ...line, color: "#0e1d33" }}>Confident You.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 30, fontWeight: 700, color: "#2c3d57" }}>
          <div style={{ display: "flex", padding: "14px 30px", borderRadius: 999, background: "#c3262f", color: "#ffffff" }}>Book an appointment</div>
          <div style={{ display: "flex" }}>Nikol, Ahmedabad · Dhrangadhra</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
