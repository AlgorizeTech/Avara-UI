"use client";
import React from "react";
import { ComponentCard } from "../ui/base";

export function TeamMembersBlock() {
  return (
    <ComponentCard className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 dark:border-zinc-800 dark:bg-zinc-950/30">
      <div className="flex -space-x-3 mb-4">
        <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-200 dark:bg-zinc-800"></div>
        <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-300 dark:bg-zinc-700"></div>
        <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-400 dark:bg-zinc-600"></div>
      </div>
      <h3 className="font-semibold text-sm mb-1">No Team Members</h3>
      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 max-w-[200px]">Invite your team to collaborate on this project.</p>
      <button className="cursor-pointer h-8 px-4 inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95">
        + Invite Members
      </button>
    </ComponentCard>
  );
}

export function CommandSearchBlock() {
  return (
    <ComponentCard>
      <div className="p-2 cursor-text">
        <div className="flex items-center px-3 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-md group focus-within:ring-2 ring-zinc-400 dark:ring-zinc-600 transition-shadow">
          <svg className="size-4 text-zinc-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 cursor-text" placeholder="Search components..." />
          <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500">ESC</kbd>
        </div>
        <div className="mt-2 px-2 py-4">
          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">Suggestions</p>
          <div className="space-y-1">
            {["Calendar", "Face Recognition", "Billing Settings"].map((item) => (
              <div key={item} className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors active:bg-zinc-200 dark:active:bg-zinc-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}