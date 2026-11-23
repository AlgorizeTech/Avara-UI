"use client";

import {
  ProfileCard,
  type ProfileCardProps,
} from "@/components/custom/blocks/ProfileCardBlock";

export default function ProfileCardDemo({
  variant = "aurora",
  verified = true,
  active = true,
  ...props
}: ProfileCardProps) {
  return (
    <div className="w-full min-h-[600px] p-4 sm:p-8 flex items-center justify-center">
      <ProfileCard
        variant={variant}
        verified={verified}
        active={active}
        {...props}
      />
    </div>
  );
}
