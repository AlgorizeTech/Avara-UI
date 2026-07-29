"use client";

import {
  FormColor,
  FormField,
  FormSubmit,
  FormWrapper,
} from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

// --- TYPESCRIPT ENGINE CODE ---
const FORM_ENGINE_CODE_TS = `"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FormColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  const isHex = color && color.startsWith("#");
  const rgb = isHex ? hexToRgb(color) : "99, 102, 241";
  
  const colorMap: Record<string, string> = {
    primary: "var(--primary)", indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#18181b"
  };

  const finalColor = isHex ? color : colorMap[color] || colorMap.primary;

  return { style: { "--theme-color": finalColor, "--theme-color-rgb": isHex ? rgb : hexToRgb(finalColor) } as React.CSSProperties };
};

export interface FormWrapperProps { children: ReactNode; color?: FormColor; title?: string; description?: string; className?: string; onSubmit?: (e: React.FormEvent) => void; }

export function FormWrapper({ children, color = "indigo", title, description, className, onSubmit }: FormWrapperProps) {
  const { style } = getThemeStyles(color as string);

  return (
    <div style={style} className={cn("relative group w-full", className)}>
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_70%,var(--theme-color)_100%)] animate-[spin_3s_linear_infinite]" />
      </div>
      <div className="relative bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-10 h-full w-full shadow-xl z-10">
        {(title || description) && (
          <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
            {title && <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{title}</h2>}
            {description && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{description}</p>}
          </div>
        )}
        {onSubmit ? <form onSubmit={onSubmit} className="flex flex-col gap-6">{children}</form> : <div className="flex flex-col gap-6">{children}</div>}
      </div>
    </div>
  );
}

export function FormError({ message, variant = "glitch" }: { message?: string; variant?: "default" | "glitch" }) {
  if (!message) return null;

  if (variant === "default") {
    return (
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span className="text-red-500 font-bold text-xs tracking-wider uppercase">{message}</span>
      </div>
    );
  }

  return (
    <>
      <style>{\`@keyframes glitch-anim-1 { 0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); } 20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); } 40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); } 60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); } 80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); } 100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); } } @keyframes glitch-anim-2 { 0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); } 20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); } 40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); } 60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); } 80% { clip-path: inset(20% 0 50% 0); transform: translate(1px, -1px); } 100% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 1px); } } .glitch-text { position: relative; display: inline-block; font-weight: 700; color: #ef4444; } .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; } .glitch-text::before { left: 1px; text-shadow: -1px 0 rgba(255, 0, 0, 0.7); animation: glitch-anim-1 2.5s infinite linear alternate-reverse; } .glitch-text::after { left: -1px; text-shadow: 1px 0 rgba(0, 0, 255, 0.7); animation: glitch-anim-2 3s infinite linear alternate-reverse; }\`}</style>
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span className="glitch-text text-xs tracking-wider uppercase" data-text={message}>{message}</span>
      </div>
    </>
  );
}

export function FormField({ label, error, errorVariant = "glitch", children }: { label?: string; error?: string; errorVariant?: "default" | "glitch"; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className={cn("text-sm font-bold", error ? "text-red-500" : "text-zinc-700 dark:text-zinc-300")}>{label}</label>}
      {children}
      <FormError message={error} variant={errorVariant} />
    </div>
  );
}

export function FormSubmit({ children, isSubmitting = false }: { children: ReactNode; isSubmitting?: boolean }) {
  return (
    <button type="submit" disabled={isSubmitting} className="relative w-full overflow-hidden rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group mt-2">
      <div className="absolute inset-0 bg-[var(--theme-color)] transition-opacity group-hover:opacity-90" />
      <div className="relative px-6 py-3.5 flex items-center justify-center gap-2 w-full h-full">
        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
      </div>
    </button>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const FORM_ENGINE_CODE_JS = `"use client";

import React from "react";
import { cn } from "@/lib/utils";

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  const isHex = color && color.startsWith("#");
  const rgb = isHex ? hexToRgb(color) : "99, 102, 241";
  
  const colorMap = { indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#18181b" };
  const finalColor = isHex ? color : colorMap[color] || colorMap.indigo;

  return { style: { "--theme-color": finalColor, "--theme-color-rgb": isHex ? rgb : hexToRgb(finalColor) } };
};

export function FormWrapper({ children, color = "indigo", title, description, className, onSubmit }) {
  const { style } = getThemeStyles(color);

  return (
    <div style={style} className={cn("relative group w-full", className)}>
      <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_70%,var(--theme-color)_100%)] animate-[spin_3s_linear_infinite]" />
      </div>
      <div className="relative bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-6 sm:p-10 h-full w-full shadow-xl z-10">
        {(title || description) && (
          <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800/50 pb-6">
            {title && <h2 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">{title}</h2>}
            {description && <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">{description}</p>}
          </div>
        )}
        {onSubmit ? <form onSubmit={onSubmit} className="flex flex-col gap-6">{children}</form> : <div className="flex flex-col gap-6">{children}</div>}
      </div>
    </div>
  );
}

export function FormError({ message, variant = "glitch" }) {
  if (!message) return null;

  if (variant === "default") {
    return (
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span className="text-red-500 font-bold text-xs tracking-wider uppercase">{message}</span>
      </div>
    );
  }

  return (
    <>
      <style>{\`@keyframes glitch-anim-1 { 0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); } 20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); } 40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); } 60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); } 80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); } 100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); } } @keyframes glitch-anim-2 { 0% { clip-path: inset(10% 0 60% 0); transform: translate(2px, -1px); } 20% { clip-path: inset(80% 0 5% 0); transform: translate(-2px, 2px); } 40% { clip-path: inset(30% 0 20% 0); transform: translate(2px, -2px); } 60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); } 80% { clip-path: inset(20% 0 50% 0); transform: translate(1px, -1px); } 100% { clip-path: inset(50% 0 30% 0); transform: translate(-2px, 1px); } } .glitch-text { position: relative; display: inline-block; font-weight: 700; color: #ef4444; } .glitch-text::before, .glitch-text::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: transparent; } .glitch-text::before { left: 1px; text-shadow: -1px 0 rgba(255, 0, 0, 0.7); animation: glitch-anim-1 2.5s infinite linear alternate-reverse; } .glitch-text::after { left: -1px; text-shadow: 1px 0 rgba(0, 0, 255, 0.7); animation: glitch-anim-2 3s infinite linear alternate-reverse; }\`}</style>
      <div className="mt-1 flex items-center gap-1.5 overflow-hidden">
        <div className="w-1 h-3 bg-red-500 shrink-0" />
        <span className="glitch-text text-xs tracking-wider uppercase" data-text={message}>{message}</span>
      </div>
    </>
  );
}

export function FormField({ label, error, errorVariant = "glitch", children }) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && <label className={cn("text-sm font-bold", error ? "text-red-500" : "text-zinc-700 dark:text-zinc-300")}>{label}</label>}
      {children}
      <FormError message={error} variant={errorVariant} />
    </div>
  );
}

export function FormSubmit({ children, isSubmitting = false }) {
  return (
    <button type="submit" disabled={isSubmitting} className="relative w-full overflow-hidden rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed group mt-2">
      <div className="absolute inset-0 bg-[var(--theme-color)] transition-opacity group-hover:opacity-90" />
      <div className="relative px-6 py-3.5 flex items-center justify-center gap-2 w-full h-full">
        {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : children}
      </div>
    </button>
  );
}`;

// --- ZOD SCHEMA FOR REACT-HOOK-FORM EXAMPLE ---
const enterpriseSchema = z.object({
  companyName: z.string().min(2, "Company name is strictly required."),
  workEmail: z.string().email("Invalid corporate email format detected."),
  password: z.string().min(8, "Security requirement: Minimum 8 characters."),
});
type EnterpriseFormValues = z.infer<typeof enterpriseSchema>;

export function FormShowcase() {
  const [demoType, setDemoType] = useState<"native" | "zod">("zod");
  const [errorStyle, setErrorStyle] = useState<"glitch" | "default">("glitch");

  const [color, setColor] = useState<FormColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

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

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? ` color="${color}"` : "";

    if (demoType === "native") {
      return `import { useState } from "react";
import { FormWrapper, FormField, FormSubmit } from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";

export default function NativeForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return setError("Email is completely required.");
    // Submit logic...
  };

  return (
    <FormWrapper title="Basic Login" onSubmit={onSubmit}${colorPropStr}>
      <FormField label="Email Address" error={error} errorVariant="${errorStyle}">
        <InputBlock value={email} onChange={e => setEmail(e.target.value)}${colorPropStr} />
      </FormField>
      
      <FormSubmit>Sign In</FormSubmit>
    </FormWrapper>
  );
}`;
    }

    return `import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormWrapper, FormField, FormSubmit } from "@/components/custom/blocks/FormBlock";
import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const schema = z.object({
  companyName: z.string().min(2, "Company name is strictly required."),
  workEmail: z.string().email("Invalid corporate email format detected."),
});

export default function EnterpriseForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <FormWrapper title="Enterprise Registration" onSubmit={handleSubmit(console.log)}${colorPropStr}>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Company Name" error={errors.companyName?.message} errorVariant="${errorStyle}">
          <InputBlock {...register("companyName")}${colorPropStr} />
        </FormField>
        
        <FormField label="Work Email" error={errors.workEmail?.message} errorVariant="${errorStyle}">
          <InputBlock {...register("workEmail")} type="email"${colorPropStr} />
        </FormField>
      </div>
      
      <FormSubmit isSubmitting={isSubmitting}>Create Account</FormSubmit>
    </FormWrapper>
  );
};`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={[
            { value: "native", label: "Basic Native State" },
            { value: "zod", label: "Advanced (RHF + Zod)" },
          ]}
          label="Form Implementation"
          defaultValue={demoType}
          onValueChange={(v) => setDemoType(v as "native" | "zod")}
        />

        <VariantTabs
          variants={[
            { value: "glitch", label: "Glitch" },
            { value: "default", label: "Default" },
          ]}
          label="Error Style"
          defaultValue={errorStyle}
          onValueChange={(v) => setErrorStyle(v as "glitch" | "default")}
        />

        <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="FormBlock"
        tsCode={FORM_ENGINE_CODE_TS}
        jsCode={FORM_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] p-4 sm:p-12 relative z-10 overflow-hidden">
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

                <FormSubmit isSubmitting={isSubmitting}>
                  Subscribe Now
                </FormSubmit>
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
      </ComponentPreview>
    </div>
  );
}
