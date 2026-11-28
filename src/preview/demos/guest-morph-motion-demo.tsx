"use client";

import { GuestMorph } from "@/components/custom/blocks/motion/GuestMorphBlock";
import { GUESTS } from "./guest-morph-examples/default";

/** The Motion build of the same example. */
export default function GuestMorphMotionDemo({ resetKey = 0 }: { resetKey?: number }) {
  return (
    <div className="mx-auto flex w-full justify-center p-8 md:min-h-[520px] md:items-start md:pt-16">
      <GuestMorph
        key={resetKey}
        title="Launch party"
        guests={GUESTS}
        onInvite={(email) => console.log("Invited", email)}
      />
    </div>
  );
}
