"use client";

import Balance from "./animated-number-examples/default";

/**
 * The docs example is ./animated-number-examples/default, and its Usage tab is
 * that same file. resetKey remounts it, so the reload button replays the count.
 */
export default function AnimatedNumberDemo({ resetKey = 0 }: { resetKey?: number }) {
  return (
    <div className="mx-auto flex w-full justify-center p-8 md:min-h-[320px] md:items-center">
      <Balance key={resetKey} />
    </div>
  );
}
