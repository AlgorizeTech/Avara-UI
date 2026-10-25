export const metadata = docsPageMetadata("error-section");

# Error Section

A full-page, responsive Cyberpunk Diagnostic Terminal section designed for root application error boundaries, Next.js `error.tsx` / `global-error.tsx`, and dedicated maintenance pages.

Features a full-width terminal enclosure, diagnostic monitors, adaptive light & dark mode styling, live stacktrace inspector, and one-click incident copying.

export const usageDefault = `import { ErrorSection } from "@/components/custom/blocks/ErrorSectionBlock";

export default function ErrorPage() {
  return (
     window.location.reload()}
      onHome={() => window.location.href = "/"}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/error-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/error-section
```

## Features

Discover the key capabilities of the `ErrorSection` component:

    Cyberpunk Diagnostic Enclosure
    Full-width futuristic telemetry console with macOS window indicators, pulsating status badge, and glowing holographic crash icon.

    Adaptive Light & Dark Modes
    Clean high-contrast daytime mode alongside an immersive deep obsidian cyberpunk nocturnal theme with red spotlights.

    Live Stacktrace Console & Copy
    Scroll-safe diagnostic trace terminal with one-click clipboard copying for quick bug triage and escalation.

    Mobile Touch-Friendly Layout
    Responsive action buttons and fluid typography that automatically adapt from compact 320px smartphones to widescreen monitors.

## Props Reference

        Prop
        Type
        Default
        Description

        errorCode
        string
        "500"
        Primary error code or HTTP status string displayed on the status telemetry badge.

        title
        string
        "SYSTEM RUNTIME EXCEPTION"
        Primary uppercase diagnostic heading.

        description
        string
        "Critical process halted..."
        User-friendly explanatory message explaining why execution was suspended.

        errorId
        string
        "ERR_0x9481FA"
        Unique incident trace or digest identifier for diagnostics.

        errorDetails
        string
        sample stacktrace
        Raw stacktrace or diagnostic technical dump rendered inside the expandable code console.

        onRetry
        () =&gt; void
        undefined
        Callback invoked when user clicks the "Reboot System" action button.

        onHome
        () =&gt; void
        undefined
        Callback invoked when user clicks the "Return Home" action button.

        onSupport
        () =&gt; void
        undefined
        Callback invoked when user clicks the "Contact Escalation Team" link.

        className
        string
        ""
        Custom Tailwind CSS class overrides for the container section.

---

**Component Path:** `[framework]\error-section\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
