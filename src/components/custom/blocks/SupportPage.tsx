"use client";

import {
  ChevronDown,
  Clock,
  Edit,
  Image as ImageIcon,
  Inbox,
  LifeBuoy,
  List,
  Paperclip,
  Smile,
  X,
} from "lucide-react";
import { useState } from "react";
import { SelectBlock } from "./SelectBlock";


// ==========================================
// MASTER DYNAMIC DATA CONFIGURATION
// ==========================================
const DASHBOARD_DATA = {
  header: {
    title: "Sales Tickets",
    subtitle: "All Open",
  },
  filters: [
    { id: "status", label: "Open", count: 99, icon: Inbox },
    { id: "sort", label: "Newest", count: null, icon: Clock },
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
          type: "received", // from customer
          sender: "Darren Adams",
          initials: "DA",
          message: "Graphics Designer Needs...",
          time: "3 days ago",
          showAvatar: true,
        },
        {
          id: 2,
          type: "received",
          sender: "Darren Adams",
          initials: "DA",
          message:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad",
          time: "3 days ago",
          showAvatar: false, // Grouped message
        },
        {
          id: 3,
          type: "sent", // from agent
          sender: "Mark Probert",
          initials: "MP",
          message: "We are reviewing the graphic designer needs.",
          time: "2 days ago",
          showAvatar: false,
        },
        {
          id: 4,
          type: "sent",
          sender: "Mark Probert",
          initials: "MP",
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
          message: "I was double charged for the Pro plan upgrade.",
          time: "1h ago",
          showAvatar: true,
        },
      ],
    },
  ],
};

export default function SupportPage() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [activeReplyTab, setActiveReplyTab] = useState("Reply");
  const [activeDetailsTab, setActiveDetailsTab] = useState("User");
  // Property dropdown edits, keyed by `${ticketId}-${propertyKey}` so values
  // don't leak between tickets. Falls back to the ticket's own property value.
  const [ticketProperties, setTicketProperties] = useState<
    Record<string, string>
  >({});

  const selectedTicket = DASHBOARD_DATA.tickets.find(
    (t) => t.id === selectedTicketId,
  );

  return (
    <div className="min-h-screen font-sans bg-background flex flex-col items-center pt-8 pb-10 transition-colors duration-200">
      <main className="w-full px-4 md:px-8 max-w-[1600px] h-[90vh] flex flex-col">
        <div className="bg-card border border-border rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden transition-colors">
          {/* ==========================================
              HEADER
              ========================================== */}
          <div className="flex items-center gap-3 p-4 border-b border-border bg-card shrink-0 transition-colors">
            <List className="w-5 h-5 text-primary" />
            <h2 className="text-base font-medium text-foreground">
              {DASHBOARD_DATA.header.title}:{" "}
              <span className="text-muted-foreground font-normal">
                {DASHBOARD_DATA.header.subtitle}
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden min-h-0">
            {/* ==========================================
                LEFT COLUMN: TICKET LIST
                ========================================== */}
            <div className="w-full md:w-[35%] lg:w-[25%] flex flex-col border-r border-border bg-card shrink-0 transition-colors">
              <div className="flex items-center border-b border-border bg-card divide-x divide-border shrink-0 transition-colors">
                {DASHBOARD_DATA.filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-foreground/80 hover:bg-muted flex-1 justify-center transition-colors"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {filter.label}{" "}
                      {filter.count !== null && `(${filter.count})`}
                      <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {DASHBOARD_DATA.tickets.map((ticket) => {
                  const isActive = selectedTicketId === ticket.id;
                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`flex items-start p-4 border-b border-border cursor-pointer transition-colors ${
                        isActive
                          ? "bg-primary/10 border-l-4 border-l-primary"
                          : "hover:bg-muted border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-3 shrink-0 mt-1">
                        {ticket.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div
                            className={`text-sm truncate pr-2 ${
                              isActive
                                ? "font-semibold text-primary"
                                : "font-medium text-foreground"
                            }`}
                          >
                            {ticket.title}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                            {ticket.time}
                          </span>
                        </div>
                        <div className="text-xs text-primary font-medium mb-1 truncate">
                          {ticket.id}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {ticket.author} • {ticket.company}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ==========================================
                MIDDLE & RIGHT COLUMNS (WRAPPER)
                ========================================== */}
            <div className="hidden md:flex flex-1 overflow-hidden bg-muted transition-colors">
              {!selectedTicket ? (
                // EMPTY STATE (NO TICKET SELECTED)
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="max-w-md flex flex-col items-center">
                    <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm mb-6 text-primary transition-colors">
                      <LifeBuoy className="w-12 h-12" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-normal text-foreground mb-3">
                      {DASHBOARD_DATA.emptyState.greetingPrefix}{" "}
                      {DASHBOARD_DATA.emptyState.userName}!
                    </h2>
                    <p className="text-lg text-muted-foreground italic">
                      {DASHBOARD_DATA.emptyState.message}
                    </p>
                  </div>
                </div>
              ) : (
                // 3-PANE LAYOUT ONCE TICKET IS SELECTED
                <>
                  {/* ==========================================
                      MIDDLE COLUMN: CHAT BOX
                      ========================================== */}
                  <div className="flex-1 flex flex-col min-w-0 h-full animate-in fade-in duration-300">
                    {/* Chat Header */}
                    <div className="flex items-center p-4 border-b border-border bg-card shrink-0 transition-colors">
                      <div className="w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-3 shrink-0">
                        {selectedTicket.initials}
                      </div>
                      <div className="text-base font-medium text-primary">
                        {selectedTicket.author}
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
                      {selectedTicket.chatHistory.map((msg) => {
                        const isSent = msg.type === "sent";
                        return (
                          <div key={msg.id} className="flex flex-col">
                            <div
                              className={`flex items-start ${
                                isSent ? "justify-end" : "justify-start"
                              }`}
                            >
                              {!isSent && (
                                <div
                                  className={`w-10 h-10 rounded bg-primary text-primary-foreground flex items-center justify-center font-semibold mr-3 shrink-0 ${
                                    !msg.showAvatar ? "invisible" : ""
                                  }`}
                                >
                                  {msg.initials}
                                </div>
                              )}
                              <div
                                className={`px-4 py-3 rounded-lg max-w-[80%] text-sm ${
                                  isSent
                                    ? "bg-card text-card-foreground border border-border"
                                    : "bg-primary text-primary-foreground border border-transparent"
                                } transition-colors`}
                              >
                                {msg.message}
                              </div>
                            </div>
                            <div
                              className={`text-xs text-muted-foreground mt-1 ${
                                isSent ? "text-right" : "text-left ml-[52px]"
                              }`}
                            >
                              {msg.time}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reply Section */}
                    <div className="p-3 bg-transparent shrink-0">
                      <div className="bg-card border border-border rounded-lg flex flex-col overflow-hidden transition-colors">
                        <div className="flex border-b border-border">
                          {DASHBOARD_DATA.replySection.tabs.map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveReplyTab(tab)}
                              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                                activeReplyTab === tab
                                  ? "text-foreground border-b-2 border-primary"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>
                        <textarea
                          rows={2}
                          placeholder={DASHBOARD_DATA.replySection.placeholder}
                          className="w-full p-3 text-sm text-foreground bg-transparent resize-none outline-none placeholder:text-muted-foreground"
                        ></textarea>
                        <div className="flex items-center justify-between p-2 pl-4 border-t border-border">
                          <div className="flex gap-4 text-muted-foreground">
                            <Smile className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                            <ImageIcon className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                            <Paperclip className="w-5 h-5 cursor-pointer hover:text-primary transition-colors" />
                          </div>
                          <button className="px-5 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded transition-colors">
                            {DASHBOARD_DATA.replySection.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ==========================================
                      RIGHT COLUMN: DETAILS BOX
                      ========================================== */}
                  <div className="w-[300px] lg:w-[350px] shrink-0 border-l border-border bg-card flex flex-col h-full animate-in slide-in-from-right-8 duration-300 transition-colors">
                    <div className="flex items-center justify-between px-3 border-b border-border shrink-0">
                      <div className="flex">
                        {DASHBOARD_DATA.detailsSection.tabs.map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveDetailsTab(tab)}
                            className={`px-3 py-4 text-xs font-medium transition-colors ${
                              activeDetailsTab === tab
                                ? "text-foreground border-b-2 border-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </div>
                      <div className="flex gap-3 text-muted-foreground">
                        <Edit className="w-4 h-4 cursor-pointer hover:text-foreground" />
                        <X
                          className="w-4 h-4 cursor-pointer hover:text-foreground"
                          onClick={() => setSelectedTicketId(null)}
                        />
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
                      {/* Contact Details Panel */}
                      <div className="border border-border rounded-sm bg-card transition-colors">
                        <div className="bg-primary text-primary-foreground p-2.5 text-sm flex justify-between items-center rounded-t-sm border-b border-transparent">
                          Contact Details
                          <span>📋</span>
                        </div>
                        <div className="p-3 flex flex-col gap-3">
                          {[
                            { label: "Name", val: selectedTicket.contact.name },
                            {
                              label: "Email",
                              val: selectedTicket.contact.email,
                            },
                            {
                              label: "Phone",
                              val: selectedTicket.contact.phone,
                            },
                            {
                              label: "Identifier",
                              val: selectedTicket.contact.identifier,
                            },
                          ].map((field) => (
                            <div key={field.label}>
                              <div className="text-xs text-muted-foreground">
                                {field.label}
                              </div>
                              <div className="text-xs text-foreground mt-0.5">
                                {field.val}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* SLA Panel */}
                      <div className="border border-border rounded-sm bg-card transition-colors">
                        <div className="bg-primary text-primary-foreground p-2.5 text-sm flex justify-between items-center rounded-t-sm border-b border-transparent">
                          SLA
                        </div>
                        <div className="p-3 flex flex-col gap-3">
                          <div>
                            <div className="text-xs text-muted-foreground">
                              First Response Due
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-[#28a745]" />
                              <div className="text-xs text-primary">
                                {selectedTicket.sla.firstResponse}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Resolution Due
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="w-2 h-2 rounded-full bg-[#28a745]" />
                              <div className="text-xs text-primary">
                                {selectedTicket.sla.resolution}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Ticket Properties Panel */}
                      <div className="border border-border rounded-sm bg-card transition-colors">
                        <div className="bg-primary text-primary-foreground p-2.5 text-sm flex justify-between items-center rounded-t-sm border-b border-transparent">
                          Tickets
                        </div>
                        <div className="p-3 flex flex-col gap-3">
                          {Object.entries(
                            DASHBOARD_DATA.detailsSection.dropdownOptions,
                          ).map(([key, options]) => (
                            <div key={key} className="flex flex-col">
                              <label className="text-xs text-muted-foreground capitalize mb-1">
                                {key.replace(/([A-Z])/g, " $1")}
                              </label>
                              <SelectBlock
                                options={options.map((opt) => ({
                                  label: opt,
                                  value: opt,
                                }))}
                                value={
                                  ticketProperties[
                                    `${selectedTicket.id}-${key}`
                                  ] ??
                                  selectedTicket.properties[
                                    key as keyof typeof selectedTicket.properties
                                  ]
                                }
                                onChange={(v) =>
                                  setTicketProperties((prev) => ({
                                    ...prev,
                                    [`${selectedTicket.id}-${key}`]: Array.isArray(v)
                                      ? (v[0] ?? "")
                                      : v,
                                  }))
                                }
                                color="primary"
                                inputSize="sm"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Global Scrollbar Styles specific to this component */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--border);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: color-mix(in oklab, var(--muted-foreground) 50%, transparent);
        }
      `,
        }}
      />
    </div>
  );
}
