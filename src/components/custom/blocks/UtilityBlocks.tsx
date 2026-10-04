"use client";
import { ComponentCard } from "../ui/base";

export function TeamMembersBlock() {
  return (
    <ComponentCard className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2">
      <div className="flex -space-x-3 mb-4">
        <div className="size-10 rounded-full border-2 border-card bg-muted"></div>
        <div className="size-10 rounded-full border-2 border-card bg-muted"></div>
        <div className="size-10 rounded-full border-2 border-card bg-muted-foreground/40"></div>
      </div>
      <h3 className="font-semibold text-sm mb-1">No Team Members</h3>
      <p className="text-xs text-muted-foreground mb-4 max-w-[200px]">Invite your team to collaborate on this project.</p>
      <button className="cursor-pointer h-8 px-4 inline-flex items-center justify-center rounded-md border border-border bg-background text-xs font-medium shadow-sm hover:bg-muted transition-colors active:scale-95">
        + Invite Members
      </button>
    </ComponentCard>
  );
}

export function CommandSearchBlock() {
  return (
    <ComponentCard>
      <div className="p-2 cursor-text">
        <div className="flex items-center px-3 py-2 bg-muted rounded-md group focus-within:ring-2 ring-ring transition-shadow">
          <svg className="size-4 text-muted-foreground mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground cursor-text" placeholder="Search components..." />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-card px-1.5 font-mono text-[10px] font-medium text-muted-foreground">ESC</kbd>
        </div>
        <div className="mt-2 px-2 py-4">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">Suggestions</p>
          <div className="space-y-1">
            {["Calendar", "Face Recognition", "Billing Settings"].map((item) => (
              <div key={item} className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-muted cursor-pointer transition-colors active:bg-muted">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}