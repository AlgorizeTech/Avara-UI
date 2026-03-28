"use client";

import {
  Menu,
  MessageSquare,
  MoreVertical,
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
};

// FIX: Bulletproof Avatar with STRICT inline styles.
// Flexbox cannot physically squish this element anymore.
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
    className="relative shrink-0 flex-none rounded-full"
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
        className={`absolute inset-0 w-full h-full rounded-full flex items-center justify-center font-medium text-sm m-0 p-0 ${color}`}
      >
        {initials}
      </div>
    )}
    {status && (
      <span
        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 z-10 m-0 p-0 ${statusBorder} ${
          status === "online"
            ? "bg-green-500"
            : status === "offline"
              ? "bg-zinc-400 dark:bg-zinc-500"
              : "bg-red-500"
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

  const [contacts, setContacts] = useState(contactsData);
  const [inputValue, setInputValue] = useState("");

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
          },
        ];
      });
      return initialChats;
    },
  );

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatHistories, activeContact]);

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
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

    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const replyMsg = {
        id: Date.now() + 1,
        text: "That sounds great! Let's catch up later.",
        sender: "them",
        time: replyTime,
      };

      setChatHistories((prev) => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), replyMsg],
      }));

      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact.id
            ? { ...c, message: replyMsg.text, date: replyTime, unread: 0 }
            : c,
        ),
      );
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
    <div className="w-full max-w-full h-[600px] sm:h-[700px] bg-white dark:bg-zinc-950 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 flex overflow-hidden relative font-sans box-border">
      {/* === LEFT SIDEBAR === */}
      <aside
        className={`
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          absolute sm:relative z-20 w-[280px] sm:w-80 h-full shrink-0 flex-none bg-white dark:bg-[#0f111a] border-r border-zinc-200 dark:border-zinc-800/60 flex flex-col transition-transform duration-300 ease-in-out
        `}
      >
        {/* Sidebar Header */}
        <div className="h-[72px] px-4 border-b border-zinc-200 dark:border-zinc-800/60 flex items-center gap-3 shrink-0 flex-none min-w-0 box-border">
          <BulletproofAvatar
            src={currentUser.avatar}
            status={currentUser.status}
            size={40}
            statusBorder="border-white dark:border-[#0f111a]"
          />

          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0" />
            <input
              type="text"
              placeholder="Search Contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-w-0 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-[#7367f0] dark:focus:border-[#7367f0] dark:text-zinc-200 transition-colors placeholder:truncate"
            />
          </div>

          <button
            className="sm:hidden p-2 text-zinc-500 shrink-0"
            onClick={() => setIsSidebarOpen(false)}
          >
            &times;
          </button>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => handleContactClick(contact)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition-colors border-l-2 ${
                  activeContact?.id === contact.id
                    ? "bg-zinc-50 dark:bg-zinc-900/50 border-[#7367f0]"
                    : "border-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900/30"
                }`}
              >
                <BulletproofAvatar
                  src={contact.avatar}
                  initials={contact.initials}
                  color={contact.color}
                  status={contact.status}
                  size={40}
                  statusBorder={
                    activeContact?.id === contact.id
                      ? "border-zinc-50 dark:border-[#161823]"
                      : "border-white dark:border-[#0f111a]"
                  }
                />

                <div className="flex-1 min-w-0 overflow-hidden">
                  <div className="flex justify-between items-baseline mb-0.5 gap-2">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                      {contact.name}
                    </h4>
                    <span className="text-xs text-zinc-400 shrink-0">
                      {contact.date}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-2">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {contact.message}
                    </p>
                    {contact.unread > 0 && (
                      <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
              No contacts found
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="absolute inset-0 bg-black/20 dark:bg-black/60 z-10 sm:hidden cursor-pointer"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* === MAIN CHAT AREA === */}
      <main className="flex-1 flex flex-col bg-zinc-50/50 dark:bg-zinc-900/20 min-w-0 w-full h-full">
        {!activeContact ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6 shadow-sm shrink-0 flex-none">
              <MessageSquare className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Select a contact to start a conversation.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-[#7367f0] text-white rounded-md text-sm font-medium sm:hidden shadow-sm"
              onClick={() => setIsSidebarOpen(true)}
            >
              View Contacts
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <header className="h-[72px] px-4 sm:px-6 border-b border-zinc-200 dark:border-zinc-800/60 flex justify-between items-center bg-white dark:bg-zinc-950 shrink-0 flex-none min-w-0 w-full box-border">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                  className="sm:hidden text-zinc-500 shrink-0 flex-none"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <Menu className="w-5 h-5" />
                </button>

                <BulletproofAvatar
                  src={activeContact.avatar}
                  initials={activeContact.initials}
                  color={activeContact.color}
                  status={activeContact.status}
                  size={40}
                  statusBorder="border-white dark:border-zinc-950"
                />

                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-zinc-900 dark:text-white leading-tight truncate">
                    {activeContact.name}
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 capitalize mt-0.5 truncate">
                    {activeContact.status}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-4 text-zinc-400 shrink-0 flex-none ml-2">
                <Phone className="w-5 h-5 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors hidden sm:block" />
                <Video className="w-5 h-5 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors hidden sm:block" />
                <MoreVertical className="w-5 h-5 cursor-pointer hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors" />
              </div>
            </header>

            {/* Chat Messages Area */}
            <div
              ref={chatScrollRef}
              className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden w-full"
            >
              <div className="flex flex-col gap-4 w-full">
                {chatHistories[activeContact.id]?.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 w-full ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "them" && (
                      <BulletproofAvatar
                        src={activeContact.avatar}
                        initials={activeContact.initials}
                        color={activeContact.color}
                        size={32}
                      />
                    )}

                    <div
                      className={`p-3 shadow-sm max-w-[85%] sm:max-w-[75%] ${
                        msg.sender === "me"
                          ? "bg-[#7367f0] text-white rounded-t-2xl rounded-bl-2xl rounded-br-sm"
                          : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700/50 rounded-t-2xl rounded-br-2xl rounded-bl-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {msg.text}
                      </p>
                      <p
                        className={`text-[10px] mt-1 text-right shrink-0 ${msg.sender === "me" ? "text-indigo-200" : "text-zinc-400"}`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-3 sm:p-4 bg-white dark:bg-[#0f111a] border-t border-zinc-200 dark:border-zinc-800/60 shrink-0 flex-none w-full box-border">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 sm:gap-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800/50 rounded-full px-3 sm:px-4 py-2 focus-within:border-[#7367f0] focus-within:ring-1 focus-within:ring-[#7367f0] transition-all w-full"
              >
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 min-w-0 w-full bg-transparent border-none focus:outline-none text-sm text-zinc-800 dark:text-zinc-200 placeholder:truncate"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-8 h-8 bg-[#7367f0] rounded-full flex items-center justify-center text-white shrink-0 flex-none hover:bg-[#6355eb] disabled:opacity-50 disabled:hover:bg-[#7367f0] transition-colors cursor-pointer"
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
