export const metadata = docsPageMetadata("collapsible");

# Collapsible

An interactive component which expands/collapses a panel.

Traditional collapsible components rely on Javascript (like `Element.scrollHeight`) to calculate the exact height of the content before animating it. This causes layout thrashing and stuttering.

The `CollapsibleBlock` is **100% dependency-free** and utilizes a modern CSS grid trick (`grid-template-rows: 0fr` transitioning to `1fr`) to handle dynamic height animations natively in the browser. This guarantees perfect 60fps performance without writing any Javascript measuring logic.

From a bare disclosure to a nested file tree — the same three parts every time.

export const usageSettings = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function SettingsPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (

              Push Notifications

              Manage your alert preferences

        {/* Swap the affordance label using the same data-state hook */}
        
          Configure

          Close

               setEmailAlerts(!emailAlerts)}>
                Email Alerts
              
               setEmailAlerts(!emailAlerts)}
                className={\`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer \${
                  emailAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }\`}
              >
                {emailAlerts && }

               setSmsAlerts(!smsAlerts)}>
                SMS Alerts
              
               setSmsAlerts(!smsAlerts)}
                className={\`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer \${
                  smsAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }\`}
              >
                {smsAlerts && }

      {/* Second card starts closed — defaultOpen is per-instance. */}

              Security & API

              Tokens and authentication

        {/* Swap the affordance label using the same data-state hook */}
        
          Configure

          Close

                Production Key

                  Roll

  );
}`;

export const usageFileTree = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function FileTree() {
  return (
    // Collapsibles nest freely — each level owns its own open state.

        {/* Level 1: src */}

            src

            {/* The before: rule draws the vertical guide line for this level. */}
            
              {/* Level 2: app — open on first paint */}

                  app

                       layout.tsx

                       page.tsx

              {/* Level 2: components — closed, so no defaultOpen */}

                  components

                       Button.tsx

                       Collapsible.tsx

        {/* A root-level file, indented to line up with the tree's children. */}
        
           package.json

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/collapsible.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/collapsible
```

## Examples

## Features
Discover the Collapsible component's accessible disclosure patterns and smooth height transitions for hiding detailed content.

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

          Collapsible

          open

          boolean

          undefined

          The controlled open state of the collapsible. Must be used in
          conjunction with onOpenChange.

          Collapsible

          defaultOpen

          boolean

          false

          The initial open state of the collapsible when it is first rendered.
          Used for uncontrolled state management.

          Collapsible

          onOpenChange

          {`(open: boolean) => void`}

          undefined

          Event handler called when the open state of the collapsible changes.

          Collapsible

          disabled

          boolean

          false

          When true, prevents the user from interacting with the{" "}
          CollapsibleTrigger.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides for customized styling or spacing.

---

**Component Path:** `[framework]\collapsible\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
