import { ImageResponse } from "next/og";

// Edge build of @vercel/og: the Node build trips on Windows paths with
// spaces during static export, and edge routes skip build-time prerender.
export const runtime = "edge";
export const alt = "N Sanjay Rao — AI / GenAI Engineer. RAG, agents, and LLM evaluation.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RED = "#FF463C";
const INK = "#EDEDEB";
const FAINT = "#8A8A88";

export default async function OgImage() {
  // Ndot57-og.otf = Ndot57 with its ltag table stripped; satori's bundled
  // opentype.js crashes on the original ("ltagTable is not defined").
  const ndot = await fetch(new URL("./fonts/Ndot57-og.otf", import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0A0A0A",
          backgroundImage: "radial-gradient(circle, rgba(237,237,235,0.14) 2px, transparent 2.5px)",
          backgroundSize: "44px 44px",
          padding: "56px 64px",
          fontFamily: "Ndot",
          color: INK,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 26,
            color: FAINT,
          }}
        >
          <span>PORTFOLIO — 2026</span>
          <span>HYDERABAD, IN</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 1 }}>N SANJAY</div>
          <div style={{ display: "flex", fontSize: 150, lineHeight: 1 }}>
            RAO<span style={{ color: RED }}>.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid #282828`,
            paddingTop: 28,
            fontSize: 28,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 14, height: 14, backgroundColor: RED }} />
            <span>AI / GENAI ENGINEER</span>
          </div>
          <span style={{ color: FAINT }}>RAG · AGENTS · EVALS</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Ndot", data: ndot, style: "normal", weight: 400 }],
    }
  );
}
