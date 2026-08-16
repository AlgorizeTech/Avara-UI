"use client";

import { UserGraph } from "@/components/custom/blocks/UserGraphBlock";

const COMPACT_ORCHESTRATOR = {
  name: "Alice Rahman",
  role: "Personal Assistant Orchestrator",
  avatarUrl:
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
};

export default function UserGraphDemo({
  color = "primary",
  defaultSelectedTool = "phone",
  orchestrator,
}: {
  color?: string;
  defaultSelectedTool?: string;
  /** "custom" swaps in a different orchestrator; omit for the block's default. */
  orchestrator?: "default" | "custom";
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <UserGraph
        color={color}
        defaultSelectedTool={defaultSelectedTool}
        orchestrator={
          orchestrator === "custom" ? COMPACT_ORCHESTRATOR : undefined
        }
      />
    </div>
  );
}
