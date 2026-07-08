"use client";

import {
  Dropzone,
  FileUploadState,
  UploadItem,
} from "@/components/custom/blocks/UploadBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const UPLOAD_CODE_TS = `/* Extracted full component architecture natively available in module */`;
const UPLOAD_CODE_JS = `/* Extracted pure javascript component architecture natively available in module */`;

export function UploadShowcase() {
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [variant, setVariant] = useState<
    "slide-right" | "slide-up" | "pop" | "flip"
  >("slide-up");

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

  const handleRemove = useCallback((id: string) => {
    if (activeSimulations.current[id]) {
      clearInterval(activeSimulations.current[id]);
      delete activeSimulations.current[id];
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Framer Motion Map for Queue Entrances
  const getVariants = () => {
    switch (variant) {
      case "slide-right":
        return {
          initial: { opacity: 0, x: -40, height: 0, marginTop: 0 },
          animate: { opacity: 1, x: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, x: 40, height: 0, marginTop: 0 },
        };
      case "pop":
        return {
          initial: { opacity: 0, scale: 0.8, height: 0, marginTop: 0 },
          animate: { opacity: 1, scale: 1, height: "auto", marginTop: 12 },
          exit: { opacity: 0, scale: 0.8, height: 0, marginTop: 0 },
        };
      case "flip":
        return {
          initial: { opacity: 0, rotateX: 90, height: 0, marginTop: 0 },
          animate: { opacity: 1, rotateX: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, rotateX: -90, height: 0, marginTop: 0 },
        };
      case "slide-up":
      default:
        return {
          initial: { opacity: 0, y: 40, height: 0, marginTop: 0 },
          animate: { opacity: 1, y: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, y: -40, height: 0, marginTop: 0 },
        };
    }
  };

  const generateUsageCode = () => {
    return `import { Dropzone, UploadItem, FileUploadState } from "@/components/custom/blocks/UploadBlock";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function UploadFlow() {
  const [files, setFiles] = useState<FileUploadState[]>([]);

  const handleDrop = (newFiles: File[]) => {
    const mapped = newFiles.map(f => ({
      id: Math.random().toString(),
      file: f,
      progress: 0,
      status: "uploading" as const,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined
    }));
    setFiles(prev => [...mapped, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md w-full mx-auto">
      <Dropzone onFilesDrop={handleDrop} />
      
      <div className="flex flex-col">
        {/* AnimatePresence handles the seamless entry/exit of the list items */}
        <AnimatePresence mode="popLayout">
          {files.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 40, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, x: -40, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            >
              <UploadItem 
                item={item} 
                onRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}`;
  };

  const doneCount = files.filter((f) => f.status === "success").length;
  const totalCount = files.length;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Queue Entry Animation
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["slide-up", "slide-right", "pop", "flip"] as const).map(
                (v) => (
                  <button
                    key={v}
                    onClick={() => setVariant(v)}
                    className={cn(
                      "flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all",
                      variant === v
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400",
                    )}
                  >
                    {v.replace("-", " ")}
                  </button>
                ),
              )}
            </div>
          </div>
          <div className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-xs text-right hidden md:block">
            Drag images directly from your desktop to see the visual preview and
            entrance effects.
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="UploadBlock"
        tsCode={UPLOAD_CODE_TS}
        jsCode={UPLOAD_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex justify-center bg-[#fafafa] dark:bg-[#050505] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden py-16 relative min-h-[600px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

          {/* App Container */}
          <div className="w-full max-w-md flex flex-col gap-6 relative z-10 px-4 perspective-[1000px]">
            <Dropzone
              onFilesDrop={handleFilesDrop}
              accept="image/*,application/pdf,video/mp4"
            />

            {files.length > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 px-1">
                  <span>Uploading {totalCount} files</span>
                  <span>
                    {doneCount} of {totalCount} done
                  </span>
                </div>

                {/* Independent Queue Rendering (Notification Style) */}
                <AnimatePresence mode="popLayout">
                  {files.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={getVariants().initial}
                      animate={getVariants().animate}
                      exit={getVariants().exit}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        bounce: 0.25,
                      }}
                    >
                      <UploadItem
                        item={item}
                        onRetry={handleRetry}
                        onRemove={handleRemove}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
