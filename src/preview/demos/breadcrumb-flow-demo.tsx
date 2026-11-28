"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/custom/blocks/BreadcrumbFlowBlock";
import {
  ChevronRightIcon as ChevronRight,
  FileTextIcon as FileText,
  FolderIcon as Folder,
  HomeIcon as Home,
} from "@/components/custom/ui/animated-icons";
import { useState } from "react";

type Page = { label: string; children?: string[] };

// A small site, by page id. Opening a page adds it to the trail.
const site: Record<string, Page> = {
  home: { label: "Home", children: ["projects", "team", "settings"] },
  projects: { label: "Projects", children: ["nexus", "atlas", "orbit"] },
  team: { label: "Team", children: ["members", "roles"] },
  settings: { label: "Settings", children: ["profile", "billing", "security"] },
  nexus: { label: "Nexus UI Kit", children: ["components", "tokens", "changelog"] },
  atlas: { label: "Atlas Dashboard" },
  orbit: { label: "Orbit Mobile" },
  members: { label: "Members" },
  roles: { label: "Roles" },
  profile: { label: "Profile" },
  billing: { label: "Billing" },
  security: { label: "Security" },
  components: { label: "Components", children: ["navigation", "forms", "data-display"] },
  tokens: { label: "Design Tokens" },
  changelog: { label: "Changelog" },
  navigation: { label: "Navigation", children: ["breadcrumb", "tabs", "sidebar"] },
  forms: { label: "Forms" },
  "data-display": { label: "Data Display" },
  breadcrumb: { label: "Breadcrumb.tsx" },
  tabs: { label: "Tabs.tsx" },
  sidebar: { label: "Sidebar.tsx" },
};

// Give every item its page id as a stable key: items fade in and out as the
// path changes, and past `maxItems` the middle collapses behind the ellipsis.
export default function BreadcrumbFlowExample() {
  const [path, setPath] = useState(["home", "projects", "nexus"]);
  const current = site[path[path.length - 1]];
  const next = current.children ?? [];

  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Breadcrumb>
        <BreadcrumbList maxItems={4}>
          {path.map((id, index) => (
            <BreadcrumbItem key={id}>
              {index > 0 && <BreadcrumbSeparator />}
              {index === path.length - 1 ? (
                <BreadcrumbPage>{site[id].label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    setPath(path.slice(0, index + 1));
                  }}
                >
                  {index === 0 && <Home aria-hidden />}
                  {site[id].label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="mb-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          {next.length > 0 ? `Inside ${current.label}` : `${current.label} is a page`}
        </p>
        {next.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-3">
            {next.map((id) => {
              const child = site[id];
              const Icon = child.children ? Folder : FileText;
              return (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => setPath([...path, id])}
                    className="group flex w-full items-center gap-2.5 rounded-lg border border-border bg-background px-3 py-2.5 text-left text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  >
                    <Icon aria-hidden className="size-4 shrink-0 text-muted-foreground" />
                    <span className="min-w-0 flex-1 truncate">{child.label}</span>
                    <ChevronRight
                      aria-hidden
                      className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <button
            type="button"
            onClick={() => setPath(["home"])}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Home aria-hidden className="size-4" /> Back to Home
          </button>
        )}
      </div>
    </div>
  );
}
