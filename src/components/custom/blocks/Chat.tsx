"use client";

import {
  CheckCheck,
  Menu,
  MessageCircle,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Contact = {
  id: string | number;
  name: string;
  message: string;
  date: string;
  unread: number;
  status: "online" | "offline";
  avatar?: string;
  initials?: string;
  color?: string;
};

export type CurrentUser = {
  avatar: string;
  status: string;
  name?: string;
};

// Bulletproof Avatar (Prevents Flexbox Squishing)
const BulletproofAvatar = ({
  src,
  initials,
  color,
  status,
  size = 40,
  statusBorder = "border-white dark:border-zinc-950",
}: {
  src?: string;
  initials?: string;
  color?: string;
  status?: string;
  size?: number;
  statusBorder?: string;
}) => (
  <div
    className="relative shrink-0 flex-none rounded-full shadow-sm"
    style={{ width: size, height: size, minWidth: size, minHeight: size }}
  >
    {src ? (
      <img
        src={src}
        alt="Avatar"
        className="absolute inset-0 w-full h-full rounded-full object-cover m-0 p-0"
      />
    ) : (
      <div
        className={`absolute inset-0 w-full h-full rounded-full flex items-center justify-center font-bold text-sm m-0 p-0 tracking-wider ${color}`}
      >
        {initials}
      </div>
    )}
    {status && (
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 z-10 m-0 p-0 ${statusBorder} ${
          status === "online"
            ? "bg-emerald-500"
            : status === "offline"
              ? "bg-zinc-400 dark:bg-zinc-600"
              : "bg-rose-500"
        }`}
      />
    )}
  </div>
);

export default function ChatApp({
  currentUser,
  contactsData,
}: {
  currentUser: CurrentUser;
  contactsData: Contact[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "online">("all");

  const [contacts, setContacts] = useState(contactsData);
  const [inputValue, setInputValue] = useState("");

  // Typing Indicator State
  const [isTyping, setIsTyping] = useState<string | number | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);

  const [chatHistories, setChatHistories] = useState<Record<string, any[]>>(
    () => {
      const initialChats: Record<string, any[]> = {};
      contactsData.forEach((contact) => {
        initialChats[contact.id] = [
          {
            id: `initial-${contact.id}`,
            text: contact.message,
            sender: "them",
            time: contact.date,
            status: "read",
          },
        ];
      });
      return initialChats;
    },
  );

  // Internal auto-scroll
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistories, activeContact, isTyping]);

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch = contact.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || contact.status === "online";
    return matchesSearch && matchesFilter;
  });

  // FIX: Properly defined message handler
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim() || !activeContact) return;

    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newUserMsg = {
      id: Date.now(),
      text: inputValue,
      sender: "me",
      time: currentTime,
      status: "delivered",
    };

    setChatHistories((prev) => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newUserMsg],
    }));

    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeContact.id
          ? { ...c, message: inputValue, date: currentTime }
          : c,
      ),
    );

    setInputValue("");

    // Trigger typing indicator
    setIsTyping(activeContact.id);

    // Simulate reply after delay
    setTimeout(() => {
      setIsTyping(null); // Turn off typing

      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const replyMsg = {
        id: Date.now() + 1,
        text: "That sounds perfect! Let's get it done. 🚀",
        sender: "them",
        time: replyTime,
        status: "read",
      };

      setChatHistories((prev) => {
        // Mark user's last message as read
        const updatedHistory = [...(prev[activeContact.id] || [])];
        const lastMsg = updatedHistory[updatedHistory.length - 1];
        if (lastMsg.sender === "me") lastMsg.status = "read";

        return {
          ...prev,
          [activeContact.id]: [...updatedHistory, replyMsg],
        };
      });

      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact.id
            ? { ...c, message: replyMsg.text, date: replyTime, unread: 0 }
            : c,
        ),
      );
    }, 2000);
  };

  // FIX: Explicitly typed and scoped handleKeyDown function
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleContactClick = (contact: Contact) => {
    setActiveContact(contact);
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c)),
    );
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="w-full max-w-full h-[650px] sm:h-[750px] bg-zinc-50 dark:bg-[#09090b] rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800/80 flex overflow-hidden relative font-sans box-border">
      {/* === LEFT SIDEBAR === */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          absolute sm:relative z-30 w-[300px] sm:w-80 h-full shrink-0 flex-none bg-white/80 dark:bg-[#121217]/80 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/50 flex flex-col transition-transform duration-300 ease-in-out
        `}
      >
        {/* Sidebar Header */}
        <div className="pt-6 pb-4 px-5 shrink-0 flex-none min-w-0 box-border">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Messages
            </h1>
            <BulletproofAvatar
              src={currentUser.avatar}
              status={currentUser.status}
              size={36}
              statusBorder="border-white dark:border-[#121217]"
            />
          </div>

          <div className="relative w-full min-w-0 mb-4">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 bg-zinc-100/80 dark:bg-zinc-900/80 border border-transparent focus:border-indigo-500/50 dark:focus:border-indigo-400/50 rounded-xl py-2 pl-10 pr-4 text-sm outline-none text-zinc-800 dark:text-zinc-200 transition-all placeholder:text-zinc-500"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-1 p-1 bg-zinc-100/80 dark:bg-zinc-900/80 rounded-lg">
            <button
              onClick={() => setFilterType("all")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${filterType === "all" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
            >
              All
            </button>
            <button
              onClick={() => setFilterType("online")}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${filterType === "online" ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"}`}
            >
              Online
            </button>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto px-2 pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`p-3 mb-1 flex items-center gap-3 cursor-pointer transition-all rounded-xl ${
                  activeContact?.id === contact.id
                    ? "bg-indigo-50 dark:bg-indigo-500/10 shadow-sm"
                    : "hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                }`}
              >
                <BulletproofAvatar
                  src={contact.avatar}
                  initials={contact.initials}
                  color={contact.color}
                  status={contact.status}
                  size={44}
                  statusBorder={
                    activeContact?.id === contact.id
                      ? "border-indigo-50 dark:border-[#1a1b26]"
                      : "border-white dark:border-[#121217]"
                  }
                />

                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1 gap-2">
                    <h4
                      className={`text-sm font-semibold truncate ${activeContact?.id === contact.id ? "text-indigo-900 dark:text-indigo-100" : "text-zinc-900 dark:text-zinc-100"}`}
                    >
                      {contact.name}
                    </h4>
                    <span
                      className={`text-[10px] font-medium shrink-0 ${activeContact?.id === contact.id ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-400"}`}
                    >
                      {contact.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p
                      className={`text-xs truncate ${activeContact?.id === contact.id ? "text-indigo-700 dark:text-indigo-300" : "text-zinc-500 dark:text-zinc-400"}`}
                    >
                      {contact.message}
                    </p>
                    {contact.unread > 0 && (
                      <span className="w-4 h-4 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[9px] font-bold shrink-0 shadow-sm">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-500 flex flex-col items-center gap-2">
              <MessageCircle className="w-8 h-8 opacity-20" />
              No contacts found
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 sm:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* === MAIN CHAT AREA === */}
      <main className="flex-1 flex flex-col min-w-0 w-full h-full bg-white dark:bg-[#09090b] relative z-10">
        {!activeContact ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-zinc-50 dark:bg-transparent">
            <div className="w-24 h-24 bg-gradient-to-tr from-indigo-100 to-white dark:from-indigo-500/20 dark:to-zinc-900 rounded-3xl flex items-center justify-center mb-6 shadow-xl shadow-indigo-500/10 border border-white dark:border-zinc-800 rotate-3 shrink-0 flex-none">
              <MessageCircle className="w-10 h-10 text-indigo-500 dark:text-indigo-400 -rotate-3" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              Your Messages
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs">
              Select a conversation from the sidebar or start a new one to begin
              chatting.
            </p>
            <button
              className="mt-8 px-6 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full text-sm font-semibold sm:hidden shadow-lg shadow-zinc-900/20 dark:shadow-white/20 transition-transform active:scale-95"
              onClick={() => setIsSidebarOpen(true)}
            >
              Open Contacts
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="h-[76px] px-4 sm:px-6 border-b border-zinc-100 dark:border-zinc-800/80 flex justify-between items-center bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl shrink-0 flex-none min-w-0 w-full box-border z-10">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  className="sm:hidden p-2 -ml-2 text-zinc-600 dark:text-zinc-400 shrink-0 flex-none"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>

                <BulletproofAvatar
                  src={activeContact.avatar}
                  initials={activeContact.initials}
                  color={activeContact.color}
                  status={activeContact.status}
                  size={42}
                  statusBorder="border-white dark:border-[#09090b]"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                    {activeContact.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${activeContact.status === "online" ? "bg-emerald-500" : "bg-zinc-400"}`}
                    />
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 capitalize truncate">
                      {isTyping === activeContact.id ? (
                        <span className="text-indigo-500 dark:text-indigo-400 animate-pulse">
                          Typing...
                        </span>
                      ) : (
                        activeContact.status
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 text-zinc-500 dark:text-zinc-400 shrink-0 flex-none ml-2">
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors hidden sm:block">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors hidden sm:block">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Chat Messages Area */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden w-full scroll-smooth"
            >
              <div className="flex flex-col gap-6 w-full pb-2">
                {chatHistories[activeContact.id]?.map((msg) => {
                  const isMe = msg.sender === "me";
                  return (
                    <div
                      key={msg.id}
                      className={`flex items-end gap-2.5 w-full ${isMe ? "justify-end" : "justify-start"}`}
                    >
                      {!isMe && (
                        <BulletproofAvatar
                          src={activeContact.avatar}
                          initials={activeContact.initials}
                          color={activeContact.color}
                          size={28}
                        />
                      )}

                      <div
                        className={`flex flex-col gap-1 max-w-[85%] sm:max-w-[70%] ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`px-4 py-2.5 shadow-sm border ${
                            isMe
                              ? "bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-2xl rounded-br-sm border-transparent"
                              : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 rounded-2xl rounded-bl-sm border-zinc-200 dark:border-zinc-800/80"
                          }`}
                        >
                          <p className="text-[14px] whitespace-pre-wrap break-words leading-relaxed">
                            {msg.text}
                          </p>
                        </div>
                        <div
                          className={`flex items-center gap-1.5 px-1 ${isMe ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
                            {msg.time}
                          </span>
                          {isMe && (
                            <CheckCheck
                              className={`w-3.5 h-3.5 ${msg.status === "read" ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-300 dark:text-zinc-600"}`}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Typing Indicator */}
                {isTyping === activeContact.id && (
                  <div className="flex items-end gap-2.5 w-full justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <BulletproofAvatar
                      src={activeContact.avatar}
                      initials={activeContact.initials}
                      color={activeContact.color}
                      size={28}
                    />
                    <div className="px-4 py-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-4 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800/80 shrink-0 flex-none w-full box-border z-10">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 sm:gap-3 w-full"
              >
                <button
                  type="button"
                  className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors shrink-0"
                >
                  <Paperclip className="w-5 h-5" />
                </button>

                <div className="flex-1 min-w-0 bg-zinc-100 dark:bg-zinc-900 border border-transparent focus-within:border-indigo-500/30 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:focus-within:ring-indigo-500/20 rounded-full flex items-center px-4 py-1.5 transition-all">
                  <input
                    type="text"
                    placeholder="Message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 min-w-0 w-full bg-transparent border-none focus:outline-none text-[15px] text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-500 py-1.5"
                  />
                  <button
                    type="button"
                    className="p-1.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors shrink-0 mr-1"
                  >
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center shrink-0 flex-none shadow-md shadow-indigo-500/20 hover:bg-indigo-600 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
