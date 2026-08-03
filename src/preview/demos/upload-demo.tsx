"use client";

import {
  Dropzone,
  FileUploadState,
  UploadItem,
} from "@/components/custom/blocks/UploadBlock";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

export default function UploadDemo({
  variant = "slide-up",
}: {
  variant?: "slide-right" | "slide-up" | "pop" | "flip";
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

  const doneCount = files.filter((f) => f.status === "success").length;
  const totalCount = files.length;

  return (
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
  );
}
