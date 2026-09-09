"use client";

import { cn } from "@/lib/utils";
import { Check, Eye, EyeOff } from "lucide-react";
import { GitHubIcon, GoogleIcon } from "./Icons";
import { useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type RegisterColor = "indigo" | "rose" | "emerald" | "zinc" | string;
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

// `panelFg` is the text colour for the split variant's gradient panel. It has
// to be declared per theme rather than hardcoded to white: the zinc and primary
// gradients both invert in dark mode, which would otherwise leave the whole
// marketing panel white-on-white.
const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600 hover:bg-indigo-700",
    text: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-600",
    ring: "focus:ring-indigo-600",
    gradient: "from-indigo-600 to-violet-600",
    panelFg: "text-white",
  },
  rose: {
    bg: "bg-rose-600 hover:bg-rose-700",
    text: "text-rose-600 dark:text-rose-400",
    border: "border-rose-600",
    ring: "focus:ring-rose-600",
    gradient: "from-rose-600 to-orange-500",
    panelFg: "text-white",
  },
  emerald: {
    bg: "bg-emerald-600 hover:bg-emerald-700",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-600",
    ring: "focus:ring-emerald-600",
    gradient: "from-emerald-600 to-teal-500",
    panelFg: "text-white",
  },
  zinc: {
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-900 dark:border-zinc-100",
    ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100",
    gradient: "from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400",
    panelFg: "text-white dark:text-zinc-900",
  },
};

/** Legible text colour to sit on a filled swatch of `rgb`. */
const contrastingForeground = (rgb: string) => {
  const [r, g, b] = rgb.split(",").map((v) => parseInt(v.trim(), 10));
  const channel = (v: number) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const luminance =
    0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance > 0.45 ? "#09090b" : "#ffffff";
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color === "primary" || color === "default" || !colorThemes[color]) {
    if (color && color.startsWith("#")) {
      const rgb = hexToRgb(color);
      return {
        theme: {
          bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
          text: "text-[var(--theme-color)]",
          border: "border-[var(--theme-color)]",
          ring: "focus:ring-[var(--theme-color)]",
          gradient:
            "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]",
          panelFg: "text-[var(--panel-fg)]",
        },
        style: {
          "--theme-color": color,
          "--theme-color-rgb": rgb,
          "--panel-fg": contrastingForeground(rgb),
        } as React.CSSProperties,
      };
    }
    return {
      theme: {
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        text: "text-primary",
        border: "border-primary",
        ring: "focus:ring-primary/40",
        gradient: "from-primary to-primary/70",
        // The token designed to be legible on --primary, which inverts by theme.
        panelFg: "text-primary-foreground",
      },
      style: {} as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color], style: {} };
};

// --- INLINE UI COMPONENTS ---
interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string;
  description?: React.ReactNode;
}

const Input = ({
  label,
  id,
  error,
  description,
  type = "text",
  className,
  ...props
}: FieldInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label
        htmlFor={id}
        className="text-sm font-semibold text-foreground"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={cn(
            "flex h-11 w-full rounded-lg border bg-white/80 dark:bg-zinc-950/70 backdrop-blur-md px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground font-medium focus:outline-none focus:ring-2 focus:border-transparent transition-all shadow-sm",
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-border",
            isPassword && "pr-10",
            className,
          )}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {description && !error && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}
      {error && (
        <p className="text-[11px] text-red-500 font-semibold">{error}</p>
      )}
    </div>
  );
};

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
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
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

interface FieldButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | string;
  size?: "default" | "sm" | "lg" | string;
  theme?: Record<string, string>;
}

const Button = ({
  className,
  variant = "default",
  size = "default",
  disabled,
  theme,
  children,
  ...props
}: FieldButtonProps) => (
  <button
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
      variant === "default" && theme?.bg,
      variant === "outline" &&
        "border-2 border-border/80 bg-white/70 dark:bg-zinc-900/80 backdrop-blur-md hover:bg-card text-foreground shadow-xs",
      size === "default" && "h-11 px-4 py-2",
      className,
    )}
    {...props}
  >
    {children}
  </button>
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
}: {
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
  /**
   * Called with the validated fields. Without it the form simulates a round
   * trip so the block stays demonstrable on its own — wire this up to your auth
   * provider before shipping.
   */
  onSubmit?: (values: RegisterFormValues) => void | Promise<void>;
  onSocialSignUp?: (provider: RegisterProvider) => void;
}) {
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
        <h2 className="text-3xl font-black text-foreground tracking-tight mb-2">
          Create an account
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Start your 14-day free trial. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <Button
          variant="outline"
          type="button"
          onClick={() => onSocialSignUp?.("github")}
          className="w-full flex items-center justify-center gap-2"
        >
          <GitHubIcon size={18} /> <span>GitHub</span>
        </Button>
        <Button
          variant="outline"
          type="button"
          onClick={() => onSocialSignUp?.("google")}
          className="w-full flex items-center justify-center gap-2"
        >
          <GoogleIcon size={18} /> <span>Google</span>
        </Button>
      </div>

      <div className="relative flex items-center mb-5 sm:mb-6">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-3 sm:mx-4 text-muted-foreground text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          Or continue with
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
          <Input
            label="First Name"
            id="register-first-name"
            name="firstName"
            autoComplete="given-name"
            placeholder="Jane"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            className={theme.ring}
          />
          <Input
            label="Last Name"
            id="register-last-name"
            name="lastName"
            autoComplete="family-name"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            className={theme.ring}
          />
        </div>

        <Input
          label="Email Address"
          id="register-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)}
          error={errors.email}
          className={theme.ring}
        />
        <Input
          label="Password"
          id="register-password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="Create a password"
          description={`At least ${minPasswordLength} characters.`}
          value={formData.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)}
          error={errors.password}
          className={theme.ring}
        />
        <Input
          label="Confirm Password"
          id="register-confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          className={theme.ring}
        />

        <div className="pt-2 pb-2">
          <Checkbox
            theme={theme}
            label={
              <>
                I agree to the{" "}
                <a
                  href={termsHref}
                  className={cn("font-bold hover:underline", theme.text)}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href={privacyHref}
                  className={cn("font-bold hover:underline", theme.text)}
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
          theme={theme}
          className="w-full mt-4 shadow-lg shadow-black/5"
          disabled={loading}
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
              "font-bold hover:underline transition-all",
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
            <div className="flex items-center gap-2 font-black text-2xl tracking-tighter">
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
            <h1 className="text-4xl font-bold mb-4 leading-tight">
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
      "bg-white/65 dark:bg-zinc-950/65 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 dark:border-zinc-700/50",
    variant === "minimal" && "bg-transparent",
  );

  return (
    <div className={wrapperClass} style={style}>
      {FormContent}
    </div>
  );
}
