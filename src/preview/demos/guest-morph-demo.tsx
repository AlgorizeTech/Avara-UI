"use client";

import LaunchParty from "./guest-morph-examples/default";

/** The docs example is ./guest-morph-examples/default, and its Usage tab is that same file. */
export default function GuestMorphDemo({ resetKey = 0 }: { resetKey?: number }) {
  return (
    <div className="mx-auto flex w-full justify-center p-8 md:min-h-[520px] md:items-start md:pt-16">
      <LaunchParty key={resetKey} />
    </div>
  );
}
