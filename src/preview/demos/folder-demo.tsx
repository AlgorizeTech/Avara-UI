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
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1506905925346-21bda4d32df4-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1472214103451-9374bd1c798e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790146210/photo-1501785888041-af3ef285b470-1790146212207.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_320,c_limit/v1790150482/photo-1518837695005-2083093ee35b-1790150482277.jpg",
].map((thumb, i) => ({
  thumb,
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

      <div className="flex items-center gap-1.5 rounded-full border border-border bg-card p-1">
        {ICONS.map(({ id, icon: I }) => (
          <button
            key={id}
            type="button"
            aria-label={id}
            onClick={() => setIconId(id)}
            className={`flex size-8 items-center justify-center rounded-full transition-colors ${
              iconId === id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
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
  // Headroom above, not around: the fan lifts the cards ~0.29×size above the
  // folder's top edge and the name tooltip sits above that, so the open state
  // needs far more room over the folder than under it. Centred padding put the
  // folder mid-frame and the tooltip off the top of the preview.
  const frame = "w-full flex items-center justify-center min-h-[460px] px-6 pt-32 pb-10 relative z-10";

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
