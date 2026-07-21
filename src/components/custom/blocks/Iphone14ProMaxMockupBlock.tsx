import React from "react";
import { cn } from "@/lib/utils";

export interface Iphone14ProMaxMockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

export const Iphone14ProMaxMockup = React.forwardRef<HTMLDivElement, Iphone14ProMaxMockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[680px] rounded-[3.5rem] border-[4px] border-slate-300 dark:border-slate-700 bg-black flex-shrink-0",
          "ring-[8px] ring-slate-100 dark:ring-slate-800", // Outer metallic rim
          className
        )}
        {...props}
      >
        {/* Hardware Buttons */}
        <div className="absolute -left-[14px] top-[120px] w-[6px] h-[28px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[190px] w-[6px] h-[80px] bg-slate-300 dark:bg-slate-700 rounded-r-md"></div>

        {/* Screen Bezel / Inner Black Border */}
        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-black bg-black overflow-hidden z-10">
          
          {/* Dynamic Island */}
          <div className="absolute top-2 inset-x-0 mx-auto w-[110px] h-[32px] bg-black rounded-full z-20 flex justify-end items-center px-4 shadow-inner">
            <div className="w-[14px] h-[14px] bg-zinc-900 rounded-full flex items-center justify-center relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
               <div className="w-[6px] h-[6px] bg-blue-900/40 rounded-full relative">
                  <div className="absolute inset-0 m-auto w-[2px] h-[2px] bg-blue-300/60 rounded-full"></div>
               </div>
            </div>
          </div>

          {/* Screen Content */}
          <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-white dark:bg-slate-950">
            {videoSrc ? (
              <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : src ? (
              <img src={src} alt="Mockup" className="w-full h-full object-cover" />
            ) : (
              children
            )}
          </div>
        </div>
      </div>
    );
  }
);

Iphone14ProMaxMockup.displayName = "Iphone14ProMaxMockup";
