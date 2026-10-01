"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { springLinear } from "./motion-curves";
import { GoogleIcon } from "./Icons";
import { getThemeStyles } from "./register-form-theme";

// ==========================================
// MOTION
// ==========================================
// The default fade for opacity and height.
const FADE_EASE = "cubic-bezier(0.25, 0.1, 0.35, 1)";
// The default spring for a short vertical move.
const Y_SPRING = springLinear({ stiffness: 500, damping: 25 });
// The form rows rise in on this spring.
const ITEM_SPRING = springLinear({ stiffness: 300, damping: 24 });
// The checkmark's `{ type: "spring", bounce: 0.5 }`: 800ms, stiffness 252.69,
// damping 15.9, landing exactly on 1 at the end.
const TICK_SPRING =
  "linear(0, 0.032, 0.1159, 0.2345, 0.3724, 0.5167, 0.657, 0.7857, 0.8976, 0.9897, 1.061, 1.112, 1.1442, 1.1601, 1.1625, 1.1544, 1.1387, 1.1181, 1.0951, 1.0716, 1.0492, 1.029, 1.0117, 0.9977, 0.9872, 0.9798, 0.9754, 0.9736, 0.9738, 0.9755, 0.9784, 0.9819, 0.9857, 0.9895, 0.993, 0.9962, 0.9988, 1.001, 1.0025, 1.0036, 1.0041, 1.0043, 1.0042, 1.0039, 1.0034, 1.0028, 1.0021, 1.0015, 1)";
const TICK_DURATION = 800;
// circOut (a quarter circle), sampled densely where it starts steep.
const CIRC_OUT =
  "linear(0, 0.0078 0.003%, 0.0221 0.024%, 0.0406 0.082%, 0.0625 0.195%, 0.0873 0.382%, 0.1146 0.659%, 0.1443 1.047%, 0.1761 1.563%, 0.2098 2.225%, 0.2452 3.052%, 0.2821 4.062%, 0.3204 5.273%, 0.36 6.705%, 0.4006 8.374%, 0.442 10.3%, 0.4841 12.5%, 0.5267 14.993%, 0.5695 17.798%, 0.6122 20.932%, 0.6547 24.414%, 0.6967 28.262%, 0.7378 32.495%, 0.7777 37.131%, 0.8159 42.188%, 0.8522 47.684%, 0.886 53.638%, 0.9168 60.068%, 0.944 66.992%, 0.9668 74.429%, 0.9844 82.398%, 0.9959 90.915%, 1)";

const keyframes = `
  @keyframes signup-form-fade-in { from { opacity: 0; } }
  @keyframes signup-form-drop-in { from { translate: 0 -20px; } }
  @keyframes signup-form-item-in { from { opacity: 0; translate: 0 15px; } }
  @keyframes signup-form-tick-draw {
    from { stroke-dasharray: 0 1; }
    to { stroke-dasharray: 1 1; }
  }
`;

/**
 * Keeps a piece of UI mounted while it transitions out. `open` flips one
 * commit after mounting (so the closed styles are in place and the change
 * transitions), and `mounted` drops when the closing transition of
 * `endProperty` ends, or after `exitMs` if that event never comes.
 */
function usePresence<T extends Element>(
  show: boolean,
  endProperty: string,
  exitMs: number,
) {
  const [mounted, setMounted] = useState(show);
  const [open, setOpen] = useState(false);

  // Follow `show` while rendering, so the change is what first commits.
  if (!show && open) setOpen(false);
  if (show && !mounted) setMounted(true);

  // Runs in the commit where the element mounts, and again whenever `show`
  // changes (a new callback is a new ref), so an element caught mid-exit
  // opens again too. Resolve the closed styles before opening, or nothing
  // transitions.
  const attach = useCallback(
    (el: T | null) => {
      if (!el || !show) return;
      el.getBoundingClientRect();
      setOpen(true);
    },
    [show],
  );

  useEffect(() => {
    if (show || !mounted) return;
    const timer = window.setTimeout(() => setMounted(false), exitMs + 100);
    return () => window.clearTimeout(timer);
  }, [show, mounted, exitMs]);

  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (
      e.target === e.currentTarget &&
      e.propertyName === endProperty &&
      !show
    ) {
      setMounted(false);
    }
  };

  return { attach, mounted, open, onTransitionEnd };
}

/** The last non-empty message, so an error keeps its text while it leaves. */
function useLastMessage(message?: string) {
  const [shown, setShown] = useState(message);
  if (message && message !== shown) setShown(message);
  return message || shown;
}



// ==========================================
// PREMIUM INPUT COMPONENT
// ==========================================
interface PremiumInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ElementType;
}

const PremiumInput = React.forwardRef<HTMLInputElement, PremiumInputProps>(
  ({ label, error, icon: Icon, type, className, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    // The ref callback is pulled out on its own: left inside the object, the
    // compiler treats every field read from it as a ref read.
    const { attach: attachError, ...errorPresence } = usePresence<HTMLDivElement>(
      !!error,
      "opacity",
      300,
    );
    const errorText = useLastMessage(error);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-semibold text-foreground ml-1">
          {label} {required && <span className="text-primary">*</span>}
        </label>

        <div className="relative group">
          {/* Animated Focus Glow */}
          <div
            className={cn(
              "absolute -inset-[2px] rounded-lg blur-[4px] -z-10 transition-colors",
              error ? "bg-rose-500/40" : "bg-primary/30",
            )}
            style={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.98,
              // `transition-colors` still covers the background swap.
              transition:
                "opacity 0.2s cubic-bezier(0, 0, 0.58, 1), scale 0.2s cubic-bezier(0, 0, 0.58, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />

          <div
            className={cn(
              "relative flex items-center w-full bg-muted border rounded-lg transition-colors overflow-hidden",
              error
                ? "border-rose-500/50"
                : isFocused
                  ? "border-primary/50"
                  : "border-border hover:border-border",
            )}
          >
            {Icon && (
              <div className="pl-3.5 text-muted-foreground flex-shrink-0 transition-colors group-focus-within:text-primary">
                <Icon className="w-4 h-4" />
              </div>
            )}

            <input
              ref={ref}
              type={inputType}
              onFocus={(e) => {
                setIsFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setIsFocused(false);
                props.onBlur?.(e);
              }}
              className={cn(
                "flex h-11 w-full bg-transparent px-3 py-2 text-sm font-medium text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                className,
              )}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3.5 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Animated Error Message */}
        {errorPresence.mounted && (
          <div
            ref={attachError}
            onTransitionEnd={errorPresence.onTransitionEnd}
            className="overflow-hidden"
            style={{
              display: "grid",
              gridTemplateRows: errorPresence.open ? "1fr" : "0fr",
              opacity: errorPresence.open ? 1 : 0,
              translate: errorPresence.open ? "0 0" : "0 -10px",
              transition: `grid-template-rows 0.3s ${FADE_EASE}, opacity 0.3s ${FADE_EASE}, translate ${Y_SPRING.duration}ms ${Y_SPRING.easing}`,
            }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-rose-500 mt-1 ml-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {errorText}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  },
);
PremiumInput.displayName = "PremiumInput";

// ==========================================
// PREMIUM CHECKBOX
// ==========================================
interface PremiumCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: React.ReactNode;
  error?: string;
  required?: boolean;
}

const PremiumCheckbox = ({
  checked,
  onChange,
  label,
  error,
  required,
}: PremiumCheckboxProps) => {
  const { attach: attachTick, ...tick } = usePresence<SVGSVGElement>(checked, "opacity", TICK_DURATION);
  const { attach: attachError, ...errorPresence } = usePresence<HTMLParagraphElement>(
    !!error,
    "opacity",
    300,
  );
  const errorText = useLastMessage(error);

  return (
    <div className="flex flex-col gap-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
          />
          <div
            className={cn(
              "w-5 h-5 rounded border transition-colors flex items-center justify-center",
              checked
                ? "bg-primary border-primary"
                : error
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
                  : "border-border bg-card group-hover:border-primary/60",
            )}
          >
            {tick.mounted && (
              <svg
                ref={attachTick}
                onTransitionEnd={tick.onTransitionEnd}
                style={{
                  opacity: tick.open ? 1 : 0,
                  scale: tick.open ? 1 : 0.5,
                  transition: `opacity ${TICK_DURATION}ms ${TICK_SPRING}, scale ${TICK_DURATION}ms ${TICK_SPRING}`,
                }}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-primary-foreground"
              >
                <polyline
                  pathLength={1}
                  style={{
                    animation:
                      "signup-form-tick-draw 0.3s cubic-bezier(0, 0, 0.58, 1) backwards",
                  }}
                  points="20 6 9 17 4 12"
                />
              </svg>
            )}
          </div>
        </div>
        <span className="text-[13px] font-medium text-foreground leading-snug">
          {label} {required && <span className="text-primary">*</span>}
        </span>
      </label>
      {errorPresence.mounted && (
        <p
          ref={attachError}
          onTransitionEnd={errorPresence.onTransitionEnd}
          className="text-[12px] font-semibold text-rose-500 ml-8 overflow-hidden"
          style={{
            display: "grid",
            gridTemplateRows: errorPresence.open ? "1fr" : "0fr",
            opacity: errorPresence.open ? 1 : 0,
            transition: `grid-template-rows 0.3s ${FADE_EASE}, opacity 0.3s ${FADE_EASE}`,
          }}
        >
          <span className="min-h-0 overflow-hidden">{errorText}</span>
        </p>
      )}
    </div>
  );
};

// ==========================================
// PASSWORD STRENGTH METER
// ==========================================
const PasswordStrength = ({ password }: { password: string }) => {
  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return Math.min(4, score);
  };

  const strength = getStrength(password);

  const segments = Array.from({ length: 4 });
  const getSegmentColor = (index: number) => {
    if (index >= strength) return "bg-muted";
    if (strength <= 1) return "bg-rose-500";
    if (strength === 2) return "bg-orange-500";
    if (strength === 3) return "bg-yellow-500";
    return "bg-emerald-500";
  };

  const getLabel = () => {
    if (strength === 0) return "Very Weak";
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="flex flex-col gap-1.5 mt-2">
      <div className="flex gap-1 h-1.5 w-full">
        {segments.map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-full flex-1 rounded-full transition-colors duration-300",
              getSegmentColor(i),
            )}
          />
        ))}
      </div>
      <div className="flex justify-between items-center text-[11px] font-medium text-muted-foreground">
        <span>Password strength</span>
        <span
          className={cn(
            "transition-colors",
            strength === 4
              ? "text-emerald-500"
              : strength >= 2
                ? "text-yellow-600"
                : "text-rose-500",
          )}
        >
          {password ? getLabel() : ""}
        </span>
      </div>
    </div>
  );
};

export type ScenicSignupStep =
  | "welcome"
  | "options"
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

export interface SignupFormProps {
  variant?: "scenic" | "default" | "nature" | "landscape";
  color?: string;
  brandName?: string;
  brandIcon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  getStartedLabel?: string;
  alreadyAccountLabel?: string;
  bgImage?: string;
  initialStep?: ScenicSignupStep;
  loginHref?: string;
}

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

const AppleBrandIcon = ({
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

// ==========================================
// MAIN FORM COMPONENT
// ==========================================
export const SignupForm = ({
  variant = "default",
  color = "primary",
  brandName = "Docs UI",
  brandIcon,
  title = "Take control of your financial wellbeing",
  subtitle = "Understand your money, build healthier habits, and make confident financial decisions",
  getStartedLabel = "Get Started",
  alreadyAccountLabel = "I already have an account",
  bgImage = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  initialStep = "welcome",
  loginHref = "#",
}: SignupFormProps = {}) => {
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
  const [scenicStep, setScenicStep] = useState<ScenicSignupStep>(
    initialStep === "form" ? "form" : initialStep || "welcome",
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
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Calculate form completion progress
  const getProgress = () => {
    const totalFields = 6; // Excluding newsletter
    let completed = 0;
    if (formData.firstName.length >= 2) completed++;
    if (formData.lastName.length >= 2) completed++;
    if (/^\S+@\S+\.\S+$/.test(formData.email)) completed++;
    if (formData.password.length >= 8) completed++;
    if (
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    )
      completed++;
    if (formData.agreeToTerms) completed++;
    return (completed / totalFields) * 100;
  };

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) newErrors.firstName = "First name required";
    else if (formData.firstName.length < 2)
      newErrors.firstName = "Minimum 2 characters";

    if (!formData.lastName) newErrors.lastName = "Last name required";

    if (!formData.email) newErrors.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 8)
      newErrors.password = "Minimum 8 characters";

    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (!formData.agreeToTerms) newErrors.agreeToTerms = "Must agree to terms";

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

    // Simulate API
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    alert("Account created successfully!");
  };

  // Entrance: the form fades in while its rows rise one after another,
  // 0.08s apart from 0.1s.
  const itemIn = (index: number): React.CSSProperties => ({
    animation: `signup-form-item-in ${ITEM_SPRING.duration}ms ${ITEM_SPRING.easing} ${0.1 + index * 0.08}s backwards`,
  });

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
              transform: scale(0.95) translateY(8px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
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
                    <DocsUiIcon className="w-5 h-5 text-zinc-900 dark:text-white shrink-0" />
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
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.24s backwards",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setScenicStep("options")}
                    className={cn(
                      "w-full h-12 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base transition-all duration-200 active:scale-[0.98] shadow-sm",
                      scenicPrimaryButtonClasses
                    )}
                  >
                    {getStartedLabel}
                  </button>

                  <a
                    href={loginHref}
                    className={cn(
                      "w-full h-11 flex items-center justify-center rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                      "bg-zinc-100/90 text-zinc-700 hover:bg-zinc-200/90 border border-zinc-200/60",
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
                  <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                    onClick={() => setScenicStep("form")}
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

            {scenicStep === "form" && (
              <div>
                {/* Back button */}
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
                  <span className="font-semibold text-xs text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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

                {/* Form Content */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.20s backwards",
                    }}
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <PremiumInput
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        error={errors.firstName}
                        placeholder="John"
                        required
                      />
                      <PremiumInput
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        error={errors.lastName}
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.26s backwards",
                    }}
                  >
                    <PremiumInput
                      label="Email Address"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      error={errors.email}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.32s backwards",
                    }}
                  >
                    <PremiumInput
                      label="Password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange("password", e.target.value)}
                      error={errors.password}
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s backwards",
                    }}
                  >
                    <PremiumCheckbox
                      checked={formData.agreeToTerms}
                      onChange={(checked) => handleChange("agreeToTerms", checked)}
                      label={<span>I agree to the Terms and Privacy Policy</span>}
                      error={errors.agreeToTerms}
                      required
                    />
                  </div>

                  <div
                    style={{
                      animation:
                        "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.46s backwards",
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
                      {loading ? "Processing..." : "Create Account"}
                    </button>
                  </div>
                </form>

                <div
                  className="mt-4 text-center"
                  style={{
                    animation:
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.54s backwards",
                  }}
                >
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Already have an account?{" "}
                    <a
                      href={loginHref}
                      className="font-semibold text-zinc-900 dark:text-white hover:underline"
                    >
                      Sign in
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
                    onClick={() => setScenicStep("form")}
                    className="absolute left-0 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                    aria-label="Back to form"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                        "w-full h-12 sm:h-14 rounded-2xl text-center text-lg sm:text-xl font-semibold",
                        "bg-zinc-100/90 text-zinc-900 border border-zinc-200/80",
                        "dark:bg-[#1e1f21] dark:text-white dark:border-white/[0.08]",
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
                    onClick={() => setScenicStep("form")}
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                          "w-full h-11 px-3.5 rounded-xl text-sm font-normal transition-colors",
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
                          "w-full h-11 px-3.5 rounded-xl text-sm font-normal transition-colors",
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                  <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-white">
                    {brandName}
                  </span>
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
                    onClick={() => setScenicStep("completed")}
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
                      "scenic-stagger-rise 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s backwards",
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

  return (
    <div
      className="max-w-md mx-auto relative overflow-hidden bg-card text-card-foreground rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-border w-full"
      style={style}
    >
      {/* Top Completion Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted">
        <div
          className="h-full bg-primary"
          style={{
            width: `${getProgress()}%`,
            transition: `width 0.5s ${CIRC_OUT}`,
          }}
        />
      </div>

      <div className="p-8 pt-10">
        <div
          className="text-center mb-8"
          style={{
            animation: `signup-form-fade-in 0.3s ${FADE_EASE} backwards, signup-form-drop-in ${Y_SPRING.duration}ms ${Y_SPRING.easing} backwards`,
          }}
        >
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Create Account
          </h2>
          <p className="text-[13.5px] text-muted-foreground mt-1.5">
            Join thousands of developers building the future.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          style={{
            animation: `signup-form-fade-in 0.3s ${FADE_EASE} backwards`,
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <div style={itemIn(0)}>
              <PremiumInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
                placeholder="John"
                required
              />
            </div>
            <div style={itemIn(1)}>
              <PremiumInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div style={itemIn(2)}>
            <PremiumInput
              label="Email Address"
              icon={Mail}
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={errors.email}
              placeholder="name@company.com"
              required
            />
          </div>

          <div style={itemIn(3)}>
            <PremiumInput
              label="Password"
              icon={Lock}
              type="password"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              error={errors.password}
              placeholder="••••••••"
              required
            />
            <PasswordStrength password={formData.password} />
          </div>

          <div style={itemIn(4)}>
            <PremiumInput
              label="Confirm Password"
              icon={Lock}
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
              error={errors.confirmPassword}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="space-y-4 pt-2" style={itemIn(5)}>
            <PremiumCheckbox
              label="I agree to the Terms of Service & Privacy Policy"
              checked={formData.agreeToTerms}
              onChange={(c: boolean) => handleChange("agreeToTerms", c)}
              error={errors.agreeToTerms}
              required
            />
            <PremiumCheckbox
              label="Subscribe to monthly product updates"
              checked={formData.newsletter}
              onChange={(c: boolean) => handleChange("newsletter", c)}
            />
          </div>

          <div className="pt-2" style={itemIn(6)}>
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "relative w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.98]",
                focusButtonClasses
              )}
            >
              {/* Button Hover Shine */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary-foreground/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />

              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/40 border-t-primary-foreground rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </div>
            </button>
          </div>
        </form>

        <div
          className="mt-8 text-center"
          style={{
            animation: `signup-form-fade-in 0.3s ${FADE_EASE} 0.6s backwards`,
          }}
        >
          <p className="text-[13px] text-muted-foreground font-medium">
            Already have an account?{" "}
            <a
              href="#"
              className="text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Required Keyframes for shimmer and the entrance */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        ${keyframes}
      `}</style>
    </div>
  );
};
