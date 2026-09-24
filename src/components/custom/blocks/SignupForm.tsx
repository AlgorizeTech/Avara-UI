"use client";

import { cn } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { springLinear } from "./motion-curves";

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
  const ref = useRef<T>(null);
  const [mounted, setMounted] = useState(show);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    if (!show) {
      setOpen(false);
      return;
    }
    if (!mounted) {
      setMounted(true);
      return;
    }
    // Resolve the closed styles before opening, or nothing transitions.
    ref.current?.getBoundingClientRect();
    setOpen(true);
  }, [show, mounted]);

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

  return { ref, mounted, open, onTransitionEnd };
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

    const errorPresence = usePresence<HTMLDivElement>(!!error, "opacity", 300);
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
            ref={errorPresence.ref}
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
  const tick = usePresence<SVGSVGElement>(checked, "opacity", TICK_DURATION);
  const errorPresence = usePresence<HTMLParagraphElement>(
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
                ref={tick.ref}
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
          ref={errorPresence.ref}
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

// ==========================================
// MAIN FORM COMPONENT
// ==========================================
export const SignupForm = () => {
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

  return (
    <div className="max-w-md mx-auto relative overflow-hidden bg-card text-card-foreground rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-border w-full">
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
              className="relative w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold text-[15px] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
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
