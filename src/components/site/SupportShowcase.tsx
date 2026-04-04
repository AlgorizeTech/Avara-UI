"use client";

import SupportDashboard, {
  SupportColor,
  SupportData,
  SupportVariant,
} from "@/components/custom/blocks/Support-dashboard";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

export function SupportShowcase() {
  const [variant, setVariant] = useState<SupportVariant>("default");
  const [color, setColor] = useState<SupportColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const dataType = isTs
      ? "const dashboardData: SupportData = "
      : "const dashboardData = ";

    return `"use client";

import SupportDashboard${isTs ? ", { SupportData }" : ""} from "@/components/custom/blocks/Support-dashboard";

export default function SupportDemo()${typeDef} {
  ${dataType}{
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
      userName: "Rakib",
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
            id: 3,
            type: "sent",
            sender: "Mark Probert",
            initials: "MP",
            color: "bg-indigo-500",
            message: "We are reviewing the graphic designer needs.",
            time: "2 days ago",
            showAvatar: true,
          }
        ],
      }
    ],
  };

  return (
    <div className="w-full">
      <SupportDashboard 
        data={dashboardData} 
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

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
          {
            id: 4,
            type: "sent",
            sender: "Mark Probert",
            initials: "MP",
            color: "bg-indigo-500",
            message:
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
        status: "open",
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
          status: "Open",
          group: "Billing",
          assignedTo: "Unassigned",
          priority: "High",
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

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Structural Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as SupportVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-[36px]">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as SupportColor)}
                className={`w-6 h-6 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="SupportDashboard"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div
          className={`w-full transition-all duration-500 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}
        >
          <SupportDashboard
            key={`${variant}-${color}`}
            variant={variant}
            color={color}
            data={sampleData}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
