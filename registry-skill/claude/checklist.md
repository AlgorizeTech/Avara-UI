---
name: avara-ui-checklist
description: The check to run before finishing a UI task.
---

# Final check

Go through each line. Fix what fails, then report what you changed.

1. Every Avara UI item the page uses was installed with the CLI and imports from the path its Markdown gives.
2. No prop, import path or component name was written from memory. Each appears in the item's Markdown or in the file the CLI wrote.
3. Colours are theme tokens. No hard-coded colours were added.
4. The page works at phone width (no horizontal scroll) and in dark mode.
5. Empty, loading and error states exist where the data can be empty, slow or wrong.
6. Interactive elements are reachable by keyboard and have visible focus and accessible names.
7. One animation library per component, and `prefers-reduced-motion` still turns the motion off.
8. The project builds: run its type check and build command.
