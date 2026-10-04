/**
 * How many components Algorize UI ships, counted from the registry.
 *
 * This is the one definition of the number. Everything that prints it — site
 * copy, metadata, structured data, the Markdown docs, the README and the web
 * manifest — gets it from here, so no two places can disagree.
 *
 * A component is one registry item. A `-motion` item is the Motion build
 * of a component that is already counted under its GSAP name, so it is not
 * counted a second time.
 *
 * Node-only: `getComponentCount` reads registry.json from disk, so call it at
 * build time. next.config.ts stamps the result into the bundle, and client code
 * reads it as `COMPONENT_COUNT` from src/config/site.ts — importing the ~200 KB
 * registry into a page just to count it would ship all of it to the browser.
 */

import fs from "node:fs";
import path from "node:path";

type RegistryItem = { name: string };

/** True for the Motion build of a component, e.g. `dock-motion`. */
export const isMotionTwin = (name: string) => name.endsWith("-motion");

/** Counts the distinct components in a list of registry items. */
export function countComponents(items: readonly RegistryItem[]): number {
  return items.filter((item) => !isMotionTwin(item.name)).length;
}

/** Reads registry.json and returns the number of components it ships. */
export function getComponentCount(
  registryPath = path.join(process.cwd(), "registry.json"),
): number {
  const { items } = JSON.parse(fs.readFileSync(registryPath, "utf8")) as {
    items: RegistryItem[];
  };
  return countComponents(items);
}
