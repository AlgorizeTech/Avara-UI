"use client";

import AIChat, {
  AIChatColor,
  AIChatVariant,
} from "@/components/custom/blocks/Ai-chat";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const AICHAT_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import { Bot, Check, Copy, Edit2, Menu, MessageSquare, Mic, MoreVertical, Paperclip, Plus, Send, Settings, Sparkles, ThumbsDown, ThumbsUp, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type AIChatVariant = "default" | "minimal" | "glass";
export type AIChatColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const chatVariants: Record<AIChatVariant, Record<string, string>> = {
  default: {
    wrapper: "bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800/80 shadow-xl rounded-2xl",
    sidebar: "bg-white/90 dark:bg-[#121217]/90 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/50",
    main: "bg-white dark:bg-[#09090b]",
    header: "bg-white/80 dark:bg-[#09090b]/80 border-b border-zinc-100 dark:border-zinc-800/80 backdrop-blur-xl",
    input: "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-sm",
    msgAi: "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm shadow-sm",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar: "bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 lg:mr-4",
    main: "bg-transparent",
    header: "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50 mb-2",
    input: "bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800",
    msgUser: "text-white rounded-2xl rounded-br-sm shadow-sm",
    msgAi: "bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-bl-sm",
  },
  glass: {
    wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl",
    sidebar: "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10",
    main: "bg-transparent",
    header: "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    input: "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-lg",
    msgAi: "bg-white/50 dark:bg-black/50 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-white/30 dark:border-white/10 rounded-2xl rounded-tl-sm",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { primaryText: "text-indigo-500 dark:text-indigo-400", primaryBg: "bg-indigo-500 hover:bg-indigo-600 text-white", primaryHover: "hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10", lightBg: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300", gradient: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-500/20", ring: "focus-within:border-indigo-500/50 focus-within:ring-indigo-500/10", focusRing: "focus:ring-indigo-500/20", inputBorder: "border-indigo-300 dark:border-indigo-500/50" },
  rose: { primaryText: "text-rose-500 dark:text-rose-400", primaryBg: "bg-rose-500 hover:bg-rose-600 text-white", primaryHover: "hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10", lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300", gradient: "from-rose-500 to-orange-500", shadow: "shadow-rose-500/20", ring: "focus-within:border-rose-500/50 focus-within:ring-rose-500/10", focusRing: "focus:ring-rose-500/20", inputBorder: "border-rose-300 dark:border-rose-500/50" },
  emerald: { primaryText: "text-emerald-500 dark:text-emerald-400", primaryBg: "bg-emerald-500 hover:bg-emerald-600 text-white", primaryHover: "hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10", lightBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20", ring: "focus-within:border-emerald-500/50 focus-within:ring-emerald-500/10", focusRing: "focus:ring-emerald-500/20", inputBorder: "border-emerald-300 dark:border-emerald-500/50" },
  zinc: { primaryText: "text-zinc-900 dark:text-zinc-100", primaryBg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", primaryHover: "hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800", lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", gradient: "from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500", shadow: "shadow-zinc-900/10 dark:shadow-white/10", ring: "focus-within:border-zinc-500/50 focus-within:ring-zinc-500/10", focusRing: "focus:ring-zinc-500/20", inputBorder: "border-zinc-300 dark:border-zinc-500/50" },
};

export type ChatThread = { id: number | string; title: string; date: string; };
export type Message = { id: number | string; role: "ai" | "user"; content: string; time: string; };

export default function AIChat({ chatHistory = [], initialMessages = [], variant = "default", color = "indigo" }: { chatHistory?: ChatThread[]; initialMessages?: Message[]; variant?: AIChatVariant; color?: AIChatColor; }) {
  const isCustomHex = color.startsWith("#");

  const customVars = isCustomHex ? {
    "--chat-custom": color,
    "--chat-custom-10": \`\${color}1a\`,
    "--chat-custom-20": \`\${color}33\`,
    "--chat-custom-50": \`\${color}80\`,
  } as React.CSSProperties : {};

  const theme = isCustomHex ? {
    primaryText: "text-[var(--chat-custom)]",
    primaryBg: "bg-[var(--chat-custom)] hover:brightness-110 text-white",
    primaryHover: "hover:text-[var(--chat-custom)] hover:bg-[var(--chat-custom-10)]",
    lightBg: "bg-[var(--chat-custom-10)] text-[var(--chat-custom)]",
    gradient: "from-[var(--chat-custom)] to-[var(--chat-custom-50)]",
    shadow: "shadow-[0_4px_14px_0_var(--chat-custom-20)]",
    ring: "focus-within:border-[var(--chat-custom-50)] focus-within:ring-2 focus-within:ring-[var(--chat-custom-10)]",
    focusRing: "focus:ring-2 focus:ring-[var(--chat-custom-20)]",
    inputBorder: "border-[var(--chat-custom-50)]",
  } : colorThemes[color] || colorThemes["indigo"];

  const styles = chatVariants[variant];

  const [chats, setChats] = useState<ChatThread[]>(chatHistory);
  const [activeChatId, setActiveChatId] = useState<number | string | null>(chatHistory.length > 0 ? chatHistory[0].id : null);
  const [messagesMap, setMessagesMap] = useState<Record<string | number, Message[]>>(() => {
    const map: Record<string | number, Message[]> = {};
    chatHistory.forEach((chat, index) => {
      map[chat.id] = index === 0 ? initialMessages : [{ id: \`welcome-\${chat.id}\`, role: "ai", content: \`Hello! You are viewing the chat: "\${chat.title}". How can I help you further?\`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }];
    });
    return map;
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<number | string | null>(null);
  const [editTitleValue, setEditTitleValue] = useState("");

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const activeMessages = activeChatId ? messagesMap[activeChatId] || [] : [];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeMessages, isTyping]);

  const handleNewChat = () => {
    const newId = Date.now();
    setChats([{ id: newId, title: "New Conversation", date: "Today" }, ...chats]);
    setMessagesMap((prev) => ({ ...prev, [newId]: [{ id: Date.now() + 1, role: "ai", content: "Hello! I am your AI assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] }));
    setActiveChatId(newId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleSelectChat = (id: string | number) => {
    if (editingChatId) return;
    setActiveChatId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const startEditingChat = (chat: ChatThread, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitleValue(chat.title);
  };

  const saveEditChat = (id: string | number, e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    if (!editTitleValue.trim()) return;
    setChats(chats.map((c) => (c.id === id ? { ...c, title: editTitleValue } : c)));
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const cancelEditChat = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.stopPropagation();
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const handleDeleteChat = (id: string | number, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedChats = chats.filter((c) => c.id !== id);
    setChats(updatedChats);
    const updatedMessagesMap = { ...messagesMap };
    delete updatedMessagesMap[id];
    setMessagesMap(updatedMessagesMap);
    if (activeChatId === id) setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const userMsg: Message = { id: Date.now(), role: "user", content: inputValue, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessagesMap((prev) => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), userMsg] }));
    setChats((prev) => prev.map((c) => c.id === activeChatId && c.title === "New Conversation" ? { ...c, title: inputValue.slice(0, 25) + (inputValue.length > 25 ? "..." : "") } : c));
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = { id: Date.now() + 1, role: "ai", content: "That's a great point! Based on your input, I can process this and generate the optimal solution. Let me know if you need any specific adjustments.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMessagesMap((prev) => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), aiMsg] }));
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={customVars} className={cn("w-full max-w-full h-[650px] sm:h-[750px] flex overflow-hidden relative font-sans box-border transition-colors duration-300", styles.wrapper)}>
      <aside className={cn(\`absolute lg:relative z-30 w-[280px] shrink-0 h-full flex flex-col transition-transform duration-300 ease-in-out \${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}\`, styles.sidebar)}>
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/50 shrink-0">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100">History</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-zinc-500"><X className="w-5 h-5" /></button>
          </div>
          <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-3">
          {["Today", "Yesterday", "Previous 7 Days"].map((dateGroup) => {
            const groupChats = chats.filter((c) => c.date === dateGroup);
            if (groupChats.length === 0) return null;
            return (
              <div key={dateGroup} className="mb-6">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-3">{dateGroup}</p>
                <div className="space-y-0.5">
                  {groupChats.map((chat) => {
                    const isActive = activeChatId === chat.id;
                    const isEditing = editingChatId === chat.id;
                    return (
                      <div key={chat.id} onClick={() => handleSelectChat(chat.id)} className={\`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all text-sm group \${isActive ? cn("font-semibold", theme.lightBg) : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium"}\`}>
                        {isEditing ? (
                          <div className="flex items-center gap-2 w-full cursor-default" onClick={(e) => e.stopPropagation()}>
                            <MessageSquare className={cn("w-4 h-4 shrink-0", theme.primaryText)} />
                            <input autoFocus value={editTitleValue} onChange={(e) => setEditTitleValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEditChat(chat.id, e); if (e.key === "Escape") cancelEditChat(e); }} className={cn("flex-1 bg-white dark:bg-zinc-950 border rounded px-2 py-0.5 text-xs outline-none text-zinc-900 dark:text-zinc-100 cursor-text", theme.inputBorder, theme.focusRing)} />
                            <button onClick={(e) => saveEditChat(chat.id, e)} className="text-emerald-500 hover:text-emerald-600 cursor-pointer shrink-0"><Check className="w-4 h-4" /></button>
                            <button onClick={cancelEditChat} className="text-rose-500 hover:text-rose-600 cursor-pointer shrink-0"><X className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 truncate pr-2 min-w-0">
                              <MessageSquare className={\`w-4 h-4 shrink-0 \${isActive ? theme.primaryText : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"}\`} />
                              <span className="truncate">{chat.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button onClick={(e) => startEditingChat(chat, e)} className={cn("p-1.5 text-zinc-400 rounded-md transition-colors cursor-pointer", theme.primaryHover)}><Edit2 className="w-3.5 h-3.5" /></button>
                              <button onClick={(e) => handleDeleteChat(chat.id, e)} className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-md transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50 shrink-0 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-full bg-gradient-to-tr flex items-center justify-center text-white font-bold text-xs shadow-sm", theme.gradient)}>JM</div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Joel M.</span>
          </div>
          <Settings className="w-4 h-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" />
        </div>
      </aside>

      {isSidebarOpen && <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 lg:hidden cursor-pointer" onClick={() => setIsSidebarOpen(false)} />}

      <main className={cn("flex-1 flex flex-col min-w-0 relative z-10 transition-colors duration-300", styles.main)}>
        {!activeChatId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className={cn("w-24 h-24 bg-gradient-to-tr rounded-3xl flex items-center justify-center mb-6 border border-white dark:border-zinc-800 rotate-3 shrink-0 shadow-xl", theme.gradient, theme.shadow)}>
              <Bot className="w-10 h-10 text-white -rotate-3" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">How can I help you today?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mb-8">Select a conversation from the sidebar or start a new one to begin chatting.</p>
            <div className="flex items-center gap-4">
              <button className="lg:hidden px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95" onClick={() => setIsSidebarOpen(true)}>View History</button>
              <button onClick={handleNewChat} className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 shadow-md", theme.primaryBg, theme.shadow)}><Plus className="w-4 h-4" /> New Chat</button>
            </div>
          </div>
        ) : (
          <>
            <header className={cn("h-[72px] px-4 sm:px-6 flex justify-between items-center shrink-0 flex-none z-10 transition-colors duration-300", styles.header)}>
              <div className="flex items-center gap-3">
                <button className="lg:hidden text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0" onClick={() => setIsSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 bg-gradient-to-br rounded-xl flex items-center justify-center text-white shadow-sm", theme.gradient, theme.shadow)}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">AI Assistant</h2>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </header>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
              <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-4">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={\`flex gap-4 \${msg.role === "user" ? "flex-row-reverse" : "flex-row"}\`}>
                    <div className="shrink-0">
                      {msg.role === "ai" ? (
                        <div className={cn("w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center text-white shadow-sm", theme.gradient)}><Bot className="w-5 h-5" /></div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold text-xs shadow-sm">JM</div>
                      )}
                    </div>
                    <div className={\`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] \${msg.role === "user" ? "items-end" : "items-start"}\`}>
                      <div className={cn(\`px-5 py-3.5 text-[15px] whitespace-pre-wrap leading-relaxed\`, msg.role === "user" ? cn(styles.msgUser, theme.primaryBg) : styles.msgAi)}>{msg.content}</div>
                      <div className={\`flex items-center gap-3 mt-1 px-1 \${msg.role === "user" ? "justify-end" : "justify-start"}\`}>
                        <span className="text-[10px] font-medium text-zinc-400">{msg.time}</span>
                        {msg.role === "ai" && (
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <button className="p-1 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 flex-row items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className={cn("shrink-0 w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center text-white shadow-sm mb-5", theme.gradient)}><Bot className="w-5 h-5" /></div>
                    <div className={cn("px-4 py-3.5 flex items-center gap-1.5 mb-5", styles.msgAi)}>
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-transparent shrink-0 z-10">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage} className={cn("flex items-end gap-2 rounded-2xl p-2 transition-all shadow-sm", styles.input, theme.ring)}>
                  <button type="button" className="p-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"><Paperclip className="w-5 h-5" /></button>
                  <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message the AI Assistant..." className="flex-1 max-h-32 bg-transparent border-none focus:outline-none text-[15px] text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 resize-none py-3 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-text" rows={1} style={{ minHeight: "48px" }} />
                  <div className="flex items-center gap-1 shrink-0 pb-1">
                    <button type="button" className={cn("p-2 text-zinc-400 rounded-xl transition-colors", theme.primaryHover)}><Mic className="w-5 h-5" /></button>
                    <button type="submit" disabled={!inputValue.trim()} className={cn("p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-sm cursor-pointer", theme.primaryBg)}><Send className="w-4 h-4 ml-0.5" /></button>
                  </div>
                </form>
                <p className="text-center text-[11px] font-medium text-zinc-400 mt-3 cursor-default">AI can make mistakes. Consider verifying important information.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const AICHAT_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import { Bot, Check, Copy, Edit2, Menu, MessageSquare, Mic, MoreVertical, Paperclip, Plus, Send, Settings, Sparkles, ThumbsDown, ThumbsUp, Trash2, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const chatVariants = {
  default: {
    wrapper: "bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800/80 shadow-xl rounded-2xl",
    sidebar: "bg-white/90 dark:bg-[#121217]/90 backdrop-blur-xl border-r border-zinc-200 dark:border-zinc-800/50",
    main: "bg-white dark:bg-[#09090b]",
    header: "bg-white/80 dark:bg-[#09090b]/80 border-b border-zinc-100 dark:border-zinc-800/80 backdrop-blur-xl",
    input: "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-sm",
    msgAi: "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-tl-sm shadow-sm",
  },
  minimal: {
    wrapper: "bg-transparent border-none shadow-none rounded-none",
    sidebar: "bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 lg:mr-4",
    main: "bg-transparent",
    header: "bg-transparent border-b border-zinc-200 dark:border-zinc-800/50 mb-2",
    input: "bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800",
    msgUser: "text-white rounded-2xl rounded-br-sm shadow-sm",
    msgAi: "bg-zinc-50 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-2xl rounded-bl-sm",
  },
  glass: {
    wrapper: "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl",
    sidebar: "bg-white/10 dark:bg-black/10 border-r border-white/20 dark:border-white/10",
    main: "bg-transparent",
    header: "bg-white/10 dark:bg-black/10 border-b border-white/20 dark:border-white/10 backdrop-blur-md",
    input: "bg-white/30 dark:bg-black/30 border border-white/30 dark:border-white/10 backdrop-blur-md",
    msgUser: "text-white rounded-2xl rounded-tr-sm shadow-lg",
    msgAi: "bg-white/50 dark:bg-black/50 backdrop-blur-md text-zinc-900 dark:text-zinc-100 border border-white/30 dark:border-white/10 rounded-2xl rounded-tl-sm",
  },
};

const colorThemes = {
  indigo: { primaryText: "text-indigo-500 dark:text-indigo-400", primaryBg: "bg-indigo-500 hover:bg-indigo-600 text-white", primaryHover: "hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10", lightBg: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300", gradient: "from-indigo-500 to-purple-600", shadow: "shadow-indigo-500/20", ring: "focus-within:border-indigo-500/50 focus-within:ring-indigo-500/10", focusRing: "focus:ring-indigo-500/20", inputBorder: "border-indigo-300 dark:border-indigo-500/50" },
  rose: { primaryText: "text-rose-500 dark:text-rose-400", primaryBg: "bg-rose-500 hover:bg-rose-600 text-white", primaryHover: "hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10", lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300", gradient: "from-rose-500 to-orange-500", shadow: "shadow-rose-500/20", ring: "focus-within:border-rose-500/50 focus-within:ring-rose-500/10", focusRing: "focus:ring-rose-500/20", inputBorder: "border-rose-300 dark:border-rose-500/50" },
  emerald: { primaryText: "text-emerald-500 dark:text-emerald-400", primaryBg: "bg-emerald-500 hover:bg-emerald-600 text-white", primaryHover: "hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10", lightBg: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20", ring: "focus-within:border-emerald-500/50 focus-within:ring-emerald-500/10", focusRing: "focus:ring-emerald-500/20", inputBorder: "border-emerald-300 dark:border-emerald-500/50" },
  zinc: { primaryText: "text-zinc-900 dark:text-zinc-100", primaryBg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900", primaryHover: "hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800", lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", gradient: "from-zinc-700 to-zinc-900 dark:from-zinc-300 dark:to-zinc-500", shadow: "shadow-zinc-900/10 dark:shadow-white/10", ring: "focus-within:border-zinc-500/50 focus-within:ring-zinc-500/10", focusRing: "focus:ring-zinc-500/20", inputBorder: "border-zinc-300 dark:border-zinc-500/50" },
};

export default function AIChat({ chatHistory = [], initialMessages = [], variant = "default", color = "indigo" }) {
  const isCustomHex = color.startsWith("#");

  const customVars = isCustomHex ? {
    "--chat-custom": color,
    "--chat-custom-10": \`\${color}1a\`,
    "--chat-custom-20": \`\${color}33\`,
    "--chat-custom-50": \`\${color}80\`,
  } : {};

  const theme = isCustomHex ? {
    primaryText: "text-[var(--chat-custom)]",
    primaryBg: "bg-[var(--chat-custom)] hover:brightness-110 text-white",
    primaryHover: "hover:text-[var(--chat-custom)] hover:bg-[var(--chat-custom-10)]",
    lightBg: "bg-[var(--chat-custom-10)] text-[var(--chat-custom)]",
    gradient: "from-[var(--chat-custom)] to-[var(--chat-custom-50)]",
    shadow: "shadow-[0_4px_14px_0_var(--chat-custom-20)]",
    ring: "focus-within:border-[var(--chat-custom-50)] focus-within:ring-2 focus-within:ring-[var(--chat-custom-10)]",
    focusRing: "focus:ring-2 focus:ring-[var(--chat-custom-20)]",
    inputBorder: "border-[var(--chat-custom-50)]",
  } : colorThemes[color] || colorThemes["indigo"];

  const styles = chatVariants[variant];

  const [chats, setChats] = useState(chatHistory);
  const [activeChatId, setActiveChatId] = useState(chatHistory.length > 0 ? chatHistory[0].id : null);
  const [messagesMap, setMessagesMap] = useState(() => {
    const map = {};
    chatHistory.forEach((chat, index) => {
      map[chat.id] = index === 0 ? initialMessages : [{ id: \`welcome-\${chat.id}\`, role: "ai", content: \`Hello! You are viewing the chat: "\${chat.title}". How can I help you further?\`, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }];
    });
    return map;
  });

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState(null);
  const [editTitleValue, setEditTitleValue] = useState("");

  const chatScrollRef = useRef(null);
  const activeMessages = activeChatId ? messagesMap[activeChatId] || [] : [];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeMessages, isTyping]);

  const handleNewChat = () => {
    const newId = Date.now();
    setChats([{ id: newId, title: "New Conversation", date: "Today" }, ...chats]);
    setMessagesMap((prev) => ({ ...prev, [newId]: [{ id: Date.now() + 1, role: "ai", content: "Hello! I am your AI assistant. How can I help you today?", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }] }));
    setActiveChatId(newId);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const handleSelectChat = (id) => {
    if (editingChatId) return;
    setActiveChatId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) setIsSidebarOpen(false);
  };

  const startEditingChat = (chat, e) => {
    e.stopPropagation();
    setEditingChatId(chat.id);
    setEditTitleValue(chat.title);
  };

  const saveEditChat = (id, e) => {
    e?.stopPropagation();
    if (!editTitleValue.trim()) return;
    setChats(chats.map((c) => (c.id === id ? { ...c, title: editTitleValue } : c)));
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const cancelEditChat = (e) => {
    e?.stopPropagation();
    setEditingChatId(null);
    setEditTitleValue("");
  };

  const handleDeleteChat = (id, e) => {
    e.stopPropagation();
    const updatedChats = chats.filter((c) => c.id !== id);
    setChats(updatedChats);
    const updatedMessagesMap = { ...messagesMap };
    delete updatedMessagesMap[id];
    setMessagesMap(updatedMessagesMap);
    if (activeChatId === id) setActiveChatId(updatedChats.length > 0 ? updatedChats[0].id : null);
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!inputValue.trim() || !activeChatId) return;

    const userMsg = { id: Date.now(), role: "user", content: inputValue, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessagesMap((prev) => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), userMsg] }));
    setChats((prev) => prev.map((c) => c.id === activeChatId && c.title === "New Conversation" ? { ...c, title: inputValue.slice(0, 25) + (inputValue.length > 25 ? "..." : "") } : c));
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg = { id: Date.now() + 1, role: "ai", content: "That's a great point! Based on your input, I can process this and generate the optimal solution. Let me know if you need any specific adjustments.", time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
      setMessagesMap((prev) => ({ ...prev, [activeChatId]: [...(prev[activeChatId] || []), aiMsg] }));
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div style={customVars} className={cn("w-full max-w-full h-[650px] sm:h-[750px] flex overflow-hidden relative font-sans box-border transition-colors duration-300", styles.wrapper)}>
      <aside className={cn(\`absolute lg:relative z-30 w-[280px] shrink-0 h-full flex flex-col transition-transform duration-300 ease-in-out \${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}\`, styles.sidebar)}>
        <div className="p-5 border-b border-zinc-100 dark:border-zinc-800/50 shrink-0">
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-bold text-zinc-900 dark:text-zinc-100">History</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-zinc-500"><X className="w-5 h-5" /></button>
          </div>
          <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 rounded-xl font-bold transition-all shadow-md active:scale-95 cursor-pointer">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-3">
          {["Today", "Yesterday", "Previous 7 Days"].map((dateGroup) => {
            const groupChats = chats.filter((c) => c.date === dateGroup);
            if (groupChats.length === 0) return null;
            return (
              <div key={dateGroup} className="mb-6">
                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-2 px-3">{dateGroup}</p>
                <div className="space-y-0.5">
                  {groupChats.map((chat) => {
                    const isActive = activeChatId === chat.id;
                    const isEditing = editingChatId === chat.id;
                    return (
                      <div key={chat.id} onClick={() => handleSelectChat(chat.id)} className={\`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all text-sm group \${isActive ? cn("font-semibold", theme.lightBg) : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 font-medium"}\`}>
                        {isEditing ? (
                          <div className="flex items-center gap-2 w-full cursor-default" onClick={(e) => e.stopPropagation()}>
                            <MessageSquare className={cn("w-4 h-4 shrink-0", theme.primaryText)} />
                            <input autoFocus value={editTitleValue} onChange={(e) => setEditTitleValue(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") saveEditChat(chat.id, e); if (e.key === "Escape") cancelEditChat(e); }} className={cn("flex-1 bg-white dark:bg-zinc-950 border rounded px-2 py-0.5 text-xs outline-none text-zinc-900 dark:text-zinc-100 cursor-text", theme.inputBorder, theme.focusRing)} />
                            <button onClick={(e) => saveEditChat(chat.id, e)} className="text-emerald-500 hover:text-emerald-600 cursor-pointer shrink-0"><Check className="w-4 h-4" /></button>
                            <button onClick={cancelEditChat} className="text-rose-500 hover:text-rose-600 cursor-pointer shrink-0"><X className="w-4 h-4" /></button>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 truncate pr-2 min-w-0">
                              <MessageSquare className={\`w-4 h-4 shrink-0 \${isActive ? theme.primaryText : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"}\`} />
                              <span className="truncate">{chat.title}</span>
                            </div>
                            <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <button onClick={(e) => startEditingChat(chat, e)} className={cn("p-1.5 text-zinc-400 rounded-md transition-colors cursor-pointer", theme.primaryHover)}><Edit2 className="w-3.5 h-3.5" /></button>
                              <button onClick={(e) => handleDeleteChat(chat.id, e)} className="p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-md transition-colors cursor-pointer"><Trash2 className="w-3.5 h-3.5" /></button>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/50 shrink-0 flex items-center justify-between cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
          <div className="flex items-center gap-3">
            <div className={cn("w-8 h-8 rounded-full bg-gradient-to-tr flex items-center justify-center text-white font-bold text-xs shadow-sm", theme.gradient)}>JM</div>
            <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Joel M.</span>
          </div>
          <Settings className="w-4 h-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200" />
        </div>
      </aside>

      {isSidebarOpen && <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-20 lg:hidden cursor-pointer" onClick={() => setIsSidebarOpen(false)} />}

      <main className={cn("flex-1 flex flex-col min-w-0 relative z-10 transition-colors duration-300", styles.main)}>
        {!activeChatId ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className={cn("w-24 h-24 bg-gradient-to-tr rounded-3xl flex items-center justify-center mb-6 border border-white dark:border-zinc-800 rotate-3 shrink-0 shadow-xl", theme.gradient, theme.shadow)}>
              <Bot className="w-10 h-10 text-white -rotate-3" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">How can I help you today?</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-md mb-8">Select a conversation from the sidebar or start a new one to begin chatting.</p>
            <div className="flex items-center gap-4">
              <button className="lg:hidden px-6 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-200 rounded-xl text-sm font-bold shadow-sm transition-all active:scale-95" onClick={() => setIsSidebarOpen(true)}>View History</button>
              <button onClick={handleNewChat} className={cn("px-6 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 shadow-md", theme.primaryBg, theme.shadow)}><Plus className="w-4 h-4" /> New Chat</button>
            </div>
          </div>
        ) : (
          <>
            <header className={cn("h-[72px] px-4 sm:px-6 flex justify-between items-center shrink-0 flex-none z-10 transition-colors duration-300", styles.header)}>
              <div className="flex items-center gap-3">
                <button className="lg:hidden text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors shrink-0" onClick={() => setIsSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
                <div className="flex items-center gap-3">
                  <div className={cn("w-9 h-9 bg-gradient-to-br rounded-xl flex items-center justify-center text-white shadow-sm", theme.gradient, theme.shadow)}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-tight">AI Assistant</h2>
                    <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-0.5">Online & Ready</p>
                  </div>
                </div>
              </div>
              <button className="p-2 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
            </header>

            <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6 scroll-smooth">
              <div className="flex flex-col gap-6 max-w-3xl mx-auto pb-4">
                {activeMessages.map((msg) => (
                  <div key={msg.id} className={\`flex gap-4 \${msg.role === "user" ? "flex-row-reverse" : "flex-row"}\`}>
                    <div className="shrink-0">
                      {msg.role === "ai" ? (
                        <div className={cn("w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center text-white shadow-sm", theme.gradient)}><Bot className="w-5 h-5" /></div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 flex items-center justify-center text-zinc-600 dark:text-zinc-300 font-bold text-xs shadow-sm">JM</div>
                      )}
                    </div>
                    <div className={\`flex flex-col gap-1 max-w-[85%] sm:max-w-[80%] \${msg.role === "user" ? "items-end" : "items-start"}\`}>
                      <div className={cn(\`px-5 py-3.5 text-[15px] whitespace-pre-wrap leading-relaxed\`, msg.role === "user" ? cn(styles.msgUser, theme.primaryBg) : styles.msgAi)}>{msg.content}</div>
                      <div className={\`flex items-center gap-3 mt-1 px-1 \${msg.role === "user" ? "justify-end" : "justify-start"}\`}>
                        <span className="text-[10px] font-medium text-zinc-400">{msg.time}</span>
                        {msg.role === "ai" && (
                          <div className="flex items-center gap-1.5 text-zinc-400">
                            <button className="p-1 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"><Copy className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded transition-colors"><ThumbsUp className="w-3.5 h-3.5" /></button>
                            <button className="p-1 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded transition-colors"><ThumbsDown className="w-3.5 h-3.5" /></button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-4 flex-row items-end animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <div className={cn("shrink-0 w-8 h-8 bg-gradient-to-br rounded-lg flex items-center justify-center text-white shadow-sm mb-5", theme.gradient)}><Bot className="w-5 h-5" /></div>
                    <div className={cn("px-4 py-3.5 flex items-center gap-1.5 mb-5", styles.msgAi)}>
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 sm:p-6 bg-transparent shrink-0 z-10">
              <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSendMessage} className={cn("flex items-end gap-2 rounded-2xl p-2 transition-all shadow-sm", styles.input, theme.ring)}>
                  <button type="button" className="p-2.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"><Paperclip className="w-5 h-5" /></button>
                  <textarea value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown} placeholder="Message the AI Assistant..." className="flex-1 max-h-32 bg-transparent border-none focus:outline-none text-[15px] text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 resize-none py-3 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] cursor-text" rows={1} style={{ minHeight: "48px" }} />
                  <div className="flex items-center gap-1 shrink-0 pb-1">
                    <button type="button" className={cn("p-2 text-zinc-400 rounded-xl transition-colors", theme.primaryHover)}><Mic className="w-5 h-5" /></button>
                    <button type="submit" disabled={!inputValue.trim()} className={cn("p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 transition-all shadow-sm cursor-pointer", theme.primaryBg)}><Send className="w-4 h-4 ml-0.5" /></button>
                  </div>
                </form>
                <p className="text-center text-[11px] font-medium text-zinc-400 mt-3 cursor-default">AI can make mistakes. Consider verifying important information.</p>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}`;

export function AIChatShowcase() {
  const [variant, setVariant] = useState<AIChatVariant>("default");

  // Initialize with localStorage if available
  const [color, setColor] = useState<AIChatColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    // Check periodically in case another script updates localStorage
    // without triggering a storage event in the exact same window.
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    // Listen for official cross-tab storage events
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    return `import AIChat from '@/components/custom/blocks/Ai-chat';

export default function AIChatDemo()${typeDef} {
  const chatHistory = [
    { id: 1, title: "Help with React Components", date: "Today" },
    { id: 2, title: "Write a python script for SEO", date: "Today" }
  ];

  const initialMessages = [
    {
      id: 1,
      role: "ai",
      content: "Hello! I am your AI assistant. How can I help you today?",
      time: "10:00 AM",
    }
  ];

  return (
    <div className="w-full h-[600px]">
      <AIChat 
        chatHistory={chatHistory} 
        initialMessages={initialMessages}
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

  const sampleChatHistory = [
    { id: 1, title: "Help with React Components", date: "Today" },
    { id: 2, title: "Write a python script for SEO", date: "Today" },
    { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
    { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
    { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
  ];

  const sampleInitialMessages = [
    {
      id: 1,
      role: "ai",
      content: "Hello! I am your AI assistant. How can I help you today?",
      time: "10:00 AM",
    },
    {
      id: 2,
      role: "user",
      content:
        "Can you help me build a modern dashboard UI using Tailwind CSS?",
      time: "10:02 AM",
    },
    {
      id: 3,
      role: "ai",
      content:
        "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
      time: "10:02 AM",
    },
  ] as any;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Style Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as AIChatVariant[]).map((v) => (
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
        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AIChat"
        tsCode={AICHAT_ENGINE_CODE_TS}
        jsCode={AICHAT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full transition-all duration-500 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}
        >
          <AIChat
            key={`${variant}-${color}`} // Force re-render to reset internal state gracefully if needed
            variant={variant}
            color={color}
            chatHistory={sampleChatHistory}
            initialMessages={sampleInitialMessages}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
