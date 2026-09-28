"use client";

import { UserGraph } from "@/components/custom/blocks/UserGraphBlock";

const COMPACT_ORCHESTRATOR = {
  name: "Alice Rahman",
  role: "Personal Assistant Orchestrator",
  avatarUrl:
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_300,c_limit/v1790150478/photo-1544005313-94ddf0286df2-1790150482273.jpg",
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
