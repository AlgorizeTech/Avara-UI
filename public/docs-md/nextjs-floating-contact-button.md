# Floating Contact Button

A high-converting, interactive floating support widget that anchors to any screen corner. Clicking the button expands a sleek glassmorphic chat interface powered by Framer Motion, featuring simulated agent replies, instantaneous `localStorage` theme coloring, and mobile-first responsiveness.

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

## Interactive Showcase

Test out the interactive chat box below. Type a message and hit enter to see simulated typing indicators and auto-replies. Use the control panel to flip screen corners or customize brand colors in real-time.

## Installation

### Dependencies

This component relies on **Framer Motion** for spring-physics popup animations and layout transitions, alongside **Lucide React** for UI icons.

```bash
npm install framer-motion lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/FloatingContactButtonBlock.tsx

## Implementation

```tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

        {children}

        {/* Placed at the root level of your application */}

  );
}
```

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
            "https://images.unsplash.com/..."
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
            "#6366f1"
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
            A unique string identifier required for React list rendering and Framer Motion layout animations.

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

**Component Path:** `nextjs\floating-contact-button\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
