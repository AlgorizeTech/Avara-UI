# Hero Video Player

An embeddable, hardware-accelerated media hero for landing pages and high-conversion sections. Features a glassmorphism CTA, automatic dark/light mode responsiveness, and full keyboard accessibility.

Four independent components live on this page, and each installs on its own:

- **`HeroVideoPlayer`** — the poster hero. `playbackMode` opens the video in a **modal**, swaps it **inline** into the card, or renders it **directly** on load; `source` puts either a YouTube embed or a native HTML5 `` behind it. No player library.
- **`HeroAudioPlayer`** — the same hero language for audio, with artwork, transport, scrubber and volume. No player library.
- **`HeroPlyrPlayer`** — [Plyr](https://plyr.io) driving HTML5 files, YouTube and Vimeo behind one skinnable control bar.
- **`HeroJwPlayer`** — [JW Player](https://jwplayer.com) with colour skin presets, for teams already on JW's platform.

Reach for the first two unless you need adaptive streaming, DRM or a shared control bar across providers — they add no player dependency at all.

## YouTube & native video

Click the CTA in any preview to start playback. In `modal` mode `Esc` closes the dialog and focus returns to the play button.

export const usageDefault = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function HeroSection() {
  return (
    
  );
}`;

export const usageInline = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function InlineHero() {
  return (
    
  );
}`;

export const usageDirect = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function DirectEmbedHero() {
  return (
    
  );
}`;

export const usageNative = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function NativeVideoHero() {
  return (
     element with the browser's own controls — no player library at all."
      videoUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      thumbnailUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    />
  );
}`;

export const usageNativeModal = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

const track = (event: string) => console.log(event);

export default function NativeModalHero() {
  return (
     track("hero_video_opened")}
      onClose={() => track("hero_video_closed")}
    />
  );
}`;

` element instead of an iframe, so `videoUrl` is a media file and `thumbnailUrl` becomes its `poster`.",
        },
        {
          prop: "videoType",
          value: '"video/mp4"',
          effect:
            "goes on the `` so the browser can skip a codec it cannot play. `loop`, `muted` and `controls` pass straight through.",
        },
      ],
      props: { source: "video", playbackMode: "direct" },
      usage: usageNative,
    },
    {
      title: "Native video in a modal",
      subheading:
        "The same file behind the poster hero, opening ultrawide at full viewport size.",
      propNotes: [
        {
          prop: "source",
          value: '"video"',
          effect: "works in every playback mode — the reveal and the player are independent choices.",
        },
        {
          prop: "onPlay",
          effect:
            "and `onClose` fire on open and dismiss, which is where analytics goes.",
        },
      ],
      props: {
        source: "video",
        playbackMode: "modal",
        modalSize: "full",
        aspectRatio: "21/9",
      },
      usage: usageNativeModal,
    },
  ]}
/>

## Audio player

`HeroAudioPlayer` is a separate component with the same visual language. It wraps a plain `` element and mirrors that element's events, so the UI stays correct when a media key, the OS, or the native controls change playback.

export const usageAudioHero = `import { HeroAudioPlayer } from "@/components/custom/blocks/HeroAudioPlayerBlock";

export default function PodcastHero() {
  return (
    
  );
}`;

export const usageAudioBar = `import { HeroAudioPlayer } from "@/components/custom/blocks/HeroAudioPlayerBlock";

export default function EpisodeRow() {
  return (
    
  );
}`;

export const usageAudioNative = `import { HeroAudioPlayer } from "@/components/custom/blocks/HeroAudioPlayerBlock";

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
      code: extractCode("src/components/custom/blocks/HeroAudioPlayerBlock.tsx"),
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

## Plyr player

[Plyr](https://plyr.io) puts one accessible control bar in front of HTML5 files, YouTube and Vimeo, so all three look and behave identically. It installs the `plyr` package and is imported dynamically inside an effect, which keeps the component server-renderable.

export const usagePlyrHtml5 = `import { HeroPlyrPlayer } from "@/components/custom/blocks/HeroVideoPlayerPlyrBlock";

export default function PlyrHero() {
  return (
    
  );
}`;

export const usagePlyrYouTube = `import { HeroPlyrPlayer } from "@/components/custom/blocks/HeroVideoPlayerPlyrBlock";

export default function PlyrYouTubeHero() {
  return (
    
  );
}`;

export const usagePlyrAudio = `import { HeroPlyrPlayer } from "@/components/custom/blocks/HeroVideoPlayerPlyrBlock";

export default function PlyrAudioHero() {
  return (
    
  );
}`;

` and `posterUrl` on the ``.",
        },
        {
          prop: "accentColor",
          effect:
            "sets Plyr's `--plyr-color-main`, which is what actually colours the control bar, the progress fill and the focus ring.",
        },
      ],
      props: { provider: "html5", mediaType: "video" },
      usage: usagePlyrHtml5,
      code: extractCode(
        "src/components/custom/blocks/HeroVideoPlayerPlyrBlock.tsx",
      ),
    },
    {
      title: "Plyr — YouTube",
      subheading:
        "A YouTube embed wearing exactly the same controls as the file above.",
      propNotes: [
        {
          prop: "provider",
          value: '"youtube"',
          effect:
            "accepts a watch URL or a bare video id — `src` is normalised to the embed id either way. `vimeo` works the same.",
        },
        {
          prop: "controls",
          effect:
            "takes Plyr's control-name array in bar order, so you can drop settings, captions or the volume slider.",
        },
      ],
      props: { provider: "youtube", mediaType: "video" },
      usage: usagePlyrYouTube,
    },
    {
      title: "Plyr — Audio",
      subheading: "The same component in its audio layout, with no video frame.",
      propNotes: [
        {
          prop: "mediaType",
          value: '"audio"',
          effect:
            "renders an `` element, so the card drops the aspect ratio and sizes to the control bar.",
        },
      ],
      props: { mediaType: "audio" },
      minHeight: 320,
      usage: usagePlyrAudio,
    },
  ]}
/>

## JW Player

[JW Player](https://jwplayer.com) is a licensed, remotely hosted library rather than an npm package, so `HeroJwPlayer` loads it from a `libraryUrl` you supply and falls back to a native `` if it is unavailable. The previews below run on JW's public documentation library — see the setup note under Installation before shipping.

export const usageJwDefault = `import { HeroJwPlayer } from "@/components/custom/blocks/HeroVideoPlayerJwBlock";

export default function JwHero() {
  return (
    
  );
}`;

export const usageJwSkin = `import { HeroJwPlayer } from "@/components/custom/blocks/HeroVideoPlayerJwBlock";

export default function SkinnedJwHero() {
  return (
    
  );
}`;

export const usageJwCustom = `import { HeroJwPlayer } from "@/components/custom/blocks/HeroVideoPlayerJwBlock";

export default function BrandedJwHero() {
  return (
    
  );
}`;

## Installation

Each component installs independently — take only the players you actually use.

### JW Player setup

`HeroJwPlayer` has no npm dependency: JW ships a licensed library from its own CDN, and the component loads it at runtime.

1. Create a player in the [JW Dashboard](https://dashboard.jwplayer.com) and copy its cloud-hosted library URL — `https://cdn.jwplayer.com/libraries/.js`.
2. Pass it as `libraryUrl`. For a self-hosted build, also pass the `licenseKey` from your player settings.
3. Leave `libraryUrl` unset only while evaluating. The default is JW's public documentation library, which carries JW's branding and can be rotated or rate-limited without notice.

If the library fails to load, the component renders a native `` with the poster and a visible warning rather than a black box — so a licence problem degrades instead of breaking the page.

## Features

    Three Reveal Modes
    Open in a dialog, swap the player into the card in place, or render it directly on load — one prop, no layout rewrite.

    Five Player Backends
    YouTube embeds, native HTML5 video, native audio, Plyr and JW Player — sharing one hero card, one caption block and one glow treatment.

    Deferred Media Weight
    In modal and inline mode nothing but the poster loads until a click, so an embed never lands on your Largest Contentful Paint.

    Responsive Aspect Ratios
    16:9, ultrawide 21:9, classic 4:3 and square 1:1, forwarded to Plyr and JW in their own ratio formats so the frame never jumps.

    Keyboard Accessible
    The play CTA is a real button, the modal is a labelled dialog, `Esc` closes it, the page behind it stops scrolling, and focus returns to the trigger.

    Themed Accent
    Play buttons and progress fills read `--theme-color`, falling back to your `--primary`, so the players match the rest of the page.

## Best Practices & Guidelines

    Picking a playback mode
    Use modal above the fold, where the video is the page's main call to action. Use inline mid-page — an overlay that hijacks the whole viewport from a card the reader scrolled past reads as an interruption. Use direct when the video is the content, such as a documentation walkthrough.

    Autoplay is a request, not a guarantee
    Browsers block autoplay with sound. autoPlay only applies to playbackMode="direct", and the native player mutes itself when it is set. In modal and inline the click is the gesture, so playback starts on its own and the component adds autoplay=1 to the embed URL for you.

    Optimizing thumbnails
    Give thumbnailUrl a resolution that matches your aspectRatio. It is the poster, the LCP candidate and — for source="video" — the &lt;video&gt; element's own poster, so a mismatched crop shows up in all three places.

    Choosing a backend
    Start with HeroVideoPlayer — it ships no player library. Move to Plyr when you need one consistent, skinnable control bar across YouTube, Vimeo and self-hosted files. Move to JW Player when you are already on JW's platform for adaptive streaming, DRM or analytics.

## Props Reference

### HeroVideoPlayer

        Prop
        Type
        Default
        Description

        videoUrl
        string
        "https://www.youtube..."
        Embed URL for source="youtube", or a playable media file for source="video".

        playbackMode
        "modal" | "inline" | "direct"
        "modal"
        How the player is revealed: a centered dialog, an in-place swap inside the card, or immediately on load with the copy moved below the frame.

        source
        "youtube" | "video"
        "youtube"
        Renders an iframe embed or a native &lt;video&gt; element. Independent of playbackMode.

        videoType
        string
        undefined
        MIME type on the &lt;source&gt; for source="video", e.g. video/mp4.

        thumbnailUrl
        string
        "https://images.unsplash..."
        Poster image for the card, and the poster attribute of the native player.

        thumbnailAlt
        string
        "Nature Wilderness..."
        Alt text for the poster image.

        badge
        string
        "Wilderness Exploration"
        Pill badge with an animated icon — top-left over the poster, or above the title in direct mode.

        title
        string
        "Experience Untouched..."
        Headline, and the accessible name of the modal dialog.

        subtitle
        string
        "Embark on an immersive..."
        Secondary paragraph under the title.

        playButtonLabel
        string
        "Watch Nature Documentary"
        Label inside the glassmorphic CTA. Not rendered in direct mode.

        aspectRatio
        "16/9" | "21/9" | "4/3" | "1/1"
        "16/9"
        Aspect ratio of the card and of the modal frame.

        modalSize
        "md" | "lg" | "xl" | "full"
        "lg"
        Width of the dialog. full fills the viewport at 90vh. Only read in modal mode.

        autoPlay
        boolean
        false
        Starts playback on load. Only read in direct mode; the native player mutes itself when it is set.

        muted / loop / controls
        boolean
        false / false / true
        Passed to the native &lt;video&gt;. Ignored for source="youtube".

        enableGlow
        boolean
        true
        Ambient blur gradient behind the card.

        onPlay / onClose
        () =&gt; void
        undefined
        Fire when the player opens and when it is dismissed. Not called in direct mode, which never opens or closes.

        className
        string
        undefined
        Classes on the outer wrapper. All other standard div attributes pass through.

### HeroAudioPlayer

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

### HeroPlyrPlayer

        Prop
        Type
        Default
        Description

        src
        string
        "https://cdn.plyr.io/..."
        A media file for html5; a watch URL or bare video id for youtube and vimeo.

        provider
        "html5" | "youtube" | "vimeo"
        "html5"
        Which backend Plyr wraps. All three get the same control bar and keyboard shortcuts.

        mediaType
        "video" | "audio"
        "video"
        HTML5 only. audio drops the video frame and sizes the card to the control bar.

        srcType
        string
        "video/mp4"
        MIME type on the HTML5 &lt;source&gt;.

        posterUrl
        string
        "https://cdn.plyr.io/..."
        Poster for the HTML5 video. Embeds supply their own.

        accentColor
        string
        undefined
        Sets Plyr's --plyr-color-main on the wrapper — control bar, progress fill and focus ring.

        controls
        string[]
        undefined
        Plyr control names in bar order. Omit for Plyr's default set.

        aspectRatio
        "16/9" | "21/9" | "4/3" | "1/1"
        "16/9"
        Frame ratio, forwarded to Plyr's own ratio option in w:h form.

        iconUrl
        string
        undefined
        Overrides Plyr's CDN icon sprite. Point it at a self-hosted plyr.svg to avoid a third-party request.

        autoPlay / muted / loop
        boolean
        false
        Passed to Plyr. autoPlay forces muted, since browsers block the alternative.

        badge / title / subtitle
        string
        "Plyr Player" / …
        Caption under the frame. showCaption={false} removes the whole block.

        onReady
        () =&gt; void
        undefined
        Fires once Plyr has initialised and replaced the raw media element.

### HeroJwPlayer

        Prop
        Type
        Default
        Description

        libraryUrl
        string
        JW_DEMO_LIBRARY_URL
        JW library script. Defaults to JW's public documentation library — replace it with your own https://cdn.jwplayer.com/libraries/&lt;PLAYER_ID&gt;.js before shipping.

        licenseKey
        string
        undefined
        Only for a self-hosted library build. Cloud-hosted libraries embed their own licence.

        playlistUrl
        string
        "https://cdn.jwplayer.com/v2/media/hWF9vG66"
        A JW playlist or media endpoint. Takes precedence over file.

        file
        string
        undefined
        A direct mp4 or HLS manifest. Also the source of the native fallback player.

        posterUrl
        string
        "https://images.unsplash..."
        Passed to JW as image, and used as the fallback player's poster.

        skin
        "default" | "midnight" | "neon" | "sunset" | "minimal"
        "default"
        Pre-mixed JW colour config for the control bar, menus, time slider and tooltips.

        skinConfig
        JwSkinConfig
        undefined
        Raw JW skin object. Wins over skin when both are set.

        skinUrl / skinName
        string
        undefined
        An external skin stylesheet and the class name it defines, for a fully custom look.

        autoStart / muted / repeat / controls
        boolean
        false / false / false / true
        JW playback flags. autoStart forces muted.

        aspectRatio
        "16/9" | "21/9" | "4/3" | "1/1"
        "16/9"
        Frame ratio, forwarded to JW's aspectratio in w:h form.

        playerOptions
        Record&lt;string, unknown&gt;
        undefined
        Merged last into jwplayer().setup(). The escape hatch for any JW option the props do not cover.

        onReady
        () =&gt; void
        undefined
        Fires on JW's ready event. A failed load or setup falls back to the native player instead.

---

**Component Path:** `[framework]\hero-video-player\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
