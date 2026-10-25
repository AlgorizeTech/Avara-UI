/**
 * Loads `.env` for a build script exactly as `next build` does.
 *
 * The registry, the markdown mirror and the v0 items all print the site's URL,
 * name and registry namespace (src/config/site.ts). `next build` reads those
 * from `.env` by itself, but a script run under tsx does not — without this it
 * would fall back to the defaults and publish items that disagree with the
 * pages built a minute later.
 *
 * Import it first, before anything that reads src/config/site.ts. Variables
 * already set in the environment (CI, Easypanel, Vercel) win over the file.
 */

import path from "path";
import { loadEnvConfig } from "@next/env";

const quiet = { info: () => {}, error: console.error };

loadEnvConfig(path.resolve(__dirname, "../.."), false, quiet);
