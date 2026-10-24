"use client";

import {
  Dropzone,
  FileUploadState,
  UploadItem,
} from "@/components/custom/blocks/UploadBlock";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

type QueueVariant = "slide-right" | "slide-up" | "pop" | "flip";

/**
 * The queue's rows, in CSS. A row grows open (grid rows 0fr → 1fr and its
 * 12px top margin) while it fades and moves in, and closes the same way on
 * its way out, so the rows under it follow. One spring for all of it: 0.4s
 * with a 0.25 bounce, sampled to `linear()`.
 */
const QUEUE_SPRING =
  "linear(0, .0026 0.781%, .01 1.563%, .0216 2.344%, .037 3.125%, .0557 3.906%, .0773 4.688%, .1013 5.469%, .1273 6.25%, .1843 7.813%, .2457 9.375%, .374 12.5%, .4999 15.625%, .5593 17.188%, .6155 18.75%, .668 20.313%, .7165 21.875%, .7609 23.438%, .8012 25%, .8373 26.563%, .8694 28.125%, .8977 29.688%, .9224 31.25%, .9437 32.813%, .9619 34.375%, .9772 35.938%, .99 37.5%, 1.0004 39.063%, 1.0088 40.625%, 1.0203 43.75%, 1.0263 46.875%, 1.0283 50%, 1.0254 56.25%, 1.0185 62.5%, 1.0116 68.75%, 1.0061 75%, 1.0025 81.25%, 1.0004 87.5%, .9995 93.75%, 1)";

/** Where each variant comes in from and goes out to. */
const QUEUE_MOVES: Record<QueueVariant, { enter: string; exit: string }> = {
  "slide-right": { enter: "translateX(-40px)", exit: "translateX(40px)" },
  pop: { enter: "scale(0.8)", exit: "scale(0.8)" },
  flip: { enter: "rotateX(90deg)", exit: "rotateX(-90deg)" },
  "slide-up": { enter: "translateY(40px)", exit: "translateY(-40px)" },
};

const QUEUE_CSS = [
  `.upload-queue-row { display: grid; grid-template-rows: 1fr; margin-top: 12px; }`,
  `.upload-queue-row > * { min-height: 0; }`,
  ...Object.entries(QUEUE_MOVES).map(
    ([name, { enter, exit }]) => `
@keyframes upload-queue-in-${name} {
  from { grid-template-rows: 0fr; margin-top: 0; opacity: 0; transform: ${enter}; }
}
@keyframes upload-queue-out-${name} {
  to { grid-template-rows: 0fr; margin-top: 0; opacity: 0; transform: ${exit}; }
}
.upload-queue-row[data-variant="${name}"] { animation: upload-queue-in-${name} 0.4s ${QUEUE_SPRING} backwards; }
.upload-queue-row[data-variant="${name}"][data-leaving] { animation: upload-queue-out-${name} 0.4s ${QUEUE_SPRING} forwards; }`,
  ),
].join("\n");

/** One row of the queue. A leaving row plays its exit, then reports it is gone. */
function QueueRow({
  id,
  variant,
  leaving,
  onGone,
  children,
}: {
  id: string;
  variant: QueueVariant;
  leaving: boolean;
  onGone: (id: string) => void;
  children: ReactNode;
}) {
  // In case no animationend comes (the tab hidden, the row not rendered).
  useEffect(() => {
    if (!leaving) return;
    const t = setTimeout(() => onGone(id), 500);
    return () => clearTimeout(t);
  }, [leaving, id, onGone]);

  return (
    <div
      className="upload-queue-row w-full min-w-0"
      data-variant={variant}
      data-leaving={leaving || undefined}
      onAnimationEnd={(e) => {
        if (leaving && e.target === e.currentTarget) onGone(id);
      }}
    >
      <div className="w-full min-w-0">{children}</div>
    </div>
  );
}

/** Static queue used by the `showAll: "states"` preview — one row per status. */
const STATIC_STATES: FileUploadState[] = [
  {
    id: "static-uploading",
    file: new File([], "quarterly-report.pdf", { type: "application/pdf" }),
    progress: 42,
    status: "uploading",
    timeLeft: 12,
  },
  {
    id: "static-paused",
    file: new File([], "product-shot.png", { type: "image/png" }),
    progress: 66,
    status: "paused",
  },
  {
    id: "static-error",
    file: new File([], "launch-teaser.mp4", { type: "video/mp4" }),
    progress: 89,
    status: "error",
    errorMessage: "Connection lost",
  },
  {
    id: "static-success",
    file: new File([], "brand-guidelines.pdf", { type: "application/pdf" }),
    progress: 100,
    status: "success",
    timeLeft: 0,
  },
];

export default function UploadDemo({
  variant = "slide-up",
  layout,
  showAll,
}: {
  variant?: QueueVariant;
  /** "dropzone" renders the Dropzone on its own. Omitted = previous behavior.
   *  (The Folder drop target lives in folder-demo, so it gets the GSAP /
   *  Motion switch.) */
  layout?: "dropzone";
  /** Render-all mode for the docs gallery. Omitted = previous behavior. */
  showAll?: "states";
}) {
  const [files, setFiles] = useState<FileUploadState[]>([]);

  // Refs to hold simulation intervals so we can pause/clear them
  const activeSimulations = useRef<Record<string, NodeJS.Timeout>>({});

  const simulateUpload = useCallback((fileId: string, startProgress = 0) => {
    const isDestinedToFail = Math.random() > 0.6;
    let currentProgress = startProgress;
    const failedOnce = false;

    const interval = setInterval(() => {
      setFiles((currentFiles) => {
        const fileIndex = currentFiles.findIndex((f) => f.id === fileId);
        if (fileIndex === -1) {
          clearInterval(interval);
          return currentFiles;
        }

        const fileState = currentFiles[fileIndex];
        const chunk = Math.random() * 4 + 1;
        currentProgress += chunk;

        // Simulate a death at ~90%
        if (
          isDestinedToFail &&
          !failedOnce &&
          currentProgress >= 88 &&
          currentProgress < 95
        ) {
          clearInterval(interval);
          const newFiles = [...currentFiles];
          newFiles[fileIndex] = {
            ...fileState,
            progress: 89,
            status: "error",
            errorMessage: "Connection lost",
            timeLeft: undefined,
          };
          return newFiles;
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          const newFiles = [...currentFiles];
          newFiles[fileIndex] = {
            ...fileState,
            progress: 100,
            status: "success",
            timeLeft: 0,
          };
          return newFiles;
        }

        const remaining = 100 - currentProgress;
        const speed = chunk * 10;
        const timeLeft = Math.max(1, Math.ceil(remaining / speed));

        const newFiles = [...currentFiles];
        newFiles[fileIndex] = {
          ...fileState,
          progress: currentProgress,
          status: "uploading",
          timeLeft,
        };
        return newFiles;
      });
    }, 400);

    activeSimulations.current[fileId] = interval;
  }, []);

  const handleFilesDrop = useCallback(
    (droppedFiles: File[]) => {
      const newFiles: FileUploadState[] = droppedFiles.map((file) => {
        const id = Math.random().toString(36).substring(7);

        let previewUrl;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
        }

        return { id, file, progress: 0, status: "idle", previewUrl };
      });

      // Add to top of queue for notification feel
      setFiles((prev) => [...newFiles, ...prev]);

      newFiles.forEach((fileState) => {
        simulateUpload(fileState.id);
      });
    },
    [simulateUpload],
  );

  const handleRetry = useCallback(
    (id: string) => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === id) {
            simulateUpload(id, f.progress);
            return { ...f, status: "uploading", errorMessage: undefined };
          }
          return f;
        }),
      );
    },
    [simulateUpload],
  );

  // A removed row stays in `files`, marked leaving, until its exit has played.
  const [leaving, setLeaving] = useState<ReadonlySet<string>>(() => new Set());

  const handleRemove = useCallback((id: string) => {
    if (activeSimulations.current[id]) {
      clearInterval(activeSimulations.current[id]);
      delete activeSimulations.current[id];
    }
    setLeaving((prev) => new Set(prev).add(id));
  }, []);

  const handleGone = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setLeaving((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const queued = files.filter((f) => !leaving.has(f.id));
  // The list shows only while something is queued: removing the last row
  // takes the whole list away at once, with no exit, as it always has.
  const listed = queued.length > 0;
  useEffect(() => {
    if (!listed && files.length > 0) {
      setFiles([]);
      setLeaving(new Set());
    }
  }, [listed, files.length]);
  const doneCount = queued.filter((f) => f.status === "success").length;
  const totalCount = queued.length;

  const queue = files.map((item) => (
    <QueueRow
      key={item.id}
      id={item.id}
      variant={variant}
      leaving={leaving.has(item.id)}
      onGone={handleGone}
    >
      <UploadItem
        item={item}
        onRetry={handleRetry}
        onRemove={handleRemove}
      />
    </QueueRow>
  ));

  if (layout === "dropzone") {
    return (
      <div className="w-full flex justify-center bg-background rounded-2xl border border-border overflow-hidden py-8 sm:py-16 relative min-h-[400px] sm:min-h-[450px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <div className="w-full max-w-md flex flex-col gap-6 relative z-10 px-3 sm:px-4 min-w-0 perspective-[1000px]">
          <Dropzone
            onFilesDrop={handleFilesDrop}
            accept="image/*,application/pdf,video/mp4"
            maxSize={5}
          />

          {listed && (
            <div className="flex flex-col w-full min-w-0">
              <style>{QUEUE_CSS}</style>
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
                <span>Uploading {totalCount} files</span>
                <span>
                  {doneCount} of {totalCount} done
                </span>
              </div>

              {queue}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (showAll === "states") {
    return (
      <div className="w-full flex justify-center bg-background rounded-2xl border border-border overflow-hidden py-8 sm:py-16 relative min-h-[450px] sm:min-h-[500px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
        <div className="w-full max-w-md flex flex-col gap-3 relative z-10 px-3 sm:px-4 min-w-0">
          {STATIC_STATES.map((item) => (
            <UploadItem
              key={item.id}
              item={item}
              onRetry={() => {}}
              onRemove={() => {}}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center bg-background rounded-2xl border border-border overflow-hidden py-8 sm:py-16 relative min-h-[500px] sm:min-h-[600px]">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* App Container */}
      <div className="w-full max-w-md flex flex-col gap-6 relative z-10 px-3 sm:px-4 min-w-0 perspective-[1000px]">
        <Dropzone
          onFilesDrop={handleFilesDrop}
          accept="image/*,application/pdf,video/mp4"
        />

        {listed && (
          <div className="flex flex-col w-full min-w-0">
            <style>{QUEUE_CSS}</style>
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-1">
              <span>Uploading {totalCount} files</span>
              <span>
                {doneCount} of {totalCount} done
              </span>
            </div>

            {/* Independent Queue Rendering (Notification Style) */}
            {queue}
          </div>
        )}
      </div>
    </div>
  );
}
