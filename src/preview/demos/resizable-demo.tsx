"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

function Pane({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div
      className={`h-full w-full flex items-center justify-center text-[10px] sm:text-xs font-bold uppercase tracking-wider text-center p-2 ${
        muted ? "bg-muted/40 text-muted-foreground" : "text-foreground"
      }`}
    >
      {label}
    </div>
  );
}

export default function ResizableDemo({
  example,
}: {
  /** Isolates one composition instead of the full IDE layout. */
  example?: "ide" | "horizontal" | "vertical" | "no-grip" | "constraints";
}) {
  if (example && example !== "ide") {
    const withHandle = example !== "no-grip";
    const direction = example === "vertical" ? "vertical" : "horizontal";

    return (
      <div className="w-full flex items-center justify-center min-h-[320px] sm:min-h-[380px] p-2 xs:p-4 sm:p-10 relative z-10">
        <div className="w-full h-[280px] sm:h-[320px] border border-border rounded-xl overflow-hidden bg-background">
          <ResizablePanelGroup direction={direction}>
            {example === "constraints" ? (
              <>
                <ResizablePanel defaultSize={25} minSize={15} maxSize={40}>
                  <Pane label="min 15% · max 40%" muted />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                  <Pane label="fills the rest" />
                </ResizablePanel>
              </>
            ) : (
              <>
                <ResizablePanel defaultSize={40}>
                  <Pane label="Panel one" muted />
                </ResizablePanel>
                <ResizableHandle withHandle={withHandle} />
                <ResizablePanel defaultSize={60}>
                  <Pane label="Panel two" />
                </ResizablePanel>
              </>
            )}
          </ResizablePanelGroup>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[380px] sm:min-h-[500px] transition-colors duration-300 rounded-2xl relative z-10">
      {/* Simulated Application UI */}
      <div className="w-full h-[400px] sm:h-[460px] border border-border rounded-xl overflow-hidden shadow-xs bg-background flex flex-col">
        {/* Fake Header */}
        <div className="h-9 sm:h-10 border-b border-border/80 bg-muted/50 px-3 sm:px-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-foreground ml-2">
              Nexus Studio
            </span>
          </div>
          <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
            Resizable Layout
          </span>
        </div>

        {/* Resizable Layout Engine: Responsive Direction (Vertical/Row Stack for Small Screens) */}
        <div className="flex-1 overflow-hidden">
          {/* Responsive Panel Group: Vertical stacked on Mobile, Horizontal on Desktop */}
          <div className="block md:hidden h-full">
            <ResizablePanelGroup direction="vertical">
              {/* 1. Sidebar Panel (Mobile) */}
              <ResizablePanel defaultSize={25} minSize={15} className="bg-muted/30">
                <div className="p-2.5 flex flex-col h-full">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">
                    Explorer
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="w-full h-2.5 bg-muted rounded" />
                    <div className="w-3/4 h-2.5 bg-muted rounded" />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* 2. Main Editor Panel (Mobile) */}
              <ResizablePanel defaultSize={75}>
                <div className="p-3 flex flex-col h-full bg-background font-mono text-[11px] overflow-y-auto">
                  <div className="text-foreground font-bold mb-2 border-b border-border/50 pb-1 flex items-center justify-between shrink-0">
                    <span>page.tsx</span>
                    <span className="text-[10px] text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">Active</span>
                  </div>
                  {/* Mobile Code Editor View */}
                  <div className="space-y-1 font-mono text-[11px] flex-1">
                    <div>
                      <span className="text-[#d73a49] dark:text-[#f97583] font-semibold">export default function</span>{" "}
                      <span className="text-[#6f42c1] dark:text-[#b392f0] font-bold">Page</span>() {"{"}
                    </div>
                    <div className="pl-2 font-semibold text-[#d73a49] dark:text-[#f97583]">return (</div>
                    <div className="pl-4">
                      <span className="text-[#22863a] dark:text-[#85e89d]">&lt;div</span>{" "}
                      <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                      <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;flex h-full w-full flex-col p-4&quot;</span>
                      <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                    </div>
                    <div className="pl-6">
                      <span className="text-[#22863a] dark:text-[#85e89d]">&lt;h2</span>{" "}
                      <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                      <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;text-xl font-bold&quot;</span>
                      <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                      <span className="text-foreground font-bold">John Doe</span>
                      <span className="text-[#22863a] dark:text-[#85e89d]">&lt;/h2&gt;</span>
                    </div>
                    <div className="pl-6 text-[#6a737d] dark:text-[#6a737d] italic text-[10px]">
                      {"{/* Drag handle bars to resize panels live */}"}
                    </div>
                    <div className="pl-4 text-[#22863a] dark:text-[#85e89d]">&lt;/div&gt;</div>
                    <div className="pl-2 font-semibold text-[#d73a49] dark:text-[#f97583]">);</div>
                    <div>{"}"}</div>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>

          {/* Desktop & Tablet Multi-Pane View */}
          <div className="hidden md:block h-full">
            <ResizablePanelGroup direction="horizontal">
              {/* 1. Sidebar Panel */}
              <ResizablePanel
                defaultSize={22}
                minSize={15}
                maxSize={40}
                className="bg-muted/30"
              >
                <div className="p-4 flex flex-col h-full">
                  <div className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4">
                    Explorer
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="w-full h-4 bg-muted rounded" />
                    <div className="w-3/4 h-4 bg-muted rounded" />
                    <div className="w-5/6 h-4 bg-muted rounded" />
                  </div>
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* 2. Main Area Panel */}
              <ResizablePanel defaultSize={78}>
                {/* Nested Vertical Group */}
                <ResizablePanelGroup direction="vertical">
                  {/* 2A. Editor Panel */}
                  <ResizablePanel defaultSize={70} minSize={30}>
                    <div className="p-4 flex flex-col h-full bg-background overflow-y-auto">
                      <div className="text-xs font-bold text-foreground mb-4 border-b border-border/60 pb-2 flex items-center justify-between shrink-0">
                        <span>page.tsx</span>
                        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">Active</span>
                      </div>
                      <div className="space-y-2 font-mono text-xs flex-1">
                        <div>
                          <span className="text-[#d73a49] dark:text-[#f97583] font-semibold">export default function</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0] font-bold">Page</span>() {"{"}
                        </div>
                        <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">return (</div>
                        <div className="pl-8">
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;div</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;flex h-full w-full flex-col p-4&quot;</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                        </div>
                        <div className="pl-12">
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;h2</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;text-2xl font-bold&quot;</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                          <span className="text-foreground font-bold">John Doe</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;/h2&gt;</span>
                        </div>
                        <div className="pl-12 text-[#6a737d] dark:text-[#6a737d] italic">
                          {"{/* Drag handle bars to resize panels live */}"}
                        </div>
                        <div className="pl-8 text-[#22863a] dark:text-[#85e89d]">&lt;/div&gt;</div>
                        <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">);</div>
                        <div>{"}"}</div>
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  {/* 2B. Terminal Panel */}
                  <ResizablePanel defaultSize={30} minSize={15}>
                    <div className="p-4 flex flex-col h-full bg-zinc-950 text-white border-t border-border/40">
                      <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center justify-between">
                        <span>Terminal</span>
                        <span className="text-[9px] text-muted-foreground">bash</span>
                      </div>
                      <div className="font-mono text-xs text-zinc-300">
                        <span className="text-emerald-400 font-bold">
                          project@app:~$
                        </span>{" "}
                        npm run dev
                        <br />
                        <span className="text-primary font-semibold">✓ Ready in 850ms</span>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
