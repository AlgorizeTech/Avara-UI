# AI Assistant Chat

A premium, interactive LLM chat interface featuring conversation history management, real-time typing indicators, editable chat titles, and modern structural variants.

## Interactive Showcase

Explore the different structural variants of the AI Chat component. Toggle between standard, minimal, and glassmorphism layouts, and apply dynamic color themes. Try sending a prompt to the AI, or click "New Chat" to test the UI interactions.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

---

## Installation

### 1. Install Dependencies

This component relies on `lucide-react` for its beautiful, lightweight iconography. Run the following command:

```bash
npm install lucide-react
```

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
