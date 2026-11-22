"use client";

import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import {
  AlertCircle,
  Bot,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Terminal,
  Webhook,
} from "lucide-react";

export default function FlowchartDemo({
  color: pickedColor = "primary",
  replayKey = 0,
  initialActivePath = "success-path",
  example,
}: {
  color?: "primary" | "blue" | "indigo" | "rose" | "emerald" | "zinc" | "lavender";
  replayKey?: number;
  /** null leaves every route idle until a node is clicked. */
  initialActivePath?: string | null;
  /** "linear" renders the minimal three-node pipeline. "convergence" renders the curved AI agent pipeline. */
  example?: "branching" | "linear" | "convergence";
}) {
  // The flowchart has no lavender palette of its own. Its "primary" palette
  // follows --primary, which the sandbox points at the picked swatch.
  const color = pickedColor === "lavender" ? "primary" : pickedColor;

  if (example === "convergence") {
    const activeRoute =
      initialActivePath === null
        ? null
        : initialActivePath === "success-path"
          ? "agent-exec-path"
          : initialActivePath;

    return (
      <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-background overflow-hidden p-1 sm:p-4">
        <Flowchart
          key={`${replayKey}-${color}-${activeRoute}`}
          initialActivePath={activeRoute}
          color={color}
          className="border-0 shadow-none m-0 rounded-none bg-transparent p-0 w-full"
        >
          <FlowCanvas>
            {/* Curved input routes converging into the orchestrator */}
            <FlowConnection
              id="agent-exec-path"
              path="M 270 110 C 305 110, 295 200, 330 200"
            />
            <FlowConnection
              id="agent-eval-path"
              path="M 270 290 C 305 290, 295 200, 330 200"
            />

            {/* Curved output routes diverging to execution & artifacts */}
            <FlowConnection
              id="agent-exec-path"
              path="M 570 200 C 605 200, 595 110, 630 110"
            />
            <FlowConnection
              id="agent-eval-path"
              path="M 570 200 C 605 200, 595 290, 630 290"
            />
          </FlowCanvas>

          {/* Input Layer */}
          <FlowNode
            id="prompt-agent"
            title="Autonomous Agent"
            description="Goal decomposition & reasoning"
            icon={Bot}
            connectedPaths={["agent-exec-path"]}
            className="left-[30px] top-[76px]"
          />
          <FlowNode
            id="vector-memory"
            title="Vector Memory"
            description="Hybrid semantic search"
            icon={Database}
            connectedPaths={["agent-eval-path"]}
            className="left-[30px] top-[256px]"
          />

          {/* Central Orchestrator */}
          <FlowNode
            id="orchestrator"
            title="Runtime Coordinator"
            description="Dynamic tool selection loop"
            icon={Cpu}
            connectedPaths={["agent-exec-path", "agent-eval-path"]}
            className="left-[330px] top-[166px]"
          />

          {/* Execution & Output Layer */}
          <FlowNode
            id="code-sandbox"
            title="Code Sandbox"
            description="Isolated micro-container"
            icon={Terminal}
            connectedPaths={["agent-exec-path"]}
            className="left-[630px] top-[76px]"
          />
          <FlowNode
            id="artifacts"
            title="Artifact Stream"
            description="Verified real-time components"
            icon={Layers}
            connectedPaths={["agent-eval-path"]}
            className="left-[630px] top-[256px]"
          />
        </Flowchart>
      </div>
    );
  }
  if (example === "linear") {
    return (
      <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-background overflow-hidden p-1 sm:p-4">
        <Flowchart
          key={`${replayKey}-${color}-linear`}
          initialActivePath={initialActivePath === null ? null : "main-route"}
          color={color}
          className="border-0 shadow-none m-0 rounded-none bg-transparent p-0 w-full"
        >
          <FlowCanvas>
            <FlowConnection id="main-route" path="M 280 200 L 340 200" />
            <FlowConnection id="main-route" path="M 580 200 L 640 200" />
          </FlowCanvas>

          <FlowNode
            id="trigger"
            title="Webhook Trigger"
            description="Inbound secure POST"
            icon={Webhook}
            connectedPaths={["main-route"]}
            className="left-[40px] top-[166px]"
          />
          <FlowNode
            id="compute"
            title="Compute Cluster"
            description="Normalizing JSON data"
            icon={Cpu}
            connectedPaths={["main-route"]}
            className="left-[340px] top-[166px]"
          />
          <FlowNode
            id="commit"
            title="Sync Database"
            description="Committed to cluster"
            icon={CheckCircle2}
            connectedPaths={["main-route"]}
            className="left-[640px] top-[166px]"
          />
        </Flowchart>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-background overflow-hidden p-1 sm:p-4">
      <Flowchart
        key={`${replayKey}-${color}-${initialActivePath}`}
        initialActivePath={initialActivePath}
        color={color}
        className="border-0 shadow-none m-0 rounded-none bg-transparent p-0 w-full"
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
  );
}
