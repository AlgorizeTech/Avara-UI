# Hero Video Player

An embeddable, hardware-accelerated video preview component designed for landing pages and high-conversion hero sections. Features a glassmorphism CTA button, automatic dark/light mode responsiveness, and full keyboard accessibility.

Click the CTA in any preview to open the modal player; `Esc` closes it and focus returns to the button.

export const usageDefault = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function HeroSection() {
  return (
    
  );
}`;

export const usageAspect = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function CinematicHero() {
  // "16/9" | "21/9" | "4/3" | "1/1" — sets the thumbnail frame, not the
  // modal, so a cinematic still can still open a 16:9 player.
  return ;
}`;

export const usageAspect43 = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function ClassicHero() {
  return ;
}`;

export const usageNoGlow = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";

export default function FlatHero() {
  // Drops the ambient bloom behind the frame — better on busy backgrounds.
  return ;
}`;

export const usageModal = `import { HeroVideoPlayer } from "@/components/custom/blocks/HeroVideoPlayerBlock";
// Stand-in for whatever analytics client you already use.
const track = (event: string) => console.log(event);

export default function FullWidthHero() {
  // "md" | "lg" | "xl" | "full" — how wide the player modal opens.
  return (
     track("hero_video_opened")}
      onClose={() => track("hero_video_closed")}
    />
  );
}`;

## Installation

## Features

Discover the Hero Video Player's immersive features, including autoplay, custom overlay controls, and responsive scaling.

    Immersive Previews
    Captivate users with autoplaying, loop-ready thumbnail videos that elegantly transition into a full modal player.

    Cinematic Glow
    Optional ambient background glow derived directly from the video thumbnail for a premium, theater-like aesthetic.

    Responsive Aspect Ratios
    Natively supports standard 16:9, ultrawide 21:9, and classic 4:3 ratios, automatically scaling for mobile devices.

    Keyboard Accessible
    Fully compliant with ARIA standards, allowing users to trigger the video and dismiss the modal via keyboard navigation.

## Best Practices & Guidelines

    Optimizing Thumbnails
    Always provide a high-resolution thumbnailUrl that matches your selected aspectRatio. The ambient glow effect relies on the average color values of the thumbnail image.

    Autoplay Considerations
    When embedding YouTube or Vimeo videos via videoUrl, append ?autoplay=1 to the URL so that the video starts playing instantly when the user clicks to open the modal.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          HeroVideoPlayer

          videoUrl

          string

          "https://www.youtube..."

          The embed URL (YouTube, Vimeo, etc.) or video source string rendered
          inside the active modal dialog.

          HeroVideoPlayer

          thumbnailUrl

          string

          "https://images.unsplash..."

          High-resolution image URL displayed on the card preview before the
          modal is launched.

          HeroVideoPlayer

          thumbnailAlt

          string

          "Hero Video Thumbnail"
        
        Accessible alt text string for the background image preview.

          HeroVideoPlayer

          badge

          string

          "Next-Gen Architecture"

          Optional pill badge rendered with an animated pulse icon at the
          top-left of the preview container.

          HeroVideoPlayer

          title

          string

          "Experience the Platform..."

          The bold headline string overlaid at the bottom of the hero video
          card.

          HeroVideoPlayer

          subtitle

          string

          "Watch how our engine..."

          The secondary descriptive paragraph displayed directly below the
          title.

          HeroVideoPlayer

          playButtonLabel

          string

          "Watch Demo"

          Text label anchored inside the centered glassmorphic play button CTA.

          HeroVideoPlayer

          aspectRatio

          "16/9" | "21/9" | "4/3" | "1/1"

          "16/9"

          Controls the responsive aspect ratio dimensions of the preview card
          container.

          HeroVideoPlayer

          modalSize

          "md" | "lg" | "xl" | "full"

          "lg"

          Determines the width and height constraints of the popup modal dialog.

          HeroVideoPlayer

          enableGlow

          boolean

          true

          Toggles an ambient, theme-responsive blur gradient glow behind the
          hero player container.

          HeroVideoPlayer

          onPlay

          () =&gt; void

          undefined

          Optional callback function fired whenever the user clicks to launch
          the video modal.

          HeroVideoPlayer

          onClose

          () =&gt; void

          undefined

          Optional callback function fired whenever the video modal dialog is
          dismissed.

          HeroVideoPlayer

          className

          string

          undefined

          Custom Tailwind CSS classes applied to the outermost container
          wrapper. Also accepts all standard React HTML div attributes.

---

**Component Path:** `[framework]\hero-video-player\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
