"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Mic, Play, Pause, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================

export interface VoiceNoteRecordResult {
  /** The recorded audio Blob from real microphone recording. */
  blob: Blob | null;
  /** Temporary Object URL for audio playback. */
  url: string | null;
  /** Total recorded duration in seconds. */
  duration: number;
}

export interface VoiceNoteProps {
  /** Initial hold text when idle. Defaults to "Hold to record". */
  holdLabel?: string;
  /** Text shown below the pill while recording. Defaults to "< Slide to cancel". */
  slideCancelLabel?: string;
  /** Maximum recording duration in seconds before auto-stopping. Default 60. */
  maxDuration?: number;
  /** Minimum recording duration in seconds to consider valid. Default 0.4. */
  minDuration?: number;
  /** Whether to capture real audio from the user's microphone when available. Default true. */
  enableMic?: boolean;
  /** Optional theme accent color for play button and active waveform bars. */
  themeColor?: string;
  /** Callback fired when recording starts. */
  onRecordStart?: () => void;
  /** Callback fired when recording is completed and ready. */
  onRecordComplete?: (result: VoiceNoteRecordResult) => void;
  /** Callback fired when recording is canceled via slide gesture, quick click, or cross button. */
  onCancel?: () => void;
  /** Custom CSS classes for the root container. */
  className?: string;
  /** Initial state for testing or static previews. */
  initialState?: "idle" | "recording" | "recorded";
  /** Initial recorded duration in seconds (if initialState is 'recorded'). Default 2. */
  initialDuration?: number;
}

// ==========================================
// 2. HELPER UTILITIES
// ==========================================

/** Formats seconds into "m:ss" (e.g. 2 -> "0:02", 65 -> "1:05"). */
function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

/** Detects the best supported audio mime type for MediaRecorder. */
function getSupportedMimeType(): string {
  if (typeof window === "undefined" || typeof MediaRecorder === "undefined") {
    return "";
  }
  const types = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/ogg;codecs=opus",
    "audio/mp4",
    "audio/aac",
  ];
  for (const t of types) {
    if (MediaRecorder.isTypeSupported(t)) return t;
  }
  return "";
}

/** Generates realistic default waveform bar heights (0 to 1 scale). */
function generateWaveformBars(count: number = 26): number[] {
  const envelope = [
    0.25, 0.4, 0.65, 0.45, 0.8, 0.4, 0.9, 0.6, 0.35, 0.75, 0.5, 0.95,
    0.7, 0.4, 0.85, 0.65, 0.35, 0.55, 0.8, 0.5, 0.9, 0.6, 0.4, 0.3,
    0.45, 0.3,
  ];
  if (count === envelope.length) return envelope;
  return Array.from({ length: count }, (_, i) => {
    const idx = Math.floor((i / count) * envelope.length);
    return envelope[idx] ?? 0.4;
  });
}

// ==========================================
// 3. MAIN COMPONENT
// ==========================================

export const VoiceNote = React.forwardRef<HTMLDivElement, VoiceNoteProps>(
  (
    {
      holdLabel = "Hold to record",
      slideCancelLabel = "< Slide to cancel",
      maxDuration = 60,
      minDuration = 0.4,
      enableMic = true,
      themeColor,
      onRecordStart,
      onRecordComplete,
      onCancel,
      className,
      initialState = "idle",
      initialDuration = 2,
    },
    ref,
  ) => {
    // States: 'idle' | 'recording' | 'recorded'
    const [status, setStatus] = useState<"idle" | "recording" | "recorded">(initialState);
    const [duration, setDuration] = useState<number>(
      initialState === "recorded" ? initialDuration : 0,
    );
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [playbackProgress, setPlaybackProgress] = useState<number>(0);
    const [isCanceling, setIsCanceling] = useState<boolean>(false);
    const [slideOffset, setSlideOffset] = useState<number>(0);

    // Audio & Real Recording Refs
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const audioBlobRef = useRef<Blob | null>(null);
    const audioUrlRef = useRef<string | null>(null);
    const audioElementRef = useRef<HTMLAudioElement | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const playbackTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Samples of real user voice to build the real final waveform
    const recordedSamplesRef = useRef<number[]>([]);

    // Touch / Mouse Tracking
    const startXRef = useRef<number>(0);
    const isPointerDownRef = useRef<boolean>(false);
    const startTimeRef = useRef<number>(0);
    const isRecordingActiveRef = useRef<boolean>(false);

    // Waveform state (26 normalized bars 0 to 1)
    const [waveforms, setWaveforms] = useState<number[]>(() =>
      generateWaveformBars(26),
    );

    // Synthesized Audio Tone Fallback (if browser blocks audio playback or no mic stream)
    const playSynthesizedTone = useCallback((progress: number) => {
      try {
        const AudioCtx =
          window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(260 + progress * 240, ctx.currentTime);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      } catch {}
    }, []);

    // Cleanup resources on unmount
    useEffect(() => {
      return () => {
        if (audioUrlRef.current) {
          URL.revokeObjectURL(audioUrlRef.current);
        }
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (audioContextRef.current) {
          try {
            audioContextRef.current.close();
          } catch {}
        }
      };
    }, []);

    // Smooth Real-time Waveform Animation using AnalyserNode (Live Mic Volume)
    const startWaveformAnimation = useCallback(() => {
      let tick = 0;
      const barCount = 26;

      const animate = () => {
        tick += 0.08;

        if (analyserRef.current) {
          const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
          analyserRef.current.getByteFrequencyData(dataArray);

          // Calculate overall volume & spread across frequency bands
          let totalVolume = 0;
          const step = Math.max(1, Math.floor(dataArray.length / barCount));
          const newBars: number[] = [];

          for (let i = 0; i < barCount; i++) {
            const rawVal = dataArray[i * step] || 0;
            totalVolume += rawVal;
            // Smooth natural speech curve
            const normalized = Math.max(0.15, Math.min(1, rawVal / 160));
            newBars.push(normalized);
          }

          // Record voice sample history for post-recording display
          const avgVolume = totalVolume / (barCount * 160);
          recordedSamplesRef.current.push(Math.max(0.2, Math.min(1, avgVolume)));

          setWaveforms(newBars);
        } else {
          // Gentle smooth organic wave fallback
          const newBars = Array.from({ length: barCount }, (_, i) => {
            const wave1 = Math.sin(tick + i * 0.35);
            const wave2 = Math.cos(tick * 0.6 - i * 0.25);
            const base = (wave1 + wave2 + 2) / 4;
            const centerDist = 1 - Math.abs(i - barCount / 2) / (barCount / 2);
            return Math.max(0.18, Math.min(0.95, base * 0.65 + centerDist * 0.35));
          });
          setWaveforms(newBars);
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }, []);

    const stopWaveformAnimation = useCallback(() => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }, []);

    // ------------------------------------------
    // REAL RECORDING LIFECYCLE
    // ------------------------------------------

    const startRecording = useCallback(async () => {
      if (status === "recording") return;

      isPointerDownRef.current = true;
      isRecordingActiveRef.current = true;
      setStatus("recording");
      setDuration(0);
      setIsCanceling(false);
      setSlideOffset(0);
      startTimeRef.current = Date.now();
      audioChunksRef.current = [];
      recordedSamplesRef.current = [];

      onRecordStart?.();

      // Start duration timer
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = setInterval(() => {
        setDuration((prev) => {
          const next = prev + 1;
          if (next >= maxDuration) {
            stopRecording(false);
          }
          return next;
        });
      }, 1000);

      // Start soundwave visuals
      startWaveformAnimation();

      // Real Microphone capture via Web MediaRecorder
      if (
        enableMic &&
        typeof window !== "undefined" &&
        navigator.mediaDevices?.getUserMedia
      ) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
            },
          });

          mediaStreamRef.current = stream;

          // If user already released before permission was resolved
          if (!isPointerDownRef.current || !isRecordingActiveRef.current) {
            stream.getTracks().forEach((track) => track.stop());
            return;
          }

          // Setup AudioContext Analyser
          try {
            const AudioCtx =
              window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioCtx();
            if (ctx.state === "suspended") {
              await ctx.resume();
            }
            const source = ctx.createMediaStreamSource(stream);
            const analyser = ctx.createAnalyser();
            analyser.fftSize = 64;
            analyser.smoothingTimeConstant = 0.85; // smooth natural motion
            source.connect(analyser);
            analyserRef.current = analyser;
            audioContextRef.current = ctx;
          } catch {}

          // Setup MediaRecorder
          const mimeType = getSupportedMimeType();
          const options = mimeType ? { mimeType } : undefined;
          const recorder = new MediaRecorder(stream, options);
          mediaRecorderRef.current = recorder;

          recorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };

          recorder.start(100);
        } catch {
          // Mic permission denied or unavailable
          analyserRef.current = null;
        }
      }
    }, [status, maxDuration, enableMic, onRecordStart, startWaveformAnimation]);

    const cancelRecording = useCallback(() => {
      isPointerDownRef.current = false;
      isRecordingActiveRef.current = false;

      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      stopWaveformAnimation();

      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        try {
          mediaRecorderRef.current.stop();
        } catch {}
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }

      setStatus("idle");
      setDuration(0);
      setIsCanceling(false);
      setSlideOffset(0);
      onCancel?.();
    }, [stopWaveformAnimation, onCancel]);

    const stopRecording = useCallback(
      (cancelled = false) => {
        if (!isPointerDownRef.current && status !== "recording") return;
        isPointerDownRef.current = false;
        isRecordingActiveRef.current = false;

        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        stopWaveformAnimation();

        if (cancelled) {
          cancelRecording();
          return;
        }

        const elapsedSeconds = (Date.now() - startTimeRef.current) / 1000;

        // If user merely clicked instead of holding (below minDuration), cancel immediately
        if (elapsedSeconds < minDuration) {
          cancelRecording();
          return;
        }

        const finalDuration = Math.max(1, Math.round(elapsedSeconds));
        setDuration(finalDuration);

        // Process real audio recording
        const recorder = mediaRecorderRef.current;
        if (recorder && recorder.state !== "inactive") {
          try {
            recorder.onstop = () => {
              const mimeType = recorder.mimeType || "audio/webm";
              const blob = new Blob(audioChunksRef.current, { type: mimeType });
              audioBlobRef.current = blob;

              if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
              const url = URL.createObjectURL(blob);
              audioUrlRef.current = url;

              // Preload audio element
              if (audioElementRef.current) {
                audioElementRef.current.src = url;
              } else {
                audioElementRef.current = new Audio(url);
              }

              onRecordComplete?.({
                blob,
                url,
                duration: finalDuration,
              });

              if (mediaStreamRef.current) {
                mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                mediaStreamRef.current = null;
              }
            };

            recorder.stop();
          } catch {
            onRecordComplete?.({
              blob: null,
              url: null,
              duration: finalDuration,
            });
          }
        } else {
          onRecordComplete?.({
            blob: null,
            url: null,
            duration: finalDuration,
          });
        }

        // Generate final recorded waveform from real voice samples if captured
        if (recordedSamplesRef.current.length > 10) {
          const samples = recordedSamplesRef.current;
          const barCount = 26;
          const chunkSize = Math.floor(samples.length / barCount);
          const compressed = Array.from({ length: barCount }, (_, i) => {
            let sum = 0;
            const start = i * chunkSize;
            const end = Math.min(samples.length, start + chunkSize);
            for (let j = start; j < end; j++) {
              sum += samples[j] || 0.3;
            }
            const avg = sum / Math.max(1, end - start);
            return Math.max(0.18, Math.min(1, avg));
          });
          setWaveforms(compressed);
        } else {
          setWaveforms(generateWaveformBars(26));
        }

        setStatus("recorded");
        setSlideOffset(0);
        setIsCanceling(false);
      },
      [status, minDuration, stopWaveformAnimation, cancelRecording, onRecordComplete],
    );

    // ------------------------------------------
    // PLAYBACK CONTROLS
    // ------------------------------------------

    const togglePlayback = useCallback(() => {
      if (isPlaying) {
        if (audioElementRef.current) {
          audioElementRef.current.pause();
        }
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        setIsPlaying(false);
      } else {
        setIsPlaying(true);

        if (audioUrlRef.current) {
          let audio = audioElementRef.current;
          if (!audio) {
            audio = new Audio(audioUrlRef.current);
            audioElementRef.current = audio;
          } else if (audio.src !== audioUrlRef.current) {
            audio.src = audioUrlRef.current;
          }

          const targetTime = playbackProgress * (audio.duration || duration);
          audio.currentTime = Number.isFinite(targetTime) ? targetTime : 0;

          audio
            .play()
            .then(() => {
              audio.ontimeupdate = () => {
                if (audio.duration) {
                  setPlaybackProgress(audio.currentTime / audio.duration);
                }
              };
              audio.onended = () => {
                setIsPlaying(false);
                setPlaybackProgress(0);
              };
            })
            .catch(() => {
              // Fallback if browser audio policy blocks autoplay
              setIsPlaying(false);
            });
        } else {
          // Tone fallback simulation
          const totalSteps = 40;
          const stepInterval = (duration * 1000) / totalSteps;
          let currentStep = Math.floor(playbackProgress * totalSteps);

          if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
          playbackTimerRef.current = setInterval(() => {
            currentStep += 1;
            const progress = currentStep / totalSteps;
            setPlaybackProgress(Math.min(1, progress));
            playSynthesizedTone(progress);

            if (currentStep >= totalSteps) {
              if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
              setIsPlaying(false);
              setPlaybackProgress(0);
            }
          }, stepInterval);
        }
      }
    }, [isPlaying, playbackProgress, duration, playSynthesizedTone]);

    // Reset voice note back to idle "Hold to record"
    const handleClose = useCallback(() => {
      if (isPlaying) {
        if (audioElementRef.current) audioElementRef.current.pause();
        if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
        setIsPlaying(false);
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
        audioUrlRef.current = null;
      }
      audioBlobRef.current = null;
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        mediaStreamRef.current = null;
      }
      setStatus("idle");
      setDuration(0);
      setPlaybackProgress(0);
      setIsCanceling(false);
      setSlideOffset(0);
      onCancel?.();
    }, [isPlaying, onCancel]);

    // ------------------------------------------
    // POINTER & TOUCH GESTURE HANDLERS
    // ------------------------------------------

    const handlePointerDown = (clientX: number) => {
      startXRef.current = clientX;
      startRecording();
    };

    const handlePointerMove = (clientX: number) => {
      if (!isPointerDownRef.current || status !== "recording") return;
      const deltaX = clientX - startXRef.current;

      if (deltaX < 0) {
        const offset = Math.max(-120, deltaX);
        setSlideOffset(offset);
        if (deltaX < -50) {
          setIsCanceling(true);
        } else {
          setIsCanceling(false);
        }
      } else {
        setSlideOffset(0);
        setIsCanceling(false);
      }
    };

    const handlePointerUp = () => {
      if (!isPointerDownRef.current) return;
      if (isCanceling) {
        stopRecording(true);
      } else {
        stopRecording(false);
      }
    };

    // Global move/up listeners during recording
    useEffect(() => {
      if (status !== "recording") return;

      const onWindowMouseMove = (e: MouseEvent) => {
        handlePointerMove(e.clientX);
      };
      const onWindowMouseUp = () => {
        handlePointerUp();
      };
      const onWindowTouchMove = (e: TouchEvent) => {
        if (e.touches[0]) handlePointerMove(e.touches[0].clientX);
      };
      const onWindowTouchEnd = () => {
        handlePointerUp();
      };

      window.addEventListener("mousemove", onWindowMouseMove);
      window.addEventListener("mouseup", onWindowMouseUp);
      window.addEventListener("touchmove", onWindowTouchMove);
      window.addEventListener("touchend", onWindowTouchEnd);

      return () => {
        window.removeEventListener("mousemove", onWindowMouseMove);
        window.removeEventListener("mouseup", onWindowMouseUp);
        window.removeEventListener("touchmove", onWindowTouchMove);
        window.removeEventListener("touchend", onWindowTouchEnd);
      };
    }, [status, isCanceling, stopRecording]);

    const activeWaveformIndex = useMemo(() => {
      return Math.floor(playbackProgress * waveforms.length);
    }, [playbackProgress, waveforms.length]);

    const themeStyle = useMemo(() => {
      if (!themeColor) return {};
      const colorVal = themeColor.startsWith("#") || themeColor.startsWith("rgb")
        ? themeColor
        : `var(--${themeColor}, ${themeColor})`;
      return {
        "--theme-color": colorVal,
      } as React.CSSProperties;
    }, [themeColor]);

    return (
      <div
        ref={ref}
        style={themeStyle}
        className={cn(
          "relative flex flex-col items-center justify-center select-none cursor-pointer font-sans",
          className,
        )}
      >
        {/* Fixed vertical anchor container - prevents any vertical displacement */}
        <div className="relative flex items-center justify-center cursor-pointer min-h-[52px]">
          {/* ============================================================== */}
          {/* STATE 1: IDLE ("Hold to record")                               */}
          {/* ============================================================== */}
          {status === "idle" && (
            <button
              type="button"
              onMouseDown={(e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                handlePointerDown(e.clientX);
              }}
              onTouchStart={(e) => {
                if (e.touches[0]) {
                  handlePointerDown(e.touches[0].clientX);
                }
              }}
              onContextMenu={(e) => e.preventDefault()}
              className={cn(
                "group inline-flex items-center gap-3 px-8 py-3.5 rounded-full cursor-pointer",
                "bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800",
                "shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
                "transition-all duration-500 ease-out active:scale-95",
                "text-zinc-900 dark:text-zinc-100",
              )}
              aria-label="Hold to record voice note"
            >
              <Mic className="size-5 text-zinc-900 dark:text-zinc-100 cursor-pointer transition-transform duration-300 group-hover:scale-110" />
              <span className="text-base sm:text-lg font-medium tracking-tight cursor-pointer">
                {holdLabel}
              </span>
            </button>
          )}

          {/* ============================================================== */}
          {/* STATE 2: RECORDING (Slowly scales up smoothly)                */}
          {/* ============================================================== */}
          {status === "recording" && (
            <div
              style={{
                transform: `translateX(${slideOffset * 0.4}px) scale(1.05)`,
                opacity: isCanceling ? 0.6 : 1,
              }}
              className={cn(
                "inline-flex items-center gap-4 px-7 py-3.5 rounded-full cursor-pointer",
                "bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800",
                "shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
                "transition-all duration-500 ease-out select-none",
                isCanceling && "border-rose-400 dark:border-rose-500 ring-2 ring-rose-400/20",
              )}
            >
              {/* Soft Pulsing Recording Dot */}
              <div className="relative flex items-center justify-center shrink-0 cursor-pointer">
                <span
                  style={themeColor ? { backgroundColor: "var(--theme-color)" } : {}}
                  className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping absolute opacity-60 duration-1000"
                />
                <span
                  style={themeColor ? { backgroundColor: "var(--theme-color)" } : {}}
                  className="w-2.5 h-2.5 rounded-full bg-rose-500 relative transition-transform duration-500"
                />
              </div>

              {/* Timer Duration */}
              <span className="font-mono text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums min-w-[38px] cursor-pointer">
                {formatDuration(duration)}
              </span>

              {/* Dynamic Soundwave Bars responding to real voice */}
              <div className="flex items-center gap-[2.5px] h-7 px-1 cursor-pointer">
                {waveforms.map((height, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${Math.max(4, height * 26)}px`,
                      ...(themeColor && !isCanceling
                        ? { backgroundColor: "var(--theme-color)" }
                        : {}),
                    }}
                    className={cn(
                      "w-[2.5px] rounded-full transition-all duration-150 ease-out cursor-pointer",
                      isCanceling
                        ? "bg-rose-400/80 dark:bg-rose-500"
                        : "bg-zinc-900 dark:bg-zinc-100",
                    )}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* STATE 3: RECORDED (Play, Waveform, Duration, Close Option)      */}
          {/* ============================================================== */}
          {status === "recorded" && (
            <div
              className={cn(
                "inline-flex items-center gap-3.5 px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full cursor-pointer",
                "bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800",
                "shadow-[0_2px_14px_rgba(0,0,0,0.06)] dark:shadow-[0_2px_14px_rgba(0,0,0,0.5)]",
                "transition-all duration-500 ease-out animate-in fade-in zoom-in-95",
              )}
            >
              {/* Play / Pause Circular Button */}
              <button
                type="button"
                onClick={togglePlayback}
                style={themeColor ? { backgroundColor: "var(--theme-color)" } : {}}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 cursor-pointer",
                  "bg-[#18181b] dark:bg-white text-white dark:text-zinc-900",
                  "hover:opacity-90 active:scale-95 transition-all duration-200 shadow-sm",
                )}
                aria-label={isPlaying ? "Pause audio" : "Play audio"}
              >
                {isPlaying ? (
                  <Pause className="size-4 fill-current cursor-pointer" />
                ) : (
                  <Play className="size-4 fill-current ml-0.5 cursor-pointer" />
                )}
              </button>

              {/* Waveform with Interactive Scrubbing */}
              <div
                className="flex items-center gap-[2.5px] h-7 px-1 cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
                  setPlaybackProgress(ratio);
                  if (audioElementRef.current && audioElementRef.current.duration) {
                    audioElementRef.current.currentTime =
                      ratio * audioElementRef.current.duration;
                  }
                }}
                title="Click to seek"
              >
                {waveforms.map((height, i) => {
                  const isPlayed = i <= activeWaveformIndex;
                  return (
                    <span
                      key={i}
                      style={{
                        height: `${Math.max(4, height * 24)}px`,
                        ...(isPlayed && themeColor
                          ? { backgroundColor: "var(--theme-color)" }
                          : {}),
                      }}
                      className={cn(
                        "w-[2.5px] rounded-full transition-colors duration-150 cursor-pointer",
                        isPlayed
                          ? "bg-zinc-900 dark:bg-white"
                          : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600",
                      )}
                    />
                  );
                })}
              </div>

              {/* Real Duration display */}
              <span className="font-mono text-sm sm:text-base font-semibold text-zinc-700 dark:text-zinc-300 tabular-nums min-w-[36px] cursor-pointer">
                {isPlaying
                  ? formatDuration(Math.floor(playbackProgress * duration))
                  : formatDuration(duration)}
              </span>

              {/* Close / Discard Option: clicking resets back to Hold to record */}
              <button
                type="button"
                onClick={handleClose}
                className={cn(
                  "p-1.5 rounded-full text-zinc-400 dark:text-zinc-500",
                  "hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800",
                  "transition-colors duration-200 cursor-pointer shrink-0",
                )}
                aria-label="Discard recording"
                title="Close / Discard"
              >
                <X className="size-4 cursor-pointer" />
              </button>
            </div>
          )}
        </div>

        {/* Text placed strictly underneath the pill - slowly fades in and out without moving the pill */}
        <div className="h-6 flex items-center justify-center mt-3 cursor-pointer">
          <div
            style={{
              transform: `translateX(${slideOffset * 0.6}px)`,
            }}
            className={cn(
              "flex items-center justify-center gap-1.5 text-sm font-medium select-none cursor-pointer",
              "transition-all duration-700 ease-out",
              status === "recording"
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-1.5 pointer-events-none",
              isCanceling
                ? "text-rose-600 dark:text-rose-400 font-semibold"
                : "text-slate-500 dark:text-slate-400",
            )}
          >
            <span className="cursor-pointer">
              {isCanceling ? "Release to cancel" : slideCancelLabel}
            </span>
          </div>
        </div>
      </div>
    );
  },
);

VoiceNote.displayName = "VoiceNote";

export default VoiceNote;
