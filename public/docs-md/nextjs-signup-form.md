# Authentication Forms

Two production-ready authentication blocks: a **Login Form** for returning users and a **Register Form** for new ones. Both ship comprehensive client-side validation, error state handling, simulated loading states, password visibility toggles and social auth button templates.

They are separate components on purpose. Sign-in and sign-up are different pages with different fields, different validation rules and different autofill hints — a browser password manager cannot offer to save a new credential on a form it thinks might be a login. Install only the one a given route needs; each has its own install command, and each command sits with the block it installs.

Both share the same `variant` and `color` surface, so a login page and a register page match without any extra work.

## Login form

Email, password, remember-me and a forgot-password link. `signupHref` points at wherever the register form lives.

export const usageLogin = `import LoginForm from "@/components/custom/blocks/LoginForm";

export default function LoginPage() {
  return (
     {
        // Call your auth provider here. Without onSubmit the block simulates
        // a round trip so it stays demonstrable on its own.
        await signIn({ email, password, remember });
      }}
    />
  );
}`;

export const usageLoginSplit = `import LoginForm from "@/components/custom/blocks/LoginForm";

export default function SplitLoginPage() {
  // "split" pairs the form with a full-height marketing panel on large screens.
  return ;
}`;

export const usageLoginGlass = `import LoginForm from "@/components/custom/blocks/LoginForm";

export default function GlassLoginPage() {
  // "glass" is translucent — it needs something behind it to read against.
  return (

  );
}`;

export const usageLoginMinimal = `import LoginForm from "@/components/custom/blocks/LoginForm";

export default function MinimalLoginPage() {
  // "minimal" strips the card, leaving just the fields on your own background.
  return ;
}`;

### Install the login form

### More login examples

Every example below is the same `LoginForm` you just installed — only the props change.

## Register form

Paired name fields, email, password with confirmation, and a terms checkbox whose links you point at your own policies. `loginHref` closes the loop back to the login form.

export const usageRegister = `import RegisterForm from "@/components/custom/blocks/RegisterForm";

export default function RegisterPage() {
  return (
     {
        // values: firstName, lastName, email, password, confirmPassword,
        // agreeToTerms. Re-validate every one of them on your server.
        await createAccount(values);
      }}
    />
  );
}`;

export const usageRegisterSplit = `import RegisterForm from "@/components/custom/blocks/RegisterForm";

export default function SplitRegisterPage() {
  // "split" pairs the form with a full-height marketing panel on large screens.
  return ;
}`;

export const usageRegisterGlass = `import RegisterForm from "@/components/custom/blocks/RegisterForm";

export default function GlassRegisterPage() {
  // "glass" is translucent — it needs something behind it to read against.
  return (

  );
}`;

export const usageRegisterMinimal = `import RegisterForm from "@/components/custom/blocks/RegisterForm";

export default function MinimalRegisterPage() {
  // "minimal" strips the card, leaving just the fields on your own background.
  return ;
}`;

### Install the register form

### More register examples

Every example below is the same `RegisterForm` you just installed — only the props change.

## Props Reference

### LoginForm

        Prop
        Type
        Default
        Description

          variant

          "default" | "split" | "glass" | "minimal"

          "default"

          Applies overarching structural layouts. split wraps the
          form in a full-width marketing panel, while glass adds
          translucent styling.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary button, focus rings and the
          remember-me checkbox. Accepts valid hex codes (e.g.{" "}
          "#00FF00").

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

          "default" | "split" | "glass" | "minimal"

          "default"

          Same four layouts as LoginForm, so a matched pair of
          pages needs no extra styling.

          color

          "indigo" | "rose" | "emerald" | "zinc" | string

          "indigo"

          Applies global color themes to the primary button, focus rings, the
          terms checkbox and the policy links. Accepts valid hex codes.

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

**Component Path:** `[framework]\signup-form\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
