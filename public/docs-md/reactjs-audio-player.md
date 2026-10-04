export const metadata = docsPageMetadata("audio-player");

# Audio Player

An audio player with artwork, transport, scrubber and volume — in a hero card, a compact bar, or wrapped around the browser's native controls. Built on a plain `` element with no player library.

`AudioPlayer` is a separate component with the same visual language. It wraps a plain `` element and mirrors that element's events, so the UI stays correct when a media key, the OS, or the native controls change playback.

export const usageAudioHero = `import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function PodcastHero() {
  return (
    
  );
}`;

export const usageAudioBar = `import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function EpisodeRow() {
  return (
    
  );
}`;

export const usageAudioNative = `import { AudioPlayer } from "@/components/custom/blocks/AudioPlayerBlock";

export default function NativeAudioHero() {
  return (
    
  );
}`;

` element.",
      propNotes: [
        {
          prop: "variant",
          value: '"hero"',
          effect:
            "is the default — artwork beside its own transport. `audioUrl` and `artworkUrl` are the only two props it really needs.",
        },
        {
          prop: "skipSeconds",
          value: "{10}",
          effect:
            "sizes the rewind and forward jumps. Set it to `0` to drop both buttons.",
        },
      ],
      props: { variant: "hero" },
      usage: usageAudioHero,
      code: extractCode("src/components/custom/blocks/AudioPlayerBlock.tsx"),
    },
    {
      title: "Compact bar",
      subheading:
        "The same player as one row — for a sidebar, an episode list, or a sticky footer.",
      propNotes: [
        {
          prop: "variant",
          value: '"bar"',
          effect:
            "collapses artwork, copy and transport into a single row. The volume slider hides below `sm` where there is no room for it.",
        },
      ],
      props: { variant: "bar", enableGlow: false },
      usage: usageAudioBar,
    },
    {
      title: "Native controls",
      subheading:
        "The browser's own audio controls under the artwork — nothing custom to keep in sync.",
      propNotes: [
        {
          prop: "variant",
          value: '"native"',
          effect:
            "renders `` instead of the custom transport. The most accessible option by default, and the one that inherits platform features like playback speed for free.",
        },
      ],
      props: { variant: "native" },
      usage: usageAudioNative,
    },
  ]}
/>

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/audio-player
```

## Plyr audio

The Plyr player from the Video Player page also has an audio layout: set `mediaType="audio"` and the card drops its video frame and sizes to the control bar. Use it when you want Plyr's control bar for both media types across a site.

export const usagePlyrAudio = `import { PlyrPlayer } from "@/components/custom/blocks/VideoPlayerPlyrBlock";

export default function PlyrAudioHero() {
  return (
    
  );
}`;

` element, so the card drops the aspect ratio and sizes to the control bar.",
        },
      ],
      props: { mediaType: "audio" },
      minHeight: 320,
      usage: usagePlyrAudio,
    },
  ]}
/>

### Install the Plyr player

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/video-player-plyr
```

## Features

    Three Layouts
    A hero card with artwork and glow, a compact bar for lists and footers, or the browser's own controls inside the same shell — one prop.

    No Player Library
    Everything sits on a native &lt;audio&gt; element, so the only weight added is the icons.

    Mirrors the Element
    Playback state follows the element's own events, so a media key, the OS, or the native controls changing playback never leaves the UI out of sync.

    Themed Accent
    The play button and progress fill read --theme-color, falling back to your --primary, so the player matches the rest of the page.

## Props Reference

### AudioPlayer

        Prop
        Type
        Default
        Description

        audioUrl
        string
        "https://cdn.plyr.io/..."
        Audio file the browser plays natively — mp3, ogg, wav, m4a.

        audioType
        string
        "audio/mpeg"
        MIME type on the &lt;source&gt;, so the browser can skip a format it cannot play.

        variant
        "hero" | "bar" | "native"
        "hero"
        Full artwork card, single compact row, or the browser's own &lt;audio controls&gt; under the artwork.

        artworkUrl / artworkAlt
        string
        "https://images.unsplash..."
        Cover image and its alt text.

        badge / title / subtitle
        string
        "Now Playing" / …
        Track copy. subtitle is the natural place for the artist or show name.

        skipSeconds
        number
        10
        Seconds the rewind and forward buttons jump. 0 hides both.

        autoPlay / loop
        boolean
        false
        Passed to the &lt;audio&gt; element. Autoplay is blocked without a prior interaction on most browsers.

        preload
        "none" | "metadata" | "auto"
        "metadata"
        How much the browser fetches up front. metadata is enough to show the duration.

        enableGlow
        boolean
        true
        Ambient blur gradient behind the card.

        onPlay / onPause / onEnded
        () =&gt; void
        undefined
        Playback callbacks for analytics.

---

**Component Path:** `[framework]\audio-player\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
