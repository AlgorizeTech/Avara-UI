import {
  AvatarFallback,
  AvatarImage,
  Avatar as ShadCNAvatar,
} from "@/components/custom/ui/avatar";
import { cn } from "@/lib/utils";

export type AvatarData = {
  src: string;
  fallback: string;
};

export type AvatarProps = {
  avatars?: AvatarData[];
  active?: boolean;
  status?: "active" | "inactive";
  size?: "sm" | "default" | "lg";
  className?: string;
  avatarClassName?: string;
  imageClassName?: string;
  fallbackClassName?: string;
};

export const Avatar = ({
  avatars = [],
  active = false,
  status,
  size = "default",
  className,
  avatarClassName,
  imageClassName,
  fallbackClassName,
}: AvatarProps) => {
  if (!avatars.length) return null;

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return {
          avatar: "w-8 h-8",
          fallback: "text-xs",
          indicator: "w-2.5 h-2.5 bottom-0 right-0",
        };
      case "lg":
        return {
          avatar: "w-16 h-16",
          fallback: "text-lg",
          indicator: "w-4 h-4 bottom-0.5 right-0.5",
        };
      default:
        return {
          avatar: "w-10 h-10",
          fallback: "text-sm",
          indicator: "w-3 h-3 bottom-0 right-0",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const getStatusColor = () => {
    if (!active) return "";
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      default:
        return "bg-zinc-400 dark:bg-zinc-600";
    }
  };

  const StatusIndicator = () => {
    if (!active) return null;
    return (
      <div
        className={cn(
          "absolute rounded-full border-2 border-white dark:border-[#09090b] z-10",
          sizeClasses.indicator,
          getStatusColor(),
        )}
      />
    );
  };

  // Single Avatar Layout
  if (avatars.length === 1) {
    const avatar = avatars[0];
    return (
      <div
        className={cn(
          "relative inline-flex items-center justify-center shrink-0",
          className,
        )}
      >
        <ShadCNAvatar className={cn(sizeClasses.avatar, avatarClassName)}>
          <AvatarImage
            src={avatar.src}
            className={cn(
              "object-cover w-full h-full aspect-square",
              imageClassName,
            )}
            alt={avatar.fallback}
          />
          <AvatarFallback
            className={cn(sizeClasses.fallback, fallbackClassName)}
          >
            {avatar.fallback}
          </AvatarFallback>
        </ShadCNAvatar>
        <StatusIndicator />
      </div>
    );
  }

  // Group Avatar Layout
  return (
    <div
      className={cn(
        "relative flex -space-x-3 sm:-space-x-2 shrink-0",
        className,
      )}
    >
      {avatars.map((avatar, index) => (
        <div
          key={index}
          className="relative z-0 hover:z-10 transition-transform hover:scale-105 duration-200"
        >
          <ShadCNAvatar
            className={cn(
              "border-2 border-white dark:border-[#09090b] bg-zinc-100 dark:bg-zinc-800",
              sizeClasses.avatar,
              avatarClassName,
            )}
          >
            <AvatarImage
              src={avatar.src}
              className={cn(
                "object-cover w-full h-full aspect-square",
                imageClassName,
              )}
              alt={avatar.fallback}
            />
            <AvatarFallback
              className={cn(sizeClasses.fallback, fallbackClassName)}
            >
              {avatar.fallback}
            </AvatarFallback>
          </ShadCNAvatar>
        </div>
      ))}
    </div>
  );
};
