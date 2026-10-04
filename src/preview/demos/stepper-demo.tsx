"use client";

import {
  Step,
  Stepper,
  StepperContent,
} from "@/components/custom/blocks/StepperBlock";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Lock,
  Mail,
  RefreshCw,
  ShieldCheck,
  User,
  XCircle,
} from "lucide-react";
import { useState } from "react";

const getThemeColorHex = (c: string) => {
  if (!c || c === "primary" || c === "default") return "var(--primary)";
  if (c.startsWith("#") || c.startsWith("var(") || c.startsWith("rgb") || c.startsWith("hsl")) return c;
  const map: Record<string, string> = {
    indigo: "#6366f1",
    rose: "#f43f5e",
    emerald: "#10b981",
    lavender: "#9b8afb",
  };
  return map[c] || "var(--primary)";
};

const PRIMARY_ROLE_OPTIONS = [
  "Developer",
  "Designer",
  "Product Manager",
  "Founder",
].map((r) => ({ label: r, value: r }));

// Focus is a soft glow, not a hard ring: the border takes the accent and a
// 4px halo of it at low strength spreads out and fades in with the border.
// `--wizard-accent` is set on the demo root so the halo follows the picker.
const FIELD_BASE =
  "w-full h-11 bg-background border rounded-xl px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-[border-color,box-shadow] duration-200 ease-out";
const FIELD_OK =
  "border-input hover:border-foreground/20 focus:border-[color-mix(in_oklab,var(--wizard-accent)_65%,transparent)] focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--wizard-accent)_16%,transparent)]";
const FIELD_ERROR =
  "border-destructive focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--destructive)_16%,transparent)]";

// Stable Input Component
const InputField = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
      {label} <span className="text-destructive">*</span>
    </label>
    <div className="relative flex items-center">
      {Icon && (
        <div className="absolute left-3.5 text-muted-foreground pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        className={cn(FIELD_BASE, Icon && "pl-10", error ? FIELD_ERROR : FIELD_OK)}
        {...props}
      />
    </div>
    {error && (
      <span className="flex items-center gap-1 text-xs font-semibold text-destructive mt-0.5">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {error}
      </span>
    )}
  </div>
);

export default function StepperDemo({
  color: colorToken = "primary",
  initialStep = 0,
}: {
  /** Accent token from the docs color picker, or a raw hex. */
  color?: string;
  /** Step the flow opens on. */
  initialStep?: number;
}) {
  const color = getThemeColorHex(colorToken);
  const isDefaultPrimary = colorToken === "primary" || colorToken === "default";
  const [currentStep, setCurrentStep] = useState(initialStep);

  // Unified Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "Developer",
    password: "",
    confirmPassword: "",
    simulateError: false, // Toggle for testing error handling
  });

  // Validation & Submission State
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Step-by-Step Validation Logic
  const validateStep = (stepIndex: number) => {
    const newErrors: Record<string, string> = {};

    if (stepIndex === 0) {
      if (!formData.fullName.trim())
        newErrors.fullName = "Full name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (stepIndex === 1) {
      if (!formData.company.trim())
        newErrors.company = "Company name is required";
    }

    if (stepIndex === 2) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setSubmitStatus("idle");
      setErrorMessage("");
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Handle clicking step circles directly in header
  const handleStepJump = (targetStep: number) => {
    if (targetStep < currentStep) {
      setSubmitStatus("idle");
      setErrorMessage("");
      setCurrentStep(targetStep);
    } else if (targetStep > currentStep) {
      // Validate all steps in between before allowing jump ahead
      let canJump = true;
      for (let i = currentStep; i < targetStep; i++) {
        if (!validateStep(i)) {
          canJump = false;
          break;
        }
      }
      if (canJump) setCurrentStep(targetStep);
    }
  };

  // Simulated API Submission
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Simulate 1.5s network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);

    if (formData.simulateError) {
      setSubmitStatus("error");
      setErrorMessage(
        "ERR_500: Database insertion failed. The email domain is restricted or timed out.",
      );
    } else {
      setSubmitStatus("success");
    }
  };

  const resetWizard = () => {
    setFormData({
      fullName: "",
      email: "",
      company: "",
      role: "Developer",
      password: "",
      confirmPassword: "",
      simulateError: false,
    });
    setErrors({});
    setSubmitStatus("idle");
    setErrorMessage("");
    setCurrentStep(initialStep);
  };

  // Define Step Content Views
  const steps: Step[] = [
    {
      id: "profile",
      title: "Profile",
      description: "Personal details",
      icon: User,
      content: (
        <div className="w-full p-6 sm:p-8 bg-card text-card-foreground rounded-2xl border border-foreground/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Personal Information
            </h3>
            <p className="text-xs text-muted-foreground">
              Enter your contact details to begin setting up your account.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Full Name"
              icon={User}
              placeholder="e.g. Alex Rivera"
              value={formData.fullName}
              onChange={(e: any) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
            />
            <InputField
              label="Work Email"
              icon={Mail}
              type="email"
              placeholder="alex@company.com"
              value={formData.email}
              onChange={(e: any) => handleChange("email", e.target.value)}
              error={errors.email}
            />
          </div>
        </div>
      ),
    },
    {
      id: "workspace",
      title: "Workspace",
      description: "Organization",
      icon: Building2,
      content: (
        <div className="w-full p-6 sm:p-8 bg-card text-card-foreground rounded-2xl border border-foreground/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Workspace Setup
            </h3>
            <p className="text-xs text-muted-foreground">
              Name your organization and select your primary role.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Company Name"
              icon={Building2}
              placeholder="e.g. Acme Corp"
              value={formData.company}
              onChange={(e: any) => handleChange("company", e.target.value)}
              error={errors.company}
            />
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-semibold text-foreground uppercase tracking-wider">
                Primary Role
              </label>
              <SelectBlock
                options={PRIMARY_ROLE_OPTIONS}
                value={formData.role}
                onChange={(v) => handleChange("role", v)}
                // Bordered like the text inputs; its open state is the same
                // soft 4px accent ring.
                variant="default"
                color={isDefaultPrimary ? "primary" : color}
                placeholder="Select your role"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "security",
      title: "Security",
      description: "Credentials",
      icon: ShieldCheck,
      content: (
        <div className="w-full p-6 sm:p-8 bg-card text-card-foreground rounded-2xl border border-foreground/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Security Credentials
            </h3>
            <p className="text-xs text-muted-foreground">
              Create a secure password for your workspace access.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Password"
              icon={Lock}
              type="password"
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={(e: any) => handleChange("password", e.target.value)}
              error={errors.password}
            />
            <InputField
              label="Confirm Password"
              icon={Lock}
              type="password"
              placeholder="Re-type password"
              value={formData.confirmPassword}
              onChange={(e: any) =>
                handleChange("confirmPassword", e.target.value)
              }
              error={errors.confirmPassword}
            />
          </div>
        </div>
      ),
    },
    {
      id: "review",
      title: "Review",
      description: "Confirm & Submit",
      icon: CheckCircle2,
      content: (
        <div className="w-full p-6 sm:p-8 bg-card text-card-foreground rounded-2xl border border-foreground/[0.06] shadow-[0_1px_2px_rgb(0_0_0/0.04),0_8px_24px_-12px_rgb(0_0_0/0.12)] flex flex-col gap-6">
          {submitStatus === "success" ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-1 shadow-inner animate-bounce bg-primary/20 text-primary"
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">
                Onboarding Complete!
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Your account for{" "}
                <strong className="text-foreground">
                  {formData.company}
                </strong>{" "}
                has been successfully configured and submitted.
              </p>
              <button
                type="button"
                onClick={resetWizard}
                className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-xs uppercase tracking-wider transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Wizard
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Review Summary
                </h3>
                <p className="text-xs text-muted-foreground">
                  Please verify your details before submitting the onboarding
                  payload.
                </p>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-2 gap-4 bg-muted/50 p-4 rounded-xl border border-border text-xs">
                <div>
                  <span className="text-muted-foreground block font-semibold">
                    Name:
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {formData.fullName || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-semibold">
                    Email:
                  </span>
                  <span className="font-semibold text-foreground text-sm truncate block">
                    {formData.email || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-semibold">
                    Company:
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {formData.company || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-semibold">
                    Role:
                  </span>
                  <span className="font-semibold text-foreground text-sm">
                    {formData.role}
                  </span>
                </div>
              </div>

              {/* Error Message Banner */}
              {submitStatus === "error" && (
                <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-xl flex items-start gap-3 text-destructive">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="font-semibold block mb-0.5">
                      Submission Failed
                    </strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Interactive Demo Toggle */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={formData.simulateError}
                    onChange={(e) =>
                      handleChange("simulateError", e.target.checked)
                    }
                    className="rounded border-input accent-[var(--wizard-accent)]"
                  />
                  Simulate Server Error on Submit
                </label>
                <span className="text-[10px] text-muted-foreground font-mono">
                  DEBUG_MODE
                </span>
              </div>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <div
      className="w-full flex justify-center relative min-h-[600px]"
      style={{ "--wizard-accent": color } as React.CSSProperties}
    >
      {/* Main Wizard Card Container. The shell wears a whisper of the accent
          (relative OKLCH, like Folder's tint) so it separates from the white
          preview surface, and the white step panels float on it. */}
      <div className="w-full max-w-3xl flex flex-col gap-8 text-card-foreground rounded-3xl p-6 sm:p-10 relative z-10 border bg-[oklch(from_var(--wizard-accent)_0.975_calc(c*0.12)_h)] border-[oklch(from_var(--wizard-accent)_0.91_calc(c*0.2)_h)] dark:bg-[oklch(from_var(--wizard-accent)_0.21_calc(c*0.1)_h)] dark:border-foreground/10 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_20px_48px_-20px_rgb(0_0_0/0.18)]">
        {/* 1. The GSAP Stepper Navigation (Click circles to jump if valid) */}
        <Stepper
          steps={steps}
          currentStep={currentStep}
          onStepChange={handleStepJump}
          color={color}
        />

        {/* 2. The GSAP Animated Content Payload */}
        <div className="min-h-[260px] flex items-center">
          <StepperContent steps={steps} currentStep={currentStep} />
        </div>

        {/* 3. Integrated Navigation Footer */}
        {submitStatus !== "success" && (
          <div className="flex items-center justify-between pt-6 border-t border-border mt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0 || isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-foreground/10 bg-card text-foreground font-semibold text-sm shadow-[0_1px_2px_rgb(0_0_0/0.04)] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={cn(
                  "flex items-center gap-2 px-7 py-2.5 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 cursor-pointer",
                  isDefaultPrimary && "bg-primary"
                )}
                style={isDefaultPrimary ? undefined : { backgroundColor: color }}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Onboarding</span>
                    <Check className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className={cn(
                  "flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-primary-foreground font-semibold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer",
                  isDefaultPrimary && "bg-primary"
                )}
                style={isDefaultPrimary ? undefined : { backgroundColor: color }}
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
