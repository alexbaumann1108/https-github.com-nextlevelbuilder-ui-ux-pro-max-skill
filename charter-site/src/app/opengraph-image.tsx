import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name}: private boat and yacht charters`;
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
          justifyContent: "flex-end",
          padding: 72,
          color: "white",
          background:
            "linear-gradient(180deg, #78acd3 0%, #dbe9f2 52%, #154a73 52.2%, #0b2236 100%)",
        }}
      >
        <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900 }}>
          The open water, privately yours.
        </div>
        <div style={{ height: 2, width: "100%", background: "#c8a96b", marginTop: 36 }} />
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.9 }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
