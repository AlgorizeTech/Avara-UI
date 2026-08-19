"use client";

import EmailApp, {
  EmailColor,
  EmailVariant,
} from "@/components/custom/blocks/Email";

const sampleEmails = [
  {
    id: 1,
    sender: "Tommy Sicilia",
    email: "tommy@example.com",
    subject: "How to Succeed with Your Shopify Store",
    time: "01:46 PM",
    fullDate: "Dec 10, 2026, 01:46 PM",
    isStarred: false,
    isRead: false,
    avatar: "https://i.pravatar.cc/150?u=tommy",
    labels: [
      {
        color: "bg-rose-500",
        name: "Private",
        pill: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
      },
    ],
    body: "Hello,\n\nI hope you are doing well.\n\nHere are some top tips to succeed with your new store. Let me know if you want to schedule a call.",
    attachments: [],
    folder: "inbox",
  },
  {
    id: 2,
    sender: "Tressa Gass",
    email: "tressag@mail.com",
    subject: "Please find attached the latest Company Report",
    time: "01:55 PM",
    fullDate: "Dec 10, 2026, 01:55 PM",
    isStarred: true,
    isRead: true,
    avatar: "https://i.pravatar.cc/150?u=tressa",
    labels: [
      {
        color: "bg-indigo-500",
        name: "Company",
        pill: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400",
      },
    ],
    body: "Hello John,\n\nI hope you are doing well.\n\nI am sending over a company report for company. It is a PDF file.\n\nPlease let me know if you want to schedule a call or any other questions.\n\nRegards\nTressa Gass",
    attachments: [
      { name: "Q3-Financial-Report.pdf", type: "pdf", size: "2.4 MB" },
    ],
    folder: "inbox",
  },
  {
    id: 3,
    sender: "Louetta Esses",
    email: "louetta@mail.com",
    subject: "Update Can Change Your Personal Life",
    time: "03:04 PM",
    fullDate: "Dec 10, 2026, 03:04 PM",
    isStarred: false,
    isRead: false,
    initials: "LE",
    color:
      "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
    labels: [
      {
        color: "bg-amber-500",
        name: "Important",
        pill: "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
      },
    ],
    body: "Hi there,\n\nDon't miss out on this life-changing update. Check the link below.",
    attachments: [],
    folder: "inbox",
  },
] as any;

export default function EmailDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: EmailVariant;
  color?: EmailColor | string;
}) {
  return (
    <div
      className={`w-full transition-all duration-500 relative overflow-hidden ${
        variant === "glass"
          ? "p-4 sm:p-8 rounded-2xl bg-cover bg-center"
          : ""
      }`}
      style={
        variant === "glass"
          ? {
              backgroundImage:
                'url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop")',
            }
          : undefined
      }
    >
      {variant === "glass" && (
        <div className="absolute inset-0 bg-black/20 rounded-2xl pointer-events-none" />
      )}
      <EmailApp
        key={`${variant}-${color}`} // Force re-render to reset email states if user is testing heavily
        variant={variant}
        color={color}
        initialEmails={sampleEmails}
      />
    </div>
  );
}
