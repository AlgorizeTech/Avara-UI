---
title: "Buttons"
description: "A customizable and interactive button component with a built-in ripple effect. Free shadcn/ui Buttons component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/examples/button
---

# Buttons 
A customizable and interactive button component with a built-in ripple effect.

## Basic Variants
## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/button-view.tsx`

## Others

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/others.tsx`

## Social Buttons

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/social-button.tsx`

## Action Buttons

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/action.tsx`

## Right Icon Buttons

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/righticon.tsx`

## Icon Only Buttons

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/only.tsx`

## E-commerce Buttons

## Preview

Interactive component preview available in the web version.

## Code

See implementation in: `src/app/docs/[framework]/examples/button/commerce.tsx`

# Button Component

A customizable and interactive button component with a built-in ripple effect.

## Installation & Import

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/button
```

Then import it:

```tsx
import Button from "@/components/custom/blocks/Button";
```

## Basic Usage

Here's the most basic way to use the component:

```tsx live
<Button variant="default">Click Me</Button>
```

## Variants

The button comes in several variants to suit different UI contexts.

## Default

The standard, primary button for your application.

```tsx live
<Button variant="default">Default Button</Button>
```

## Destructive

Use this for actions that could have destructive consequences, like deleting data.

```tsx live
<Button variant="destructive">Delete Action</Button>
```

## Outline

A lower-emphasis button with a transparent background and a border.

```tsx live
<Button variant="outline">Outline Button</Button>
```

## Secondary

For actions that are secondary to the main call-to-action on a page.

```tsx live
<Button variant="secondary">Secondary Button</Button>
```

## Ghost

The lowest-emphasis button, used for supplemental actions that need to be available but not prominent.

```tsx live
<Button variant="ghost">Ghost Button</Button>
```

## Link

A button that looks and behaves like a hyperlink.

```tsx live
<Button variant="link">Link Button</Button>
```

## Sizes

The button is available in three sizes.

```tsx live
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
  <Button variant="default" size="sm">Small</Button>
  <Button variant="default" size="default">Default</Button>
  <Button variant="default" size="lg">Large</Button>
</div>
```

## Loading State

You can put the button into a loading state, which disables it and shows a spinner. This is useful for indicating that an action (like a form submission) is in progress.

```tsx live
<div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button variant="default" loading>Loading...</Button>
    <Button variant="outline" loading>Loading...</Button>
</div>
```

# Props

| **Prop**    | **Type**                                                                                          | **Default**   | **Description**                                                                                                      |
|-------------|---------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| `variant`   | `'default'` \| `'destructive'` \| `'outline'` \| `'secondary'` \| `'ghost'` \| `'link'`            | `'default'`   | The visual style of the button.                                                                                      |
| `size`      | `'default'` \| `'sm'` \| `'lg'`                                                                    | `'default'`   | The size of the button.                                                                                              |
| `loading`   | `boolean`                                                                                          | `false`       | If `true`, the button will be disabled and show a loading spinner.                                                  |
| `...props`  | `React.ButtonHTMLAttributes<HTMLButtonElement>`                                                   | —             | Any other standard `button` attributes (e.g., `onClick`, `disabled`, `className`) will be passed through.           |

---

Live previews and every example: https://avaraui.com/docs/nextjs/examples/button
