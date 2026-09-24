"use client";

import RegisterForm, {
  RegisterColor,
  RegisterVariant,
} from "@/components/custom/blocks/RegisterForm";

export default function RegisterFormDemo({
  variant = "default",
  color = "primary",
}: {
  variant?: RegisterVariant;
  color?: RegisterColor;
}) {
  return (
    <div
      className={`w-full flex items-center justify-center min-h-[600px] transition-colors duration-300 relative overflow-hidden rounded-2xl ${variant === "glass" ? "p-4 sm:p-8" : "bg-muted/40 py-12"}`}
    >
      {variant === "glass" && (
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1600,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg"
            alt="Moody lake sunset landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />
        </div>
      )}
      <div className="relative z-10 w-full flex justify-center">
        <RegisterForm
          key={`${variant}-${color}`}
          variant={variant}
          color={color}
        />
      </div>
    </div>
  );
}
