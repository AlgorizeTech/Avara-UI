---
title: "Shadcn Motion Components"
description: "Free shadcn/ui components animated with Motion (Framer Motion) for React and Tailwind CSS. Each is a twin of a GSAP build. Install them with the shadcn CLI."
url: https://avaraui.com/docs/nextjs/motion-components
---

# Shadcn Motion Components

Free shadcn/ui components animated with Motion (the library formerly called
Framer Motion), for React and Tailwind CSS. Each one is a twin of a
[GSAP component](https://avaraui.com/docs/reactjs/gsap-components): same props, same file,
different animation library.

## All Motion components

**Forms & Inputs**

- [File Upload](https://avaraui.com/docs-md/nextjs-file-upload.md): A file upload suite featuring a drag-and-drop `Dropzone` + `UploadItem` queue, `InputBlock` file mode, and an interactive `Folder` drop target. (Motion build available)

**Navigation & Menus**

- [Dock](https://avaraui.com/docs-md/nextjs-dock.md): A macOS-inspired navigation dock (`Dock`) with pointer magnification physics, floating label tooltips, active-app indicators, and notification badges… (Motion build available)

**Layout & Containers**

- [Masonry Grid](https://avaraui.com/docs-md/nextjs-masonry-grid.md): A CSS multi-column masonry layout (`MasonryGrid`) with staggered blur-fade scroll entrances in both GSAP and Motion builds. (Motion build available)

**Cards & Stacks**

- [Card Stack](https://avaraui.com/docs-md/nextjs-card-stack.md): A layered card deck (`CardStack`) with drag-to-discard swipes, previous and next buttons, optional looping, and a choice of GSAP or Motion builds. (Motion build available)
- [Draggable Card List](https://avaraui.com/docs-md/nextjs-draggable-card-list.md): A reorderable card list with spring-driven dragging, grip handles and status badges, in GSAP and Motion builds. (Motion build available)
- [Folder](https://avaraui.com/docs-md/nextjs-folder.md): A tactile folder (`Folder`, `SkeletonCard`) with a 3D frosted-glass pocket, OKLCH color-derived shades, and fanned card previews on hover, tap, or… (Motion build available)
- [Memories Card](https://avaraui.com/docs-md/nextjs-memories-card.md): An interactive 3D-tilting photo card stack (`MemoriesCard`) with a fanned background deck, drag-to-cycle gestures, and `onCardChange` index tracking. (Motion build available)
- [Scroll Stack](https://avaraui.com/docs-md/nextjs-scroll-stack.md): Scroll-driven 3D card stacks built with GSAP ScrollTrigger: cards stick while the next one slides up over them. (Motion build available)

**Data Display**

- [Split-Flap Display](https://avaraui.com/docs-md/nextjs-split-flap.md): A Solari-style split-flap display with 3D flips, split creases and synthesized click sounds. (Motion build available)

**Media & Carousels**

- [Carousel](https://avaraui.com/docs-md/nextjs-carousel.md): Carousel components for image galleries, hero sections, product wheels and fluid presentations. (Motion build available)
- [Gallery](https://avaraui.com/docs-md/nextjs-gallery.md): A media gallery with six interactive layouts, from 3D orbit rings and video spheres to a moving bento grid. (Motion build available)

**Apps & Messaging**

- [Ai-Chat](https://avaraui.com/docs-md/nextjs-ai-chat.md): An LLM chat interface with history, editable titles, a prompt composer with @Mention tools, and a model picker. (Motion build available)

**More Components**

- [Action Button](https://avaraui.com/docs-md/nextjs-action-buttons.md): Animated action buttons: slide to confirm, hold to delete, star, add to cart, waitlist and payment. (Motion build available)

**Marketing Sections**

- [Newsletter](https://avaraui.com/docs-md/nextjs-newsletter.md): A sign-up section in three layouts. Portraits puts four readers' faces around a centred form on a soft panel and lets them drift with the pointer. (Motion build available)

**More Sections**

- [Top Destinations](https://avaraui.com/docs-md/nextjs-top-destinations.md): A dual-row scroll-driven destination showcase. As the user scrolls down the page, two parallel rows of destination cards travel in opposite… (Motion build available)

## What is a Motion build?

A Motion build is the same component written with the `motion` package
instead of GSAP. Avara UI ships one only where it behaves like the GSAP build,
and every page shows both in GSAP and Motion tabs.

## How do I install a Motion component?

Register the registry once, then add the build named
`@avara-ui/name-motion` instead of
`@avara-ui/name`. The CLI also installs the
`motion` package. Install one build or the other, never both, because
they write the same file. See the
[Installation guide](https://avaraui.com/docs/reactjs/installation) for the one-time setup.

## Should I pick GSAP or Motion?

Pick the library your project already uses. Both builds look and behave the same,
and both honour reduced-motion settings.

---

Live previews and every example: https://avaraui.com/docs/nextjs/motion-components
