"use client";

import React, { useState, useRef, useCallback } from "react";
import jsQR from "jsqr";
import { UploadCloud, CheckCircle2, Copy, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QrCodeReaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onRead?: (data: string) => void;
}

export function QrCodeReader({ onRead, className, ...props }: QrCodeReaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      setResult(null);
      setImagePreview(null);
      return;
    }

    setError(null);
    setResult(null);

    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      // Scale down if image is too large for performance
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 800;
      let width = img.width;
      let height = img.height;

      if (width > MAX_WIDTH || height > MAX_HEIGHT) {
        const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
        width *= ratio;
        height *= ratio;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code && code.data) {
        setResult(code.data);
        if (onRead) onRead(code.data);
      } else {
        setError("No QR code found in the image. Please try another image.");
      }
    };
    img.src = objectUrl;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetState = () => {
    setResult(null);
    setError(null);
    setImagePreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div 
      className={cn(
        "w-full max-w-md mx-auto flex flex-col items-center bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-2xl shadow-sm p-6 overflow-hidden",
        className
      )}
      {...props}
    >
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload Area */}
      {!imagePreview && (
        <div 
          className={cn(
            "w-full h-64 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-200",
            dragActive 
              ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10" 
              : "border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input 
            ref={inputRef}
            type="file" 
            accept="image/*" 
            onChange={handleChange} 
            className="hidden" 
          />
          <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4 text-zinc-500 dark:text-zinc-400">
            <UploadCloud size={24} />
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-1">
            Click or drag image here
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-[200px]">
            Upload a QR code image to scan and extract the embedded link or text.
          </p>
        </div>
      )}

      {/* Image Preview & Results */}
      {imagePreview && (
        <div className="w-full flex flex-col gap-4">
          <div className="relative w-full h-48 bg-zinc-100 dark:bg-zinc-950 rounded-xl overflow-hidden border dark:border-zinc-800 flex items-center justify-center p-4">
            <img 
              src={imagePreview} 
              alt="Uploaded QR Code" 
              className="max-w-full max-h-full object-contain rounded-md"
            />
          </div>

          {/* Success State */}
          {result && (
            <div className="w-full bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2 font-medium">
                <CheckCircle2 size={16} />
                <span className="text-sm">Scan Successful</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white dark:bg-black border border-green-200 dark:border-green-900/50 rounded-lg p-2.5 overflow-x-auto custom-scrollbar text-sm text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                  {result}
                </div>
                <button 
                  onClick={copyToClipboard}
                  className="shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-white dark:bg-black border border-green-200 dark:border-green-900/50 text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="w-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-start gap-2 text-red-600 dark:text-red-400">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <p className="text-sm font-medium leading-snug">{error}</p>
              </div>
            </div>
          )}

          <button 
            onClick={resetState}
            className="w-full py-2.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors mt-2"
          >
            Scan Another Image
          </button>
        </div>
      )}
    </div>
  );
}
