"use client";

import { VoiceNote } from "@/components/custom/blocks/VoiceNoteBlock";

export default function VoiceNoteDemo({
  initialState = "idle",
  themeColor,
  color,
}: {
  initialState?: "idle" | "recording" | "recorded";
  themeColor?: string;
  color?: string;
}) {
  const activeColor = themeColor || color;

  return (
    <div className="w-full min-h-[220px] sm:min-h-[250px] flex flex-col items-center justify-center relative bg-[#f6f7fb]/60 dark:bg-card/40 rounded-2xl border border-border/60 p-6 sm:p-10 overflow-hidden cursor-pointer">
      {/* Background ambient decorative glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
        <div
          style={activeColor ? { backgroundColor: activeColor } : {}}
          className="size-72 rounded-full bg-primary/10 blur-3xl transition-colors duration-300"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center cursor-pointer">
        <VoiceNote
          initialState={initialState}
          themeColor={activeColor}
          holdLabel="Hold to record"
          slideCancelLabel="< Slide to cancel"
        />
      </div>
    </div>
  );
}
