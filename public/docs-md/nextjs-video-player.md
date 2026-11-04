---
title: "Shadcn Video Player"
description: "An embeddable, hardware-accelerated video hero for landing pages and high-conversion sections. Free shadcn/ui Video Player component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/video-player
---

# Shadcn Video Player

An embeddable, hardware-accelerated video hero for landing pages and high-conversion sections. Features a glassmorphism CTA, automatic dark/light mode responsiveness, and full keyboard accessibility.

Three independent components live on this page, and each installs on its own:

- **`VideoPlayer`** — the poster hero. `playbackMode` opens the video in a **modal**, swaps it **inline** into the card, or renders it **directly** on load; `source` puts either a YouTube embed or a native HTML5 `<video>` behind it. No player library.
- **`PlyrPlayer`** — [Plyr](https://plyr.io) driving HTML5 files, YouTube and Vimeo behind one skinnable control bar.
- **`JwPlayer`** — [JW Player](https://jwplayer.com) with colour skin presets, for teams already on JW's platform.

Reach for the first unless you need adaptive streaming, DRM or a shared control bar across providers — it adds no player dependency at all. Looking for audio? The [Audio Player](https://avaraui.com/docs/nextjs/audio-player) has its own page.

## YouTube & native video

Click the CTA in any preview to start playback. In `modal` mode `Esc` closes the dialog and focus returns to the play button.

### Modal player

The default. A full-width 4K nature preview, glass CTA button and a centered dialog player.

- `playbackMode="modal"` opens the video in a centered dialog. `Esc` closes it, the page behind it stops scrolling, and focus returns to the play button.
- `thumbnailUrl` is the preview background and `videoUrl` the embed that only loads once the modal opens.
- `modalSize` sizes the dialog — md | lg | xl | full. `full` fills the viewport at 90vh.

```tsx
import { VideoPlayer } from "@/components/custom/blocks/VideoPlayerBlock";

export default function HeroSection() {
  return (
    <VideoPlayer
      badge="Nature 4K"
      title="Wilderness Unbound"
      subtitle="A cinematic journey through serene mountain vistas and ancient forests."
      playButtonLabel="Watch Film"
      videoUrl="https://www.youtube.com/embed/LXb3EKWsInQ"
      thumbnailUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg"
    />
  );
}
```

### Inline player

Same poster hero, but the player swaps into the card instead of opening an overlay.

- `playbackMode="inline"` replaces the poster with the player in place. Nothing covers the page and body scrolling is untouched, so it is safe inside a scrolling column or a carousel slide.
- The close button restores the poster — use it over `playbackMode="modal"` when the hero sits mid-page rather than above the fold.

```tsx
import { VideoPlayer } from "@/components/custom/blocks/VideoPlayerBlock";

export default function InlineHero() {
  return (
    <VideoPlayer
      playbackMode="inline"
      badge="Nature 4K"
      title="Wilderness Unbound"
      subtitle="The player swaps into the card itself — no overlay, no scroll lock."
      playButtonLabel="Play Here"
      videoUrl="https://www.youtube.com/embed/LXb3EKWsInQ"
      thumbnailUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1507525428034-b723cf961d3e-1790146212208.jpg"
    />
  );
}
```

### Direct embed

No poster at all — the embed renders on load and keeps its own title chrome.

- `playbackMode="direct"` drops the thumbnail and the CTA, so the embed is the whole component.
- No copy is drawn over an embed: `source="youtube"` already renders YouTube's own title bar, and a second one stacked on it is duplicate chrome. `title` still reaches the iframe as its accessible name. The native player below gets the full treatment.
- `autoPlay` is only read in this mode — the other two are click-initiated and always start playing. The native player mutes itself when it is set, because browsers block unmuted autoplay.

```tsx
import { VideoPlayer } from "@/components/custom/blocks/VideoPlayerBlock";

export default function DirectEmbedHero() {
  return (
    <VideoPlayer
      playbackMode="direct"
      title="Wilderness Unbound"
      videoUrl="https://www.youtube.com/embed/LXb3EKWsInQ"
    />
  );
}
```

### Native HTML5 video

A self-hosted mp4 with the browser's own controls — no embed, no third-party player.

- `source="video"` renders a real `<video>` element instead of an iframe, so `videoUrl` is a media file and `thumbnailUrl` becomes its `poster`.
- `videoType="video/mp4"` goes on the `<source>` so the browser can skip a codec it cannot play. `loop`, `muted` and `controls` pass straight through.
- The title sits at the foot of the frame until you press play, then moves to a hover-only top bar the way YouTube does. Set `showOverlay={false}` for a bare player with no copy on it at all.

```tsx
import { VideoPlayer } from "@/components/custom/blocks/VideoPlayerBlock";

export default function NativeVideoHero() {
  return (
    <VideoPlayer
      source="video"
      videoType="video/mp4"
      playbackMode="direct"
      title="View From A Blue Moon"
      subtitle="A plain video element with the browser's own controls"
      videoUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      thumbnailUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
    />
  );
}
```

### Native video in a modal

The same file behind the poster hero, opening ultrawide at full viewport size.

- `source="video"` works in every playback mode — the reveal and the player are independent choices.
- `onPlay` and `onClose` fire on open and dismiss, which is where analytics goes.

```tsx
import { VideoPlayer } from "@/components/custom/blocks/VideoPlayerBlock";

const track = (event: string) => console.log(event);

export default function NativeModalHero() {
  return (
    <VideoPlayer
      source="video"
      videoType="video/mp4"
      modalSize="full"
      aspectRatio="21/9"
      badge="Self-hosted"
      title="View From A Blue Moon"
      subtitle="A self-hosted file behind the poster hero, opening full width."
      playButtonLabel="Play Trailer"
      videoUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      thumbnailUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      onPlay={() => track("hero_video_opened")}
      onClose={() => track("hero_video_closed")}
    />
  );
}
```

### Install the video player

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/video-player.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/video-player
```

## Plyr player

[Plyr](https://plyr.io) puts one accessible control bar in front of HTML5 files, YouTube and Vimeo, so all three look and behave identically. It installs the `plyr` package and is imported dynamically inside an effect, which keeps the component server-renderable.

### Plyr — HTML5

A self-hosted mp4 behind Plyr's control bar, skinned with a single CSS variable.

- `provider="html5"` plays `src` as a media file. `srcType` goes on the `<source>` and `posterUrl` on the `<video>`.
- `accentColor` sets Plyr's `--plyr-color-main`, which is what actually colours the control bar, the progress fill and the focus ring.

```tsx
import { PlyrPlayer } from "@/components/custom/blocks/VideoPlayerPlyrBlock";

export default function PlyrHero() {
  return (
    <PlyrPlayer
      provider="html5"
      src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4"
      srcType="video/mp4"
      posterUrl="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg"
      accentColor="#6366f1"
      title="View From A Blue Moon"
      subtitle="A native file behind Plyr's accessible, fully keyboard-driven control bar."
    />
  );
}
```

### Plyr — YouTube

A YouTube embed wearing exactly the same controls as the file above.

- `provider="youtube"` accepts a watch URL or a bare video id — `src` is normalised to the embed id either way. `vimeo` works the same.
- `controls` takes Plyr's control-name array in bar order, so you can drop settings, captions or the volume slider.

```tsx
import { PlyrPlayer } from "@/components/custom/blocks/VideoPlayerPlyrBlock";

export default function PlyrYouTubeHero() {
  return (
    <PlyrPlayer
      provider="youtube"
      src="LXb3EKWsInQ"
      accentColor="#22d3ee"
      controls={["play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"]}
      title="Wilderness Unbound"
      subtitle="The same control bar in front of a YouTube embed, so both look identical."
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

## JW Player

[JW Player](https://jwplayer.com) is a licensed, remotely hosted library rather than an npm package, so `JwPlayer` loads it from a `libraryUrl` you supply and falls back to a native `<video>` if it is unavailable. The previews below run on JW's public documentation library — see the setup note under Installation before shipping.

### JW Player — default skin

JW's own control bar, untouched, around a JW-hosted playlist.

- `libraryUrl` is the JW library script. It defaults to JW's public docs library so the component works out of the box — replace it with your own player id before shipping.
- `playlistUrl` points at a JW playlist or media endpoint; use `file` instead for a plain mp4 or HLS manifest.

```tsx
import { JwPlayer } from "@/components/custom/blocks/VideoPlayerJwBlock";

export default function JwHero() {
  return (
    <JwPlayer
      libraryUrl="https://cdn.jwplayer.com/libraries/YOUR_PLAYER_ID.js"
      playlistUrl="https://cdn.jwplayer.com/v2/media/hWF9vG66"
      posterUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
      title="Enterprise-grade video delivery"
      subtitle="JW's own control bar, untouched."
    />
  );
}
```

### JW Player — skinned

The same player with a colour preset applied to the control bar, menus, time slider and tooltips.

- `skin="midnight"` picks a pre-mixed colour config — default | midnight | neon | sunset | minimal.
- `skinConfig` takes the raw JW skin object and wins over `skin`; `skinUrl` and `skinName` point at a custom stylesheet instead.

```tsx
import { JwPlayer } from "@/components/custom/blocks/VideoPlayerJwBlock";

export default function SkinnedJwHero() {
  return (
    <JwPlayer
      libraryUrl="https://cdn.jwplayer.com/libraries/YOUR_PLAYER_ID.js"
      skin="midnight"
      playlistUrl="https://cdn.jwplayer.com/v2/media/hWF9vG66"
      posterUrl="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
      title="Skinned to your brand"
      subtitle="Control bar, menus, time slider and tooltips, all from one skin config."
    />
  );
}
```

### JW Player — custom palette

A transparent control bar over your own media, with extra JW options merged into setup.

- `skin="minimal"` removes the control bar background so it sits directly on the frame.
- `playerOptions` is merged last into `jwplayer().setup()` — the escape hatch for anything the props do not cover.

```tsx
import { JwPlayer } from "@/components/custom/blocks/VideoPlayerJwBlock";

export default function BrandedJwHero() {
  return (
    <JwPlayer
      libraryUrl="https://cdn.jwplayer.com/libraries/YOUR_PLAYER_ID.js"
      file="https://cdn.example.com/media/launch-film.m3u8"
      posterUrl="https://cdn.example.com/media/launch-film.jpg"
      skinConfig={{
        controlbar: { background: "rgba(0,0,0,0)", icons: "#fafafa", iconsActive: "#f43f5e", text: "#fafafa" },
        timeslider: { progress: "#f43f5e", rail: "rgba(255,255,255,0.25)" },
      }}
      playerOptions={{ playbackRateControls: true, stretching: "uniform" }}
      title="Your palette, JW's pipeline"
      subtitle="skinConfig takes the raw JW skin object; playerOptions merges into setup()."
    />
  );
}
```

### Install the JW player

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/video-player-jw.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/video-player-jw
```

### JW Player setup

`JwPlayer` has no npm dependency: JW ships a licensed library from its own CDN, and the component loads it at runtime.

1. Create a player in the [JW Dashboard](https://dashboard.jwplayer.com) and copy its cloud-hosted library URL — `https://cdn.jwplayer.com/libraries/<PLAYER_ID>.js`.
2. Pass it as `libraryUrl`. For a self-hosted build, also pass the `licenseKey` from your player settings.
3. Leave `libraryUrl` unset only while evaluating. The default is JW's public documentation library, which carries JW's branding and can be rotated or rate-limited without notice.

If the library fails to load, the component renders a native `<video>` with the poster and a visible warning rather than a black box — so a licence problem degrades instead of breaking the page.

## Features

### Three Reveal Modes

Open in a dialog, swap the player into the card in place, or render it directly on load — one prop, no layout rewrite.

### Four Player Backends

YouTube embeds, native HTML5 video, Plyr and JW Player — sharing one hero card, one title treatment and one glow treatment.

### Deferred Media Weight

In modal and inline mode nothing but the poster loads until a click, so an embed never lands on your Largest Contentful Paint.

### Responsive Aspect Ratios

 16:9, ultrawide 21:9, classic 4:3 and square 1:1, forwarded to Plyr and JW in their own ratio formats so the frame never jumps.

### Keyboard Accessible

The play CTA is a real button, the modal is a labelled dialog, `Esc` closes it, the page behind it stops scrolling, and focus returns to the trigger.

### Themed Accent

Play buttons and progress fills read `--theme-color`, falling back to your `--primary`, so the players match the rest of the page.

## Best Practices & Guidelines

### Picking a playback mode

Use `modal` above the fold, where the video is the page's main call to action. Use `inline` mid-page — an overlay that hijacks the whole viewport from a card the reader scrolled past reads as an interruption. Use `direct` when the video is the content, such as a documentation walkthrough.

### Autoplay is a request, not a guarantee

Browsers block autoplay with sound. `autoPlay` only applies to `playbackMode="direct"`, and the native player mutes itself when it is set. In `modal` and `inline` the click is the gesture, so playback starts on its own and the component adds `autoplay=1` to the embed URL for you.

### Optimizing thumbnails

Give `thumbnailUrl` a resolution that matches your `aspectRatio`. It is the poster, the LCP candidate and — for `source="video"` — the `<video>` element's own `poster`, so a mismatched crop shows up in all three places.

### The title treatment follows playback

Before anything has played, the title and subtitle sit at the foot of the frame and stay there — nothing is happening yet, so they are free to introduce the video, and nobody should have to hover to learn what they are about to watch. Once playback starts the picture is the point, so the copy moves to a top bar that only appears on hover, the way YouTube does. It never returns to the bottom, because pausing does not undo having started. This applies to the players we draw the chrome for — the native `<video>`, Plyr and JW. A YouTube or Vimeo embed already paints its own title bar, so nothing is layered on top of it.

### Choosing a backend

Start with `VideoPlayer` — it ships no player library. Move to Plyr when you need one consistent, skinnable control bar across YouTube, Vimeo and self-hosted files. Move to JW Player when you are already on JW's platform for adaptive streaming, DRM or analytics.

## Props Reference

### VideoPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `videoUrl` | `string` | `"https://www.youtube..."` | Embed URL for `source="youtube"`, or a playable media file for `source="video"`. |
| `playbackMode` | `"modal" \| "inline" \| "direct"` | `"modal"` | How the player is revealed: a centered dialog, an in-place swap inside the card, or immediately on load with the title laid over the frame. |
| `source` | `"youtube" \| "video"` | `"youtube"` | Renders an iframe embed or a native `<video>` element. Independent of `playbackMode`. |
| `videoType` | `string` | `undefined` | MIME type on the `<source>` for `source="video"`, e.g. `video/mp4`. |
| `thumbnailUrl` | `string` | `"https://images.unsplash..."` | Poster image for the card, and the `poster` attribute of the native player. |
| `thumbnailAlt` | `string` | `"Nature Wilderness..."` | Alt text for the poster image. |
| `badge` | `string` | `"Wilderness Exploration"` | Pill badge with an animated icon, top-left over the poster. Poster hero only — `direct` mode shows just the title and subtitle. |
| `title` | `string` | `"Experience Untouched..."` | Headline, and the accessible name of the modal dialog. |
| `subtitle` | `string` | `"Embark on an immersive..."` | Secondary paragraph under the title. |
| `playButtonLabel` | `string` | `"Watch Nature Documentary"` | Label inside the glassmorphic CTA. Not rendered in `direct` mode. |
| `aspectRatio` | `"16/9" \| "21/9" \| "4/3" \| "1/1"` | `"16/9"` | Aspect ratio of the card and of the modal frame. |
| `modalSize` | `"md" \| "lg" \| "xl" \| "full"` | `"lg"` | Width of the dialog. `full` fills the viewport at 90vh. Only read in `modal` mode. |
| `autoPlay` | `boolean` | `false` | Starts playback on load. Only read in `direct` mode; the native player mutes itself when it is set. |
| `muted` / `loop` / `controls` | `boolean` | `false` / `false` / `true` | Passed to the native `<video>`. Ignored for `source="youtube"`. |
| `showOverlay` | `boolean` | `true` | The title treatment in `direct` mode: at the foot of the frame until the video is first played, then a hover-only bar at the top. `source="video"` only — an embed keeps its own title chrome. |
| `enableGlow` | `boolean` | `true` | Ambient blur gradient behind the card. |
| `onPlay` / `onClose` | `() => void` | `undefined` | Fire when the player opens and when it is dismissed. Not called in `direct` mode, which never opens or closes. |
| `className` | `string` | `undefined` | Classes on the outer wrapper. All other standard div attributes pass through. |

### PlyrPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `src` | `string` | `"https://cdn.plyr.io/..."` | A media file for `html5`; a watch URL or bare video id for `youtube` and `vimeo`. |
| `provider` | `"html5" \| "youtube" \| "vimeo"` | `"html5"` | Which backend Plyr wraps. All three get the same control bar and keyboard shortcuts. |
| `mediaType` | `"video" \| "audio"` | `"video"` | HTML5 only. `audio` drops the video frame and sizes the card to the control bar. |
| `srcType` | `string` | `"video/mp4"` | MIME type on the HTML5 `<source>`. |
| `posterUrl` | `string` | `"https://cdn.plyr.io/..."` | Poster for the HTML5 video. Embeds supply their own. |
| `accentColor` | `string` | `undefined` | Sets Plyr's `--plyr-color-main` on the wrapper — control bar, progress fill and focus ring. |
| `controls` | `string[]` | `undefined` | Plyr control names in bar order. Omit for Plyr's default set. |
| `aspectRatio` | `"16/9" \| "21/9" \| "4/3" \| "1/1"` | `"16/9"` | Frame ratio, forwarded to Plyr's own `ratio` option in `w:h` form. |
| `iconUrl` | `string` | `undefined` | Overrides Plyr's CDN icon sprite. Point it at a self-hosted `plyr.svg` to avoid a third-party request. |
| `autoPlay` / `muted` / `loop` | `boolean` | `false` | Passed to Plyr. `autoPlay` forces `muted`, since browsers block the alternative. |
| `title` / `subtitle` | `string` | `"View From A Blue Moon"` / … | Laid over the frame: at the foot until the video is first played (clear of the control bar), then a hover-only bar at the top. An audio player has no picture, so its copy sits above the bar in normal flow instead. |
| `showOverlay` | `boolean` | `true` | Whether the title/subtitle overlay renders at all. |
| `onReady` | `() => void` | `undefined` | Fires once Plyr has initialised and replaced the raw media element. |

### JwPlayer

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `libraryUrl` | `string` | `JW_DEMO_LIBRARY_URL` | JW library script. Defaults to JW's public documentation library — replace it with your own `https://cdn.jwplayer.com/libraries/<PLAYER_ID>.js` before shipping. |
| `licenseKey` | `string` | `undefined` | Only for a self-hosted library build. Cloud-hosted libraries embed their own licence. |
| `playlistUrl` | `string` | `"https://cdn.jwplayer.com/v2/media/hWF9vG66"` | A JW playlist or media endpoint. Takes precedence over `file`. |
| `file` | `string` | `undefined` | A direct mp4 or HLS manifest. Also the source of the native fallback player. |
| `posterUrl` | `string` | `"https://images.unsplash..."` | Passed to JW as `image`, and used as the fallback player's poster. |
| `skin` | `"default" \| "midnight" \| "neon" \| "sunset" \| "minimal"` | `"default"` | Pre-mixed JW colour config for the control bar, menus, time slider and tooltips. |
| `skinConfig` | `JwSkinConfig` | `undefined` | Raw JW `skin` object. Wins over `skin` when both are set. |
| `skinUrl` / `skinName` | `string` | `undefined` | An external skin stylesheet and the class name it defines, for a fully custom look. |
| `autoStart` / `muted` / `repeat` / `controls` | `boolean` | `false` / `false` / `false` / `true` | JW playback flags. `autoStart` forces `muted`. |
| `aspectRatio` | `"16/9" \| "21/9" \| "4/3" \| "1/1"` | `"16/9"` | Frame ratio, forwarded to JW's `aspectratio` in `w:h` form. |
| `playerOptions` | `Record<string, unknown>` | `undefined` | Merged last into `jwplayer().setup()`. The escape hatch for any JW option the props do not cover. |
| `title` / `subtitle` | `string` | `"Enterprise-grade video delivery"` / … | Laid over the frame: at the foot until the video is first played (clear of JW's control bar), then a hover-only bar at the top. |
| `showOverlay` | `boolean` | `true` | Whether the title/subtitle overlay renders at all. |
| `onReady` | `() => void` | `undefined` | Fires on JW's `ready` event. A failed load or setup falls back to the native player instead. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/video-player
