"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { accentTokens } from "@/lib/accent";
import Button from "./Button";
import { Modal } from "./ModalBlock";

// ==========================================
// 1. TYPES & DATA
// ==========================================
export interface LiveParticipant {
  id: string;
  name: string;
  avatar: string;
  isSpeaking?: boolean;
  role?: string;
}

export interface LivePulsePillProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant of the pill. */
  variant?: "default" | "pulse";
  /** Array of active participants. Shows first 4 in the pill stack. */
  participants?: LiveParticipant[];
  /** Total count to display, e.g. "+4". Defaults to participants.length - 4 (if > 4) or 4. */
  count?: number | string;
  /** Modal title, defaults to "Live Session". */
  title?: string;
  /** Text on the primary action button inside the modal, defaults to "Join Now". */
  actionLabel?: string;
  /** Callback fired when the user clicks "Join Now". */
  onJoin?: () => void;
  /** Whether the modal is open (controlled mode). */
  open?: boolean;
  /** Callback fired when the modal open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** If true, clicking the pill will not open the modal. */
  disableModal?: boolean;
  /** Theme color override, e.g. "hsl(var(--primary))" or hex color. */
  themeColor?: string;
  /** Controlled joined state */
  isJoined?: boolean;
}

export const CURRENT_USER_PARTICIPANT: LiveParticipant = {
  id: "user-you",
  name: "You",
  avatar:
    "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg",
};

export const DEFAULT_LIVE_PARTICIPANTS: LiveParticipant[] = [
  {
    id: "p1",
    name: "David",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150480/photo-1507003211169-0a1dd7228f2d-1790150482276.jpg",
  },
  {
    id: "p2",
    name: "Kira",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg",
  },
  {
    id: "p3",
    name: "Marina",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150483/photo-1534528741775-53994a69daeb-1790150482280.jpg",
  },
  {
    id: "p4",
    name: "Razvan",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg",
  },
  {
    id: "p5",
    name: "Ana",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg",
    isSpeaking: true,
  },
  {
    id: "p6",
    name: "Daniel",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790158814/photo-1539571696357-5a69c17a67c6-1790158812214.jpg",
  },
  {
    id: "p7",
    name: "Afshin",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150482/photo-1530595467537-0b5996c41f2d-1790150482280.jpg",
  },
  {
    id: "p8",
    name: "Lina",
    avatar:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_240,h_240,c_fill/v1790150481/photo-1517841905240-472988babdf9-1790150482277.jpg",
  },
];

// ==========================================
// 2. ANIMATED SOUND EQUALIZER BARS
// ==========================================
export function SoundWaveBars({
  className,
  barColor = "currentColor",
}: {
  className?: string;
  barColor?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-[2px] h-4 w-4 shrink-0 select-none",
        className
      )}
      aria-hidden="true"
    >
      <span
        className="w-[2px] rounded-full bg-current animate-[live-wave-1_0.9s_ease-in-out_infinite]"
        style={{ color: barColor }}
      />
      <span
        className="w-[2px] rounded-full bg-current animate-[live-wave-2_1.1s_ease-in-out_infinite_0.15s]"
        style={{ color: barColor }}
      />
      <span
        className="w-[2px] rounded-full bg-current animate-[live-wave-3_0.8s_ease-in-out_infinite_0.3s]"
        style={{ color: barColor }}
      />
      <span
        className="w-[2px] rounded-full bg-current animate-[live-wave-4_1.0s_ease-in-out_infinite_0.45s]"
        style={{ color: barColor }}
      />
    </div>
  );
}

// ==========================================
// 3. MAIN LIVE PULSE PILL COMPONENT
// ==========================================
export function LivePulsePill({
  variant = "default",
  participants = DEFAULT_LIVE_PARTICIPANTS,
  count,
  title = "Live Session",
  actionLabel = "Join Now",
  onJoin,
  open: controlledOpen,
  onOpenChange,
  disableModal = false,
  themeColor,
  isJoined: controlledJoined,
  className,
  style,
  ...props
}: LivePulsePillProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isModalOpen = isControlled ? controlledOpen : internalOpen;

  const [internalJoined, setInternalJoined] = useState(false);
  const isJoined = controlledJoined !== undefined ? controlledJoined : internalJoined;

  const [joinStatus, setJoinStatus] = useState<"idle" | "loading" | "completed">("idle");

  // Active speaker index (starts with Ana or index 4, or first speaker)
  const initialSpeakerIndex = participants.findIndex((p) => p.isSpeaking);
  const [activeSpeakerIndex, setActiveSpeakerIndex] = useState(
    initialSpeakerIndex >= 0 ? initialSpeakerIndex : 0
  );

  const setOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  const pillRef = useRef<HTMLDivElement>(null);

  // Auto-cycle active speaker every 3 seconds across participants
  useEffect(() => {
    if (participants.length <= 1) return;
    const interval = setInterval(() => {
      setActiveSpeakerIndex((prev) => (prev + 1) % participants.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [participants.length]);

  // Handle manual participant click in modal to switch active speaker immediately
  const handleSelectSpeaker = (idx: number) => {
    setActiveSpeakerIndex(idx);
  };

  // Handle Join button click: loading -> completed -> close modal & add avatar + set count 5
  const handleJoinClick = () => {
    if (joinStatus !== "idle" || isJoined) return;

    setJoinStatus("loading");

    setTimeout(() => {
      setJoinStatus("completed");

      setTimeout(() => {
        setInternalJoined(true);
        onJoin?.();
        setOpen(false);
        setJoinStatus("idle");
      }, 700);
    }, 1200);
  };

  // Dynamic theme tokens from accent resolver so presets like 'lavender' map to real hex
  const containerStyle: React.CSSProperties = useMemo(() => {
    const tokens = accentTokens(themeColor);
    return {
      ...tokens,
      ...style,
    };
  }, [themeColor, style]);

  // Avatars shown in the pill: when joined, prepend "You" at the beginning
  const previewAvatars = useMemo(() => {
    if (isJoined) {
      return [CURRENT_USER_PARTICIPANT, ...participants.slice(0, 4)];
    }
    return participants.slice(0, 4);
  }, [isJoined, participants]);

  // Remaining count for avatar disc: "+4" before join, "+5" after join
  const remainingCount = useMemo(() => {
    if (isJoined) {
      return "+5";
    }
    if (count !== undefined) {
      return typeof count === "number" && count > 0
        ? `+${count}`
        : String(count);
    }
    return participants.length > 4 ? `+${participants.length - 4}` : "+4";
  }, [isJoined, count, participants.length]);

  return (
    <>
      {/* Global CSS Keyframes for Sound Equalizer Waves & Theme Ambient Pulse */}
      <style>{`
        @keyframes live-wave-1 {
          0%, 100% { height: 4px; }
          50% { height: 13px; }
        }
        @keyframes live-wave-2 {
          0%, 100% { height: 14px; }
          50% { height: 5px; }
        }
        @keyframes live-wave-3 {
          0%, 100% { height: 6px; }
          50% { height: 15px; }
        }
        @keyframes live-wave-4 {
          0%, 100% { height: 12px; }
          50% { height: 4px; }
        }
        @keyframes live-pill-ripple {
          0% {
            inset: 0px;
            opacity: 0;
          }
          12% {
            inset: -2px;
            opacity: 0.75;
          }
          50% {
            inset: -8px;
            opacity: 0.35;
          }
          100% {
            inset: -16px;
            opacity: 0;
          }
        }
        @keyframes live-speaker-ping {
          0% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.35;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }
      `}</style>

      {/* Pill Wrapper with Outward Radiating Wave Effect */}
      <div
        className={cn(
          "relative inline-flex items-center justify-center select-none w-fit max-w-[270px] h-11 sm:h-12",
          className
        )}
        style={containerStyle}
      >
        {/* Expanding ripple waves spreading outward from the border in all directions and fading away */}
        <span
          className="absolute rounded-full border border-primary pointer-events-none animate-[live-pill-ripple_2.4s_cubic-bezier(0,0.2,0.8,1)_infinite]"
          style={{ borderColor: "var(--primary)" }}
          aria-hidden="true"
        />
        <span
          className="absolute rounded-full border border-primary pointer-events-none animate-[live-pill-ripple_2.4s_cubic-bezier(0,0.2,0.8,1)_infinite_1.2s]"
          style={{ borderColor: "var(--primary)" }}
          aria-hidden="true"
        />

        {/* Pill Trigger Container: Zero drop-shadow, flat border, no hover zoom */}
        <div
          ref={pillRef}
          role="button"
          tabIndex={0}
          onClick={() => {
            if (!disableModal) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              if (!disableModal) setOpen(true);
            }
          }}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          className={cn(
            "relative z-10 flex items-center gap-2.5 sm:gap-3 px-2.5 sm:px-3 py-1.5 rounded-full cursor-pointer select-none transition-colors duration-200 shadow-none outline-none focus-visible:ring-2 focus-visible:ring-primary/40 w-full h-full",
            // Neutral border, zero drop-shadow, no colored border stuck to the pill
            "bg-white text-zinc-900 border border-zinc-200 hover:border-zinc-300",
            "dark:bg-zinc-900 dark:text-white dark:border-zinc-800 dark:hover:border-zinc-700"
          )}
          {...props}
        >
          {/* Left: Continuous Soundwave Icon with Theme Color applied */}
          <div
            className="relative size-7.5 sm:size-8 rounded-full flex items-center justify-center shrink-0 shadow-xs"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <SoundWaveBars
              className="scale-85 sm:scale-95"
              barColor="var(--primary-foreground)"
            />
          </div>

          {/* Middle & Right: Overlapping Avatars Stack with +N Avatar Disc */}
          <div className="flex items-center -space-x-2 sm:-space-x-2.5 overflow-visible">
            {previewAvatars.map((person, idx) => (
              <img
                key={person.id || idx}
                src={person.avatar}
                alt={person.name}
                className="size-7 sm:size-7.5 rounded-full object-cover ring-2 ring-white dark:ring-zinc-900 shrink-0 select-none pointer-events-none"
              />
            ))}
            {/* +4 Avatar Disc matching the avatar size, with centered text & theme color */}
            <div
              className="size-7 sm:size-7.5 rounded-full ring-2 ring-white dark:ring-zinc-900 flex items-center justify-center shrink-0 font-bold text-[11px] select-none shadow-xs"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              {remainingCount}
            </div>
          </div>
        </div>
      </div>

      {/* Center Pop-up Modal with Modal Component from ModalBlock */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setOpen(false)}
        variant="custom"
        contentClassName="max-w-[360px] sm:max-w-[400px] rounded-[30px] p-6 sm:p-7 bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 shadow-2xl overflow-visible select-none"
      >
        <div style={containerStyle} className="w-full">
          {/* Modal Title */}
          <h2 className="text-base sm:text-lg font-bold text-center tracking-tight text-zinc-900 dark:text-white">
            {title}
          </h2>

          {/* Participants Grid: 2 rows of 4 with Interactive Speaker Switching */}
          <div className="grid grid-cols-4 gap-y-5 gap-x-2.5 sm:gap-x-4 my-7">
            {participants.map((person, idx) => {
              const isCurrentlySpeaking = activeSpeakerIndex === idx;

              return (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => handleSelectSpeaker(idx)}
                  className="flex flex-col items-center group cursor-pointer outline-none transition-transform"
                  title={`Click to set ${person.name} as speaker`}
                >
                  {/* Avatar with Dynamic Active Speaker Recording Pulse Ring & Wave Badge */}
                  <div className="relative size-13 sm:size-14 rounded-full flex items-center justify-center">
                    {/* Live active recording pulse expanding outward */}
                    {isCurrentlySpeaking && (
                      <span
                        className="absolute -inset-1.5 rounded-full animate-[live-speaker-ping_2s_ease-out_infinite] pointer-events-none"
                        style={{
                          border: "2px solid var(--primary)",
                        }}
                        aria-hidden="true"
                      />
                    )}

                    <img
                      src={person.avatar}
                      alt={person.name}
                      className={cn(
                        "size-full rounded-full object-cover transition-all duration-300 relative z-10",
                        isCurrentlySpeaking
                          ? "ring-2 ring-offset-2 ring-offset-background"
                          : "ring-2 ring-zinc-200 dark:ring-zinc-800 group-hover:ring-primary/40"
                      )}
                      style={
                        isCurrentlySpeaking
                          ? {
                              boxShadow: "0 0 0 2.5px var(--primary)",
                            }
                          : undefined
                      }
                    />

                    {/* Active Speaker Animated Soundwave Badge with Theme Color */}
                    {isCurrentlySpeaking && (
                      <div
                        className="absolute -top-1 -right-1 z-20 size-5.5 rounded-full flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-sm animate-in fade-in zoom-in-75 duration-200"
                        style={{
                          backgroundColor: "var(--primary)",
                          color: "var(--primary-foreground)",
                        }}
                        title="Speaking now"
                      >
                        <SoundWaveBars
                          className="scale-65"
                          barColor="var(--primary-foreground)"
                        />
                      </div>
                    )}
                  </div>

                  {/* Participant Name */}
                  <span
                    className="text-xs sm:text-[13px] font-medium text-center mt-2 truncate w-full transition-colors"
                    style={
                      isCurrentlySpeaking
                        ? { color: "var(--primary)", fontWeight: 600 }
                        : undefined
                    }
                  >
                    {person.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bottom Action Button with Loading and Joined State */}
          <Button
            variant="default"
            disabled={joinStatus === "loading"}
            onClick={handleJoinClick}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
            className="w-full py-3.5 rounded-full font-semibold text-sm cursor-pointer shadow-sm hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {joinStatus === "loading" ? (
              <Loader2 className="size-4.5 animate-spin" />
            ) : joinStatus === "completed" || isJoined ? (
              <span>Joined</span>
            ) : (
              <span>{actionLabel}</span>
            )}
          </Button>
        </div>
      </Modal>
    </>
  );
}
