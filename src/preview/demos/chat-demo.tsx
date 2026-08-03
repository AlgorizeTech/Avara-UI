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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      className={`w-full transition-all duration-500 ${
        variant === "glass"
          ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl"
          : ""
      }`}
    >
      <ChatApp
        key={`${variant}-${color}`}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        variant={variant as any}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        color={color as any}
        currentUser={sampleCurrentUser}
        contactsData={sampleContactsData}
      />
    </div>
  );
}
