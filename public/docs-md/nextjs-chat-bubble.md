# Animated Chat Bubble

A complete, GSAP-powered compound component system for building highly customized chat interfaces, messengers, and support widgets.

Building a polished chat interface requires handling complex edge cases: **message grouping** (dynamically adjusting border radiuses so stacked messages look connected), **typing indicators**, **read receipts**, and smooth entrance animations. This component abstracts all of that logic using React Context and high-performance GSAP animations.

---

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

Use the control panel below to test the sender colors and simulate an incoming message. Notice how the border-radius logic handles consecutive messages gracefully, and how GSAP handles the bouncy entrance physics.

## Installation

### Dependencies

This component relies on **GSAP** for the high-performance entrance and typing indicator animations, and **Lucide React** for the read receipt ticks.

```bash
npm install gsap lucide-react
```

### Copy the Component

You can copy the full engine code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/ChatBubbleBlock.tsx.

## Implementation

```tsx

export default function ChatInterface() {
  return (
    
      {/* Grouped Received Messages */}

        Hello! How can I help you today?

          I can answer questions, process data, or generate code.

      {/* Single Sent Message with Read Receipt */}

          Can you show me how to use the ChatBubble component?

      {/* Animated Typing Indicator */}

  );
}
```

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          ChatBubble

          variant

          "sent" | "received"

          "received"

          Dictates the alignment of the message. "sent" aligns
          right, "received" aligns left.

          ChatBubble

          layout

          "default" | "group-top" | "group-middle" | "group-bottom"

          "default"

          Controls the dynamic border-radius logic to seamlessly connect stacked
          messages from the same sender.

          ChatAvatar

          src

          string

          undefined
        
        Optional image URL for the user's avatar.

          ChatAvatar

          fallback

          string

          Required

          The text initials to display if the image is missing or fails to load.

          ChatMessage

          color

          "default" | "blue" | "indigo" | "rose" | "emerald"

          "default"

          Sets the background color of the bubble. Only applies when the parent{" "}
          variant is set to "sent".

          ChatTimestamp

          time

          string

          Required

          The timestamp string rendered below the text (e.g., "10:24 AM").

          ChatTimestamp

          status

          "sent" | "delivered" | "read"

          undefined

          Renders Lucide checkmarks to indicate read receipts. Only visible if
          the parent variant is "sent".

          All Components

          className

          string

          undefined

          Accepts custom Tailwind CSS classes to override default styling. All
          components also accept standard HTML &lt;div&gt;{" "}
          attributes.

---

**Component Path:** `nextjs\chat-bubble\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
