"use client";

import {
  AddToCart,
  AsyncButton,
  FollowButton,
  HoldToConfirm,
  InteractiveButton,
  SplitButton,
  StarButton,
  WaitlistButton,
} from "@/components/custom/blocks/ActionButtons";

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * The Action Button catalog card's scene: nine buttons in three even rows so the
 * card reads as a set, not as one button floating in a lot of space. Card-only
 * (the docs page has its own examples); lives with the catalog, not the registry.
 */
export default function ActionButtonsScene() {
  return (
    <div className="flex w-full flex-col items-center gap-5 px-6">
      <div className="flex items-center justify-center gap-4">
        <AsyncButton action={() => wait(1200)}>Save changes</AsyncButton>
        <HoldToConfirm action={() => wait(900)} resetAfter={2000} />
        <FollowButton name="Lena Ortiz" />
      </div>
      <div className="flex items-center justify-center gap-4">
        <SplitButton onAction={() => wait(1100)} />
        <AddToCart price="$48.00" max={9} />
        <InteractiveButton action={() => wait(1000)}>Download</InteractiveButton>
      </div>
      <div className="flex items-center justify-center gap-4">
        <StarButton count={1299} />
        <StarButton icon="upvote" count={128} />
        <WaitlistButton action={async () => ({ position: 42 })} />
      </div>
    </div>
  );
}
