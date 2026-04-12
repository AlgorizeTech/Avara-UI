"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// --- INLINE UI COMPONENTS ---
const Input = ({ label, id, error, description, className, ...props }: any) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
    >
      {label} {props.required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={id}
      className={cn(
        "flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400 disabled:cursor-not-allowed disabled:opacity-50 dark:focus:ring-zinc-600 transition-colors",
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-zinc-200 dark:border-zinc-700",
        className,
      )}
      {...props}
    />
    {description && !error && (
      <p className="text-xs text-zinc-500">{description}</p>
    )}
    {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
  </div>
);

const Checkbox = ({
  label,
  id,
  error,
  checked,
  onCheckedChange,
  className,
  ...props
}: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-2 pt-1">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className={cn(
          "mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:checked:bg-zinc-50 cursor-pointer",
          error && "border-red-500",
          className,
        )}
        {...props}
      />
      <label
        htmlFor={id}
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer leading-tight"
      >
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
    </div>
    {error && <p className="text-xs text-red-500 font-medium ml-6">{error}</p>}
  </div>
);

const Button = ({
  className,
  variant = "default",
  size = "default",
  disabled,
  children,
  ...props
}: any) => (
  <button
    disabled={disabled}
    className={cn(
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
      variant === "default" &&
        "bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
      size === "default" && "h-10 px-4 py-2",
      size === "lg" && "h-11 rounded-md px-8",
      className,
    )}
    {...props}
  >
    {children}
  </button>
);

// --- MAIN COMPONENT ---
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

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = "First name must be at least 2 characters long";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = "Last name must be at least 2 characters long";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Signup data:", formData);
      alert("Account created successfully!");

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
        newsletter: false,
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 w-full transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-8 text-zinc-900 dark:text-white tracking-tight">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e: any) => handleChange("firstName", e.target.value)}
            error={errors.firstName}
            required
          />

          <Input
            label="Last Name"
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e: any) => handleChange("lastName", e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="john.doe@example.com"
          value={formData.email}
          onChange={(e: any) => handleChange("email", e.target.value)}
          error={errors.email}
          required
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={(e: any) => handleChange("password", e.target.value)}
          error={errors.password}
          required
          description="Must be at least 8 characters with uppercase, lowercase, and number"
        />

        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e: any) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <div className="space-y-4 pt-2 pb-2">
          <Checkbox
            label="I agree to the Terms and Conditions"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked: boolean) =>
              handleChange("agreeToTerms", checked)
            }
            error={errors.agreeToTerms}
            required
          />

          <Checkbox
            label="Subscribe to newsletter for updates"
            id="newsletter"
            name="newsletter"
            checked={formData.newsletter}
            onCheckedChange={(checked: boolean) =>
              handleChange("newsletter", checked)
            }
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full mt-2"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-8 text-center border-t border-zinc-100 dark:border-zinc-800 pt-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{" "}
          <a
            href="#"
            className="font-semibold text-zinc-900 dark:text-white hover:underline transition-all"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};
