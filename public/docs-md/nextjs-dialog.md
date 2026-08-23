# Dialog (Modal)

A window overlaid on either the primary window or another dialog window, rendering the background content underneath inert.

Popovers and Dropdowns are great for quick, non-blocking actions. But when you need to force the user to make a decision or complete a complex form without distractions, you need a Dialog (Modal).

The `DialogBlock` component handles the complex DOM logic required for true accessibility: it automatically renders into a React Portal, locks the `document.body` scrollbar to prevent background scrolling, and actively listens for background clicks or the `Escape` key to dismiss itself smoothly.

Open each dialog from its trigger — the background scrollbar vanishes while it's open and returns exactly as it was on close.

export const usageDefault = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function ShareDialog() {
  return (

           Share Profile

          Share Profile
          
            Anyone who has this link will be able to view this.

            Copy Link

          Your profile is currently public.

  );
}`;

export const usageForm = `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function EditProfileDialog() {
  return (

           Edit Profile

      {/* className adjusts the max width of the modal */}

          Edit Profile
          
            Make changes to your profile here. Click save when you're done.

            Name

            Username

        {/* DialogClose dismisses the modal without wiring up state */}

              Cancel

              Save changes

  );
}`;

export const usageDestructive = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function DeleteAccountDialog() {
  return (

           Delete Account

             Are you absolutely sure?

            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.

            Cancel
            
              Yes, delete account

  );
}`;

export const usageNoClose = `import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

export default function TermsDialog() {
  return (

          Accept terms

      {/* hideCloseButton removes the built-in "X" so the user must choose */}

          Terms of Service
          
            There is no “X” here — the user has to pick one of the buttons below
            (or press Escape).

            Decline
            Accept

  );
}`;

export const usageControlled = `import { useState } from "react";

export default function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await saveToServer();
    setSaving(false);
    setOpen(false); // close programmatically once the work is done
  };

  return (

          Save settings

          Save settings
          
            The dialog closes itself once the save finishes.

            {saving ? "Saving…" : "Save changes"}

  );
}`;

## Installation

## Examples

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

**Component Path:** `[framework]\dialog\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
