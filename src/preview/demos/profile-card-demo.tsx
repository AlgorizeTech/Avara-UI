"use client";

import {
  AccountMenu,
  type AccountMenuProps,
} from "@/components/custom/blocks/AccountMenuBlock";
import {
  ProfileCard,
  type ProfileCardProps,
} from "@/components/custom/blocks/ProfileCardBlock";

export default function ProfileCardDemo({
  variant = "aurora",
  verified = true,
  active = true,
  showModal = true,
  showStorage = false,
  ...props
}: ProfileCardProps & Pick<AccountMenuProps, "showModal" | "showStorage">) {
  if (variant === "account-menu") {
    return (
      <div className="w-full min-h-[560px] p-4 sm:p-8 flex items-center justify-center">
        <AccountMenu showModal={showModal} showStorage={showStorage} />
      </div>
    );
  }

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
