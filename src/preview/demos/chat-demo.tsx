"use client";

import ChatApp, {
  ChatColor,
  ChatVariant,
  LiquidGlassSvgFilter,
} from "@/components/custom/blocks/Chat";
import { cn } from "@/lib/utils";

const sampleCurrentUser = {
  avatar: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790148864/80-1-1790148865111.jpg",
  status: "online",
};

const sampleContactsData = [
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
] as any;

export default function ChatDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: ChatVariant;
  color?: ChatColor | string;
}) {
  const isGlass = variant === "glass" || variant === "liquid-glass";

  return (
    <div
      className={cn(
        "w-full transition-all duration-500 relative flex items-center justify-center overflow-hidden",
        isGlass
          ? "p-0 -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none"
          : "w-full",
      )}
    >
      <LiquidGlassSvgFilter />
      {isGlass && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
          }}
        />
      )}
      {isGlass && (
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />
      )}
      <div className={cn("w-full relative z-10", isGlass && "p-4 sm:p-8")}>
        <ChatApp
          key={`${variant}-${color}`}
          variant={variant}
          color={color as any}
          currentUser={sampleCurrentUser}
          contactsData={sampleContactsData}
        />
      </div>
    </div>
  );
}
