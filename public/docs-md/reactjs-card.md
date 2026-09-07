# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` and `ProductCardBlock` provide a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`, `ProductCard`) that automatically manage internal spacing and interactive states.

export const usageEcommerce = `import { ProductCard } from "@/components/custom/blocks/ProductCardBlock";

export default function EcommerceProductCardsDemo() {
  return (
    
      {/* Product Card 1: Standard Best Seller */}
       console.log("Added to cart")}
      />

      {/* Product Card 2: Apparel with Interactive Colors */}
       console.log("Quick View")}
      />

      {/* Product Card 3: Tech Gadget with Buy Now */}
       console.log("Proceeding to checkout")}
      />
    
  );
}`;

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

export const usageInteractive = `export default function ClickableCards() {
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

          Total Revenue

          $45,231.89
          +20.1% from last month

  );
}`;

export const usageEditorial = `import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

export default function LeadStoryCard() {
  return (
    
      {/* Cover art sits outside CardHeader so it can bleed to the edges */}

          240 ms trace

          Performance

          The quiet cost of a re-render

          A dashboard that only felt slow on Mondays, and the six components that explained it.

          PR

          Priya Raman
          4 March
        
        8 min

  );
}`;

export const usageProfile = `export default function ProfileCard() {
  const [following, setFollowing] = useState(false);

  return (
    
      {/* Cover band — the avatar overlaps its lower edge */}

            AK

          Ayesha Karim
          Design engineer at Northwind

          {[
            ["128", "Components"],
            ["342", "Merged PRs"],
            ["96", "Reviews"],
          ].map(([value, label]) => (
            
              {value}
              {label}
            
          ))}

         setFollowing((v) => !v)}
          className={\`inline-flex flex-1 items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors \${
            following
              ? "border-border hover:bg-muted"
              : "border-violet-600 bg-violet-600 text-white hover:bg-violet-500"
          }\`}
        >
          {following ?  : }
          {following ? "Following" : "Follow"}

           Message

  );
}`;

export const usagePricing = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";

const FEATURES = [
  "Everything in Starter",
  "Figma kit and tokens",
  "Private registry",
  "Priority patches",
];

export default function FeaturedPlanCard() {
  return (
    // The featured tier inverts the surface instead of adding a gradient

          Team
          
            Most picked

          $24
          per seat, per month

          Keep one design system in sync across a team.

          {FEATURES.map((feature) => (

              {feature}
            
          ))}

          Choose Team

  );
}`;

export const usageTicket = `import { Card } from "@/components/custom/blocks/CardBlock";

export default function BoardingPassCard() {
  return (
    // sm:flex-row turns the column into two panels the perforation runs between

        Meridian Air
        Flight MR 214, Saturday 12 April

            DAC
            09:40

            5 h 25 m, nonstop

            SIN
            15:05

      {/* Tear-off stub: dashed edge plus two holes filled with the page colour */}

        Seat
        14A
        
        MR214 12APR

  );
}`;

export const usageMedia = `const WAVEFORM = [22, 34, 48, 40, 62, 76, 58, 44, 68, 88, 72, 54, 38, 46, 60, 82, 96, 78];
const TRACK_LENGTH = 214;

const formatTime = (s) => \`\${Math.floor(s / 60)}:\${String(s % 60).padStart(2, "0")}\`;

export default function NowPlayingCard() {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(72);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(
      () => setElapsed((v) => (v >= TRACK_LENGTH ? 0 : v + 1)),
      1000,
    );
    return () => clearInterval(id);
  }, [playing]);

  const progress = elapsed / TRACK_LENGTH;

  return (
    
      {/* Art panel — the record turns only while the track is playing */}

          Ceiling Fan Blues
          Lila Moreau Trio

        {/* A real range input sits invisibly over the bars, so seeking works
            with a pointer and a keyboard both */}

            {WAVEFORM.map((height, i) => (
              
            ))}
          
           setElapsed(Number(e.target.value))}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          />

          {formatTime(elapsed)}
          {formatTime(TRACK_LENGTH)}

           setPlaying((v) => !v)}
            className="grid size-11 place-items-center rounded-full bg-indigo-600 text-white hover:bg-indigo-500"
          >
            {playing ?  : }

  );
}`;

## Installation

## Examples

## Features
Learn about the Card component's flexible layout options, including headers, footers, content areas, and interactive hover effects.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Composable
    Mix and match sub-components to create complex card layouts effortlessly.

---

**Component Path:** `[framework]\card\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
