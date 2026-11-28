---
title: "Shadcn Audio Player"
description: "An audio player with artwork, transport, scrubber and volume — in a hero card or a compact bar. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/audio-player
---

# Shadcn Audio Player

An audio player with artwork, transport, scrubber and volume — in a hero card or a compact bar. Built on a plain `<audio>` element with no player library.

`AudioPlayer` is a separate component with the same visual language. It wraps a plain `<audio>` element and mirrors that element's events, so the UI stays correct when a media key or the OS changes playback.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/audio-player.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/audio-player
```

## Audio hero

Artwork, transport, scrubber and volume in a full hero card. Built on a plain `<audio>` element.

- `variant="hero"` is the default — artwork beside its own transport. `audioUrl` and `artworkUrl` are the only two props it really needs.
- `skipSeconds={10}` sizes the rewind and forward jumps. Set it to `0` to drop both buttons.

```tsx
import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function PodcastHero() {
  return (
    <AudioPlayer
      badge="Now Playing"
      title="It All Began With a Burst"
      subtitle="Kishi Bashi — 151a"
      audioUrl="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      artworkUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg"
    />
  );
}
```

## Compact bar

The same player as one row — for a sidebar, an episode list, or a sticky footer.

- `variant="bar"` collapses artwork, copy and transport into a single row. The volume slider hides below `sm` where there is no room for it.

```tsx
import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function EpisodeRow() {
  return (
    <AudioPlayer
      variant="bar"
      enableGlow={false}
      badge="Episode 12"
      title="It All Began With a Burst"
      subtitle="Kishi Bashi — 151a"
      audioUrl="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      artworkUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg"
    />
  );
}
```

## Audio via Plyr

The [Plyr player](https://avaraui.com/docs/reactjs/video-player) from the Video Player page also has an audio layout: set `mediaType="audio"` and the card drops its video frame and sizes to the control bar. Use it when you want Plyr's control bar for both media types across a site.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/video-player-plyr.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/video-player-plyr
```

### Plyr — Audio

The same component in its audio layout, with no video frame.

- `mediaType="audio"` renders an `<audio>` element, so the card drops the aspect ratio and sizes to the control bar.

```tsx
import { PlyrPlayer } from "@/components/custom/blocks/VideoPlayerPlyrBlock";

export default function PlyrAudioHero() {
  return (
    <PlyrPlayer
      mediaType="audio"
      src="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      srcType="audio/mpeg"
      accentColor="#fb923c"
      title="It All Began With a Burst"
      subtitle="Kishi Bashi — 151a. The same player in its audio layout."
    />
  );
}
```

## About Shadcn Audio Player

**What it is.** `AudioPlayer` plays one audio file through a plain `<audio>` element in two layouts: `"hero"` (artwork card with custom transport) and `"bar"` (a compact single row). It needs no player library, only `lucide-react` icons.

**How it is built.** The `<audio>` element is the source of truth. The component listens to its `play`, `pause`, `timeupdate`, `volumechange` and `ended` events, so media keys and the OS keep the UI correct. The accent comes from `--theme-color`, falling back to `--primary`. `PlyrPlayer` with `mediaType="audio"` is the alternative.

**When to use it.** Use it for podcast episodes, music previews, voiceover tracks and sticky footer audio bars.

## For AI agents

**When to use**

- Podcast episodes, music previews
- Voiceover tracks, sticky footer audio bars

**When not to use**

- Capturing a recording from the user: use [Voice Note](https://avaraui.com/docs/reactjs/voice-note)
- Video playback: use [Video Player](https://avaraui.com/docs/reactjs/video-player)

**Agent notes**

- Named export `AudioPlayer` from `@/components/custom/blocks/AudioPlayerBlock`. Key props are `audioUrl`, `audioType`, `artworkUrl`, `variant` (`"hero" | "bar"`), `skipSeconds` (default `10`, `0` hides both skip buttons) and `enableGlow`.
- It plays a single `<source>`, so there is no playlist. Change `audioUrl` to switch tracks and use `onEnded` to advance your own queue.
- `onPlay` and `onPause` fire only from the player's own Play and Pause button. For media keys, only `onEnded` fires, so use native `<audio>` events if you need every change.
- For a Plyr control bar across audio and video, install `video-player-plyr` and pass `mediaType="audio"` instead.

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/audio-player

**When to use it.** Playing audio on a page. Choose between a hero card with artwork, a compact bar, or Plyr's control bar.

**Gotchas:**

- Two of the three are one item (`audio-player`), chosen with its `variant` prop. The Plyr audio player is a separate item, `video-player-plyr`.

### The 3 variants

1. **Audio hero** (`hero`): The default: artwork beside its own transport, scrubber and volume.
   - Live: https://avaraui.com/view/audio-player/hero
   - Best for: a podcast or track page where the artwork matters
   - Avoid if: you only have room for a single row
   - Traits: artwork, transport, skip-back and forward jumps, uses the `audio-player` item
   - Install: `npx shadcn@latest add @avara-ui/audio-player`
   - Set these props: `{"variant":"hero"}`
   - Docs: https://avaraui.com/docs/nextjs/audio-player#audio-hero
2. **Compact bar** (`bar`): Artwork, copy and transport collapsed into a single row; the volume slider hides on narrow screens.
   - Live: https://avaraui.com/view/audio-player/bar
   - Best for: a list of tracks or a sticky player where space is tight
   - Avoid if: you want large artwork to lead
   - Traits: single row, compact, uses the `audio-player` item
   - Install: `npx shadcn@latest add @avara-ui/audio-player`
   - Set these props: `{"variant":"bar"}`
   - Docs: https://avaraui.com/docs/nextjs/audio-player#compact-bar
3. **Plyr audio** (`plyr`): Plyr's control bar in its audio layout, with no video frame.
   - Live: https://avaraui.com/view/audio-player/plyr
   - Best for: a site that already uses Plyr for video and wants matching audio controls
   - Avoid if: you want no extra library
   - Traits: Plyr library, audio layout, colourable controls
   - Install: `npx shadcn@latest add @avara-ui/video-player-plyr`
   - Set these props: `{"mediaType":"audio"}`
   - Docs: https://avaraui.com/docs/nextjs/audio-player#plyr-audio

## Props Reference

### AudioPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `audioUrl` | `string` | `"https://cdn.plyr.io/..."` | Audio file the browser plays natively — mp3, ogg, wav, m4a. |
| `audioType` | `string` | `"audio/mpeg"` | MIME type on the `<source>`, so the browser can skip a format it cannot play. |
| `variant` | `"hero" \| "bar"` | `"hero"` | Full artwork card or a single compact row. |
| `artworkUrl` / `artworkAlt` | `string` | `"https://images.unsplash..."` | Cover image and its alt text. |
| `badge` / `title` / `subtitle` | `string` | `"Now Playing"` / … | Track copy. `subtitle` is the natural place for the artist or show name. |
| `skipSeconds` | `number` | `10` | Seconds the rewind and forward buttons jump. `0` hides both. |
| `autoPlay` / `loop` | `boolean` | `false` | Passed to the `<audio>` element. Autoplay is blocked without a prior interaction on most browsers. |
| `preload` | `"none" \| "metadata" \| "auto"` | `"metadata"` | How much the browser fetches up front. `metadata` is enough to show the duration. |
| `enableGlow` | `boolean` | `true` | Ambient blur gradient behind the card. |
| `onPlay` / `onPause` / `onEnded` | `() => void` | `undefined` | Playback callbacks. `onPlay` and `onPause` fire from the player's own Play and Pause button; `onEnded` fires when the track ends. |

## Works with other components

- [Voice Note](https://avaraui.com/docs/reactjs/voice-note) for hold-to-record audio capture, where `AudioPlayer` only plays files.
- [Video Player](https://avaraui.com/docs/reactjs/video-player) for video heroes, and for the Plyr player that also has an audio layout.
- [Drawer](https://avaraui.com/docs/reactjs/drawer) to tuck a player into a slide-in panel, for example the `"bar"` variant in a bottom drawer.

## Does AudioPlayer stay in sync with keyboard media keys?

Yes. `AudioPlayer` treats the `<audio>` element as the source of truth and listens to its `play`, `pause`, `timeupdate`, `volumechange` and `ended` events. Hardware media keys and OS playback controls therefore update the buttons, scrubber and volume without extra code.

## How do I hide the skip forward/backward buttons?

Pass `skipSeconds={0}`. Both the rewind and forward buttons are removed from the custom transport. Any positive number keeps them and sets how far each jumps, so `skipSeconds={15}` gives 15-second jumps. The default is `10`.

## Which AudioPlayer variant should I use: hero or bar?

Use `hero` for a featured track with artwork, and `bar` for a one-row player in a sidebar, episode list or sticky footer. The `bar` volume slider hides below the `sm` breakpoint.

## Why does autoPlay not start my AudioPlayer?

Browsers block unmuted autoplay until the visitor has interacted with the page. `autoPlay` is passed straight to the `<audio>` element, so treat it as a hint. If the browser refuses, the play button simply stays in its paused state, and the visitor can start playback with it.

## When do onPlay, onPause and onEnded fire in AudioPlayer?

`onPlay` and `onPause` run when the visitor uses the player's own Play and Pause button, not for media keys. `onEnded` fires from the audio element's `ended` event on every variant. For complete analytics, attach listeners to the `<audio>` element yourself.

---

Live previews and every example: https://avaraui.com/docs/nextjs/audio-player
