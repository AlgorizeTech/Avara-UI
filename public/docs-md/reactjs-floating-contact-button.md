# Floating Contact Button

A high-converting, interactive floating support widget that anchors to any screen corner. Clicking the button expands a sleek glassmorphic chat interface animated with plain CSS (no animation library), featuring simulated agent replies, instantaneous `localStorage` theme coloring, and mobile-first responsiveness.

Type a message in any preview and hit Enter to see the typing indicator and simulated reply. The previews use `containerMode="absolute"` so the widget stays inside its frame — in your app you would leave it `fixed`.

export const usageDefault = `export default function SupportWidget() {
  return (
     console.log("Send to your inbox:", message)}
    />
  );
}`;

export const usageLeft = `import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function LeftAnchoredWidget() {
  // Anchors to the opposite corner; the popup and its origin flip with it.
  return ;
}`;

export const usageClosed = `import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function CollapsedWidget() {
  // Start collapsed — the usual behaviour on a real page.
  return ;
}`;

export const usageBranding = `import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function BrandedWidget() {
  // \`title\`, \`subtitle\` and \`avatarUrl\` make up the popup header.
  return (
    
  );
}`;

export const usageAccent = `import { FloatingContactButtonBlock } from "@/components/custom/blocks/FloatingContactButtonBlock";

export default function AccentedWidget() {
  // \`defaultAccentColor\` takes a token name or any CSS color. Pass
  // \`localStorageKey\` and the widget picks up your app's stored brand color.
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/floating-contact-button
```

## Examples

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

    FloatingContactButtonBlock Props
    
      Extends React.HTMLAttributes&lt;HTMLDivElement&gt;. Accepts all standard native &lt;div&gt; attributes.

            Prop
            Type
            Default
            Description

            position
            "bottom-right" | "bottom-left"
            "bottom-right"
            Determines which viewport or container corner the trigger button and expanded chat modal adhere to.

            containerMode
            "fixed" | "absolute"
            "fixed"
            Layout positioning engine. Use "fixed" for production web pages to anchor to the viewport; use "absolute" inside documentation preview boxes.

            title
            string
            "Chat with us"
            The primary headline string rendered in the chat modal header next to the sparkles badge.

            subtitle
            string
            "We typically reply in a few minutes"
            The secondary status string displayed beneath the title in the header.

            avatarUrl
            string
            "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224285/photo-1469474968028-56623f02e42e-1790146212205-1790224284635.webp"
            Image URL for the support agent avatar rendered in the header with an online status badge.

            defaultOpen
            boolean
            false
            Whether the chat modal should render expanded by default when the component mounts.

            localStorageKey
            string
            "primaryColor"
            The storage key string monitored by the instant detection engine to sync brand colors across tabs.

            defaultAccentColor
            string
            "var(--primary)"
            The fallback hex color applied to the header, user message bubbles, and trigger button if no key is found in storage.

            initialMessages
            ChatMessage[]
            Default greeting array
            An array of message objects populated in the chat thread when the user opens the widget.

            onSendMessage
            (message: string) =&gt; void
            undefined
            Callback function fired whenever the user submits a new text message via the input bar.

    ChatMessage Interface
    
      Used for structuring items inside the initialMessages array and managing conversation state.

            Property
            Type
            Required
            Description

            id
            string
            Yes
            A unique string identifier required for React list rendering; each new message animates in once, when it mounts.

            text
            string
            Yes
            The text body string rendered inside the message bubble.

            sender
            "user" | "agent"
            Yes
            Determines bubble alignment and styling. "user" aligns right with the accent color; "agent" aligns left with neutral styling.

            timestamp
            string
            Yes
            Formatted time string (e.g., "2:45 PM" or "Just now") displayed beneath the message bubble.

---

**Component Path:** `[framework]\floating-contact-button\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
