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
import { useState } from "react";

// No `color` is passed to any folder here on purpose. The sandbox repoints
// `--primary` at the page's colour picker (and, on "Default", leaves the site
// theme's own value in place), and the folder's default colour is a soft
// OKLCH tint of that token — so every example follows the theme preset and
// the picker without a hand-kept hex map, exactly as the upload page does.

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

function IconPicker() {
  const [iconId, setIconId] = useState("palette");
  const icon = ICONS.find((i) => i.id === iconId)?.icon ?? Palette;

  return (
    <div className="flex flex-col items-center gap-8">
      <Folder icon={icon} label="Design assets" count="24 files" />

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

export default function FolderDemo({
  peek = 3,
  size = 260,
  blur = 10,
  example = "showcase",
}: {
  /** Injected by the colour picker; the folder reads it from `--primary` instead. */
  color?: string;
  peek?: number;
  size?: number;
  blur?: number;
  /** Which preview to render. */
  example?: "showcase" | "fan" | "icon" | "photos";
}) {
  const frame = "w-full flex items-center justify-center min-h-[420px] px-6 py-16 relative z-10";

  if (example === "fan") {
    return (
      <div className={frame}>
        <Folder files={CASE_FILES} label="Case files" icon={FileText} size={size} blur={blur} />
      </div>
    );
  }

  if (example === "icon") {
    return (
      <div className={frame}>
        <IconPicker />
      </div>
    );
  }

  if (example === "photos") {
    return (
      <div className={frame}>
        <Folder files={PHOTOS} label="Summer trip" count="6 photos" icon={Camera} size={size} blur={blur} />
      </div>
    );
  }

  return (
    <div className={frame}>
      <Folder
        label="Product shots"
        count="36 photos"
        icon={ImageIcon}
        peek={peek}
        size={size}
        blur={blur}
      />
    </div>
  );
}
