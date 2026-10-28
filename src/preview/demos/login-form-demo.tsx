"use client";

import LoginForm, {
  LoginFormProps,
} from "@/components/custom/blocks/LoginForm";

export default function LoginFormDemo({
  variant = "default",
  color = "primary",
  ...props
}: LoginFormProps) {
  const isFullBleed =
    variant === "split" ||
    variant === "scenic" ||
    variant === "nature" ||
    variant === "landscape" ||
    variant === "glass" ||
    variant === "liquid-glass" ||
    variant === "ribbon-drift";

  return (
    <div
      className={`w-full max-w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 relative overflow-hidden rounded-2xl ${
        isFullBleed ? "p-0" : "bg-muted/40 py-12"
      }`}
    >
      <div className="relative z-10 w-full max-w-full min-w-0 h-full flex justify-center overflow-hidden">
        <LoginForm
          key={`${variant}-${color}-${props.title || props.heading || ""}-${props.bgImage || props.image || ""}`}
          variant={variant}
          color={color}
          {...props}
        />
      </div>
    </div>
  );
}
