"use client";

import {
  ScrollStack,
  StackItem,
} from "@/components/custom/blocks/ScrollStackBlock";
import { Blocks, Layers, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ScrollStackDemo({
  depthScale = 0.05,
  cardGap = 24,
  color = "primary",
}: {
  depthScale?: number;
  cardGap?: number;
  color?: string;
}) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Re-render once after mount so viewportRef.current is passed to GSAP.
  useEffect(() => {
    setMounted(true);
  }, []);

  const mockItems: StackItem[] = [
    {
      id: "1",
      title: "Real-time Synchronization",
      description:
        "Instantly sync state across clients without writing WebSocket logic. Our engine handles race conditions seamlessly.",
      icon: Zap,
      content: (
        <div className="w-full h-full flex flex-col justify-between p-6 bg-muted text-foreground rounded-2xl border border-border shadow-sm relative overflow-hidden group">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted-foreground ml-2">sync-stream.ts</span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-color,var(--primary))]/15 text-[var(--theme-color,var(--primary))] font-semibold border border-[var(--theme-color,var(--primary))]/30">
              CONNECTED
            </span>
          </div>

          <div className="my-4 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>&gt; Latency benchmark:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">12ms (Ultra Fast)</span>
            </div>
            <div className="w-full bg-foreground/10 rounded-full h-2 overflow-hidden">
              <div className="bg-[var(--theme-color,var(--primary))] h-full w-[88%] rounded-full animate-pulse" />
            </div>
            <div className="p-3 rounded-xl bg-card border border-border text-[11px] text-foreground/80 flex items-center justify-between shadow-xs">
              <span>Payload: &#123; user_id: 894, status: &quot;active&quot; &#125;</span>
              <span className="text-foreground/40">240B</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--theme-color,var(--primary))] animate-ping" />
              <span>Streaming 1.4k ops/sec</span>
            </div>
            <span className="text-[11px] font-semibold text-foreground/70">v2.4.0</span>
          </div>
        </div>
      ),
    },
    {
      id: "2",
      title: "Layered Architecture",
      description:
        "Build robust systems with separated concerns. Easily swap out databases or auth providers without rewriting your core.",
      icon: Layers,
      content: (
        <div className="w-full h-full flex flex-col justify-center gap-3 p-6 bg-muted rounded-2xl border border-border text-foreground relative overflow-hidden">
          <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-center text-[var(--theme-color,var(--primary))] font-semibold text-xs">
                API
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Presentation Layer</div>
                <div className="text-[10px] text-muted-foreground">GraphQL & REST Endpoints</div>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold">200 OK</span>
          </div>

          <div className="p-4 rounded-xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold flex items-center justify-center text-xs shadow-md">
                CORE
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Business Logic Service</div>
                <div className="text-[10px] text-[var(--theme-color,var(--primary))] font-medium">Decoupled Domain Engine</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[var(--theme-color,var(--primary))] animate-pulse" />
          </div>

          <div className="p-3.5 rounded-xl bg-card border border-border flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold text-xs">
                DB
              </div>
              <div>
                <div className="text-xs font-semibold text-foreground">Persistence & Cache</div>
                <div className="text-[10px] text-muted-foreground">PostgreSQL + Redis Cluster</div>
              </div>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">0.4ms</span>
          </div>
        </div>
      ),
    },
    {
      id: "3",
      title: "Composable UI Blocks",
      description:
        "Don't reinvent the wheel. Utilize our library of pre-built, accessible UI blocks designed to drop into any codebase.",
      icon: Blocks,
      content: (
        <div className="w-full h-full p-6 bg-muted rounded-2xl border border-border text-foreground flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-foreground/80 tracking-wide uppercase">Component Gallery</span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-card border border-border text-[var(--theme-color,var(--primary))] font-semibold">42 Blocks</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-card border border-border flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-md bg-[var(--theme-color,var(--primary))]/10 flex items-center justify-center text-[var(--theme-color,var(--primary))] text-[10px] font-semibold">
                  Card
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
              </div>
              <div className="w-3/4 h-2 bg-foreground/15 rounded-full" />
              <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
            </div>

            <div className="p-3 rounded-xl bg-card border border-border flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="w-6 h-6 rounded-md bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 text-[10px] font-semibold">
                  Nav
                </div>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">Ready</span>
              </div>
              <div className="w-3/4 h-2 bg-foreground/15 rounded-full" />
              <div className="w-1/2 h-2 bg-foreground/10 rounded-full" />
            </div>

            <div className="col-span-2 p-3.5 rounded-xl bg-[var(--theme-color,var(--primary))]/10 border border-[var(--theme-color,var(--primary))]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold flex items-center justify-center text-xs shadow-md">
                  ✨
                </div>
                <div>
                  <div className="text-xs font-semibold text-foreground">Scroll Stack</div>
                  <div className="text-[10px] text-[var(--theme-color,var(--primary))]">Interactive GSAP Widget</div>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-[var(--theme-color,var(--primary))] text-primary-foreground font-semibold text-[10px] shadow-xs">
                Insert
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-muted-foreground border-t border-border pt-2.5">
            <span>Accessible (WCAG 2.1)</span>
            <span className="text-[var(--theme-color,var(--primary))] font-semibold">100% Tailwind</span>
          </div>
        </div>
      ),
    },
    {
      id: "4",
      title: "Enterprise Security",
      description:
        "Bank-grade encryption, automated compliance tracking, and granular role-based access control built in out of the box.",
      icon: ShieldCheck,
      content: (
        <div className="w-full h-full p-6 bg-muted rounded-2xl border border-border text-foreground flex flex-col justify-between items-center text-center">
          <div className="w-full flex items-center justify-between border-b border-border pb-3">
            <span className="text-xs font-mono text-muted-foreground">SECURITY_CHECK // PASSED</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-semibold">
              AES-256
            </span>
          </div>

          <div className="my-3 flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--theme-color,var(--primary))]/10 border-2 border-[var(--theme-color,var(--primary))]/30 flex items-center justify-center shadow-lg relative">
              <ShieldCheck className="w-10 h-10 text-[var(--theme-color,var(--primary))]" />
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-muted" />
            </div>
            <h4 className="text-sm font-semibold mt-3 text-foreground">SOC2 & ISO-27001 Certified</h4>
            <p className="text-[11px] text-muted-foreground mt-1 max-w-[220px]">Zero trust architecture with continuous runtime vulnerability scanning.</p>
          </div>

          <div className="w-full p-2.5 rounded-xl bg-card border border-border flex items-center justify-between text-xs font-mono shadow-xs">
            <span className="text-muted-foreground">Encryption Status</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">ACTIVE</span>
          </div>
        </div>
      ),
    },
  ];

  const getThemeColorHex = (c: string) => {
    if (c.startsWith("#")) return c;
    const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: "#6366f1", rose: "#f43f5e", emerald: "#10b981", lavender: "#9b8afb" };
    return map[c] || "var(--primary)";
  };

  return (
    <div
      className="w-full rounded-2xl border border-border bg-muted/50 relative overflow-hidden transition-colors"
      style={{ "--theme-color": getThemeColorHex(color) } as React.CSSProperties}
    >
      {/* Scroll Instruction Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-background/90 backdrop-blur-md text-foreground text-[11px] font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-border pointer-events-none shadow-lg">
        ↓ Scroll inside preview box to trigger stack ↓
      </div>

      {/* Viewport Scroller Ref passed to GSAP ScrollTrigger */}
      <div
        ref={viewportRef}
        className="w-full h-[750px] overflow-y-auto overflow-x-hidden custom-scrollbar relative px-4 sm:px-8"
      >
        <div className="h-[25vh] flex items-center justify-center flex-col gap-3">
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/30 to-transparent" />
        </div>

        <ScrollStack
          items={mockItems}
          depthScale={depthScale}
          cardGap={cardGap}
          scroller={mounted ? viewportRef.current : null}
        />
      </div>
    </div>
  );
}
