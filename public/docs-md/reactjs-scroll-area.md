# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

This `ScrollAreaBlock` provides a beautiful, native-feeling scrollbar that works seamlessly across Webkit browsers (Chrome, Safari, Edge) and Firefox. It uses pure CSS and avoids heavy third-party dependencies while allowing deep theme integration.

Give the block a height or width constraint and it takes over the scrollbar styling from there — same rendering in Webkit and Firefox.

export const scrollAccent = `// The accent the preview themes its badges and pills with.
const accent = {
  badge: "bg-primary/10 text-primary border-primary/20",
  pill: "bg-primary text-primary-foreground",
};`;

export const messagesSource = `const messages = [
  {
    id: 1,
    name: "Elena Rostova",
    time: "12:45 PM",
    unread: 2,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "Hey! Just pushed the updated Next.js typography engine.",
  },
  {
    id: 2,
    name: "Alex Rivers",
    time: "11:30 AM",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "The new scroll area components look super clean!",
  },
  {
    id: 3,
    name: "Sophia Chen",
    time: "Yesterday",
    unread: 1,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Can we review the Figma tokens for dark mode theme colors?",
  },
  {
    id: 4,
    name: "Marcus Vance",
    time: "Yesterday",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "Merged PR #108. All responsive unit tests are passing.",
  },
  {
    id: 5,
    name: "Aria Thorne",
    time: "Aug 15",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Great work on the 60fps cursor animation performance fix!",
  },
  {
    id: 6,
    name: "Lucas Meyer",
    time: "Aug 14",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Deployed the latest documentation suite to production.",
  },
  {
    id: 7,
    name: "Daniel Kim",
    time: "Aug 13",
    unread: 3,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "Updated GraphQL schema resolvers for real-time notifications.",
  },
  {
    id: 8,
    name: "Maya Lin",
    time: "Aug 12",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "Added automated E2E test suites for all interactive blocks.",
  },
  {
    id: 9,
    name: "Liam O'Connor",
    time: "Aug 11",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Optimized bundle size by tree-shaking icon dependencies.",
  },
  {
    id: 10,
    name: "Nina Patel",
    time: "Aug 10",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=100&q=80",
    status: "online",
    message: "Configured Vercel Analytics and Sentry error monitoring.",
  },
  {
    id: 11,
    name: "Ethan Wright",
    time: "Aug 09",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Refactored theme customizer with HSL CSS variables.",
  },
  {
    id: 12,
    name: "Olivia Zhang",
    time: "Aug 08",
    unread: 0,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    status: "offline",
    message: "Published release notes for v2.4.0 UI component library.",
  },
];

function DirectMessages() {
  return (

          Direct Messages

          3 Unread

      {messages.map((item) => (

              {item.name}
              
                {item.time}

              {item.message}

          {item.unread > 0 && (
            
              {item.unread}
            
          )}
        
      ))}
    
  );
}`;

export const artworkSource = `const artwork = [
  {
    id: 1,
    title: "Alpine Lake Reflection",
    author: "Julian Vance",
    category: "Mountain",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    title: "Misty Evergreen Forest",
    author: "Elena Rostova",
    category: "Forest",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    title: "Northern Aurora Borealis",
    author: "Sophia Chen",
    category: "Aurora",
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 4,
    title: "Tropical Ocean Sunset",
    author: "David K.",
    category: "Beach",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 5,
    title: "Golden Autumn Wilderness",
    author: "Aria Thorne",
    category: "Autumn",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 6,
    title: "Cascading Canyon Falls",
    author: "Lucas Meyer",
    category: "Waterfall",
    image: "https://images.unsplash.com/photo-1434394354979-a235cd36269d?auto=format&fit=crop&w=600&q=80",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
  },
];

function ArtworkRail() {
  return (
    
      {artwork.map((art) => (

              {art.category}

            {art.title}

                {art.author}

      ))}
    
  );
}`;

export const boardSource = `const columns = [
  {
    column: "Backlog",
    tasks: [
      { name: "Figma UI Token Export", tag: "Design", size: "3.1 MB" },
      { name: "GraphQL Schema Draft", tag: "API", size: "1.8 MB" },
      { name: "Unit Tests for ScrollArea", tag: "Testing", size: "2.4 MB" },
      { name: "Lighthouse Performance Audit", tag: "SEO", size: "4.0 MB" },
      { name: "Redis Cache Layer Setup", tag: "Backend", size: "2.9 MB" },
      { name: "i18n Multi-language Specs", tag: "Locale", size: "1.2 MB" },
      { name: "Storybook UI Documentation", tag: "Docs", size: "3.7 MB" },
    ],
  },
  {
    column: "In Progress",
    tasks: [
      { name: "OAuth 2.0 Auth Flow", tag: "Security", size: "4.2 MB" },
      { name: "Stripe Billing Portal", tag: "Payments", size: "2.8 MB" },
      { name: "Dark Mode Theme Tokens", tag: "Styling", size: "1.5 MB" },
      { name: "Websocket Event Hub", tag: "Backend", size: "5.1 MB" },
      { name: "Notification Push Service", tag: "Infra", size: "3.3 MB" },
      { name: "Search Index Optimization", tag: "Algolia", size: "6.4 MB" },
      { name: "Realtime Analytics Engine", tag: "Telemetry", size: "4.8 MB" },
    ],
  },
  {
    column: "Under Review",
    tasks: [
      { name: "Scroll Area Both Axes", tag: "UI Block", size: "3.4 MB" },
      { name: "Framer Motion Physics", tag: "Animation", size: "6.0 MB" },
      { name: "PostgreSQL Migration", tag: "Database", size: "8.2 MB" },
      { name: "S3 Asset Optimizer", tag: "Storage", size: "1.9 MB" },
      { name: "JWT Token Rotation Spec", tag: "Auth", size: "2.2 MB" },
      { name: "Docker Container Health", tag: "DevOps", size: "5.5 MB" },
      { name: "Tailwind CSS Plugin Sync", tag: "Styling", size: "1.6 MB" },
    ],
  },
  {
    column: "QA Testing",
    tasks: [
      { name: "Mobile Safari Touch Test", tag: "Mobile", size: "2.3 MB" },
      { name: "Keyboard Nav Accessibility", tag: "a11y", size: "1.7 MB" },
      { name: "Cross Browser Flex Layout", tag: "CSS", size: "3.9 MB" },
      { name: "Image Lazy Load Verify", tag: "Perf", size: "2.0 MB" },
      { name: "E2E Playwright Automation", tag: "Testing", size: "7.1 MB" },
      { name: "API Error Fallback Check", tag: "Resilience", size: "1.4 MB" },
      { name: "Form Validation Edge Cases", tag: "Forms", size: "2.5 MB" },
    ],
  },
  {
    column: "Approved",
    tasks: [
      { name: "Typography System Engine", tag: "Core UI", size: "2.1 MB" },
      { name: "Cursor Animation Fix", tag: "Physics", size: "1.1 MB" },
      { name: "Custom Code Block Line Steps", tag: "Docs", size: "4.5 MB" },
      { name: "Data Grid Sorting Filter", tag: "Table", size: "7.3 MB" },
      { name: "Skeleton Profile Centering", tag: "Layout", size: "1.3 MB" },
      { name: "Resizable Sandbox Drag", tag: "UX", size: "3.0 MB" },
      { name: "Header Sticky Navigation", tag: "Site", size: "2.7 MB" },
    ],
  },
  {
    column: "Production",
    tasks: [
      { name: "Vercel Edge Deployment", tag: "DevOps", size: "12.4 MB" },
      { name: "CDN Cache Headers", tag: "Network", size: "0.8 MB" },
      { name: "Global Design Tokens v2", tag: "Design", size: "5.6 MB" },
      { name: "Production Analytics Hook", tag: "Telemetry", size: "3.2 MB" },
      { name: "Sentry Error Monitoring", tag: "Observability", size: "4.1 MB" },
      { name: "SSL TLS Certificate Auto", tag: "Security", size: "0.5 MB" },
      { name: "Zero Downtime Deploy Script", tag: "CI/CD", size: "6.8 MB" },
    ],
  },
];

function Board() {
  return (
    
      {columns.map((col) => (

            {col.column}
            
              {col.tasks.length}

          {col.tasks.map((task) => (

                  {task.tag}

                  {task.size}

              {task.name}
            
          ))}
        
      ))}
    
  );
}`;

export const usageDefault = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${scrollAccent}

${messagesSource}

export default function MessageList() {
  return (

  );
}`;

export const usageHorizontal = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${artworkSource}

export default function ArtworkScroller() {
  // A horizontal area needs content wider than the box — `w-max` on the row.
  return (

  );
}`;

export const usageBoth = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${scrollAccent}

${boardSource}

export default function BoardScroller() {
  // Content taller AND wider than the box, so both bars appear.
  return (

  );
}`;

export const usageMinimal = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${scrollAccent}

${messagesSource}

export default function MinimalScroller() {
  // Thinner thumb, no track chrome.
  return (

  );
}`;

export const usageGlass = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${scrollAccent}

${messagesSource}

export default function GlassScroller() {
  // `glass` is translucent by design — put it over an image or a gradient.
  return (

  );
}`;

export const usageAutoHide = `import { ScrollAreaBlock } from "@/components/custom/blocks/ScrollAreaBlock";

${scrollAccent}

${messagesSource}

export default function AutoHideScroller() {
  // `autoHide` fades the bar until you scroll or hover; `hideTrack` drops the groove.
  return (

  );
}`;

## Installation

## Examples

## Features
Explore the Scroll Area's custom scrollbar features, providing a unified, stylized scrolling experience across all operating systems.

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

        Component
        Prop
        Type
        Default
        Description

          ScrollAreaBlock

          variant

          "default" | "minimal" | "glass"

          "default"

          Determines the architectural style and thickness of the scroll track
          and thumb.

          ScrollAreaBlock

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "zinc"

          The color of the scrollbar thumb and hover states. Fully supports
          dynamic custom hex codes.

          ScrollAreaBlock

          orientation

          "vertical" | "horizontal" | "both"

          "vertical"

          Defines which axis should be scrollable. This automatically applies
          the correct CSS overflow utilities.

          ScrollAreaBlock

          hideTrack

          boolean

          false

          If true, forces the background scroll track to be completely
          transparent, showing only the thumb.

          ScrollAreaBlock

          autoHide

          boolean

          false

          If true, the scrollbar thumb fades to transparent when the container
          is not being actively hovered.

---

**Component Path:** `[framework]\scroll-area\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
