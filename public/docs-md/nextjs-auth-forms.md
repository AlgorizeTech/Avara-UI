---
title: "Shadcn Login & Signup Form"
description: "Two production-ready authentication blocks: a Login Form for returning users and a Register Form for new ones. Free shadcn/ui block for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/auth-forms
---

# Shadcn Login & Signup Form

Two production-ready authentication blocks: a **Login Form** for returning users and a **Register Form** for new ones. Both ship comprehensive client-side validation, error state handling, simulated loading states, password visibility toggles and social auth button templates.

They are separate components on purpose. Sign-in and sign-up are different pages with different fields, different validation rules and different autofill hints — a browser password manager cannot offer to save a new credential on a form it thinks might be a login. Install only the one a given route needs; each has its own install command, and each command sits with the block it installs.

Both share the same `variant` and `color` surface, so a login page and a register page match without any extra work. The fields are the library's [Input](https://avaraui.com/docs/nextjs/input) and the buttons its [Button](https://avaraui.com/docs/nextjs/button), each handed the same `color`, so the whole form follows one accent and picks up any change you make to those components.

## Login form

Email, password, remember-me and a forgot-password link. `signupHref` points at wherever the register form lives.

### Login

Email and password with a remember-me checkbox and a forgot-password link, all validated on submit.

- Set `color="lavender" | "indigo" | "rose" | "emerald" | "zinc" | "primary" | "#hex"` themes the primary submit button, input focus rings, and remember-me checkbox.
- `onSubmit` receives the validated credentials. Leave it off and the block simulates a round trip, so the preview works before any auth provider exists.

```tsx
"use client";


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
    <LoginForm
      variant="default"
      color="indigo"
      title="Welcome back"
      subtitle="Enter your details to access your account."
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onSocialSignIn={handleSocialSignIn}
    />
  );
}
```

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

### Login — split

- Set `variant="split"` to pair the form with a full-height marketing panel on large screens.

```tsx
"use client";


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
    <LoginForm
      variant="split"
      color="indigo"
      brandName="Acme Inc."
      title="Welcome back. Pick up where you left off."
      subtitle="Your projects, deployments and team are exactly as you left them. Sign in to get straight back to work."
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onSocialSignIn={handleSocialSignIn}
    />
  );
}
```

### Login — minimal

- Set `variant="minimal"` to strip the card away and leave the fields on your own background.

```tsx
"use client";


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
    <LoginForm
      variant="minimal"
      color="indigo"
      title="Welcome back"
      subtitle="Enter your details to access your account."
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onSocialSignIn={handleSocialSignIn}
    />
  );
}
```

### Login — glass

- Set `variant="glass"` to go translucent — intended to sit over a photo or gradient.
- `bgImage` Cloudinary or CDN image URL for the full-bleed frosted backdrop.

```tsx
"use client";


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
    <LoginForm
      variant="glass"
      color="indigo"
      title="Welcome back"
      subtitle="Enter your details to access your account."
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onSocialSignIn={handleSocialSignIn}
    />
  );
}
```

### Login — liquid-glass

- Set `variant="liquid-glass"` to wrap the form in a multi-layered liquid glass effect with dynamic SVG displacement waves, specular edge highlights, and high-contrast styling.
- `bgImage` Cloudinary or CDN image URL for the animated displacement backdrop.

```tsx
"use client";


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
    <LoginForm
      variant="liquid-glass"
      color="indigo"
      title="Welcome back"
      subtitle="Enter your details to access your account."
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onSocialSignIn={handleSocialSignIn}
    />
  );
}
```

### Login — ribbon-drift

- Set `variant="ribbon-drift"` to wrap the form in a split layout with infinite drifting marquee ribbons, dynamic ambient gradient glow, and an interactive floating promo card.
- `image` Cloudinary or image URL positioned between the layered ribbons.

```tsx
"use client";


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
    <LoginForm
      variant="ribbon-drift"
      color="indigo"
      heading="Welcome back"
      lead="Sign in to review your candidates, screening answers and interview recordings in one place."
      image="https://res.cloudinary.com/dygyhxplr/image/upload/v1791725870/upload/update27-2-1791725870473.webp"
      signupHref="#"
      forgotPasswordHref="#"
      onSubmit={handleSubmit}
      onGoogle={handleGoogleSignIn}
    />
  );
}
```

## Register form

Paired name fields, email, password with confirmation, and a terms checkbox whose links you point at your own policies. `loginHref` closes the loop back to the login form.

### Register

Name fields, a confirm-password field and a terms checkbox, all validated on submit.

- Set `color="lavender" | "indigo" | "rose" | "emerald" | "zinc" | "primary" | "#hex"` themes the primary submit button, input focus rings, terms checkbox, and policy links.
- `minPasswordLength` sets the client-side minimum (8 by default). It stops an obviously-too-short password before a round trip — your server still enforces the real policy.

```tsx
"use client";


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
    <RegisterForm
      variant="default"
      color="indigo"
      title="Create an account"
      subtitle="Start your 14-day free trial. No credit card required."
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

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

### Register — scenic

- Set `variant="scenic"` to place a floating onboarding card with an interactive welcome and registration flow over a full-bleed scenic nature backdrop. Adapts smoothly between light mode (frosted card) and dark mode (dark charcoal card).
- `bgImage` optional Cloudinary or CDN image URL for the scenic landscape backdrop.

```tsx
"use client";


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
    <RegisterForm
      variant="scenic"
      brandName="Docs UI"
      title="Take control of your financial wellbeing"
      subtitle="Understand your money, build healthier habits, and make confident financial decisions"
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
      getStartedLabel="Get Started"
      alreadyAccountLabel="I already have an account"
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

### Register — split

- Set `variant="split"` to pair the form with a full-height marketing panel on large screens. The illustration mirrors the fields beside it.

```tsx
"use client";


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
    <RegisterForm
      variant="split"
      color="indigo"
      brandName="Acme Inc."
      title="Start building your next big idea."
      subtitle="Join thousands of developers who are already using our platform to build the future of software."
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

### Register — minimal

- Set `variant="minimal"` to strip the card away and leave the fields on your own background.

```tsx
"use client";


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
    <RegisterForm
      variant="minimal"
      color="indigo"
      title="Create an account"
      subtitle="Start your 14-day free trial. No credit card required."
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

### Register — glass

- Set `variant="glass"` to go translucent — intended to sit over a photo or gradient.
- `bgImage` Cloudinary or CDN image URL for the full-bleed frosted backdrop.

```tsx
"use client";


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
    <RegisterForm
      variant="glass"
      color="indigo"
      title="Create an account"
      subtitle="Start your 14-day free trial. No credit card required."
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

### Register — liquid-glass

- Set `variant="liquid-glass"` to wrap the registration form in a multi-layered liquid glass effect with dynamic SVG displacement waves, specular edge highlights, and high-contrast styling.
- `bgImage` Cloudinary or CDN image URL for the animated displacement backdrop.

```tsx
"use client";


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
    <RegisterForm
      variant="liquid-glass"
      color="indigo"
      title="Create an account"
      subtitle="Start your 14-day free trial. No credit card required."
      bgImage="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg"
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onSocialSignUp={handleSocialSignUp}
    />
  );
}
```

### Register — ribbon-drift

- Set `variant="ribbon-drift"` to wrap the register form in an animated silk drift background with dual infinite marquee ribbons, candidate showcase promo card, and full client-side validation.
- `image` Cloudinary or WebP illustration URL centered between the floating ribbons.
- `heading` Custom main headline shown on the registration card.
- `lead` Custom subtitle text displayed below the headline.

```tsx
"use client";


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
    <RegisterForm
      variant="ribbon-drift"
      color="indigo"
      heading="Create your account"
      lead="Set up a role, add your screening questions, and let AI interview every qualified applicant."
      image="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1793701432/register-hero-1793701431524.png"
      loginHref="#"
      termsHref="#"
      privacyHref="#"
      onSubmit={handleSubmit}
      onGoogle={handleGoogleSignUp}
    />
  );
}
```

## Props Reference

### LoginForm

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "split" \| "liquid-glass" \| "glass" \| "minimal" \| "ribbon-drift"` | `"default"` | Applies overarching structural layouts. `"split"` wraps the form in a full-width marketing panel, `"liquid-glass"` adds an interactive liquid SVG glass stack, `"glass"` adds translucent styling, and `"ribbon-drift"` features dual infinite marquee ribbons with animated ambient gradient drift backdrop. |
| `color` | `"primary" \| "lavender" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies global color themes to the primary button, focus rings and the remember-me checkbox. Accepts valid hex codes (e.g. `"#8b5cf6"`). |
| `brandName` | `string` | `"Acme Inc."` | Brand name text displayed in the header of the `split` variant marketing panel. |
| `title` / `subtitle` | `string` | See defaults | Customizable headline and description displayed across all variants and the `split` marketing panel. |
| `bgImage` | `string` | Cloudinary image | Custom background image URL for `glass` and `liquid-glass` variants. |
| `image` | `string` | Cloudinary illustration | Hero illustration or 3D asset centered in the `ribbon-drift` panel. |
| `ribbonsTop` / `ribbonsBottom` | `string[]` | See defaults | Items rendered inside the top (-7deg) and bottom (+5deg) infinite floating marquee ribbons in `ribbon-drift`. |
| `promo` | `object` | See defaults | Interactive frosted promo card at the bottom of `ribbon-drift` featuring `title`, `body`, `href`, and `avatars`. |
| `signupHref` | `string` | `"#"` | Where the "Sign up" link at the foot of the form sends someone without an account — normally your `RegisterForm` page. |
| `forgotPasswordHref` | `string` | `"#"` | Target of the "Forgot password?" link. |
| `onSubmit` | `(values: LoginFormValues) => void \| Promise<void>` | `undefined` | Called with `{ email, password, remember }` once validation passes. Omit it and the form simulates a 1.5s round trip so the block is demonstrable before any auth provider exists. |
| `onSocialSignIn` | `(provider: "github" \| "google") => void` | `undefined` | Fires when a social button is clicked. The buttons are inert without it. |

### RegisterForm

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"scenic" \| "default" \| "split" \| "liquid-glass" \| "glass" \| "minimal" \| "ribbon-drift"` | `"default"` | Distinct presentation presets. `"scenic"` renders a floating onboarding card over a landscape backdrop, `"liquid-glass"` wraps in an animated liquid SVG frosted glass stack, `"glass"` renders translucent panels, and `"ribbon-drift"` features dual infinite marquee ribbons with animated drift backdrop. |
| `color` | `"primary" \| "lavender" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| string` | `"primary"` | Applies global color themes to the primary button, focus rings, the terms checkbox and the policy links. Accepts valid hex codes (e.g. `"#8b5cf6"`). |
| `brandName` | `string` | `"Docs UI"` | Brand name text displayed in the header of the `scenic` variant card. |
| `title` / `subtitle` | `string` | See defaults | Customizable headline and description displayed on the `scenic` onboarding card. |
| `getStartedLabel` | `string` | `"Get Started"` | Label on the primary CTA button in the `scenic` welcome card. |
| `alreadyAccountLabel` | `string` | `"I already have an account"` | Label on the secondary action button linking to `loginHref`. |
| `bgImage` | `string` | Cloudinary landscape | Custom background image URL for the `scenic` variant. |
| `image` | `string` | Cloudinary illustration | Hero illustration or 3D asset centered in the `ribbon-drift` panel. |
| `ribbonsTop` / `ribbonsBottom` | `string[]` | See defaults | Items rendered inside the top (-7deg) and bottom (+5deg) infinite floating marquee ribbons in `ribbon-drift`. |
| `promo` | `object` | See defaults | Interactive frosted promo card at the bottom of `ribbon-drift` featuring `title`, `body`, `href`, and `avatars`. |
| `initialStep` | `"welcome" \| "options" \| "email" \| "otp" \| "onboarding-intro" \| "goals" \| "finances" \| "confidence" \| "emergency-fund" \| "first-goal" \| "summary"` | `"welcome"` | Starting view for the `scenic` variant: `"welcome"` (intro CTA), `"options"` (auth methods), `"email"` (registration form), `"otp"` (6-digit verification), `"onboarding-intro"` (picture overview), `"goals"` (area focus), `"finances"` (income &amp; expenses), `"confidence"` (rating scales), `"emergency-fund"` (preparation status), `"first-goal"` (target planner), or `"summary"` (financial overview). |
| `loginHref` | `string` | `"#"` | Where the "Sign in" link at the foot of the form sends someone who already has an account. |
| `termsHref` / `privacyHref` | `string` | `"#"` | Targets of the two links inside the terms checkbox label. They are real anchors, and clicking one does not toggle the checkbox. |
| `minPasswordLength` | `number` | `8` | Client-side minimum only. It stops an obviously-too-short password before a round trip; your server still enforces the real policy. |
| `onSubmit` | `(values: RegisterFormValues) => void \| Promise<void>` | `undefined` | Called with all six fields once validation passes. Omit it and the form simulates a 1.5s round trip. |
| `onSocialSignUp` | `(provider: "github" \| "google") => void` | `undefined` | Fires when a social button is clicked. The buttons are inert without it. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/auth-forms
