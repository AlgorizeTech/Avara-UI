---
name: avara-ui-animation
description: Which animation library a component uses and how to choose.
---

# Animation

- The default build of an animated component uses **CSS** for fixed-value motion and **GSAP** where pointer, scroll, drag or layout drives the motion. Install it as `@avara-ui/<name>`.
- Where a Motion (`motion/react`) build exists it installs as `@avara-ui/<name>-motion` and writes the same file. The index lists these as `motionItems`. Choose one by what the project already uses: if it has `motion` and no `gsap`, take the Motion build.
- Never install both builds of one component, and never mix the two libraries inside one item.
- Everything honours `prefers-reduced-motion`.
- Do not wrap a component in your own entrance animation. Most already have one, and a second one delays the content for no gain.
