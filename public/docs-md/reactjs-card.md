# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` provides a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`) that automatically manage their own internal spacing, ensuring your layouts always look perfectly balanced regardless of what content you put inside them.

The sub-components handle their own padding, so cards stay balanced whatever you put in them.

export const usageDefault = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

export default function NotificationCard() {
  return (

        Notifications
        You have 3 unread messages.

            System Update
            A new version is available.

            Account Notice
            Please verify your email address.

          Mark all as read

  );
}`;

export const usageInteractive = `import { Card, CardHeader, CardTitle, CardDescription } from "@/components/custom/blocks/CardBlock";

export default function ClickableCards() {
  // interactive adds hover elevation, a lift, and an active press scale.
  return (
    
       console.log("Download")}>

             Download Report

            Export your analytics data as a CSV file for external processing.

       console.log("Import")}>

             Import Data

            Upload legacy customer profiles to merge into your active CRM.

  );
}`;

export const usageStats = `import { Card, CardContent, CardHeader, CardTitle } from "@/components/custom/blocks/CardBlock";

export default function StatGrid() {
  return (

        {/* Override the header's stack to lay the title and icon side by side */}
        
          Total Revenue

          $45,231.89
          +20.1% from last month

          Subscriptions

          +2350
          +180.1% from last month

          Active Now

          +573
          +201 since last hour

  );
}`;

## Installation

## Examples

## Features
Learn about the Card component's flexible layout options, including headers, footers, content areas, and interactive hover effects.

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

        Component
        Prop
        Type
        Default
        Description

          Card

          variant

          "default" | "bordered" | "flat"

          "bordered"

          Determines the visual styling of the container. bordered{" "}
          adds a subtle stroke, while flat removes shadows and
          applies a light background fill.

          Card

          interactive

          boolean

          false

          If true, applies hover states (shadow elevation, border color change,
          and slight scaling) to indicate the card is clickable.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides. Useful for adjusting the flex layout
          inside a specific CardContent or CardHeader{" "}
          block.

---

**Component Path:** `[framework]\card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
