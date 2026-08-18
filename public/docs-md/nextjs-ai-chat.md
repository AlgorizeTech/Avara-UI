# AI Assistant Chat

A premium, interactive LLM chat interface featuring conversation history management, real-time typing indicators, editable chat titles, and modern structural variants.

## Examples

Every preview is live — send a prompt to see the simulated stream, rename a thread, or hit **New Chat**. `variant` changes the shell only; history management and the typing indicator behave identically in all three.

export const usageDefault = `import AIChat from "@/components/custom/blocks/Ai-chat";

const chatHistory = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
];

const initialMessages = [
  {
    id: 1,
    role: "ai",
    content: "Hello! I am your AI assistant. How can I help you today?",
    time: "10:00 AM",
  },
  {
    id: 2,
    role: "user",
    content: "Can you help me build a modern dashboard UI using Tailwind CSS?",
    time: "10:02 AM",
  },
];

export default function Assistant() {
  return (

  );
}`;

export const usageMinimal = `import AIChat from "@/components/custom/blocks/Ai-chat";

export default function MinimalAssistant() {
  return (
    
      {/* Card chrome and dividers removed — drops cleanly into an existing panel. */}

  );
}`;

export const usageGlass = `import AIChat from "@/components/custom/blocks/Ai-chat";

export default function GlassAssistant() {
  return (
    // \`glass\` is translucent by design — give it a colorful backdrop to sit on.

  );
}`;

## Installation

## Features
Explore the Ai-Chat interface features, including message streaming, typing indicators, and seamless integration with AI models.

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

          chatHistory

          ChatThread[]

          []

          Array of objects containing id, title, and
          string date group ("Today", etc) for the sidebar.

          initialMessages

          Message[]

          []

          Array of initial message objects (id, role,{" "}
          content, time) to populate the active chat
          window.

          variant

          "default" | "minimal" | "glass"

          "default"
        
        Applies overarching structural and aesthetic layout styling.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the active states, buttons, gradients,
          and send icons. "primary" follows your theme tokens; a
          hex string (e.g. "#8b5cf6") is injected as CSS variables.
          Unrecognised names fall back to "primary".

---

**Component Path:** `nextjs\ai-chat\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
