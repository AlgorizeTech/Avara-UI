# Toast / Notification

A robust, highly-animated notification system. Popups and alerts are essential for user feedback, but most libraries are heavy, difficult to style, or lack smooth animations.

This headless-style Toast component handles its own global state via Context, uses **GSAP** for elastic entrance/exit animations, automatically handles stacking, and integrates flawlessly with your dynamic theme engine.

## Interactive Showcase

Use the control panel below to test the different visual variants and placement locations on the screen.

- The **Glass** variant uses a high-intensity backdrop blur, making it perfect for apps with complex or photographic backgrounds.
- The **Glow** variant and **Minimal** variant automatically inherit the custom hex color you select in the control panel.
- Toasts auto-dismiss after 5 seconds, but you can hover them to keep them open, or click the `X` to dismiss manually.

## Installation

### 1. Install Dependencies

This component relies on `gsap` for the entrance/exit animations and `lucide-react` for standard UI icons (Check, AlertCircle, Info).

```bash
npm install gsap lucide-react
```

2. Copy the Component
   This component includes the ToastProvider, the useToast hook, and the individual ToastItem renderer all inside a single file.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/ToastBlock.tsx.

## Usage

1. Wrap Your App
   You must wrap the highest level of your application (usually layout.tsx or App.tsx) with the ``. You can set the global variant and positioning here.

```jsx

export default function RootLayout({ children }) {
  return (

          {children}

  );
}
```

2. Trigger Toasts via Hook
   Inside any child component, simply call the `useToast` hook.

```jsx

export default function ProfileForm() {
  const { toast } = useToast();

  const handleSave = () => {
    // API call logic here...

    toast({
      title: "Profile Updated",
      description: "Your changes have been saved successfully.",
      type: "success", // success | error | warning | info | default
      duration: 3000, // Optional: Auto-dismisses after 3 seconds
    });
  };

  const handleActionToast = () => {
    toast({
      title: "Update Available",
      description: "A new version of the app is ready to install.",
      type: "info",
      action: {
        label: "Install Now",
        onClick: () => console.log("Installing..."),
      },
    });
  };

  return (
    
      Save Profile
      Show Action Toast
    
  );
}
```

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

**Component Path:** `nextjs\toast\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
