# Sonner (Toast Stack)

An opinionated, dependency-free toast component that mimics the famous "Sonner" library aesthetic.

Traditional toast notifications stack in a massive, screen-blocking vertical list. This `SonnerBlock` stacks new notifications _on top_ of old ones, scaling older toasts down and pushing them backwards in 3D space to keep your UI clean. Hovering over the stack automatically expands it so users can read previous notifications.

Click the trigger buttons to spawn toasts, then hover the floating stack to expand it.

export const usageDefault = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

//  belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function SaveButton() {
  return (
    <>

          toast("Profile updated successfully", {
            description: "Your changes have been saved to the database.",
          })
        }
      >
        Show toast

  );
}`;

export const usageTypes = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

//  belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastTypes() {
  return (
    <>
      
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

export const usageAction = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

//  belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function UndoToast() {
  return (
    <>
      
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

export const usageStack = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

//  belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function StackDemo() {
  // New toasts stack on top; older ones scale down and slide back in 3D.
  // Hover the stack to expand it into a readable list.
  const uploadAll = () => {
    toast.success("File uploaded", { description: "report-q3.pdf" });
    setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
    setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
  };

  return (
    <>
      
        Spawn three toasts

  );
}`;

export const usageExpand = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

export default function ExpandedStack() {
  // expand keeps the stack permanently open instead of collapsing it in 3D.
  // Mount  once, at the root of your app.
  return (
    <>

       {
          toast.success("File uploaded", { description: "report-q3.pdf" });
          setTimeout(() => toast.success("File uploaded", { description: "invoice-114.pdf" }), 250);
          setTimeout(() => toast.success("File uploaded", { description: "notes.md" }), 500);
        }}
      >
        Spawn three toasts

  );
}`;

export const usageDuration = `// The trigger styling the preview uses.
const BTN =
  "px-4 py-2 rounded-lg font-medium transition-colors bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700";

//  belongs once at the root of your app. It is mounted here only so
// this example runs on its own.
export default function ToastDuration() {
  return (
    <>
      
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

export const usagePosition = `const POSITIONS: { value: NonNullable; label: string }[] = [
  { value: "top-left", label: "Top left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
];

export default function PositionDemo() {
  const [position, setPosition] = useState>("bottom-right");

  return (
    <>
      {/* In a real app you mount  once, at the root, with a fixed position */}

        {POSITIONS.map((p) => (
           {
              // Clear first, then move the stack, so the new toast animates in
              // at the new anchor instead of sliding across from the old one.
              toast.clear();
              setPosition(p.value);
              setTimeout(() => {
                toast(p.label, { description: \`Stack anchored to "\${p.value}".\` });
              }, 50);
            }}
            className={cn(
              "px-2 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors",
              position === p.value
                ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700",
            )}
          >
            {p.label}
          
        ))}

  );
}`;

` once, then call `toast()` from anywhere — no provider needed.",
      propNotes: [
        {
          prop: "children",
          effect:
            "of `toast()` is the message; everything else about the toast is optional.",
        },
      ],
      props: { example: "basic" },
      usage: usageDefault,
      code: extractCode("src/components/custom/blocks/SonnerBlock.tsx"),
    },
  ]}
/>

## Installation

## Examples

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

**Component Path:** `[framework]\sonner\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
