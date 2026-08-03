"use client";

import { Avatar } from "@/components/custom/blocks/Avatar";

type AvatarType = "single" | "group";
type AvatarSize = "sm" | "default" | "lg";
type AvatarStatus = "none" | "default" | "active" | "inactive";

const singleData = [{ src: "https://github.com/shadcn.png", fallback: "CN" }];
const groupData = [
  { src: "https://github.com/shadcn.png", fallback: "CN" },
  { src: "https://github.com/vercel.png", fallback: "VC" },
  { src: "https://github.com/nextjs.png", fallback: "NX" },
];

export default function AvatarDemo({
  type = "single",
  size = "default",
  status = "none",
}: {
  type?: AvatarType;
  size?: AvatarSize;
  status?: AvatarStatus;
}) {
  return (
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
  );
}
