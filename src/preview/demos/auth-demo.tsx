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
      className={`w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 relative overflow-hidden rounded-2xl ${variant === "glass" ? "p-4 sm:p-8" : "bg-zinc-50/50 dark:bg-transparent py-12"}`}
    >
      {variant === "glass" && (
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80"
            alt="Moody lake sunset landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>
      )}
      <div className="relative z-10 w-full flex justify-center">
        <AuthForm
          key={`${type}-${variant}-${color}`}
          type={type}
          variant={variant}
          color={color}
        />
      </div>
    </div>
  );
}
