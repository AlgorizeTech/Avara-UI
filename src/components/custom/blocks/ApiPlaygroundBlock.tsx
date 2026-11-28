"use client";

import { cn } from "@/lib/utils";
import { SelectBlock } from "./SelectBlock";
import {
  Activity,
  Check,
  CheckCircle2,
  Clock,
  Play,
  Plus,
  TerminalSquare,
  Trash2,
  XCircle,
} from "lucide-react";
import { prefersReducedMotion } from "@/lib/animate";
import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { getThemeStyles } from "./api-playground-theme";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type ApiColor =
  | "primary"
  | "default"
  | "lavender"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// Theme colour fed to SelectBlock so the dropdown highlight, ring and chevron
// keep the per-method colour coding of the old native <select>.
const methodThemeColors: Record<HttpMethod, string> = {
  GET: "#3b82f6",
  POST: "#22c55e",
  PUT: "#f97316",
  PATCH: "#eab308",
  DELETE: "#ef4444",
};

const METHOD_OPTIONS = (
  ["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]
).map((m) => ({ label: m, value: m }));

// ==========================================
// INTERFACES
// ==========================================
export interface KeyValuePair {
  id: string;
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiResponse {
  status: number;
  timeMs: number;
  data: unknown;
}

/** The request snapshot handed to `mockHandler` when the reader hits Send. */
export interface ApiPlaygroundRequest {
  method: HttpMethod;
  url: string;
  headers: KeyValuePair[];
  params: KeyValuePair[];
  body: string;
}

/**
 * Decides how the playground answers a request. Annotate the whole handler with
 * this type rather than the `req` parameter alone — that way the returned
 * response shape is checked too:
 *
 *   const handleApiMock: ApiMockHandler = async (req) => { ... };
 */
export type ApiMockHandler = (
  req: ApiPlaygroundRequest,
) => Promise<ApiResponse>;

export interface ApiPlaygroundProps
  extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string;
  defaultMethod?: HttpMethod;
  color?: ApiColor;
  mockHandler?: ApiMockHandler;
}

// Helper to rebuild URL with query params
const buildFullUrl = (currentUrl: string, paramsList: KeyValuePair[]) => {
  const basePath = currentUrl.split("?")[0];
  const activeParams = paramsList.filter(
    (p) => p.enabled && p.key.trim() !== "",
  );

  if (activeParams.length === 0) {
    return basePath;
  }

  const queryParts = activeParams.map((p) => {
    const k = encodeURIComponent(p.key.trim());
    const v = encodeURIComponent(p.value);
    return `${k}=${v}`;
  });

  return `${basePath}?${queryParts.join("&")}`;
};

// Helper to parse query parameters from URL string
const parseParamsFromUrl = (fullUrl: string): KeyValuePair[] => {
  const queryIndex = fullUrl.indexOf("?");
  if (queryIndex === -1) return [];

  const queryString = fullUrl.slice(queryIndex + 1);
  if (!queryString) return [];

  const searchParams = new URLSearchParams(queryString);
  const parsed: KeyValuePair[] = [];

  searchParams.forEach((value, key) => {
    parsed.push({
      id: Math.random().toString(36).substring(7),
      key,
      value,
      enabled: true,
    });
  });

  return parsed;
};

// ==========================================
// LOOK & MOTION — see DESIGN.md
// Surfaces are lit by shadow, wells are soft gray, nothing is outlined, and
// content blurs in instead of popping.
// ==========================================
type TabKey = "params" | "headers" | "body";
const TABS: TabKey[] = ["params", "headers", "body"];

const SURFACE = "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.18)]";
const WELL = "bg-[#F7F7F6] dark:bg-background/50";
const WELL_HOVER = "hover:bg-[#F7F7F6] dark:hover:bg-background/50";
const FIELD = cn(
  WELL,
  "h-9 rounded-xl font-mono text-foreground outline-none placeholder:text-muted-foreground/60",
  "transition-[box-shadow,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
  "focus:ring-2 focus:ring-ring/40 disabled:opacity-50",
);

const SOFT_SETTLE = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Fades an element in from a blur, 8px low. Does nothing under reduced motion. */
const blurIn = (el: HTMLElement | null, delay = 0) => {
  if (!el || typeof el.animate !== "function" || prefersReducedMotion()) return;
  el.animate(
    [
      { opacity: 0, transform: "translateY(8px)", filter: "blur(8px)" },
      { opacity: 1, transform: "none", filter: "blur(0px)" },
    ],
    { duration: 500, delay, easing: SOFT_SETTLE, fill: "backwards" },
  );
};

/** Blurs in everything marked `data-blur` or `data-row` inside `root`, 35ms apart. */
const cascade = (root: HTMLElement | null) => {
  root
    ?.querySelectorAll<HTMLElement>("[data-blur], [data-row]")
    .forEach((el, i) => blurIn(el, i * 35));
};

/** Tints a JSON string: keys, strings, numbers and literals each get their own colour. */
const highlightJson = (json: string) =>
  json
    .split(/("(?:\\.|[^"\\])*"(?:\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g)
    .map((token, i) => {
      if (i % 2 === 0) return token;
      const tone = token.endsWith(":")
        ? "text-foreground font-medium"
        : token.startsWith('"')
          ? "text-emerald-600 dark:text-emerald-400"
          : /^(true|false|null)$/.test(token)
            ? "text-violet-600 dark:text-violet-400"
            : "text-amber-600 dark:text-amber-400";
      return (
        <span key={i} className={tone}>
          {token}
        </span>
      );
    });

// ==========================================
// COMPONENT
// ==========================================
export const ApiPlaygroundBlock = forwardRef<
  HTMLDivElement,
  ApiPlaygroundProps
>(
  (
    {
      defaultUrl = "https://api.example.com/v1/users",
      defaultMethod = "GET",
      color = "primary",
      mockHandler,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);

    // State
    const [method, setMethod] = useState<HttpMethod>(defaultMethod);
    const [url, setUrl] = useState(() => defaultUrl);
    const [activeTab, setActiveTab] = useState<TabKey>("params");

    const [params, setParams] = useState<KeyValuePair[]>(() => {
      const initialParsed = parseParamsFromUrl(defaultUrl);
      return initialParsed.length > 0
        ? initialParsed
        : [{ id: "1", key: "", value: "", enabled: true }];
    });
    const [headers, setHeaders] = useState<KeyValuePair[]>([
      {
        id: "h1",
        key: "Authorization",
        value: "Bearer sk_test_...",
        enabled: true,
      },
      {
        id: "h2",
        key: "Content-Type",
        value: "application/json",
        enabled: true,
      },
    ]);
    const [body, setBody] = useState("{\n  \n}");

    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState<ApiResponse | null>(null);

    // Dynamic 2-Way Binding Sync Handlers
    const syncParamsToUrl = (newParams: KeyValuePair[]) => {
      setParams(newParams);
      setUrl((prevUrl) => buildFullUrl(prevUrl, newParams));
    };

    const handleAddPair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    ) => {
      if (setter === setParams) {
        const next = [
          ...params,
          {
            id: Math.random().toString(36).substring(7),
            key: "",
            value: "",
            enabled: true,
          },
        ];
        syncParamsToUrl(next);
      } else {
        setter((prev) => [
          ...prev,
          {
            id: Math.random().toString(36).substring(7),
            key: "",
            value: "",
            enabled: true,
          },
        ]);
      }
    };

    const handleUpdatePair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
      id: string,
      field: keyof KeyValuePair,
      value: string | boolean,
    ) => {
      if (setter === setParams) {
        const next = params.map((p) =>
          p.id === id ? { ...p, [field]: value } : p,
        );
        syncParamsToUrl(next);
      } else {
        setter((prev) =>
          prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
        );
      }
    };

    const handleRemovePair = (
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
      id: string,
    ) => {
      if (setter === setParams) {
        const next = params.filter((p) => p.id !== id);
        syncParamsToUrl(next);
      } else {
        setter((prev) => prev.filter((p) => p.id !== id));
      }
    };

    const handleUrlChange = (newUrl: string) => {
      setUrl(newUrl);
      const parsed = parseParamsFromUrl(newUrl);
      if (parsed.length > 0) {
        setParams(parsed);
      }
    };

    const handleSend = async () => {
      setIsLoading(true);
      setResponse(null);

      const executeRequest =
        mockHandler ||
        (async (req) => {
          await new Promise((resolve) => setTimeout(resolve, 600));

          let parsedBody: unknown = null;
          if (req.method !== "GET" && req.body) {
            try {
              parsedBody = JSON.parse(req.body);
            } catch {
              parsedBody = req.body;
            }
          }

          const activeHeaders = req.headers
            .filter((h) => h.enabled && h.key)
            .reduce<Record<string, string>>((acc, h) => {
              acc[h.key] = h.value;
              return acc;
            }, {});

          const activeParams = req.params
            .filter((p) => p.enabled && p.key)
            .reduce<Record<string, string>>((acc, p) => {
              acc[p.key] = p.value;
              return acc;
            }, {});

          return {
            status: req.method === "POST" ? 201 : 200,
            timeMs: Math.floor(Math.random() * 150) + 50,
            data: {
              message: "Success",
              echo: {
                method: req.method,
                url: req.url,
                params: Object.keys(activeParams).length > 0 ? activeParams : undefined,
                headers: Object.keys(activeHeaders).length > 0 ? activeHeaders : undefined,
                payload: req.method !== "GET" ? (parsedBody ?? "No body provided") : undefined,
              },
            },
          };
        });

      try {
        const res = await executeRequest({
          method,
          url,
          headers,
          params,
          body,
        });
        setResponse(res);
      } catch (error) {
        setResponse({
          status: 500,
          timeMs: 0,
          data: {
            error:
              error instanceof Error && error.message
                ? error.message
                : "Internal Server Error",
          },
        });
      } finally {
        setIsLoading(false);
      }
    };

    // ── Motion (see DESIGN.md): a sliding tab indicator, and content that blurs in ──
    const tabRefs = useRef<Partial<Record<TabKey, HTMLButtonElement | null>>>({});
    const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const responseRef = useRef<HTMLDivElement>(null);
    const seenRows = useRef(new Set<string>());

    useLayoutEffect(() => {
      const el = tabRefs.current[activeTab];
      if (el && (indicator?.left !== el.offsetLeft || indicator?.width !== el.offsetWidth)) {
        setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
      }
    });

    // A new tab's content cascades in.
    useLayoutEffect(() => {
      cascade(panelRef.current);
      panelRef.current
        ?.querySelectorAll<HTMLElement>("[data-row]")
        .forEach((row) => seenRows.current.add(row.dataset.row as string));
    }, [activeTab]);

    // So does a row that was just added.
    useLayoutEffect(() => {
      panelRef.current?.querySelectorAll<HTMLElement>("[data-row]").forEach((row) => {
        const id = row.dataset.row as string;
        if (!seenRows.current.has(id)) {
          seenRows.current.add(id);
          blurIn(row);
        }
      });
    }, [params, headers]);

    // And so does each response.
    useLayoutEffect(() => {
      if (response) cascade(responseRef.current);
    }, [response]);

    const tabCount = (tab: TabKey) =>
      tab === "params"
        ? params.filter((p) => p.key).length
        : tab === "headers"
          ? headers.filter((p) => p.key).length
          : 0;

    // Render Key-Value Editor (Mobile Optimized)
    const renderKvEditor = (
      items: KeyValuePair[],
      setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>,
    ) => (
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            data-row={item.id}
            className="group flex items-center gap-1.5 sm:gap-2"
          >
            <label className="relative flex shrink-0 cursor-pointer items-center justify-center">
              <input
                type="checkbox"
                checked={item.enabled}
                onChange={(e) =>
                  handleUpdatePair(setter, item.id, "enabled", e.target.checked)
                }
                className="peer sr-only"
                aria-label={`${item.key || "Row"} enabled`}
              />
              <div
                className={cn(
                  "flex size-[18px] items-center justify-center rounded-md transition-[background-color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] active:scale-90 peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-1",
                  item.enabled ? theme.bg : "bg-[#EBEBE9] hover:bg-[#E3E3E1] dark:bg-background dark:hover:bg-background/70",
                )}
              >
                <Check
                  className={cn(
                    "size-3 stroke-[3] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    item.enabled ? "scale-100 opacity-100" : "scale-50 opacity-0",
                  )}
                />
              </div>
            </label>
            <input
              type="text"
              placeholder="Key"
              aria-label="Key"
              value={item.key}
              onChange={(e) =>
                handleUpdatePair(setter, item.id, "key", e.target.value)
              }
              className={cn(FIELD, "w-1/2 min-w-0 px-3 text-xs sm:text-[13px]")}
              disabled={!item.enabled}
            />
            <input
              type="text"
              placeholder="Value"
              aria-label="Value"
              value={item.value}
              onChange={(e) =>
                handleUpdatePair(setter, item.id, "value", e.target.value)
              }
              className={cn(FIELD, "w-1/2 min-w-0 px-3 text-xs sm:text-[13px]")}
              disabled={!item.enabled}
            />
            <button
              onClick={() => handleRemovePair(setter, item.id)}
              aria-label="Remove row"
              className="shrink-0 cursor-pointer rounded-full p-1.5 text-muted-foreground opacity-100 transition-[opacity,background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-red-500/10 hover:text-red-500 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-ring sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Trash2 className="size-4" />
            </button>
          </div>
        ))}
        <button
          onClick={() => handleAddPair(setter)}
          className={cn(
            "mt-1 flex w-max cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-[background-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring",
            WELL_HOVER,
          )}
        >
          <Plus className="size-3.5" /> Add {activeTab === "params" ? "parameter" : "header"}
        </button>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          "grid w-full grid-cols-1 gap-4 bg-transparent lg:grid-cols-2",
          className,
        )}
        style={style}
        {...props}
      >
        {/* LEFT PANE: REQUEST BUILDER */}
        <div className="flex min-w-0 flex-col gap-4">
          {/* ── URL BAR ─────────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex flex-col items-stretch gap-2 rounded-[1.75rem] bg-card p-2 sm:flex-row sm:items-center",
              SURFACE,
            )}
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <SelectBlock
                options={METHOD_OPTIONS}
                value={method}
                onChange={(v) => setMethod(v as HttpMethod)}
                color={methodThemeColors[method]}
                variant="filled"
                inputSize="sm"
                className="w-[104px] shrink-0"
              />

              <input
                type="text"
                value={url}
                onChange={(e) => handleUrlChange(e.target.value)}
                aria-label="Request URL"
                className={cn(FIELD, "h-10 w-full min-w-0 truncate rounded-full px-4 text-xs sm:text-[13px]")}
                placeholder="https://api.example.com..."
              />
            </div>

            <button
              onClick={handleSend}
              disabled={isLoading}
              className={cn(
                "flex h-10 w-full shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-[transform,opacity,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] disabled:opacity-60 sm:w-auto",
                theme.bg,
              )}
            >
              {isLoading ? (
                <Activity className="size-4 animate-pulse motion-reduce:animate-none" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
              {isLoading ? "Sending" : "Send"}
            </button>
          </div>

          {/* ── CONFIG ──────────────────────────────────────────────────── */}
          <div
            className={cn(
              "flex min-h-[250px] min-w-0 flex-1 flex-col rounded-[1.75rem] bg-card p-3",
              SURFACE,
            )}
          >
            <div
              role="tablist"
              className={cn(
                "relative flex w-full items-center [overflow-x:auto] rounded-full p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
                WELL,
              )}
            >
              {indicator && (
                <span
                  aria-hidden
                  className="absolute inset-y-1 rounded-full bg-card shadow-[0_1px_2px_rgba(0,0,0,0.06),0_4px_12px_-6px_rgba(0,0,0,0.18)] transition-[left,width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                  style={{ left: indicator.left, width: indicator.width }}
                />
              )}
              {TABS.map((tab) => {
                const count = tabCount(tab);
                return (
                  <button
                    key={tab}
                    ref={(el) => {
                      tabRefs.current[tab] = el;
                    }}
                    role="tab"
                    aria-selected={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    className={cn(
                      "relative z-10 flex shrink-0 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-2 focus-visible:outline-ring sm:flex-1",
                      activeTab === tab
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {tab}
                    {count > 0 && (
                      <span
                        className={cn(
                          "min-w-4 rounded-full px-1 text-center text-[10px] leading-4 tabular-nums transition-colors duration-500",
                          activeTab === tab ? cn(theme.bg) : "bg-foreground/10 text-muted-foreground",
                        )}
                      >
                        {count}
                      </span>
                    )}
                    {tab === "body" && method !== "GET" && body.trim().length > 2 && (
                      <span className={cn("size-1.5 rounded-full", theme.bg)} aria-label="Has body" />
                    )}
                  </button>
                );
              })}
            </div>

            <div ref={panelRef} role="tabpanel" className="flex-1 overflow-y-auto px-1 pb-1 pt-4">
              {activeTab === "params" && renderKvEditor(params, setParams)}
              {activeTab === "headers" && renderKvEditor(headers, setHeaders)}
              {activeTab === "body" && (
                <div data-blur className="relative flex h-full w-full flex-col">
                  {method === "GET" && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[1.25rem] bg-card/60 p-4 text-center backdrop-blur-sm">
                      <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                        GET requests typically do not have a body.
                      </p>
                    </div>
                  )}
                  <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    aria-label="Request body"
                    className={cn(
                      FIELD,
                      "h-full min-h-[150px] resize-none rounded-[1.25rem] p-4 text-xs leading-relaxed sm:text-[13px]",
                    )}
                    spellCheck={false}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT PANE: RESPONSE VIEWER */}
        <div
          className={cn(
            "flex min-h-[300px] min-w-0 flex-col rounded-[1.75rem] bg-card p-3",
            SURFACE,
          )}
        >
          <div ref={responseRef} className="flex min-h-0 flex-1 flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-3 pt-1">
              <div className="flex items-center gap-2.5">
                <span className={cn("flex size-8 items-center justify-center rounded-full", WELL)}>
                  <TerminalSquare className="size-4 text-muted-foreground" />
                </span>
                <span className="text-sm font-semibold">Response</span>
              </div>

              {response && !isLoading && (
                <div className="flex items-center gap-2 font-mono text-[11px]">
                  <span
                    data-blur
                    className={cn(
                      "flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold",
                      response.status < 400
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400",
                    )}
                  >
                    {response.status < 400 ? (
                      <CheckCircle2 className="size-3 shrink-0" />
                    ) : (
                      <XCircle className="size-3 shrink-0" />
                    )}
                    {response.status}
                  </span>
                  <span
                    data-blur
                    className={cn("flex items-center gap-1.5 rounded-full px-2.5 py-1 text-muted-foreground", WELL)}
                  >
                    <Clock className="size-3 shrink-0" />
                    {response.timeMs}ms
                  </span>
                </div>
              )}
            </div>

            <div className={cn("relative flex-1 overflow-auto rounded-[1.25rem] p-4", WELL)}>
              {isLoading ? (
                <div role="status" aria-live="polite" className="flex h-full flex-col justify-center gap-3">
                  {[72, 48, 88, 36, 60].map((w, i) => (
                    <span
                      key={i}
                      className="h-3 animate-pulse rounded-full bg-foreground/10 blur-[1.5px] motion-reduce:animate-none"
                      style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                  <span className="sr-only">Awaiting response…</span>
                </div>
              ) : response ? (
                <pre data-blur className="font-mono text-xs leading-relaxed text-foreground/70 sm:text-[13px]">
                  <code>{highlightJson(JSON.stringify(response.data, null, 2))}</code>
                </pre>
              ) : (
                <div className="flex h-full select-none flex-col items-center justify-center gap-2 p-4 text-center">
                  <span className="mb-1 flex size-12 items-center justify-center rounded-full bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_20px_-10px_rgba(0,0,0,0.18)]">
                    <TerminalSquare className="size-5 text-muted-foreground" />
                  </span>
                  <p className="text-sm font-medium text-foreground/80">No response yet</p>
                  <p className="text-xs text-muted-foreground">Hit Send to see what comes back.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
);
ApiPlaygroundBlock.displayName = "ApiPlaygroundBlock";
