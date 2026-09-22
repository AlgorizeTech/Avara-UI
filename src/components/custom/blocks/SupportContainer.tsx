"use client";

import {
  ChevronDown,
  Clock,
  Inbox,
  LifeBuoy,
  List,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { useState } from "react";

// ==========================================
// MASTER DYNAMIC DATA CONFIGURATION
// Everything visible on the screen comes from here
// ==========================================
const DASHBOARD_DATA = {
  // 1. Header Information
  header: {
    title: "Sales Tickets",
    subtitle: "All Open",
  },

  // 2. Filter Buttons
  filters: [
    { id: "status", label: "Open", count: 99, icon: Inbox },
    { id: "sort", label: "Newest", count: null, icon: Clock },
  ],

  // 3. Right Sidebar Empty State
  emptyState: {
    greetingPrefix: "Hey",
    userName: "Rakib",
    message: "Time to help the people who need us most",
  },

  // 4. Ticket Detail View Strings
  detailView: {
    openedPrefix: "Opened",
    replyPlaceholder: "Type your reply here...",
    sendButtonText: "Send Reply",
  },

  // 5. Dynamic Ticket List
  tickets: [
    {
      id: "#6493",
      title: "THW - New email template creation",
      author: "Darren Adams",
      company: "Headboard Workshop",
      initials: "DA",
      status: "open",
      time: "10m ago",
      message:
        "Hi team, we need a new email template for our upcoming winter campaign. Can we schedule a quick call to discuss the requirements?",
    },
    {
      id: "#6494",
      title: "Billing issue with Pro plan upgrade",
      author: "Sarah Jenkins",
      company: "TechFlow Inc.",
      initials: "SJ",
      status: "open",
      time: "1h ago",
      message:
        "I tried upgrading to the Pro plan this morning, but my card was charged twice. Please refund the duplicate charge immediately.",
    },
    {
      id: "#6495",
      title: "Feature request: Dark mode dashboard",
      author: "Mike Ross",
      company: "Pearson Specter",
      initials: "MR",
      status: "pending",
      time: "3h ago",
      message:
        "Is there any timeline for when dark mode will be available? Our team works late and the bright white interface is causing eye strain.",
    },
    {
      id: "#6496",
      title: "Cannot access API keys",
      author: "Elena Rodriguez",
      company: "DataSync",
      initials: "ER",
      status: "open",
      time: "5h ago",
      message:
        "Whenever I navigate to the developer settings, the page crashes and I get a 500 error. I need to rotate my API keys urgently.",
    },
  ],
};

// ==========================================
// COMPONENT
// ==========================================
export default function SupportContainer() {
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // Find the currently selected ticket data dynamically
  const selectedTicket = DASHBOARD_DATA.tickets.find(
    (t) => t.id === selectedTicketId,
  );

  return (
    <div className="min-h-screen font-sans bg-muted dark:bg-[#09090b] pt-10 transition-colors duration-200">
      <main className="pb-10 px-4 md:px-8 max-w-[1600px] mx-auto h-[90vh] flex flex-col">
        <div className="bg-[#f9fbff] dark:bg-[#121217] border border-[#dcedff] dark:border-zinc-800 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden transition-colors">
          {/* ==========================================
              DYNAMIC HEADER
              ========================================== */}
          <div className="flex items-center gap-3 p-4 border-b border-[#dcedff] dark:border-zinc-800 bg-white dark:bg-[#121217] shrink-0 transition-colors">
            <List className="w-5 h-5 text-[#0070e0] dark:text-[#3b82f6]" />
            <h2 className="text-base font-medium text-[#031849] dark:text-zinc-100">
              {DASHBOARD_DATA.header.title}:{" "}
              <span className="text-muted-foreground font-normal">
                {DASHBOARD_DATA.header.subtitle}
              </span>
            </h2>
          </div>

          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* ==========================================
                LEFT COLUMN: DYNAMIC TICKET LIST
                ========================================== */}
            <div className="w-full md:w-[35%] lg:w-[30%] flex flex-col border-r border-[#dcedff] dark:border-zinc-800 bg-white dark:bg-[#121217] shrink-0 transition-colors">
              {/* Dynamic Filters */}
              <div className="flex items-center border-b border-[#dcedff] dark:border-zinc-800 bg-white dark:bg-[#121217] divide-x divide-[#dcedff] dark:divide-zinc-800 overflow-x-auto custom-scrollbar shrink-0 transition-colors">
                {DASHBOARD_DATA.filters.map((filter) => {
                  const Icon = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      className="flex items-center gap-2 px-4 py-3 text-sm text-[#4f4f4f] dark:text-zinc-300 hover:bg-muted whitespace-nowrap transition-colors flex-1 justify-center"
                    >
                      <Icon className="w-4 h-4 text-muted-foreground" />
                      {filter.label}{" "}
                      {filter.count !== null && `(${filter.count})`}
                      <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
                    </button>
                  );
                })}
              </div>

              {/* Dynamic Tickets */}
              <div className="flex-1 overflow-y-auto custom-scrollbar">
                {DASHBOARD_DATA.tickets.map((ticket) => {
                  const isActive = selectedTicketId === ticket.id;

                  return (
                    <div
                      key={ticket.id}
                      onClick={() => setSelectedTicketId(ticket.id)}
                      className={`flex items-start p-4 border-b border-border cursor-pointer transition-colors ${
                        isActive
                          ? "bg-[#eff5ff] dark:bg-[#3b82f6]/10 border-l-4 border-l-[#0070e0] dark:border-l-[#3b82f6]"
                          : "hover:bg-muted border-l-4 border-l-transparent"
                      }`}
                    >
                      <div className="w-10 h-10 rounded bg-[#0070e0] dark:bg-[#3b82f6] text-white flex items-center justify-center font-semibold mr-3 shrink-0 mt-1">
                        {ticket.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <div
                            className={`text-sm truncate pr-2 ${
                              isActive
                                ? "font-semibold text-[#0070e0] dark:text-[#3b82f6]"
                                : "font-medium text-[#031849] dark:text-zinc-100"
                            }`}
                          >
                            {ticket.title}
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0 mt-0.5">
                            {ticket.time}
                          </span>
                        </div>
                        <div className="text-xs text-[#0070e0] dark:text-[#3b82f6] font-medium mb-1 truncate">
                          {ticket.id}
                        </div>
                        <div className="text-xs text-[#68708c] dark:text-zinc-400 truncate">
                          {ticket.author} • {ticket.company}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ==========================================
                RIGHT COLUMN: DYNAMIC DETAILS OR EMPTY STATE
                ========================================== */}
            <div className="hidden md:flex flex-col flex-1 bg-[#eff5ff] dark:bg-[#09090b] relative overflow-hidden transition-colors">
              {!selectedTicket ? (
                /* Dynamic Empty State */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="max-w-md flex flex-col items-center">
                    <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center shadow-sm mb-6 text-[#0070e0] dark:text-[#3b82f6] transition-colors">
                      <LifeBuoy className="w-12 h-12" strokeWidth={1.5} />
                    </div>
                    <h2 className="text-3xl font-normal text-[#031849] dark:text-zinc-100 mb-3">
                      {DASHBOARD_DATA.emptyState.greetingPrefix}{" "}
                      {DASHBOARD_DATA.emptyState.userName}!
                    </h2>
                    <p className="text-lg text-[#68708c] dark:text-zinc-400 italic">
                      {DASHBOARD_DATA.emptyState.message}
                    </p>
                  </div>
                </div>
              ) : (
                /* Dynamic Ticket Details */
                <div className="flex-1 flex flex-col h-full overflow-hidden animate-in fade-in duration-300">
                  <div className="bg-white dark:bg-[#121217] p-6 border-b border-[#dcedff] dark:border-zinc-800 shrink-0 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-semibold text-[#031849] dark:text-zinc-100 leading-tight">
                        {selectedTicket.title}
                      </h2>
                      <span className="px-3 py-1 bg-[#eff5ff] dark:bg-[#3b82f6]/10 text-[#0070e0] dark:text-[#3b82f6] text-xs font-semibold rounded-full border border-[#dcedff] dark:border-[#3b82f6]/30">
                        {selectedTicket.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-[#68708c] dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <User className="w-4 h-4" />
                        <span>{selectedTicket.author}</span>
                      </div>
                      <div className="w-1 h-1 bg-muted rounded-full" />
                      <div className="flex items-center gap-1.5">
                        <LifeBuoy className="w-4 h-4" />
                        <span>{selectedTicket.company}</span>
                      </div>
                      <div className="w-1 h-1 bg-muted rounded-full" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>
                          {DASHBOARD_DATA.detailView.openedPrefix}{" "}
                          {selectedTicket.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                    <div className="flex gap-4 mb-6">
                      <div className="w-10 h-10 rounded-full bg-[#0070e0] dark:bg-[#3b82f6] text-white flex items-center justify-center font-semibold shrink-0">
                        {selectedTicket.initials}
                      </div>
                      <div className="bg-white dark:bg-[#121217] p-4 rounded-xl rounded-tl-none shadow-sm border border-[#dcedff] dark:border-zinc-800 max-w-3xl transition-colors">
                        <p className="text-[#031849] dark:text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
                          {selectedTicket.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#121217] p-4 border-t border-[#dcedff] dark:border-zinc-800 shrink-0 transition-colors">
                    <div className="border border-border rounded-lg overflow-hidden focus-within:border-[#0070e0] dark:focus-within:border-[#3b82f6] focus-within:ring-1 focus-within:ring-[#0070e0] dark:focus-within:ring-[#3b82f6] transition-shadow bg-transparent">
                      <textarea
                        className="w-full p-3 h-24 text-sm outline-none resize-none bg-transparent text-[#333] dark:text-zinc-100 placeholder-gray-400 dark:placeholder-zinc-500"
                        placeholder={DASHBOARD_DATA.detailView.replyPlaceholder}
                      />
                      <div className="bg-muted p-2 flex justify-between items-center border-t border-border transition-colors">
                        <div className="flex gap-2">
                          <button className="p-2 text-muted-foreground hover:text-[#0070e0] dark:hover:text-[#3b82f6] hover:bg-[#eff5ff] dark:hover:bg-[#3b82f6]/10 rounded transition-colors">
                            <MessageSquare className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-muted-foreground hover:text-[#0070e0] dark:hover:text-[#3b82f6] hover:bg-[#eff5ff] dark:hover:bg-[#3b82f6]/10 rounded transition-colors">
                            <Mail className="w-4 h-4" />
                          </button>
                        </div>
                        <button className="px-6 py-2 bg-[#0070e0] dark:bg-[#3b82f6] hover:bg-blue-700 dark:hover:bg-blue-500 text-white text-sm font-medium rounded transition-colors">
                          {DASHBOARD_DATA.detailView.sendButtonText}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

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
          background-color: #dcedff;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #bbdbff;
        }
        @media (prefers-color-scheme: dark) {
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #27272a;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #3f3f46;
          }
        }
      `,
        }}
      />
    </div>
  );
}
