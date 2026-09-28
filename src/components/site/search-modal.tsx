"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, FileText, Home, Settings, Sparkles, User, Bot, X } from "lucide-react";
import { getAllSearchableItems, searchItems, SearchableItem } from "@/lib/search-registry";
import { frameworkFromPathname } from "@/lib/framework";
import { navHref } from "@/constants/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Where AI search sends the user's query, from `NEXT_PUBLIC_AI_SEARCH_ENDPOINT`.
 *
 * This was hardcoded to a service belonging to the template this site was built
 * from, which means every query left for a third party. Point it at your own
 * endpoint; when unset, the AI tab reports that search is unavailable rather
 * than sending anything anywhere.
 */
const AI_SEARCH_ENDPOINT = process.env.NEXT_PUBLIC_AI_SEARCH_ENDPOINT;

// AI Logo Component with fallback
const AILogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg'; loading?: boolean }> = ({
  className = "",
  size = 'md',
  loading = false
}) => {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const sizeStyles = {
    sm: { width: '24px', height: '24px' },
    md: { width: '32px', height: '32px' },
    lg: { width: '48px', height: '48px' }
  };

  if (imageError) {
    return <Sparkles className={`${sizeClasses[size]} ${loading ? 'animate-pulse' : ''} ${className}`} />;
  }

  return (
    <img
      src="/logo.svg"
      alt="AI Assistant"
      className={`${sizeClasses[size]} ${loading ? 'animate-pulse' : ''} ${className} rounded-lg`}
      style={sizeStyles[size]}
      onError={() => setImageError(true)}
    />
  );
};

// Declare marked types for window object
declare global {
  interface Window {
    marked?: {
      parse: (markdown: string) => string;
      setOptions: (options: {
        breaks?: boolean;
        gfm?: boolean;
        sanitize?: boolean;
      }) => void;
    };
  }
}

// Load marked.js for markdown parsing
const loadMarked = (): Promise<typeof window.marked> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.marked) {
      resolve(window.marked);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/lib/marked.umd.js';
    script.onload = () => {
      resolve(window.marked);
    };
    document.head.appendChild(script);
  });
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// AI Response Renderer Component with full markdown support
interface AIResponseRendererProps {
  content: string;
  onLinkClick: () => void;
}

const AIResponseRenderer: React.FC<AIResponseRendererProps> = ({ content, onLinkClick }) => {
  const [renderedContent, setRenderedContent] = useState<string>("");
  const [marked, setMarked] = useState<typeof window.marked | null>(null);

  useEffect(() => {
    loadMarked().then((markedLib) => {
      setMarked(markedLib);
    });
  }, []);

  useEffect(() => {
    if (marked && content) {
      // Configure marked options
      marked.setOptions({
        breaks: true,
        gfm: true,
        sanitize: false
      });

      // Render markdown to HTML
      const htmlContent = marked.parse(content);
      setRenderedContent(htmlContent);
    } else {
      // Fallback to simple text if marked is not loaded yet
      setRenderedContent(content);
    }
  }, [marked, content]);

  // Handle link clicks to close modal
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && href.startsWith('/')) {
        e.preventDefault();
        window.location.href = href;
        onLinkClick();
      }
    }
  };

  return (
    <div
      className="markdown-content prose prose-sm max-w-none text-foreground/70"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
      onClick={handleClick}
      style={{
        // Prose colours resolve to the theme tokens, so one set serves both
        // themes and every preset — no separate invert palette.
        '--tw-prose-body': 'color-mix(in oklab, var(--foreground) 70%, transparent)',
        '--tw-prose-headings': 'var(--foreground)',
        '--tw-prose-links': 'var(--primary)',
        '--tw-prose-bold': 'var(--foreground)',
        '--tw-prose-code': 'color-mix(in oklab, var(--foreground) 70%, transparent)',
        '--tw-prose-pre-code': 'color-mix(in oklab, var(--foreground) 80%, transparent)',
        '--tw-prose-pre-bg': 'color-mix(in oklab, var(--foreground) 3%, transparent)',
      } as React.CSSProperties}
    />
  );
};

// Icon mapping for different categories and items
const getItemIcon = (item: SearchableItem) => {
  const title = item.title.toLowerCase();

  if (title.includes("introduction") || title.includes("home")) {
    return <Home className="w-4 h-4" />;
  }
  if (title.includes("installation") || title.includes("setup")) {
    return <Settings className="w-4 h-4" />;
  }
  return <FileText className="w-4 h-4" />;
};

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  // Results resolve against the framework the reader is already in, so searching
  // from /docs/reactjs/... never drops them back into the Next.js tree.
  const framework = frameworkFromPathname(usePathname() ?? "");
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allItems] = useState(() => getAllSearchableItems());
  const [filteredItems, setFilteredItems] = useState<SearchableItem[]>([]);
  const [isAIMode] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiResponse, setAiResponse] = useState("");
  const [aiConversation, setAiConversation] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleSelectAndClose = useCallback(() => {
    setQuery("");
    setAiResponse("");
    setAiConversation([]);
    onClose();
  }, [onClose]);

  // Clear search function
  const handleClearSearch = useCallback(() => {
    setQuery("");
    setAiResponse("");
    setAiConversation([]);
    setSelectedIndex(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // AI Search Function
  const fetchAIResponse = useCallback(async (prompt: string) => {
    if (!prompt.trim()) return;

    // Add user message to conversation
    setAiConversation(prev => [...prev, { type: 'user', content: prompt }]);

    // Say so rather than failing silently — and never fall back to a default
    // endpoint, since that would send the query to someone else's service.
    if (!AI_SEARCH_ENDPOINT) {
      setAiConversation(prev => [...prev, {
        type: 'ai',
        content:
          'AI search is not configured. Set `NEXT_PUBLIC_AI_SEARCH_ENDPOINT` to enable it — ' +
          'the component list above still works.',
      }]);
      return;
    }

    setIsAILoading(true);
    setAiResponse("");

    try {
      const currentUrl = window.location.origin;
      const componentsWithLinks = allItems.map(item =>
        `${item.title}: ${item.description} - Link: ${currentUrl}${navHref(item, framework)}`
      ).join('\n');

     const enhancedPrompt = `You are "Algorize UI Search," an expert assistant for the Next.js documentation. Here are the available components with their documentation links:




${componentsWithLinks}

When recommending components, follow these guidelines:
1. Understand the user's intent, even if their keywords are unclear or imperfect.
2. Suggest the most relevant Algorize UI components based on reasoning, context, and functionality—not just keyword matching.
3. Always include the direct link to the component documentation. Format links as: [Component Name](${currentUrl}/docs/component-name)
4. Use markdown formatting consistently:
   - **Bold** for key terms or important points
   - *Italic* for emphasis
   - \`code\` for component names, props, or code snippets
   - Lists for multiple items or steps
   - > Blockquotes for tips, advice, or cautions

Respond clearly and helpfully. Explain why each component is suitable for the user's request and provide guidance on how to use it effectively.

User question: ${prompt}`;

      const res = await fetch(
        `${AI_SEARCH_ENDPOINT}?model=gpt-4o-mini&prompt=${encodeURIComponent(enhancedPrompt)}`,
      );

      if (!res.body) {
        console.error("No response body");
        setIsAILoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullText += chunk;
        setAiResponse(fullText);

        // Auto-scroll to bottom
        if (resultsRef.current) {
          resultsRef.current.scrollTop = resultsRef.current.scrollHeight;
        }
      }

      // Add AI response to conversation and clear current response
      setAiConversation(prev => [...prev, { type: 'ai', content: fullText }]);
      setAiResponse(""); // Clear current response to prevent duplication
    } catch (error) {
      console.error("AI request failed:", error);
      const errorMessage = "**Error**: Sorry, I encountered an error while processing your request. Please try again.";
      setAiResponse("");
      setAiConversation(prev => [...prev, { type: 'ai', content: errorMessage }]);
    } finally {
      setIsAILoading(false);
    }
  }, [allItems, framework]);

  // Handle AI query submission
  const handleAIQuery = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && isAIMode) {
      fetchAIResponse(query);
      setQuery("");
    }
  }, [query, isAIMode, fetchAIResponse]);

  // Update filtered items when query changes
  useEffect(() => {
    if (query.trim()) {
      const results = searchItems(query, allItems);
      setFilteredItems(results); // Show all search results
    } else {
      // Show all components when no query, grouped by category
      const componentItems = allItems.filter(item => item.category === 'Components');
      const otherItems = allItems.filter(item => item.category !== 'Components');
      setFilteredItems([...componentItems, ...otherItems]); // Show all items, components first
    }
    setSelectedIndex(0);
  }, [query, allItems]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredItems.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          if (isAIMode && query.trim()) {
            fetchAIResponse(query);
            setQuery("");
          } else if (filteredItems[selectedIndex]) {
            window.location.href = navHref(filteredItems[selectedIndex], framework);
            handleSelectAndClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
        case "k":
          // Ctrl+K to clear search
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleClearSearch();
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isAIMode, filteredItems, selectedIndex, onClose, handleSelectAndClose, fetchAIResponse, query, handleClearSearch, framework]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Custom styles for markdown content */}
      <style jsx global>{`
        .markdown-content {
          font-size: 13px;
          line-height: 1.65;
          color: color-mix(in oklab, var(--foreground) 70%, transparent);
        }
        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3,
        .markdown-content h4,
        .markdown-content h5,
        .markdown-content h6 {
          margin: 0.5em 0 0.25em 0;
          font-weight: 600;
          color: var(--foreground);
        }
        .markdown-content h1 { font-size: 1.1em; }
        .markdown-content h2 { font-size: 1.05em; }
        .markdown-content h3 { font-size: 1em; }
        .markdown-content p {
          margin: 0.5em 0;
          color: inherit;
        }
        .markdown-content ul,
        .markdown-content ol {
          margin: 0.5em 0;
          padding-left: 1.5em;
          color: inherit;
        }
        .markdown-content li {
          margin: 0.25em 0;
          color: inherit;
        }
        .markdown-content code {
          background-color: color-mix(in oklab, var(--foreground) 6%, transparent);
          border-radius: 0.25rem;
          padding: 0.125rem 0.375rem;
          font-size: 12px;
        }
        .markdown-content pre {
          background-color: color-mix(in oklab, var(--foreground) 3%, transparent);
          border-radius: 0.75rem;
          padding: 0.75rem;
          margin: 0.5em 0;
          overflow-x: auto;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
        }
        .markdown-content a {
          color: var(--primary);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .markdown-content a:hover {
          text-decoration: underline;
        }
        .markdown-content blockquote {
          border-left: 3px solid color-mix(in oklab, var(--primary) 30%, transparent);
          padding-left: 1rem;
          margin: 0.5em 0;
          font-style: italic;
          color: color-mix(in oklab, var(--foreground) 50%, transparent);
        }
        .markdown-content strong {
          font-weight: 600;
          color: var(--foreground);
        }
        .markdown-content em {
          font-style: italic;
          color: inherit;
        }
      `}</style>
      <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-99999 bg-background/60 backdrop-blur-md"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-2xl bg-popover/95 text-popover-foreground backdrop-blur-xl rounded-2xl shadow-2xl border border-border overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 h-14 border-b border-foreground/[0.06]">
              {/* AI Toggle Switch */}
              {/* <div className="flex items-center gap-2 mr-2">
                <button
                  onClick={() => {
                    setIsAIMode(!isAIMode);
                    setQuery("");
                    setAiResponse("");
                    setAiConversation([]);
                  }}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                    isAIMode ? 'bg-primary' : 'bg-foreground/15'
                  }`}
                  role="switch"
                  aria-checked={isAIMode}
                  aria-label="Toggle AI search mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                      isAIMode ? 'translate-x-6' : 'translate-x-1'
                    } flex items-center justify-center`}
                  >
                    {isAIMode ? (
                      <div className="m-1 w-2 h-2 bg-primary rounded-full" />
                    ) : (
                      <div className="m-1 w-2 h-2 bg-foreground/40 rounded-full" />
                    )}
                  </span>
                </button>
                <span className="text-xs text-muted-foreground">
                  {isAIMode ? 'AI' : 'Search'}
                </span>
              </div> */}

              {/* Search Icon */}
              {isAIMode ? (
                <Bot className="w-4 h-4 text-primary" />
              ) : (
                <Search className="w-4 h-4 text-foreground/40" />
              )}

              {/* Input Field */}
              <form onSubmit={handleAIQuery} className="flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isAIMode ? "Ask AI about components..." : "Search components and documentation..."}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent text-[14px] text-foreground placeholder:text-foreground/40 outline-none"
                />
              </form>

              {/* Results Counter / AI Status */}
              <div className="flex items-center gap-2 text-[12px] text-foreground/40">
                {isAIMode ? (
                  <span className="px-2 py-0.5 rounded-md bg-primary/15 text-primary text-[11px] font-medium">
                    {isAILoading ? 'AI thinking...' : 'AI Ready'}
                  </span>
                ) : (
                  <span className="tabular-nums">
                    {filteredItems.length} results
                  </span>
                )}
                <kbd className="flex items-center px-1.5 py-0.5 bg-foreground/[0.04] rounded-md border border-foreground/[0.08] font-mono text-[11px] text-foreground/50">
                  <Command className="w-3 h-3 inline mr-0.5" />K
                </kbd>
              </div>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[500px] overflow-y-auto">
              {isAIMode ? (
                /* AI Chat Interface */
                <div className="p-4 space-y-4">
                  {/* Conversation History */}
                  {aiConversation.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          {message.type === 'user' ? (
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                              <User className="w-4 h-4" />
                            </div>
                          ) : (
                            <AILogo size="md" />
                          )}
                        </div>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-foreground/[0.04] border border-foreground/[0.06] text-foreground'
                        }`}>
                          <div className="text-[13px] whitespace-pre-wrap">
                            {message.type === 'ai' ? (
                              <AIResponseRenderer content={message.content} onLinkClick={handleSelectAndClose} />
                            ) : (
                              message.content
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Current AI Response */}
                  {(isAILoading || aiResponse) && (
                    <div className="flex gap-3 justify-start">
                      <div className="flex gap-2 max-w-[80%]">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                          <AILogo size="md" loading={isAILoading} />
                        </div>
                        <div className="rounded-2xl px-4 py-3 bg-foreground/[0.04] border border-foreground/[0.06] text-foreground">
                          {isAILoading && !aiResponse ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-primary border-t-transparent rounded-full"></div>
                              <span className="text-[13px] text-foreground/50">AI is thinking...</span>
                            </div>
                          ) : (
                            <div className="text-[13px] whitespace-pre-wrap">
                              <AIResponseRenderer content={aiResponse} onLinkClick={handleSelectAndClose} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Welcome Message */}
                  {aiConversation.length === 0 && !aiResponse && (
                    <div className="text-center py-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center">
                        <AILogo size="lg" />
                      </div>
                      <h3 className="text-[14px] font-semibold text-foreground mb-2">AI Assistant Ready</h3>
                      <p className="text-[13px] leading-[1.65] text-foreground/50 max-w-md mx-auto">
                        Ask me anything about the Algorize UI components! I can help you find the right component, explain usage patterns, or provide implementation guidance.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 justify-center">
                        {[
                          'How do I use the Button component?',
                          'Show me Modal examples',
                          'What video components are available?',
                          'Guide me to Accordion usage',
                          'Find Carousel components'
                        ].map((suggestion) => (
                          <button
                            key={suggestion}
                            onClick={() => {
                              setQuery(suggestion);
                              fetchAIResponse(suggestion);
                              setQuery("");
                            }}
                            className="px-3 py-1 text-[12px] bg-foreground/[0.04] rounded-full text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Regular Search Results */
                filteredItems.length > 0 ? (
                  <div className="p-2">
                    {filteredItems.map((item, index) => (
                      <Link
                        key={item.id}
                        href={navHref(item, framework)}
                        onClick={handleSelectAndClose}
                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          index === selectedIndex
                            ? "bg-foreground/[0.05]"
                            : "hover:bg-foreground/[0.04]"
                        }`}
                      >
                        {/* The selected row carries the accent on its icon and
                            title — the only place the palette uses colour. */}
                        <div
                          className={`flex-shrink-0 transition-colors ${
                            index === selectedIndex ? "text-primary" : "text-foreground/35"
                          }`}
                        >
                          {getItemIcon(item)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-[13px] font-medium truncate transition-colors ${
                              index === selectedIndex ? "text-primary" : "text-foreground"
                            }`}
                          >
                            {item.title}
                          </div>
                          <div className="text-[12px] text-foreground/40 truncate">
                            {item.description}
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground/35">
                          {item.category}
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-[13px] text-foreground/50">
                    <Search className="w-6 h-6 mx-auto mb-2 text-foreground/30" />
                    <p>No results found for &quot;{query}&quot;</p>
                  </div>
                )
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-foreground/[0.06]">
              <div className="flex items-center justify-between text-[12px] text-foreground/40">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-foreground/[0.04] rounded-md border border-foreground/[0.08] font-mono text-[11px] text-foreground/50">↑</kbd>
                    <kbd className="px-1.5 py-0.5 bg-foreground/[0.04] rounded-md border border-foreground/[0.08] font-mono text-[11px] text-foreground/50">↓</kbd>
                    to navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 bg-foreground/[0.04] rounded-md border border-foreground/[0.08] font-mono text-[11px] text-foreground/50">↵</kbd>
                    {isAIMode ? 'to send' : 'to select'}
                  </span>
                  {/* Clear Search Button */}
                  <button
                    onClick={handleClearSearch}
                    className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-foreground/[0.04] hover:bg-foreground/10 transition-colors text-foreground/50 hover:text-foreground"
                    title={isAIMode ? "Clear AI conversation (Ctrl+K)" : "Clear search (Ctrl+K)"}
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                    <kbd className="ml-1 px-1 py-0.5 bg-foreground/[0.06] rounded font-mono text-[11px]">
                      ⌘K
                    </kbd>
                  </button>
                </div>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-foreground/[0.04] rounded-md border border-foreground/[0.08] font-mono text-[11px] text-foreground/50">esc</kbd>
                  to close
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
    </>
  );
};
