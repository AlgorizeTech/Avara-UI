"use client";

import AIChat, {
  AIChatColor,
  AIChatVariant,
  EffortLevel,
} from "@/components/custom/blocks/Ai-chat";

const sampleChatHistory = [
  { id: 1, title: "Help with React Components", date: "Today" },
  { id: 2, title: "Write a python script for SEO", date: "Today" },
  { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
  { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
  { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
];

const sampleInitialMessages = [
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
  {
    id: 3,
    role: "ai",
    content:
      "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
    time: "10:02 AM",
  },
];

export default function AIChatDemo({
  variant = "default",
  color = "primary",
  defaultEffort = "medium",
}: {
  variant?: AIChatVariant;
  color?: AIChatColor | string;
  defaultEffort?: EffortLevel;
}) {
  return (
    <div
      className={`w-full transition-all duration-500 py-[12px] ${
        variant === "glass"
          ? "p-4 sm:p-8 bg-cover bg-center rounded-2xl relative overflow-hidden"
          : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
            }
          : undefined
      }
    >
      <AIChat
        key={`${variant}-${color}-${defaultEffort}`}
        variant={variant}
        color={color}
        defaultEffort={defaultEffort}
        // Compact opens on its hero — a title and the prompt bar — so it gets no seed data.
        chatHistory={variant === "compact" ? [] : sampleChatHistory}
        initialMessages={variant === "compact" ? [] : sampleInitialMessages}
      />
    </div>
  );
}
