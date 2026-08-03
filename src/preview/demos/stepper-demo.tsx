"use client";

import {
  Step,
  Stepper,
  StepperContent,
} from "@/components/custom/blocks/StepperBlock";
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

// Stable Input Component
const InputField = ({ label, icon: Icon, error, ...props }: any) => (
  <div className="flex flex-col gap-1.5 w-full">
    <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
      {label} <span className="text-rose-500">*</span>
    </label>
    <div className="relative flex items-center">
      {Icon && (
        <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none">
          <Icon className="w-4 h-4" />
        </div>
      )}
      <input
        className={cn(
          "w-full h-11 bg-zinc-50 dark:bg-zinc-900 border rounded-xl px-3.5 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 transition-all",
          Icon && "pl-10",
          error
            ? "border-rose-500 focus:ring-rose-500/20"
            : "border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600",
        )}
        {...props}
      />
    </div>
    {error && (
      <span className="flex items-center gap-1 text-xs font-semibold text-rose-500 mt-0.5">
        <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
        {error}
      </span>
    )}
  </div>
);

export default function StepperDemo({
  color = "#FFAB1D",
}: {
  color?: string;
}) {
  const [currentStep, setCurrentStep] = useState(0);

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
    setCurrentStep(0);
  };

  // Define Step Content Views
  const steps: Step[] = [
    {
      id: "profile",
      title: "Profile",
      description: "Personal details",
      icon: User,
      content: (
        <div className="w-full p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Personal Information
            </h3>
            <p className="text-xs text-zinc-500">
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
        <div className="w-full p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Workspace Setup
            </h3>
            <p className="text-xs text-zinc-500">
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
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                Primary Role
              </label>
              <select
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full h-11 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600"
              >
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Product Manager">Product Manager</option>
                <option value="Founder">Founder</option>
              </select>
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
        <div className="w-full p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-5">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
              Security Credentials
            </h3>
            <p className="text-xs text-zinc-500">
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
        <div className="w-full p-6 sm:p-8 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
          {submitStatus === "success" ? (
            <div className="py-8 flex flex-col items-center justify-center text-center gap-4">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-1 shadow-inner animate-bounce"
                style={{ backgroundColor: `${color}20`, color: color }}
              >
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                Onboarding Complete!
              </h3>
              <p className="text-sm text-zinc-500 max-w-sm">
                Your account for{" "}
                <strong className="text-zinc-900 dark:text-white">
                  {formData.company}
                </strong>{" "}
                has been successfully configured and submitted.
              </p>
              <button
                type="button"
                onClick={resetWizard}
                className="mt-2 flex items-center gap-2 px-6 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Wizard
              </button>
            </div>
          ) : (
            <>
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  Review Summary
                </h3>
                <p className="text-xs text-zinc-500">
                  Please verify your details before submitting the onboarding
                  payload.
                </p>
              </div>

              {/* Data Summary Grid */}
              <div className="grid grid-cols-2 gap-4 bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs">
                <div>
                  <span className="text-zinc-400 block font-semibold">
                    Name:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm">
                    {formData.fullName || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-semibold">
                    Email:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm truncate block">
                    {formData.email || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-semibold">
                    Company:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm">
                    {formData.company || "—"}
                  </span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-semibold">
                    Role:
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-white text-sm">
                    {formData.role}
                  </span>
                </div>
              </div>

              {/* Error Message Banner */}
              {submitStatus === "error" && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-start gap-3 text-rose-500">
                  <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="font-bold block mb-0.5">
                      Submission Failed
                    </strong>
                    <span>{errorMessage}</span>
                  </div>
                </div>
              )}

              {/* Interactive Demo Toggle */}
              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                  <input
                    type="checkbox"
                    checked={formData.simulateError}
                    onChange={(e) =>
                      handleChange("simulateError", e.target.checked)
                    }
                    className="rounded border-zinc-300 dark:border-zinc-700 text-rose-500 focus:ring-rose-500"
                  />
                  Simulate Server Error on Submit
                </label>
                <span className="text-[10px] text-zinc-400 font-mono">
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
    <div className="w-full flex justify-center bg-zinc-50 dark:bg-[#020202] py-16 px-4 transition-colors duration-300 relative overflow-hidden min-h-[600px]">
      {/* Main Wizard Card Container */}
      <div className="w-full max-w-3xl flex flex-col gap-8 bg-white dark:bg-zinc-950/80 rounded-3xl p-6 sm:p-10 border border-zinc-200 dark:border-zinc-800/80 shadow-xl relative z-10">
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
          <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-900 mt-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 0 || isSubmitting}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {currentStep === steps.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-7 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 disabled:opacity-70 cursor-pointer"
                style={{ backgroundColor: color }}
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
                className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl text-white font-bold text-sm shadow-md transition-all hover:brightness-110 active:scale-95 cursor-pointer"
                style={{ backgroundColor: color }}
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
