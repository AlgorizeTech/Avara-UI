# Dialog (Modal)

A window overlaid on either the primary window or another dialog window, rendering the background content underneath inert.

Popovers and Dropdowns are great for quick, non-blocking actions. But when you need to force the user to make a decision or complete a complex form without distractions, you need a Dialog (Modal).

The `DialogBlock` component handles the complex DOM logic required for true accessibility: it automatically renders into a React Portal, locks the `document.body` scrollbar to prevent background scrolling, and actively listens for background clicks or the `Escape` key to dismiss itself smoothly.

Open each dialog from its trigger — the background scrollbar vanishes while it's open and returns exactly as it was on close.

`DialogContent` sizes itself from a `size` prop: `sm` through `xl` for panels that sit on the page, and `full` for a surface that takes the whole viewport with its content centred in the middle of it. Dialogs also nest — render one inside another's content and the inner window portals above its parent, with `Escape` and backdrop clicks reaching only whichever one is on top.

export const usageDefault = `// CopyField ships with the copy-button item:
// npx shadcn@latest add @algorize-ui/copy-button

export default function ShareDialog() {
  return (

           Share Profile

          Share Profile
          
            Anyone who has this link will be able to view this.

        {/* CopyField = read-only input + CopyButton. It confirms with an
            animated "Copied!" and leaves the dialog open so you can see it. */}

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

export const usageDestructive = `export default function DeleteAccountDialog() {
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

export const usageControlled = `export default function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Stand-in for your own request.
  const saveToServer = () => new Promise((r) => setTimeout(r, 800));

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

export const usageSizes = `import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";

const SIZES = ["sm", "md", "lg", "xl", "full"] as const;

export default function DialogSizes() {
  return (
    
      {SIZES.map((size) => (

              {size}

          {/* sm 24rem · md 32rem (default) · lg 42rem · xl 56rem · full viewport, content centred */}

              Size {size}
              
                Reach for the smallest size the content actually fits in.

              Close

      ))}
    
  );
}`;

export const usageConfirmDelete = `type Project = { id: string; name: string; meta?: string };

export default function ProjectList({
  projects,
  onDelete,
}: {
  projects: Project[];
  onDelete: (id: string) => Promise;
}) {
  // The row awaiting confirmation — null means the dialog is closed.
  const [pending, setPending] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pending) return;
    setDeleting(true);
    await onDelete(pending.id);
    setDeleting(false);
    setPending(null); // only now is the row really gone
  };

  return (
    <>
      {projects.map((project) => (
         setPending(project)}
          aria-label={"Delete " + project.name}
        >

      ))}

      {/* One dialog for the whole list, not one per row. */}
       {
          // Escape and backdrop clicks route through here too — ignore them
          // while the request is still in flight.
          if (!open && !deleting) setPending(null);
        }}
      >

            Delete “{pending?.name}”?
            
              This removes the project and the {pending?.meta ? pending.meta.split(" ")[0] : "selected"} files inside it. You cannot undo this.

               setPending(null)}
                disabled={deleting}
                className="px-4 py-2 border text-sm font-medium rounded-md disabled:opacity-60"
              >
                Cancel

                {deleting ? "Deleting…" : "Delete project"}

  );
}`;

export const usageNested = `const CUSTOMERS = [
  { id: "c1", name: "Northwind Traders" },
  { id: "c2", name: "Acme Robotics" },
];

export default function NestedDialog() {
  const [customer, setCustomer] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  return (

          New invoice

          New invoice
          
            Bill to {customer?.name ?? "nobody yet"}.

        {/* A second Dialog root, rendered inside the first one's content.
            It portals on top of its parent, and Escape or a backdrop click
            only reaches the dialog on top of the stack — so the invoice
            underneath stays exactly where the user left it. */}

              Choose customer

              Select a customer

            {CUSTOMERS.map((option) => (
               {
                  setCustomer(option);
                  setPickerOpen(false); // closes the picker only
                }}
                className="w-full px-2 py-2 text-left text-sm rounded-md hover:bg-zinc-100"
              >
                {option.name}
              
            ))}

                Back to invoice

            Create invoice

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/dialog
```

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

          DialogContent

          size

          {`"sm" | "md" | "lg" | "xl" | "full"`}

          "md"

          Panel width: sm ~24rem, md ~32rem,{" "}
          lg ~42rem, xl ~56rem. full{" "}
          fills the viewport, drops the rounding, border and{" "}
          max-height cap the inset sizes use, and centres its
          content in an md-wide column in the middle of the screen
          (override with className for an edge-to-edge layout).

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides for customized styling or spacing. On{" "}
          DialogContent it is merged after size, so a{" "}
          max-w-* class here wins — use it only when no step on the
          size scale fits.

---

**Component Path:** `[framework]\dialog\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
