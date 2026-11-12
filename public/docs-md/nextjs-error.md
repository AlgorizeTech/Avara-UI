---
title: "Shadcn Error Page"
description: "A full-page error section in a terminal style, built for Next.js error.tsx and global-error.tsx boundaries and for maintenance pages. Free shadcn/ui Error Page."
url: https://avaraui.com/docs/nextjs/error
---

# Shadcn Error Page

A full-page, responsive Cyberpunk Diagnostic Terminal, Modern Animated Orbital Radar, Interactive Service Pipeline Topology, Quantum Glitch Bento HUD, and Prismatic Aurora Glass section designed for root application error boundaries, Next.js `error.tsx` / `global-error.tsx`, and dedicated maintenance pages.

Features full-width terminal enclosures, interactive network topology flows, chromatic glitch bento HUDs, floating prismatic aurora glass crystals, diagnostic monitors, adaptive light & dark mode styling, live stacktrace inspectors, and one-click incident copying.

## For AI agents

**Ask before you pick.** This page has 5 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 5 options as live previews: https://avaraui.com/view/error

**When to use it.** Error page sections for root application error boundaries, Next.js error.tsx, and system failure screens.

**Gotchas:**

- Install `error` once; choose between the cyberpunk terminal, modern orbital pulse, service pipeline topology, quantum glitch bento HUD, and prismatic aurora glass via `variant`.

### The 5 variants

1. **Cyberpunk Terminal** (`terminal`): Full-width futuristic telemetry enclosure with Mac window indicators, crash icon, and technical trace console.
   - Live: https://avaraui.com/view/error/terminal
   - Best for: developer platforms, cyber/tech apps, and root error boundaries needing technical telemetry
   - Avoid if: you want a soft, minimalist, or non-technical presentation
   - Traits: terminal chrome, stacktrace console, incident hash copy
   - Install: `npx shadcn@latest add @avara-ui/error`
   - Docs: https://avaraui.com/docs/nextjs/error#cyberpunk-terminal-section
2. **Quantum Glitch Bento HUD** (`quantum-glitch`): High-tech command center HUD featuring chromatic aberration glitch typography, live crash vitals, and memory hex dump.
   - Live: https://avaraui.com/view/error/quantum-glitch
   - Best for: cutting-edge developer tools, AI platforms, cloud infrastructure, and cyber-tech applications
   - Avoid if: you prefer an orbital circular radar or simple terminal console
   - Traits: chromatic glitch typography, system vitals telemetry, memory hex dump, bento HUD layout
   - Install: `npx shadcn@latest add @avara-ui/error`
   - Set these props: `{"variant":"quantum-glitch"}`
   - Docs: https://avaraui.com/docs/nextjs/error#quantum-glitch-bento-hud
3. **Modern Animated Pulse** (`modern-animated`): Ultra-modern animated orbital radar with counter-rotating rings, sweeping radar, and micro-health monitors.
   - Live: https://avaraui.com/view/error/modern-animated
   - Best for: SaaS platforms, modern web apps, and polished production error boundaries
   - Avoid if: you prefer dense terminal console output over clean visual aesthetics
   - Traits: animated orbital rings, conic radar sweep, micro-service monitors, expandable trace drawer
   - Install: `npx shadcn@latest add @avara-ui/error`
   - Set these props: `{"variant":"modern-animated"}`
   - Docs: https://avaraui.com/docs/nextjs/error#modern-animated-orbital-pulse
4. **Service Pipeline Topology** (`service-pipeline`): Interactive animated network topology and pipeline failure state with live heartbeat flatline and remediation playbook.
   - Live: https://avaraui.com/view/error/service-pipeline
   - Best for: cloud platforms, API services, microservices architecture, and DevOps developer portals
   - Avoid if: you prefer a dense terminal console or circular radar over topology flows
   - Traits: animated topology flow, heartbeat flatline, remediation playbook, pipeline telemetry
   - Install: `npx shadcn@latest add @avara-ui/error`
   - Set these props: `{"variant":"service-pipeline"}`
   - Docs: https://avaraui.com/docs/nextjs/error#service-pipeline-topology
5. **Prismatic Aurora Glass** (`prismatic-glass`): Glassmorphic floating crystal with spinning rainbow refraction halo, liquid aurora glow, and micro-mesh status pills.
   - Live: https://avaraui.com/view/error/prismatic-glass
   - Best for: modern SaaS, design-led web apps, AI studios, and consumer platforms needing an elegant aesthetic
   - Avoid if: you prefer dense terminal code blocks or raw cyberpunk command lines
   - Traits: prismatic halo spin, floating diamond glass, liquid aurora glow, gradient code typography
   - Install: `npx shadcn@latest add @avara-ui/error`
   - Set these props: `{"variant":"prismatic-glass"}`
   - Docs: https://avaraui.com/docs/nextjs/error#prismatic-aurora-glass

## Cyberpunk Terminal Section

- `errorCode="500"` displays the error status code or exception type.
- `errorId="ERR_0x9481FA"` unique incident trace ID for diagnostic debugging.

```tsx
"use client";



const variant: ErrorVariant = "terminal";

const sampleStacktrace: string = `Error: Critical Kernel Exception (0x9481FA)
  at runWorkerPipeline (/app/core/worker.ts:142:19)
  at async processBatchQueue (/app/queue/dispatcher.ts:89:12)
  at async ClusterManager.dispatchTask (/app/cluster/manager.ts:312:7)`;

export default function ErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ErrorSection
      variant={variant}
      errorCode="500"
      title="SYSTEM RUNTIME EXCEPTION"
      description={
        error?.message ||
        "Critical process halted due to an unhandled kernel exception. Memory buffers preserved for telemetry diagnostics."
      }
      errorId={error?.digest || "ERR_0x9481FA"}
      errorDetails={sampleStacktrace}
      onRetry={() => (reset ? reset() : window.location.reload())}
      onHome={() => (window.location.href = "/")}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/error.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/error
```

## Variations

### Modern Animated Orbital Pulse

An ultra-modern, interactive glassmorphic error canvas featuring concentric counter-rotating orbital rings, sweeping radar beam, live micro-service health monitors, and interactive stacktrace diagnostics.

- `variant="modern-animated"` activates the modern animated orbital radar layout with glassmorphic cards and live telemetry.
- `errorCode="500"` displays the error status code or exception type.
- `errorId="ERR_0x9481FA"` unique incident trace ID for diagnostic triage.

```tsx
"use client";



const variant: ErrorVariant = "modern-animated";

const services: ServiceStatusItem[] = [
  {
    name: "API Gateway",
    status: "operational",
    latency: "24ms",
  },
  {
    name: "Auth Cluster",
    status: "degraded",
    latency: "182ms",
  },
  {
    name: "PostgreSQL Primary",
    status: "outage",
    latency: "ERR",
  },
];

export default function ModernErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ErrorSection
      variant={variant}
      errorCode="500"
      title="UNEXPECTED SYSTEM ANOMALY"
      description={
        error?.message ||
        "An unhandled runtime disruption interrupted the telemetry pipeline. Critical memory states were safely captured for telemetry diagnostics."
      }
      errorId={error?.digest || "ERR_0x9481FA"}
      services={services}
      onRetry={() => (reset ? reset() : window.location.reload())}
      onHome={() => (window.location.href = "/")}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}
```

### Service Pipeline Topology

An architectural, interactive service topology flow featuring animated SVG signal beams, live node health checks, point-of-failure alert ripple, heartbeat flatline telemetry, and remediation playbook.

- `variant="service-pipeline"` activates the interactive service pipeline topology layout with connected animated node beams and heartbeat monitor.
- `errorCode="500"` displays the error status code or exception type.
- `errorId="ERR_0x9481FA"` unique incident trace ID for diagnostic triage.

```tsx
"use client";



const variant: ErrorVariant = "service-pipeline";

const pipelineNodes: ServiceStatusItem[] = [
  {
    name: "Edge CDN",
    status: "operational",
    latency: "12ms",
  },
  {
    name: "GraphQL Gateway",
    status: "operational",
    latency: "38ms",
  },
  {
    name: "Data Ingestion Pipeline",
    status: "outage",
    latency: "TIMEOUT",
  },
  {
    name: "Distributed Store",
    status: "degraded",
    latency: "240ms",
  },
];

export default function PipelineErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ErrorSection
      variant={variant}
      errorCode="500"
      title="SERVICE PIPELINE INTERRUPTED"
      description={
        error?.message ||
        "A critical downstream node failed during request execution. The pipeline halted safely to isolate fault propagation."
      }
      errorId={error?.digest || "ERR_0x9481FA"}
      services={pipelineNodes}
      onRetry={() => (reset ? reset() : window.location.reload())}
      onHome={() => (window.location.href = "/")}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}
```

### Quantum Glitch Bento HUD

A high-tech command center HUD featuring multi-layer chromatic aberration glitch typography, live crash vitals progress telemetry, interactive memory segment hex dump, and collapsible diagnostic drawer.

- `variant="quantum-glitch"` activates the 2-column bento command center HUD with chromatic glitch effect and system vitals telemetry.
- `errorCode="500"` displays the error status code or exception type.
- `errorId="ERR_0x9481FA"` unique incident trace ID for diagnostic triage.

```tsx
"use client";



const variant: ErrorVariant = "quantum-glitch";

const crashDump: string = `[CRASH_DUMP:0x9481FA]
SEGMENT: 0x7FFF004B (READ_VIOLATION)
INSTRUCTION: MOV QWORD PTR [RAX+0x18], RDX
FAULTING_MODULE: kernel-allocator.sys (build 24.1.0)
STATUS: CORRUPTED_PAGE_TABLE_ENTRY`;

export default function GlitchErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ErrorSection
      variant={variant}
      errorCode="500"
      title="KERNEL EXECUTION ANOMALY"
      description={
        error?.message ||
        "High-priority execution thread encountered an unrecoverable kernel panic. Isolation protocols engaged to preserve system integrity."
      }
      errorId={error?.digest || "ERR_0x9481FA"}
      errorDetails={crashDump}
      onRetry={() => (reset ? reset() : window.location.reload())}
      onHome={() => (window.location.href = "/")}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}
```

### Prismatic Aurora Glass

An ultra-clean, elegant glassmorphic error canvas featuring a floating diamond glass crystal, rotating rainbow refraction halo ring, liquid aurora glow, and micro-mesh telemetry pills.

- `variant="prismatic-glass"` activates the prismatic aurora glass layout with spinning refraction halo and floating diamond gem.
- `errorCode="500"` displays the error status code or exception type.
- `errorId="ERR_0x9481FA"` unique incident trace ID for diagnostic triage.

```tsx
"use client";



const variant: ErrorVariant = "prismatic-glass";

const prismServices: ServiceStatusItem[] = [
  {
    name: "Refraction Core",
    status: "operational",
    latency: "18ms",
  },
  {
    name: "Memory Shards",
    status: "degraded",
    latency: "142ms",
  },
  {
    name: "Aurora Pipeline",
    status: "outage",
    latency: "ERR",
  },
];

const diagnosticTrace: string = `[PRISM_RUNTIME_FAULT]
Thread: #04 (MeshRefractionRenderer)
State: PipelineFrozen (SealedMemoryBuffer)
Checksum: 0x9481FA_CRC32_VERIFIED
Remediation: Automated recovery protocol queued`;

export default function PrismaticErrorPage({
  error,
  reset,
}: {
  error?: Error & { digest?: string };
  reset?: () => void;
}) {
  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  return (
    <ErrorSection
      variant={variant}
      errorCode="500"
      title="UNRESOLVED SYSTEM STATE"
      description={
        error?.message ||
        "A transient disruption fractured the runtime pipeline. Cryptographic memory buffers remain sealed and preserved for triage."
      }
      errorId={error?.digest || "ERR_0x9481FA"}
      errorDetails={diagnosticTrace}
      services={prismServices}
      onRetry={() => (reset ? reset() : window.location.reload())}
      onHome={() => (window.location.href = "/")}
      onSupport={() => window.open("/support", "_blank")}
    />
  );
}
```

## Features

Discover the key capabilities of the `ErrorSection` component:

### Prismatic Aurora Glass

Floating diamond glass crystal with counter-rotating rainbow refraction halo, liquid aurora glow, and frosted status pills.

### Chromatic Glitch Bento HUD

Two-column command center with layered chromatic aberration glitch typography, memory overflow bars, and hex dump inspector.

### Service Topology & Heartbeat

Interactive 4-node architectural pipeline with animated signal beams, failed-node ripple alert, and real-time flatline ECG waveform.

### Actionable Remediation Playbook

Tabbed diagnostic drawer pairing raw technical error stacktraces with numbered step-by-step resolution checklists for engineers.

### Modern Animated Orbital Pulse

Concentric counter-rotating orbital rings with sweeping radar scanner beam, floating satellite beads, and breathing luminous focal halo.

### Live Micro-Service Health Monitors

Dynamic status indicator cards for API Gateway, Worker Nodes, and Database Shards with real-time latency badges.

### Cyberpunk Diagnostic Enclosure

Full-width futuristic telemetry console with macOS window indicators, pulsating status badge, and glowing holographic crash icon.

### Live Stacktrace Console & Copy

Scroll-safe diagnostic trace terminal with one-click clipboard copying for quick bug triage and escalation.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"terminal" \| "modern-animated" \| "service-pipeline" \| "quantum-glitch" \| "prismatic-glass"` | `"terminal"` | Visual layout variant: `"terminal"` for the cyberpunk diagnostic enclosure, `"modern-animated"` for orbital radar, `"service-pipeline"` for service topology flow, `"quantum-glitch"` for chromatic glitch HUD, or `"prismatic-glass"` for prismatic aurora crystal. |
| `errorCode` | `string` | `"500"` | Primary error code or HTTP status string displayed on the status telemetry badge. |
| `title` | `string` | `"SYSTEM RUNTIME EXCEPTION"` | Primary uppercase diagnostic heading. |
| `description` | `string` | `"Critical process halted..."` | User-friendly explanatory message explaining why execution was suspended. |
| `errorId` | `string` | `"ERR_0x9481FA"` | Unique incident trace or digest identifier for diagnostics. |
| `errorDetails` | `string` | `sample stacktrace` | Raw stacktrace or diagnostic technical dump rendered inside the expandable code console. |
| `services` | `ServiceStatusItem[]` | `default telemetry array` | Custom micro-service health items (name, status, latency) displayed on the live telemetry cards in the modern variant. |
| `onRetry` | `() => void` | `undefined` | Callback invoked when user clicks the "Reboot System" or "Attempt Auto-Recovery" action button. |
| `onHome` | `() => void` | `undefined` | Callback invoked when user clicks the "Return Home" action button. |
| `onSupport` | `() => void` | `undefined` | Callback invoked when user clicks the "Contact Escalation Team" link. |
| `className` | `string` | `""` | Custom Tailwind CSS class overrides for the container section. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/error
