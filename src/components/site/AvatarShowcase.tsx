"use client";

import { Avatar } from "@/components/custom/blocks/Avatar";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const AVATAR_ENGINE_CODE_TS = `"use client";

import { AvatarFallback, AvatarImage, Avatar as ShadCNAvatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type AvatarData = { src: string; fallback: string; };

export type AvatarProps = {
  avatars?: AvatarData[];
  active?: boolean;
  status?: "active" | "inactive";
  size?: "sm" | "default" | "lg";
  className?: string;
  avatarClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

export const Avatar = ({
  avatars = [], active = false, status, size = "default", className, avatarClassName, imageClassName, fallbackClassName,
}: AvatarProps) => {
  if (!avatars.length) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return { avatar: "w-8 h-8", fallback: "text-xs", indicator: "w-2.5 h-2.5 bottom-0 right-0" };
      case "lg": return { avatar: "w-16 h-16", fallback: "text-lg", indicator: "w-4 h-4 bottom-0.5 right-0.5" };
      default: return { avatar: "w-10 h-10", fallback: "text-sm", indicator: "w-3 h-3 bottom-0 right-0" };
    }
  };

  const sizeClasses = getSizeClasses();

  const getStatusColor = () => {
    if (!active) return "";
    switch (status) {
      case "active": return "bg-emerald-500";
      case "inactive": return "bg-rose-500";
      default: return "bg-zinc-400 dark:bg-zinc-600";
    }
  };

  const StatusIndicator = () => {
    if (!active) return null;
    return <div className={cn("absolute rounded-full border-2 border-white dark:border-[#09090b] z-10", sizeClasses.indicator, getStatusColor())} />;
  };

  if (avatars.length === 1) {
    const avatar = avatars[0];
    return (
      <div className={cn("relative inline-flex items-center justify-center shrink-0", className)}>
        <ShadCNAvatar className={cn(sizeClasses.avatar, avatarClassName)}>
          <AvatarImage src={avatar.src} className={cn("object-cover w-full h-full aspect-square", imageClassName)} alt={avatar.fallback} />
          <AvatarFallback className={cn(sizeClasses.fallback, fallbackClassName)}>{avatar.fallback}</AvatarFallback>
        </ShadCNAvatar>
        <StatusIndicator />
      </div>
    );
  }

  return (
    <div className={cn("relative flex -space-x-3 sm:-space-x-2 shrink-0", className)}>
      {avatars.map((avatar, index) => (
        <div key={index} className="relative z-0 hover:z-10 transition-transform hover:scale-105 duration-200">
          <ShadCNAvatar className={cn("border-2 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800", sizeClasses.avatar, avatarClassName)}>
            <AvatarImage src={avatar.src} className={cn("object-cover w-full h-full aspect-square", imageClassName)} alt={avatar.fallback} />
            <AvatarFallback className={cn(sizeClasses.fallback, fallbackClassName)}>{avatar.fallback}</AvatarFallback>
          </ShadCNAvatar>
        </div>
      ))}
    </div>
  );
};`;

// --- JAVASCRIPT ENGINE CODE ---
const AVATAR_ENGINE_CODE_JS = `"use client";

import { AvatarFallback, AvatarImage, Avatar as ShadCNAvatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const Avatar = ({
  avatars = [], active = false, status, size = "default", className, avatarClassName, imageClassName, fallbackClassName,
}) => {
  if (!avatars.length) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm": return { avatar: "w-8 h-8", fallback: "text-xs", indicator: "w-2.5 h-2.5 bottom-0 right-0" };
      case "lg": return { avatar: "w-16 h-16", fallback: "text-lg", indicator: "w-4 h-4 bottom-0.5 right-0.5" };
      default: return { avatar: "w-10 h-10", fallback: "text-sm", indicator: "w-3 h-3 bottom-0 right-0" };
    }
  };

  const sizeClasses = getSizeClasses();

  const getStatusColor = () => {
    if (!active) return "";
    switch (status) {
      case "active": return "bg-emerald-500";
      case "inactive": return "bg-rose-500";
      default: return "bg-zinc-400 dark:bg-zinc-600";
    }
  };

  const StatusIndicator = () => {
    if (!active) return null;
    return <div className={cn("absolute rounded-full border-2 border-white dark:border-[#09090b] z-10", sizeClasses.indicator, getStatusColor())} />;
  };

  if (avatars.length === 1) {
    const avatar = avatars[0];
    return (
      <div className={cn("relative inline-flex items-center justify-center shrink-0", className)}>
        <ShadCNAvatar className={cn(sizeClasses.avatar, avatarClassName)}>
          <AvatarImage src={avatar.src} className={cn("object-cover w-full h-full aspect-square", imageClassName)} alt={avatar.fallback} />
          <AvatarFallback className={cn(sizeClasses.fallback, fallbackClassName)}>{avatar.fallback}</AvatarFallback>
        </ShadCNAvatar>
        <StatusIndicator />
      </div>
    );
  }

  return (
    <div className={cn("relative flex -space-x-3 sm:-space-x-2 shrink-0", className)}>
      {avatars.map((avatar, index) => (
        <div key={index} className="relative z-0 hover:z-10 transition-transform hover:scale-105 duration-200">
          <ShadCNAvatar className={cn("border-2 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800", sizeClasses.avatar, avatarClassName)}>
            <AvatarImage src={avatar.src} className={cn("object-cover w-full h-full aspect-square", imageClassName)} alt={avatar.fallback} />
            <AvatarFallback className={cn(sizeClasses.fallback, fallbackClassName)}>{avatar.fallback}</AvatarFallback>
          </ShadCNAvatar>
        </div>
      ))}
    </div>
  );
};`;

type AvatarType = "single" | "group";
type AvatarSize = "sm" | "default" | "lg";
type AvatarStatus = "none" | "default" | "active" | "inactive";

export function AvatarShowcase() {
  const [type, setType] = useState<AvatarType>("single");
  const [size, setSize] = useState<AvatarSize>("default");
  const [status, setStatus] = useState<AvatarStatus>("none");

  const singleData = [{ src: "https://github.com/shadcn.png", fallback: "CN" }];
  const groupData = [
    { src: "https://github.com/shadcn.png", fallback: "CN" },
    { src: "https://github.com/vercel.png", fallback: "VC" },
    { src: "https://github.com/nextjs.png", fallback: "NX" },
  ];

  // --- THE DYNAMIC USAGE SNIPPET (Usage Tab) ---
  const generateUsageCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";
    const sizeProp = size !== "default" ? `\n      size="${size}"` : "";
    const activeProp = status !== "none" ? `\n      active={true}` : "";
    const statusProp =
      status === "active" || status === "inactive"
        ? `\n      status="${status}"`
        : "";

    const dataString =
      type === "single"
        ? `  const user = [\n    { src: "https://github.com/shadcn.png", fallback: "CN" }\n  ];`
        : `  const team = [\n    { src: "https://github.com/shadcn.png", fallback: "CN" },\n    { src: "https://github.com/vercel.png", fallback: "VC" },\n    { src: "https://github.com/nextjs.png", fallback: "NX" }\n  ];`;

    return `import { Avatar } from "@/components/custom/blocks/Avatar";

export default function AvatarDemo()${typeDef} {
${dataString}

  return (
    <Avatar 
      avatars={${type === "single" ? "user" : "team"}}${sizeProp}${activeProp}${statusProp}
    />
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col lg:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
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

        {/* Status Selector */}
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

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Avatar"
        tsCode={AVATAR_ENGINE_CODE_TS}
        jsCode={AVATAR_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center p-12 min-h-[200px]">
          <Avatar
            key={`${type}-${size}-${status}`}
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
