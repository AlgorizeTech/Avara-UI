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

      {/* 3. Horizontal Left to Right Background Wipe */}
      }>
        Download Assets

      {/* 4. Spring Bounce Roll (Hero cubic-bezier spring bounce) */}
      
        Spring Bounce

      {/* 5. Upward Text Roll */}
      }>
        Upward Roll

      {/* 6. Downward Text Roll */}
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

## Installation

## Features

- **4-Side Animated Glowing Border**: Conic-gradient spinning line that continuously sweeps around the 4 edges of the button matching Form Engine submitting buttons.
- **Interactive Sliding Icon Physics**: `variant="slide-icon"` provides a rounded background icon on the right that slides out to the right on hover, while a new rounded icon slides in smoothly from the left.
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

          "outline" | "slide-icon" | "slide-text"

          "outline"
        
        Choose between 4-side border glow, sliding rounded icon, or vertical text roll variant.

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

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
