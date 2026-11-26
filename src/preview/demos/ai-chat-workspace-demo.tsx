"use client";

import AIChatWorkspace, {
  type WorkspaceColor,
  type WorkspaceEffortLevel,
  type WorkspacePlan,
} from "@/components/custom/blocks/AiChatWorkspace";

const sampleChatHistory = [
  { id: 1, title: "Rewrite onboarding emails in a warmer tone", date: "Today" },
  { id: 2, title: "Plan a two-week launch checklist", date: "Today" },
  { id: 3, title: "Compare three pricing page layouts", date: "Today" },
  { id: 4, title: "Explain OAuth to a new teammate", date: "Yesterday" },
  { id: 5, title: "Draft release notes for v2.4", date: "Yesterday" },
  { id: 6, title: "Summarize last quarter's support tickets", date: "Yesterday" },
  { id: 7, title: "Outline a talk on design systems", date: "Yesterday" },
  { id: 8, title: "Name ideas for a budgeting app", date: "Last week" },
  { id: 9, title: "Review a SQL migration for risks", date: "Last week" },
  { id: 10, title: "Cover letter for a product design role", date: "Last week" },
];

export default function AIChatWorkspaceDemo({
  color = "primary",
  defaultEffort = "medium",
  defaultPlan = "free",
}: {
  color?: WorkspaceColor;
  defaultEffort?: WorkspaceEffortLevel;
  defaultPlan?: WorkspacePlan;
}) {
  return (
    <div className="w-full">
      <AIChatWorkspace
        key={`${color}-${defaultEffort}-${defaultPlan}`}
        color={color}
        defaultEffort={defaultEffort}
        defaultPlan={defaultPlan}
        // Start below the paid tiers so picking Pro or Ultra plays its flourish.
        defaultModelId="core"
        chatHistory={sampleChatHistory}
        user={{
          name: "Maya Chen",
          email: "maya.chen@example.com",
          avatarUrl:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces",
        }}
      />
    </div>
  );
}
