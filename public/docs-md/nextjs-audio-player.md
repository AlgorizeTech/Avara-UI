---
title: "Shadcn Audio Player"
description: "Shadcn Audio Player. An audio player with artwork, transport, scrubber and volume — in a hero card, a compact bar."
url: https://avaraui.com/docs/nextjs/audio-player
---

# Shadcn Audio Player

An audio player with artwork, transport, scrubber and volume — in a hero card, a compact bar, or wrapped around the browser's native controls. Built on a plain `<audio>` element with no player library.

`AudioPlayer` is a separate component with the same visual language. It wraps a plain `<audio>` element and mirrors that element's events, so the UI stays correct when a media key, the OS, or the native controls change playback.

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

## Native controls

The browser's own audio controls under the artwork — nothing custom to keep in sync.

- `variant="native"` renders `<audio controls>` instead of the custom transport. The most accessible option by default, and the one that inherits platform features like playback speed for free.

```tsx
import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function NativeAudioHero() {
  return (
    <AudioPlayer
      variant="native"
      badge="Now Playing"
      title="It All Began With a Burst"
      subtitle="Kishi Bashi — 151a"
      audioUrl="https://cdn.plyr.io/static/demo/Kishi_Bashi_-_It_All_Began_With_a_Burst.mp3"
      artworkUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg"
    />
  );
}
```

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

## Plyr audio

The [Plyr player](https://avaraui.com/docs/nextjs/video-player) from the Video Player page also has an audio layout: set `mediaType="audio"` and the card drops its video frame and sizes to the control bar. Use it when you want Plyr's control bar for both media types across a site.

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

### Install the Plyr player

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/video-player-plyr.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/video-player-plyr
```

## Features

### Three Layouts

A hero card with artwork and glow, a compact bar for lists and footers, or the browser's own controls inside the same shell — one prop.

### No Player Library

Everything sits on a native `<audio>` element, so the only weight added is the icons.

### Mirrors the Element

Playback state follows the element's own events, so a media key, the OS, or the native controls changing playback never leaves the UI out of sync.

### Themed Accent

The play button and progress fill read `--theme-color`, falling back to your `--primary`, so the player matches the rest of the page.

## Props Reference

### AudioPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `audioUrl` | `string` | `"https://cdn.plyr.io/..."` | Audio file the browser plays natively — mp3, ogg, wav, m4a. |
| `audioType` | `string` | `"audio/mpeg"` | MIME type on the `<source>`, so the browser can skip a format it cannot play. |
| `variant` | `"hero" \| "bar" \| "native"` | `"hero"` | Full artwork card, single compact row, or the browser's own `<audio controls>` under the artwork. |
| `artworkUrl` / `artworkAlt` | `string` | `"https://images.unsplash..."` | Cover image and its alt text. |
| `badge` / `title` / `subtitle` | `string` | `"Now Playing"` / … | Track copy. `subtitle` is the natural place for the artist or show name. |
| `skipSeconds` | `number` | `10` | Seconds the rewind and forward buttons jump. `0` hides both. |
| `autoPlay` / `loop` | `boolean` | `false` | Passed to the `<audio>` element. Autoplay is blocked without a prior interaction on most browsers. |
| `preload` | `"none" \| "metadata" \| "auto"` | `"metadata"` | How much the browser fetches up front. `metadata` is enough to show the duration. |
| `enableGlow` | `boolean` | `true` | Ambient blur gradient behind the card. |
| `onPlay` / `onPause` / `onEnded` | `() => void` | `undefined` | Playback callbacks for analytics. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/audio-player
