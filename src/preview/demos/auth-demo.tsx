"use client";

import AuthForm, {
  AuthColor,
  AuthType,
  AuthVariant,
} from "@/components/custom/blocks/AuthForm";

export default function AuthDemo({
  type = "signup",
  variant = "default",
  color = "primary",
}: {
  type?: AuthType;
  variant?: AuthVariant;
  color?: AuthColor;
}) {
  return (
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
  );
}
