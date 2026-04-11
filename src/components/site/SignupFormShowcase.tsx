"use client";

import { SignupForm } from "@/components/custom/blocks/SignupForm";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const SIGNUP_ENGINE_CODE_TS = `"use client";

import { useState } from "react";
import { Input } from "@/components/custom/input";
import Button from "@/components/custom/button";
import { Checkbox } from "@/components/custom/checkbox";

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
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
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
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup data:", formData);
      alert("Account created successfully!");
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="space-y-3">
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
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};`;

// --- JAVASCRIPT ENGINE CODE ---
const SIGNUP_ENGINE_CODE_JS = `"use client";

import { useState } from "react";
import { Input } from "@/components/custom/input";
import Button from "@/components/custom/button";
import { Checkbox } from "@/components/custom/checkbox";

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

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
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(formData.password)) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Signup data:", formData);
      alert("Account created successfully!");
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-zinc-200 dark:border-zinc-700 w-full">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="First Name"
            id="firstName"
            name="firstName"
            type="text"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
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
            onChange={(e) => handleChange("lastName", e.target.value)}
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
          onChange={(e) => handleChange("email", e.target.value)}
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
          onChange={(e) => handleChange("password", e.target.value)}
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
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          error={errors.confirmPassword}
          required
        />

        <div className="space-y-3">
          <Checkbox
            label="I agree to the Terms and Conditions"
            id="agreeToTerms"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) =>
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
            onCheckedChange={(checked) =>
              handleChange("newsletter", checked)
            }
          />
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          className="w-full"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};`;

export function SignupFormShowcase() {
  const generateUsageCode = (isTs: boolean) => {
    return `import { SignupForm } from "@/components/custom/blocks/SignupForm";

export default function AuthPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <SignupForm />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SignupForm"
        tsCode={SIGNUP_ENGINE_CODE_TS}
        jsCode={SIGNUP_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[600px] bg-zinc-50/50 dark:bg-transparent py-12 transition-colors duration-300">
          <SignupForm />
        </div>
      </ComponentPreview>
    </div>
  );
}