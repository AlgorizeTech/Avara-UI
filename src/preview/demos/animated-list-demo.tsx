"use client";

import {
  AnimatedList,
  AnimatedListItem,
  AnimationVariant,
} from "@/components/custom/blocks/AnimatedListBlock";
import { cn } from "@/lib/utils";
import { CheckCircle2, CreditCard, UserPlus, Zap } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: CreditCard,
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-500/20",
    title: "Payment Received",
    desc: "Stripe successfully processed $129.00",
    time: "2m",
  },
  {
    id: 2,
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10 border border-blue-500/20",
    title: "New Signup",
    desc: "alice@example.com created a Pro account",
    time: "15m",
  },
  {
    id: 3,
    icon: CheckCircle2,
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-500/20",
    title: "Deployment Successful",
    desc: "Production deployment (v2.4.1) is live",
    time: "1h",
  },
  {
    id: 4,
    icon: Zap,
    color: "text-rose-500",
    bg: "bg-rose-50 dark:bg-rose-500/10 border border-rose-500/20",
    title: "Server Scaled",
    desc: "Auto-scaled cluster to handle traffic spike",
    time: "3h",
  },
];

export default function AnimatedListDemo({
  variant = "slide-right",
  ease = "back.out(1.5)",
  animKey = 0,
  staggerDelay = 0.15,
  duration,
  animationDelay,
}: {
  variant?: AnimationVariant;
  ease?: string;
  animKey?: number;
  staggerDelay?: number;
  duration?: number;
  animationDelay?: number;
}) {
  return (
    // In dark mode the preview surface is --background too, so the tray lifts
    // by a faint ink wash (between the page and the bg-card toasts) and a
    // firmer edge; light mode already reads against the white preview.
    <div className="w-full flex justify-center items-center bg-background dark:bg-foreground/[0.035] rounded-2xl border border-border dark:border-foreground/10 py-6 px-4 relative overflow-hidden">
      {/* Toast Notification Container */}
      <div className="w-full max-w-md relative z-10">
        <AnimatedList
          key={`${animKey}-${variant}-${ease}-${staggerDelay}-${duration}-${animationDelay}`}
          variant={variant}
          ease={ease}
          staggerDelay={staggerDelay}
          duration={duration}
          animationDelay={animationDelay}
        >
          {notifications.map((notif) => (
            <AnimatedListItem key={notif.id} className="p-3.5 sm:p-4">
              <div className="flex items-center gap-3 min-w-0">
                {/* Icon Container with Hover Bounce */}
                <div
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110",
                    notif.bg,
                    notif.color,
                  )}
                >
                  <notif.icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-[13px] sm:text-[13.5px] font-semibold text-foreground truncate">
                      {notif.title}
                    </h4>
                    <span className="text-[10px] sm:text-[10.5px] font-semibold text-muted-foreground flex-shrink-0">
                      {notif.time}
                    </span>
                  </div>
                  <p className="text-[11.5px] sm:text-[12px] font-medium text-muted-foreground leading-snug break-words line-clamp-2 mt-[1px]">
                    {notif.desc}
                  </p>
                </div>
              </div>
            </AnimatedListItem>
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
