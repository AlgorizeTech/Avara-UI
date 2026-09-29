import { ImageResponse } from "next/og";

import { siteConfig } from "@/config/site";
import { COMPONENT_COUNT } from "@/lib/docs-source";

export const dynamic = "force-static";

/**
 * /og-image.png — the social card every page links to.
 *
 * Rendered at build time from the site's own name and count, so it cannot go
 * stale and there is no binary to keep in sync. Replace this route with a
 * designed PNG in /public if one is ever made; delete the route first, since
 * Next.js will not serve a file and a route at the same path.
 */

const WIDTH = 1200;
const HEIGHT = 630;

/** The docs' default lavender preset. */
const ACCENT = "#9B8AFB";

export function GET() {
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
          background: "#0B0B10",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: ACCENT,
            }}
          />
          <div style={{ fontSize: "40px", fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "72px", fontWeight: 700, lineHeight: 1.05 }}>
            {`${COMPONENT_COUNT} React components`}
          </div>
          <div style={{ fontSize: "34px", color: "rgba(255,255,255,0.6)", lineHeight: 1.3 }}>
            Installed straight into your project by the shadcn CLI.
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px", fontSize: "26px", color: ACCENT }}>
          <span>React</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span>Tailwind CSS v4</span>
          <span style={{ color: "rgba(255,255,255,0.3)" }}>·</span>
          <span>shadcn registry</span>
        </div>
      </div>
    ),
    { width: WIDTH, height: HEIGHT },
  );
}
