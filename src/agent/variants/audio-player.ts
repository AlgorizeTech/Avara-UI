import type { PageVariants } from "./types";

/**
 * Audio player: 4 designs. Three are looks of the `audio-player` item (the
 * `variant` prop), one is the Plyr item in its audio layout. Claims come from
 * src/app/docs/[framework]/audio-player/page.mdx.
 */
export const audioPlayer: PageVariants = {
  slug: "audio-player",
  intro:
    "Playing audio on a page. Choose between a hero card with artwork, a compact bar, the browser's own controls, or Plyr's control bar.",
  gotchas: [
    "Three of the four are one item (`audio-player`), chosen with its `variant` prop. The Plyr audio player is a separate item, `video-player-plyr`.",
  ],
  variants: [
    {
      id: "hero",
      group: "Custom player",
      label: "Audio hero",
      summary: "The default: artwork beside its own transport, scrubber and volume.",
      bestFor: ["a podcast or track page where the artwork matters"],
      avoidIf: ["you only have room for a single row"],
      traits: ["artwork", "transport", "skip-back and forward jumps", "uses the `audio-player` item"],
      item: "audio-player",
      demo: "audio-player",
      example: "Audio hero",
      props: { variant: "hero" },
      setProps: { variant: "hero" },
    },
    {
      id: "bar",
      group: "Custom player",
      label: "Compact bar",
      summary: "Artwork, copy and transport collapsed into a single row; the volume slider hides on narrow screens.",
      bestFor: ["a list of tracks or a sticky player where space is tight"],
      avoidIf: ["you want large artwork to lead"],
      traits: ["single row", "compact", "uses the `audio-player` item"],
      item: "audio-player",
      demo: "audio-player",
      example: "Compact bar",
      props: { variant: "bar", enableGlow: false },
      setProps: { variant: "bar" },
    },
    {
      id: "native",
      group: "Browser and library controls",
      label: "Native controls",
      summary: "The browser's own audio controls inside the card, with platform features such as playback speed for free.",
      bestFor: ["the most accessible default with nothing custom to maintain"],
      avoidIf: ["you want a branded transport that looks the same in every browser"],
      traits: ["browser controls", "platform features", "uses the `audio-player` item"],
      item: "audio-player",
      demo: "audio-player",
      example: "Native controls",
      props: { variant: "native" },
      setProps: { variant: "native" },
    },
    {
      id: "plyr",
      group: "Browser and library controls",
      label: "Plyr audio",
      summary: "Plyr's control bar in its audio layout, with no video frame.",
      bestFor: ["a site that already uses Plyr for video and wants matching audio controls"],
      avoidIf: ["you want no extra library"],
      traits: ["Plyr library", "audio layout", "colourable controls"],
      item: "video-player-plyr",
      demo: "video-player-plyr",
      example: "Plyr — Audio",
      props: { mediaType: "audio" },
      setProps: { mediaType: "audio" },
    },
  ],
};
