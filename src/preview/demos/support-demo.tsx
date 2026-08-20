"use client";

import SupportDashboard, {
  SupportColor,
  SupportData,
  SupportLayout,
  SupportVariant,
} from "@/components/custom/blocks/Support-dashboard";

const sampleData: SupportData = {
  header: {
    title: "Sales Tickets",
    subtitle: "All Open",
  },
  filters: [
    { id: "status", label: "Open", count: 99, icon: "Inbox" },
    { id: "sort", label: "Newest", count: null, icon: "Clock" },
  ],
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Agent",
    message: "Time to help the people who need us most",
  },
  replySection: {
    tabs: ["Reply", "Note"],
    placeholder: "Type your message here...",
    buttonText: "Send",
  },
  detailsSection: {
    tabs: ["User", "Company"],
    dropdownOptions: {
      status: ["Open", "Pending", "Resolved", "Closed"],
      group: ["Sales", "Support", "Billing"],
      assignedTo: ["Mark Probert", "Unassigned", "Sarah Jenkins"],
      priority: ["Low", "Medium", "High", "Urgent"],
      type: ["Bug", "Feature Request", "Question", "Billing"],
    },
  },
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      color: "bg-blue-600",
      status: "open",
      time: "10m ago",
      contact: {
        name: "Darren Adams",
        email: "danadams@gmail.com",
        phone: "Add Phone",
        identifier: "Dan_adam",
      },
      sla: {
        firstResponse: "by Wed, 03 Jul 2019, 10:00 AM",
        resolution: "by Wed, 03 Jul 2019, 01:00 PM",
      },
      properties: {
        status: "Open",
        group: "Sales",
        assignedTo: "Mark Probert",
        priority: "Medium",
        type: "Bug",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
        {
          id: 2,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          color: "bg-blue-600",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
          time: "3 days ago",
          showAvatar: false,
        },
        {
          id: 3,
          type: "sent",
          sender: "Mark Probert",
          initials: "MP",
          color: "bg-indigo-500",
          message: "We are reviewing the graphic designer needs.",
          time: "2 days ago",
          showAvatar: false,
        },
      ],
    },
    {
      id: "#6494",
      title: "Billing issue with Pro plan upgrade",
      author: "Sarah Jenkins",
      company: "TechFlow Inc.",
      initials: "SJ",
      color: "bg-emerald-600",
      status: "resolved",
      time: "1h ago",
      contact: {
        name: "Sarah Jenkins",
        email: "sarah.j@techflow.inc",
        phone: "+1 555-0198",
        identifier: "sarah_tech",
      },
      sla: {
        firstResponse: "by Mon, 15 Aug 2023, 09:00 AM",
        resolution: "by Tue, 16 Aug 2023, 05:00 PM",
      },
      properties: {
        status: "Resolved",
        group: "Billing",
        assignedTo: "Unassigned",
        priority: "Urgent",
        type: "Billing",
      },
      chatHistory: [
        {
          id: 1,
          type: "received",
          sender: "Sarah Jenkins",
          initials: "SJ",
          color: "bg-emerald-600",
          message: "I was double charged for the Pro plan upgrade.",
          time: "1h ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function SupportDemo({
  variant = "default",
  color = "primary",
  layout = "chat",
}: {
  variant?: SupportVariant;
  color?: SupportColor;
  layout?: SupportLayout;
}) {
  return (
    <div
      className={`w-full transition-all duration-500 relative overflow-hidden rounded-2xl ${variant === "glass" ? "p-4 sm:p-8" : ""}`}
    >
      {variant === "glass" && (
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Moody nature landscape background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
      )}
      <div className="relative z-10 w-full">
        <SupportDashboard
          key={`${variant}-${color}-${layout}`}
          variant={variant}
          color={color}
          layout={layout}
          data={sampleData}
        />
      </div>
    </div>
  );
}
