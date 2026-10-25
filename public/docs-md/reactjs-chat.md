export const metadata = docsPageMetadata("chat");

# Chat Application

A fully interactive, encapsulated chat interface. Features include search filtering, simulated typing/replies, dynamic unread badges, auto-scrolling, and a responsive mobile drawer sidebar.

Every preview is live — pick a contact, search the list, or send a message and watch the simulated reply come back. `variant` changes the shell only; the conversation state, search and typing simulation are identical across all three.

export const chatData = `const currentUser: CurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const contactsData: Contact[] = [
  {
    id: 1,
    name: "Felecia Rower",
    message: "I will purchase it for sure. 👍",
    date: "Mar 13",
    unread: 1,
    status: "offline",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-1790148865113.jpg",
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
  {
    id: 3,
    name: "Zenia Jacobs",
    message: "Thank you, looking forward to it.",
    date: "Dec 13",
    unread: 0,
    status: "online",
    initials: "ZJ",
    color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
  },
  {
    id: 4,
    name: "Miguel Guelff",
    message: "Can we schedule a meeting for tomorrow?",
    date: "Dec 11",
    unread: 0,
    status: "online",
    avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148865/80-3-1790148865112.jpg",
  },
];`;

export const usageDefault = `import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

${chatData}

export default function Messages() {
  return ;
}`;

export const usageMinimal = `import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

${chatData}

export default function MinimalChat() {
  // Two cards instead of one: the contact list and the thread are separate
  // bordered cards with a gap between them, sitting directly on the page.
  return (
    
  );
}`;

export const usageGlass = `import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

${chatData}

export default function GlassChat() {
  return (
    // \`glass\` is translucent by design — give it a background image or rich pattern to sit on.

  );
};`;

export const usageLiquidGlass = `import ChatApp, { type Contact, type CurrentUser } from "@/components/custom/blocks/Chat";

${chatData}

export default function LiquidGlassChat() {
  return (
    // Real liquid SVG glass displacement with multi-layer reflections and specular highlights

  );
};`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/chat.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/chat
```

## Examples

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

          "default" | "minimal" | "glass" | "liquid-glass"

          "default"

          The shell. default is one card with the list and the
          thread side by side; minimal is two separate cards —
          the list and the thread — with a gap between them and no outer box;
          glass is one translucent card over a photo; liquid-glass provides true SVG displacement liquid refraction.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the send button, typing indicators,
          active contacts, and focus rings. Accepts preset theme names or valid custom hex codes (e.g.{" "}
          "#00FF00").

---

**Component Path:** `[framework]\chat\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
