export const metadata = docsPageMetadata("button");

# Button

An animated glowing-border Button component engineered with a spinning conic-gradient line tracking the 4 edges of the button, smooth click ripple physics, loading states, and full theme synchronization.

The glowing border animation continuously spins around the 4 sides of the button matching the form submitting engine animation.

export const usageDefault = `import Button from "@/components/custom/blocks/Button";

export default function GlowingBorderButtonDemo() {
  return (
    
      {/* 1. Continuous 4-Edge Conic Spinning Border Line */}
      }>
        Spinning Border

      {/* 2. Continuous Radar Ping Waves */}
      }>
        Radar Ping

      {/* 3. Continuous Cosmic Orbit Light Ring */}
      }>
        Cosmic Orbit

  );
};`;

export const usageSlideIcon = `import Button from "@/components/custom/blocks/Button";

export default function MotionButtonDemo() {
  return (
    
      {/* 1. Icon Left Radial Expanding Background Fill */}
      }>
        Send Message

      {/* 2. Interactive Sliding Rounded Icon Physics */}
      }>
        Explore Features

      {/* 3. Looping Rounded Icon (arrow cycles through the circle on its own) */}
      }>
        Keep Reading

      {/* 4. Raised 3D face over a darker edge - sinks on hover, presses on click */}
      }>
        Get Started

      {/* 5. Horizontal Left to Right Background Wipe */}
      }>
        Download Assets

      {/* 6. Spring Bounce Roll (Hero cubic-bezier spring bounce) */}
      
        Spring Bounce

      {/* 7. Upward Text Roll */}
      }>
        Upward Roll

      {/* 8. Downward Text Roll */}
      }>
        Downward Roll

  );
}`;

export const usageIconOnly = `import Button from "@/components/custom/blocks/Button";

export default function IconOnlyButtonDemo() {
  return (
    
      } />
      } />
      } />
      } />
      } />
      } />
      } />
      } />
    
  );
}`;

export const usageSocial = `import Button from "@/components/custom/blocks/Button";

export default function SocialButtonDemo() {
  return (
    
      }>
        Login with Email
      
      }>
        Continue with Google
      
      }>
        Continue with GitHub
      
      }>
        Login with Facebook
      
      }>
        Login with X
      
      }>
        Login with Apple
      
      }>
        Login with Microsoft
      
      }>
        Login with Slack
      
      }>
        Login with LinkedIn

  );
}`;

export const usageShardsPanel = `"use client";

const EFFECT_MODES: Record = {
  "One time": "once",
  Continuous: "continuous",
};

export default function ControlButtonsDemo() {
  const [effectMode, setEffectMode] = useState("once");

  return (
    
      {/* 0. Effect mode picker: one-time plays or continuous loops */}
       setEffectMode(EFFECT_MODES[label])}
        className="sm:col-span-2 lg:col-span-1"
      />

      {/* 1. Color Picker Button - shimmer on every pick, tinted with the colour */}

      {/* 2. Dropdown Select Button - beams orbit the edge on a new pick */}

      {/* 3. Range Slider Button - sparkles when dragged to full */}

      {/* 4. Toggle Switch Button - beacon pings when switched on */}

  );
}`;

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/button
```

## Features

- **4-Side Animated Glowing Border**: Conic-gradient spinning line that continuously sweeps around the 4 edges of the button matching Form Engine submitting buttons.
- **Interactive Sliding Icon Physics**: `variant="slide-icon"` provides a rounded background icon on the right that slides out to the right on hover, while a new rounded icon slides in smoothly from the left.
- **Looping Icon Motion**: `variant="slide-icon-loop"` keeps the same rounded icon on the right, but the arrow continuously exits to the right and re-enters from the left inside the circle, without any hover.
- **3D Press**: `variant="3d"` stacks a raised primary face over a darkened edge and a soft ground shadow. Hover lowers the face a step; pressing seats it on the edge, so the click reads as a real push.
- **Vertical Text Roll Animation**: `variant="slide-text"` moves the button text smoothly upwards on hover while another text label rolls up smoothly into position from below.
- **Ripple Click Physics**: Interactive radial ripple expansion on mouse click.
- **Loading Spinners**: Built-in async state handling with interactive disabled states.
- **Full Theme Color Syncing**: Automatically inherits site primary CSS variables (`var(--primary)`).

## Props Reference

        Prop
        Type
        Default
        Description

          variant

          "outline" | "slide-icon" | "slide-icon-loop" | "slide-text" | "3d" | "shards-control"

          "outline"
        
        Choose between 4-side border glow, sliding rounded icon, looping rounded icon, vertical text roll, raised 3D press, or dark glass parameter control tile.

          controlType

          "color" | "select" | "slider" | "toggle"

          "select"
        
        Input type for variant="shards-control" (color picker, select dropdown, range slider, or toggle switch).

          label · value · options

          string | number | string[]

          —
        
        Label title, active value, and option choices for control tiles.

          effect

          "none" | "sparkle" | "orbit" | "beacon" | "shimmer"

          undefined

          Effect a control tile plays when a slider reaches full, a toggle switches on, or a select / colour pick changes. sparkle is a floor glow with twinkling specks, orbit runs two beams around the edge, beacon pings rings outward, shimmer wipes a bright band across. Unset keeps the built-in feedback (slider beacon at full, colour burst); "none" turns all of it off.

          effectMode

          "once" | "continuous"

          "once"

          once plays a single time per change; continuous loops while the tile is active.

          effectActive

          boolean

          —

          Forces a continuous effect on or off. By default it runs while the slider is full, the toggle is on, or once a select / colour tile has been picked.

          size

          "default" | "sm" | "lg"

          "default"
        
        Controls the padding and height of the button.

          loading

          boolean

          false

          If true, replaces the leading icon with a spinner and disables user interaction.

          iconLeft

          React.ReactNode

          undefined
        
        Renders an icon or element to the left of the text.

          iconRight

          React.ReactNode

          undefined
        
        Renders an icon or element to the right of the text.

---

**Component Path:** `[framework]\button\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
