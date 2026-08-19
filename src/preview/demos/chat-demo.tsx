"use client";

import ChatApp from "@/components/custom/blocks/Chat";

const sampleCurrentUser = {
  avatar: "https://i.pravatar.cc/150?u=current",
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
    avatar: "https://i.pravatar.cc/150?u=1",
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
    avatar: "https://i.pravatar.cc/150?u=4",
  },
] as any;

export default function ChatDemo({
  variant = "default",
  color = "indigo",
}: {
  variant?: string;
  color?: string;
}) {
  return (
    <div
      className={`w-full transition-all duration-500 rounded-2xl ${
        variant === "glass" ? "p-4 sm:p-8 bg-cover bg-center" : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                "url('https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop')",
            }
          : undefined
      }
    >
      <ChatApp
        key={`${variant}-${color}`}
        variant={variant as any}
        color={color as any}
        currentUser={sampleCurrentUser}
        contactsData={sampleContactsData}
      />
    </div>
  );
}
