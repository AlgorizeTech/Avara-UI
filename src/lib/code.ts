import fs from "fs";
import path from "path";

export const extractCode = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");

  return fileContent;
};

/**
 * Both builds of a component that ships a GSAP default and a Motion
 * twin, for a `code` field: the twin is the same basename in the `motion/`
 * folder beside it.
 *
 *   code: extractMotionCode("src/components/custom/blocks/DockBlock.tsx")
 *
 * Throws at build time when the twin is missing, rather than rendering a Code
 * tab that silently shows GSAP under the Motion tab.
 */
export const extractMotionCode = (filePath: string) => {
  const twin = path.join(path.dirname(filePath), "motion", path.basename(filePath));
  if (!fs.existsSync(twin)) {
    throw new Error(`extractMotionCode: no Motion twin at ${twin}`);
  }
  return { gsap: extractCode(filePath), motion: extractCode(twin) };
};
