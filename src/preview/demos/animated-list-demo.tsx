"use client";

import UpcomingPayments from "./animated-list-examples/default";

/**
 * The docs example is ./animated-list-examples/default, and its Usage tab is
 * that same file. resetKey remounts it, so the reload button replays the
 * entrance and brings back paid rows. The wrapper keeps a fixed desktop height so
 * filtering never resizes the preview frame.
 */
export default function AnimatedListDemo({ resetKey = 0 }: { resetKey?: number }) {
  return (
    <div className="mx-auto flex w-full items-center justify-center p-4 md:min-h-[600px] md:p-8">
      <UpcomingPayments key={resetKey} />
    </div>
  );
}
