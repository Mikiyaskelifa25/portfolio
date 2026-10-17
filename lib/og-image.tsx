import { ImageResponse } from "next/og";
import { site } from "@/data/portfolio";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name} — ${site.title}`;

/**
 * Shared Open Graph / Twitter card image, rendered at build time.
 * Uses inline styles only (required by Satori).
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#06070a",
          color: "#eef1ec",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(900px 500px at 15% 0%, rgba(124,108,255,0.28), transparent 60%), radial-gradient(700px 420px at 90% 100%, rgba(198,242,77,0.20), transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              backgroundColor: "#c6f24d",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: 26,
              letterSpacing: 8,
              color: "#8e9793",
              textTransform: "uppercase",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -4 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, color: "#c6f24d", letterSpacing: -1 }}>
            {site.title}
          </div>
          <div style={{ fontSize: 28, color: "#b9c1bc", maxWidth: 900 }}>
            Web applications, AI tools and SaaS products — built end to end.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 24,
            color: "#8e9793",
          }}
        >
          <div style={{ display: "flex" }}>{site.location}</div>
          <div style={{ display: "flex" }}>{site.email || "MK."}</div>
        </div>
      </div>
    ),
    size,
  );
}
