// Home-only stylesheet: globals.css with Tailwind limited to what this route
// imports (see src/scripts/generate-home-css.ts). Every other route loads the
// full ../globals.css itself.
import "./home.generated.css";

import { homeMetadata } from "@/lib/metadata";

import HomePage from "./home-page";

// The page itself is a client component, so its metadata lives here.
export const metadata = homeMetadata;

export default HomePage;
