"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
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
export type LoginVariant = "default" | "split" | "glass" | "minimal";
export type LoginProvider = "github" | "google";

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
    <div className="flex items-start gap-2.5">
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

// --- MAIN COMPONENT ---
export default function LoginForm({
  variant = "default",
  color = "primary",
  signupHref = "#",
  forgotPasswordHref = "#",
  onSubmit,
  onSocialSignIn,
}: LoginFormProps) {
  const { theme, style } = getThemeStyles(color);

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

  const FormContent = (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-foreground tracking-tight mb-2">
          Welcome back
        </h2>
        <p className="text-sm text-muted-foreground font-medium">
          Enter your details to access your account.
        </p>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5 sm:gap-3 mb-5 sm:mb-6">
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("github")}
          iconLeft={<GitHubIcon size={18} />}
          className="w-full h-11 border border-border/80 bg-white/70 backdrop-blur-md hover:bg-card hover:text-foreground dark:bg-zinc-900/80"
        >
          GitHub
        </Button>
        <Button
          variant="ghost"
          type="button"
          color={color}
          onClick={() => onSocialSignIn?.("google")}
          iconLeft={<GoogleIcon size={18} />}
          className="w-full h-11 border border-border/80 bg-white/70 backdrop-blur-md hover:bg-card hover:text-foreground dark:bg-zinc-900/80"
        >
          Google
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
            label="Remember me"
            id="login-remember"
            checked={formData.remember}
            onCheckedChange={(c: boolean) => handleChange("remember", c)}
          />
          <a
            href={forgotPasswordHref}
            className={cn(
              "text-xs font-bold hover:underline transition-all shrink-0",
              theme.text,
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
          className="w-full h-11 mt-4 shadow-lg shadow-black/5"
        >
          {loading ? "Please wait..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground font-medium">
          Don&apos;t have an account?{" "}
          <a
            href={signupHref}
            className={cn(
              "font-bold hover:underline transition-all",
              theme.text,
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
            <div className="flex items-center gap-2 font-semibold text-2xl tracking-tighter">
              <div className="w-8 h-8 rounded-lg bg-current/20 flex items-center justify-center backdrop-blur-md">
                ⚡
              </div>
              Acme Inc.
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
            <h1 className="text-4xl font-bold mb-4 leading-tight">
              Welcome back. Pick up where you left off.
            </h1>
            <p className="font-medium opacity-80">
              Your projects, deployments and team are exactly as you left them.
              Sign in to get straight back to work.
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
