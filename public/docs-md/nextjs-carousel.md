# Carousel

A collection of highly interactive carousel components for image galleries, hero sections, and fluid presentations.

## Interactive Showcase

Explore the different variants of the carousel component. Switch between standard image sliders, full-width hero banners, positionable thumbnails, and GSAP-powered fluid glass sliders.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation: Standard Carousels

This installation covers the `Standard Image`, `Hero Slider`, and `Thumbnails` variations.

### 1. Copy the Component

Create a new file at `components/custom/carousel.tsx`. Navigate to the Interactive Showcase above, select any of the first three variants, click the **Component** tab, and paste the code into your file.

### 2. Usage

Import the specific named export you need from the file.

```tsx

export default function MyPage() {
  const images = ["/image1.jpg", "/image2.jpg"];

  return (

  );
}
```

## Installation: Fluid Glass Slider

This installation covers the Fluid Glass variation, which requires the GSAP animation library for its liquid mouse-tracking and smooth transitions.

```bash
npm install gsap
```

## Features
Discover the Carousel's powerful features, including touch-swipe support, autoplay functionality, and accessible navigation controls.

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

## Props Reference: ImageCarousel

        Prop
        Type
        Default
        Description

          images

          ImgSrc[]

          []
        
        Array of string URLs or Next.js StaticImageData objects.

          autoPlay

          boolean

          false
        
        If true, the carousel automatically cycles through images.

          autoPlayInterval

          number

          3000
        
        Time (in ms) before automatically switching to the next slide.

          showArrows

          boolean

          true
        
        Whether to show the previous/next navigation buttons.

          showDots

          boolean

          true
        
        Whether to show the bottom navigation dot indicators.

---

**Component Path:** `nextjs\carousel\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
