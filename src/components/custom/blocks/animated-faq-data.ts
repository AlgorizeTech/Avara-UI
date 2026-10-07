// Sample data and item shape for AnimatedFAQBlock. Kept out of the component
// file so it stays a components-only module (React Fast Refresh).

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  /** Topic-matching 3D tech & abstract aesthetic photography */
  image: string;
  location: string;
  coordinates: string;
  /** Dynamic morphing dimensions for Uniserve-style slow transition */
  height: number;
  maxWidth: number;
  clipCut: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "installation",
    category: "CLI & Setup",
    question: "How do I install and use components in my project?",
    answer:
      "Installing components takes seconds using the official shadcn CLI. The code drops straight into your repository as pure TypeScript and Tailwind CSS — with zero third-party wrapper dependencies or build configuration headaches.",
    image:
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
    location: "Modular Architecture Hub",
    coordinates: "CLI • NPM • PNPM",
    height: 420,
    maxWidth: 460,
    clipCut: "2.5rem",
  },
  {
    id: "theming",
    category: "Tailwind & Theming",
    question: "Can I customize the colors, dark mode, and border radiuses?",
    answer:
      "Yes, absolutely. All components are architected around standard Tailwind CSS variables and OKLCH design tokens. Modifying your primary color, font family, or container radius automatically updates every component across both light and dark themes.",
    image:
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
    location: "Dynamic Design Tokens",
    coordinates: "OKLCH • CSS Variables",
    height: 340,
    maxWidth: 530,
    clipCut: "2rem",
  },
  {
    id: "licensing",
    category: "MIT Licensing",
    question: "Is Docs UI free to use for commercial client projects and SaaS?",
    answer:
      "Docs UI is 100% free and open-source under the permissive MIT license. You can use it in personal side projects, client portals, venture-backed SaaS applications, or commercial products with zero royalty fees or attribution requirements.",
    image:
      "https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?q=80&w=1200&auto=format&fit=crop",
    location: "Open Source Collective",
    coordinates: "MIT License • Free Forever",
    height: 390,
    maxWidth: 480,
    clipCut: "2.75rem",
  },
  {
    id: "performance",
    category: "Performance & FPS",
    question: "How do you achieve 60fps animations with zero layout shift?",
    answer:
      "Our motion components rely exclusively on GPU-accelerated CSS properties (translate3d, scale, opacity) and spring curves rendered as native CSS easing. We avoid animating height or layout reflow properties whenever possible, guaranteeing zero CLS and a 100% Lighthouse score.",
    image:
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?q=80&w=1200&auto=format&fit=crop",
    location: "GPU Motion Engine",
    coordinates: "60 FPS • Zero CLS",
    height: 330,
    maxWidth: 540,
    clipCut: "2rem",
  },
];
