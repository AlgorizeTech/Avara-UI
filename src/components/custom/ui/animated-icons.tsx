"use client";

/**
 * Animated icons: the Lucide glyph set, each with a short hand-tuned motion that
 * plays when the control around it is hovered or focused (or when it first
 * appears, for state-change icons such as a check).
 *
 * Dependency-free on purpose. Motion runs on the Web Animations API, so the icons
 * work in any component whatever animation library it uses (GSAP or Motion),
 * add no npm package, and stand still under `prefers-reduced-motion`.
 *
 * Use them exactly like Lucide icons:
 *   <ChevronDownIcon className="size-4" />
 * They animate with the closest button, link, tab, menu item or label, or on
 * their own hover when there is none. Pass `animated={false}` to keep one still,
 * `animateOnMount` to play it once as it appears.
 *
 * To add an icon, copy its node list from lucide-react (`__iconData.node`) into a
 * `defineIcon(...)` call with the preset that suits it (see DESIGN.md, Icons).
 */
import {
  createElement,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ComponentType,
  type SVGProps,
} from "react";
import { prefersReducedMotion } from "@/lib/animate";
import { cn } from "@/lib/utils";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "ref"> & {
  size?: number | string;
  strokeWidth?: number | string;
  /** Play the motion on hover or focus. Default true. */
  animated?: boolean;
  /** Also play it once when the icon mounts, for icons that mark a state change. */
  animateOnMount?: boolean;
};

/** Anything that renders like an icon: these, or a Lucide icon. */
export type IconComponent = ComponentType<IconProps>;

type IconNode = [tag: string, attrs: Record<string, string>][];

const SOFT = "cubic-bezier(0.22, 1, 0.36, 1)";

const move = (x: string, y = "0") => `translate(${x}, ${y})`;

type Preset = {
  frames: Keyframe[];
  duration: number;
  /** Draw each shape in with a stroke instead of moving the whole icon. */
  draw?: boolean;
};

const PRESETS = {
  nudgeRight: { duration: 650, frames: [{ transform: move("0") }, { transform: move("18%") }, { transform: move("0") }] },
  nudgeLeft: { duration: 650, frames: [{ transform: move("0") }, { transform: move("-18%") }, { transform: move("0") }] },
  nudgeUp: { duration: 650, frames: [{ transform: move("0") }, { transform: move("0", "-18%") }, { transform: move("0") }] },
  nudgeDown: { duration: 650, frames: [{ transform: move("0") }, { transform: move("0", "18%") }, { transform: move("0") }] },
  float: { duration: 700, frames: [{ transform: move("0") }, { transform: move("14%", "-14%") }, { transform: move("0") }] },
  spin: { duration: 800, frames: [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }] },
  spinBack: { duration: 800, frames: [{ transform: "rotate(0deg)" }, { transform: "rotate(-360deg)" }] },
  spinSlow: { duration: 1200, frames: [{ transform: "rotate(0deg)" }, { transform: "rotate(180deg)" }] },
  wiggle: {
    duration: 750,
    frames: [0, -14, 12, -8, 4, 0].map((deg) => ({ transform: `rotate(${deg}deg)` })),
  },
  shake: {
    duration: 520,
    frames: [0, -9, 9, -6, 6, 0].map((x) => ({ transform: move(`${x}%`) })),
  },
  pop: {
    duration: 600,
    frames: [{ transform: "scale(1)" }, { transform: "scale(0.8)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
  },
  pulse: { duration: 650, frames: [{ transform: "scale(1)" }, { transform: "scale(1.14)" }, { transform: "scale(1)" }] },
  pulseBeat: {
    duration: 700,
    frames: [{ transform: "scale(1)" }, { transform: "scale(1.2)" }, { transform: "scale(0.96)" }, { transform: "scale(1)" }],
  },
  bounce: {
    duration: 750,
    frames: [0, -20, 0, -8, 0].map((y) => ({ transform: move("0", `${y}%`) })),
  },
  tilt: {
    duration: 650,
    frames: [{ transform: "rotate(0deg)" }, { transform: "rotate(-14deg)" }, { transform: "rotate(8deg)" }, { transform: "rotate(0deg)" }],
  },
  tiltUp: {
    duration: 650,
    frames: [
      { transform: "rotate(0deg) translateY(0)" },
      { transform: "rotate(-14deg) translateY(-10%)" },
      { transform: "rotate(6deg) translateY(0)" },
      { transform: "rotate(0deg) translateY(0)" },
    ],
  },
  tiltDown: {
    duration: 650,
    frames: [
      { transform: "rotate(0deg) translateY(0)" },
      { transform: "rotate(12deg) translateY(10%)" },
      { transform: "rotate(-6deg) translateY(0)" },
      { transform: "rotate(0deg) translateY(0)" },
    ],
  },
  flash: {
    duration: 600,
    frames: [
      { transform: "scale(1)", opacity: 1 },
      { transform: "scale(1.16)", opacity: 0.55 },
      { transform: "scale(1)", opacity: 1 },
    ],
  },
  draw: {
    duration: 650,
    draw: true,
    frames: [
      { strokeDasharray: "1 1", strokeDashoffset: "1", opacity: 0 },
      { strokeDasharray: "1 1", strokeDashoffset: "1", opacity: 1, offset: 0.02 },
      { strokeDasharray: "1 1", strokeDashoffset: "0", opacity: 1 },
    ],
  },
  none: { duration: 0, frames: [] },
} satisfies Record<string, Preset>;

export type IconPreset = keyof typeof PRESETS;

/** What an icon animates with: the control around it, else the icon itself. */
const HOST =
  'button, a, label, summary, [role="button"], [role="tab"], [role="menuitem"], [role="option"], [data-icon-host]';

const play = (svg: SVGSVGElement, preset: Preset) => {
  if (!preset.frames.length || prefersReducedMotion() || typeof svg.animate !== "function") return;
  if (svg.getAnimations({ subtree: true }).some((a) => a.playState === "running")) return;
  if (preset.draw) {
    Array.from(svg.children).forEach((shape, i) =>
      shape.animate(preset.frames, { duration: preset.duration, delay: i * 90, easing: SOFT, fill: "backwards" }),
    );
    return;
  }
  svg.animate(preset.frames, { duration: preset.duration, easing: SOFT });
};

function defineIcon(name: string, presetName: IconPreset, nodes: IconNode): IconComponent {
  const preset: Preset = PRESETS[presetName];

  const Icon = forwardRef<SVGSVGElement, IconProps>(function AnimatedIcon(
    {
      size = 24,
      strokeWidth = 2,
      color = "currentColor",
      className,
      animated = true,
      animateOnMount = false,
      style,
      children,
      ...rest
    },
    forwardedRef,
  ) {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const setRef = useCallback(
      (node: SVGSVGElement | null) => {
        svgRef.current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) forwardedRef.current = node;
      },
      [forwardedRef],
    );

    useEffect(() => {
      const svg = svgRef.current;
      if (!svg || !animated || !preset.frames.length) return;
      const host = svg.closest<HTMLElement>(HOST) ?? svg;
      const run = () => play(svg, preset);
      const onFocus = () => {
        if (host.matches(":focus-visible")) run();
      };
      host.addEventListener("pointerenter", run);
      host.addEventListener("focusin", onFocus);
      const frame = animateOnMount ? requestAnimationFrame(run) : 0;
      return () => {
        host.removeEventListener("pointerenter", run);
        host.removeEventListener("focusin", onFocus);
        if (frame) cancelAnimationFrame(frame);
      };
    }, [animated, animateOnMount]);

    const labelled = rest["aria-label"] !== undefined || rest["aria-labelledby"] !== undefined;

    return (
      <svg
        ref={setRef}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden={labelled ? undefined : true}
        data-icon={name}
        className={cn("lucide", className)}
        style={{ transformOrigin: "50% 50%", ...style }}
        {...rest}
      >
        {nodes.map(([tag, attrs], i) =>
          createElement(tag, { key: i, ...attrs, ...(preset.draw ? { pathLength: 1 } : null) }),
        )}
        {children}
      </svg>
    );
  });
  Icon.displayName = `${name}Icon`;
  return Icon;
}

export const ActivityIcon = defineIcon("Activity", "pulseBeat", [
  ["path", {"d":"M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"}],
]);

export const ArrowDownIcon = defineIcon("ArrowDown", "nudgeDown", [
  ["path", {"d":"M12 5v14"}],
  ["path", {"d":"m19 12-7 7-7-7"}],
]);

export const ArrowRightIcon = defineIcon("ArrowRight", "nudgeRight", [
  ["path", {"d":"M5 12h14"}],
  ["path", {"d":"m12 5 7 7-7 7"}],
]);

export const ArrowUpIcon = defineIcon("ArrowUp", "nudgeUp", [
  ["path", {"d":"m5 12 7-7 7 7"}],
  ["path", {"d":"M12 19V5"}],
]);

export const ArrowUpRightIcon = defineIcon("ArrowUpRight", "float", [
  ["path", {"d":"M7 7h10v10"}],
  ["path", {"d":"M7 17 17 7"}],
]);

export const AtomIcon = defineIcon("Atom", "spinSlow", [
  ["circle", {"cx":"12","cy":"12","r":"1"}],
  ["path", {"d":"M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"}],
  ["path", {"d":"M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"}],
]);

export const AudioLinesIcon = defineIcon("AudioLines", "pulse", [
  ["path", {"d":"M2 10v3"}],
  ["path", {"d":"M6 6v11"}],
  ["path", {"d":"M10 3v18"}],
  ["path", {"d":"M14 8v7"}],
  ["path", {"d":"M18 5v13"}],
  ["path", {"d":"M22 10v3"}],
]);

export const BotIcon = defineIcon("Bot", "bounce", [
  ["path", {"d":"M12 8V4H8"}],
  ["rect", {"width":"16","height":"12","x":"4","y":"8","rx":"2"}],
  ["path", {"d":"M2 14h2"}],
  ["path", {"d":"M20 14h2"}],
  ["path", {"d":"M15 13v2"}],
  ["path", {"d":"M9 13v2"}],
]);

export const BoxIcon = defineIcon("Box", "pulse", [
  ["path", {"d":"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"}],
  ["path", {"d":"m3.3 7 8.7 5 8.7-5"}],
  ["path", {"d":"M12 22V12"}],
]);

export const CalendarIcon = defineIcon("Calendar", "pop", [
  ["path", {"d":"M8 2v3"}],
  ["path", {"d":"M16 2v3"}],
  ["rect", {"x":"3","y":"3","width":"18","height":"18","rx":"2"}],
  ["path", {"d":"M3 9h18"}],
]);

export const Calendar1Icon = defineIcon("Calendar1", "pop", [
  ["path", {"d":"M11 13h1v4"}],
  ["path", {"d":"M16 2v3"}],
  ["path", {"d":"M3 9h18"}],
  ["path", {"d":"M8 2v3"}],
  ["rect", {"x":"3","y":"3","width":"18","height":"18","rx":"2"}],
]);

export const ChartLineIcon = defineIcon("ChartLine", "pulse", [
  ["path", {"d":"M3 3v16a2 2 0 0 0 2 2h16"}],
  ["path", {"d":"m19 9-5 5-4-4-3 3"}],
]);

export const CheckIcon = defineIcon("Check", "draw", [
  ["path", {"d":"M20 6 9 17l-5-5"}],
]);

export const CheckCircle2Icon = defineIcon("CheckCircle2", "draw", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"m16 9-5.5 5.5L8 12"}],
]);

export const CheckSquareIcon = defineIcon("CheckSquare", "pop", [
  ["path", {"d":"M21 10.656V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12.344"}],
  ["path", {"d":"m9 11 3 3L22 4"}],
]);

export const ChevronDownIcon = defineIcon("ChevronDown", "nudgeDown", [
  ["path", {"d":"m6 9 6 6 6-6"}],
]);

export const ChevronLeftIcon = defineIcon("ChevronLeft", "nudgeLeft", [
  ["path", {"d":"m15 18-6-6 6-6"}],
]);

export const ChevronRightIcon = defineIcon("ChevronRight", "nudgeRight", [
  ["path", {"d":"m9 18 6-6-6-6"}],
]);

export const ChevronsUpDownIcon = defineIcon("ChevronsUpDown", "nudgeDown", [
  ["path", {"d":"m7 15 5 5 5-5"}],
  ["path", {"d":"m7 9 5-5 5 5"}],
]);

export const CircleAlertIcon = defineIcon("CircleAlert", "shake", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["line", {}],
  ["line", {}],
]);

export const CircleCheckIcon = defineIcon("CircleCheck", "draw", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"m16 9-5.5 5.5L8 12"}],
]);

export const CircleHelpIcon = defineIcon("CircleHelp", "shake", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],
  ["path", {"d":"M12 17h.01"}],
]);

export const ClockIcon = defineIcon("Clock", "pulse", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"M12 6v6l4 2"}],
]);

export const CodeIcon = defineIcon("Code", "pulse", [
  ["path", {"d":"m16 18 6-6-6-6"}],
  ["path", {"d":"m8 6-6 6 6 6"}],
]);

export const CompassIcon = defineIcon("Compass", "float", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"}],
]);

export const CopyIcon = defineIcon("Copy", "pop", [
  ["rect", {"width":"14","height":"14","x":"8","y":"8","rx":"2","ry":"2"}],
  ["path", {"d":"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"}],
]);

export const CpuIcon = defineIcon("Cpu", "pulse", [
  ["path", {"d":"M12 20v2"}],
  ["path", {"d":"M12 2v2"}],
  ["path", {"d":"M17 20v2"}],
  ["path", {"d":"M17 2v2"}],
  ["path", {"d":"M2 12h2"}],
  ["path", {"d":"M2 17h2"}],
  ["path", {"d":"M2 7h2"}],
  ["path", {"d":"M20 12h2"}],
  ["path", {"d":"M20 17h2"}],
  ["path", {"d":"M20 7h2"}],
  ["path", {"d":"M7 20v2"}],
  ["path", {"d":"M7 2v2"}],
  ["rect", {"x":"4","y":"4","width":"16","height":"16","rx":"2"}],
  ["rect", {"x":"8","y":"8","width":"8","height":"8","rx":"1"}],
]);

export const CreditCardIcon = defineIcon("CreditCard", "pulse", [
  ["rect", {"width":"20","height":"14","x":"2","y":"5","rx":"2"}],
  ["line", {}],
  ["path", {"d":"M6 14h2"}],
]);

export const CrownIcon = defineIcon("Crown", "pop", [
  ["path", {"d":"M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"}],
  ["path", {"d":"M5 21h14"}],
]);

export const DownloadIcon = defineIcon("Download", "nudgeDown", [
  ["path", {"d":"M12 15V3"}],
  ["path", {"d":"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],
  ["path", {"d":"m7 10 5 5 5-5"}],
]);

export const Edit2Icon = defineIcon("Edit2", "tilt", [
  ["path", {"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],
]);

export const EllipsisIcon = defineIcon("Ellipsis", "bounce", [
  ["circle", {"cx":"12","cy":"12","r":"1"}],
  ["circle", {"cx":"19","cy":"12","r":"1"}],
  ["circle", {"cx":"5","cy":"12","r":"1"}],
]);

export const FileTextIcon = defineIcon("FileText", "pulse", [
  ["path", {"d":"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"}],
  ["path", {"d":"M14 2v5a1 1 0 0 0 1 1h5"}],
  ["path", {"d":"M10 9H8"}],
  ["path", {"d":"M16 13H8"}],
  ["path", {"d":"M16 17H8"}],
]);

export const FolderIcon = defineIcon("Folder", "pulse", [
  ["path", {"d":"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"}],
]);

export const GaugeIcon = defineIcon("Gauge", "pulse", [
  ["path", {"d":"m12 14 4-4"}],
  ["path", {"d":"M3.34 19a10 10 0 1 1 17.32 0"}],
]);

export const GitBranchIcon = defineIcon("GitBranch", "pulse", [
  ["path", {"d":"M15 6a9 9 0 0 0-9 9V3"}],
  ["circle", {"cx":"18","cy":"6","r":"3"}],
  ["circle", {"cx":"6","cy":"18","r":"3"}],
]);

export const GlobeIcon = defineIcon("Globe", "spinSlow", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"}],
  ["path", {"d":"M2 12h20"}],
]);

export const HashIcon = defineIcon("Hash", "pop", [
  ["line", {}],
  ["line", {}],
  ["line", {}],
  ["line", {}],
]);

export const HelpCircleIcon = defineIcon("HelpCircle", "shake", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"M9 9.5a3 2.5 0 016 0c0 2-2 2-3 3.5"}],
  ["path", {"d":"M12 17h.01"}],
]);

export const HomeIcon = defineIcon("Home", "pulse", [
  ["path", {"d":"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"}],
  ["path", {"d":"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"}],
]);

export const ImageIcon = defineIcon("Image", "pop", [
  ["rect", {"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],
  ["circle", {"cx":"9","cy":"9","r":"2"}],
  ["path", {"d":"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"}],
]);

export const InfoIcon = defineIcon("Info", "shake", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"M12 16v-4"}],
  ["path", {"d":"M12 8h.01"}],
]);

export const KeyboardIcon = defineIcon("Keyboard", "pulse", [
  ["path", {"d":"M10 8h.01"}],
  ["path", {"d":"M12 12h.01"}],
  ["path", {"d":"M14 8h.01"}],
  ["path", {"d":"M16 12h.01"}],
  ["path", {"d":"M18 8h.01"}],
  ["path", {"d":"M6 8h.01"}],
  ["path", {"d":"M7 16h10"}],
  ["path", {"d":"M8 12h.01"}],
  ["rect", {"width":"20","height":"16","x":"2","y":"4","rx":"2"}],
]);

export const LanguagesIcon = defineIcon("Languages", "pulse", [
  ["path", {"d":"m5 8 6 6"}],
  ["path", {"d":"m4 14 6-6 2-3"}],
  ["path", {"d":"M2 5h12"}],
  ["path", {"d":"M7 2h1"}],
  ["path", {"d":"m22 22-5-10-5 10"}],
  ["path", {"d":"M14 18h6"}],
]);

export const LibraryIcon = defineIcon("Library", "pulse", [
  ["path", {"d":"m16 6 4 14"}],
  ["path", {"d":"M12 6v14"}],
  ["path", {"d":"M8 8v12"}],
  ["path", {"d":"M4 4v16"}],
]);

export const LightbulbIcon = defineIcon("Lightbulb", "pop", [
  ["path", {"d":"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"}],
  ["path", {"d":"M9 18h6"}],
  ["path", {"d":"M10 22h4"}],
]);

export const Link2Icon = defineIcon("Link2", "pulse", [
  ["path", {"d":"M9 17H7A5 5 0 0 1 7 7h2"}],
  ["path", {"d":"M15 7h2a5 5 0 1 1 0 10h-2"}],
  ["line", {}],
]);

export const Loader2Icon = defineIcon("Loader2", "none", [
  ["path", {"d":"M21 12a9 9 0 1 1-6.219-8.56"}],
]);

export const LoaderCircleIcon = defineIcon("LoaderCircle", "none", [
  ["path", {"d":"M21 12a9 9 0 1 1-6.219-8.56"}],
]);

export const LockIcon = defineIcon("Lock", "shake", [
  ["rect", {"width":"18","height":"11","x":"3","y":"11","rx":"2","ry":"2"}],
  ["path", {"d":"M7 11V7a5 5 0 0 1 10 0v4"}],
]);

export const LogOutIcon = defineIcon("LogOut", "wiggle", [
  ["path", {"d":"m16 17 5-5-5-5"}],
  ["path", {"d":"M21 12H9"}],
  ["path", {"d":"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"}],
]);

export const MailIcon = defineIcon("Mail", "pulse", [
  ["path", {"d":"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"}],
  ["rect", {"x":"2","y":"4","width":"20","height":"16","rx":"2"}],
]);

export const MenuIcon = defineIcon("Menu", "pop", [
  ["path", {"d":"M4 5h16"}],
  ["path", {"d":"M4 12h16"}],
  ["path", {"d":"M4 19h16"}],
]);

export const MessageCircleIcon = defineIcon("MessageCircle", "pulse", [
  ["path", {"d":"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"}],
]);

export const MessageSquareIcon = defineIcon("MessageSquare", "pulse", [
  ["path", {"d":"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"}],
]);

export const MicIcon = defineIcon("Mic", "pulse", [
  ["path", {"d":"M12 19v3"}],
  ["path", {"d":"M19 10v2a7 7 0 0 1-14 0v-2"}],
  ["rect", {"x":"9","y":"2","width":"6","height":"13","rx":"3"}],
]);

export const MinusIcon = defineIcon("Minus", "pop", [
  ["path", {"d":"M5 12h14"}],
]);

export const MoreHorizontalIcon = defineIcon("MoreHorizontal", "bounce", [
  ["circle", {"cx":"12","cy":"12","r":"1"}],
  ["circle", {"cx":"19","cy":"12","r":"1"}],
  ["circle", {"cx":"5","cy":"12","r":"1"}],
]);

export const MoreVerticalIcon = defineIcon("MoreVertical", "bounce", [
  ["circle", {"cx":"12","cy":"12","r":"1"}],
  ["circle", {"cx":"12","cy":"5","r":"1"}],
  ["circle", {"cx":"12","cy":"19","r":"1"}],
]);

export const MusicIcon = defineIcon("Music", "bounce", [
  ["path", {"d":"M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"}],
  ["circle", {"cx":"18","cy":"16","r":"3"}],
  ["circle", {"cx":"6","cy":"19","r":"3"}],
]);

export const PaletteIcon = defineIcon("Palette", "pulse", [
  ["path", {"d":"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"}],
  ["circle", {"cx":"13.5","cy":"6.5","r":".5","fill":"currentColor"}],
  ["circle", {"cx":"17.5","cy":"10.5","r":".5","fill":"currentColor"}],
  ["circle", {"cx":"6.5","cy":"12.5","r":".5","fill":"currentColor"}],
  ["circle", {"cx":"8.5","cy":"7.5","r":".5","fill":"currentColor"}],
]);

export const PanelLeftCloseIcon = defineIcon("PanelLeftClose", "nudgeLeft", [
  ["rect", {"width":"18","height":"18","x":"3","y":"3","rx":"2"}],
  ["path", {"d":"M9 3v18"}],
  ["path", {"d":"m16 15-3-3 3-3"}],
]);

export const PanelLeftOpenIcon = defineIcon("PanelLeftOpen", "pulse", [
  ["rect", {"width":"18","height":"18","x":"3","y":"3","rx":"2"}],
  ["path", {"d":"M9 3v18"}],
  ["path", {"d":"m14 9 3 3-3 3"}],
]);

export const PaperclipIcon = defineIcon("Paperclip", "pulse", [
  ["path", {"d":"m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"}],
]);

export const PauseIcon = defineIcon("Pause", "pulse", [
  ["rect", {"x":"14","y":"3","width":"5","height":"18","rx":"1"}],
  ["rect", {"x":"5","y":"3","width":"5","height":"18","rx":"1"}],
]);

export const PencilIcon = defineIcon("Pencil", "tilt", [
  ["path", {"d":"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"}],
  ["path", {"d":"m15 5 4 4"}],
]);

export const PlayIcon = defineIcon("Play", "nudgeRight", [
  ["path", {"d":"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"}],
]);

export const PlusIcon = defineIcon("Plus", "pop", [
  ["path", {"d":"M5 12h14"}],
  ["path", {"d":"M12 5v14"}],
]);

export const RefreshCwIcon = defineIcon("RefreshCw", "spin", [
  ["path", {"d":"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"}],
  ["path", {"d":"M21 3v5h-5"}],
  ["path", {"d":"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"}],
  ["path", {"d":"M8 16H3v5"}],
]);

export const RocketIcon = defineIcon("Rocket", "float", [
  ["path", {"d":"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"}],
  ["path", {"d":"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09"}],
  ["path", {"d":"M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z"}],
  ["path", {"d":"M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05"}],
]);

export const RotateCcwIcon = defineIcon("RotateCcw", "spinBack", [
  ["path", {"d":"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"}],
  ["path", {"d":"M3 3v5h5"}],
]);

export const RotateCwIcon = defineIcon("RotateCw", "spin", [
  ["path", {"d":"M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"}],
  ["path", {"d":"M21 3v5h-5"}],
]);

export const ScaleIcon = defineIcon("Scale", "pulse", [
  ["path", {"d":"M12 3v18"}],
  ["path", {"d":"m19 8 3 8a5 5 0 0 1-6 0zV7"}],
  ["path", {"d":"M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1"}],
  ["path", {"d":"m5 8 3 8a5 5 0 0 1-6 0zV7"}],
  ["path", {"d":"M7 21h10"}],
]);

export const SendIcon = defineIcon("Send", "float", [
  ["path", {"d":"M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"}],
  ["path", {"d":"m21.854 2.147-10.94 10.939"}],
]);

export const SettingsIcon = defineIcon("Settings", "spinSlow", [
  ["path", {"d":"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],
  ["circle", {"cx":"12","cy":"12","r":"3"}],
]);

export const Share2Icon = defineIcon("Share2", "float", [
  ["circle", {"cx":"18","cy":"5","r":"3"}],
  ["circle", {"cx":"6","cy":"12","r":"3"}],
  ["circle", {"cx":"18","cy":"19","r":"3"}],
  ["line", {}],
  ["line", {}],
]);

export const ShieldIcon = defineIcon("Shield", "pulse", [
  ["path", {"d":"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"}],
]);

export const SlashIcon = defineIcon("Slash", "tiltDown", [
  ["path", {"d":"M22 2 2 22"}],
]);

export const SmartphoneIcon = defineIcon("Smartphone", "pulse", [
  ["rect", {"width":"14","height":"20","x":"5","y":"2","rx":"2","ry":"2"}],
  ["path", {"d":"M12 18h.01"}],
]);

export const SparklesIcon = defineIcon("Sparkles", "pop", [
  ["path", {"d":"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"}],
  ["path", {"d":"M20 2v4"}],
  ["path", {"d":"M22 4h-4"}],
  ["circle", {"cx":"4","cy":"20","r":"2"}],
]);

export const SproutIcon = defineIcon("Sprout", "pop", [
  ["path", {"d":"M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"}],
  ["path", {"d":"M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"}],
  ["path", {"d":"M5 21h14"}],
]);

export const SquareIcon = defineIcon("Square", "pulse", [
  ["rect", {"width":"18","height":"18","x":"3","y":"3","rx":"2"}],
]);

export const TerminalSquareIcon = defineIcon("TerminalSquare", "pulse", [
  ["path", {"d":"m7 11 2-2-2-2"}],
  ["path", {"d":"M11 13h4"}],
  ["rect", {"width":"18","height":"18","x":"3","y":"3","rx":"2","ry":"2"}],
]);

export const ThumbsDownIcon = defineIcon("ThumbsDown", "tiltDown", [
  ["path", {"d":"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"}],
  ["path", {"d":"M17 14V2"}],
]);

export const ThumbsUpIcon = defineIcon("ThumbsUp", "tiltUp", [
  ["path", {"d":"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"}],
  ["path", {"d":"M7 10v12"}],
]);

export const Trash2Icon = defineIcon("Trash2", "wiggle", [
  ["path", {"d":"M10 11v6"}],
  ["path", {"d":"M14 11v6"}],
  ["path", {"d":"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"}],
  ["path", {"d":"M3 6h18"}],
  ["path", {"d":"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"}],
]);

export const TriangleAlertIcon = defineIcon("TriangleAlert", "shake", [
  ["path", {"d":"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"}],
  ["path", {"d":"M12 9v4"}],
  ["path", {"d":"M12 17h.01"}],
]);

export const UserRoundIcon = defineIcon("UserRound", "pulse", [
  ["circle", {"cx":"12","cy":"8","r":"5"}],
  ["path", {"d":"M20 21a8 8 0 0 0-16 0"}],
]);

export const UsersIcon = defineIcon("Users", "pulse", [
  ["path", {"d":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"}],
  ["path", {"d":"M16 3.128a4 4 0 0 1 0 7.744"}],
  ["path", {"d":"M22 21v-2a4 4 0 0 0-3-3.87"}],
  ["circle", {"cx":"9","cy":"7","r":"4"}],
]);

export const VideoIcon = defineIcon("Video", "pulse", [
  ["path", {"d":"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"}],
  ["rect", {"x":"2","y":"6","width":"14","height":"12","rx":"2"}],
]);

export const Volume2Icon = defineIcon("Volume2", "pulse", [
  ["path", {"d":"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"}],
  ["path", {"d":"M16 9a5 5 0 0 1 0 6"}],
  ["path", {"d":"M19.364 18.364a9 9 0 0 0 0-12.728"}],
]);

export const VolumeXIcon = defineIcon("VolumeX", "pulse", [
  ["path", {"d":"M11 4.702a.7.7 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.7.7 0 0 0 11 19.298z"}],
  ["path", {"d":"m16.5 14.5 5-5"}],
  ["path", {"d":"m16.5 9.5 5 5"}],
]);

export const WandSparklesIcon = defineIcon("WandSparkles", "pop", [
  ["path", {"d":"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"}],
  ["path", {"d":"m14 7 3 3"}],
  ["path", {"d":"M5 6v4"}],
  ["path", {"d":"M19 14v4"}],
  ["path", {"d":"M10 2v2"}],
  ["path", {"d":"M7 8H3"}],
  ["path", {"d":"M21 16h-4"}],
  ["path", {"d":"M11 3H9"}],
]);

export const WaypointsIcon = defineIcon("Waypoints", "pulse", [
  ["path", {"d":"m10.586 5.414-5.172 5.172"}],
  ["path", {"d":"m18.586 13.414-5.172 5.172"}],
  ["path", {"d":"M6 12h12"}],
  ["circle", {"cx":"12","cy":"20","r":"2"}],
  ["circle", {"cx":"12","cy":"4","r":"2"}],
  ["circle", {"cx":"20","cy":"12","r":"2"}],
  ["circle", {"cx":"4","cy":"12","r":"2"}],
]);

export const XIcon = defineIcon("X", "pop", [
  ["path", {"d":"M18 6 6 18"}],
  ["path", {"d":"m6 6 12 12"}],
]);

export const XCircleIcon = defineIcon("XCircle", "shake", [
  ["circle", {"cx":"12","cy":"12","r":"10"}],
  ["path", {"d":"m15 9-6 6"}],
  ["path", {"d":"m9 9 6 6"}],
]);

export const ZapIcon = defineIcon("Zap", "flash", [
  ["path", {"d":"M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"}],
]);
