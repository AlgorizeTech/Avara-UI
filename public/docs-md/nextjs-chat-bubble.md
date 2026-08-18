# Animated Chat Bubble

A complete, GSAP-powered compound component system for building highly customized chat interfaces, messengers, and support widgets.

Building a polished chat interface requires handling complex edge cases: **message grouping** (dynamically adjusting border radiuses so stacked messages look connected), **typing indicators**, **read receipts**, and smooth entrance animations. This component abstracts all of that logic using React Context and high-performance GSAP animations.

---

## Examples

These are compound components: `ChatBubble` is the root and publishes `variant` and `layout` through context, so `ChatAvatar`, `ChatMessage` and `ChatTimestamp` style themselves without being told twice.

export const usageConversation = `import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
  ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function ChatInterface() {
  return (

        Hey! Did you check out the new Docs UI kit?

          It has a really clean compound component pattern.

          Yeah, I'm playing with it right now.

  );
}`;

export const usageGrouping = `import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function GroupedMessages() {
  return (
    
      {/* \`layout\` is the only thing that connects stacked messages — set it
          per bubble and the radii and avatar visibility follow. */}

        Three messages, one sender.

        The inner corners tighten to 4px…

        …and only the last one keeps the avatar.

      {/* The same three values mirror for outgoing messages. */}

          The same logic mirrors for sent messages.

          No manual border-radius maths required.

  );
}`;

export const usageReceipts = `import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTimestamp,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function ReadReceipts() {
  return (
    
      {/* \`status\` is read from the bubble's \`variant\` — ticks render on sent
          messages only, so a received bubble shows the time alone. */}

          Received bubbles show the time only.

          Sent — a single tick.

          Delivered — double tick.

          Read — double tick, accented.

  );
}`;

export const usageTyping = `import {
  ChatAvatar,
  ChatBubble,
  ChatMessage,
  ChatTypingIndicator,
} from "@/components/custom/blocks/ChatBubbleBlock";

export default function TypingIndicator() {
  return (
    
      {/* Drop the message padding and background so the three dots float on
          their own while you wait for the reply. */}

  );
}`;

## Installation

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

          "primary" | "default" | "blue" | "indigo" | "rose" | "emerald"

          "primary"

          Sets the background color of the bubble. Only applies when the parent{" "}
          variant is set to "sent".{" "}
          "primary" and "default" both follow your
          theme tokens, and any unlisted value falls back to them — this is a
          fixed set, not an arbitrary hex.

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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
