# Sonner (Toast Stack)

An opinionated, dependency-free toast component that mimics the famous "Sonner" library aesthetic.

Traditional toast notifications stack in a massive, screen-blocking vertical list. This `SonnerBlock` stacks new notifications _on top_ of old ones, scaling older toasts down and pushing them backwards in 3D space to keep your UI clean. Hovering over the stack automatically expands it so users can read previous notifications.

## Examples

Click the trigger buttons to spawn toasts, then hover the floating stack to expand it. The first example's **Code** tab contains the full component source.

export const usageDefault = `import { toast, Toaster } from "@/components/custom/blocks/SonnerBlock";

// 1. Mount  exactly once, at the root of your app.
export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

  );
}

// 2. Fire a toast from anywhere — no provider or hook needed.
export default function SaveButton() {
  return (
    
        toast("Profile updated successfully", {
          description: "Your changes have been saved to the database.",
        })
      }
    >
      Show toast
    
  );
}`;

export const usageTypes = `import { toast } from "@/components/custom/blocks/SonnerBlock";

export default function ToastTypes() {
  return (
    
       toast("Profile updated successfully", { description: "Your changes have been saved to the database." })}>
        Default
      
       toast.success("Deployment Complete", { description: "Your site is now live on the production server." })}>
        Success
      
       toast.error("Connection Failed", { description: "Could not reach the database. Please try again later." })}>
        Error
      
       toast.info("New login detected", { description: "A new device just signed in to your account." })}>
        Info

  );
}`;

export const usageAction = `import { toast } from "@/components/custom/blocks/SonnerBlock";

export default function UndoToast() {
  return (
    
        toast("Message deleted", {
          action: {
            label: "Undo",
            onClick: () => alert("Undo clicked!"),
          },
        })
      }
    >
      With Action
    
  );
}`;

export const usageStack = `import { toast } from "@/components/custom/blocks/SonnerBlock";

export default function StackDemo() {
  // New toasts stack on top; older ones scale down and slide back in 3D.
  // Hover the stack to expand it into a readable list.
  const uploadAll = () => {
    toast.success("File uploaded", { description: "report-q3.pdf" });
    setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
    setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
  };

  return Spawn three toasts;
}`;

export const usageExpand = `import { Toaster } from "@/components/custom/blocks/SonnerBlock";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // expand keeps the stack permanently open instead of collapsing it in 3D.
  return (
    <>
      {children}

  );
}`;

export const usageDuration = `import { toast } from "@/components/custom/blocks/SonnerBlock";

export default function ToastDuration() {
  return (
    
      {/* Infinity disables auto-dismiss — the user closes it */}
      
          toast("Syncing your workspace", {
            description: "This toast stays until you dismiss it.",
            duration: Infinity,
          })
        }
      >
        Persistent

          toast.success("Saved", {
            description: "Gone in 1.5 seconds.",
            duration: 1500,
          })
        }
      >
        Quick

  );
}`;

export const usagePosition = `import { Toaster } from "@/components/custom/blocks/SonnerBlock";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // "bottom-right" | "bottom-center" | "bottom-left"
  // "top-right"    | "top-center"    | "top-left"
  return (
    <>
      {children}

  );
}`;

` once, then call `toast()` from anywhere — no provider needed.",
      props: { example: "basic" },
      usage: usageDefault,
      code: extractCode("src/components/custom/blocks/SonnerBlock.tsx"),
    },
    {
      title: "Types",
      subheading: "Use `toast.success`, `toast.error` and `toast.info` for the semantic styles.",
      props: { example: "types" },
      usage: usageTypes,
    },
    {
      title: "With action",
      subheading: "Pass `action` to add an inline button — perfect for undo.",
      props: { example: "action" },
      usage: usageAction,
    },
    {
      title: "Stacking",
      subheading: "Fire several toasts: newer ones stack on top, older ones recede. Hover to expand.",
      props: { example: "stack" },
      usage: usageStack,
    },
    {
      title: "Always expanded",
      subheading: "Set `expand` on the Toaster to keep the stack open instead of collapsing it.",
      props: { example: "stack", expand: true },
      usage: usageExpand,
    },
    {
      title: "Duration",
      subheading: "`duration` sets the auto-dismiss delay; `Infinity` keeps the toast up.",
      props: { example: "duration" },
      usage: usageDuration,
    },
    {
      title: "Position",
      subheading: "`position` anchors the stack to any corner or edge of the screen.",
      props: { example: "basic", position: "top-center" },
      usage: usagePosition,
    },
  ]}
/>

## Installation

### Copy the Component

This component is **100% dependency-free**. It doesn't use standard React context; instead, it uses a high-performance custom Observer class. This means you don't have to wrap your app in a bulky context provider just to fire a toast from a random utility file.

Create a new file at `components/custom/blocks/SonnerBlock.tsx` and copy the engine code from the **Code** tab of the first example above.

## Features
Explore the Sonner toast notification features, including stacked layouts, swipe-to-dismiss, and promise-based loading states.

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

        Target
        Prop / Argument
        Type
        Default
        Description

          &lt;Toaster&gt;

          position

            "bottom-right" | "bottom-center" | "bottom-left" | "top-right" |
            "top-center" | "top-left"

          "bottom-right"
        
        Controls where the stack anchors on the screen.

          &lt;Toaster&gt;

          expand

          boolean

          false

          If true, the stack is permanently expanded and will not collapse into
          the 3D view.

          toast()

          title

          string

          Required

          The main, bold text of the notification. Passed as the first argument
          to the function.

          toast()

          options.description

          string

          undefined
        
        Optional secondary text displayed beneath the title.

          toast()

          options.duration

          number

          4000

          How long (in milliseconds) before the toast auto-dismisses. Pass{" "}
          Infinity to disable auto-dismiss.

          toast()

          options.action

          {`{ label: string, onClick: () => void }`}

          undefined
        
        Provides an actionable button inside the toast.

          toast()

          options.type

          "default" | "success" | "error" | "info"

          "default"

          Determines the color scheme and accompanying icon. Alternatively, use
          the shorthand methods: toast.success(),{" "}
          toast.error(), etc.

---

**Component Path:** `nextjs\sonner\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
