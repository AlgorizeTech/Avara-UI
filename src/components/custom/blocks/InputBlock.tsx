"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  CornerDownLeft,
  Eye,
  EyeOff,
  FileIcon,
  FileText,
  Sparkles,
  UploadCloud,
  X,
} from "lucide-react";
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { getThemeStyles } from "./input-theme";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type InputColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type InputVariant =
  | "default"
  | "filled"
  | "underlined"
  | "glow"
  | "pill"
  | "password-strength";
export type InputSize = "sm" | "md" | "lg";

// ==========================================
// INPUT COMPONENT
// ==========================================
export interface InputBlockProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "color" | "type"
  > {
  type?: "text" | "password" | "email" | "number" | "file";
  variant?: InputVariant;
  color?: InputColor;
  inputSize?: InputSize;
  label?: string;
  /** Floats the label onto the top border when focused or filled. Default: false */
  floatingLabel?: boolean;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
  /**
   * Autocomplete. Focusing the field lists these like a select menu, typing
   * narrows the list, and choosing one writes the text into the field —
   * your `onChange` fires exactly as if it had been typed.
   */
  suggestions?: string[];
  /** Fired after a suggestion is written into the field. */
  onSuggestionSelect?: (value: string) => void;
  /** Cap on rows shown at once (default 8). */
  maxSuggestions?: number;
}

// Walks up to the first ancestor that clips overflow (a modal, a scroll pane,
// a card with overflow-hidden). That box, not the viewport, is what would crop
// the suggestion list, so it decides whether the list opens up or down. Only
// overflow-y counts — the list grows vertically, and a box clipping just
// sideways (overflow-x: clip) leaves it free to hang below.
const getClippingRect = (el: HTMLElement): DOMRect | null => {
  let node = el.parentElement;
  while (node && node !== document.body) {
    const { overflowY } = window.getComputedStyle(node);
    if (/(auto|scroll|hidden|clip)/.test(overflowY)) {
      return node.getBoundingClientRect();
    }
    node = node.parentElement;
  }
  return null;
};

// Sets the value the way React expects for both controlled and uncontrolled
// inputs: through the native setter, then an `input` event so React's own
// onChange runs. Assigning `input.value` directly would be swallowed by
// React's value tracker and the consumer would never hear about it.
const writeInputValue = (input: HTMLInputElement, value: string) => {
  const setter = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value",
  )?.set;
  setter?.call(input, value);
  input.dispatchEvent(new Event("input", { bubbles: true }));
};

/** The suggestion with the typed characters picked out. */
function SuggestionText({
  text,
  query,
  matchClassName,
}: {
  text: string;
  query: string;
  matchClassName: string;
}) {
  const q = query.trim();
  const at = q ? text.toLowerCase().indexOf(q.toLowerCase()) : -1;
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}
      <span className={cn("font-semibold", matchClassName)}>
        {text.slice(at, at + q.length)}
      </span>
      {text.slice(at + q.length)}
    </>
  );
}

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(
  (
    {
      type = "text",
      variant = "default",
      color = "primary",
      inputSize = "md",
      label,
      floatingLabel = false,
      helperText,
      error,
      leftIcon,
      rightIcon,
      disabled = false,
      className,
      multiple,
      accept,
      onFilesChange,
      suggestions,
      onSuggestionSelect,
      maxSuggestions = 8,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const { theme, style } = getThemeStyles(color);
    const hasError = Boolean(error);

    // --- Autocomplete State ---
    const hasSuggestions =
      Boolean(suggestions?.length) && type !== "file" && type !== "password";
    const inputRef = useRef<HTMLInputElement | null>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const listId = useId();
    const [listOpen, setListOpen] = useState(false);
    const [listUp, setListUp] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    // Mirror of what is in the field. For a controlled input this is
    // `props.value`; otherwise it tracks the native input as the user types.
    const [typed, setTyped] = useState(String(props.defaultValue ?? ""));
    const query =
      props.value !== undefined ? String(props.value) : typed;

    const assignInputRef = (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const matches = hasSuggestions
      ? (suggestions as string[])
          .filter((item) =>
            item.toLowerCase().includes(query.trim().toLowerCase()),
          )
          .slice(0, maxSuggestions)
      : [];

    const closeList = () => {
      setListOpen(false);
      setActiveIndex(-1);
    };

    const chooseSuggestion = (item: string) => {
      const input = inputRef.current;
      if (input) {
        writeInputValue(input, item);
        input.focus();
      }
      setTyped(item);
      onSuggestionSelect?.(item);
      closeList();
    };

    // Open upward only when the clipping box has no room below and more above.
    // Measured before paint so the list never appears on the wrong side first.
    useLayoutEffect(() => {
      if (!listOpen || !fieldRef.current) return;
      const trigger = fieldRef.current.getBoundingClientRect();
      const clip = getClippingRect(fieldRef.current);
      const listHeight = listRef.current?.offsetHeight ?? 240;
      const bottomBound = Math.min(
        window.innerHeight,
        clip ? clip.bottom : Number.POSITIVE_INFINITY,
      );
      const topBound = Math.max(0, clip ? clip.top : 0);
      const spaceBelow = bottomBound - trigger.bottom - 8;
      const spaceAbove = trigger.top - topBound - 8;
      setListUp(spaceBelow < listHeight && spaceAbove > spaceBelow);
    }, [listOpen, matches.length]);

    // Keep the keyboard-highlighted row in view inside the scrolling list.
    useEffect(() => {
      if (activeIndex < 0) return;
      listRef.current
        ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
        ?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    // Click outside closes the list.
    useEffect(() => {
      if (!listOpen) return;
      const onPointerDown = (e: MouseEvent) => {
        if (!fieldRef.current?.contains(e.target as Node)) closeList();
      };
      document.addEventListener("mousedown", onPointerDown);
      return () => document.removeEventListener("mousedown", onPointerDown);
    }, [listOpen]);

    const handleSuggestionKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      props.onKeyDown?.(e);
      if (e.defaultPrevented || !hasSuggestions) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!listOpen) setListOpen(true);
        if (matches.length)
          setActiveIndex((i) => (i + 1) % matches.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (!listOpen) setListOpen(true);
        if (matches.length)
          setActiveIndex((i) => (i <= 0 ? matches.length - 1 : i - 1));
      } else if (e.key === "Enter") {
        if (listOpen && activeIndex >= 0 && matches[activeIndex]) {
          e.preventDefault();
          chooseSuggestion(matches[activeIndex]);
        }
      } else if (e.key === "Escape") {
        if (listOpen) {
          e.preventDefault();
          closeList();
        }
      } else if (e.key === "Tab") {
        closeList();
      }
    };

    // --- File Upload State ---
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Size Classes ---
    const sizeClasses = {
      sm: {
        wrapper: "min-h-9 px-3",
        text: "text-xs",
        icon: "w-3.5 h-3.5",
        dropzone: "p-4 min-h-[100px]",
      },
      md: {
        wrapper: "min-h-11 px-4",
        text: "text-sm",
        icon: "w-4 h-4",
        dropzone: "p-6 min-h-[140px]",
      },
      lg: {
        wrapper: "min-h-14 px-5",
        text: "text-base",
        icon: "w-5 h-5",
        dropzone: "p-8 min-h-[180px]",
      },
    };
    const s = sizeClasses[inputSize];

    // --- Variant Styles ---
    const getVariantStyles = () => {
      const baseWrapper = cn(
        "relative flex items-center w-full transition-all duration-300 overflow-hidden",
        s.wrapper,
      );

      if (disabled)
        return {
          wrapper: cn(
            baseWrapper,
            "opacity-50 cursor-not-allowed border border-border bg-muted",
          ),
          active: "",
        };
      if (hasError)
        return {
          wrapper: cn(
            baseWrapper,
            "border border-red-500 bg-background",
            variant === "underlined" && "border-0 border-b-2 rounded-none",
            variant === "pill" && "rounded-full",
            variant !== "underlined" && variant !== "pill" && "rounded-xl",
          ),
          active: "focus-within:ring-4 focus-within:ring-red-500/10",
        };

      switch (variant) {
        case "pill":
          return {
            wrapper: cn(
              baseWrapper,
              "rounded-full border border-border bg-background shadow-xs",
              leftIcon && "pl-1.5",
            ),
            active: cn("focus-within:ring-4 transition-all", theme.ring),
          };
        case "filled":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-muted border border-transparent rounded-xl",
            ),
            active: cn(
              "focus-within:bg-background focus-within:ring-4",
              theme.ring,
            ),
          };
        case "underlined":
          return {
            wrapper: cn(
              baseWrapper,
              "border-b-2 border-border bg-transparent rounded-none px-0",
            ),
            active: theme.ring,
          };
        case "glow":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-background border border-border rounded-xl shadow-sm",
            ),
            active: theme.glow,
          };
        case "default":
        default:
          return {
            wrapper: cn(
              baseWrapper,
              "bg-background border border-border rounded-xl shadow-sm",
            ),
            active: cn("focus-within:ring-4", theme.ring),
          };
      }
    };
    const styles = getVariantStyles();

    // ==========================================
    // FILE UPLOAD LOGIC
    // ==========================================
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const processFiles = useCallback(
      (newFiles: File[]) => {
        const first = newFiles[0];
        const validFiles = multiple
          ? [...selectedFiles, ...newFiles]
          : first
            ? [first]
            : [];
        setSelectedFiles(validFiles);
        if (onFilesChange) onFilesChange(validFiles);

        // Generate previews for images
        validFiles.forEach((file) => {
          if (file.type.startsWith("image/") && !previews[file.name]) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviews((prev) => ({
                ...prev,
                [file.name]: reader.result as string,
              }));
            };
            reader.readAsDataURL(file);
          }
        });
      },
      [multiple, selectedFiles, previews, onFilesChange],
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(Array.from(e.target.files));
      }
    };
    const removeFile = (fileName: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updatedFiles = selectedFiles.filter((f) => f.name !== fileName);
      setSelectedFiles(updatedFiles);
      if (onFilesChange) onFilesChange(updatedFiles);
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[fileName];
        return newPreviews;
      });
    };

const PASSWORD_STRENGTH_RULES = [
  {
    id: "length",
    label: "At least 12 characters",
    test: (v: string) => v.length >= 12,
  },
  {
    id: "case",
    label: "Uppercase & lowercase letters",
    test: (v: string) => /[a-z]/.test(v) && /[A-Z]/.test(v),
  },
  {
    id: "number",
    label: "Includes a number (0-9)",
    test: (v: string) => /\d/.test(v),
  },
  {
    id: "symbol",
    label: "Includes a special character",
    test: (v: string) => /[^A-Za-z0-9]/.test(v),
  },
] as const;

const COMMON_WEAK_PATTERNS =
  /(password|qwerty|123456|letmein|admin|welcome|0123|1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|defg|qwer|wert|erty|asdf)/i;

function evaluatePasswordStrength(pw: string) {
  const results = PASSWORD_STRENGTH_RULES.map((rule) => ({
    ...rule,
    met: rule.test(pw),
  }));
  const passed = results.filter((r) => r.met).length;
  const isGuessable =
    pw.length > 0 &&
    (COMMON_WEAK_PATTERNS.test(pw) || /(.)\1{3,}/.test(pw));

  const score =
    pw.length === 0 ? 0 : isGuessable ? 1 : Math.max(1, passed);

  const labels = ["Empty", "Weak", "Fair", "Good", "Strong"] as const;
  const label = labels[score] ?? "Strong";

  const tone =
    score === 0
      ? {
          bar: "bg-neutral-300 dark:bg-zinc-700",
          text: "text-neutral-400 dark:text-neutral-500",
        }
      : score === 1
        ? {
            bar: "bg-[#ef1f2f] dark:bg-red-500",
            text: "text-[#ef1f2f] dark:text-red-400",
          }
        : score === 2
          ? {
              bar: "bg-[#f59e0b] dark:bg-amber-500",
              text: "text-[#d97706] dark:text-amber-400",
            }
          : {
              bar: "bg-[#00b67a] dark:bg-emerald-500",
              text: "text-[#059669] dark:text-emerald-400",
            };

  return { results, score, label, isGuessable, tone };
}

function generateStrongPassword(length = 16): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghijkmnopqrstuvwxyz";
  const digits = "23456789";
  const symbols = "!@#$%^&*()-_=+?";
  const all = upper + lower + digits + symbols;

  const pick = (pool: string) =>
    pool[Math.floor(Math.random() * pool.length)];

  // Ensure every strength rule is guaranteed to be satisfied
  const chars = [
    pick(upper),
    pick(upper),
    pick(lower),
    pick(lower),
    pick(digits),
    pick(digits),
    pick(symbols),
    pick(symbols),
  ];

  while (chars.length < length) {
    chars.push(pick(all));
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  const candidate = chars.join("");
  if (COMMON_WEAK_PATTERNS.test(candidate) || /(.)\1{3,}/.test(candidate)) {
    return generateStrongPassword(length);
  }
  return candidate;
}

    // ==========================================
    // RENDER: PASSWORD STRENGTH VARIANT
    // ==========================================
    if (variant === "password-strength") {
      const { results, score, label: strengthLabel, isGuessable, tone } =
        evaluatePasswordStrength(query);
      const pwInputType = showPassword ? "text" : "password";

      const handleGeneratePassword = () => {
        if (disabled) return;
        const generated = generateStrongPassword(16);
        setTyped(generated);
        if (inputRef.current) {
          writeInputValue(inputRef.current, generated);
        }
      };

      const isFloatingActive = floatingLabel && (isFocused || query.length > 0);

      return (
        <div
          className={cn("flex flex-col w-full max-w-sm relative", className)}
          style={style}
        >
          {label && !floatingLabel && (
            <label
              className={cn(
                "text-[13.5px] font-medium mb-2",
                hasError
                  ? "text-red-500"
                  : "text-neutral-800 dark:text-neutral-200",
                disabled && "opacity-50",
              )}
            >
              {label}
            </label>
          )}

          <div className="flex items-center gap-2">
            <div
              className={cn(
                "relative flex-1 min-w-0 flex items-center h-12 rounded-xl border-[1.5px] px-3.5 transition-colors duration-200",
                disabled
                  ? "opacity-50 cursor-not-allowed bg-muted border-border"
                  : hasError
                    ? "border-red-400 bg-red-50/40 dark:bg-red-500/5"
                    : "border-neutral-200/90 dark:border-zinc-800 bg-neutral-100/80 dark:bg-zinc-900/70 focus-within:bg-white dark:focus-within:bg-zinc-950 focus-within:border-neutral-300 dark:focus-within:border-zinc-700",
              )}
            >
              {floatingLabel && label && (
                <label
                  className={cn(
                    "pointer-events-none absolute transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] select-none",
                    isFloatingActive
                      ? "top-0 -translate-y-1/2 left-2.5 px-1.5 text-[12px] font-medium bg-white dark:bg-zinc-950 rounded-xs text-neutral-700 dark:text-neutral-200"
                      : cn(
                          "top-1/2 -translate-y-1/2 text-[13.5px] text-neutral-400 dark:text-neutral-500",
                          leftIcon ? "left-9" : "left-3.5",
                        ),
                    hasError && "text-red-500",
                    disabled && "opacity-50",
                  )}
                >
                  {label}
                </label>
              )}

              {leftIcon && (
                <div className="shrink-0 mr-2.5 text-neutral-400 flex items-center justify-center [&_svg]:size-4">
                  {leftIcon}
                </div>
              )}

              <input
                ref={assignInputRef}
                type={pwInputType}
                disabled={disabled}
                className="w-full h-full bg-transparent border-none outline-none text-[13.5px] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500 tracking-wide"
                {...props}
                placeholder={
                  floatingLabel
                    ? ""
                    : (props.placeholder ?? "Enter a password...")
                }
                onFocus={(e) => {
                  setIsFocused(true);
                  props.onFocus?.(e);
                }}
                onBlur={(e) => {
                  setIsFocused(false);
                  props.onBlur?.(e);
                }}
                onChange={(e) => {
                  setTyped(e.target.value);
                  props.onChange?.(e);
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={disabled}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="shrink-0 ml-2 text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors disabled:opacity-50"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleGeneratePassword}
              disabled={disabled}
              title="Generate strong password"
              aria-label="Generate strong password"
              className={cn(
                "w-12 h-12 rounded-xl border-[1.5px] border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:bg-neutral-50 dark:hover:bg-zinc-900 shrink-0 flex items-center justify-center transition-all active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs cursor-pointer focus-visible:outline-none focus-visible:ring-2",
                theme.ring,
              )}
            >
              <Sparkles className={cn("w-4 h-4 shrink-0 transition-colors", theme.text)} />
            </button>
          </div>

          {/* 4 Segmented Strength Bars */}
          <div
            role="meter"
            aria-label="Password strength"
            aria-valuemin={0}
            aria-valuemax={PASSWORD_STRENGTH_RULES.length}
            aria-valuenow={score}
            aria-valuetext={strengthLabel}
            className="grid grid-cols-4 gap-2 mt-2.5"
          >
            {PASSWORD_STRENGTH_RULES.map((rule, idx) => {
              const active = idx < score;
              return (
                <div
                  key={rule.id}
                  className="h-[4px] rounded-sm bg-neutral-200/90 dark:bg-zinc-800 overflow-hidden"
                >
                  <div
                    className={cn(
                      "h-full w-full rounded-sm origin-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      tone.bar,
                    )}
                    style={{
                      transform: active ? "scaleX(1)" : "scaleX(0)",
                      opacity: active ? 1 : 0,
                      transitionDelay: active ? `${idx * 120}ms` : "0ms",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Strength Label + Commonly Guessed Warning */}
          <div className="mt-2 flex items-center justify-between gap-2 min-h-[20px]">
            <div className="grid">
              {(["Empty", "Weak", "Fair", "Good", "Strong"] as const).map(
                (lbl) => (
                  <span
                    key={lbl}
                    className={cn(
                      "col-start-1 row-start-1 text-[13.5px] font-medium transition-opacity duration-300",
                      lbl === strengthLabel
                        ? cn("opacity-100", tone.text)
                        : "opacity-0 pointer-events-none",
                    )}
                  >
                    {lbl}
                  </span>
                ),
              )}
            </div>
            {isGuessable && (
              <span className="text-[11.5px] font-medium text-amber-600 dark:text-amber-400">
                Commonly guessed
              </span>
            )}
          </div>

          {/* 4 Criteria Checklist with slow, smooth staggered draw-in checkmarks */}
          <ul className="mt-2.5 flex flex-col gap-2">
            {results.map((rule, idx) => {
              const boxDelay = rule.met ? `${idx * 160}ms` : "0ms";
              const drawDelay = rule.met ? `${idx * 160 + 90}ms` : "0ms";

              return (
                <li key={rule.id} className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative w-[18px] h-[18px] rounded-sm border flex items-center justify-center shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      rule.met
                        ? "bg-[#00b67a] border-[#00b67a] text-white scale-100"
                        : "bg-white dark:bg-zinc-950 border-neutral-300 dark:border-zinc-700 text-transparent scale-100",
                    )}
                    style={{ transitionDelay: boxDelay }}
                  >
                    <svg viewBox="0 0 12 12" fill="none" className="w-2.5 h-2.5">
                      <path
                        d="M2 6.2 4.7 8.9 10 3.3"
                        stroke="currentColor"
                        strokeWidth="1.9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={rule.met ? 0 : 1}
                        style={{
                          transition:
                            "stroke-dashoffset 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 220ms ease",
                          transitionDelay: drawDelay,
                          opacity: rule.met ? 1 : 0,
                        }}
                      />
                    </svg>
                  </span>
                  <span
                    className={cn(
                      "text-[13.5px] leading-snug transition-colors duration-300 ease-out",
                      rule.met
                        ? "text-neutral-800 dark:text-neutral-200"
                        : "text-neutral-400 dark:text-neutral-500",
                    )}
                    style={{ transitionDelay: boxDelay }}
                  >
                    {rule.label}
                  </span>
                </li>
              );
            })}
          </ul>

          {error && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-2">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
        </div>
      );
    }

    // ==========================================
    // RENDER: FILE TYPE
    // ==========================================
    if (type === "file") {
      return (
        <div
          className={cn("flex flex-col gap-1.5 w-full relative", className)}
          style={style}
        >
          {label && (
            <label
              className={cn(
                "text-sm font-semibold",
                hasError ? "text-red-500" : "text-foreground",
                disabled && "opacity-50",
              )}
            >
              {label}
            </label>
          )}

          <div
            onClick={() => !disabled && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ease-in-out group",
              s.dropzone,
              disabled
                ? "opacity-50 cursor-not-allowed border-border bg-muted"
                : hasError
                  ? "border-red-400 bg-red-50/50 dark:bg-red-500/5"
                  : isDragging
                    ? theme.dragActive
                    : "border-border bg-muted/50 hover:bg-muted",
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple={multiple}
              accept={accept}
              onChange={handleFileChange}
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                "p-3 rounded-full mb-3 transition-colors",
                isDragging
                  ? theme.bg
                  : "bg-card shadow-sm border border-border group-hover:scale-105",
              )}
            >
              <UploadCloud
                className={cn(
                  "w-6 h-6",
                  !isDragging && theme.text,
                )}
              />
            </div>
            <p
              className={cn("font-semibold text-foreground", s.text)}
            >
              {isDragging
                ? "Drop files here"
                : "Click or drag file to this area"}
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
              {accept ? `Supports ${accept}` : "Supports all file types"}{" "}
              {multiple && "• Upload multiple"}
            </p>
          </div>

          {/* File List / Previews */}
          {selectedFiles.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 bg-card border border-border rounded-lg shadow-sm group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {previews[file.name] ? (
                      <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden bg-muted relative border border-border">
                        {/* A FileReader data URL — next/image cannot optimise
                            it and would need `unoptimized`, so a plain img is
                            both simpler and framework-neutral. */}
                        <img
                          src={previews[file.name]}
                          alt="preview"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "w-10 h-10 shrink-0 rounded-md flex items-center justify-center",
                          theme.bgSoft,
                        )}
                      >
                        {file.type.includes("pdf") ? (
                          <FileText className={cn("w-5 h-5", theme.text)} />
                        ) : (
                          <FileIcon className={cn("w-5 h-5", theme.text)} />
                        )}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-foreground truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => removeFile(file.name, e)}
                    className="p-2 shrink-0 rounded-md text-muted-foreground hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-xs font-medium text-muted-foreground mt-0.5">
              {helperText}
            </p>
          )}
        </div>
      );
    }

    // ==========================================
    // RENDER: STANDARD TEXT/PASSWORD/EMAIL
    // ==========================================
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div
        className={cn("flex flex-col gap-1.5 w-full relative", className)}
        style={style}
      >
        {label && (
          <label
            className={cn(
              "text-sm font-semibold",
              hasError ? "text-red-500" : "text-foreground",
              disabled && "opacity-50",
            )}
          >
            {label}
          </label>
        )}

        <div
          ref={fieldRef}
          className={cn("relative", hasSuggestions && "z-10")}
        >
        <div className={cn("group", styles.wrapper, styles.active)}>
          {leftIcon && (
            <div
              className={cn(
                "shrink-0 text-muted-foreground transition-colors flex items-center justify-center [&_svg]:shrink-0",
                variant !== "underlined" && variant !== "pill" && "pl-4 [&_svg]:size-4",
                variant === "underlined" && "pl-0 pr-3 [&_svg]:size-4",
                variant === "pill" &&
                  "grid h-[24px] sm:h-[26px] w-[46px] sm:w-[54px] shrink-0 place-items-center border-r border-border pl-0 pr-0 mr-3 text-muted-foreground group-focus-within:text-primary [&_svg]:size-[16px] sm:[&_svg]:size-[18px]",
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={assignInputRef}
            type={inputType}
            disabled={disabled}
            className={cn(
              "w-full h-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70 transition-colors",
              s.text,
              leftIcon && variant !== "underlined" && variant !== "pill" ? "pl-2.5" : "pl-0",
              variant === "pill" && !leftIcon && "pl-1",
              variant === "underlined" && !leftIcon && "pl-0",
              rightIcon || isPassword ? "pr-2.5" : "pr-0",
            )}
            {...props}
            {...(hasSuggestions
              ? {
              role: "combobox",
              autoComplete: "off",
              "aria-autocomplete": "list",
              "aria-expanded": listOpen && matches.length > 0,
              "aria-controls": listId,
              "aria-activedescendant":
                listOpen && activeIndex >= 0
                  ? `${listId}-${activeIndex}`
                  : undefined,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                props.onChange?.(e);
                setTyped(e.target.value);
                setActiveIndex(-1);
                if (!listOpen) setListOpen(true);
              },
              onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
                props.onFocus?.(e);
                setListOpen(true);
              },
              onKeyDown: handleSuggestionKeyDown,
                }
              : {})}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={cn(
                "shrink-0 pr-4 text-muted-foreground hover:text-muted-foreground transition-colors disabled:opacity-50",
                variant === "underlined" && "pr-0 pl-3",
                variant === "pill" && "pr-3.5",
              )}
            >
              {showPassword ? (
                <EyeOff className={s.icon} />
              ) : (
                <Eye className={s.icon} />
              )}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div
              className={cn(
                "shrink-0 pr-4 text-muted-foreground flex items-center justify-center [&_svg]:size-4 [&_svg]:shrink-0",
                variant === "underlined" && "pr-0 pl-3",
                variant === "pill" && "pr-3.5",
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Suggestion list. Rows are chosen on mousedown so the field keeps
            focus; the native `input` event then runs the consumer's onChange. */}
        {hasSuggestions && listOpen && !disabled && (
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-label={label ? `${label} suggestions` : "Suggestions"}
            className={cn(
              "absolute left-0 right-0 z-50 max-h-[18.5rem] overflow-y-auto p-1 border border-border bg-popover text-popover-foreground rounded-xl shadow-lg",
              "animate-in fade-in duration-150",
              listUp
                ? cn(
                    "origin-bottom slide-in-from-bottom-1",
                    variant === "underlined"
                      ? "bottom-[100%]"
                      : "bottom-[calc(100%+6px)]",
                  )
                : cn(
                    "origin-top slide-in-from-top-1",
                    variant === "underlined"
                      ? "top-[100%]"
                      : "top-[calc(100%+6px)]",
                  ),
            )}
          >
            {matches.length === 0 ? (
              <li className="px-3 py-2.5 text-xs text-muted-foreground">
                No matches for{" "}
                <span className="font-medium text-foreground">
                  &ldquo;{query.trim()}&rdquo;
                </span>
                {" "}— keep typing to use it as-is.
              </li>
            ) : (
              matches.map((item, index) => {
                const isActive = index === activeIndex;
                return (
                  <li
                    key={item}
                    id={`${listId}-${index}`}
                    data-index={index}
                    role="option"
                    aria-selected={isActive}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      chooseSuggestion(item);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={cn(
                      "flex items-center justify-between gap-3 px-3 py-2 rounded-lg cursor-pointer text-foreground",
                      s.text,
                      isActive ? theme.bgSoft : "hover:bg-muted/60",
                    )}
                  >
                    <span className="truncate">
                      <SuggestionText
                        text={item}
                        query={query}
                        matchClassName={theme.text}
                      />
                    </span>
                    {isActive && (
                      <CornerDownLeft
                        aria-hidden
                        className={cn("w-3.5 h-3.5 shrink-0", theme.text)}
                      />
                    )}
                  </li>
                );
              })
            )}
          </ul>
        )}
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
InputBlock.displayName = "InputBlock";
