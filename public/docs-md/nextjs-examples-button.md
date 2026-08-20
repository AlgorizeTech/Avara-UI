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

Then import it:

```tsx

```

## Basic Usage

Here's the most basic way to use the component:

```tsx live
Click Me
```

## Variants

The button comes in several variants to suit different UI contexts.

## Default

The standard, primary button for your application.

```tsx live
Default Button
```

## Destructive

Use this for actions that could have destructive consequences, like deleting data.

```tsx live
Delete Action
```

## Outline

A lower-emphasis button with a transparent background and a border.

```tsx live
Outline Button
```

## Secondary

For actions that are secondary to the main call-to-action on a page.

```tsx live
Secondary Button
```

## Ghost

The lowest-emphasis button, used for supplemental actions that need to be available but not prominent.

```tsx live
Ghost Button
```

## Link

A button that looks and behaves like a hyperlink.

```tsx live
Link Button
```

## Sizes

The button is available in three sizes.

```tsx live

  Small
  Default
  Large

```

## Loading State

You can put the button into a loading state, which disables it and shows a spinner. This is useful for indicating that an action (like a form submission) is in progress.

```tsx live

    Loading...
    Loading...

```

# Props

| **Prop**    | **Type**                                                                                          | **Default**   | **Description**                                                                                                      |
|-------------|---------------------------------------------------------------------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| `variant`   | `'default'` \| `'destructive'` \| `'outline'` \| `'secondary'` \| `'ghost'` \| `'link'`            | `'default'`   | The visual style of the button.                                                                                      |
| `size`      | `'default'` \| `'sm'` \| `'lg'`                                                                    | `'default'`   | The size of the button.                                                                                              |
| `loading`   | `boolean`                                                                                          | `false`       | If `true`, the button will be disabled and show a loading spinner.                                                  |
| `...props`  | `React.ButtonHTMLAttributes`                                                   | —             | Any other standard `button` attributes (e.g., `onClick`, `disabled`, `className`) will be passed through.           |

---

**Component Path:** `[framework]\examples\button\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
