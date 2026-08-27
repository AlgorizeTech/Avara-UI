# Particle Canvas

An ultra-responsive, high-performance 2D HTML Canvas component that converts text into thousands of interactive particles with fluid, organic repulsion physics matching your active theme color.

Move your cursor or touch across the canvas to push particles away; they scatter organically and spring back smoothly to their original text positions when the pointer moves away.

export const usageDefault = `"use client";

export default function ParticleCanvasDemo() {
  return (

  );
}`;

## Installation

## Features

Discover the key capabilities that make this component an excellent choice for modern interactive user interfaces.

    Theme Adaptive
    Automatically resolves and matches the active navigation item background color (bg-primary) across Light and Dark mode.

    Organic Physics
    Cursor repulsion features staggered particle turbulence and spring-damped return physics for a fluid tactile feel.

    Multi-Device Breakpoints
    Automatically scales particle parameters across Small (&lt;768px), Medium (768px-1023px), and Large (&ge;1024px) viewports.

    60 FPS Canvas
    Built with an offscreen sampling engine and efficient 2D rendering loops for maximum performance.

## Best Practices & Guidelines

    Canvas Breakpoint Scaling
    Automatically adapts particle parameters based on screen size: Large (&gt;=1024px) uses particleGap = 5px, particleSize = 2.5px, MD (768px-1023px) uses particleGap = 4px, particleSize = 2px, and Small (&lt;768px) uses particleGap = 3px, particleSize = 1.5px.

    Container Height & Layout
    Wrap the component in a fixed or responsive height container (e.g. h-[650px] or h-screen). The canvas automatically resizes to fill 100% of its parent element.

## Props Reference

        Prop
        Type
        Default
        Description

        content
        string
        "AlgorizeTech"
        The text string to convert into animated particles.

        variant
        "repel"
        "repel"
        Organic staggered repulsion physics variant where particles react dynamically to cursor movement.

        particleSize
        number
        2.5
        Radius of each particle dot on Large displays (MD uses 2.0px, Small uses 1.5px).

        particleGap
        number
        5
        Sampling stride gap between dots on Large displays (MD uses 4px, Small uses 3px).

        speed
        number
        1
        Animation speed multiplier for physics updates.

        color
        string
        adaptive
        Optional custom particle color. Matches header active theme color by default for all dots.

        backgroundColor
        string
        "transparent"
        Canvas container background color.

        interactive
        boolean
        true
        Enables mouse and touch repulsion tracking.

---

**Component Path:** `[framework]\particle-canvas\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
