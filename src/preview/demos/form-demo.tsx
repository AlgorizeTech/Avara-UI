"use client";

import {
  FormColor,
  FormField,
  FormSubmit,
  FormWrapper,
} from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// --- ZOD SCHEMA FOR REACT-HOOK-FORM EXAMPLE ---
const enterpriseSchema = z.object({
  companyName: z.string().min(2, "Company name is strictly required."),
  workEmail: z.string().email("Invalid corporate email format detected."),
  password: z.string().min(8, "Security requirement: Minimum 8 characters."),
});
type EnterpriseFormValues = z.infer<typeof enterpriseSchema>;

export default function FormDemo({
  demoType = "zod",
  errorStyle = "glitch",
  color = "primary",
  showAll,
}: {
  demoType?: "native" | "zod";
  errorStyle?: "glitch" | "default";
  color?: FormColor | string;
  /** Render-all modes for the docs gallery. Omitted = previous behavior. */
  showAll?: "error-styles" | "submitting" | "bare";
}) {
  // Native State Logic
  const [nativeEmail, setNativeEmail] = useState("");
  const [nativeError, setNativeError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNativeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nativeEmail.includes("@")) {
      setNativeError("Please provide a valid email address.");
      return;
    }
    setNativeError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Success!");
    }, 1500);
  };

  // React Hook Form + Zod Logic
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting: isZodSubmitting },
  } = useForm<EnterpriseFormValues>({
    resolver: zodResolver(enterpriseSchema),
    // Pre-populate with errors for the showcase specifically
    defaultValues: {
      companyName: "",
      workEmail: "invalid-email",
      password: "123",
    },
    mode: "onTouched",
  });

  const onZodSubmit = (data: EnterpriseFormValues) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(`Zod Validation Passed!\n\n${JSON.stringify(data, null, 2)}`);
        resolve(true);
      }, 1500);
    });
  };

  if (showAll === "error-styles") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[500px] relative z-10 overflow-hidden">
        <div className="w-full max-w-lg mx-auto">
          <FormWrapper
            key={`errors-${color}`}
            title="Error Styles"
            description="The same message rendered with each errorVariant."
            color={color}
          >
            <FormField
              label="Glitch (default)"
              error="Invalid corporate email format detected."
              errorVariant="glitch"
            >
              <InputBlock
                type="email"
                placeholder="name@company.com"
                defaultValue="invalid-email"
                color={color}
              />
            </FormField>

            <FormField
              label="Default"
              error="Invalid corporate email format detected."
              errorVariant="default"
            >
              <InputBlock
                type="email"
                placeholder="name@company.com"
                defaultValue="invalid-email"
                color={color}
              />
            </FormField>
          </FormWrapper>
        </div>
      </div>
    );
  }

  if (showAll === "submitting") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[500px] relative z-10 overflow-hidden">
        <div className="w-full max-w-lg mx-auto">
          <FormWrapper
            key={`submitting-${color}`}
            title="Newsletter Signup"
            description="FormSubmit swaps its label for a spinner and disables itself while isSubmitting is true."
            color={color}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField label="Email Address">
              <InputBlock
                type="email"
                placeholder="Enter your email..."
                defaultValue="ada@example.com"
                color={color}
              />
            </FormField>

            <FormSubmit isSubmitting>Subscribe Now</FormSubmit>
          </FormWrapper>
        </div>
      </div>
    );
  }

  if (showAll === "bare") {
    return (
      <div className="w-full flex flex-col items-center justify-center min-h-[500px] relative z-10 overflow-hidden">
        <div className="w-full max-w-lg mx-auto">
          <FormWrapper key={`bare-${color}`} color={color}>
            <FormField label="Display Name">
              <InputBlock placeholder="Ada Lovelace" color={color} />
            </FormField>

            <FormField label="Time Zone">
              <InputBlock placeholder="UTC+00:00" color={color} />
            </FormField>
          </FormWrapper>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[500px] relative z-10 overflow-hidden">
      <div className="w-full max-w-lg mx-auto">
        {demoType === "native" ? (
          <FormWrapper
            key={`native-${color}`}
            title="Newsletter Signup"
            description="A simple, single-field form using native React state. Try submitting an empty value to see the error."
            color={color}
            onSubmit={handleNativeSubmit}
          >
            <FormField
              label="Email Address"
              error={nativeError}
              errorVariant={errorStyle}
            >
              <InputBlock
                type="email"
                placeholder="Enter your email..."
                value={nativeEmail}
                onChange={(e) => setNativeEmail(e.target.value)}
                color={color}
              />
            </FormField>

            <FormSubmit isSubmitting={isSubmitting}>Subscribe Now</FormSubmit>
          </FormWrapper>
        ) : (
          <FormWrapper
            key={`zod-${color}`}
            title="Enterprise Registration"
            description="Click inside the fields and immediately blur away to trigger Zod validation states."
            color={color}
            onSubmit={handleSubmit(onZodSubmit)}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="sm:col-span-2">
                <FormField
                  label="Company Name"
                  error={errors.companyName?.message}
                  errorVariant={errorStyle}
                >
                  <InputBlock
                    {...register("companyName")}
                    placeholder="e.g. Acme Corp"
                    color={color}
                  />
                </FormField>
              </div>

              <FormField
                label="Work Email"
                error={errors.workEmail?.message}
                errorVariant={errorStyle}
              >
                <InputBlock
                  {...register("workEmail")}
                  type="email"
                  placeholder="name@company.com"
                  color={color}
                />
              </FormField>

              <FormField
                label="Secure Password"
                error={errors.password?.message}
                errorVariant={errorStyle}
              >
                <InputBlock
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  color={color}
                />
              </FormField>
            </div>

            <FormSubmit isSubmitting={isZodSubmitting}>
              Create Workspace
            </FormSubmit>
          </FormWrapper>
        )}
      </div>
    </div>
  );
}
