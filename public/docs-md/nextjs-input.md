# Input

A powerful, multi-purpose Input component that natively supports advanced File Uploading, Password toggles, and complex layout variants.

By passing `type="file"`, this component transforms from a standard text input into a full-featured Drag & Drop zone that automatically generates image previews, formats file sizes, and allows users to remove selections.

Explore the different variations of the Input component — each example shows a live preview with the exact code to copy.

export const usageDefault = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function BasicInput() {
  return (
    
  );
}`;

export const usageFilled = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function FilledInput() {
  return (
    
  );
}`;

export const usageUnderlined = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function UnderlinedInput() {
  return (
    
  );
}`;

export const usagePassword = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function PasswordInput() {
  return (
    
  );
}`;

export const usageFile = `import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function FileUploadInput() {
  return (
     console.log("Uploaded files:", files)}
    />
  );
}`;

## Installation

## Examples

## Features
Learn about the Input component's versatile states, including disabled, error, and focused styles, along with icon support.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

This component extends `React.InputHTMLAttributes`, meaning you can pass any standard input prop (like `onChange`, `value`, `name`, `disabled`, etc.).

        Prop
        Type
        Default
        Description

          type

          "text" | "password" | "email" | "number" | "file"

          "text"

          Determines the behavior. "password" adds a visibility
          toggle. "file" transforms the component into a
          drag-and-drop zone.

          onFilesChange

          (files: File[]) =&gt; void

          undefined

          File Mode Only: Callback fired when files are
          dropped, selected, or removed. Returns an array of native File
          objects.

          multiple

          boolean

          false

          File Mode Only: If true, allows dropping or selecting
          multiple files at once.

          accept

          string

          undefined

          File Mode Only: Standard HTML accept attribute (e.g.,{" "}
          "image/*" or ".pdf").

          inputSize

          "sm" | "md" | "lg"

          "md"

          Uniformly scales the height, padding, text size, and icon size of the
          input or dropzone.

          variant

          "default" | "filled" | "underlined" | "glow"

          "default"

          Determines the visual styling of the borders, background, and focus
          rings.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies the global color theme to the focus ring, glow shadow, and
          drag-active states. Accepts hex codes.

          label

          string

          undefined
        
        Renders a bold, accessible label directly above the input.

          helperText

          string

          undefined
        
        Subtle instructional text rendered below the input.

          error

          string

          undefined

          If provided, turns the input red, adds an alert icon, and replaces the
          helper text with the error message.

          disabled

          boolean

          false
        
        Disables interactions and applies a faded, read-only style.

          leftIcon / rightIcon

          ReactNode

          undefined

          Standard Mode Only: Injects an icon or element into
          the left or right side of the input field.

---

**Component Path:** `[framework]\input\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
