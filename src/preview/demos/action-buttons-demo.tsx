"use client";

import {
  AddToCart,
  AsyncButton,
  HoldToConfirm,
  InteractiveButton,
  PaymentButton,
  SlideToConfirm,
  SplitButton,
  StarButton,
  WaitlistButton,
} from "@/components/custom/blocks/ActionButtons";
import { getButtonThemeStyle } from "@/components/custom/blocks/button-theme";

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

const groups = {
  "slide-to-deploy": () => (
    <SlideToConfirm action={() => wait(1200)} resetAfter={2000} />
  ),
  "star-upvote": () => (
    <>
      <StarButton count={1299} />
      <StarButton icon="upvote" count={128} />
    </>
  ),
  "download-delete": () => (
    <>
      <InteractiveButton
        action={async (progress) => {
          for (let p = 0; p <= 100; p += 10) {
            progress(p / 100);
            await wait(160);
          }
        }}
      >
        Download
      </InteractiveButton>
      <HoldToConfirm action={() => wait(900)} resetAfter={2000} />
    </>
  ),
  "join-waitlist": () => (
    <WaitlistButton
      action={async () => {
        await wait(1000);
        return { position: 42 };
      }}
    />
  ),
  "deploy-cart": () => (
    <>
      <SplitButton onAction={() => wait(1100)} />
      <AddToCart price="$48.00" max={9} />
    </>
  ),
  "save-pay": () => (
    <>
      <AsyncButton action={() => wait(1200)}>Save changes</AsyncButton>
      <PaymentButton amount="$49.00" action={() => wait(1200)} resetAfter={2200} />
    </>
  ),
};

export type ActionButtonsGroup = keyof typeof groups;

export default function ActionButtonsDemo({
  color = "primary",
  group = "slide-to-deploy",
}: {
  color?: string;
  group?: ActionButtonsGroup;
}) {
  const Group = groups[group] ?? groups["slide-to-deploy"];
  // The deploy menu opens below the button, so the stage is taller and the
  // buttons sit near the top, leaving room for the menu inside the frame.
  const stage =
    group === "deploy-cart"
      ? "min-h-[300px] items-start pt-10 sm:pt-10"
      : "min-h-[260px] items-center";

  return (
    <div
      className={`w-full h-full flex justify-center p-4 sm:p-8 m-0 ${stage}`}
      style={getButtonThemeStyle(color)}
    >
      <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Group />
      </div>
    </div>
  );
}
