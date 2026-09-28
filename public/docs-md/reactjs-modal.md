# Modal

A composable overlay. `Modal` owns the hard parts — the portal, the backdrop, the scroll lock, Escape and backdrop dismissal, and the enter/exit transition — and nothing else. There is no preset layout and no `variant`: the panel renders exactly the markup you put inside it.

`ModalHeader`, `ModalBody` and `ModalFooter` are optional slots with sensible padding and dividers. Use them, restyle them through `className`, or skip them entirely and write your own body.

Open state is yours. `Modal` is controlled: you hold `isOpen` and it renders against it, so the same modal can be driven by a button, a route, or the end of an async call.

Every example below is that composition — what the preview renders is exactly what the **Usage** tab hands you. The only things that change between them are the classes on `contentClassName` and the markup inside.

export const usageStandard = `export default function UpdateModal() {
  // Modal is controlled — you own isOpen, it renders against it.
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Open Standard Modal

       setIsOpen(false)}
        contentClassName="max-w-md bg-background rounded-2xl shadow-xl border border-border"
      >

                    System Update Available

                    v2.4.0 Live

            }
          />

              A new software update is ready to be installed. This update
              includes new features, performance improvements, and critical
              security patches.

             setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
            >
              Remind Me Later
            
             setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Install Now

  );
}`;

export const usageForm = `export default function InviteModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Viewer");

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Open Form Modal

      {/* max-w-lg on contentClassName is the only sizing knob you need. */}
       setIsOpen(false)}
        contentClassName="max-w-lg bg-background rounded-2xl shadow-xl border border-border"
      >
        
          Invite Team Member

              Email Address

              Role & Permissions
            
            {/* Any control drops straight in — this one is the \`select\` block. */}

              Personal Message (Optional)

           setIsOpen(false)}
            className="px-5 py-2.5 rounded-lg font-medium text-muted-foreground hover:bg-muted/50 transition-colors"
          >
            Cancel
          
           setIsOpen(false)}
            className="px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Send Invite

  );
}`;

export const usageConfirmation = `export default function ConfirmDeleteModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Open Confirmation Modal

      {/* No ModalHeader here, so ariaLabel names the dialog instead. */}
       setIsOpen(false)}
        contentClassName="max-w-sm bg-background rounded-2xl shadow-xl border border-border"
        ariaLabel="Delete permanently?"
      >

            Delete permanently?

            Are you sure you want to delete this item? This action cannot be
            undone and all data will be lost.

             setIsOpen(false)}
              className="flex-1 py-2.5 rounded-lg font-medium text-muted-foreground border border-border hover:bg-muted transition-colors"
            >
              Cancel
            
             setIsOpen(false)}
              className="flex-1 py-2.5 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors"
            >
              Delete

  );
}`;

export const usageFullscreen = `export default function SettingsModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Open Fullscreen Modal

      {/* A height on the panel plus flex inside pins the header and footer. */}
       setIsOpen(false)}
        contentClassName="max-w-5xl h-[90vh] bg-background rounded-2xl shadow-xl border border-border"
      >
        
          {/* pr-12 keeps the title clear of the close button. */}

                Project Configuration

                Manage all global settings for your workspace.

          {/* max-h-none drops the body's own cap so flex-1 governs the height. */}

                  General

                  Security

             setIsOpen(false)}
              className="py-2 sm:py-0 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
            >
              Delete Project

               setIsOpen(false)}
                className="px-6 py-3 rounded-lg font-medium text-muted-foreground hover:bg-muted transition-colors"
              >
                Discard Changes
              
               setIsOpen(false)}
                className="px-6 py-3 rounded-lg font-semibold shadow-md transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Save Configuration

  );
}`;

export const usageGlass = `export default function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
       setIsOpen(true)}
        className="px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
      >
        Open Glass Modal

      {/* Same markup as the standard modal — only these two class props differ. */}
       setIsOpen(false)}
        overlayClassName="bg-black/50 backdrop-blur-md"
        contentClassName="max-w-md bg-card/80 backdrop-blur-2xl backdrop-saturate-200 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/60 dark:border-white/20 text-foreground"
      >

                    System Update Available

                    v2.4.0 Live

            }
          />

              A new software update is ready to be installed. This update
              includes new features, performance improvements, and critical
              security patches.

             setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors"
            >
              Remind Me Later
            
             setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Install Now

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/modal
```

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
    Name every modal: put the heading inside ModalHeader, or pass ariaLabel when the heading lives elsewhere. Size the panel on contentClassName rather than wrapping the modal in a sized container — the panel is portalled to document.body, so a wrapper cannot constrain it.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Modal

          isOpen

          boolean

          required

          The open state. Modal is fully controlled — it never holds this
          itself, so the same modal can be driven by a button, a route or the
          end of an async call.

          Modal

          onClose

          {`() => void`}

          required

          Called once the close transition has finished, whether it was started
          by the built-in X, the Escape key or a backdrop click.
          Set isOpen to false here.

          Modal

          contentClassName

          string

          undefined

          Classes for the panel. This is where the modal is sized and skinned —
          adjust max-w-*, give it a height, or swap the background
          and border for a glass treatment.

          Modal

          overlayClassName

          string

          undefined

          Classes for the backdrop, e.g.{" "}
          bg-black/50 backdrop-blur-md behind a translucent panel.

          Modal

          primaryCloseButton

          boolean

          false

          Renders the close button as a tinted primary chip instead of a bare
          icon, for panels where the plain X gets lost.

          Modal

          hideCloseButton

          boolean

          false

          Removes the built-in X, for flows where the user has to pick one of
          your own actions. Escape and the backdrop still dismiss.

          Modal

          ariaLabel

          string

          undefined

          Labels the dialog directly. Pass it whenever the heading is not inside{" "}
          ModalHeader — without it the panel points{" "}
          aria-labelledby at the header.

          ModalHeader

          title

          React.ReactNode

          undefined

          Shorthand for the header content when you do not need custom markup.{" "}
          children wins when both are given.

          All Components

          className

          string

          undefined

          Tailwind overrides merged over each slot's defaults — the header's
          divider and padding, the body's{" "}
          max-h-[calc(100vh-150px)] cap, the footer's right-aligned
          row.

          All Components

          children

          React.ReactNode

          undefined

          Whatever you want to render. Every slot is optional — a modal made of
          nothing but a ModalBody is a perfectly normal modal.

---

**Component Path:** `[framework]\modal\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
