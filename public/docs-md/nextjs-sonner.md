# Sonner (Toast Stack)

An opinionated, dependency-free toast component that mimics the famous "Sonner" library aesthetic.

Traditional toast notifications stack in a massive, screen-blocking vertical list. This `SonnerBlock` stacks new notifications _on top_ of old ones, scaling older toasts down and pushing them backwards in 3D space to keep your UI clean. Hovering over the stack automatically expands it so users can read previous notifications.

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

## Interactive Showcase

Click the buttons below to spawn toasts. Notice how they stack beautifully in the corner. If you hover your mouse over the floating toast stack, it will gracefully expand.

## Installation

### Copy the Component

This component is **100% dependency-free**. It doesn't use standard React context; instead, it uses a high-performance custom Observer class. This means you don't have to wrap your app in a bulky context provider just to fire a toast from a random utility file.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/SonnerBlock.tsx`.

---

## Usage

### 1. Mount the Toaster

Add the `` component exactly **once** at the very root of your application (e.g., in your `layout.tsx` or `App.tsx`).

```tsx

export default function RootLayout({ children }) {
  return (

        {children}

  );
}
```

## 2. Trigger Toasts anywhere

Because the toast function communicates with an external store, you can import it and trigger notifications from anywhere—inside components, inside useEffect blocks, or even inside standard non-React fetch functions.

```tsx

export default function SettingsPage() {
  const handleSave = async () => {
    try {
      await saveUserData();
      toast.success("Settings Saved", {
        description: "Your profile has been updated.",
      });
    } catch (error) {
      toast.error("Uh oh!", {
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return Save;
}
```

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
