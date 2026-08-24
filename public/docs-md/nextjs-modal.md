# Modal Dialog

A highly animated, dynamic Modal component. Built from scratch using `gsap` for butter-smooth scaling and fading animations. It includes distinct visual variants and content types to handle alerts, forms, and complex interfaces.

Click the trigger in each preview to open that modal. The `type` prop swaps the layout inside the modal; `variant` restyles the container.

_Note: in these previews the modal is absolutely positioned so it stays inside the box. In your app it covers the whole viewport._

export const usageDefault = `import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/custom/blocks/ModalBlock";

export default function UserDetailsModal({ data, isOpen, onClose }) {
  return (

        {data && (
          
            {/* Identity */}

                  {data.name?.[0] || "U"}
                
                {data.emailVerified && (
                  
                )}

                {data.name || "Unnamed user"}

                  {data.email || "—"}

            {/* Contact */}
            
              Phone: {data.phone || "—"}
              Address: {data.address || "—"}

        )}

          Close

  );
}`;

export const usageForm = `import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/custom/blocks/ModalBlock";

export default function FormModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Invite Member
       setIsOpen(false)} contentClassName="max-w-lg">

           setIsOpen(false)}>Cancel
           setIsOpen(false)}>Send Invite

  );
}`;

export const usageConfirmation = `import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/custom/blocks/ModalBlock";

export default function ConfirmModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Delete Item
       setIsOpen(false)} contentClassName="max-w-sm">
        
          Delete permanently?
          This action cannot be undone.

           setIsOpen(false)}>Cancel
           setIsOpen(false)} className="bg-red-600 text-white">Delete

  );
}`;

export const usageFullscreen = `import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/custom/blocks/ModalBlock";

export default function FullscreenModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Project Settings
       setIsOpen(false)} contentClassName="max-w-5xl h-[90vh]">

          Manage all workspace settings here.

           setIsOpen(false)}>Save Changes

  );
}`;

export const usageGlass = `import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/custom/blocks/ModalBlock";

export default function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}>Open Glass Modal
       setIsOpen(false)}
        overlayClassName="bg-black/30 backdrop-blur-sm"
        contentClassName="bg-white/45 dark:bg-zinc-900/45 backdrop-blur-2xl backdrop-saturate-200 border border-white/50 dark:border-white/20 ring-1 ring-black/5 dark:ring-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-zinc-900 dark:text-white"
      >

          Apple macOS aesthetic glassmorphism with vivid backdrop blur refraction.

  );
}`;

## Installation

## Examples

## Features
Discover the Modal's flexible overlay features, designed for important user prompts with accessible focus management and animations.

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

        Prop
        Type
        Default
        Description

          type

          "standard" | "form" | "fullscreen" | "confirmation"

          "standard"

          Changes the internal structure and dimensions of the modal content.

          variant

          "default" | "glass" | "minimal" | "bordered"

          "default"

          Applies overarching structural styles to the modal container.{" "}
          glass adds deep backdrop blurring, while{" "}
          minimal removes borders and harsh shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary buttons, focus rings, and
          accent icons. Accepts valid hex codes (e.g. "#00FF00").

---

**Component Path:** `[framework]\modal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
