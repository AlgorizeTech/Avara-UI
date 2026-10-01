// Sample data and item shape for FAQSection. Kept out of the component file so
// it stays a components-only module (React Fast Refresh).

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  /** Pure sunlit nature photography */
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1464822759023-fed622ff2c3b-1790145143491-1790224284663.webp",
    location: "Mount Rainier National Park, Washington",
    coordinates: "46.8523° N, 121.7603° W",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1448375240586-882707db888b-1790145143491-1790224284683.webp",
    location: "Cascades Redwood Rainforest, Oregon",
    coordinates: "43.7694° N, 122.5694° W",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224285/photo-1507525428034-b723cf961d3e-1790146212208-1790224284653.webp",
    location: "Big Sur Pacific Coastline, California",
    coordinates: "36.2704° N, 121.8081° W",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1506744038136-46273834b3fb-1790146212208-1790224284681.webp",
    location: "Tre Cime di Lavaredo, Italian Dolomites",
    coordinates: "46.6186° N, 12.3028° E",
    height: 330,
    maxWidth: 540,
    clipCut: "2rem",
  },
];
