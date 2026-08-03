# Button

A highly customizable, interactive button primitive. Features a built-in radial ripple animation on click, native loading states, custom SVGs for social media integration, and support for leading/trailing icons.

## Interactive Showcase

Use the control panel below to cycle through the different button permutations, ranging from basic sizing and variants to specific e-commerce and social login implementations.

_Click the **Code** tab in the preview below to copy the full component engine._

## Installation

### 1. Copy the Core Primitive

The main button component manages its own `ripple` state and injects the necessary CSS keyframes dynamically on mount.

Create a new file at `components/custom/button.tsx` and copy the engine code from the Interactive Showcase above.

### 2. Copy the SVG Icons (Optional)

To use the exact social media and UI icons demonstrated in the showcase, you can copy the full icon set into your project.

Create a new file at `components/custom/icons.tsx` and paste the following code:

```tsx

// Social Media Icons
export const GoogleIcon = () => (

);

export const GitHubIcon = () => (

);

export const TwitterIcon = () => (

);

export const FacebookIcon = () => (

);

export const EmailIcon = () => (

);

export const XIcon2 = () => (

);

export const AppleIcon = () => (

);

export const MicrosoftIcon = () => (

);

export const SlackIcon = () => (

);

export const LinkedInIcon = () => (

);

// Action Icons
export const DownloadIcon = () => (

);

export const ShoppingCartIcon = () => (

);

export const HeartIcon = () => (

);

export const StarIcon = () => (

);

export const ShareIcon = () => (

);

export const PlusIcon = () => (

);

export const MinusIcon = () => (

);

export const CheckIcon = () => (

);

export const XIcon = () => (

);

export const ArrowRightIcon = () => (

);

export const ArrowLeftIcon = () => (

);

export const SettingsIcon = () => (

);

export const SearchIcon = () => (

);

export const BellIcon = () => (

);

export const MailIcon = () => (

);

export const PhoneIcon = () => (

);
```

## Features
Discover the versatility of Modern Buttons with support for various variants, sizes, loading states, and icons.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

            "default" | "destructive" | "outline" | "secondary" | "ghost" |
            "link"

          "default"
        
        The visual style to apply to the button.

          size

          "default" | "sm" | "lg"

          "default"
        
        Controls the padding and height of the button.

          loading

          boolean

          false

          If true, replaces the leading icon with a spinner and disables user
          interaction.

          iconLeft

          React.ReactNode

          undefined
        
        Renders an icon or element to the left of the text.

          iconRight

          React.ReactNode

          undefined
        
        Renders an icon or element to the right of the text.

---

**Component Path:** `nextjs\button\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
