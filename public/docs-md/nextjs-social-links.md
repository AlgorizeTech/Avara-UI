# Social Links

A row of brand marks that link out. Hand it the networks you have — X, GitHub, LinkedIn, YouTube, Instagram, Facebook, Discord, Dribbble, email — and it draws one tile per link, each with an accessible name, opening off-site links in a new tab.

The marks are inline SVG rather than an icon-library import, so the component keeps working whichever icon package (or version of it) a project has installed. It is the social row in every Footer variant, and fits just as well on a profile card or under an author's name.

export const usageRow = `import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function FollowUs() {
  return (
    
  );
}`;

export const usageAll = `import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function EveryNetwork() {
  return (
    
  );
}`;

export const usageByline = `import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function AuthorCard() {
  return (

        Ayesha Karim
        Design engineer, Algorize

  );
}`;

export const usageExpandReveal = `import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function ExpandShareButton() {
  return (
    
      {/* Expand Top */}

      {/* Expand Right (Default) */}

      {/* Expand Left */}

      {/* Expand Bottom */}

  );
}`;

## Installation

## Examples

## Features

    No icon package
    Brand marks are inline SVG. Lucide dropped its brand icons, so this never breaks when an icon library updates.

    Named for screen readers
    Every tile carries an aria-label and title — the network's name by default, or whatever label you pass — and a visible focus ring.

    Safe off-site links
    External links open in a new tab with noopener noreferrer. Email links stay in place, because a new tab for mailto is just an empty tab.

    Works with your router
    Pass linkComponent={"{Link}"} from next/link when some hrefs are internal; a plain anchor is the default so it runs anywhere.

## Props Reference

### SocialLinks

        Prop
        Type
        Default
        Description

        links
        SocialLink[]
        —
        The row, in order. See the shape below.

        variant
        &quot;tile&quot; | &quot;outline&quot; | &quot;ghost&quot;
        &quot;tile&quot;
        Soft fill, border, or nothing until hover.

        size
        &quot;sm&quot; | &quot;md&quot; | &quot;lg&quot;
        &quot;md&quot;
        Tile and mark size: 32, 40 or 48px.

        external
        boolean
        true
        Open links in a new tab with rel=&quot;noopener noreferrer&quot;. mailto: hrefs are exempt.

        linkComponent
        React.ElementType
        &quot;a&quot;
        The element used for each link — pass next/link for internal hrefs.

        className
        string
        —
        Applied to the row; other props are spread there too.

### SocialLink

        Field
        Type
        Description

        network
        &quot;x&quot; | &quot;github&quot; | &quot;linkedin&quot; | &quot;youtube&quot; | &quot;instagram&quot; | &quot;facebook&quot; | &quot;discord&quot; | &quot;dribbble&quot; | &quot;email&quot;
        Which mark to draw.

        href
        string
        Where it goes.

        label
        string
        Accessible name. Defaults to the network's name.

---

**Component Path:** `[framework]\social-links\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
