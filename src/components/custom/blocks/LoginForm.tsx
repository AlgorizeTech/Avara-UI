"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Check } from "lucide-react";
import Button from "./Button";
import { GitHubIcon, GoogleIcon } from "./Icons";
import { InputBlock } from "./InputBlock";
import { useState } from "react";
import { getThemeStyles } from "./login-form-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type LoginColor =
  | "primary"
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type LoginVariant =
  | "default"
  | "split"
  | "glass"
  | "minimal"
  | "scenic"
  | "nature"
  | "landscape"
  | "liquid-glass";
export type LoginProvider = "github" | "google";

import {
  LiquidGlassBackground,
  LiquidGlassSvgFilter,
  formatRadius,
} from "@/components/custom/ui/liquid-glass";
export { LiquidGlassSvgFilter };

export type LoginFormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export interface LoginFormProps {
  variant?: LoginVariant;
  color?: LoginColor;
  /** Where "Sign up" sends someone who does not have an account yet. */
  signupHref?: string;
  forgotPasswordHref?: string;
  /**
   * Called with the validated credentials. Without it the form simulates a
   * round trip so the block stays demonstrable on its own — wire this up to
   * your auth provider before shipping.
   */
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
  onSocialSignIn?: (provider: LoginProvider) => void;
  /** Brand display name shown on scenic variant */
  brandName?: string;
  /** Custom logo icon */
  brandIcon?: React.ReactNode;
  /** Primary headline for the scenic card */
  title?: string;
  /** Subtitle / description for the scenic card */
  subtitle?: string;
  /** Label for primary get started / sign in button */
  loginLabel?: string;
  /** Label for secondary create account button */
  createAccountLabel?: string;
  /** Scenic background image URL (e.g. Cloudinary) */
  bgImage?: string;
  /** Initial step for scenic mode ("welcome" or "form") */
  initialStep?: "welcome" | "form";
  /** Optional dynamic corner rounding radius value or Tailwind class */
  rounded?: string | number;
  className?: string;
  style?: React.CSSProperties;
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
  isLiquidGlass?: boolean;
}

const Checkbox = ({
  label,
  id,
  error,
  checked,
  onCheckedChange,
  className,
  theme,
  isLiquidGlass,
  ...props
}: FieldCheckboxProps) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-2.5">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className={cn(
            "peer h-4 w-4 shrink-0 rounded border-2 appearance-none cursor-pointer transition-colors outline-none",
            // --border is tuned for wide input outlines; on a 16px box it all but
            // disappears, so the unchecked edge uses the stronger muted ink.
            error
              ? "border-red-500"
              : !checked &&
                  (isLiquidGlass
                    ? "border-white/50 hover:border-white/80 bg-white/10"
                    : "border-muted-foreground/60 hover:border-muted-foreground"),
            checked && !error && (isLiquidGlass ? "bg-white text-zinc-950 border-white" : theme.bg),
            checked && !error && (isLiquidGlass ? "border-white" : theme.border),
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
            isLiquidGlass ? "text-zinc-950" : theme.panelFg,
          )}
        />
      </div>
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium cursor-pointer leading-tight select-none",
          isLiquidGlass ? "text-white/90" : "text-muted-foreground"
        )}
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
    </div>
    {error && (
      <p className="text-[11px] text-red-500 font-semibold ml-6">{error}</p>
    )}
  </div>
);

// --- BRAND ICON ---
export const DocsUiIcon = ({
  className = "w-5 h-5",
  size = 20,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      className="fill-foreground dark:fill-white"
    />
    <rect
      x="14"
      y="3"
      width="7"
      height="7"
      rx="1.5"
      className="fill-primary"
    />
    <rect
      x="14"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      className="fill-foreground dark:fill-white"
    />
    <rect
      x="3"
      y="14"
      width="7"
      height="7"
      rx="1.5"
      className="fill-primary"
    />
  </svg>
);


// --- MAIN COMPONENT ---
export default function LoginForm({
  variant = "default",
  color = "primary",
  signupHref = "#",
  forgotPasswordHref = "#",
  onSubmit,
  onSocialSignIn,
  brandName = "Docs UI",
  brandIcon,
  title = "Take control of your financial wellbeing",
  subtitle = "Understand your money, build healthier habits, and make confident financial decisions",
  loginLabel = "Sign In",
  createAccountLabel = "Create an account",
  bgImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  initialStep = "welcome",
  rounded,
  className,
  style: customStyle,
}: LoginFormProps) {
  const { theme, style: themeStyle } = getThemeStyles(color);
  const focusButtonClasses = cn(
    "outline-none transition-all duration-200 focus-visible:outline-none",
    theme.focusBorder,
    theme.focusRing
  );
  const [scenicStep, setScenicStep] = useState<"welcome" | "form">(initialStep);

  const [formData, setFormData] = useState<LoginFormValues>({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: keyof LoginFormValues, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    // No length rule on sign-in: an existing password that predates your current
    // policy must still be able to reach the server and be told it is wrong.
    if (!formData.password) newErrors.password = "Password is required";

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
        alert("Logged in successfully!");
      }
    } finally {
      setLoading(false);
    }
  };

  const isLiquidGlass = variant === "liquid-glass";

  const FormContent = (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <div className="mb-8 text-center sm:text-left">
        <h2
          className={cn(
            "text-3xl font-semibold tracking-tight mb-2",
            isLiquidGlass ? "text-white" : "text-foreground",
          )}
        >
          {variant === "split" ? "Sign in" : (title || "Welcome back")}
        </h2>
        <p
          className={cn(
            "text-sm font-medium",
            isLiquidGlass ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {variant === "split"
            ? "Enter your details to access your account."
            : (subtitle || "Enter your details to access your account.")}
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("github")}
          iconLeft={<GitHubIcon size={18} />}
          className={cn(
            "w-full h-11 border transition-colors",
            isLiquidGlass
              ? "border-white/20 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 hover:text-white"
              : "border-border/80 bg-card/70 backdrop-blur-md hover:bg-card hover:text-foreground",
          )}
        >
          GitHub
        </Button>
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("google")}
          iconLeft={<GoogleIcon size={18} />}
          className={cn(
            "w-full h-11 border transition-colors",
            isLiquidGlass
              ? "border-white/20 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 hover:text-white"
              : "border-border/80 bg-card/70 backdrop-blur-md hover:bg-card hover:text-foreground",
          )}
        >
          Google
        </Button>
      </div>

      <div className="relative flex items-center mb-5 sm:mb-6">
        <div
          className={cn(
            "flex-grow border-t",
            isLiquidGlass ? "border-white/20" : "border-border",
          )}
        />
        <span
          className={cn(
            "flex-shrink-0 mx-3 sm:mx-4 text-[10px] sm:text-xs font-semibold uppercase tracking-widest",
            isLiquidGlass ? "text-white/75" : "text-muted-foreground",
          )}
        >
          Or continue with
        </span>
        <div
          className={cn(
            "flex-grow border-t",
            isLiquidGlass ? "border-white/20" : "border-border",
          )}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <InputBlock
          label="Email Address"
          id="login-email"
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
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
          error={errors.password}
          color={color}
        />

        <div className="flex items-center justify-between gap-3 pt-1">
          <Checkbox
            theme={theme}
            isLiquidGlass={isLiquidGlass}
            label="Remember me"
            id="login-remember"
            checked={formData.remember}
            onCheckedChange={(c: boolean) => handleChange("remember", c)}
          />
          <a
            href={forgotPasswordHref}
            className={cn(
              "text-xs font-semibold hover:underline transition-all shrink-0",
              isLiquidGlass ? "text-white/90 hover:text-white" : theme.text,
            )}
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          variant="default"
          color={color}
          loading={loading}
          className={cn(
            "w-full h-11 mt-4 shadow-lg",
            isLiquidGlass
              ? "bg-white text-zinc-950 hover:bg-white/90 shadow-black/20"
              : "shadow-black/5",
          )}
        >
          {loading ? "Please wait..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p
          className={cn(
            "text-sm font-medium",
            isLiquidGlass ? "text-white/75" : "text-muted-foreground",
          )}
        >
          Don&apos;t have an account?{" "}
          <a
            href={signupHref}
            className={cn(
              "font-semibold hover:underline transition-all",
              isLiquidGlass ? "text-white hover:text-white/90" : theme.text,
            )}
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <div
        className="w-full h-full min-h-[600px] flex overflow-hidden rounded-2xl border border-border bg-background transition-colors duration-300"
        style={{ ...themeStyle, ...customStyle }}
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
            <div className="flex items-center gap-2 font-semibold text-2xl tracking-tighter">
              {brandIcon || (
                <div className="w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center backdrop-blur-md">
                  ⚡
                </div>
              )}
              {brandName || "Acme Inc."}
            </div>
          </div>

          {/* Sign-in illustration. Drawn inline rather than loaded as a file so
              the block stays copy-paste portable with no assets to ship, and it
              paints in currentColor so it inherits the panel's own foreground —
              legible on both the light and dark gradients. */}
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

              {/* Sign-in card */}
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

              {/* Avatar */}
              <circle
                cx="141"
                cy="104"
                r="18"
                fill="currentColor"
                opacity="0.26"
              />
              <circle
                cx="141"
                cy="99"
                r="6.5"
                fill="currentColor"
                opacity="0.8"
              />
              <path
                d="M130 116a11 11 0 0 1 22 0"
                fill="currentColor"
                opacity="0.8"
              />

              {/* Email + password fields */}
              <rect
                x="58"
                y="136"
                width="166"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />
              <rect
                x="58"
                y="158"
                width="166"
                height="14"
                rx="7"
                fill="currentColor"
                opacity="0.22"
              />
              <circle cx="70" cy="165" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="78" cy="165" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="86" cy="165" r="2.4" fill="currentColor" opacity="0.55" />
              <circle cx="94" cy="165" r="2.4" fill="currentColor" opacity="0.55" />

              {/* Submit */}
              <rect
                x="58"
                y="180"
                width="166"
                height="16"
                rx="8"
                fill="currentColor"
                opacity="0.55"
              />

              {/* Padlock badge */}
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
              <rect
                x="242"
                y="163"
                width="28"
                height="22"
                rx="6"
                stroke="currentColor"
                strokeOpacity="0.9"
                strokeWidth="2.5"
              />
              <path
                d="M248 163v-6a8 8 0 0 1 16 0v6"
                stroke="currentColor"
                strokeOpacity="0.9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle cx="256" cy="171" r="2.8" fill="currentColor" opacity="0.9" />
              <path
                d="M256 173v4"
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
              {title || "Welcome back. Pick up where you left off."}
            </h1>
            <p className="font-medium opacity-80">
              {subtitle ||
                "Your projects, deployments and team are exactly as you left them. Sign in to get straight back to work."}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4 xs:p-6 sm:p-12 xl:p-16 flex items-center justify-center">
          {FormContent}
        </div>
      </div>
    );
  }

  if (
    variant === "scenic" ||
    variant === "nature" ||
    variant === "landscape"
  ) {
    return (
      <div
        className="relative w-full min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
        style={{ ...themeStyle, ...customStyle }}
      >
        {/* Full-bleed scenic nature background */}
        <img
          src={bgImage}
          alt="Scenic nature landscape background"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

        {/* Floating Card */}
        <div
          className={cn(
            "relative z-10 w-full max-w-[440px] rounded-[28px] p-6 sm:p-8 md:p-9 transition-all duration-300",
            // Light mode: clean frosted white card, crisp dark text, delicate border, deep ambient shadow
            "bg-white/95 text-zinc-900 border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl",
            // Dark mode: deep charcoal card matching screenshot, crisp white text, subtle translucent border
            "dark:bg-[#131415]/95 dark:text-white dark:border-white/10 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
          )}
        >
          {scenicStep === "welcome" ? (
            <div className="flex flex-col items-center text-center">
              {/* Brand Header */}
              <div className="flex items-center gap-2 mb-6">
                {brandIcon || (
                  <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                )}
                <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                  {brandName}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-3 leading-snug">
                {title}
              </h2>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 max-w-[340px] mb-8 leading-relaxed">
                {subtitle}
              </p>

              {/* Actions */}
              <div className="w-full flex flex-col gap-3">
                {/* Primary Button */}
                <button
                  type="button"
                  onClick={() => setScenicStep("form")}
                  className={cn(
                    "w-full h-12 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm",
                    "bg-zinc-900 text-white hover:bg-zinc-800",
                    "dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
                    focusButtonClasses
                  )}
                >
                  {loginLabel}
                </button>

                {/* Secondary Button */}
                <a
                  href={signupHref}
                  className={cn(
                    "w-full h-11 flex items-center justify-center rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                    "bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/90 border border-zinc-200/60",
                    "dark:bg-white/[0.08] dark:text-white/85 dark:hover:bg-white/[0.14] dark:border-white/5",
                    focusButtonClasses
                  )}
                >
                  {createAccountLabel}
                </a>
              </div>
            </div>
          ) : (
            <div>
              {/* Header with Back button */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/60 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setScenicStep("welcome")}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <div className="flex items-center gap-1.5">
                  {brandIcon || (
                    <DocsUiIcon className="w-4 h-4 text-zinc-900 dark:text-white" />
                  )}
                  <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
                </div>
              </div>

              {/* Form Heading */}
              <div className="mb-4">
                <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1">
                  Sign in
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3.5">
                <InputBlock
                  label="Email Address"
                  id="login-scenic-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("email", e.target.value)
                  }
                  error={errors.email}
                  color={color}
                />

                <InputBlock
                  label="Password"
                  id="login-scenic-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("password", e.target.value)
                  }
                  error={errors.password}
                  color={color}
                />

                <div className="flex items-center justify-between text-xs pt-0.5">
                  <Checkbox
                    id="login-scenic-remember"
                    label="Remember me"
                    checked={formData.remember}
                    onCheckedChange={(checked) =>
                      handleChange("remember", checked)
                    }
                    theme={theme}
                  />
                  <a
                    href={forgotPasswordHref}
                    className="font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full h-11 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mt-2",
                    "bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-60",
                    "dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
                    focusButtonClasses
                  )}
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Sign in"
                  )}
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Don't have an account?{" "}
                  <a
                    href={signupHref}
                    className="font-semibold text-zinc-900 dark:text-white hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "liquid-glass") {
    const liquidBg =
      bgImage ||
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg";

    const formattedRadius = formatRadius(rounded);
    const dynamicRadiusStyle: React.CSSProperties =
      formattedRadius !== undefined
        ? { borderRadius: formattedRadius }
        : typeof rounded === "string" && !formatRadius(rounded)
          ? {}
          : { borderRadius: "var(--radius-3xl, 1.5rem)" };

    return (
      <div
        className={cn(
          "relative w-full min-h-[600px] sm:min-h-[720px] flex items-center justify-center overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8 isolate [contain:paint] [transform:translateZ(0)]",
          className,
        )}
        style={{
          ...themeStyle,
          ...customStyle,
        }}
      >
        <LiquidGlassSvgFilter id="glass-blur-login" bgImage={liquidBg} />

        {/* Full-bleed background image covering the entire container */}
        <img
          src={liquidBg}
          alt="Liquid glass backdrop"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Floating Liquid Glass Card */}
        <div
          className={cn(
            "relative z-10 w-full max-w-[460px] p-6 sm:p-8 md:p-10 isolate [contain:paint] [transform:translateZ(0)] text-white transition-all duration-300 overflow-hidden",
            typeof rounded === "string" && !formatRadius(rounded) ? rounded : "",
            "shadow-[0_25px_60px_rgba(0,0,0,0.5)] [--foreground:#ffffff] [--muted-foreground:rgba(255,255,255,0.75)] [--color-foreground:#ffffff] [--color-muted-foreground:rgba(255,255,255,0.75)] [--border:rgba(255,255,255,0.2)] [--background:rgba(255,255,255,0.12)] [--card:rgba(255,255,255,0.12)]",
          )}
          style={dynamicRadiusStyle}
        >
          <LiquidGlassBackground
            radius={formattedRadius ?? "var(--radius-3xl, 1.5rem)"}
            bgImage={liquidBg}
            filterId="glass-blur-login"
            contrastOverlayClassName="bg-black/30 dark:bg-black/45 backdrop-blur-[3px]"
          />

          <div className="relative z-10 w-full">{FormContent}</div>
        </div>
      </div>
    );
  }

  if (variant === "glass") {
    const glassBg =
      bgImage ||
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg";

    return (
      <div
        className="relative w-full min-h-[600px] sm:min-h-[700px] flex items-center justify-center overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
        style={{ ...themeStyle, ...customStyle }}
      >
        {/* Full-bleed glass backdrop */}
        <img
          src={glassBg}
          alt="Glass landscape backdrop"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px] pointer-events-none" />

        {/* Floating Glass Card */}
        <div className="relative z-10 w-full max-w-[460px] p-6 sm:p-8 md:p-10 bg-background/65 backdrop-blur-xl rounded-3xl shadow-2xl border border-foreground/10 transition-colors duration-300">
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
    variant === "minimal" && "bg-transparent",
  );

  return (
    <div className={wrapperClass} style={{ ...themeStyle, ...customStyle }}>
      {FormContent}
    </div>
  );
}
