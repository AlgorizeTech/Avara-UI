# Toast / Notification

A robust, highly-animated notification system. Popups and alerts are essential for user feedback, but most libraries are heavy, difficult to style, or lack smooth animations.

This headless-style Toast component handles its own global state via Context, uses **GSAP** for elastic entrance/exit animations, automatically handles stacking, and integrates flawlessly with your dynamic theme engine.

Click the trigger buttons in each preview to fire a toast. Toasts auto-dismiss after 5 seconds — hover to keep one open, or click the `X` to dismiss it manually.

export const usageDefault = `function Triggers() {
  const { toast } = useToast();

  return (

          toast({
            title: "Message sent",
            description: "We'll let you know as soon as they reply.",
          })
        }
        className="px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl transition-colors shadow-sm"
      >
        Show toast

  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function SendMessage() {
  return (

  );
}`;

export const usageTypes = `const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-zinc-700 hover:bg-zinc-800" },
  ] as const;

  return (
    
      {types.map((t) => (
        
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={\`\${TRIGGER} \${t.className}\`}
        >
          {t.label}
        
      ))}
    
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastTypes() {
  return (

  );
}`;

export const usageAction = `const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  return (

          toast({
            title: "Update available",
            description: "A new version of the app is ready to install.",
            type: "info",
            action: {
              label: "Install Now",
              onClick: () => console.log("Installing..."),
            },
          })
        }
        className={\`\${TRIGGER} bg-blue-600 hover:bg-blue-700\`}
      >
        Toast with action

  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastWithAction() {
  return (

  );
}`;

export const usageDuration = `const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  return (

          toast({
            title: "Upload in progress",
            description: "This toast stays until you dismiss it.",
            type: "info",
            duration: 0,
          })
        }
        className={\`\${TRIGGER} bg-blue-600 hover:bg-blue-700\`}
      >
        Persistent toast

          toast({
            title: "Saved",
            description: "This one disappears after 1.5 seconds.",
            type: "success",
            duration: 1500,
          })
        }
        className={\`\${TRIGGER} bg-emerald-600 hover:bg-emerald-700\`}
      >
        Quick toast

  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function ToastDuration() {
  return (

  );
}`;

export const usageGlow = `const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-zinc-700 hover:bg-zinc-800" },
  ] as const;

  return (
    
      {types.map((t) => (
        
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={\`\${TRIGGER} \${t.className}\`}
        >
          {t.label}
        
      ))}
    
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function GlowToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.

  );
}`;

export const usageMinimal = `const TRIGGER =
  "px-6 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm";

function Triggers() {
  const { toast } = useToast();

  const types = [
    { type: "success", label: "Success", title: "Action completed", description: "Your file has been uploaded successfully.", className: "bg-emerald-600 hover:bg-emerald-700" },
    { type: "error", label: "Error", title: "Connection failed", description: "Could not connect to the database.", className: "bg-red-600 hover:bg-red-700" },
    { type: "warning", label: "Warning", title: "Storage almost full", description: "You've used 92% of your quota.", className: "bg-amber-500 hover:bg-amber-600" },
    { type: "info", label: "Update available", title: "Update available", description: "A new version is ready to install.", className: "bg-blue-600 hover:bg-blue-700" },
    { type: "default", label: "Default", title: "Message sent", description: undefined, className: "bg-zinc-700 hover:bg-zinc-800" },
  ] as const;

  return (
    
      {types.map((t) => (
        
            toast({ title: t.title, description: t.description, type: t.type })
          }
          className={\`\${TRIGGER} \${t.className}\`}
        >
          {t.label}
        
      ))}
    
  );
}

// useToast() reads the provider context, so a trigger has to render INSIDE
//  — calling it outside throws. In a real app the provider
// wraps your whole tree once, in layout.tsx.
export default function MinimalToasts() {
  return (
    // variant lives on the provider, so every toast it renders picks it up.

  );
}`;

## Installation

### Wrap your app

`ToastProvider` owns the queue, so it has to sit above anything that calls `useToast` — usually `app/layout.tsx`. The global `variant`, `color` and `position` are set there, and the first example's **Usage** tab shows the whole wiring.

## Examples

## Features
Discover the Toast component's notification features, including auto-dismissal, action buttons, and accessible screen reader announcements.

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

### `` Props

        Prop
        Type
        Default
        Description

          position

            "top-right" | "top-left" | "top-center" | "bottom-right" |
            "bottom-left" | "bottom-center"

          "bottom-right"
        
        The global position where all toasts will stack on the screen.

          variant

          "default" | "glow" | "glass" | "minimal"

          "default"
        
        Determines the global visual styling of the toast cards.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies the global color theme to the glow shadows and border accents.
          Accepts hex codes.

### `toast(options)` Properties

When calling the `toast()` function from the `useToast` hook, you can pass the following properties in the options object:

        Property
        Type
        Default
        Description

          title

          string

          Required
        
        The bold, primary text displayed at the top of the toast.

          description

          string

          undefined
        
        The subtle, secondary text displayed below the title.

          type

          "success" | "error" | "warning" | "info" | "default"

          "default"
        
        Determines which icon is rendered next to the text.

          duration

          number

          5000

          Time in milliseconds before the toast automatically dismisses. Set to{" "}
          0 to disable auto-dismiss.

          action

          {`{ label: string, onClick: () => void }`}

          undefined

          If provided, renders a bold, clickable button at the bottom of the
          toast. Automatically dismisses the toast when clicked.

---

**Component Path:** `[framework]\toast\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
