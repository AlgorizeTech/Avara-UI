# Toast / Notification

A robust, highly-animated notification system. Popups and alerts are essential for user feedback, but most libraries are heavy, difficult to style, or lack smooth animations.

This headless-style Toast component handles its own global state via Context, uses **GSAP** for elastic entrance/exit animations, automatically handles stacking, and integrates flawlessly with your dynamic theme engine.

Click the trigger buttons in each preview to fire a toast. Toasts auto-dismiss after 5 seconds — hover to keep one open, or click the `X` to dismiss it manually.

export const usageDefault = `import { ToastProvider, useToast } from "@/components/custom/blocks/ToastBlock";

// 1. Wrap your app (usually layout.tsx) once.
export function Providers({ children }: { children: React.ReactNode }) {
  return {children};
}

// 2. Fire toasts from any child component.
export default function SendMessage() {
  const { toast } = useToast();

  return (
    
        toast({
          title: "Message sent",
          description: "We'll let you know as soon as they reply.",
        })
      }
    >
      Show toast
    
  );
}`;

export const usageTypes = `import { useToast } from "@/components/custom/blocks/ToastBlock";

export default function ToastTypes() {
  const { toast } = useToast();

  return (
    
       toast({ type: "success", title: "Action completed", description: "Your file has been uploaded successfully." })}>
        Success
      
       toast({ type: "error", title: "Connection failed", description: "Could not connect to the database." })}>
        Error
      
       toast({ type: "warning", title: "Storage almost full", description: "You've used 92% of your quota." })}>
        Warning
      
       toast({ type: "info", title: "Update available", description: "A new version is ready to install." })}>
        Info
      
       toast({ type: "default", title: "Message sent" })}>
        Default

  );
}`;

export const usageAction = `import { useToast } from "@/components/custom/blocks/ToastBlock";

export default function ActionToast() {
  const { toast } = useToast();

  return (
    
        toast({
          type: "info",
          title: "Update available",
          description: "A new version of the app is ready to install.",
          action: {
            label: "Install Now",
            onClick: () => console.log("Installing..."),
          },
        })
      }
    >
      Toast with action
    
  );
}`;

export const usageDuration = `import { useToast } from "@/components/custom/blocks/ToastBlock";

export default function ToastDuration() {
  const { toast } = useToast();

  return (
    
      {/* duration: 0 disables auto-dismiss — the user must close it */}
      
          toast({
            type: "info",
            title: "Upload in progress",
            description: "This toast stays until you dismiss it.",
            duration: 0,
          })
        }
      >
        Persistent toast

          toast({
            type: "success",
            title: "Saved",
            description: "This one disappears after 1.5 seconds.",
            duration: 1500,
          })
        }
      >
        Quick toast

  );
}`;

export const usageGlow = `import { ToastProvider } from "@/components/custom/blocks/ToastBlock";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    
      {children}
    
  );
}`;

export const usageMinimal = `import { ToastProvider } from "@/components/custom/blocks/ToastBlock";

export function Providers({ children }: { children: React.ReactNode }) {
  return {children};
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
