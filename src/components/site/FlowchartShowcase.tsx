"use client";

import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  AlertCircle,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Terminal,
  Webhook,
} from "lucide-react";
import { useState } from "react";

const FLOW_ENGINE_CODE_TS = `/* Full file content exported inside the preview tab module */`;
const FLOW_ENGINE_CODE_JS = `/* Pure JS file exported inside the preview module */`;

export function FlowchartShowcase() {
  const [color, setColor] = useState<
    "blue" | "indigo" | "rose" | "emerald" | "zinc"
  >("indigo");
  const [key, setKey] = useState(0);

  const generateUsageCode = () => {
    return `import { Flowchart, FlowNode, FlowCanvas, FlowConnection } from "@/components/custom/blocks/FlowchartBlock";
import { Webhook, Cpu, CheckCircle2, AlertCircle, Terminal } from "lucide-react";

export default function PipelineDemo() {
  return (
    <Flowchart initialActivePath="success-path" color="${color}">
      <FlowCanvas>
        {/* Orthogonal right-angle paths mathematically aligned to nodes */}
        <FlowConnection id="success-path" path="M 280 200 L 310 200 L 310 114 L 340 114" />
        <FlowConnection id="success-path" path="M 580 114 L 640 114" />
        
        <FlowConnection id="fail-path" path="M 280 200 L 310 200 L 310 284 L 340 284" />
        <FlowConnection id="fail-path" path="M 580 284 L 640 284" />
      </FlowCanvas>

      <FlowNode 
        id="webhook" 
        title="Webhook Trigger" 
        description="Inbound secure POST" 
        icon={Webhook} 
        connectedPaths={["success-path", "fail-path"]} 
        className="left-[40px] top-[166px]"
      />

      <FlowNode 
        id="transform" 
        title="Transform Payload" 
        description="Normalizing JSON data" 
        icon={Cpu} 
        connectedPaths={["success-path"]} 
        className="left-[340px] top-[80px]"
      />
      <FlowNode 
        id="error" 
        title="Validation Check" 
        description="Checking metadata schema" 
        icon={Terminal} 
        connectedPaths={["fail-path"]} 
        className="left-[340px] top-[250px]"
      />

      <FlowNode 
        id="success" 
        title="Sync Database" 
        description="Committed to cluster" 
        icon={CheckCircle2} 
        connectedPaths={["success-path"]} 
        className="left-[640px] top-[80px]"
      />
      <FlowNode 
        id="fail" 
        title="Dead Letter Queue" 
        description="Retrying delivery pool" 
        icon={AlertCircle} 
        connectedPaths={["fail-path"]} 
        className="left-[640px] top-[250px]"
      />
    </Flowchart>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active Connection Theme
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["indigo", "blue", "rose", "emerald", "zinc"] as const).map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      color === c
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-bold rounded-lg border bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Replay Canvas
          </button>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="FlowchartBlock"
        tsCode={FLOW_ENGINE_CODE_TS}
        jsCode={FLOW_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-white dark:bg-[#09090b] overflow-hidden p-4">
          <Flowchart
            key={key}
            initialActivePath="success-path"
            color={color}
            className="border-0 shadow-none m-0 rounded-none bg-transparent dark:bg-transparent p-0"
          >
            <FlowCanvas>
              {/* Perfectly mathematically routed right-angle paths matching ports */}
              <FlowConnection
                id="success-path"
                path="M 280 200 L 310 200 L 310 114 L 340 114"
              />
              <FlowConnection id="success-path" path="M 580 114 L 640 114" />

              <FlowConnection
                id="fail-path"
                path="M 280 200 L 310 200 L 310 284 L 340 284"
              />
              <FlowConnection id="fail-path" path="M 580 284 L 640 284" />
            </FlowCanvas>

            {/* Column 1 */}
            <FlowNode
              id="webhook"
              title="Webhook Trigger"
              description="Inbound secure POST"
              icon={Webhook}
              connectedPaths={["success-path", "fail-path"]}
              className="left-[40px] top-[166px]"
            />

            {/* Column 2 */}
            <FlowNode
              id="transform"
              title="Transform Payload"
              description="Normalizing JSON data"
              icon={Cpu}
              connectedPaths={["success-path"]}
              className="left-[340px] top-[80px]"
            />
            <FlowNode
              id="error"
              title="Validation Check"
              description="Checking metadata schema"
              icon={Terminal}
              connectedPaths={["fail-path"]}
              className="left-[340px] top-[250px]"
            />

            {/* Column 3 */}
            <FlowNode
              id="success"
              title="Sync Database"
              description="Committed to cluster"
              icon={CheckCircle2}
              connectedPaths={["success-path"]}
              className="left-[640px] top-[80px]"
            />
            <FlowNode
              id="fail"
              title="Dead Letter Queue"
              description="Retrying delivery pool"
              icon={AlertCircle}
              connectedPaths={["fail-path"]}
              className="left-[640px] top-[250px]"
            />
          </Flowchart>
        </div>
      </ComponentPreview>
    </div>
  );
}
