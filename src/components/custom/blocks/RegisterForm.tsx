"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Button from "./Button";
import { GitHubIcon, GoogleIcon } from "./Icons";
import { InputBlock } from "./InputBlock";
import { useState } from "react";
import { getThemeStyles } from "./register-form-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type RegisterColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type RegisterVariant = "default" | "split" | "glass" | "minimal";
export type RegisterProvider = "github" | "google";

export type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export interface RegisterFormProps {
  variant?: RegisterVariant;
  color?: RegisterColor;
  /** Where "Sign in" sends someone who already has an account. */
  loginHref?: string;
  termsHref?: string;
  privacyHref?: string;
  /**
   * Client-side minimum only — it stops an obviously-too-short password before
   * a round trip. Your server still has to enforce the real policy.
   */
  minPasswordLength?: number;
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
  onSocialSignUp?: (provider: RegisterProvider) => void;
}

// --- INLINE UI COMPONENTS ---
// Text fields and buttons come from the library (InputBlock, Button); the
// checkbox is the one control it does not have yet, so it stays inline.
interface FieldCheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: React.ReactNode;
  error?: string;
  onCheckedChange: (checked: boolean) => void;
  /** A row out of the block’s colour table. */
  theme: Record<string, string>;
}

const Checkbox = ({
  label,
  id,
  error,
  checked,
  onCheckedChange,
  className,
  theme,
  ...props
}: FieldCheckboxProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-2.5 pt-1">
      <div className="relative flex items-center mt-0.5">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded border-2 appearance-none cursor-pointer transition-colors outline-none",
            error ? "border-red-500" : "border-border",
            checked && !error && theme.bg,
            checked && !error && theme.border,
            theme.ring,
            className,
          )}
          {...props}
        />
        <Check
          size={12}
          strokeWidth={3}
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity",
            theme.panelFg,
          )}
        />
      </div>
      <label
        htmlFor={id}
        className="text-sm font-medium text-muted-foreground cursor-pointer leading-tight select-none"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
    </div>
    {error && (
      <p className="text-[11px] text-red-500 font-semibold ml-6">{error}</p>
    )}
  </div>
);

// --- MAIN COMPONENT ---
export default function RegisterForm({
  variant = "default",
  color = "primary",
  loginHref = "#",
  termsHref = "#",
  privacyHref = "#",
  minPasswordLength = 8,
  onSubmit,
  onSocialSignUp,
}: RegisterFormProps) {
  const { theme, style } = getThemeStyles(color);

  const [formData, setFormData] = useState<RegisterFormValues>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    name: keyof RegisterFormValues,
    value: string | boolean,
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < minPasswordLength)
      newErrors.password = `Must be at least ${minPasswordLength} characters`;

    if (!formData.confirmPassword) newErrors.confirmPassword = "Required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreeToTerms)
      newErrors.agreeToTerms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      if (onSubmit) await onSubmit(formData);
      else {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        alert("Account created successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  const FormContent = (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-bold text-foreground tracking-tight mb-2">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignUp?.("github")}
          iconLeft={<GitHubIcon size={18} />}
          className="w-full h-11 border border-border/80 bg-card/70 backdrop-blur-md hover:bg-card hover:text-foreground"
        >
          GitHub
        </Button>
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignUp?.("google")}
          iconLeft={<GoogleIcon size={18} />}
          className="w-full h-11 border border-border/80 bg-card/70 backdrop-blur-md hover:bg-card hover:text-foreground"
        >
          Google
        </Button>
      </div>

      <div className="relative flex items-center mb-5 sm:mb-6">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-3 sm:mx-4 text-muted-foreground text-[10px] sm:text-xs font-semibold uppercase tracking-widest">
          Or continue with
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <InputBlock
            label="First Name"
            id="register-first-name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            color={color}
          />
          <InputBlock
            label="Last Name"
            id="register-last-name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            color={color}
          />
        </div>

        <InputBlock
          label="Email Address"
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
          error={errors.email}
          color={color}
        />
        <InputBlock
          label="Password"
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          helperText={`At least ${minPasswordLength} characters.`}
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
          error={errors.password}
          color={color}
        />
        <InputBlock
          label="Confirm Password"
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          color={color}
        />

        <div className="pt-2 pb-2">
          <Checkbox
            theme={theme}
            label={
              <>
                I agree to the{" "}
                <a
                  href={termsHref}
                  className={cn("font-semibold hover:underline", theme.text)}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href={privacyHref}
                  className={cn("font-semibold hover:underline", theme.text)}
                >
                  Privacy Policy
                </a>
              </>
            }
            id="register-agree-to-terms"
            checked={formData.agreeToTerms}
            onCheckedChange={(c: boolean) => handleChange("agreeToTerms", c)}
            error={errors.agreeToTerms}
          />
        </div>

        <Button
          type="submit"
          variant="default"
          color={color}
          loading={loading}
          className="w-full h-11 mt-4 shadow-lg shadow-black/5"
        >
          {loading ? "Please wait..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          Already have an account?{" "}
          <a
            href={loginHref}
            className={cn(
              "font-semibold hover:underline transition-all",
              theme.text,
            )}
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <div
        className="w-full min-h-[600px] flex overflow-hidden rounded-3xl border border-border shadow-2xl bg-background transition-colors duration-300"
        style={style}
      >
        <div
          className={cn(
            "hidden lg:flex w-1/2 relative p-12 flex-col justify-between gap-10 overflow-hidden bg-gradient-to-br",
            theme.gradient,
            // Everything inside inherits this, so the panel stays legible even
            // on gradients that invert with the theme.
            theme.panelFg,
          )}
        >
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

          {/* Decoration. All CSS — the block stays copy-paste portable with no
              image assets to ship, and it recolours with the gradient. */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.18] bg-[radial-gradient(circle,currentColor_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_70%)]"
            aria-hidden="true"
          />
          <div
            className="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-current/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-28 -left-16 w-80 h-80 rounded-full bg-black/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <div className="flex items-center gap-2 font-bold text-2xl tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center backdrop-blur-md">
                ⚡
              </div>
              Acme Inc.
            </div>
          </div>

          {/* Sign-up illustration. Drawn inline rather than loaded as a file so
              the block stays copy-paste portable with no assets to ship, and it
              paints in currentColor so it inherits the panel's own foreground —
              legible on both the light and dark gradients. It mirrors the form
              beside it: a paired name row, then email, password and confirm. */}
          <div className="relative z-10 flex-1 flex items-center justify-center py-4">
            <svg
              viewBox="0 0 320 250"
              fill="none"
              className="w-full max-w-[320px]"
              aria-hidden="true"
            >
              <ellipse
                cx="150"
                cy="228"
                rx="116"
                ry="14"
                fill="currentColor"
                opacity="0.12"
              />

              {/* Offset card behind, for depth */}
              <rect
                x="52"
                y="26"
                width="222"
                height="148"
                rx="16"
                fill="currentColor"
                opacity="0.1"
              />

              {/* Sign-up card */}
              <rect
                x="30"
                y="44"
                width="222"
                height="162"
                rx="16"
                fill="currentColor"
                opacity="0.16"
              />
              <rect
                x="30.75"
                y="44.75"
                width="220.5"
                height="160.5"
                rx="15.25"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
              <circle cx="48" cy="62" r="3.5" fill="currentColor" opacity="0.5" />
              <circle cx="60" cy="62" r="3.5" fill="currentColor" opacity="0.3" />
              <circle cx="72" cy="62" r="3.5" fill="currentColor" opacity="0.3" />
              <line
                x1="30"
                y1="78"
                x2="252"
                y2="78"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1.5"
              />

              {/* Paired first / last name row */}
              <rect
                x="58"
                y="94"
                width="78"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />
              <rect
                x="146"
                y="94"
                width="78"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />

              {/* Email */}
              <rect
                x="58"
                y="116"
                width="166"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />

              {/* Password */}
              <rect
                x="58"
                y="138"
                width="166"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />
              <circle cx="70" cy="145" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="78" cy="145" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="86" cy="145" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="94" cy="145" r="2.4" fill="currentColor" opacity="0.55" />

              {/* Confirm password */}
              <rect
                x="58"
                y="160"
                width="166"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />
              <circle cx="70" cy="167" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="78" cy="167" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="86" cy="167" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="94" cy="167" r="2.4" fill="currentColor" opacity="0.55" />

              {/* Terms checkbox, ticked */}
              <rect
                x="58"
                y="182"
                width="11"
                height="11"
                rx="3"
                fill="currentColor"
                opacity="0.55"
              />
              <path
                d="M60.5 187.5l2.5 2.5 4-4.5"
                stroke="currentColor"
                strokeOpacity="0.95"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="76"
                y="185"
                width="98"
                height="6"
                rx="3"
                fill="currentColor"
                opacity="0.22"
              />

              {/* Add-a-member badge */}
              <circle
                cx="256"
                cy="166"
                r="36"
                fill="currentColor"
                opacity="0.18"
              />
              <circle
                cx="256"
                cy="166"
                r="36"
                stroke="currentColor"
                strokeOpacity="0.4"
                strokeWidth="1.5"
              />
              <circle
                cx="250"
                cy="158"
                r="7.5"
                stroke="currentColor"
                strokeOpacity="0.9"
                strokeWidth="2.5"
              />
              <path
                d="M238 180a12 12 0 0 1 24 0"
                stroke="currentColor"
                strokeOpacity="0.9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M268 158v14M261 165h14"
                stroke="currentColor"
                strokeOpacity="0.9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Sparkles */}
              <circle cx="34" cy="24" r="3" fill="currentColor" opacity="0.5" />
              <circle cx="290" cy="58" r="4" fill="currentColor" opacity="0.32" />
              <circle cx="272" cy="28" r="2.5" fill="currentColor" opacity="0.5" />
            </svg>
          </div>

          <div className="relative z-10 max-w-sm">
            <h1 className="text-4xl font-semibold mb-4 leading-tight">
              Start building your next big idea.
            </h1>
            <p className="font-medium opacity-80">
              Join thousands of developers who are already using our platform to
              build the future of software.
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 xs:p-6 sm:p-12 xl:p-16 flex items-center justify-center">
          {FormContent}
        </div>
      </div>
    );
  }

  const baseWrapper =
    "w-full max-w-[480px] mx-auto p-4 xs:p-6 sm:p-8 md:p-10 transition-colors duration-300";
  const wrapperClass = cn(
    baseWrapper,
    variant === "default" &&
      "bg-background rounded-3xl shadow-xl border border-border",
    variant === "glass" &&
      "bg-background/65 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/60",
    variant === "minimal" && "bg-transparent",
  );

  return (
    <div className={wrapperClass} style={style}>
      {FormContent}
    </div>
  );
}
