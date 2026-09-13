"use client";

import { Folder, type FolderFile } from "@/components/custom/blocks/FolderBlock";
import {
  Camera,
  FileText,
  Image as ImageIcon,
  type LucideIcon,
  Music,
  Palette,
  Video,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// "Default" on the page's colour picker means the folder's showcase blue, so
// the hero matches the original out of the box.
const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = {
    primary: "#bfdbfe",
    default: "#bfdbfe",
    indigo: "#c7d2fe",
    rose: "#fecdd3",
    emerald: "#a7f3d0",
    zinc: "#d4d4d8",
  };
  return map[c] || "#bfdbfe";
};

const CASE_FILES: FolderFile[] = [
  { name: "Deposition_transcript.pdf" },
  { name: "Exhibit_A_photos.zip" },
  { name: "Witness_statement_02.docx" },
  { name: "Timeline_v3.xlsx" },
  { name: "Court_filing_draft.pdf" },
  { name: "Evidence_log.csv" },
  { name: "Contract_redline.docx" },
  { name: "Settlement_terms.pdf" },
];

const PHOTOS: FolderFile[] = [
  "photo-1470071459604-3b5ec3a7fe05",
  "photo-1506905925346-21bda4d32df4",
  "photo-1441974231531-c6227db76b6e",
  "photo-1472214103451-9374bd1c798e",
  "photo-1501785888041-af3ef285b470",
  "photo-1518837695005-2083093ee35b",
].map((id, i) => ({
  thumb: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=320&q=70`,
  name: `IMG_${String(4021 + i).padStart(4, "0")}.jpg`,
}));

const ICONS: Array<{ id: string; icon: LucideIcon }> = [
  { id: "palette", icon: Palette },
  { id: "image", icon: ImageIcon },
  { id: "file", icon: FileText },
  { id: "camera", icon: Camera },
  { id: "music", icon: Music },
  { id: "video", icon: Video },
];

function IconPicker({ color }: { color: string }) {
  const [iconId, setIconId] = useState("palette");
  const icon = ICONS.find((i) => i.id === iconId)?.icon ?? Palette;

  return (
    <div className="flex flex-col items-center gap-8">
      <Folder color={color} icon={icon} label="Design assets" count="24 files" />

      <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
        {ICONS.map(({ id, icon: I }) => (
          <button
            key={id}
            type="button"
            aria-label={id}
            onClick={() => setIconId(id)}
            className={`flex size-8 items-center justify-center rounded-full transition-colors ${
              iconId === id
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            <I size={16} strokeWidth={1.8} />
          </button>
        ))}
      </div>
    </div>
  );
}

function Uploader({ color }: { color: string }) {
  const [files, setFiles] = useState<FolderFile[]>([]);
  const [progress, setProgress] = useState<number | undefined>(undefined);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => { if (timer.current) clearInterval(timer.current); }, []);

  // Fake the upload: every file ticks up together, the pocket bar tracks the
  // overall figure, and both settle at 100 so the bars disappear.
  const onFiles = (incoming: File[]) => {
    const next = incoming.map((f) => ({
      name: f.name,
      progress: 0,
      thumb: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined,
    }));
    setFiles((prev) => [...prev, ...next]);
    setProgress(0);
    if (timer.current) clearInterval(timer.current);
    let p = 0;
    timer.current = setInterval(() => {
      p = Math.min(100, p + 4);
      setProgress(p);
      setFiles((prev) => prev.map((f) => (f.progress !== undefined && f.progress < 100 ? { ...f, progress: p } : f)));
      if (p >= 100 && timer.current) clearInterval(timer.current);
    }, 80);
  };

  return (
    <Folder
      interactive
      color={color}
      icon={ImageIcon}
      label="Drop zone"
      files={files}
      progress={progress}
      onFiles={onFiles}
      onRemoveFile={(i) => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
      accept="image/*,.pdf"
    />
  );
}

export default function FolderDemo({
  color = "primary",
  peek = 3,
  size = 260,
  blur = 6,
  example = "showcase",
}: {
  color?: string;
  peek?: number;
  size?: number;
  blur?: number;
  /** Which preview to render. */
  example?: "showcase" | "fan" | "icon" | "photos" | "upload";
}) {
  const accent = getThemeColorHex(color);
  const frame = "w-full flex items-center justify-center min-h-[420px] px-6 py-16 relative z-10";

  if (example === "fan") {
    return (
      <div className={frame}>
        <Folder files={CASE_FILES} label="Case files" color={accent} icon={FileText} size={size} blur={blur} />
      </div>
    );
  }

  if (example === "icon") {
    return (
      <div className={frame}>
        <IconPicker color={accent} />
      </div>
    );
  }

  if (example === "photos") {
    return (
      <div className={frame}>
        <Folder files={PHOTOS} label="Summer trip" count="6 photos" color={accent} icon={Camera} size={size} blur={blur} />
      </div>
    );
  }

  if (example === "upload") {
    return (
      <div className={frame}>
        <Uploader color={accent} />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Folder
        label="Product shots"
        count="36 photos"
        color={accent}
        icon={ImageIcon}
        peek={peek}
        size={size}
        blur={blur}
      />
    </div>
  );
}
