import "../globals.css";
import { ReactNode } from "react";

import { SITE_NAME } from "@/config/site";
import { pageMetadata } from "@/lib/docs-metadata";

// The page itself is a client component, so its metadata lives here.
export const metadata = {
  ...pageMetadata({
    title: `Shadcn Theme Generator & Customizer - ${SITE_NAME}`,
    description:
      "Pick a preset or customise colours, radius and fonts, preview them across the components, and copy the CSS variables into your global stylesheet.",
    url: "/themes",
  }),
  keywords: [
    "shadcn theme generator",
    "shadcn themes",
    "shadcn ui theme",
    "tailwind css theme generator",
    "shadcn css variables",
    "shadcn dark mode theme",
  ],
};

export default function ThemesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
