# Flowchart / Node Builder

A declarative, highly sleek flowchart engine complete with custom responsive column channels, node action anchors, and custom vector streaming lines animated smoothly via GSAP.

This engine separates data flow layout orchestration from canvas tracking. By combining declarative standard layout structures with pre-set micro connection vectors, pipelines render cross-device flawlessly without heavy calculations crashing client frame updates.

## Interactive Showcase

Use the control panel below to switch vector streaming color accents. Click on any node element containing a connected data line to automatically toggle the system pipeline's active streaming loop route!

## Installation

### Dependencies

This layout block depends explicitly on **GSAP** for the vector draw-in and spring element entrance scaling sequences.

```bash
npm install gsap
```

### Copy the Component

You can copy the full engine code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/FlowchartBlock.tsx.

## Usage

Construct your nodes using clear column containers. The `` container operates floating overlays where individual `` blocks translate paths using native SVG instructions (M for Move, C for Cubic Bezier).

```tsx

export default function AutomationMap() {
  return (

  );
}
```

---

**Component Path:** `nextjs\flowchart\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
