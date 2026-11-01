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
  | "liquid-glass"
  | "ribbon-drift";
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
  /** Primary headline override (used in ribbon-drift & scenic) */
  heading?: string;
  /** Subtitle / lead text override */
  lead?: string;
  /** Hero illustration image URL for ribbon-drift variant */
  image?: string;
  /** Bottom promo card data for ribbon-drift variant */
  promo?: {
    title?: string;
    body?: string;
    href?: string;
    avatars?: string[];
  };
  /** Top marquee ribbon items for ribbon-drift variant */
  ribbonsTop?: string[];
  /** Bottom marquee ribbon items for ribbon-drift variant */
  ribbonsBottom?: string[];
  /** Direct callback for Google sign-in */
  onGoogle?: () => void;
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
  heading,
  lead,
  image,
  promo,
  ribbonsTop,
  ribbonsBottom,
  onGoogle,
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
          variant={
            isLiquidGlass
              ? "liquid-glass-social"
              : variant === "glass"
                ? "glass-social"
                : "auth-social"
          }
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("github")}
          iconLeft={<GitHubIcon size={18} />}
          className={cn("w-full", isLiquidGlass && "bg-white/15 hover:bg-white/25")}
        >
          GitHub
        </Button>
        <Button
          variant={
            isLiquidGlass
              ? "liquid-glass-social"
              : variant === "glass"
                ? "glass-social"
                : "auth-social"
          }
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("google")}
          iconLeft={<GoogleIcon size={18} />}
          className={cn("w-full", isLiquidGlass && "bg-white/15 hover:bg-white/25")}
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
          variant={isLiquidGlass ? "liquid-glass-primary" : "default"}
          color={color}
          loading={loading}
          className={cn(
            "w-full h-11 mt-4 shadow-lg",
            !isLiquidGlass && "shadow-black/5",
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

  if (variant === "ribbon-drift") {
    return (
      <LoginBlock
        rounded={rounded}
        color={color}
        className={className}
        style={{ ...themeStyle, ...customStyle }}
        heading={heading || title || "Welcome back"}
        lead={
          lead ||
          subtitle ||
          "Sign in to review your candidates, screening answers and interview recordings in one place."
        }
        image={
          image ||
          bgImage ||
          defaultLoginImage
        }
        promo={promo}
        ribbonsTop={ribbonsTop}
        ribbonsBottom={ribbonsBottom}
        forgotHref="#"
        registerHref="#"
        logoHref="#"
        onSubmit={onSubmit}
        onGoogle={onGoogle || (() => onSocialSignIn?.("google"))}
      />
    );
  }

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
                <Button
                  type="button"
                  variant="scenic-primary"
                  color={color}
                  onClick={() => setScenicStep("form")}
                  className={cn(
                    "w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
                    focusButtonClasses
                  )}
                >
                  {loginLabel}
                </Button>

                {/* Secondary Button */}
                <a href={signupHref} className="w-full block">
                  <Button
                    type="button"
                    variant="scenic-secondary"
                    color={color}
                    className={cn("w-full", focusButtonClasses)}
                  >
                    {createAccountLabel}
                  </Button>
                </a>
              </div>
            </div>
          ) : (
            <div>
              {/* Header with Back button */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/60 dark:border-white/10">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setScenicStep("welcome")}
                  iconLeft={<ArrowLeft size={14} />}
                  className="h-auto px-0 py-0 text-xs font-medium text-zinc-500 hover:text-zinc-900 hover:bg-transparent dark:text-zinc-400 dark:hover:text-white dark:hover:bg-transparent"
                >
                  Back
                </Button>
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

                <Button
                  type="submit"
                  variant="scenic-primary"
                  color={color}
                  loading={loading}
                  className={cn(
                    "w-full h-11 rounded-xl text-sm mt-2 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
                    focusButtonClasses
                  )}
                >
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
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

// ==========================================
// RIBBON DRIFT LOGIN BLOCK
// ==========================================

export interface LoginBlockProps {
  logo?: string;
  logoDark?: string;
  logoHref?: string;
  heading?: string;
  lead?: string;
  image?: string;
  promo?: {
    title?: string;
    body?: string;
    href?: string;
    avatars?: string[];
  };
  ribbonsTop?: string[];
  ribbonsBottom?: string[];
  forgotHref?: string;
  registerHref?: string;
  onSubmit?: (values: LoginFormValues) => void | Promise<void>;
  onGoogle?: () => void;
  pending?: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
  color?: LoginColor;
  rounded?: string | number;
  footerCopyright?: React.ReactNode;
  footerBadge?: React.ReactNode;
}

const defaultLoginImage =
  "https://res.cloudinary.com/dygyhxplr/image/upload/v1791725870/upload/update27-2-1791725870473.webp";

const defaultRibbonsTop = [
  "Interviews run day and night",
  "Every applicant, the same questions",
  "Recordings ready for your review",
];

const defaultRibbonsBottom = [
  "Qualified candidates, interviewed in minutes",
  "Your first round, handled",
  "You make every hiring decision",
];

const defaultPromo = {
  title: "Interviews run day and night",
  body: "See who qualified while you were away",
  href: "#",
  avatars: [
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg",
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg",
  ],
};

export function LoginBlock({
  logo,
  logoDark,
  logoHref = "#",
  heading = "Welcome back",
  lead = "Sign in to review your candidates, screening answers and interview recordings in one place.",
  image = defaultLoginImage,
  promo = defaultPromo,
  ribbonsTop = defaultRibbonsTop,
  ribbonsBottom = defaultRibbonsBottom,
  forgotHref = "#",
  registerHref = "#",
  onSubmit,
  onGoogle,
  pending = false,
  error,
  fieldErrors = {},
  className = "",
  style,
  color = "primary",
  rounded,
  footerCopyright,
  footerBadge,
}: LoginBlockProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [localErrors, setLocalErrors] = useState<Record<string, string>>({});
  const errors = { ...localErrors, ...fieldErrors };

  const themeStyle = getThemeStyles(color);

  const formattedRadius = formatRadius(rounded);
  const dynamicRadiusStyle: React.CSSProperties = {
    borderRadius:
      formattedRadius !== undefined
        ? formattedRadius
        : "calc(var(--radius, 0.625rem) * 2.8)",
    WebkitMaskImage: "-webkit-radial-gradient(white, black)",
  };
  const promoRadiusStyle: React.CSSProperties = {
    borderRadius:
      formattedRadius !== undefined
        ? formattedRadius
        : "calc(var(--radius, 0.625rem) * 2.2)",
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const next: Record<string, string> = {};
    if (!email) next.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email))
      next.email = "Invalid email address";
    if (!password) next.password = "Password is required";
    else if (password.length < 6)
      next.password = "Password must be at least 6 characters";
    setLocalErrors(next);
    if (Object.keys(next).length) return;
    onSubmit?.({ email, password, remember: rememberMe });
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-background p-2.5 sm:p-4 text-foreground w-full max-w-full min-w-0 overflow-hidden box-border transition-colors duration-300",
        className,
      )}
      style={{ ...themeStyle, ...style }}
    >
      <style>{loginKeyframes}</style>

      <div
        className={cn(
          "grid flex-1 gap-3 sm:gap-4 items-stretch w-full max-w-full min-w-0",
          image
            ? "grid-cols-1 lg:grid-cols-[0.9fr_1fr]"
            : "grid-cols-1 max-w-[560px] mx-auto",
        )}
      >
        <div className="mx-auto flex w-full max-w-[560px] lg:max-w-none min-w-0 flex-col h-full justify-center">
          <section
            className={cn(
              "relative flex flex-1 items-center justify-center overflow-hidden bg-[#efeff2] dark:bg-[#131313] p-4 sm:p-6 shadow-sm border border-black/5 dark:border-white/5 min-h-[460px] sm:min-h-[520px] lg:min-h-[540px] h-full w-full max-w-full min-w-0",
              typeof rounded === "string" && !formatRadius(rounded)
                ? rounded
                : "",
            )}
            style={dynamicRadiusStyle}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_55%_at_85%_112%,color-mix(in_oklab,var(--brand-secondary,var(--brand,#9B8AFB))_30%,transparent),transparent_62%),radial-gradient(80%_50%_at_8%_108%,color-mix(in_oklab,var(--primary)_26%,transparent),transparent_60%)]"
            />
            {/* Form-card logo: shown where the image card is hidden */}
            <div
              className={cn(
                "absolute right-4 top-4 sm:right-5 sm:top-5 z-10",
                image && "lg:hidden",
              )}
            >
              <BlockLogo
                href={logoHref}
                logo={logo}
                logoDark={logoDark}
                compact
              />
            </div>

            <div
              className={cn(
                "relative w-full max-w-[400px] px-2 sm:px-4 pb-6 pt-14 text-center sm:pb-8 sm:pt-16",
                image && "lg:pt-8",
              )}
            >
              <h1 className="text-balance text-[clamp(26px,4vw,38px)] font-medium leading-[1.12] tracking-[-0.025em] text-foreground">
                {heading}
              </h1>
              {lead && (
                <p className="mx-auto mt-2.5 max-w-[34ch] text-pretty text-[13px] sm:text-[14px] leading-relaxed text-muted-foreground">
                  {lead}
                </p>
              )}

              <form
                className="mt-6 sm:mt-8 flex flex-col gap-3 text-left"
                onSubmit={handleSubmit}
                noValidate
              >
                {error && (
                  <p
                    role="alert"
                    className="rounded-2xl bg-destructive/10 px-4 py-2.5 text-[13px] text-destructive"
                  >
                    {error}
                  </p>
                )}

                <BlockField
                  id="login-email"
                  label="Email or Username"
                  error={errors.email}
                  icon={<MailIcon />}
                >
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Enter your email or username"
                    aria-invalid={errors.email ? true : undefined}
                    className={blockInputClass}
                  />
                </BlockField>

                <BlockField
                  id="login-password"
                  label="Password"
                  error={errors.password}
                  icon={<LockIcon />}
                  trailing={
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      iconLeft={showPassword ? <EyeOffIcon /> : <EyeIcon />}
                      className="size-8 sm:size-9 p-0 rounded-full text-muted-foreground hover:bg-foreground/5 hover:text-foreground [&_svg]:size-4 sm:[&_svg]:size-[18px]"
                    />
                  }
                >
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter Password"
                    aria-invalid={errors.password ? true : undefined}
                    className={blockInputClass}
                  />
                </BlockField>

                <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs sm:text-sm">
                  <label
                    htmlFor="login-remember"
                    className="inline-flex cursor-pointer items-center gap-2 text-muted-foreground select-none"
                  >
                    <BlockCheckbox
                      id="login-remember"
                      checked={rememberMe}
                      onCheckedChange={(v) => setRememberMe(v)}
                    />
                    <span>Remember Me</span>
                  </label>
                  <a
                    href={forgotHref}
                    onClick={(e) => {
                      if (!forgotHref || forgotHref === "#") e.preventDefault();
                    }}
                    className={blockLinkClass}
                  >
                    Forgot Password?
                  </a>
                </div>

                <Button
                  type="submit"
                  variant="ribbon-primary"
                  color={color}
                  loading={pending}
                  className="w-full mt-1.5"
                >
                  {pending ? "Signing in..." : "Sign in"}
                </Button>
              </form>

              {onGoogle && (
                <>
                  <div className="my-4 sm:my-5 flex items-center gap-3.5 text-[13px] text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    or
                  </div>
                  <Button
                    type="button"
                    variant="ribbon-social"
                    color={color}
                    onClick={onGoogle}
                    iconLeft={<GoogleColoredIcon />}
                    className="w-full"
                  >
                    Continue with Google
                  </Button>
                </>
              )}

              <p className="mt-4 sm:mt-5 text-xs sm:text-sm text-muted-foreground">
                New on our platform?{" "}
                <a
                  href={registerHref}
                  onClick={(e) => {
                    if (!registerHref || registerHref === "#") e.preventDefault();
                  }}
                  className={cn(
                    blockLinkClass,
                    "font-semibold decoration-transparent hover:decoration-current",
                  )}
                >
                  Create an account
                </a>
              </p>
            </div>
          </section>
        </div>

        {image && (
          <div className="hidden lg:flex flex-col w-full h-full min-w-0 overflow-hidden">
            <aside
              className={cn(
                "relative isolate w-full max-w-full min-w-0 flex-1 h-full min-h-[440px] sm:min-h-[500px] lg:min-h-[540px] overflow-hidden bg-[#d8d8de] dark:bg-[#0d0d10] border border-black/5 dark:border-white/5 shadow-sm",
                typeof rounded === "string" && !formatRadius(rounded)
                  ? rounded
                  : "",
              )}
              style={dynamicRadiusStyle}
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-[login-drift_24s_ease-in-out_infinite_alternate] bg-[length:140%_140%] bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--primary)_70%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--brand-secondary,var(--brand,#9B8AFB))_75%,transparent),transparent_70%),linear-gradient(160deg,#f6f6f9,#b4b4c2_40%,#fff_60%,#73738a)] motion-reduce:animate-none dark:bg-[radial-gradient(70%_55%_at_15%_20%,color-mix(in_oklab,var(--primary)_35%,transparent),transparent_70%),radial-gradient(65%_55%_at_90%_85%,color-mix(in_oklab,var(--brand-secondary,var(--brand,#9B8AFB))_28%,transparent),transparent_70%),linear-gradient(160deg,#34343f,#0b0b0f_40%,#5a5a6c_60%,#040406)]"
              />
              <BlockRibbon
                items={ribbonsTop}
                className="top-[50%] z-[1] -rotate-[7deg]"
              />
              <div className="absolute inset-[4%_6%_10%] z-[2] pointer-events-none flex items-end justify-center">
                <img
                  src={image}
                  alt="Illustration"
                  className="size-full object-contain object-bottom drop-shadow-[0_28px_36px_rgba(20,12,60,0.28)] select-none"
                />
              </div>
              <BlockRibbon
                items={ribbonsBottom}
                className="top-[63%] z-[3] rotate-[5deg]"
                reverse
              />

              <div className="absolute right-3.5 top-3.5 z-[5] flex items-center rounded-full border border-white/70 bg-white/70 px-4 py-2 backdrop-blur-xl shadow-sm dark:border-white/15 dark:bg-[#131316]/70">
                <BlockLogo
                  href={logoHref}
                  logo={logo}
                  logoDark={logoDark}
                  compact
                />
              </div>

              {promo && (
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group absolute inset-x-2.5 sm:inset-x-3.5 bottom-2.5 sm:bottom-3.5 z-[4] flex items-center gap-2.5 sm:gap-3.5 border border-white/30 bg-[#15151c]/60 py-2.5 sm:py-3.5 pl-3 sm:pl-4 pr-2.5 sm:pr-3.5 text-white backdrop-blur-xl transition-colors hover:bg-[#15151c]/70 shadow-lg"
                  style={promoRadiusStyle}
                >
                  {promo.avatars && promo.avatars.length > 0 && (
                    <div className="flex -space-x-2 shrink-0">
                      {promo.avatars.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="size-7 sm:size-8 rounded-full border-2 border-[#15151c] object-cover ring-1 ring-white/20"
                        />
                      ))}
                    </div>
                  )}
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-xs sm:text-sm font-semibold truncate leading-tight text-white">
                      {promo.title}
                    </span>
                    <span className="mt-0.5 text-[11px] sm:text-[12px] text-white/75 truncate">
                      {promo.body}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-9 sm:size-10 shrink-0 place-items-center rounded-full border border-white/50 bg-white/10 transition-all duration-300 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-primary [&_svg]:size-3.5 sm:[&_svg]:size-4"
                  >
                    <ArrowIcon />
                  </span>
                </a>
              )}
            </aside>
          </div>
        )}
      </div>

      {/* Footer row */}
      <footer className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 px-3 py-1 text-xs text-muted-foreground text-center sm:text-left select-none">
        <p>
          {footerCopyright || (
            <>
              COPYRIGHT © {new Date().getFullYear()}{" "}
              <span className="font-medium text-foreground">
                Avara{" "}
                <span
                  className="font-normal"
                  style={{ color: "var(--brand, #9B8AFB)" }}
                >
                  UI
                </span>
              </span>{" "}
              All rights reserved.
            </>
          )}
        </p>
        <p className="flex items-center gap-1.5 font-medium">
          {footerBadge || (
            <>
              Created by{" "}
              <span className="font-semibold text-foreground">
                Avara{" "}
                <span
                  className="font-normal"
                  style={{ color: "var(--brand, #9B8AFB)" }}
                >
                  UI
                </span>
              </span>{" "}
              with <span className="text-rose-500">❤️</span>
            </>
          )}
        </p>
      </footer>
    </div>
  );
}

const blockInputClass =
  "h-full flex-1 rounded-none border-0 bg-transparent px-3 sm:px-4 text-[14px] sm:text-[15px] shadow-none placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 dark:bg-transparent text-foreground";
const blockLinkClass =
  "font-medium text-foreground underline decoration-current/30 underline-offset-[3px] transition-colors hover:decoration-current";

function BlockLogo({
  href = "#",
  logo,
  logoDark,
  compact = false,
}: {
  href?: string;
  logo?: string;
  logoDark?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={href}
      onClick={(e) => {
        if (!href || href === "#") e.preventDefault();
      }}
      className="inline-flex items-center gap-2 rounded-lg transition-opacity hover:opacity-90 cursor-default select-none"
    >
      {logo || logoDark ? (
        <>
          {logo && (
            <img
              src={logo}
              alt="Logo"
              className={`${compact ? "h-6" : "h-7"} w-auto object-contain ${logoDark ? "dark:hidden" : ""}`}
            />
          )}
          {logoDark && (
            <img
              src={logoDark}
              alt="Logo"
              className={`${compact ? "h-6" : "h-7"} hidden w-auto object-contain dark:block`}
            />
          )}
        </>
      ) : (
        <>
          <img
            src="/favicon/android-chrome-192x192.png"
            alt="Avara UI"
            className={`${compact ? "size-5" : "size-6"} rounded-md object-contain shrink-0`}
          />
          <span
            className={`${compact ? "text-[14px]" : "text-[15px]"} font-semibold tracking-tight text-foreground`}
          >
            Avara{" "}
            <span
              className="font-normal"
              style={{ color: "var(--brand, #9B8AFB)" }}
            >
              UI
            </span>
          </span>
        </>
      )}
    </a>
  );
}

function BlockField({
  id,
  label,
  icon,
  trailing,
  error,
  children,
}: {
  id: string;
  label: string;
  icon: React.ReactNode;
  trailing?: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        data-invalid={error ? "" : undefined}
        className="group flex h-11 sm:h-12 items-center rounded-full border border-transparent bg-white shadow-sm ring-1 ring-black/10 transition-all focus-within:border-primary/70 focus-within:ring-4 focus-within:ring-primary/20 data-[invalid]:border-destructive/65 dark:bg-[#1d1d20] dark:ring-white/10"
      >
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        <span
          aria-hidden="true"
          className="grid h-[24px] sm:h-[26px] w-[46px] sm:w-[54px] shrink-0 place-items-center border-r border-border text-muted-foreground transition-colors [&_svg]:size-[16px] sm:[&_svg]:size-[18px] group-focus-within:text-primary"
        >
          {icon}
        </span>
        {children}
        {trailing && <span className="flex items-center pr-2">{trailing}</span>}
      </div>
      {error && (
        <p className="pl-5 pt-1.5 text-[13px] text-destructive">{error}</p>
      )}
    </div>
  );
}

function BlockCheckbox({
  id,
  checked,
  onCheckedChange,
}: {
  id?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      id={id}
      aria-checked={checked}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "size-4 rounded border transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
        checked
          ? "bg-primary border-primary text-primary-foreground"
          : "border-input bg-background/50 hover:bg-background hover:border-foreground/40",
      )}
    >
      {checked && (
        <svg
          className="size-3 stroke-current"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </button>
  );
}

function BlockRibbon({
  items,
  className = "",
  reverse = false,
}: {
  items: string[];
  className?: string;
  reverse?: boolean;
}) {
  if (!items.length) return null;
  const row = [...items, ...items, ...items];
  return (
    <div
      className={cn(
        "pointer-events-none absolute -left-[10%] w-[120%] sm:-left-[15%] sm:w-[130%] max-w-[130%] overflow-hidden whitespace-nowrap border-y border-white/70 bg-white/60 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-[#1b1b22] backdrop-blur-md dark:border-white/15 dark:bg-[#131316]/60 dark:text-[#ececf1] select-none",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max animate-[login-ribbon_48s_linear_infinite] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[0, 1].map((half) => (
          <span key={half} className="flex" aria-hidden={half === 1}>
            {row.map((text, i) => (
              <span key={i} className="inline-flex items-center">
                {text}
                <span className="mx-[18px] bg-gradient-to-br from-primary to-[var(--brand-secondary,var(--brand,#9B8AFB))] bg-clip-text text-transparent">
                  ✦
                </span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

const loginKeyframes = `
@keyframes login-drift { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }
@keyframes login-ribbon { to { transform: translateX(-50%); } }
`;

const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const MailIcon = () => (
  <svg {...svgProps}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg {...svgProps}>
    <rect width="18" height="11" x="3" y="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg {...svgProps}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg {...svgProps}>
    <path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.4 0 10 8 10 8a13.2 13.2 0 0 1-1.67 2.68M6.61 6.61A13.5 13.5 0 0 0 2 12s3.6 8 10 8a9.7 9.7 0 0 0 5.39-1.61M2 2l20 20" />
    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
  </svg>
);

const ArrowIcon = () => (
  <svg {...svgProps}>
    <path d="M7 7h10v10M7 17 17 7" />
  </svg>
);

const GoogleColoredIcon = () => (
  <svg viewBox="0 0 48 48" className="size-[18px] shrink-0" aria-hidden="true">
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
    />
    <path
      fill="#FBBC05"
      d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
    />
  </svg>
);
