import type { PageVariants } from "./types";

/**
 * Infrastructure topology: 2 looks of one registry item
 * (`infrastructure-topology`), chosen with the `variant` prop. Claims come from
 * src/app/docs/[framework]/infrastructure-topology/page.mdx.
 */
export const infrastructureTopology: PageVariants = {
  slug: "infrastructure-topology",
  intro:
    "An animated infrastructure diagram: services around a central router core, with live data flowing along connected pipelines and telemetry badges.",
  gotchas: [
    "Both are looks of the one `infrastructure-topology` item: install it once and set `variant` (`orbit` or `pulse`) from the index.",
  ],
  variants: [
    {
      id: "orbit",
      label: "Orbital mesh",
      summary: "Glassmorphic mesh with curved Bezier pipelines, travelling packet orbs and counter-rotating core rings. The default.",
      bestFor: ["a showpiece network or microservices diagram"],
      avoidIf: ["you want a flat, grid-like pipeline layout"],
      traits: ["curved pipelines", "travelling packets", "rotating core rings", "default look"],
      item: "infrastructure-topology",
      demo: "infrastructure-topology",
      example: "Orbital Mesh",
      props: { variant: "orbit" },
      setProps: { variant: "orbit" },
    },
    {
      id: "pulse",
      label: "Pulse pipeline",
      summary: "Clean ambient surface with a 3-column pipeline layout, expanding core ripples and energy-beam pulses.",
      bestFor: ["a tidy request-flow diagram that reads left to right"],
      avoidIf: ["you want curved orbital paths"],
      traits: ["3-column layout", "core ripple waves", "energy beams"],
      item: "infrastructure-topology",
      demo: "infrastructure-topology",
      example: "Pulse Pipeline",
      props: { variant: "pulse" },
      setProps: { variant: "pulse" },
    },
  ],
};
