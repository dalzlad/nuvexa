import { ImageResponse } from "next/og";

import { site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: "#ffffff",
          color: "#161a2c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#4144d4" />
            <path
              d="M10.5 21.5v-11l11 11v-11"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: "0.14em" }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: 64, fontWeight: 600, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "900px" }}>
            Software que simplifica la operación de tu negocio.
          </div>
          <div style={{ fontSize: 28, color: "#5b6078", maxWidth: "900px" }}>{site.description}</div>
        </div>
      </div>
    ),
    size,
  );
}
