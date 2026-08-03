"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";

export default function ResizableDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] p-6 sm:p-12 relative z-10">
      {/* Simulated Application UI */}
      <div className="w-full h-[400px] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-950 flex flex-col">
        {/* Fake Header */}
        <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 px-4 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-medium text-zinc-500 ml-4">
            Nexus Studio
          </span>
        </div>

        {/* Resizable Layout Engine */}
        <div className="flex-1 overflow-hidden">
          <ResizablePanelGroup direction="horizontal">
            {/* 1. Sidebar Panel */}
            <ResizablePanel
              defaultSize={20}
              minSize={15}
              maxSize={40}
              className="bg-zinc-50 dark:bg-zinc-900/30"
            >
              <div className="p-4 flex flex-col h-full">
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                  Explorer
                </div>
                <div className="space-y-2 flex-1">
                  <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                  <div className="w-5/6 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* 2. Main Area Panel */}
            <ResizablePanel defaultSize={80}>
              {/* Nested Vertical Group */}
              <ResizablePanelGroup direction="vertical">
                {/* 2A. Editor Panel */}
                <ResizablePanel defaultSize={75} minSize={30}>
                  <div className="p-4 flex flex-col h-full bg-white dark:bg-zinc-950">
                    <div className="text-xs font-bold text-zinc-500 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                      page.tsx
                    </div>
                    <div className="space-y-3 font-mono text-xs opacity-50 flex-1">
                      <div className="text-indigo-500">
                        export default function Page() {"{"}
                      </div>
                      <div className="pl-4">return (</div>
                      <div className="pl-8 text-emerald-500">
                        &lt;div className=&quot;flex&quot;&gt;
                      </div>
                      <div className="pl-12">
                        {"{/* Drag the handles to resize */}"}
                      </div>
                      <div className="pl-8 text-emerald-500">
                        &lt;/div&gt;
                      </div>
                      <div className="pl-4">);</div>
                      <div className="text-indigo-500">{"}"}</div>
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* 2B. Terminal Panel */}
                <ResizablePanel defaultSize={25} minSize={15}>
                  <div className="p-4 flex flex-col h-full bg-zinc-900 dark:bg-black text-white">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                      Terminal
                    </div>
                    <div className="font-mono text-xs text-zinc-300">
                      <span className="text-emerald-400">
                        nexus@admin:~$
                      </span>{" "}
                      npm run dev
                      <br />
                      <span className="text-zinc-500">Ready in 1250ms</span>
                    </div>
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
