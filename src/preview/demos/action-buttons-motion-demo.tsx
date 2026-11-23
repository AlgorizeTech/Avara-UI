"use client";

import {
  AddToCart,
  AsyncButton,
  FollowButton,
  HoldToConfirm,
  InteractiveButton,
  PaymentButton,
  SlideToConfirm,
  SplitButton,
  StarButton,
  WaitlistButton,
} from "@/components/custom/blocks/motion/ActionButtons";
import { getButtonThemeStyle } from "@/components/custom/blocks/button-theme";

export default function ActionButtonsDemo({
  color = "primary",
}: {
  color?: string;
}) {
  const themeStyle = getButtonThemeStyle(color);

  return (
    <div
      className="w-full min-h-[460px] h-full flex flex-col items-center justify-center p-4 sm:p-8 m-0"
      style={themeStyle}
    >
      <div className="flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto py-6 w-full">
        <div className="flex flex-wrap items-center justify-center gap-5">
          <AsyncButton action={() => new Promise((r) => setTimeout(r, 1200))}>
            Save changes
          </AsyncButton>

          <HoldToConfirm
            action={() => new Promise((r) => setTimeout(r, 900))}
            resetAfter={2000}
          />

          <StarButton count={1299} />

          <StarButton icon="upvote" count={128} />

          <FollowButton name="Lena Ortiz" />

          <SplitButton onAction={() => new Promise((r) => setTimeout(r, 1100))} />

          <AddToCart price="$48.00" max={9} />

          <InteractiveButton
            action={async (progress) => {
              for (let p = 0; p <= 100; p += 10) {
                progress(p / 100);
                await new Promise((r) => setTimeout(r, 160));
              }
            }}
          >
            Download
          </InteractiveButton>
        </div>

        <div className="flex flex-wrap items-start justify-center gap-6 w-full">
          <SlideToConfirm
            action={() => new Promise((r) => setTimeout(r, 1200))}
            resetAfter={2000}
          />

          <PaymentButton
            amount="$49.00"
            action={() => new Promise((r) => setTimeout(r, 1200))}
            resetAfter={2200}
          />

          <WaitlistButton
            action={async () => {
              await new Promise((r) => setTimeout(r, 1000));
              return { position: 42 };
            }}
          />
        </div>
      </div>
    </div>
  );
}
