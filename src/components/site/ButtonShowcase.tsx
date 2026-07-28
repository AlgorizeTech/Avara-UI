"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import Button from "@/components/custom/blocks/Button";
import {
  AppleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  EmailIcon,
  FacebookIcon,
  GitHubIcon,
  GoogleIcon,
  HeartIcon,
  LinkedInIcon,
  MailIcon,
  MicrosoftIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  ShareIcon,
  ShoppingCartIcon,
  SlackIcon,
  StarIcon,
  XIcon,
  XIcon2,
} from "@/components/custom/blocks/Icons";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const BUTTON_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Loader2: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("animate-spin", className)}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface Ripple { x: number; y: number; size: number; id: number; }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", size = "default", children, loading, onClick, iconLeft, iconRight, ...props }, ref) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const iconOnly = !Boolean(children) && Boolean(iconLeft || iconRight);

  useEffect(() => {
    const styleId = "ripple-animation-style";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = \`@keyframes ripple-effect { from { transform: scale(0); opacity: 1; } to { transform: scale(2); opacity: 0; } } .animate-ripple { animation: ripple-effect 0.7s ease-out forwards; }\`;
    document.head.appendChild(style);
  }, []);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - rippleSize / 2;
    const y = event.clientY - rect.top - rippleSize / 2;
    setRipples((currentRipples) => [...currentRipples, { x, y, size: rippleSize, id: Date.now() }]);
    setTimeout(() => { setRipples((currentRipples) => currentRipples.slice(1)); }, 700);
    onClick?.(event);
  };

  const rippleColor = variant === "default" || variant === "destructive" ? "bg-white/30 dark:bg-slate-900/20" : "bg-slate-900/10 dark:bg-white/10";
  const baseClasses = "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform duration-75 focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden active:scale-[0.97] cursor-pointer";
  const variantClasses = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-50",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
    ghost: "hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-50",
    link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
  };
  const sizeClasses = {
    default: iconOnly ? "h-10 w-10 p-0" : "h-10 py-2 px-4",
    sm: iconOnly ? "h-9 w-9 p-0" : "h-9 px-3 rounded-md",
    lg: iconOnly ? "h-11 w-11 p-0" : "h-11 px-8 rounded-md",
  };

  return (
    <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} onClick={createRipple} disabled={loading} ref={ref} {...props}>
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="h-4 w-4" />}
        {!loading && iconLeft && <span className="flex items-center justify-center">{iconLeft}</span>}
        {children}
        {!loading && iconRight && <span className="flex items-center justify-center">{iconRight}</span>}
      </span>
      {!loading && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {ripples.map((ripple) => (
            <span key={ripple.id} className={cn("absolute rounded-full animate-ripple", rippleColor)} style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }} />
          ))}
        </div>
      )}
    </button>
  );
});

Button.displayName = "Button";
export default Button;`;

// --- JAVASCRIPT ENGINE CODE ---
const BUTTON_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Loader2 = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("animate-spin", className)}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const Button = React.forwardRef(({ className, variant = "default", size = "default", children, loading, onClick, iconLeft, iconRight, ...props }, ref) => {
  const [ripples, setRipples] = useState([]);
  const iconOnly = !Boolean(children) && Boolean(iconLeft || iconRight);

  useEffect(() => {
    const styleId = "ripple-animation-style";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.innerHTML = \`@keyframes ripple-effect { from { transform: scale(0); opacity: 1; } to { transform: scale(2); opacity: 0; } } .animate-ripple { animation: ripple-effect 0.7s ease-out forwards; }\`;
    document.head.appendChild(style);
  }, []);

  const createRipple = (event) => {
    if (loading) return;
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const rippleSize = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - rippleSize / 2;
    const y = event.clientY - rect.top - rippleSize / 2;
    setRipples((currentRipples) => [...currentRipples, { x, y, size: rippleSize, id: Date.now() }]);
    setTimeout(() => { setRipples((currentRipples) => currentRipples.slice(1)); }, 700);
    onClick?.(event);
  };

  const rippleColor = variant === "default" || variant === "destructive" ? "bg-white/30 dark:bg-slate-900/20" : "bg-slate-900/10 dark:bg-white/10";
  const baseClasses = "relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-transform duration-75 focus:outline-none disabled:opacity-50 disabled:pointer-events-none overflow-hidden active:scale-[0.97] cursor-pointer";
  const variantClasses = {
    default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
    destructive: "bg-red-500 text-white hover:bg-red-600 dark:bg-red-600 dark:text-white dark:hover:bg-red-700",
    outline: "border border-slate-200 bg-transparent hover:bg-slate-100 text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-50",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-700",
    ghost: "hover:bg-slate-100 text-slate-900 dark:hover:bg-slate-800 dark:text-slate-50",
    link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
  };
  const sizeClasses = {
    default: iconOnly ? "h-10 w-10 p-0" : "h-10 py-2 px-4",
    sm: iconOnly ? "h-9 w-9 p-0" : "h-9 px-3 rounded-md",
    lg: iconOnly ? "h-11 w-11 p-0" : "h-11 px-8 rounded-md",
  };

  return (
    <button className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)} onClick={createRipple} disabled={loading} ref={ref} {...props}>
      <span className="relative z-10 flex items-center gap-2">
        {loading && <Loader2 className="h-4 w-4" />}
        {!loading && iconLeft && <span className="flex items-center justify-center">{iconLeft}</span>}
        {children}
        {!loading && iconRight && <span className="flex items-center justify-center">{iconRight}</span>}
      </span>
      {!loading && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          {ripples.map((ripple) => (
            <span key={ripple.id} className={cn("absolute rounded-full animate-ripple", rippleColor)} style={{ left: ripple.x, top: ripple.y, width: ripple.size, height: ripple.size }} />
          ))}
        </div>
      )}
    </button>
  );
});

Button.displayName = "Button";
export default Button;`;

type LayoutType =
  | "basic"
  | "commerce"
  | "social"
  | "icon-only"
  | "right-icon"
  | "others";

export function ButtonShowcase() {
  const [layout, setLayout] = useState<LayoutType>("basic");

  const generateUsageCode = (isTs: boolean) => {
    if (layout === "commerce") {
      return `import Button from "@/components/custom/button";
import { ShoppingCartIcon, HeartIcon, StarIcon, ShareIcon } from "@/components/custom/icons";

export default function CommerceDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default" iconLeft={<ShoppingCartIcon />}>Buy Now</Button>
      <Button variant="outline" iconLeft={<HeartIcon />}>Save for Later</Button>
      <Button variant="secondary" iconLeft={<StarIcon />}>Write Review</Button>
      <Button variant="ghost" iconLeft={<ShareIcon />}>Share Product</Button>
    </div>
  );
}`;
    }
    if (layout === "social") {
      return `import Button from "@/components/custom/button";
import { GoogleIcon, GitHubIcon, EmailIcon } from "@/components/custom/icons";

export default function SocialDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Button variant="outline" iconLeft={<EmailIcon />}>Login with Email</Button>
      <Button variant="outline" iconLeft={<GoogleIcon />}>Continue with Google</Button>
      <Button variant="outline" iconLeft={<GitHubIcon />}>Continue with GitHub</Button>
    </div>
  );
}`;
    }
    if (layout === "icon-only") {
      return `import Button from "@/components/custom/button";
import { SearchIcon, BellIcon, SettingsIcon } from "@/components/custom/icons";

export default function IconOnlyDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="outline" size="sm" iconLeft={<SearchIcon />} />
      <Button variant="outline" size="sm" iconLeft={<BellIcon />} />
      <Button variant="outline" size="sm" iconLeft={<SettingsIcon />} />
    </div>
  );
}`;
    }
    if (layout === "right-icon") {
      return `import Button from "@/components/custom/button";
import { ArrowRightIcon, CheckIcon } from "@/components/custom/icons";

export default function RightIconDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default" iconRight={<ArrowRightIcon />}>Next</Button>
      <Button variant="secondary" iconRight={<CheckIcon />}>Confirm</Button>
    </div>
  );
}`;
    }
    if (layout === "others") {
      return `import Button from "@/components/custom/button";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from "@/components/custom/icons";

export default function OthersDemo() {
  return (
    <div className="flex gap-4">
      <Button className="bg-green-500 hover:bg-green-600 text-white" iconLeft={<CheckIcon />}>Success</Button>
      <Button variant="destructive" iconLeft={<XIcon />}>Delete</Button>
      <Button variant="outline" iconLeft={<ArrowLeftIcon />}>Previous</Button>
      <Button variant="default" iconRight={<ArrowRightIcon />}>Next</Button>
    </div>
  );
}`;
    }
    return `import Button from "@/components/custom/button";

export default function BasicDemo() {
  return (
    <div className="flex gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl">
        <VariantTabs
          variants={[
            { value: "basic", label: "Basic Variants" },
            { value: "commerce", label: "E-Commerce" },
            { value: "social", label: "Social Login" },
            { value: "icon-only", label: "Icon Only" },
            { value: "right-icon", label: "Trailing Icon" },
            { value: "others", label: "Status & Nav" },
          ]}
          label="Button Category"
          defaultValue={layout}
          onValueChange={(v) => setLayout(v as LayoutType)}
        />
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="Button"
        tsCode={BUTTON_ENGINE_CODE_TS}
        jsCode={BUTTON_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[350px] bg-white dark:bg-black py-12 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          {layout === "basic" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="default">Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="default" size="sm">
                    Small
                  </Button>
                  <Button variant="default" size="lg">
                    Large
                  </Button>
                  <Button variant="default" loading>
                    Loading
                  </Button>
                  <Button variant="outline" loading>
                    Loading
                  </Button>
                </div>
              </div>
            </div>
          )}

          {layout === "commerce" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="default" iconLeft={<ShoppingCartIcon />}>
                    Buy Now
                  </Button>
                  <Button variant="outline" iconLeft={<HeartIcon />}>
                    Save for Later
                  </Button>
                  <Button variant="secondary" iconLeft={<StarIcon />}>
                    Write Review
                  </Button>
                  <Button variant="ghost" iconLeft={<ShareIcon />}>
                    Share Product
                  </Button>
                </div>
              </div>
            </div>
          )}

          {layout === "social" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl">
                  <Button variant="outline" iconLeft={<EmailIcon />}>
                    Login with Email
                  </Button>
                  <Button variant="outline" iconLeft={<GoogleIcon />}>
                    Continue with Google
                  </Button>
                  <Button variant="outline" iconLeft={<GitHubIcon />}>
                    Continue with GitHub
                  </Button>
                  <Button variant="outline" iconLeft={<FacebookIcon />}>
                    Login with Facebook
                  </Button>
                  <Button variant="outline" iconLeft={<XIcon2 />}>
                    Login with X
                  </Button>
                  <Button variant="outline" iconLeft={<AppleIcon />}>
                    Login with Apple
                  </Button>
                  <Button variant="outline" iconLeft={<MicrosoftIcon />}>
                    Login with Microsoft
                  </Button>
                  <Button variant="outline" iconLeft={<SlackIcon />}>
                    Login with Slack
                  </Button>
                  <Button variant="outline" iconLeft={<LinkedInIcon />}>
                    Login with LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          )}

          {layout === "icon-only" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<SearchIcon />}
                  />
                  <Button variant="outline" size="sm" iconLeft={<BellIcon />} />
                  <Button variant="outline" size="sm" iconLeft={<MailIcon />} />
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<PhoneIcon />}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<SettingsIcon />}
                  />
                  <Button variant="outline" size="sm" iconLeft={<PlusIcon />} />
                  <Button
                    variant="outline"
                    size="sm"
                    iconLeft={<MinusIcon />}
                  />
                  <Button variant="outline" size="sm" iconLeft={<XIcon />} />
                </div>
              </div>
            </div>
          )}

          {layout === "right-icon" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="default" iconRight={<ArrowRightIcon />}>
                    Next
                  </Button>
                  <Button variant="outline" iconRight={<ArrowRightIcon />}>
                    Continue
                  </Button>
                  <Button variant="secondary" iconRight={<CheckIcon />}>
                    Confirm
                  </Button>
                  <Button variant="ghost" iconRight={<SettingsIcon />}>
                    Settings
                  </Button>
                </div>
              </div>
            </div>
          )}

          {layout === "others" && (
            <div className="flex w-full flex-col items-center justify-center gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button variant="outline" iconLeft={<ArrowLeftIcon />}>
                    Previous
                  </Button>
                  <Button variant="default" iconRight={<ArrowRightIcon />}>
                    Next
                  </Button>
                  <Button variant="secondary" iconLeft={<ArrowLeftIcon />}>
                    Back
                  </Button>
                  <Button variant="ghost" iconRight={<ArrowRightIcon />}>
                    Forward
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    className="bg-emerald-500 dark:bg-emerald-600 text-white hover:bg-emerald-600 dark:hover:bg-emerald-700"
                    variant="default"
                    iconLeft={<CheckIcon />}
                  >
                    Success
                  </Button>
                  <Button variant="destructive" iconLeft={<XIcon />}>
                    Delete
                  </Button>
                  <Button variant="outline" iconLeft={<CheckIcon />}>
                    Approve
                  </Button>
                  <Button
                    className="bg-red-500 hover:bg-red-600 text-white"
                    variant="secondary"
                    iconLeft={<XIcon />}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
