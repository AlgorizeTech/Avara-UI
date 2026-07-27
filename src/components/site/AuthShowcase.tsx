"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import AuthForm, {
  AuthColor,
  AuthType,
  AuthVariant,
} from "@/components/custom/blocks/AuthForm";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const AUTH_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Github, Chrome, Check } from "lucide-react";

export type AuthColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type AuthVariant = "default" | "split" | "glass" | "minimal";
export type AuthType = "login" | "signup";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", ring: "focus:ring-indigo-600", gradient: "from-indigo-600 to-violet-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", ring: "focus:ring-rose-600", gradient: "from-rose-600 to-orange-500" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", ring: "focus:ring-emerald-600", gradient: "from-emerald-600 to-teal-500" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100", gradient: "from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white hover:opacity-90", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", ring: "focus:ring-[var(--theme-color)]", gradient: "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const Input = ({ label, id, error, description, type = "text", className, ...props }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        <input id={id} type={inputType} className={cn("flex h-11 w-full rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all", error ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-800", isPassword && "pr-10", className)} {...props} />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {description && !error && <p className="text-[11px] text-zinc-500">{description}</p>}
      {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
    </div>
  );
};

const Checkbox = ({ label, id, error, checked, onCheckedChange, className, theme, ...props }: any) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-2.5 pt-1">
      <div className="relative flex items-center mt-0.5">
        <input type="checkbox" id={id} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className={cn("peer h-4 w-4 shrink-0 rounded border-2 appearance-none cursor-pointer transition-colors outline-none", error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700", checked && !error && theme.bg, checked && !error && theme.border, theme.ring, className)} {...props} />
        <Check size={12} strokeWidth={3} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      <label htmlFor={id} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer leading-tight select-none">{label} {props.required && <span className="text-red-500">*</span>}</label>
    </div>
    {error && <p className="text-[11px] text-red-500 font-semibold ml-6">{error}</p>}
  </div>
);

const Button = ({ className, variant = "default", size = "default", disabled, theme, children, ...props }: any) => (
  <button disabled={disabled} className={cn("inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]", variant === "default" && theme.bg, variant === "outline" && "border-2 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white", size === "default" && "h-11 px-4 py-2", className)} {...props}>{children}</button>
);

export default function AuthForm({ type = "signup", variant = "default", color = "indigo" }: { type?: AuthType; variant?: AuthVariant; color?: AuthColor; }) {
  const [isLogin, setIsLogin] = useState(type === "login");
  const { theme, style } = getThemeStyles(color);
  
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Required";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    }
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!isLogin && formData.password.length < 8) newErrors.password = "Must be at least 8 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(\`\${isLogin ? "Logged in" : "Account created"} successfully!\`);
    } finally {
      setLoading(false);
    }
  };

  const FormContent = (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">{isLogin ? "Welcome back" : "Create an account"}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{isLogin ? "Enter your details to access your account." : "Start your 14-day free trial. No credit card required."}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" type="button" className="w-full flex items-center gap-2"><Github size={18} /> <span className="hidden sm:inline">GitHub</span></Button>
        <Button variant="outline" type="button" className="w-full flex items-center gap-2"><Chrome size={18} /> <span className="hidden sm:inline">Google</span></Button>
      </div>
      <div className="relative flex items-center mb-6">
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
        <span className="flex-shrink-0 mx-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">Or continue with</span>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" id="firstName" name="firstName" placeholder="Jane" value={formData.firstName} onChange={(e: any) => handleChange("firstName", e.target.value)} error={errors.firstName} className={theme.ring} />
            <Input label="Last Name" id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={(e: any) => handleChange("lastName", e.target.value)} error={errors.lastName} className={theme.ring} />
          </div>
        )}
        <Input label="Email Address" id="email" type="email" placeholder="name@company.com" value={formData.email} onChange={(e: any) => handleChange("email", e.target.value)} error={errors.email} className={theme.ring} />
        <Input label="Password" id="password" type="password" placeholder={isLogin ? "Enter your password" : "Create a password"} value={formData.password} onChange={(e: any) => handleChange("password", e.target.value)} error={errors.password} className={theme.ring} />
        {!isLogin && <Input label="Confirm Password" id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e: any) => handleChange("confirmPassword", e.target.value)} error={errors.confirmPassword} className={theme.ring} />}
        {isLogin && <div className="flex justify-end"><a href="#" className={cn("text-xs font-bold hover:underline transition-all", theme.text)}>Forgot password?</a></div>}
        {!isLogin && <div className="pt-2 pb-2"><Checkbox theme={theme} label="I agree to the Terms of Service and Privacy Policy" id="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={(c: boolean) => handleChange("agreeToTerms", c)} error={errors.agreeToTerms} /></div>}
        <Button type="submit" theme={theme} className="w-full mt-4 shadow-lg shadow-black/5" disabled={loading}>{loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}</Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{isLogin ? "Don't have an account?" : "Already have an account?"} <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false }); }} className={cn("font-bold hover:underline transition-all", theme.text)}>{isLogin ? "Sign up" : "Sign in"}</button></p>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <div className="w-full min-h-[600px] flex overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 transition-colors duration-300" style={style}>
        <div className={cn("hidden lg:flex w-1/2 relative p-12 flex-col justify-between overflow-hidden bg-gradient-to-br", theme.gradient)}>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter"><div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">⚡</div>Acme Inc.</div>
          </div>
          <div className="relative z-10 text-white mt-auto max-w-sm">
            <h1 className="text-4xl font-bold mb-4 leading-tight">Start building your next big idea.</h1>
            <p className="text-white/80 font-medium">Join thousands of developers who are already using our platform to build the future of software.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-12 xl:p-16 flex items-center justify-center">{FormContent}</div>
      </div>
    );
  }

  const baseWrapper = "w-full max-w-[480px] mx-auto p-8 sm:p-10 transition-colors duration-300";
  const wrapperClass = cn(baseWrapper, variant === "default" && "bg-white dark:bg-zinc-950 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800", variant === "glass" && "bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10", variant === "minimal" && "bg-transparent");

  return <div className={wrapperClass} style={style}>{FormContent}</div>;
}`;

// --- PURE JAVASCRIPT ENGINE CODE (Replaced Regex) ---
const AUTH_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Github, Chrome, Check } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600 hover:bg-indigo-700", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", ring: "focus:ring-indigo-600", gradient: "from-indigo-600 to-violet-600" },
  rose: { bg: "bg-rose-600 hover:bg-rose-700", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", ring: "focus:ring-rose-600", gradient: "from-rose-600 to-orange-500" },
  emerald: { bg: "bg-emerald-600 hover:bg-emerald-700", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", ring: "focus:ring-emerald-600", gradient: "from-emerald-600 to-teal-500" },
  zinc: { bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 dark:text-zinc-900", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", ring: "focus:ring-zinc-900 dark:focus:ring-zinc-100", gradient: "from-zinc-800 to-zinc-600 dark:from-zinc-200 dark:to-zinc-400" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { bg: "bg-[var(--theme-color)] text-white hover:opacity-90", text: "text-[var(--theme-color)]", border: "border-[var(--theme-color)]", ring: "focus:ring-[var(--theme-color)]", gradient: "from-[var(--theme-color)] to-[rgba(var(--theme-color-rgb),0.6)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

const Input = ({ label, id, error, description, type = "text", className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label} {props.required && <span className="text-red-500">*</span>}</label>
      <div className="relative">
        <input id={id} type={inputType} className={cn("flex h-11 w-full rounded-lg border bg-zinc-50/50 dark:bg-zinc-900/50 px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all", error ? "border-red-500 focus:ring-red-500" : "border-zinc-200 dark:border-zinc-800", isPassword && "pr-10", className)} {...props} />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
      {description && !error && <p className="text-[11px] text-zinc-500">{description}</p>}
      {error && <p className="text-[11px] text-red-500 font-semibold">{error}</p>}
    </div>
  );
};

const Checkbox = ({ label, id, error, checked, onCheckedChange, className, theme, ...props }) => (
  <div className="flex flex-col gap-1">
    <div className="flex items-start gap-2.5 pt-1">
      <div className="relative flex items-center mt-0.5">
        <input type="checkbox" id={id} checked={checked} onChange={(e) => onCheckedChange(e.target.checked)} className={cn("peer h-4 w-4 shrink-0 rounded border-2 appearance-none cursor-pointer transition-colors outline-none", error ? "border-red-500" : "border-zinc-300 dark:border-zinc-700", checked && !error && theme.bg, checked && !error && theme.border, theme.ring, className)} {...props} />
        <Check size={12} strokeWidth={3} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
      </div>
      <label htmlFor={id} className="text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer leading-tight select-none">{label} {props.required && <span className="text-red-500">*</span>}</label>
    </div>
    {error && <p className="text-[11px] text-red-500 font-semibold ml-6">{error}</p>}
  </div>
);

const Button = ({ className, variant = "default", size = "default", disabled, theme, children, ...props }) => (
  <button disabled={disabled} className={cn("inline-flex items-center justify-center rounded-lg text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]", variant === "default" && theme.bg, variant === "outline" && "border-2 border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white", size === "default" && "h-11 px-4 py-2", className)} {...props}>{children}</button>
);

export default function AuthForm({ type = "signup", variant = "default", color = "indigo" }) {
  const [isLogin, setIsLogin] = useState(type === "login");
  const { theme, style } = getThemeStyles(color);
  
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = "Required";
      if (!formData.lastName) newErrors.lastName = "Required";
      if (!formData.confirmPassword) newErrors.confirmPassword = "Required";
      else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms";
    }
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
    if (!formData.password) newErrors.password = "Password is required";
    else if (!isLogin && formData.password.length < 8) newErrors.password = "Must be at least 8 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(\`\${isLogin ? "Logged in" : "Account created"} successfully!\`);
    } finally {
      setLoading(false);
    }
  };

  const FormContent = (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center h-full">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-2">{isLogin ? "Welcome back" : "Create an account"}</h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{isLogin ? "Enter your details to access your account." : "Start your 14-day free trial. No credit card required."}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Button variant="outline" type="button" className="w-full flex items-center gap-2"><Github size={18} /> <span className="hidden sm:inline">GitHub</span></Button>
        <Button variant="outline" type="button" className="w-full flex items-center gap-2"><Chrome size={18} /> <span className="hidden sm:inline">Google</span></Button>
      </div>
      <div className="relative flex items-center mb-6">
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
        <span className="flex-shrink-0 mx-4 text-zinc-400 text-xs font-bold uppercase tracking-widest">Or continue with</span>
        <div className="flex-grow border-t border-zinc-200 dark:border-zinc-800"></div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" id="firstName" name="firstName" placeholder="Jane" value={formData.firstName} onChange={(e) => handleChange("firstName", e.target.value)} error={errors.firstName} className={theme.ring} />
            <Input label="Last Name" id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={(e) => handleChange("lastName", e.target.value)} error={errors.lastName} className={theme.ring} />
          </div>
        )}
        <Input label="Email Address" id="email" type="email" placeholder="name@company.com" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} error={errors.email} className={theme.ring} />
        <Input label="Password" id="password" type="password" placeholder={isLogin ? "Enter your password" : "Create a password"} value={formData.password} onChange={(e) => handleChange("password", e.target.value)} error={errors.password} className={theme.ring} />
        {!isLogin && <Input label="Confirm Password" id="confirmPassword" type="password" placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => handleChange("confirmPassword", e.target.value)} error={errors.confirmPassword} className={theme.ring} />}
        {isLogin && <div className="flex justify-end"><a href="#" className={cn("text-xs font-bold hover:underline transition-all", theme.text)}>Forgot password?</a></div>}
        {!isLogin && <div className="pt-2 pb-2"><Checkbox theme={theme} label="I agree to the Terms of Service and Privacy Policy" id="agreeToTerms" checked={formData.agreeToTerms} onCheckedChange={(c) => handleChange("agreeToTerms", c)} error={errors.agreeToTerms} /></div>}
        <Button type="submit" theme={theme} className="w-full mt-4 shadow-lg shadow-black/5" disabled={loading}>{loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}</Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{isLogin ? "Don't have an account?" : "Already have an account?"} <button type="button" onClick={() => { setIsLogin(!isLogin); setErrors({}); setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", agreeToTerms: false }); }} className={cn("font-bold hover:underline transition-all", theme.text)}>{isLogin ? "Sign up" : "Sign in"}</button></p>
      </div>
    </div>
  );

  if (variant === "split") {
    return (
      <div className="w-full min-h-[600px] flex overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-2xl bg-white dark:bg-zinc-950 transition-colors duration-300" style={style}>
        <div className={cn("hidden lg:flex w-1/2 relative p-12 flex-col justify-between overflow-hidden bg-gradient-to-br", theme.gradient)}>
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white font-black text-2xl tracking-tighter"><div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-md">⚡</div>Acme Inc.</div>
          </div>
          <div className="relative z-10 text-white mt-auto max-w-sm">
            <h1 className="text-4xl font-bold mb-4 leading-tight">Start building your next big idea.</h1>
            <p className="text-white/80 font-medium">Join thousands of developers who are already using our platform to build the future of software.</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-6 sm:p-12 xl:p-16 flex items-center justify-center">{FormContent}</div>
      </div>
    );
  }

  const baseWrapper = "w-full max-w-[480px] mx-auto p-8 sm:p-10 transition-colors duration-300";
  const wrapperClass = cn(baseWrapper, variant === "default" && "bg-white dark:bg-zinc-950 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800", variant === "glass" && "bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 dark:border-white/10", variant === "minimal" && "bg-transparent");

  return <div className={wrapperClass} style={style}>{FormContent}</div>;
}`;

export function AuthShowcase() {
  const [type, setType] = useState<AuthType>("signup");
  const [variant, setVariant] = useState<AuthVariant>("default");
  const [color, setColor] = useState<AuthColor>("indigo");

  const generateUsageCode = (isTs: boolean) => {
    return `import AuthForm from "@/components/custom/blocks/AuthForm";

export default function AuthPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4">
      <AuthForm 
        type="${type}" 
        variant="${variant}" 
        color="${color}" 
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl">
        {/* Type Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Form Type
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["signup", "login"] as AuthType[]).map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-6 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  type === t
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Structural Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["default", "split", "glass", "minimal"] as AuthVariant[]).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      variant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {v}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id as AuthColor)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#6366f1"}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                  title="Custom Hex Color"
                />
              </div>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AuthForm"
        tsCode={AUTH_ENGINE_CODE_TS}
        jsCode={AUTH_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div
          className={`w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : "bg-zinc-50/50 dark:bg-transparent py-12"}`}
        >
          <AuthForm
            key={`${type}-${variant}-${color}`}
            type={type}
            variant={variant}
            color={color}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
