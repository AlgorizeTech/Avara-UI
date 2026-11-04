---
title: "Shadcn Collapsible"
description: "An interactive component which expands/collapses a panel. Free shadcn/ui Collapsible component for React, Next.js and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/collapsible
---

# Shadcn Collapsible

An interactive component which expands/collapses a panel.

Traditional collapsible components rely on Javascript (like `Element.scrollHeight`) to calculate the exact height of the content before animating it. This causes layout thrashing and stuttering.

The `CollapsibleBlock` is **100% dependency-free** and utilizes a modern CSS grid trick (`grid-template-rows: 0fr` transitioning to `1fr`) to handle dynamic height animations natively in the browser. This guarantees perfect 60fps performance without writing any Javascript measuring logic.

From a bare disclosure to a nested file tree — the same three parts every time.

## Settings panel

- `children` of `CollapsibleTrigger` can be any markup — icons, subtitles, or a label that swaps with the open state.

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";


export default function SettingsPanel() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);

  return (
    <div className="w-full max-w-lg space-y-4">
      <Collapsible defaultOpen className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-muted transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Push Notifications
            </h4>
            <p className="text-xs text-muted-foreground">
              Manage your alert preferences
            </p>
          </div>
        </div>
        {/* Swap the affordance label using the same data-state hook */}
        <div className="text-xs font-medium text-muted-foreground group-data-[state=open]:hidden">
          Configure
        </div>
        <div className="text-xs font-medium text-muted-foreground hidden group-data-[state=open]:block">
          Close
        </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 border-t border-border mt-2 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground/80 cursor-pointer" onClick={() => setEmailAlerts(!emailAlerts)}>
                Email Alerts
              </label>
              <button
                type="button"
                role="checkbox"
                aria-checked={emailAlerts}
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                  emailAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }`}
              >
                {emailAlerts && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm text-foreground/80 cursor-pointer" onClick={() => setSmsAlerts(!smsAlerts)}>
                SMS Alerts
              </label>
              <button
                type="button"
                role="checkbox"
                aria-checked={smsAlerts}
                onClick={() => setSmsAlerts(!smsAlerts)}
                className={`w-4 h-4 rounded flex items-center justify-center border transition-all cursor-pointer ${
                  smsAlerts
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-input bg-background"
                }`}
              >
                {smsAlerts && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Second card starts closed — defaultOpen is per-instance. */}
      <Collapsible className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-muted transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-left">
            <h4 className="text-sm font-semibold text-foreground">
              Security & API
            </h4>
            <p className="text-xs text-muted-foreground">
              Tokens and authentication
            </p>
          </div>
        </div>
        {/* Swap the affordance label using the same data-state hook */}
        <div className="text-xs font-medium text-muted-foreground group-data-[state=open]:hidden">
          Configure
        </div>
        <div className="text-xs font-medium text-muted-foreground hidden group-data-[state=open]:block">
          Close
        </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-5 border-t border-border mt-2 space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Production Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="sk_live_123456789"
                  readOnly
                  className="flex-1 bg-muted border border-input rounded-md p-2 text-sm text-muted-foreground"
                />
                <button className="px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium rounded-md">
                  Roll
                </button>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

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

### File tree

Collapsibles nest freely; each level keeps its own open state.

- `defaultOpen` is per-level, so you can expand a branch without expanding its parent.

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";

export default function FileTree() {
  return (
    // Collapsibles nest freely — each level owns its own open state.
    <div className="w-full max-w-sm bg-card border border-border rounded-xl p-4 shadow-sm font-mono text-sm">
      <div className="space-y-1">
        {/* Level 1: src */}
        <Collapsible defaultOpen>
          <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group">
            <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
            <Folder className="w-4 h-4 text-primary shrink-0" />
            <span>src</span>
          </CollapsibleTrigger>

          <CollapsibleContent>
            {/* The before: rule draws the vertical guide line for this level. */}
            <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
              {/* Level 2: app — open on first paint */}
              <Collapsible defaultOpen>
                <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group relative z-10">
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  <Folder className="w-4 h-4 text-primary shrink-0" />
                  <span>app</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> layout.tsx
                    </div>
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> page.tsx
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Level 2: components — closed, so no defaultOpen */}
              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-muted rounded-md text-foreground/80 group relative z-10">
                  <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />
                  <Folder className="w-4 h-4 text-primary shrink-0" />
                  <span>components</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-border mt-1 mb-1">
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> Button.tsx
                    </div>
                    <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-6 relative z-10">
                      <File className="w-4 h-4 shrink-0" /> Collapsible.tsx
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* A root-level file, indented to line up with the tree's children. */}
        <div className="flex items-center gap-2 p-1.5 text-muted-foreground hover:bg-muted rounded-md cursor-pointer ml-[22px]">
          <File className="w-4 h-4 shrink-0" /> package.json
        </div>
      </div>
    </div>
  );
}
```

## Features
Discover the Collapsible component's accessible disclosure patterns and smooth height transitions for hiding detailed content.

### Customizable

Easily adapt the component's styling and behavior to fit your application's unique design system.

### Accessible

Built with accessibility in mind, ensuring all users can interact with your application effectively.

### Responsive

Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

### Performant

Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

### Usage Guidelines

Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `Collapsible` | `open` | `boolean` | `undefined` | The controlled open state of the collapsible. Must be used in conjunction with `onOpenChange`. |
| `Collapsible` | `defaultOpen` | `boolean` | `false` | The initial open state of the collapsible when it is first rendered. Used for uncontrolled state management. |
| `Collapsible` | `onOpenChange` | `(open: boolean) => void` | `undefined` | Event handler called when the open state of the collapsible changes. |
| `Collapsible` | `disabled` | `boolean` | `false` | When true, prevents the user from interacting with the `CollapsibleTrigger`. |
| All Components | `className` | `string` | `undefined` | Standard Tailwind CSS overrides for customized styling or spacing. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/collapsible
