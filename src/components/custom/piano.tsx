"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import { Volume2, VolumeX, Music, RotateCw } from "lucide-react";

export interface PianoProps {
  className?: string;
  defaultVolume?: number; // 0 to 1
  defaultShowKeys?: boolean;
  defaultRotate?: boolean;
}

interface PianoKeyNote {
  note: string;
  keyTrigger: string;
  freq: number;
  isBlack?: boolean;
  whiteIndex?: number; // position relative to white key
}

const PIANO_NOTES: PianoKeyNote[] = [
  // White keys
  { note: "C4", keyTrigger: "a", freq: 261.63, isBlack: false, whiteIndex: 0 },
  { note: "D4", keyTrigger: "s", freq: 293.66, isBlack: false, whiteIndex: 1 },
  { note: "E4", keyTrigger: "d", freq: 329.63, isBlack: false, whiteIndex: 2 },
  { note: "F4", keyTrigger: "f", freq: 349.23, isBlack: false, whiteIndex: 3 },
  { note: "G4", keyTrigger: "g", freq: 392.0, isBlack: false, whiteIndex: 4 },
  { note: "A4", keyTrigger: "h", freq: 440.0, isBlack: false, whiteIndex: 5 },
  { note: "B4", keyTrigger: "j", freq: 493.88, isBlack: false, whiteIndex: 6 },
  { note: "C5", keyTrigger: "k", freq: 523.25, isBlack: false, whiteIndex: 7 },
  { note: "D5", keyTrigger: "l", freq: 587.33, isBlack: false, whiteIndex: 8 },
  { note: "E5", keyTrigger: ";", freq: 659.25, isBlack: false, whiteIndex: 9 },

  // Black keys
  { note: "C#4", keyTrigger: "w", freq: 277.18, isBlack: true, whiteIndex: 0 },
  { note: "D#4", keyTrigger: "e", freq: 311.13, isBlack: true, whiteIndex: 1 },
  { note: "F#4", keyTrigger: "t", freq: 369.99, isBlack: true, whiteIndex: 3 },
  { note: "G#4", keyTrigger: "y", freq: 415.3, isBlack: true, whiteIndex: 4 },
  { note: "A#4", keyTrigger: "u", freq: 466.16, isBlack: true, whiteIndex: 5 },
  { note: "C#5", keyTrigger: "o", freq: 554.37, isBlack: true, whiteIndex: 7 },
  { note: "D#5", keyTrigger: "p", freq: 622.25, isBlack: true, whiteIndex: 8 },
];

export function Piano({
  className,
  defaultVolume = 0.8,
  defaultShowKeys = true,
  defaultRotate = false,
}: PianoProps) {
  const [volume, setVolume] = useState(defaultVolume);
  const [showKeys, setShowKeys] = useState(defaultShowKeys);
  const [isRotated, setIsRotated] = useState(defaultRotate);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize Web Audio API Context
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioContextClass =
        window.AudioContext ||
        (window as typeof window & { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Synthesize rich acoustic grand piano sound with multi-harmonic overtones & warm lowpass filter
  const playNote = useCallback(
    (freq: number, keyTrigger: string) => {
      const ctx = getAudioContext();
      if (!ctx || volume <= 0) return;

      const now = ctx.currentTime;
      const masterVol = Math.max(0.01, Math.min(1, volume));

      // Master Gain Node for note decay envelope
      const noteGain = ctx.createGain();
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(masterVol * 0.8, now + 0.008); // Instant hammer strike
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8); // Smooth acoustic tail sustain

      // Warm Acoustic Wood Low-Pass Filter
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(1200, now + 1.2);
      filter.Q.value = 1.2;

      // Rich Harmonic Oscillators (Grand Piano Harmonics: 1x, 2x, 3x, 4x)
      const harmonics = [
        { mult: 1, gainRatio: 1.0, type: "sine" as const },
        { mult: 2, gainRatio: 0.38, type: "sine" as const },
        { mult: 3, gainRatio: 0.18, type: "triangle" as const },
        { mult: 4, gainRatio: 0.08, type: "sine" as const },
      ];

      harmonics.forEach(({ mult, gainRatio, type }) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq * mult, now);
        oscGain.gain.setValueAtTime(gainRatio, now);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(now);
        osc.stop(now + 1.8);
      });

      filter.connect(noteGain);
      noteGain.connect(ctx.destination);

      // Visual active key state trigger
      setActiveKeys((prev) => new Set(prev).add(keyTrigger));
      setTimeout(() => {
        setActiveKeys((prev) => {
          const next = new Set(prev);
          next.delete(keyTrigger);
          return next;
        });
      }, 200);
    },
    [getAudioContext, volume]
  );

  // Keyboard Event Listeners for Physical Typing Play
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat || e.target instanceof HTMLInputElement) return;
      const keyLower = e.key.toLowerCase();
      const targetNote = PIANO_NOTES.find((n) => n.keyTrigger === keyLower);
      if (targetNote) {
        playNote(targetNote.freq, targetNote.keyTrigger);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [playNote]);

  const whiteKeys = PIANO_NOTES.filter((n) => !n.isBlack);
  const blackKeys = PIANO_NOTES.filter((n) => n.isBlack);

  return (
    <article
      className={cn(
        "w-full max-w-5xl p-5 sm:p-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl flex flex-col gap-6 text-white select-none transition-all duration-300 origin-center max-sm:rotate-90 max-sm:w-[88vh] max-sm:h-[88vw] max-sm:max-w-none max-sm:my-16",
        isRotated && "sm:rotate-90 sm:w-[88vh] sm:h-[88vw] sm:max-w-none sm:my-16",
        className
      )}
    >
      {/* Top Header Controls Bar (Single Horizontal Row) */}
      <header className="flex flex-row items-center justify-between gap-2 sm:gap-4 w-full">
        {/* Title */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="size-7 sm:size-9 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center shadow-sm">
            <Music className="size-3.5 sm:size-4 text-zinc-900" />
          </div>
          <h2 className="text-sm sm:text-lg font-black tracking-widest text-primary uppercase">
            PIANO
          </h2>
        </div>

        {/* Right Controls: Volume Slider & Show Keys Toggle */}
        <div className="flex items-center gap-3 sm:gap-6 shrink-0">
          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
              title="Toggle Mute"
            >
              {volume > 0 ? (
                <Volume2 className="size-4" />
              ) : (
                <VolumeX className="size-4 text-red-400" />
              )}
            </button>
            <span className="text-[10px] sm:text-xs font-bold uppercase text-zinc-400">
              Volume
            </span>
            <div className="relative w-20 sm:w-28 h-4 flex items-center shrink-0">
              <div className="w-full h-2.5 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden relative">
                <div
                  className="h-full bg-primary"
                  style={{ width: `${volume * 100}%` }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div
                className="absolute size-4 rounded-full bg-white border border-zinc-300 ring-2 ring-black/20 pointer-events-none -translate-x-1/2 shadow-sm"
                style={{ left: `${volume * 100}%` }}
              />
            </div>
          </div>

          {/* Show Keys Toggle Switch (Height Matched to Volume Slider) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] sm:text-xs font-bold uppercase text-zinc-400">
              Show Keys
            </span>
            <div className="h-4 flex items-center">
              <button
                onClick={() => setShowKeys(!showKeys)}
                className={cn(
                  "relative inline-flex h-4 w-9 shrink-0 cursor-pointer rounded-full border border-zinc-700/80 p-0.5 transition-colors duration-200 ease-in-out focus:outline-none items-center",
                  showKeys ? "bg-primary" : "bg-zinc-800"
                )}
                role="switch"
                aria-checked={showKeys}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block size-3 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out",
                    showKeys ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Rotate Toggle — turns the keyboard sideways on narrow screens */}
          <button
            onClick={() => setIsRotated((prev) => !prev)}
            className={cn(
              "transition-colors",
              isRotated ? "text-primary" : "text-zinc-400 hover:text-zinc-200",
            )}
            title="Rotate keyboard"
            aria-pressed={isRotated}
          >
            <RotateCw className="size-4" />
          </button>
        </div>
      </header>

      {/* Piano Keyboard Chassis (Playable Keys Section) */}
      <div className="w-full flex-1 flex items-center justify-center transition-all duration-300 min-h-[180px]">
        <section
          className={cn(
            "relative w-full bg-zinc-950 p-1.5 sm:p-3 rounded-2xl border border-zinc-800 flex justify-between gap-1 shadow-inner overflow-hidden transition-all duration-300 origin-center h-[90%] sm:h-64 lg:h-72 my-0"
          )}
        >
          {/* Render 10 White Keys */}
          {whiteKeys.map((item) => {
            const isActive = activeKeys.has(item.keyTrigger);
            return (
              <button
                key={item.note}
                onClick={() => playNote(item.freq, item.keyTrigger)}
                className={cn(
                  "flex-1 h-full rounded-b-xl sm:rounded-b-2xl border border-zinc-300 shadow-md flex flex-col justify-end items-center pb-2 sm:pb-3 transition-all duration-75 relative z-0",
                  isActive
                    ? "bg-primary/25 translate-y-1 shadow-inner border-primary"
                    : "bg-gradient-to-b from-zinc-100 via-white to-zinc-100 hover:bg-zinc-100 active:translate-y-1 active:bg-primary/25"
                )}
              >
                {showKeys && (
                  <span
                    className={cn(
                      "text-xs font-mono font-bold uppercase tracking-wider transition-colors",
                      isActive ? "text-primary font-black" : "text-zinc-500"
                    )}
                  >
                    {item.keyTrigger === ";" ? ";" : item.keyTrigger.toUpperCase()}
                  </span>
                )}
              </button>
            );
          })}

          {/* Render Overlapping Black Keys */}
          {blackKeys.map((item) => {
            const isActive = activeKeys.has(item.keyTrigger);
            const leftOffsetPercent = (item.whiteIndex! + 1) * 10 - 3.5;

            return (
              <button
                key={item.note}
                onClick={(e) => {
                  e.stopPropagation();
                  playNote(item.freq, item.keyTrigger);
                }}
                style={{ left: `${leftOffsetPercent}%` }}
                className={cn(
                  "absolute top-2 sm:top-3 w-[7%] h-[60%] rounded-b-lg border-x border-b border-black shadow-xl z-10 flex flex-col justify-end items-center pb-2.5 transition-all duration-75",
                  isActive
                    ? "bg-primary border-primary text-primary-foreground translate-y-1 shadow-inner"
                    : "bg-gradient-to-b from-zinc-800 via-zinc-900 to-black hover:from-zinc-700 active:translate-y-1 active:bg-primary"
                )}
              >
                {showKeys && (
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold uppercase tracking-wider transition-colors",
                      isActive ? "text-primary-foreground" : "text-zinc-400"
                    )}
                  >
                    {item.keyTrigger.toUpperCase()}
                  </span>
                )}
              </button>
            );
          })}
        </section>
      </div>
    </article>
  );
}
