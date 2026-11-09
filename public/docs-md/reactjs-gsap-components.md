---
title: "Shadcn GSAP Components"
description: "Free shadcn/ui components animated with GSAP for React and Tailwind CSS. Many also ship a Motion build. Install them with the shadcn CLI."
url: https://avaraui.com/docs/nextjs/gsap-components
---

# Shadcn GSAP Components

Free shadcn/ui components and blocks animated with GSAP, for React and Tailwind
CSS. Motion that follows the pointer, the scroll position, a drag or the layout
runs on GSAP; many of these also ship a Motion build that you install instead.

## All GSAP components

**Forms & Inputs**

- [File Upload](https://avaraui.com/docs-md/nextjs-file-upload.md): A highly-orchestrated, premium file upload component suite based on modern UX engineering principles. (Motion build available)

**Navigation & Menus**

- [Dock](https://avaraui.com/docs-md/nextjs-dock.md): A premium, macOS-inspired navigation dock featuring real-time physics magnification, floating label tooltips, active application indicators, and… (Motion build available)

**Layout & Containers**

- [Masonry Grid](https://avaraui.com/docs-md/nextjs-masonry-grid.md): A high-performance masonry layout that tightly packs items of varying heights. (Motion build available)

**Cards & Stacks**

- [Card Stack](https://avaraui.com/docs-md/nextjs-card-stack.md): A layered deck of cards featuring fluid drag-to-discard gestures, button-driven directional slide animations, and realistic depth perspective. (Motion build available)
- [Draggable Card List](https://avaraui.com/docs-md/nextjs-draggable-card-list.md): An interactive, fluid Draggable Card List component featuring spring-driven reordering (in a GSAP build and a Motion build that move identically),… (Motion build available)
- [Folder](https://avaraui.com/docs-md/nextjs-folder.md): A tactile folder — unified skeleton cards (or your own photos) tuck behind a frosted-glass front pocket. (Motion build available)
- [Memories Card](https://avaraui.com/docs-md/nextjs-memories-card.md): A premium, interactive card stack component featuring real-time 3D tilt physics, a dynamic "fan" background spread, and smooth swipe-to-next gestures. (Motion build available)
- [Scroll Stack](https://avaraui.com/docs-md/nextjs-scroll-stack.md): A premium collection of scroll-driven 3D card stacking layouts engineered exclusively with GSAP's ScrollTrigger plugin. (Motion build available)

**Data Display**

- [Split-Flap Display](https://avaraui.com/docs-md/nextjs-split-flap.md): An authentic, physics-driven Split-Flap Display component (Solari board) simulating retro-mechanical flap cards, 3D perspective flips (`rotateX`),…

**Media & Carousels**

- [3D Carousel](https://avaraui.com/docs-md/nextjs-3d-carousel.md): A premium 3D carousel with a fanned layout, smooth interactive animations, and a sleek adaptive aesthetic. (Motion build available)
- [Gallery](https://avaraui.com/docs-md/nextjs-gallery.md): A dynamic visual showcase featuring six interactive variants: a revolving 3D circular photo orbit ring, an interactive 3D video sphere gallery, a…

**Apps & Messaging**

- [Ai-Chat](https://avaraui.com/docs-md/nextjs-ai-chat.md): A premium, interactive LLM chat interface featuring conversation history management, real-time typing indicators, editable chat titles, and a full… (Motion build available)

**Marketing Sections**

- [Newsletter](https://avaraui.com/docs-md/nextjs-newsletter.md): A sign-up section in three layouts. Portraits puts four readers' faces around a centred form on a soft panel and lets them drift with the pointer. (Motion build available)

**More Sections**

- [Top Destinations](https://avaraui.com/docs-md/nextjs-top-destinations.md): A dual-row scroll-driven destination showcase. As the user scrolls down the page, two parallel rows of destination cards travel in opposite…

## Which components use GSAP?

The ones listed above. Avara UI uses plain CSS for motion that has fixed
values, and adds GSAP only where a pointer, scroll, drag or layout calls for a
library. A component that lists a Motion build can be installed either way.

## Can I use Motion instead of GSAP?

Where a component shows a Motion build, yes. Install the Motion build, named like
`@avara-ui/name-motion`, in place of the default one. They
write the same file, so install one or the other, never both. Each component's
page has GSAP and Motion tabs with the code for both.

## How do I install a GSAP component?

Register the registry once, then add the component with
`npx shadcn@latest add @avara-ui/name`. The CLI also installs
the `gsap` package it needs. See the
[Installation guide](https://avaraui.com/docs/reactjs/installation) for the one-time setup.

---

Live previews and every example: https://avaraui.com/docs/nextjs/gsap-components
