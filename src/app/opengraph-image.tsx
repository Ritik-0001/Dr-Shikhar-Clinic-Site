import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { TOOTH_PATH } from "@/components/icons/dental-icons";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Default social-share card (WhatsApp, Facebook, LinkedIn, X…): logo, tagline and the clinic's areas. */
export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public/brand/logo-horizontal.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const line = { fontSize: 96, lineHeight: 1.02, fontWeight: 700, letterSpacing: -2 } as const;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(135deg, #ffffff 0%, #eaf1fb 58%, #d7e5f8 100%)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: 64, top: 64, width: 420, height: 500, display: "flex", borderRadius: "210px 210px 44px 44px", background: "linear-gradient(180deg, #c7daf2 0%, #f3f7fd 100%)" }} />
        <svg width="330" height="330" viewBox="6 4 36 38" style={{ position: "absolute", right: 110, top: 150 }}>
          <path d={TOOTH_PATH} fill="#ffffff" stroke="#7fa6dc" strokeWidth="0.55" />
        </svg>
        <div style={{ position: "absolute", right: 250, top: 40, display: "flex", gap: 10, alignItems: "flex-end" }}>
          <div style={{ width: 54, height: 54, borderRadius: 27, background: "#c3262f" }} />
          <div style={{ width: 34, height: 34, borderRadius: 17, background: "#c3262f", marginBottom: 4 }} />
          <div style={{ width: 54, height: 54, borderRadius: 27, background: "#16478c" }} />
        </div>

        {/* Satori (ImageResponse) renders plain <img>; next/image does not apply here. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={520} height={135} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ ...line, color: "#16478c" }}>Healthy Teeth.</div>
          <div style={{ ...line, color: "#c3262f" }}>Happy Life.</div>
          <div style={{ ...line, color: "#16478c" }}>Confident You.</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700, color: "#33445c" }}>
          <div style={{ display: "flex", padding: "14px 28px", borderRadius: 999, background: "#c3262f", color: "#ffffff" }}>Book an appointment</div>
          <div style={{ display: "flex" }}>Nikol, Ahmedabad · Dhrangadhra</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
