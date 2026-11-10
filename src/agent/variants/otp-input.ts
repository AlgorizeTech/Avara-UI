import type { PageVariants } from "./types";

/**
 * OTP input: 2 styles of one registry item (`otp-input`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/otp-input/page.mdx.
 */
export const otpInput: PageVariants = {
  slug: "otp-input",
  intro: "A multi-box input for one-time passwords and 2FA codes with paste support, arrow-key navigation and backspace handling, in two styles: boxed or underlined.",
  gotchas: [
    "Both are looks of the one `otp-input` item: install it once and set `variant` from the index.",
    "`value` and `onChange` work with the assembled string, not an array; `onComplete` fires once every box is filled.",
  ],
  variants: [
    {
      id: "default",
      label: "Boxed",
      summary: "A row of separate boxes, six by default. The default look.",
      bestFor: ["a verification step that should clearly read as a code entry"],
      avoidIf: ["you want a lighter, line-only field"],
      traits: ["separate boxes", "default look", "`length` prop"],
      item: "otp-input",
      demo: "otp-input",
      example: "OTP Input",
      props: { length: 6 },
    },
    {
      id: "underlined",
      label: "Underlined",
      summary: "Each box is reduced to a baseline rule.",
      bestFor: ["a minimal, editorial verification screen"],
      avoidIf: ["you want each digit in its own box"],
      traits: ["baseline rules"],
      item: "otp-input",
      demo: "otp-input",
      example: "Underlined",
      props: { variant: "underlined" },
      setProps: { variant: "underlined" },
    },
  ],
};
