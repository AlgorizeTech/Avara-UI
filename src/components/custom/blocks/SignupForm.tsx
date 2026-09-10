"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import React, { useState } from "react";

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

    return (
      <div className="flex flex-col gap-1.5 w-full">
        <label className="text-[13px] font-semibold text-foreground ml-1">
          {label} {required && <span className="text-indigo-500">*</span>}
        </label>

        <div className="relative group">
          {/* Animated Focus Glow */}
          <motion.div
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1 : 0.98,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute -inset-[2px] rounded-lg blur-[4px] -z-10 transition-colors",
              error ? "bg-rose-500/40" : "bg-indigo-500/30",
            )}
          />

          <div
            className={cn(
              "relative flex items-center w-full bg-muted border rounded-lg transition-colors overflow-hidden",
              error
                ? "border-rose-500/50"
                : isFocused
                  ? "border-indigo-500/50"
                  : "border-border hover:border-border",
            )}
          >
            {Icon && (
              <div className="pl-3.5 text-muted-foreground flex-shrink-0 transition-colors group-focus-within:text-indigo-500">
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
                "flex h-11 w-full bg-transparent px-3 py-2 text-sm font-medium placeholder:text-zinc-400 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:text-zinc-100",
                className,
              )}
              {...props}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="pr-3.5 text-muted-foreground hover:text-muted-foreground transition-colors focus:outline-none"
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
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="overflow-hidden"
            >
              <p className="flex items-center gap-1.5 text-[12px] font-semibold text-rose-500 mt-1 ml-1">
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
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
                ? "bg-indigo-500 border-indigo-500"
                : error
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-500/10"
                  : "border-border bg-card group-hover:border-indigo-400",
            )}
          >
            <AnimatePresence>
              {checked && (
                <motion.svg
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3.5 h-3.5"
                >
                  <motion.polyline
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    points="20 6 9 17 4 12"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>
        <span className="text-[13px] font-medium text-foreground leading-snug">
          {label} {required && <span className="text-indigo-500">*</span>}
        </span>
      </label>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[12px] font-semibold text-rose-500 ml-8 overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
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
          <motion.div
            key={i}
            initial={false}
            animate={{ backgroundColor: password ? undefined : "" }} // Trigger re-render
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
  };

  return (
    <div className="max-w-md mx-auto relative overflow-hidden bg-white dark:bg-[#0a0a0a] rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] border border-border w-full">
      {/* Top Completion Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-muted">
        <motion.div
          className="h-full bg-indigo-500"
          initial={{ width: 0 }}
          animate={{ width: `${getProgress()}%` }}
          transition={{ ease: "circOut", duration: 0.5 }}
        />
      </div>

      <div className="p-8 pt-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-100 dark:border-indigo-500/20">
            <User className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-black text-foreground tracking-tight">
            Create Account
          </h2>
          <p className="text-[13.5px] text-muted-foreground mt-1.5">
            Join thousands of developers building the future.
          </p>
        </motion.div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid grid-cols-2 gap-4">
            <motion.div variants={itemVariants}>
              <PremiumInput
                label="First Name"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                error={errors.firstName}
                placeholder="John"
                required
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <PremiumInput
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                error={errors.lastName}
                placeholder="Doe"
                required
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants}>
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
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-4 pt-2">
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
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="relative w-full h-12 rounded-xl bg-primary text-primary-foreground font-bold text-[15px] overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
            >
              {/* Button Hover Shine */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]" />

              <div className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-zinc-400 dark:border-zinc-500 border-t-white dark:border-t-zinc-900 rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </div>
            </button>
          </motion.div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center"
        >
          <p className="text-[13px] text-muted-foreground font-medium">
            Already have an account?{" "}
            <a
              href="#"
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-bold transition-colors"
            >
              Sign in
            </a>
          </p>
        </motion.div>
      </div>

      {/* Required Keyframes for shimmer */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};
