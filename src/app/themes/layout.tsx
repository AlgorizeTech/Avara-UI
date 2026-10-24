import { ReactNode } from "react";

import { pageMetadata } from "@/lib/docs-metadata";

// The page itself is a client component, so its metadata lives here.
export const metadata = pageMetadata({
  title: "Themes - Avara UI",
  description:
    "Pick a preset or customise colours, radius and fonts, preview them across the components, and copy the CSS variables into your global stylesheet.",
  url: "/themes",
});

export default function ThemesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
