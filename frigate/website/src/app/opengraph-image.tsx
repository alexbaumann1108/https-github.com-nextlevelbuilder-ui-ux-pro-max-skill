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
            "linear-gradient(180deg, #e9d6bb 0%, #f4ead9 52%, #8b6440 52.2%, #3e2e21 100%)",
        }}
      >
        <div style={{ fontSize: 76, lineHeight: 1.05, maxWidth: 900 }}>
          The open water, privately yours.
        </div>
        <div style={{ height: 2, width: "100%", background: "#c9a47a", marginTop: 36 }} />
        <div style={{ fontSize: 30, marginTop: 28, opacity: 0.9 }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
