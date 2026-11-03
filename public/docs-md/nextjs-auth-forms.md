export const metadata = docsPageMetadata("auth-forms");

# Authentication Forms

Two production-ready authentication blocks: a **Login Form** for returning users and a **Register Form** for new ones. Both ship comprehensive client-side validation, error state handling, simulated loading states, password visibility toggles and social auth button templates.

They are separate components on purpose. Sign-in and sign-up are different pages with different fields, different validation rules and different autofill hints — a browser password manager cannot offer to save a new credential on a form it thinks might be a login. Install only the one a given route needs; each has its own install command, and each command sits with the block it installs.

Both share the same `variant` and `color` surface, so a login page and a register page match without any extra work. The fields are the library's Input and the buttons its Button, each handed the same `color`, so the whole form follows one accent and picks up any change you make to those components.

## Login form

Email, password, remember-me and a forgot-password link. `signupHref` points at wherever the register form lives.

export const usageLogin = `"use client";

export default function LoginPage() {
  const handleSubmit = async (values: LoginFormValues) => {
    // Swap this for your auth call. The button stays in its loading state
    // until the promise settles, so return the real one.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignIn = (provider: "github" | "google") => {
    console.log("Sign in with:", provider);
  };

  return (
    
  );
}`;

export const usageLoginSplit = `"use client";

export default function SplitLoginPage() {
  // "split" pairs the form with a full-height marketing panel on large screens.
  const handleSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignIn = (provider: "github" | "google") => {
    console.log("Sign in with:", provider);
  };

  return (
    
  );
}`;

export const usageLoginMinimal = `"use client";

export default function MinimalLoginPage() {
  // "minimal" strips the card, leaving just the fields on your own background.
  const handleSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignIn = (provider: "github" | "google") => {
    console.log("Sign in with:", provider);
  };

  return (
    
  );
}`;

export const usageLoginGlass = `"use client";

export default function GlassLoginPage() {
  // "glass" provides a self-contained full-bleed background with a floating frosted card.
  const handleSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignIn = (provider: "github" | "google") => {
    console.log("Sign in with:", provider);
  };

  return (
    
  );
}`;

export const usageLoginLiquidGlass = `"use client";

export default function LiquidGlassLoginPage() {
  // "liquid-glass" uses SVG displacement turbulence, specular edge highlights, and high-contrast frosted styling.
  const handleSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignIn = (provider: "github" | "google") => {
    console.log("Sign in with:", provider);
  };

  return (
    
  );
}`;

export const usageLoginRibbonDrift = `"use client";

export default function RibbonDriftLoginPage() {
  // "ribbon-drift" features dual floating infinite marquee ribbons, an animated drift backdrop, and interactive promo card.
  const handleSubmit = async (values: LoginFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
  };

  return (
    
  );
}`;

### Install the login form

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/login-form.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/login-form
```

### More login examples

Every example below is the same `LoginForm` you just installed — only the props change.

## Register form

Paired name fields, email, password with confirmation, and a terms checkbox whose links you point at your own policies. `loginHref` closes the loop back to the login form.

export const usageRegister = `"use client";

export default function RegisterPage() {
  const handleSubmit = async (values: RegisterFormValues) => {
    // values: firstName, lastName, email, password, confirmPassword, agreeToTerms.
    // Re-validate every one of them on your server.
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterScenic = `"use client";

export default function ScenicRegisterPage() {
  // "scenic" renders a floating onboarding card over a nature landscape backdrop.
  // Seamlessly adapts between light mode (frosted card) and dark mode (dark charcoal card).
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterSplit = `"use client";

export default function SplitRegisterPage() {
  // "split" pairs the form with a full-height marketing panel on large screens.
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterMinimal = `"use client";

export default function MinimalRegisterPage() {
  // "minimal" strips the card, leaving just the fields on your own background.
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterGlass = `"use client";

export default function GlassRegisterPage() {
  // "glass" provides a self-contained full-bleed background with a floating frosted card.
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterLiquidGlass = `"use client";

export default function LiquidGlassRegisterPage() {
  // "liquid-glass" uses SVG displacement turbulence, specular edge highlights, and high-contrast frosted styling.
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleSocialSignUp = (provider: "github" | "google" | "apple") => {
    console.log("Sign up with:", provider);
  };

  return (
    
  );
}`;

export const usageRegisterRibbonDrift = `"use client";

export default function RibbonDriftRegisterPage() {
  // "ribbon-drift" features dual floating infinite marquee ribbons, an animated drift backdrop, and candidate showcase promo card.
  const handleSubmit = async (values: RegisterFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(values);
  };

  const handleGoogleSignUp = () => {
    console.log("Sign up with Google");
  };

  return (
    
  );
}`;

### Install the register form

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/register-form.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/register-form
```

### More register examples

Every example below is the same `RegisterForm` you just installed — only the props change.

## Props Reference

### LoginForm

        Prop
        Type
        Default
        Description

          variant

          "default" | "split" | "liquid-glass" | "glass" | "minimal" | "ribbon-drift"

          "default"

          Applies overarching structural layouts. "split" wraps the
          form in a full-width marketing panel, "liquid-glass" adds an interactive liquid SVG glass stack, "glass" adds
          translucent styling, and "ribbon-drift" features dual infinite marquee ribbons with animated ambient gradient drift backdrop.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the primary button, focus rings and the
          remember-me checkbox. Accepts valid hex codes (e.g.{" "}
          "#8b5cf6").

          brandName

          string

          "Acme Inc."

          Brand name text displayed in the header of the split variant marketing panel.

          title / subtitle

          string

          See defaults

          Customizable headline and description displayed across all variants and the split marketing panel.

          bgImage

          string

          Cloudinary image

          Custom background image URL for glass and liquid-glass variants.

          image

          string

          Cloudinary illustration

          Hero illustration or 3D asset centered in the ribbon-drift panel.

          ribbonsTop / ribbonsBottom

          string[]

          See defaults

          Items rendered inside the top (-7deg) and bottom (+5deg) infinite floating marquee ribbons in ribbon-drift.

          promo

          object

          See defaults

          Interactive frosted promo card at the bottom of ribbon-drift featuring title, body, href, and avatars.

          signupHref

          string

          "#"

          Where the "Sign up" link at the foot of the form sends someone without
          an account — normally your RegisterForm page.

          forgotPasswordHref

          string

          "#"
        
        Target of the "Forgot password?" link.

          onSubmit

            (values: LoginFormValues) =&gt; void | Promise&lt;void&gt;

          undefined

          Called with {"{ email, password, remember }"} once
          validation passes. Omit it and the form simulates a 1.5s round trip so
          the block is demonstrable before any auth provider exists.

          onSocialSignIn

          (provider: "github" | "google") =&gt; void

          undefined

          Fires when a social button is clicked. The buttons are inert without
          it.

### RegisterForm

        Prop
        Type
        Default
        Description

          variant

          "scenic" | "default" | "split" | "liquid-glass" | "glass" | "minimal" | "ribbon-drift"

          "default"

          Distinct presentation presets. "scenic" renders a floating onboarding card over a landscape backdrop, "liquid-glass" wraps in an animated liquid SVG frosted glass stack, "glass" renders translucent panels, and "ribbon-drift" features dual infinite marquee ribbons with animated drift backdrop.

          color

          "primary" | "indigo" | "rose" | "emerald" | "zinc" | string

          "primary"

          Applies global color themes to the primary button, focus rings, the
          terms checkbox and the policy links. Accepts valid hex codes (e.g.{" "}
          "#8b5cf6").

          brandName

          string

          "Docs UI"

          Brand name text displayed in the header of the scenic variant card.

          title / subtitle

          string

          See defaults

          Customizable headline and description displayed on the scenic onboarding card.

          getStartedLabel

          string

          "Get Started"

          Label on the primary CTA button in the scenic welcome card.

          alreadyAccountLabel

          string

          "I already have an account"

          Label on the secondary action button linking to loginHref.

          bgImage

          string

          Cloudinary landscape

          Custom background image URL for the scenic variant.

          image

          string

          Cloudinary illustration

          Hero illustration or 3D asset centered in the ribbon-drift panel.

          ribbonsTop / ribbonsBottom

          string[]

          See defaults

          Items rendered inside the top (-7deg) and bottom (+5deg) infinite floating marquee ribbons in ribbon-drift.

          promo

          object

          See defaults

          Interactive frosted promo card at the bottom of ribbon-drift featuring title, body, href, and avatars.

          initialStep

          "welcome" | "options" | "email" | "otp" | "onboarding-intro" | "goals" | "finances" | "confidence" | "emergency-fund" | "first-goal" | "summary"

          "welcome"

          Starting view for the scenic variant: "welcome" (intro CTA), "options" (auth methods), "email" (registration form), "otp" (6-digit verification), "onboarding-intro" (picture overview), "goals" (area focus), "finances" (income &amp; expenses), "confidence" (rating scales), "emergency-fund" (preparation status), "first-goal" (target planner), or "summary" (financial overview).

          loginHref

          string

          "#"

          Where the "Sign in" link at the foot of the form sends someone who
          already has an account.

          termsHref / privacyHref

          string

          "#"

          Targets of the two links inside the terms checkbox label. They are
          real anchors, and clicking one does not toggle the checkbox.

          minPasswordLength

          number

          8

          Client-side minimum only. It stops an obviously-too-short password
          before a round trip; your server still enforces the real policy.

          onSubmit

            (values: RegisterFormValues) =&gt; void | Promise&lt;void&gt;

          undefined

          Called with all six fields once validation passes. Omit it and the
          form simulates a 1.5s round trip.

          onSocialSignUp

          (provider: "github" | "google") =&gt; void

          undefined

          Fires when a social button is clicked. The buttons are inert without
          it.

---

**Component Path:** `[framework]\auth-forms\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
