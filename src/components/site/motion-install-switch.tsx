"use client";

import React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMotionLibrary } from "@/contexts/motion-library-context";
import { MotionLibraryTabs } from "@/components/site/motion-library-tabs";

/**
 * The install steps of a component that ships two builds. Both sets are
 * rendered on the server — so the build-time "no item called…" guard fires for
 * each — and this shows the one matching the page-wide pick, with the switch
 * above them so the reader can change build right where they copy the command.
 */
export function MotionInstallSwitch({
  gsap,
  motion: motionSteps,
}: {
  gsap: React.ReactNode;
  motion: React.ReactNode;
}) {
  const { library } = useMotionLibrary();
  const reduceMotion = useReducedMotion();

  return (
    <div>
      <div className="not-prose mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
        <MotionLibraryTabs />
        <p className="text-[14px] leading-relaxed text-foreground/50">
          Two builds, same props and file — install one.
        </p>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={library}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
          transition={reduceMotion ? { duration: 0 } : { duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          {library === "motion" ? motionSteps : gsap}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
