# AI Assistant Chat

A premium, interactive LLM chat interface featuring conversation history management, real-time typing indicators, editable chat titles, and modern structural variants.

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

## Interactive Showcase

Explore the different structural variants of the AI Chat component. Toggle between standard, minimal, and glassmorphism layouts, and apply dynamic color themes. Try sending a prompt to the AI, or click "New Chat" to test the UI interactions.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation

### 1. Install Dependencies

This component relies on `lucide-react` for its beautiful, lightweight iconography. Run the following command:

```bash
npm install lucide-react
```

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

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the active states, buttons, gradients,
          and send icons.

---

**Component Path:** `nextjs\ai-chat\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
