"use client";

import { Avatar } from "@/components/custom/blocks/Avatar";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

type AvatarType = "single" | "group";
type AvatarSize = "sm" | "default" | "lg";
type AvatarStatus = "none" | "default" | "active" | "inactive";

export function AvatarShowcase() {
  const [type, setType] = useState<AvatarType>("single");
  const [size, setSize] = useState<AvatarSize>("default");
  const [status, setStatus] = useState<AvatarStatus>("none");

  // Sample data arrays
  const singleData = [{ src: "https://github.com/shadcn.png", fallback: "CN" }];
  const groupData = [
    { src: "https://github.com/shadcn.png", fallback: "CN" },
    { src: "https://github.com/vercel.png", fallback: "VC" },
    { src: "https://github.com/nextjs.png", fallback: "NX" },
    { src: "", fallback: "JD" },
    { src: "https://github.com/react.png", fallback: "RC" },
  ];

  // Dynamic code generation based on selected state
  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    // Construct the props string dynamically
    const sizeProp = size !== "default" ? ` size="${size}"` : "";
    const activeProp = status !== "none" ? ` active={true}` : "";
    const statusProp =
      status === "active" || status === "inactive" ? ` status="${status}"` : "";

    const propsString = `${sizeProp}${activeProp}${statusProp}`;

    if (type === "single") {
      return `"use client";

import { Avatar } from "@/components/custom/blocks/Avatar";

export default function AvatarDemo()${typeDef} {
  const user = [
    { src: "https://github.com/shadcn.png", fallback: "CN" }
  ];

  return (
    <div className="flex items-center justify-center p-8">
      <Avatar 
       avatars={type === "single" ? singleData : groupData}
        size={size}
        active={status !== "none"}
        status={
          status === "active" || status === "inactive" ? status undefined
        }
      />
    </div>
  );
}`;
    }

    return `"use client";

import { Avatar } from "@/components/custom/blocks/Avatar";

export default function AvatarGroupDemo()${typeDef} {
  const team = [
    { src: "https://github.com/shadcn.png", fallback: "CN" },
    { src: "https://github.com/vercel.png", fallback: "VC" },
    { src: "https://github.com/nextjs.png", fallback: "NX" },
    { src: "", fallback: "JD" },
    { src: "https://github.com/react.png", fallback: "RC" }
  ];

  return (
    <div className="flex items-center justify-center p-8">
      <Avatar 
        avatars={type === "single" ? singleData : groupData}
        size={size}
        active={status !== "none"}
        status={
          status === "active" || status === "inactive" ? status undefined
        }
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col md:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        {/* Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Type
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {[
              { id: "single", label: "Single Avatar" },
              { id: "group", label: "Avatar Group" },
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setType(v.id as AvatarType)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  type === v.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Size
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["sm", "default", "lg"] as AvatarSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  size === s
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Status Selector (Only show for single avatars or if you want it on groups too) */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Status Indicator
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {[
              { id: "none", label: "None" },
              { id: "default", label: "Default" },
              { id: "active", label: "Active" },
              { id: "inactive", label: "Inactive" },
            ].map((st) => (
              <button
                key={st.id}
                onClick={() => setStatus(st.id as AvatarStatus)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  status === st.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="Avatar"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div className="w-full flex items-center justify-center p-12">
          <Avatar
            avatars={type === "single" ? singleData : groupData}
            size={size}
            active={status !== "none"}
            status={
              status === "active" || status === "inactive" ? status : undefined
            }
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
