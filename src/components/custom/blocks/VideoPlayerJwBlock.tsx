"use client";

import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";

/**
 * JW Player's public documentation library.
 *
 * It is enough to evaluate the component and it is what the docs preview runs
 * on, but it belongs to JW, not to you: it can be rotated or rate-limited
 * without notice, and it carries JW's branding rather than yours. Before
 * shipping, create a player in the JW dashboard and pass your own
 * `https://cdn.jwplayer.com/libraries/<PLAYER_ID>.js` as `libraryUrl`.
 */
export const JW_DEMO_LIBRARY_URL = "https://cdn.jwplayer.com/libraries/IDzF9Zmk.js";

/**
 * JW8 has no named built-in skins — the control bar is themed by colour, and a
 * fully custom look is a CSS file referenced through `skinUrl`/`skinName`.
 * These presets are that colour config, pre-mixed.
 */
export type JwSkinPreset = "default" | "midnight" | "neon" | "sunset" | "minimal";

/** The shape of JW8's `skin` config object. */
export interface JwSkinConfig {
  name?: string;
  url?: string;
  controlbar?: {
    background?: string;
    icons?: string;
    iconsActive?: string;
    text?: string;
  };
  menus?: { background?: string; text?: string; textActive?: string };
  timeslider?: { progress?: string; rail?: string };
  tooltips?: { background?: string; text?: string };
}

const SKIN_PRESETS: Record<Exclude<JwSkinPreset, "default">, JwSkinConfig> = {
  midnight: {
    controlbar: {
      background: "rgba(9,9,11,0.85)",
      icons: "rgba(255,255,255,0.75)",
      iconsActive: "#818cf8",
      text: "#fafafa",
    },
    menus: { background: "#18181b", text: "rgba(255,255,255,0.75)", textActive: "#818cf8" },
    timeslider: { progress: "#818cf8", rail: "rgba(255,255,255,0.2)" },
    tooltips: { background: "#18181b", text: "#fafafa" },
  },
  neon: {
    controlbar: {
      background: "rgba(0,0,0,0.55)",
      icons: "rgba(236,254,255,0.8)",
      iconsActive: "#22d3ee",
      text: "#ecfeff",
    },
    menus: { background: "#083344", text: "rgba(236,254,255,0.8)", textActive: "#22d3ee" },
    timeslider: { progress: "#22d3ee", rail: "rgba(34,211,238,0.25)" },
    tooltips: { background: "#0e7490", text: "#ecfeff" },
  },
  sunset: {
    controlbar: {
      background: "rgba(28,25,23,0.8)",
      icons: "rgba(255,247,237,0.8)",
      iconsActive: "#fb923c",
      text: "#fff7ed",
    },
    menus: { background: "#1c1917", text: "rgba(255,247,237,0.8)", textActive: "#fb923c" },
    timeslider: { progress: "#fb923c", rail: "rgba(251,146,60,0.25)" },
    tooltips: { background: "#7c2d12", text: "#fff7ed" },
  },
  minimal: {
    controlbar: {
      background: "rgba(255,255,255,0)",
      icons: "rgba(255,255,255,0.85)",
      iconsActive: "#ffffff",
      text: "#ffffff",
    },
    menus: { background: "#ffffff", text: "#3f3f46", textActive: "#09090b" },
    timeslider: { progress: "#ffffff", rail: "rgba(255,255,255,0.35)" },
    tooltips: { background: "#ffffff", text: "#09090b" },
  },
};

export interface JwPlayerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** JW library script. See {@link JW_DEMO_LIBRARY_URL} before shipping. */
  libraryUrl?: string;
  /** Only for a self-hosted library build — cloud libraries embed their own. */
  licenseKey?: string;
  /** A media file (mp4) or an HLS manifest. Ignored when `playlistUrl` is set. */
  file?: string;
  /** A JW playlist or media endpoint, e.g. `https://cdn.jwplayer.com/v2/media/<id>`. */
  playlistUrl?: string;
  posterUrl?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: "16/9" | "21/9" | "4/3" | "1/1";
  /** A colour preset, or `default` for JW's own control bar. */
  skin?: JwSkinPreset;
  /** Raw JW `skin` config. Wins over `skin` when both are given. */
  skinConfig?: JwSkinConfig;
  /** External skin stylesheet plus the class name it defines. */
  skinUrl?: string;
  skinName?: string;
  autoStart?: boolean;
  muted?: boolean;
  repeat?: boolean;
  controls?: boolean;
  /** Merged last into `jwplayer().setup()` — an escape hatch for anything else. */
  playerOptions?: Record<string, unknown>;
  enableGlow?: boolean;
  /**
   * The title/subtitle laid over the frame: at the foot until the video is
   * first played, then a hover-only bar at the top. Turn it off for a bare
   * player with no copy on it.
   */
  showOverlay?: boolean;
  onReady?: () => void;
}

const aspectRatios = {
  "16/9": "aspect-video",
  "21/9": "aspect-[21/9]",
  "4/3": "aspect-[4/3]",
  "1/1": "aspect-square",
};

/** JW's `aspectratio` uses `w:h`, not the CSS `w/h` this component takes. */
const jwRatios: Record<string, string> = {
  "16/9": "16:9",
  "21/9": "21:9",
  "4/3": "4:3",
  "1/1": "1:1",
};

type JwPlayer = {
  setup: (options: Record<string, unknown>) => JwPlayer;
  on: (event: string, handler: (e?: unknown) => void) => JwPlayer;
  remove: () => void;
};

type JwGlobal = ((target: string) => JwPlayer) & { key?: string };

/**
 * One in-flight load per library URL.
 *
 * Every player on a page shares the same `window.jwplayer`, so without this a
 * grid of four would append four copies of a ~400KB script and race each other
 * to define the global.
 */
const libraryLoads = new Map<string, Promise<JwGlobal>>();

function loadJwLibrary(url: string): Promise<JwGlobal> {
  const cached = libraryLoads.get(url);
  if (cached) return cached;

  const pending = new Promise<JwGlobal>((resolve, reject) => {
    const existing = (window as unknown as { jwplayer?: JwGlobal }).jwplayer;
    if (existing) {
      resolve(existing);
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      const jw = (window as unknown as { jwplayer?: JwGlobal }).jwplayer;
      if (jw) resolve(jw);
      else reject(new Error("JW library loaded but window.jwplayer is undefined"));
    };
    script.onerror = () => reject(new Error(`Failed to load JW library: ${url}`));
    document.head.appendChild(script);
  });

  // A failed load must not be cached, or a transient network error would leave
  // every later mount resolving the same rejection for the life of the page.
  pending.catch(() => libraryLoads.delete(url));
  libraryLoads.set(url, pending);
  return pending;
}

function resolveSkin(
  skin: JwSkinPreset,
  skinConfig?: JwSkinConfig,
  skinUrl?: string,
  skinName?: string,
): JwSkinConfig | undefined {
  const base =
    skinConfig ?? (skin === "default" ? undefined : SKIN_PRESETS[skin]);
  if (!skinUrl && !skinName) return base;
  return { ...(base ?? {}), ...(skinUrl ? { url: skinUrl } : {}), ...(skinName ? { name: skinName } : {}) };
}

/**
 * Title and subtitle laid over the frame, following the convention YouTube set.
 *
 * Before anything has played the copy sits at the FOOT of the frame and stays
 * there: nothing is happening yet, so it is free to introduce the video, and a
 * viewer should not have to hover to find out what they are about to watch.
 * Its bottom padding keeps it clear of JW's control bar, so the gradient
 * reaches the bottom edge but the text stops above the scrubber.
 *
 * Once playback has started that is no longer true — the picture is the point,
 * and a permanent caption is in the way. So the copy moves to the TOP of the
 * frame and only appears on hover, where it overlaps nothing that matters.
 *
 * `pointer-events-none` keeps every click going through to JW in both
 * positions.
 */
function MediaOverlay({
  title,
  subtitle,
  hasPlayed,
}: {
  title?: string;
  subtitle?: string;
  /** Whether the viewer has started watching. Drives the whole treatment. */
  hasPlayed?: boolean;
}) {
  if (!title && !subtitle) return null;

  const copy = (
    <>
      {title && (
        <h3 className="line-clamp-1 text-base font-semibold tracking-tight text-white drop-shadow-sm sm:text-xl md:text-2xl">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="mt-0.5 line-clamp-1 text-[11px] text-zinc-300 sm:text-xs md:text-sm">
          {subtitle}
        </p>
      )}
    </>
  );

  if (hasPlayed) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/85 via-black/40 to-transparent px-4 pt-4 pb-16 opacity-0 transition-opacity duration-300 group-hover/frame:opacity-100 group-focus-within/frame:opacity-100 sm:px-6 sm:pt-5 sm:pb-20">
        {copy}
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pt-16 pb-14 transition-opacity duration-300 sm:px-6 sm:pt-24 sm:pb-16">
      {copy}
    </div>
  );
}

export const JwPlayer = React.forwardRef<HTMLDivElement, JwPlayerProps>(
  (
    {
      libraryUrl = JW_DEMO_LIBRARY_URL,
      licenseKey,
      file,
      playlistUrl = "https://cdn.jwplayer.com/v2/media/hWF9vG66",
      posterUrl = "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1920,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
      title = "Enterprise-grade video delivery",
      subtitle = "Adaptive streaming, analytics and DRM behind one control bar.",
      aspectRatio = "16/9",
      skin = "default",
      skinConfig,
      skinUrl,
      skinName,
      autoStart = false,
      muted = false,
      repeat = false,
      controls = true,
      playerOptions,
      enableGlow = true,
      showOverlay = true,
      onReady,
      className,
      ...props
    },
    ref,
  ) => {
    // React's useId contains colons, which are legal in an id attribute but not
    // in the CSS selectors JW resolves the target with.
    const reactId = useId();
    const containerId = `jw-player-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;

    const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
    // Latches on the first play and never goes back: the title treatment keys
    // off "has this viewer started watching", not the current paused state, so
    // pausing must not bring the bottom caption back over the picture.
    const [hasPlayed, setHasPlayed] = useState(false);
    const onReadyRef = useRef(onReady);
    useEffect(() => {
      onReadyRef.current = onReady;
    });

    // `skinConfig` and `playerOptions` are object literals, so they are new
    // references on every parent render. The effect keys off their serialized
    // values and reads the live objects through refs — depending on the objects
    // themselves would rebuild the player on every render, restarting playback.
    const resolvedSkin = resolveSkin(skin, skinConfig, skinUrl, skinName);
    const skinKey = JSON.stringify(resolvedSkin ?? null);
    const optionsKey = playerOptions ? JSON.stringify(playerOptions) : "";
    const setupRef = useRef({ skin: resolvedSkin, options: playerOptions });
    useEffect(() => {
      setupRef.current = { skin: resolvedSkin, options: playerOptions };
    });

    useEffect(() => {
      let cancelled = false;
      let player: JwPlayer | null = null;
      // Marks the start of loading the third-party player script; there is nothing to derive this from during render.
      setStatus("loading");
      setHasPlayed(false);

      void loadJwLibrary(libraryUrl)
        .then((jwplayer) => {
          if (cancelled) return;
          if (licenseKey) jwplayer.key = licenseKey;

          const { skin: activeSkin, options } = setupRef.current;

          player = jwplayer(containerId);
          player.setup({
            ...(playlistUrl ? { playlist: playlistUrl } : { file }),
            image: posterUrl,
            width: "100%",
            aspectratio: jwRatios[aspectRatio],
            autostart: autoStart,
            mute: muted || autoStart,
            repeat,
            controls,
            ...(activeSkin ? { skin: activeSkin } : {}),
            ...(options ?? {}),
          });

          player.on("ready", () => {
            if (cancelled) return;
            setStatus("ready");
            onReadyRef.current?.();
          });
          player.on("play", () => {
            if (!cancelled) setHasPlayed(true);
          });
          // A setup error (bad licence, unplayable media) is reported through
          // the player rather than the promise, so it needs its own handler —
          // otherwise the spinner spins forever on a page that will never play.
          player.on("setupError", () => {
            if (!cancelled) setStatus("error");
          });
        })
        .catch(() => {
          if (!cancelled) setStatus("error");
        });

      return () => {
        cancelled = true;
        try {
          player?.remove();
        } catch {
          /* already gone */
        }
      };
    }, [
      libraryUrl,
      licenseKey,
      file,
      playlistUrl,
      posterUrl,
      aspectRatio,
      autoStart,
      muted,
      repeat,
      controls,
      containerId,
      skinKey,
      optionsKey,
    ]);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        {enableGlow && (
          <div className="pointer-events-none absolute -inset-4 z-0 rounded-3xl bg-gradient-to-tr from-primary/20 via-primary/15 to-primary/5 opacity-80 blur-3xl transition-opacity duration-500 dark:opacity-50" />
        )}

        <div className="relative z-10 flex w-full flex-col overflow-hidden rounded-xl border border-border/80 bg-zinc-900 shadow-2xl sm:rounded-2xl md:rounded-3xl">
          <div
            className={cn(
              "group/frame relative w-full overflow-hidden bg-black",
              aspectRatios[aspectRatio],
            )}
          >
            {/* JW replaces this node wholesale on setup. It is kept mounted in
                every state so a re-render never pulls the target out from under
                a player that is mid-initialisation. */}
            <div
              id={containerId}
              className={cn("h-full w-full", status !== "ready" && "invisible")}
            />

            {status === "loading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
                <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white/80" />
              </div>
            )}

            {/* The library is licensed and remote, so it can be absent in a way
                Plyr and <video> never are. Falling back to the browser's own
                player keeps the media watchable instead of leaving a black box. */}
            {status === "error" && (
              <div className="absolute inset-0 flex flex-col bg-zinc-950">
                {file ? (
                  <video
                    className="h-full w-full flex-1 bg-black object-contain"
                    poster={posterUrl}
                    controls
                    playsInline
                    preload="metadata"
                    src={file}
                  />
                ) : (
                  // A JW playlist is only resolvable by JW, so with the library
                  // gone there is no media to hand a <video>. The poster is all
                  // that is left, and it beats a black rectangle.
                  <img
                    src={posterUrl}
                    alt=""
                    className="h-full w-full flex-1 object-cover opacity-60"
                  />
                )}
                <p className="flex items-center gap-2 bg-amber-500/10 px-3 py-2 text-[11px] text-amber-300">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                  {file
                    ? "JW Player library unavailable — falling back to the native player."
                    : "JW Player library unavailable, and a JW playlist cannot be played without it. Set `file` for a native fallback."}
                </p>
              </div>
            )}

            {status === "ready" && showOverlay && (
              <MediaOverlay
                title={title}
                subtitle={subtitle}
                hasPlayed={hasPlayed}
              />
            )}
          </div>

        </div>
      </div>
    );
  },
);

JwPlayer.displayName = "JwPlayer";
