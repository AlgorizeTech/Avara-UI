# Chat Application

A fully interactive, encapsulated chat interface. Features include search filtering, simulated typing/replies, dynamic unread badges, auto-scrolling, and a responsive mobile drawer sidebar.

## Examples

Every preview is live — pick a contact, search the list, or send a message and watch the simulated reply come back. `variant` changes the shell only; the conversation state, search and typing simulation are identical across all three.

export const usageDefault = `import ChatApp from "@/components/custom/blocks/Chat";

const currentUser = {
  avatar: "https://i.pravatar.cc/150?u=current",
  status: "online",
};

const contactsData = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://i.pravatar.cc/150?u=1",
  },
  {
    // No \`avatar\`? \`initials\` + \`color\` render the fallback tile instead.
    id: 2,
    name: "Adalberto Granzin",
    message: "If it takes long you can mail me a...",
    date: "Mar 12",
    unread: 0,
    status: "offline",
    initials: "AG",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
  },
];

export default function Messages() {
  return ;
}`;

export const usageMinimal = `import ChatApp from "@/components/custom/blocks/Chat";

export default function MinimalChat() {
  // Borders and shadows stripped back for embedding inside an existing panel.
  return (
    
  );
}`;

export const usageGlass = `import ChatApp from "@/components/custom/blocks/Chat";

export default function GlassChat() {
  return (
    // \`glass\` is translucent by design — give it a colorful backdrop to sit on.

  );
}`;

## Installation

## Features
Explore the Chat component's robust features, including message grouping, timestamping, and responsive layout structures.

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

          currentUser

          CurrentUser

          Required

          Object containing avatar (URL), status{" "}
          ("online" | "offline"), and optional name for the
          logged-in user.

          contactsData

          Contact[]

          Required

          Array of objects containing contact info (id,{" "}
          name, message, date,{" "}
          unread, status). Can accept{" "}
          avatar URL or fallback initials and{" "}
          color.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the send button, typing indicators,
          active contacts, and focus rings. "primary" follows your
          theme tokens; a hex string (e.g. "#00FF00") is injected
          as CSS variables. Unrecognised names fall back to{" "}
          "primary".

---

**Component Path:** `nextjs\chat\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
