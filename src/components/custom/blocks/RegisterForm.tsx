"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Calendar, Check, ChevronDown, ChevronLeft, ChevronRight, Clock, Mail, X } from "lucide-react";
import Button from "./Button";
import { GitHubIcon, GoogleIcon } from "./Icons";
import { InputBlock } from "./InputBlock";
import { useEffect, useRef, useState } from "react";
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
export type RegisterVariant =
  | "scenic"
  | "default"
  | "split"
  | "glass"
  | "minimal"
  | "nature"
  | "landscape";
export type RegisterProvider = "github" | "google" | "apple";

export type ScenicStep =
  | "welcome"
  | "options"
  | "email"
  | "form"
  | "otp"
  | "onboarding-intro"
  | "goals"
  | "finances"
  | "confidence"
  | "emergency-fund"
  | "first-goal"
  | "summary"
  | "completed";

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
  /** Brand display name shown on scenic variant */
  brandName?: string;
  /** Custom logo icon */
  brandIcon?: React.ReactNode;
  /** Primary headline for the scenic card */
  title?: string;
  /** Subtitle / description for the scenic card */
  subtitle?: string;
  /** Label for primary get started action button */
  getStartedLabel?: string;
  /** Label for secondary existing account button */
  alreadyAccountLabel?: string;
  /** Scenic background image URL (e.g. Cloudinary) */
  bgImage?: string;
  /** Initial step for scenic mode */
  initialStep?: ScenicStep;
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
                  "border-muted-foreground/60 hover:border-muted-foreground",
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

// --- BRAND ICONS ---
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

export const AvyroIcon = DocsUiIcon;

export const AppleBrandIcon = ({
  className = "w-5 h-5",
  size = 19,
}: {
  className?: string;
  size?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 170 170"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.7-14.43-6.09-9.78-10.74-20.93-13.97-33.45-3.23-12.52-4.85-24.16-4.85-34.92 0-14.94 3.73-27.17 11.19-36.68 7.46-9.52 17.06-14.38 28.8-14.59 4.9 0 10.42 1.25 16.56 3.76 6.13 2.5 9.94 3.8 11.43 3.89 1.15-.09 5.25-1.47 12.3-4.14 7.05-2.67 13.06-3.83 18.03-3.48 13.62 1.09 24.36 6.25 32.22 15.49-11.87 7.18-17.7 17.07-17.5 29.68.22 10.02 4.12 18.39 11.71 25.11 7.59 6.72 16.76 10.66 27.52 11.83-2.18 6.75-4.78 13.41-7.81 19.98zm-30.82-108.97c0 7.29-2.67 14.17-8.01 20.65-5.34 6.47-11.96 10.37-19.86 11.7-.33-1.09-.49-2.07-.49-2.94 0-7.07 2.83-13.88 8.49-20.44 5.66-6.56 12.43-10.46 20.3-11.7.11.98.17 1.89.17 2.73z" />
  </svg>
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
  brandName = "Docs UI",
  brandIcon,
  title = "Take control of your financial wellbeing",
  subtitle = "Understand your money, build healthier habits, and make confident financial decisions",
  getStartedLabel = "Get Started",
  alreadyAccountLabel = "I already have an account",
  bgImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  initialStep = "welcome",
}: RegisterFormProps) {
  const { theme, style } = getThemeStyles(color);
  const focusInputClasses = cn(
    "outline-none transition-all duration-200",
    "focus:bg-white dark:focus:bg-[#18191b]",
    theme.focusBorder,
    theme.focusRing
  );
  const focusButtonClasses = cn(
    "outline-none transition-all duration-200 focus-visible:outline-none",
    theme.focusBorder,
    theme.focusRing
  );
  const scenicPrimaryButtonClasses = cn(
    theme.bg,
    theme.panelFg,
    focusButtonClasses
  );
  const scenicDropdownButtonClasses = (isOpen: boolean) =>
    cn(
      "w-full h-11 px-3.5 rounded-xl text-sm font-normal flex items-center justify-between transition-all duration-200 outline-none cursor-pointer",
      "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300 hover:bg-zinc-200/50",
      "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20 dark:hover:bg-[#25272a]",
      focusButtonClasses,
      isOpen && [
        theme.border,
        "ring-2",
        theme.focusRing,
        "bg-white dark:bg-[#1e1f21]",
      ]
    );
  const [scenicStep, setScenicStep] = useState<ScenicStep>(
    initialStep === "form" ? "email" : initialStep || "welcome",
  );
  const cardContentRef = useRef<HTMLDivElement>(null);
  const [cardHeight, setCardHeight] = useState<number | undefined>(undefined);

  // OTP state
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus areas state for "What would you like to improve first?"
  const [selectedAreas, setSelectedAreas] = useState<string[]>([
    "Save more",
    "Pay off",
  ]);

  // Financial profile state (Image 1)
  const [finances, setFinances] = useState({
    monthlyIncome: "$5,600",
    monthlyExpenses: "$3,800",
    employmentStatus: "Full-time",
    household: "Single",
    dependents: "0",
  });

  // Confidence ratings state (Image 2)
  const [confidenceRatings, setConfidenceRatings] = useState<{
    expenseCover: number;
    monthlyControl: number;
    futurePlan: number;
  }>({
    expenseCover: 4,
    monthlyControl: 3,
    futurePlan: 3,
  });

  // Emergency fund state (Image 3)
  const [emergencyFund, setEmergencyFund] = useState({
    hasFund: true,
    currentAmount: "$5,000",
    targetAmount: "$9,000",
  });

  // First goal state (Image 4)
  const [firstGoal, setFirstGoal] = useState({
    goalType: "Grow my net worth",
    currentNetWorth: "$23,950",
    targetNetWorth: "$30,000",
    targetDate: "March 2027",
    monthlyContribution: "$75",
  });

  // Custom dropdown & date picker modal states
  const [activeDropdown, setActiveDropdown] = useState<{
    title: string;
    field: "employmentStatus" | "household" | "dependents" | "goalType";
    options: string[];
  } | null>(null);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [datePickerYear, setDatePickerYear] = useState(2027);
  const [datePickerMonth, setDatePickerMonth] = useState("March");

  const openDatePicker = () => {
    const parts = firstGoal.targetDate.trim().split(/\s+/);
    if (parts.length >= 2) {
      const mStr = parts[0];
      const yNum = parseInt(parts[1], 10);
      const monthNames = [
        { short: "Jan", full: "January" },
        { short: "Feb", full: "February" },
        { short: "Mar", full: "March" },
        { short: "Apr", full: "April" },
        { short: "May", full: "May" },
        { short: "Jun", full: "June" },
        { short: "Jul", full: "July" },
        { short: "Aug", full: "August" },
        { short: "Sep", full: "September" },
        { short: "Oct", full: "October" },
        { short: "Nov", full: "November" },
        { short: "Dec", full: "December" },
      ];
      const found = monthNames.find(
        (m) =>
          m.short.toLowerCase() === mStr.slice(0, 3).toLowerCase() ||
          m.full.toLowerCase() === mStr.toLowerCase()
      );
      if (found) setDatePickerMonth(found.full);
      if (!isNaN(yNum)) setDatePickerYear(yNum);
    }
    setIsDatePickerOpen(true);
  };

  const focusOptions = [
    { id: "save-more", label: "Save more" },
    { id: "pay-off", label: "Pay off" },
    { id: "spend-smarter", label: "Spend smarter" },
    { id: "emergency-fund", label: "Emergency fund" },
    { id: "stress-less", label: "Stress less" },
    { id: "grow-wealth", label: "Grow wealth" },
  ];

  const handleOtpChange = (index: number, value: string) => {
    const clean = value.replace(/\D/g, "");
    if (!clean) {
      const nextOtp = [...otp];
      nextOtp[index] = "";
      setOtp(nextOtp);
      return;
    }
    const nextOtp = [...otp];
    if (clean.length > 1) {
      const digits = clean.slice(0, 6).split("");
      digits.forEach((d, i) => {
        if (index + i < 6) nextOtp[index + i] = d;
      });
      setOtp(nextOtp);
      const nextFocus = Math.min(index + digits.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }
    nextOtp[index] = clean[0];
    setOtp(nextOtp);
    if (index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    const nextOtp = [...otp];
    pasted.split("").forEach((d, i) => {
      if (i < 6) nextOtp[i] = d;
    });
    setOtp(nextOtp);
    const focusIndex = Math.min(pasted.length, 5);
    otpInputRefs.current[focusIndex]?.focus();
  };

  const toggleFocusArea = (label: string) => {
    setSelectedAreas((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      }
      if (prev.length < 2) {
        return [...prev, label];
      }
      return [prev[1], label];
    });
  };

  useEffect(() => {
    if (!cardContentRef.current) return;
    const updateHeight = () => {
      if (cardContentRef.current) {
        setCardHeight(cardContentRef.current.offsetHeight);
      }
    };
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(cardContentRef.current);
    return () => observer.disconnect();
  }, [scenicStep]);

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
    if (
      variant === "scenic" ||
      variant === "nature" ||
      variant === "landscape"
    ) {
      setScenicStep("otp");
      return;
    }
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

  if (
    variant === "scenic" ||
    variant === "nature" ||
    variant === "landscape"
  ) {
    return (
      <div
        className="relative w-full min-h-[580px] sm:min-h-[640px] flex items-center justify-center overflow-hidden rounded-3xl p-4 sm:p-6 md:p-8"
        style={style}
      >
        <style>{`
          @keyframes scenic-slide-right {
            0% {
              opacity: 0;
              transform: translateX(-24px);
            }
            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
          @keyframes scenic-modal-in {
            0% {
              opacity: 0;
              transform: scale(0.94) translateY(12px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          @keyframes scenic-header-zoom {
            0% {
              opacity: 0;
              transform: translateX(-32px) scale(1.12);
            }
            60% {
              opacity: 1;
              transform: translateX(4px) scale(0.98);
            }
            100% {
              opacity: 1;
              transform: translateX(0) scale(1);
            }
          }
          @keyframes scenic-spring-bounce {
            0% {
              opacity: 0;
              transform: translateY(26px) scale(0.92);
            }
            55% {
              opacity: 0.95;
              transform: translateY(-6px) scale(1.03);
            }
            80% {
              transform: translateY(2px) scale(0.99);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes scenic-footer-spring {
            0% {
              opacity: 0;
              transform: translateY(26px) scale(0.94);
            }
            60% {
              opacity: 1;
              transform: translateY(-4px) scale(1.02);
            }
            85% {
              transform: translateY(1.5px) scale(0.995);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          @keyframes scenic-stagger-rise {
            0% {
              opacity: 0;
              transform: translateY(22px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes scenic-fade-in {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>

        {/* Full-bleed scenic nature background */}
        <img
          src={bgImage}
          alt="Scenic nature landscape background"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />

        {/* Floating Card with smooth animated height */}
        <div
          className={cn(
            "relative z-10 w-full max-w-[440px] rounded-[28px] overflow-hidden transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
            // Light mode: clean frosted white card, crisp dark text, delicate border, deep ambient shadow
            "bg-white/95 text-zinc-900 border border-zinc-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-xl",
            // Dark mode: deep charcoal card matching screenshot, crisp white text, subtle translucent border
            "dark:bg-[#131415]/95 dark:text-white dark:border-white/10 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]"
          )}
          style={{
            height: cardHeight ? `${cardHeight}px` : "auto",
          }}
        >
          <div ref={cardContentRef} className="p-6 sm:p-8 md:p-9">
            {scenicStep === "welcome" && (
              <div
                className="flex flex-col items-center text-center"
                style={{
                  animation:
                    "scenic-fade-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) backwards",
                }}
              >
                {/* Brand Header */}
                <div
                  className="flex items-center gap-2 mb-6"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  {brandIcon || (
                    <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                  )}
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-3 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  {title}
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 max-w-[340px] mb-8 leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  {subtitle}
                </p>

                {/* Actions */}
                <div
                  className="w-full flex flex-col gap-3"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                  }}
                >
                  {/* Primary Button */}
                  <button
                    type="button"
                    onClick={() => setScenicStep("options")}
                    className={cn(
                      "w-full h-12 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    {getStartedLabel}
                  </button>

                  {/* Secondary Button */}
                  <a
                    href={loginHref}
                    className={cn(
                      "w-full h-11 flex items-center justify-center rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                      // Light mode: subtle light tint
                      "bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/90 border border-zinc-200/60",
                      // Dark mode: translucent dark pill from screenshot
                      "dark:bg-white/[0.08] dark:text-white/85 dark:hover:bg-white/[0.14] dark:border-white/5",
                      focusButtonClasses
                    )}
                  >
                    {alreadyAccountLabel}
                  </a>
                </div>
              </div>
            )}

            {scenicStep === "options" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Back button and Brand */}
                <div
                  className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-200/60 dark:border-white/10"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
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

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Create your account
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-7"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  Choose how you'd like to get started
                </p>

                {/* Staggered action buttons */}
                <div className="w-full flex flex-col gap-3">
                  {/* Google Button */}
                  <button
                    type="button"
                    onClick={() => onSocialSignUp?.("google")}
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                    }}
                    className={cn(
                      "w-full h-[52px] rounded-2xl flex items-center justify-center gap-3 px-4 font-medium text-[15px] transition-all duration-200 active:scale-[0.98]",
                      "bg-zinc-100 hover:bg-zinc-200/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1e1f21] dark:hover:bg-[#282a2d] dark:text-white dark:border-white/[0.08]",
                      focusButtonClasses
                    )}
                  >
                    <GoogleIcon size={19} className="shrink-0" />
                    <span>Continue with Google</span>
                  </button>

                  {/* Apple Button */}
                  <button
                    type="button"
                    onClick={() => onSocialSignUp?.("apple")}
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.30s backwards",
                    }}
                    className={cn(
                      "w-full h-[52px] rounded-2xl flex items-center justify-center gap-3 px-4 font-medium text-[15px] transition-all duration-200 active:scale-[0.98]",
                      "bg-zinc-100 hover:bg-zinc-200/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1e1f21] dark:hover:bg-[#282a2d] dark:text-white dark:border-white/[0.08]",
                      focusButtonClasses
                    )}
                  >
                    <AppleBrandIcon
                      size={19}
                      className="shrink-0 text-zinc-900 dark:text-white"
                    />
                    <span>Continue with Apple</span>
                  </button>

                  {/* Email Button */}
                  <button
                    type="button"
                    onClick={() => setScenicStep("email")}
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                    className={cn(
                      "w-full h-[52px] rounded-2xl flex items-center justify-center gap-3 px-4 font-medium text-[15px] transition-all duration-200 active:scale-[0.98]",
                      "bg-zinc-100 hover:bg-zinc-200/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1e1f21] dark:hover:bg-[#282a2d] dark:text-white dark:border-white/[0.08]",
                      focusButtonClasses
                    )}
                  >
                    <Mail size={19} className="shrink-0 text-current" />
                    <span>Continue with Email</span>
                  </button>
                </div>

                {/* Footer link */}
                <div
                  className="mt-6 text-center"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
                  }}
                >
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <a
                      href={loginHref}
                      className="font-semibold text-zinc-900 dark:text-white hover:underline transition-colors ml-0.5"
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            )}

            {scenicStep === "email" && (
              <div>
                {/* Form Step Header with Back Button */}
                <div
                  className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/60 dark:border-white/10"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("options")}
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
                  <h3
                    className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white mb-1"
                    style={{
                      animation:
                        "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                    }}
                  >
                    Create an account
                  </h3>
                  <p
                    className="text-xs text-zinc-500 dark:text-zinc-400"
                    style={{
                      animation:
                        "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                    }}
                  >
                    Fill in your details below to get started.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.20s backwards",
                    }}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <InputBlock
                        label="First Name"
                        id="register-scenic-first-name"
                        name="firstName"
                        autoComplete="given-name"
                        placeholder="Jane"
                        value={formData.firstName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange("firstName", e.target.value)
                        }
                        error={errors.firstName}
                        color={color}
                      />
                      <InputBlock
                        label="Last Name"
                        id="register-scenic-last-name"
                        name="lastName"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleChange("lastName", e.target.value)
                        }
                        error={errors.lastName}
                        color={color}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.26s backwards",
                    }}
                  >
                    <InputBlock
                      label="Email Address"
                      id="register-scenic-email"
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
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.32s backwards",
                    }}
                  >
                    <InputBlock
                      label="Password"
                      id="register-scenic-password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("password", e.target.value)
                      }
                      error={errors.password}
                      color={color}
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                  >
                    <InputBlock
                      label="Confirm Password"
                      id="register-scenic-confirm-password"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange("confirmPassword", e.target.value)
                      }
                      error={errors.confirmPassword}
                      color={color}
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.44s backwards",
                    }}
                  >
                    <Checkbox
                      id="register-scenic-agree"
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) =>
                        handleChange("agreeToTerms", checked)
                      }
                      error={errors.agreeToTerms}
                      theme={theme}
                      label={
                        <span>
                          I agree to the{" "}
                          <a
                            href={termsHref}
                            className={cn(
                              "underline underline-offset-2",
                              theme.text
                            )}
                          >
                            Terms
                          </a>{" "}
                          and{" "}
                          <a
                            href={privacyHref}
                            className={cn(
                              "underline underline-offset-2",
                              theme.text
                            )}
                          >
                            Privacy Policy
                          </a>
                        </span>
                      }
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.50s backwards",
                    }}
                  >
                    <button
                      type="submit"
                      disabled={loading}
                      className={cn(
                        "w-full h-11 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center gap-2 mt-2 disabled:opacity-60",
                        scenicPrimaryButtonClasses
                      )}
                    >
                      {loading ? (
                        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        "Create Account"
                      )}
                    </button>
                  </div>
                </form>

                {/* Footer link */}
                <div
                  className="mt-4 text-center"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.58s backwards",
                  }}
                >
                  <p className="text-xs sm:text-[13px] text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <a
                      href={loginHref}
                      className="font-semibold text-zinc-900 dark:text-white hover:underline transition-colors ml-0.5"
                    >
                      Log in
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* STEP 4: OTP VERIFICATION */}
            {scenicStep === "otp" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Back button and Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-6"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("email")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to email form"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Verify your email
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-7 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  We've sent a 6-digit code to{" "}
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {formData.email || "artur@gmail.com"}
                  </span>
                </p>

                {/* 6 OTP Input Boxes */}
                <div
                  className="flex items-center justify-between gap-2 sm:gap-2.5 mb-7 w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.24s backwards",
                  }}
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      onPaste={handleOtpPaste}
                      className={cn(
                        "w-full h-12 sm:h-14 rounded-2xl text-center text-lg sm:text-xl font-semibold transition-all duration-200 outline-none",
                        "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80 focus:bg-white",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:focus:bg-[#25272a]",
                        focusInputClasses
                      )}
                    />
                  ))}
                </div>

                {/* Submit Action */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.32s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("onboarding-intro")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Verify &amp; Continue
                  </button>
                </div>

                {/* Resend & Change email */}
                <div
                  className="mt-5 text-center flex items-center justify-center gap-3 text-xs text-zinc-500 dark:text-zinc-400"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.40s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("email")}
                    className="hover:underline transition-colors text-zinc-600 dark:text-zinc-300"
                  >
                    Change email
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => alert("A new 6-digit code has been sent!")}
                    className="font-medium text-zinc-900 dark:text-white hover:underline transition-colors"
                  >
                    Resend code
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: ONBOARDING INTRO */}
            {scenicStep === "onboarding-intro" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-6"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("otp")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to OTP"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-3 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Let's build your financial picture
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-7 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  Answer a few questions so we can personalize your dashboard, insights, and recommendations.
                </p>

                {/* Time estimate badge */}
                <div
                  className="flex justify-center mb-8"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.24s backwards",
                  }}
                >
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-[13px] font-medium transition-colors",
                      "bg-zinc-100 text-zinc-700 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1e1f21] dark:text-zinc-300 dark:border-white/[0.08]"
                    )}
                  >
                    <Clock size={14} className="shrink-0 opacity-70" />
                    <span>Takes about 3 minutes</span>
                  </div>
                </div>

                {/* Action button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.32s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("goals")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Let's start
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: GOALS & FOCUS AREAS */}
            {scenicStep === "goals" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("onboarding-intro")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to intro"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  What would you like to improve first?
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  Choose up to 2 areas to focus on.
                </p>

                {/* 6 Selectable Options Grid (3 cols x 2 rows) */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3 mb-5 w-full">
                  {focusOptions.map((opt, idx) => {
                    const isSelected = selectedAreas.includes(opt.label);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => toggleFocusArea(opt.label)}
                        style={{
                          animation: `scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) ${0.20 + idx * 0.04}s backwards`,
                        }}
                        className={cn(
                          "relative flex flex-col justify-between p-3 sm:p-3.5 rounded-2xl text-left min-h-[76px] sm:min-h-[88px] transition-all duration-200 active:scale-[0.97]",
                          !isSelected && [
                            "bg-zinc-100/90 text-zinc-800 border border-zinc-200/80 hover:bg-zinc-200/70",
                            "dark:bg-[#1e1f21] dark:text-white/90 dark:border-white/[0.08] dark:hover:bg-[#25272a] dark:hover:border-white/15",
                          ],
                          isSelected && [
                            theme.bg,
                            theme.panelFg,
                            "border-transparent shadow-md ring-2 ring-black/10 dark:ring-white/20",
                          ]
                        )}
                      >
                        <span className="text-xs sm:text-[13px] font-medium leading-tight select-none">
                          {opt.label}
                        </span>
                        <div className="self-end mt-2">
                          <div
                            className={cn(
                              "w-4 h-4 rounded-md border transition-all flex items-center justify-center",
                              isSelected
                                ? cn("bg-white", theme.text, "border-white shadow-sm")
                                : "border-zinc-300 dark:border-white/20 bg-transparent"
                            )}
                          >
                            {isSelected && <Check size={10} strokeWidth={3} />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Counter */}
                <div
                  className="mb-5 text-center"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.44s backwards",
                  }}
                >
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    {selectedAreas.length} of 2 selected
                  </p>
                </div>

                {/* Continue button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.50s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("finances")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 7: FINANCES (Tell us about your finances) */}
            {scenicStep === "finances" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("goals")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to goals"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Tell us about your finances
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  This helps us understand your monthly financial picture and personalize your insights.
                </p>

                {/* Form fields */}
                <div className="w-full flex flex-col gap-3.5 mb-6 text-left">
                  {/* Row 1: Income & Expenses */}
                  <div
                    className="grid grid-cols-2 gap-3"
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                    }}
                  >
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Monthly income
                      </label>
                      <input
                        type="text"
                        value={finances.monthlyIncome}
                        onChange={(e) =>
                          setFinances((prev) => ({
                            ...prev,
                            monthlyIncome: e.target.value,
                          }))
                        }
                        className={cn(
                          "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none",
                          "bg-zinc-100 text-zinc-900 border border-zinc-200/80",
                          "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08]",
                          focusInputClasses
                        )}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Monthly expenses
                      </label>
                      <input
                        type="text"
                        value={finances.monthlyExpenses}
                        onChange={(e) =>
                          setFinances((prev) => ({
                            ...prev,
                            monthlyExpenses: e.target.value,
                          }))
                        }
                        className={cn(
                          "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none",
                          "bg-zinc-100 text-zinc-900 border border-zinc-200/80",
                          "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08]",
                          focusInputClasses
                        )}
                      />
                    </div>
                  </div>

                  {/* Row 2: Employment status & Household - Custom Modals */}
                  <div
                    className="grid grid-cols-2 gap-3"
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.30s backwards",
                    }}
                  >
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Employment status
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown({
                            title: "Employment Status",
                            field: "employmentStatus",
                            options: [
                              "Full-time",
                              "Part-time",
                              "Self-employed",
                              "Freelance",
                              "Student",
                              "Retired",
                            ],
                          })
                        }
                        className={scenicDropdownButtonClasses(
                          activeDropdown?.field === "employmentStatus"
                        )}
                      >
                        <span className="truncate">{finances.employmentStatus}</span>
                        <ChevronDown size={15} className={cn("opacity-70 shrink-0 transition-colors", theme.text)} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                        Household
                      </label>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown({
                            title: "Household",
                            field: "household",
                            options: ["Single", "Married", "Partnered", "Family"],
                          })
                        }
                        className={scenicDropdownButtonClasses(
                          activeDropdown?.field === "household"
                        )}
                      >
                        <span className="truncate">{finances.household}</span>
                        <ChevronDown size={15} className={cn("opacity-70 shrink-0 transition-colors", theme.text)} />
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Dependents - Custom Modal */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Dependents
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown({
                          title: "Dependents",
                          field: "dependents",
                          options: ["0", "1", "2", "3+"],
                        })
                      }
                      className={scenicDropdownButtonClasses(
                        activeDropdown?.field === "dependents"
                      )}
                    >
                      <span className="truncate">{finances.dependents}</span>
                      <ChevronDown size={15} className={cn("opacity-70 shrink-0 transition-colors", theme.text)} />
                    </button>
                  </div>
                </div>

                {/* Continue button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("confidence")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 8: CONFIDENCE (How financially confident do you feel right now?) */}
            {scenicStep === "confidence" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("finances")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to finances"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  How financially confident do you feel right now?
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  Your answers help us understand your financial habits and personalize your insights.
                </p>

                {/* 3 Rating Questions */}
                <div className="w-full flex flex-col gap-4 mb-6 text-left">
                  {/* Question 1 */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                    }}
                  >
                    <p className="text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      I could cover an unexpected $1,000 expense.
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected =
                          confidenceRatings.expenseCover === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setConfidenceRatings((prev) => ({
                                ...prev,
                                expenseCover: val,
                              }))
                            }
                            className={cn(
                              "h-11 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 flex items-center justify-center",
                              focusButtonClasses,
                              !isSelected && [
                                "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80",
                                "dark:bg-[#1e1f21] dark:text-zinc-300 dark:border-white/[0.08] dark:hover:bg-[#282a2e]",
                              ],
                              isSelected && [
                                theme.bg,
                                theme.panelFg,
                                "border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20",
                              ]
                            )}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.30s backwards",
                    }}
                  >
                    <p className="text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      I feel in control of my monthly spending.
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected =
                          confidenceRatings.monthlyControl === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setConfidenceRatings((prev) => ({
                                ...prev,
                                monthlyControl: val,
                              }))
                            }
                            className={cn(
                              "h-11 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 flex items-center justify-center",
                              focusButtonClasses,
                              !isSelected && [
                                "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80",
                                "dark:bg-[#1e1f21] dark:text-zinc-300 dark:border-white/[0.08] dark:hover:bg-[#282a2e]",
                              ],
                              isSelected && [
                                theme.bg,
                                theme.panelFg,
                                "border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20",
                              ]
                            )}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                  >
                    <p className="text-xs sm:text-[13px] font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                      I have a clear plan for my financial future.
                    </p>
                    <div className="grid grid-cols-5 gap-2">
                      {[1, 2, 3, 4, 5].map((val) => {
                        const isSelected =
                          confidenceRatings.futurePlan === val;
                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() =>
                              setConfidenceRatings((prev) => ({
                                ...prev,
                                futurePlan: val,
                              }))
                            }
                            className={cn(
                              "h-11 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 active:scale-95 flex items-center justify-center",
                              focusButtonClasses,
                              !isSelected && [
                                "bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 border border-zinc-200/80",
                                "dark:bg-[#1e1f21] dark:text-zinc-300 dark:border-white/[0.08] dark:hover:bg-[#282a2e]",
                              ],
                              isSelected && [
                                theme.bg,
                                theme.panelFg,
                                "border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20",
                              ]
                            )}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Continue button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("emergency-fund")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 9: EMERGENCY FUND */}
            {scenicStep === "emergency-fund" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("confidence")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to confidence"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Do you have an emergency fund?
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  This helps us understand how prepared you are for unexpected expenses.
                </p>

                {/* Toggle Pills: Yes I have one / Not Yet */}
                <div
                  className="grid grid-cols-2 gap-2.5 w-full mb-5"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setEmergencyFund((prev) => ({ ...prev, hasFund: true }))
                    }
                    className={cn(
                      "h-12 rounded-2xl px-4 flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                      focusButtonClasses,
                      emergencyFund.hasFund
                        ? [
                            theme.bg,
                            theme.panelFg,
                            "border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20",
                          ]
                        : [
                            "bg-zinc-100 text-zinc-700 border border-zinc-200/80 hover:bg-zinc-200/70",
                            "dark:bg-[#1e1f21] dark:text-zinc-400 dark:border-white/[0.08] dark:hover:bg-[#25272a]",
                          ]
                    )}
                  >
                    <span>Yes I have one</span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-md flex items-center justify-center transition-all",
                        emergencyFund.hasFund
                          ? cn("bg-white", theme.text, "border border-white shadow-sm")
                          : "border border-zinc-300 dark:border-white/20 bg-transparent"
                      )}
                    >
                      {emergencyFund.hasFund && (
                        <Check size={10} strokeWidth={3} />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setEmergencyFund((prev) => ({ ...prev, hasFund: false }))
                    }
                    className={cn(
                      "h-12 rounded-2xl px-4 flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                      focusButtonClasses,
                      !emergencyFund.hasFund
                        ? [
                            theme.bg,
                            theme.panelFg,
                            "border-transparent shadow-sm ring-1 ring-black/10 dark:ring-white/20",
                          ]
                        : [
                            "bg-zinc-100 text-zinc-700 border border-zinc-200/80 hover:bg-zinc-200/70",
                            "dark:bg-[#1e1f21] dark:text-zinc-400 dark:border-white/[0.08] dark:hover:bg-[#25272a]",
                          ]
                    )}
                  >
                    <span>Not Yet</span>
                    <div
                      className={cn(
                        "w-4 h-4 rounded-md flex items-center justify-center transition-all",
                        !emergencyFund.hasFund
                          ? cn("bg-white", theme.text, "border border-white shadow-sm")
                          : "border border-zinc-300 dark:border-white/20 bg-transparent"
                      )}
                    >
                      {!emergencyFund.hasFund && (
                        <Check size={10} strokeWidth={3} />
                      )}
                    </div>
                  </button>
                </div>

                {/* Amount inputs */}
                <div className="w-full flex flex-col gap-3.5 mb-6 text-left">
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.30s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Current amount
                    </label>
                    <input
                      type="text"
                      value={emergencyFund.currentAmount}
                      onChange={(e) =>
                        setEmergencyFund((prev) => ({
                          ...prev,
                          currentAmount: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none transition-all duration-200",
                        "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20",
                        focusInputClasses
                      )}
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Target amount
                    </label>
                    <input
                      type="text"
                      value={emergencyFund.targetAmount}
                      onChange={(e) =>
                        setEmergencyFund((prev) => ({
                          ...prev,
                          targetAmount: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none transition-all duration-200",
                        "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20",
                        focusInputClasses
                      )}
                    />
                  </div>
                </div>

                {/* Continue button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("first-goal")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* STEP 10: FIRST GOAL */}
            {scenicStep === "first-goal" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("emergency-fund")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to emergency fund"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Let's set your first goal
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  We'll turn one of your priorities into a simple, achievable plan.
                </p>

                {/* Goal Form Fields */}
                <div className="w-full flex flex-col gap-3 mb-6 text-left">
                  {/* Goal Dropdown - Custom Modal */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Goal
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveDropdown({
                          title: "Goal",
                          field: "goalType",
                          options: [
                            "Grow my net worth",
                            "Pay off credit card debt",
                            "Save for emergency",
                            "Save for down payment",
                          ],
                        })
                      }
                      className={scenicDropdownButtonClasses(
                        activeDropdown?.field === "goalType"
                      )}
                    >
                      <span className="truncate">{firstGoal.goalType}</span>
                      <ChevronDown size={15} className={cn("opacity-70 shrink-0 transition-colors", theme.text)} />
                    </button>
                  </div>

                  {/* Current net worth */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Current net worth
                    </label>
                    <input
                      type="text"
                      value={firstGoal.currentNetWorth}
                      onChange={(e) =>
                        setFirstGoal((prev) => ({
                          ...prev,
                          currentNetWorth: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none transition-all duration-200",
                        "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20",
                        focusInputClasses
                      )}
                    />
                  </div>

                  {/* Target net worth */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.34s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Target net worth
                    </label>
                    <input
                      type="text"
                      value={firstGoal.targetNetWorth}
                      onChange={(e) =>
                        setFirstGoal((prev) => ({
                          ...prev,
                          targetNetWorth: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none transition-all duration-200",
                        "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20",
                        focusInputClasses
                      )}
                    />
                  </div>

                  {/* Target date with custom Date Picker modal trigger */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.40s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Target date
                    </label>
                    <button
                      type="button"
                      onClick={openDatePicker}
                      className={scenicDropdownButtonClasses(isDatePickerOpen)}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <span>{firstGoal.targetDate}</span>
                        <Calendar size={14} className={cn("shrink-0 transition-colors", theme.text)} />
                      </span>
                      <ChevronDown size={15} className={cn("opacity-70 shrink-0 transition-colors", theme.text)} />
                    </button>
                  </div>

                  {/* Monthly contribution */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
                    }}
                  >
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                      Monthly contribution
                    </label>
                    <input
                      type="text"
                      value={firstGoal.monthlyContribution}
                      onChange={(e) =>
                        setFirstGoal((prev) => ({
                          ...prev,
                          monthlyContribution: e.target.value,
                        }))
                      }
                      className={cn(
                        "w-full h-11 px-3.5 rounded-xl text-sm font-normal outline-none transition-all duration-200",
                        "bg-zinc-100 text-zinc-900 border border-zinc-200/80 hover:border-zinc-300",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08] dark:hover:border-white/20",
                        focusInputClasses
                      )}
                    />
                  </div>
                </div>

                {/* Create Goal Button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.52s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("summary")}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Create Goal
                  </button>
                </div>
              </div>
            )}

            {/* STEP 11: SUMMARY (Your financial picture is ready) */}
            {scenicStep === "summary" && (
              <div className="flex flex-col items-center text-center">
                {/* Header with Brand */}
                <div
                  className="relative w-full flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("first-goal")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to first goal"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    {brandIcon || (
                      <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                    )}
                    <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                      {brandName}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  Your financial picture is ready
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-6 max-w-[340px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  Here's your starting point and where you can make the biggest impact.
                </p>

                {/* 4 Metric Cards (2x2 grid) matching Image 5 */}
                <div className="grid grid-cols-2 gap-3 mb-6 w-full text-left">
                  {/* Card 1: Top Strength */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                    }}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col justify-between min-h-[96px] transition-all",
                      "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1a1b1e] dark:text-white dark:border-white/[0.08]"
                    )}
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Top Strength
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white my-1">
                      72
                    </span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                      Income stability
                    </span>
                  </div>

                  {/* Card 2: Priority Area */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s backwards",
                    }}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col justify-between min-h-[96px] transition-all",
                      "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1a1b1e] dark:text-white dark:border-white/[0.08]"
                    )}
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Priority Area
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white my-1">
                      45
                    </span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                      Debt management
                    </span>
                  </div>

                  {/* Card 3: Emergency Fund */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.34s backwards",
                    }}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col justify-between min-h-[96px] transition-all",
                      "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1a1b1e] dark:text-white dark:border-white/[0.08]"
                    )}
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Emergency Fund
                    </span>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white my-1">
                      $5K of $9K
                    </span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                      56% of target reached
                    </span>
                  </div>

                  {/* Card 4: Primary goal */}
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.40s backwards",
                    }}
                    className={cn(
                      "p-4 rounded-2xl flex flex-col justify-between min-h-[96px] transition-all",
                      "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80 shadow-sm",
                      "dark:bg-[#1a1b1e] dark:text-white dark:border-white/[0.08]"
                    )}
                  >
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      Primary goal
                    </span>
                    <span className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white my-1">
                      $30K
                    </span>
                    <span className="text-[11px] text-zinc-600 dark:text-zinc-400 font-medium">
                      Net worth
                    </span>
                  </div>
                </div>

                {/* Go to Dashboard button */}
                <div
                  className="w-full"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.48s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (onSubmit) {
                        onSubmit(formData);
                      }
                      setScenicStep("completed");
                    }}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Go to Dashboard
                  </button>
                </div>
              </div>
            )}

            {/* STEP 12: COMPLETED STATE */}
            {scenicStep === "completed" && (
              <div className="flex flex-col items-center text-center py-4">
                {/* Brand */}
                <div
                  className="flex items-center gap-2 mb-6"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.04s backwards",
                  }}
                >
                  {brandIcon || (
                    <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white" />
                  )}
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
                </div>

                {/* Success check badge */}
                <div
                  className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.10s backwards",
                  }}
                >
                  <Check size={26} strokeWidth={2.6} />
                </div>

                {/* Title */}
                <h2
                  className="text-2xl sm:text-[28px] font-medium tracking-tight text-zinc-900 dark:text-white mb-2 leading-snug"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.16s backwards",
                  }}
                >
                  You're all set!
                </h2>

                {/* Subtitle */}
                <p
                  className="text-xs sm:text-sm text-zinc-600 dark:text-white/70 mb-7 max-w-[320px] leading-relaxed"
                  style={{
                    animation:
                      "scenic-slide-right 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.22s backwards",
                  }}
                >
                  Your profile and focus areas have been customized. Welcome aboard!
                </p>

                {/* Restart demo button */}
                <div
                  className="w-full flex flex-col gap-2.5"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.30s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setScenicStep("welcome");
                      setOtp(["", "", "", "", "", ""]);
                    }}
                    className={cn(
                      "w-full h-12 rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm flex items-center justify-center",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    Restart Demo Flow
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CUSTOM DROPDOWN MODAL */}
        {activeDropdown && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setActiveDropdown(null)}
          >
            <div
              className="relative w-full max-w-[360px] bg-white dark:bg-[#18191b] border border-zinc-200/90 dark:border-white/10 rounded-[24px] p-5 shadow-2xl flex flex-col gap-3 text-left"
              style={{
                animation:
                  "scenic-modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) backwards",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.08]">
                <div>
                  <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-white">
                    {activeDropdown.title}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Select one option
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveDropdown(null)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="max-h-[280px] overflow-y-auto space-y-1.5 py-1 pr-1">
                {activeDropdown.options.map((opt) => {
                  const isSelected =
                    activeDropdown.field === "goalType"
                      ? firstGoal.goalType === opt
                      : finances[activeDropdown.field] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        if (activeDropdown.field === "goalType") {
                          setFirstGoal((prev) => ({ ...prev, goalType: opt }));
                        } else {
                          setFinances((prev) => ({
                            ...prev,
                            [activeDropdown.field]: opt,
                          }));
                        }
                        setActiveDropdown(null);
                      }}
                      className={cn(
                        "w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all duration-150 text-left",
                        focusButtonClasses,
                        isSelected
                          ? cn(theme.bg, theme.panelFg, "shadow-sm")
                          : "bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/90 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10"
                      )}
                    >
                      <span>{opt}</span>
                      {isSelected && <Check size={16} strokeWidth={2.5} className={theme.panelFg} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CUSTOM DATE PICKER MODAL */}
        {isDatePickerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setIsDatePickerOpen(false)}
          >
            <div
              className="relative w-full max-w-[360px] bg-white dark:bg-[#18191b] border border-zinc-200/90 dark:border-white/10 rounded-[24px] p-5 shadow-2xl flex flex-col gap-4 text-left"
              style={{
                animation:
                  "scenic-modal-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) backwards",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-white/[0.08]">
                <div>
                  <h3 className="font-semibold text-[15px] text-zinc-900 dark:text-white">
                    Select Target Date
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Month and year for your goal
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Year Navigation */}
              <div className="flex items-center justify-between px-2 py-1 bg-zinc-100/80 dark:bg-white/[0.05] rounded-xl">
                <button
                  type="button"
                  onClick={() => setDatePickerYear((y) => y - 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
                  aria-label="Previous year"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                  {datePickerYear}
                </span>
                <button
                  type="button"
                  onClick={() => setDatePickerYear((y) => y + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
                  aria-label="Next year"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* 12 Months Grid */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((m) => {
                  const isSelected = datePickerMonth === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setDatePickerMonth(m)}
                      className={cn(
                        "h-10 rounded-xl text-xs font-medium transition-all duration-150 flex items-center justify-center",
                        focusButtonClasses,
                        isSelected
                          ? cn(theme.bg, theme.panelFg, "font-semibold shadow-sm")
                          : "bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200/90 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10"
                      )}
                    >
                      {m.slice(0, 3)}
                    </button>
                  );
                })}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-2 pt-2 border-t border-zinc-100 dark:border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsDatePickerOpen(false)}
                  className={cn(
                    "flex-1 h-10 rounded-xl text-xs sm:text-sm font-medium bg-zinc-100 text-zinc-700 hover:bg-zinc-200/80 dark:bg-white/[0.05] dark:text-zinc-300 dark:hover:bg-white/10 transition-colors",
                    focusButtonClasses
                  )}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFirstGoal((prev) => ({
                      ...prev,
                      targetDate: `${datePickerMonth} ${datePickerYear}`,
                    }));
                    setIsDatePickerOpen(false);
                  }}
                  className={cn(
                    "flex-1 h-10 rounded-xl text-xs sm:text-sm font-semibold transition-colors shadow-sm",
                    scenicPrimaryButtonClasses
                  )}
                >
                  Apply Date
                </button>
              </div>
            </div>
          </div>
        )}
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
