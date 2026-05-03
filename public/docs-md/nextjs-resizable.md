# Resizable

A high-performance system for building resizable panel layouts, complete with keyboard accessibility and nested group support.

Most UI frameworks rely on massive, complex external libraries to handle the math of dragging panels. This `ResizableBlock` uses a sophisticated direct-DOM manipulation engine instead. By directly writing to `element.style.flex`, it bypasses the React render cycle during drag operations, resulting in **zero-latency, 60fps butter-smooth resizing** without sacrificing declarative React composition.

## Interactive Showcase

Grab the vertical or horizontal handle bars below to resize the panels.

**Accessibility built-in:** Try clicking on one of the grab handles to focus it, and then use the `ArrowLeft`, `ArrowRight`, `ArrowUp`, or `ArrowDown` keys on your keyboard to resize the panels precisely!

---

## Installation

### Copy the Component

This engine is **100% dependency-free**. It relies entirely on standard React refs and browser DOM APIs for calculations and accessibility attributes.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/ResizableBlock.tsx`.

---

## Usage

This component utilizes highly composable parts. A `` establishes the flex direction, and contains `` elements separated by `` elements.

You can nest groups infinitely to build complex grids (like VS Code or complex dashboards).

```tsx

export default function DashboardLayout() {
  return (
    // The outermost container must have a defined height

          Navigation Links

          Main Application Data

  );
}
```

---

**Component Path:** `nextjs\resizable\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
