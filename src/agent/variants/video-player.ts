import type { PageVariants } from "./types";

/**
 * Video player: 4 designs. Two are playback modes of the `video-player` item,
 * two are separate library-backed items. The "Direct embed" and "Native HTML5
 * video" examples are props of the first item and are not listed. Claims come
 * from src/app/docs/[framework]/video-player/page.mdx.
 */
export const videoPlayer: PageVariants = {
  slug: "video-player",
  intro:
    "A video for a landing page or section. Choose how it plays: opened in a modal or in place with the built-in player, or through the Plyr or JW Player library.",
  gotchas: [
    "The built-in `video-player` item also plays a self-hosted file (`source: \"video\"`) and can embed directly with no thumbnail (`playbackMode: \"direct\"`). Those are props, not separate designs.",
    "JW Player loads JW's library script. The default points at JW's public docs library; replace it with your own player before shipping.",
  ],
  variants: [
    {
      id: "modal",
      group: "Built-in player",
      label: "Video hero, plays in a modal",
      summary: "A thumbnail with a glassmorphism call to action that opens the video in a centred dialog.",
      bestFor: ["a landing-page hero where the video should not push content around"],
      avoidIf: ["you want the video to play where it sits on the page"],
      traits: ["thumbnail and glow", "modal dialog", "Esc closes", "focus returns to the button", "dialog size md to full"],
      item: "video-player",
      demo: "video-player",
      example: "Modal player",
      props: { playbackMode: "modal" },
      setProps: { playbackMode: "modal" },
    },
    {
      id: "inline",
      group: "Built-in player",
      label: "Video hero, plays inline",
      summary: "The player replaces the poster in place; nothing covers the page and body scrolling is untouched.",
      bestFor: ["a video mid-page, inside a scrolling column or a carousel slide"],
      avoidIf: ["you want a focused, full-attention viewing dialog"],
      traits: ["plays in the card", "no overlay", "no scroll lock"],
      item: "video-player",
      demo: "video-player",
      example: "Inline player",
      props: { playbackMode: "inline" },
      setProps: { playbackMode: "inline" },
    },
    {
      id: "plyr",
      group: "Player libraries",
      label: "Plyr player",
      summary: "One accessible, skinnable control bar in front of HTML5 files, YouTube or Vimeo.",
      bestFor: ["one consistent control bar across self-hosted video, YouTube and Vimeo"],
      avoidIf: ["you want no extra library (the built-in player needs none)"],
      traits: ["Plyr library", "HTML5, YouTube, Vimeo", "colourable controls", "choose which controls show"],
      item: "video-player-plyr",
      demo: "video-player-plyr",
      example: "Plyr — YouTube",
      props: { provider: "youtube", mediaType: "video" },
    },
    {
      id: "jw",
      group: "Player libraries",
      label: "JW Player",
      summary: "A video player built on JW Player, with colour skin presets and a native fallback if the library is unavailable.",
      bestFor: ["a site that already uses JW Player for streaming or playlists"],
      avoidIf: ["you have no JW Player library or licence"],
      traits: ["JW Player library", "skin presets", "playlist or file source", "native fallback"],
      item: "video-player-jw",
      demo: "video-player-jw",
      example: "JW Player — skinned",
      props: { skin: "midnight" },
    },
  ],
};
