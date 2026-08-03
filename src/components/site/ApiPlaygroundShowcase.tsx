"use client";

import {
  ApiColor,
  ApiPlaygroundBlock,
  HttpMethod,
} from "@/components/custom/blocks/ApiPlaygroundBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { VariantTabs } from "@/components/site/VariantTabs";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const API_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Plus, Trash2, TerminalSquare, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

export type ApiColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const colorThemes: Record<string, Record<string, string>> = {
  primary: { bg: "bg-primary text-primary-foreground", text: "text-primary", border: "border-primary", glow: "shadow-[0_0_15px_var(--primary)]" },
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500", glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
};

const methodColors: Record<HttpMethod, string> = {
  GET: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10",
  POST: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10",
  PUT: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10",
  PATCH: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10",
  DELETE: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--api-color)] text-white", text: "text-[var(--api-color)]", border: "border-[var(--api-color)]", glow: "shadow-[0_0_15px_var(--api-glow)]" },
      style: { "--api-color": color, "--api-glow": \`rgba(\${rgb}, 0.3)\` } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export interface KeyValuePair { id: string; key: string; value: string; enabled: boolean; }
export interface ApiResponse { status: number; timeMs: number; data: any; }

export interface ApiPlaygroundProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultUrl?: string; defaultMethod?: HttpMethod; color?: ApiColor; mockHandler?: (req: { method: HttpMethod; url: string; headers: KeyValuePair[]; params: KeyValuePair[]; body: string }) => Promise<ApiResponse>;
}

export const ApiPlaygroundBlock = forwardRef<HTMLDivElement, ApiPlaygroundProps>(({ defaultUrl = "https://api.example.com/v1", defaultMethod = "GET", color = "emerald", mockHandler, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const [method, setMethod] = useState<HttpMethod>(defaultMethod);
  const [url, setUrl] = useState(defaultUrl);
  const [activeTab, setActiveTab] = useState<"params" | "headers" | "body">("params");
  const [params, setParams] = useState<KeyValuePair[]>([{ id: "1", key: "", value: "", enabled: true }]);
  const [headers, setHeaders] = useState<KeyValuePair[]>([{ id: "h1", key: "Authorization", value: "Bearer sk_test_...", enabled: true }, { id: "h2", key: "Content-Type", value: "application/json", enabled: true }]);
  const [body, setBody] = useState("{\\n  \\n}");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleAddPair = (setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>) => setter((prev) => [...prev, { id: Math.random().toString(36).substring(7), key: "", value: "", enabled: true }]);
  const handleUpdatePair = (setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>, id: string, field: keyof KeyValuePair, value: string | boolean) => setter((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const handleRemovePair = (setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>, id: string) => setter((prev) => prev.filter((p) => p.id !== id));

  const handleSend = async () => {
    setIsLoading(true); setResponse(null);
    const executeRequest = mockHandler || (async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { status: 200, timeMs: Math.floor(Math.random() * 200) + 50, data: { message: "Success", echo: { method, url } } };
    });
    try {
      const res = await executeRequest({ method, url, headers, params, body });
      setResponse(res);
    } catch (error: any) { setResponse({ status: 500, timeMs: 0, data: { error: error.message } }); } 
    finally { setIsLoading(false); }
  };

  const renderKvEditor = (items: KeyValuePair[], setter: React.Dispatch<React.SetStateAction<KeyValuePair[]>>) => (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-1.5 sm:gap-2 group">
          <input type="checkbox" checked={item.enabled} onChange={(e) => handleUpdatePair(setter, item.id, "enabled", e.target.checked)} className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 shrink-0 cursor-pointer" />
          <input type="text" placeholder="Key" value={item.key} onChange={(e) => handleUpdatePair(setter, item.id, "key", e.target.value)} className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors" disabled={!item.enabled} />
          <input type="text" placeholder="Value" value={item.value} onChange={(e) => handleUpdatePair(setter, item.id, "value", e.target.value)} className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors" disabled={!item.enabled} />
          <button onClick={() => handleRemovePair(setter, item.id)} className="p-1.5 text-zinc-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={() => handleAddPair(setter)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 w-max mt-2 transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add {activeTab === "params" ? "Parameter" : "Header"}</button>
    </div>
  );

  return (
    <div ref={ref} className={cn("w-full grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-2xl p-3 sm:p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 shadow-xl", className)} style={style} {...props}>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 sm:p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <select value={method} onChange={(e) => setMethod(e.target.value as HttpMethod)} className={cn("h-9 px-2 sm:px-3 text-xs font-bold rounded-lg outline-none appearance-none cursor-pointer border-none shrink-0", methodColors[method])}>
              {(["GET", "POST", "PUT", "PATCH", "DELETE"] as HttpMethod[]).map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full min-w-0 bg-transparent px-2 text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300 outline-none truncate" placeholder="https://api..." />
          </div>
          <button onClick={handleSend} disabled={isLoading} className={cn("flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-bold transition-all disabled:opacity-50 shrink-0 w-full sm:w-auto cursor-pointer", theme.bg, !isLoading && theme.glow)}>
            {isLoading ? <Activity className="w-4 h-4 animate-pulse" /> : <><Play className="w-4 h-4 fill-current" />Send</>}
          </button>
        </div>
        <div className="flex flex-col flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden min-h-[250px] min-w-0">
          <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 px-2 pt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["params", "headers", "body"] as const).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-3 sm:px-4 py-2 text-xs font-bold capitalize transition-all border-b-2 whitespace-nowrap shrink-0 cursor-pointer", activeTab === tab ? cn("border-[var(--api-color)]", theme.text) : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300")}>
                {tab}{tab === "params" && params.filter(p => p.key).length > 0 && \` (\${params.filter(p => p.key).length})\`}{tab === "headers" && headers.filter(p => p.key).length > 0 && \` (\${headers.filter(p => p.key).length})\`}
              </button>
            ))}
          </div>
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
            {activeTab === "params" && renderKvEditor(params, setParams)}
            {activeTab === "headers" && renderKvEditor(headers, setHeaders)}
            {activeTab === "body" && (
              <div className="w-full h-full flex flex-col relative group">
                {method === "GET" && (<div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg p-4 text-center"><p className="text-xs sm:text-sm font-medium text-zinc-500">GET requests typically do not have a body.</p></div>)}
                <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-full min-h-[150px] p-3 text-xs sm:text-sm font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:border-zinc-400 dark:focus:border-zinc-600 resize-none transition-colors" spellCheck={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#0d1117] rounded-xl overflow-hidden border border-zinc-800 min-h-[300px] min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2"><TerminalSquare className="w-4 h-4 text-zinc-500 shrink-0" /><span className="text-xs font-semibold text-zinc-400">Response</span></div>
          {response && (
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono">
              <div className={cn("flex items-center gap-1 sm:gap-1.5", response.status < 400 ? "text-emerald-400" : "text-red-400")}>{response.status < 400 ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <XCircle className="w-3 h-3 shrink-0" />}Status: {response.status}</div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-400 border-l border-zinc-700 pl-3 sm:pl-4"><Clock className="w-3 h-3 shrink-0" />{response.timeMs}ms</div>
            </div>
          )}
        </div>
        <div className="relative flex-1 p-3 sm:p-4 overflow-y-auto overflow-x-auto">
          {isLoading ? (<div className="absolute inset-0 flex flex-col items-center justify-center gap-3"><Activity className={cn("w-6 h-6 animate-pulse", theme.text)} /><span className="text-xs font-mono text-zinc-500 animate-pulse">Awaiting response...</span></div>) : response ? (<pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-300"><code>{JSON.stringify(response.data, null, 2)}</code></pre>) : (<div className="h-full flex flex-col items-center justify-center gap-2 opacity-30 select-none text-center p-4"><TerminalSquare className="w-10 sm:w-12 h-10 sm:h-12 text-zinc-500 mb-2" /><p className="text-xs sm:text-sm font-medium text-zinc-400">Hit Send to get a response</p></div>)}
        </div>
      </div>
    </div>
  );
});
ApiPlaygroundBlock.displayName = "ApiPlaygroundBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const API_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Play, Plus, Trash2, TerminalSquare, Activity, CheckCircle2, XCircle, Clock } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 text-white", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-500", glow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]" },
  rose: { bg: "bg-rose-600 text-white", text: "text-rose-600 dark:text-rose-400", border: "border-rose-500", glow: "shadow-[0_0_15px_rgba(225,29,72,0.3)]" },
  emerald: { bg: "bg-emerald-600 text-white", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]" },
  zinc: { bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]" },
};

const methodColors = {
  GET: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10",
  POST: "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10",
  PUT: "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-500/10",
  PATCH: "text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-500/10",
  DELETE: "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10",
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--api-color)] text-white", text: "text-[var(--api-color)]", border: "border-[var(--api-color)]", glow: "shadow-[0_0_15px_var(--api-glow)]" },
      style: { "--api-color": color, "--api-glow": \`rgba(\${rgb}, 0.3)\` },
    };
  }
  return { theme: colorThemes[color] || colorThemes.zinc, style: {} };
};

export const ApiPlaygroundBlock = forwardRef(({ defaultUrl = "https://api.example.com/v1", defaultMethod = "GET", color = "emerald", mockHandler, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const [method, setMethod] = useState(defaultMethod);
  const [url, setUrl] = useState(defaultUrl);
  const [activeTab, setActiveTab] = useState("params");
  const [params, setParams] = useState([{ id: "1", key: "", value: "", enabled: true }]);
  const [headers, setHeaders] = useState([{ id: "h1", key: "Authorization", value: "Bearer sk_test_...", enabled: true }, { id: "h2", key: "Content-Type", value: "application/json", enabled: true }]);
  const [body, setBody] = useState("{\\n  \\n}");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleAddPair = (setter) => setter((prev) => [...prev, { id: Math.random().toString(36).substring(7), key: "", value: "", enabled: true }]);
  const handleUpdatePair = (setter, id, field, value) => setter((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  const handleRemovePair = (setter, id) => setter((prev) => prev.filter((p) => p.id !== id));

  const handleSend = async () => {
    setIsLoading(true); setResponse(null);
    const executeRequest = mockHandler || (async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { status: 200, timeMs: Math.floor(Math.random() * 200) + 50, data: { message: "Success", echo: { method, url } } };
    });
    try {
      const res = await executeRequest({ method, url, headers, params, body });
      setResponse(res);
    } catch (error) { setResponse({ status: 500, timeMs: 0, data: { error: error.message } }); } 
    finally { setIsLoading(false); }
  };

  const renderKvEditor = (items, setter) => (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-1.5 sm:gap-2 group">
          <input type="checkbox" checked={item.enabled} onChange={(e) => handleUpdatePair(setter, item.id, "enabled", e.target.checked)} className="w-4 h-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 shrink-0 cursor-pointer" />
          <input type="text" placeholder="Key" value={item.key} onChange={(e) => handleUpdatePair(setter, item.id, "key", e.target.value)} className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors" disabled={!item.enabled} />
          <input type="text" placeholder="Value" value={item.value} onChange={(e) => handleUpdatePair(setter, item.id, "value", e.target.value)} className="w-1/2 min-w-0 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md outline-none focus:border-zinc-400 dark:focus:border-zinc-600 font-mono transition-colors" disabled={!item.enabled} />
          <button onClick={() => handleRemovePair(setter, item.id)} className="p-1.5 text-zinc-400 hover:text-red-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all rounded-md hover:bg-red-50 dark:hover:bg-red-500/10 shrink-0 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
        </div>
      ))}
      <button onClick={() => handleAddPair(setter)} className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 w-max mt-2 transition-colors cursor-pointer"><Plus className="w-3.5 h-3.5" /> Add {activeTab === "params" ? "Parameter" : "Header"}</button>
    </div>
  );

  return (
    <div ref={ref} className={cn("w-full grid grid-cols-1 lg:grid-cols-2 gap-4 rounded-2xl p-3 sm:p-4 bg-zinc-50 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 shadow-none", className)} style={style} {...props}>
      <div className="flex flex-col gap-4 min-w-0">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-1.5 sm:p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <select value={method} onChange={(e) => setMethod(e.target.value)} className={cn("h-9 px-2 sm:px-3 text-xs font-bold rounded-lg outline-none appearance-none cursor-pointer border-none shrink-0", methodColors[method])}>
              {(["GET", "POST", "PUT", "PATCH", "DELETE"]).map((m) => (<option key={m} value={m}>{m}</option>))}
            </select>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full min-w-0 bg-transparent px-2 text-xs sm:text-sm font-mono text-zinc-700 dark:text-zinc-300 outline-none truncate" placeholder="https://api..." />
          </div>
          <button onClick={handleSend} disabled={isLoading} className={cn("flex items-center justify-center gap-2 h-9 px-4 rounded-lg text-sm font-bold transition-all disabled:opacity-50 shrink-0 w-full sm:w-auto cursor-pointer", theme.bg, !isLoading && theme.glow)}>
            {isLoading ? <Activity className="w-4 h-4 animate-pulse" /> : <><Play className="w-4 h-4 fill-current" />Send</>}
          </button>
        </div>
        <div className="flex flex-col flex-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden min-h-[250px] min-w-0">
          <div className="flex items-center border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/50 px-2 pt-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {(["params", "headers", "body"]).map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={cn("px-3 sm:px-4 py-2 text-xs font-bold capitalize transition-all border-b-2 whitespace-nowrap shrink-0 cursor-pointer", activeTab === tab ? cn("border-[var(--api-color)]", theme.text) : "border-transparent text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300")}>
                {tab}{tab === "params" && params.filter(p => p.key).length > 0 && \` (\${params.filter(p => p.key).length})\`}{tab === "headers" && headers.filter(p => p.key).length > 0 && \` (\${headers.filter(p => p.key).length})\`}
              </button>
            ))}
          </div>
          <div className="p-3 sm:p-4 flex-1 overflow-y-auto">
            {activeTab === "params" && renderKvEditor(params, setParams)}
            {activeTab === "headers" && renderKvEditor(headers, setHeaders)}
            {activeTab === "body" && (
              <div className="w-full h-full flex flex-col relative group">
                {method === "GET" && (<div className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-lg p-4 text-center"><p className="text-xs sm:text-sm font-medium text-zinc-500">GET requests typically do not have a body.</p></div>)}
                <textarea value={body} onChange={(e) => setBody(e.target.value)} className="w-full h-full min-h-[150px] p-3 text-xs sm:text-sm font-mono bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg outline-none focus:border-zinc-400 dark:focus:border-zinc-600 resize-none transition-colors" spellCheck={false} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-[#0d1117] rounded-xl overflow-hidden border border-zinc-800 min-h-[300px] min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 bg-white/5 border-b border-white/5">
          <div className="flex items-center gap-2"><TerminalSquare className="w-4 h-4 text-zinc-500 shrink-0" /><span className="text-xs font-semibold text-zinc-400">Response</span></div>
          {response && (
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] font-mono">
              <div className={cn("flex items-center gap-1 sm:gap-1.5", response.status < 400 ? "text-emerald-400" : "text-red-400")}>{response.status < 400 ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <XCircle className="w-3 h-3 shrink-0" />}Status: {response.status}</div>
              <div className="flex items-center gap-1 sm:gap-1.5 text-zinc-400 border-l border-zinc-700 pl-3 sm:pl-4"><Clock className="w-3 h-3 shrink-0" />{response.timeMs}ms</div>
            </div>
          )}
        </div>
        <div className="relative flex-1 p-3 sm:p-4 overflow-y-auto overflow-x-auto">
          {isLoading ? (<div className="absolute inset-0 flex flex-col items-center justify-center gap-3"><Activity className={cn("w-6 h-6 animate-pulse", theme.text)} /><span className="text-xs font-mono text-zinc-500 animate-pulse">Awaiting response...</span></div>) : response ? (<pre className="text-xs sm:text-[13px] font-mono leading-relaxed text-zinc-300"><code>{JSON.stringify(response.data, null, 2)}</code></pre>) : (<div className="h-full flex flex-col items-center justify-center gap-2 opacity-30 select-none text-center p-4"><TerminalSquare className="w-10 sm:w-12 h-10 sm:h-12 text-zinc-500 mb-2" /><p className="text-xs sm:text-sm font-medium text-zinc-400">Hit Send to get a response</p></div>)}
        </div>
      </div>
    </div>
  );
});
ApiPlaygroundBlock.displayName = "ApiPlaygroundBlock";`;

export function ApiPlaygroundShowcase() {
  const [defaultMethod, setDefaultMethod] = useState<HttpMethod>("POST");
  const [simulateError, setSimulateError] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<ApiColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  // Advanced Mock Handler to simulate real API interactions for documentation
  const handleCustomMock = async (req: {
    method: string;
    url: string;
    headers: any[];
    params: any[];
    body: string;
  }) => {
    await new Promise((resolve) => setTimeout(resolve, 600)); // Network delay

    if (simulateError) {
      return {
        status: 401,
        timeMs: 45,
        data: {
          error: "unauthorized",
          message: "Invalid API key provided in Authorization header.",
        },
      };
    }

    // Try parsing body for POST/PUT requests
    let parsedBody = null;
    if (req.method !== "GET" && req.body) {
      try {
        parsedBody = JSON.parse(req.body);
      } catch (e) {
        return {
          status: 400,
          timeMs: 12,
          data: {
            error: "bad_request",
            message: "Invalid JSON in request body.",
          },
        };
      }
    }

    return {
      status: req.method === "POST" ? 201 : 200,
      timeMs: 142,
      data: {
        success: true,
        resource: req.url.split("/").pop() || "unknown",
        received_headers: req.headers.filter((h: any) => h.enabled).length,
        payload: parsedBody || "No body provided",
      },
    };
  };

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n      color="${color}"` : "";
    const propsStr = `\n      defaultUrl="https://api.stripe.com/v1/customers"\n      defaultMethod="${defaultMethod}"${colorPropStr}`;

    return `import { ApiPlaygroundBlock } from "@/components/custom/blocks/ApiPlaygroundBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

export default function DocumentationPage() {
  
  // Optional: Define exactly how the playground should respond
  const mockApiDocs = async (req) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (req.method === "POST") {
      return { status: 201, timeMs: 120, data: { id: "cus_123", created: true } };
    }
    return { status: 200, timeMs: 80, data: { list: [], has_more: false } };
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <ApiPlaygroundBlock ${propsStr}
        mockHandler={mockApiDocs}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-4 sm:p-5 rounded-xl z-0 relative">
        <div className="flex flex-col lg:flex-row flex-wrap gap-6 items-start lg:items-center justify-between w-full">
          {/* Method Selector */}
          <VariantTabs
            variants={["GET", "POST", "DELETE"]}
            label="Default Method"
            defaultValue={defaultMethod}
            onValueChange={(v) => setDefaultMethod(v as HttpMethod)}
          />

          {/* Color */}
          <ThemeColorPicker
            color={color}
            onChange={handleColorChange}
            label="Accent Color"
          />

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Mock Configuration
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setSimulateError(!simulateError)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all cursor-pointer ${
                  simulateError
                    ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Force 401 Error
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ApiPlaygroundBlock"
        tsCode={API_ENGINE_CODE_TS}
        jsCode={API_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="api-playground"
        sandboxProps={{ defaultMethod, color, simulateError }}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-white dark:bg-[#050505] py-[12px] px-0 min-w-0 overflow-hidden">
          <ApiPlaygroundBlock
            key={`${defaultMethod}-${color}-${simulateError}`} // Force remount on config changes
            defaultUrl="https://api.acme.com/v1/customers"
            defaultMethod={defaultMethod}
            color={color}
            mockHandler={handleCustomMock}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
