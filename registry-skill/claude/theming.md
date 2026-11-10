---
name: avara-ui-theming
description: How to restyle components with theme tokens.
---

# Theming

Components are styled with CSS-variable theme tokens, so a theme change restyles all of them at once.

- Use `bg-background`, `bg-card`, `bg-primary`, `text-foreground`, `text-muted-foreground`, `border-border` and the other shadcn tokens. Do not write hex or Tailwind palette colours (`bg-blue-500`) into component code.
- To change the look, change the variables in the project's global CSS (`:root` and `.dark`). The theme customizer at https://avaraui.com/themes generates them.
- Components work in light and dark mode. Check both after changing a token.
- Spacing and type sizes follow Tailwind's scale. Do not introduce arbitrary pixel values where a scale step exists.
