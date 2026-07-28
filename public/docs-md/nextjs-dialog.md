# Dialog (Modal)

A window overlaid on either the primary window or another dialog window, rendering the background content underneath inert.

Popovers and Dropdowns are great for quick, non-blocking actions. But when you need to force the user to make a decision or complete a complex form without distractions, you need a Dialog (Modal).

The `DialogBlock` component handles the complex DOM logic required for true accessibility: it automatically renders into a React Portal, locks the `document.body` scrollbar to prevent background scrolling, and actively listens for background clicks or the `Escape` key to dismiss itself smoothly.

## Features
Discover the Dialog component's accessible modal features, including focus trapping, outside-click dismissal, and scroll locking.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Use the templates below to explore different variations of a Dialog. Notice how the background scrollbar vanishes when the dialog opens, and returns exactly as it was when it closes.

## Installation

### Copy the Component

This component is **100% dependency-free**. It uses native `createPortal` for overlay rendering and manages `document.body.style.overflow` natively.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/DialogBlock.tsx`.

---

## Usage

A standard dialog requires wrapping your trigger (the button that opens it) and your content within the `` root context.

```tsx

export default function CheckoutModal() {
  return (
    
      {/* 1. The button that opens the modal */}
      
        Proceed to Checkout

      {/* 2. The modal window itself */}

          Confirm Payment
          
            Your card ending in 4242 will be charged $99.00.

        {/* Custom Body Content */}
        
          Subscription: Annual Pro Plan

        {/* Actions aligned to the right */}
        
          Cancel
          
            Pay Now

  );
}
```

## Controlled State

If you need to close the dialog programmatically (for instance, after a fetch request succeeds), you can control the open state directly.

```tsx

export function ControlledDialog() {
  const [open, setOpen] = useState(false);

  const handleSubmit = async () => {
    await saveToServer();
    setOpen(false); // Close programmatically after success
  };

  return (
    
      Open
      
        Save & Close

  );
}
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Dialog

          open

          boolean

          undefined

          The controlled open state of the dialog. Use this to programmatically
          open or close the modal from parent state.

          Dialog

          defaultOpen

          boolean

          false
        
        The starting state of the dialog when running uncontrollably.

          Dialog

          onOpenChange

          {`(open: boolean) => void`}

          undefined

          Event handler called when the open state of the dialog changes via a
          user action (like pressing Escape or clicking the backdrop).

          DialogContent

          hideCloseButton

          boolean

          false

          If true, removes the built-in 'X' icon in the top right corner of the
          dialog content box.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides for customized styling or spacing. For{" "}
          DialogContent, you can adjust the max-w-*{" "}
          class here to change the modal width.

---

**Component Path:** `nextjs\dialog\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
