export const metadata = docsPageMetadata("copy-button", {
  title: "Copy Button",
  description: "A clipboard button that confirms the copy with an animated check and label swap — plus a read-only Copy Field for links, tokens and commands."
});

# Copy Button

A button that puts text on the clipboard and says so — the icon pops from a clipboard to a check, the label rises from "Copy" to "Copied!", and both settle back after a moment.

It ships in three pieces: `CopyButton` for any surface (toolbars, code blocks, cards), `CopyField` for the classic read-only input with a copy button beside or inside it, and the `useCopyToClipboard` hook when you want the behaviour with your own markup. The write uses the async Clipboard API and falls back to a hidden textarea where that is unavailable, and a failed write shows a brief "Failed" state instead of lying about success.

Explore the different variations of the Copy Button — each example shows a live preview with the exact code to copy. Click a button to see it confirm.

export const usageDefault = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopyLink() {
  return ;
}`;

export const usageVariants = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopyVariants() {
  return (

  );
}`;

export const usageSizes = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CopySizes() {
  return (

  );
}`;

export const usageIcon = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

// iconOnly drops the label and renders a square button; the accessible name
// is still announced, and flips to "Copied" after a successful write.
export default function IconOnly() {
  return (

  );
}`;

export const usageField = `import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";

// A read-only input with the button beside it. Clicking the field selects
// the whole value; buttonProps forwards anything CopyButton accepts.
export default function ProfileLink() {
  return (
    
  );
}`;

export const usageInset = `import { CopyField } from "@/components/custom/blocks/CopyButtonBlock";

// inset tucks an icon-only ghost button inside the field's right edge.
export default function InviteLink() {
  return (
    }
    />
  );
}`;

export const usageCode = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

const SNIPPET = "npx shadcn@latest add @algorize-ui/copy-button";

export default function CommandBlock() {
  return (

           Terminal
        
        {/* ghost + a custom className blends it into the toolbar in both themes */}

        {SNIPPET}

  );
}`;

export const usageLabels = `import { CopyButton } from "@/components/custom/blocks/CopyButtonBlock";

export default function CustomLabels() {
  return (
    
      {/* timeout controls how long the confirmation lingers */}
      
       ok && console.log("copied", value)}
      />
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/copy-button
```

## Examples

### The hook on its own

`useCopyToClipboard(timeout?)` returns `{ copy, status, copied }`. `copy(text)` resolves to a boolean, and `status` is `"idle" | "copied" | "error"`, resetting itself after `timeout` ms — everything the button does, for your own markup.

```tsx
"use client";

export default function CopyRow() {
  const { copy, copied } = useCopyToClipboard(1500);

  return (
     copy("hello@nexus.dev")}>
      {copied ? "Email copied" : "hello@nexus.dev"}
    
  );
}
```

## Features
Discover the Copy Button's capabilities for confirming a clipboard write without a toast.

    Inline confirmation
    The feedback lives in the button itself — a popping check and a rising label — so nothing else on the page has to move.

    Honest states
    A blocked clipboard shows Failed rather than a false success, and onCopy tells you which it was.

    Works everywhere
    Uses the async Clipboard API and falls back to a hidden textarea on older browsers and non-secure origins.

    Accessible
    A polite live region announces the change; icon-only buttons carry a name that updates to Copied.

## Best Practices & Guidelines

    Say what was copied
    Prefer specific labels — Copy Link, Code copied — over a bare Copy when more than one thing on the screen could be copied.

    Don't close the surface on copy
    Let the confirmation play before dismissing a dialog or popover — closing on click hides the only feedback the user gets.

## Props Reference

### `` Props

        Prop
        Type
        Default
        Description

        value
        string
        Required
        The text written to the clipboard.

        label
        ReactNode
        "Copy"
        Resting label.

        copiedLabel
        ReactNode
        "Copied!"
        Label shown after a successful write.

        errorLabel
        ReactNode
        "Failed"
        Label shown when the clipboard write is refused.

        iconOnly
        boolean
        false
        Hide the label and render a square icon button with an accessible name.

        timeout
        number
        2000
        How long the copied / failed state lingers, in ms.

        variant
        "solid" | "soft" | "outline" | "ghost"
        "solid"
        Visual style.

        size
        "sm" | "md" | "lg"
        "md"
        Height, padding and icon size.

        color
        "primary" | "indigo" | "rose" | "emerald" | "zinc" | string
        "primary"
        Theme colour for the solid / soft fills, the success flash and the focus ring. Accepts hex codes.

        onCopy
        {"(value: string, ok: boolean) => void"}
        —
        Fires after the write with the value and whether it succeeded.

Every other `` attribute (`className`, `disabled`, `onClick`…) is forwarded. Calling `preventDefault()` in your own `onClick` cancels the copy.

### `` Props

        Prop
        Type
        Default
        Description

        value
        string
        Required
        Shown in the read-only input and copied by the button.

        label
        string
        —
        Bold label above the field.

        buttonProps
        {"Omit"}
        —
        Forwarded to the embedded button — labels, variant, timeout, onCopy…

        inset
        boolean
        false
        Render an icon-only ghost button inside the field's right edge instead of a full button beside it.

        prefix
        ReactNode
        —
        Icon or adornment on the field's left side.

        selectOnClick
        boolean
        true
        Select the whole value when the input is clicked.

        size
        "sm" | "md" | "lg"
        "md"
        Field and button height.

        color
        string
        "primary"
        Theme colour shared by the button and the field's focus ring.

---

**Component Path:** `[framework]\copy-button\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
