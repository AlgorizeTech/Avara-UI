"use client";

import {
  FlowCanvas,
  Flowchart,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import {
  AlertCircle,
  CheckCircle2,
  Cpu,
  Terminal,
  Webhook,
} from "lucide-react";

export default function FlowchartDemo({
  color = "indigo",
  replayKey = 0,
}: {
  color?: "blue" | "indigo" | "rose" | "emerald" | "zinc";
  replayKey?: number;
}) {
  return (
    <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-white dark:bg-[#09090b] overflow-hidden p-4">
      <Flowchart
        key={replayKey}
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
  );
}
