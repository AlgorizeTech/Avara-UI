import type { PageVariants } from "./types";

/**
 * Heart signal: 3 visualisations of one registry item (`heart-signal`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/heart-signal/page.mdx.
 */
export const heartSignal: PageVariants = {
  slug: "heart-signal",
  intro: "A slow, smooth cardiac telemetry visualisation drawn on an HTML5 canvas, with a live BPM badge and your theme colour, in three looks: an EKG trace, a heart silhouette with a sweep and a multi-lead wave.",
  gotchas: [
    "All three are looks of the one `heart-signal` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "ecg-line",
      label: "EKG waveform",
      summary: "A classic EKG P-Q-R-S-T heartbeat monitor trace.",
      bestFor: ["health, fitness or medical telemetry that should read as a heart monitor"],
      avoidIf: ["you want an illustrated heart rather than a waveform"],
      traits: ["monitor-style trace", "live BPM badge"],
      item: "heart-signal",
      demo: "heart-signal",
      example: "Real-time EKG Waveform Monitor",
      props: { variant: "ecg-line" },
      setProps: { variant: "ecg-line" },
    },
    {
      id: "pulse-heart",
      label: "Heart sweep",
      summary: "A central heart silhouette with a progressive left-to-right colour sweep fill.",
      bestFor: ["a friendly, illustrative heart for a header or card"],
      avoidIf: ["you want a technical monitor feel"],
      traits: ["heart silhouette", "colour sweep", "live BPM badge"],
      item: "heart-signal",
      demo: "heart-signal",
      example: "Anatomical Cardiac Heart Sweep",
      props: { variant: "pulse-heart" },
      setProps: { variant: "pulse-heart" },
    },
    {
      id: "cardiac-wave",
      label: "Cardiac wave",
      summary: "A multi-lead sine wave stream with audio-visual equalizer bars.",
      bestFor: ["an energetic header or dashboard accent"],
      avoidIf: ["you want a single clear heartbeat trace"],
      traits: ["multi-lead waves", "equalizer bars", "live BPM badge"],
      item: "heart-signal",
      demo: "heart-signal",
      example: "Fluid Cardiac Wave Visualizer",
      props: { variant: "cardiac-wave" },
      setProps: { variant: "cardiac-wave" },
    },
  ],
};
