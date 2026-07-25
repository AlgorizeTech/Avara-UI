import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

export const Iphone14ProMaxMockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[680px] rounded-[3.5rem] border-[4px] border-slate-300 dark:border-slate-700 bg-black flex-shrink-0",
          "ring-[8px] ring-slate-100 dark:ring-slate-800",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[14px] top-[120px] w-[6px] h-[28px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[190px] w-[6px] h-[80px] bg-slate-300 dark:bg-slate-700 rounded-r-md"></div>

        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-2 inset-x-0 mx-auto w-[110px] h-[32px] bg-black rounded-full z-20 flex justify-end items-center px-4 shadow-inner">
            <div className="w-[14px] h-[14px] bg-zinc-900 rounded-full flex items-center justify-center relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
               <div className="w-[6px] h-[6px] bg-blue-900/40 rounded-full relative">
                  <div className="absolute inset-0 m-auto w-[2px] h-[2px] bg-blue-300/60 rounded-full"></div>
               </div>
            </div>
          </div>

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

export const Iphone12ProMaxMockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[680px] rounded-[3.5rem] border-[4px] border-slate-300 dark:border-slate-700 bg-black flex-shrink-0",
          "ring-[8px] ring-slate-100 dark:ring-slate-800",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[14px] top-[120px] w-[6px] h-[28px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[6px] h-[55px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[190px] w-[6px] h-[80px] bg-slate-300 dark:bg-slate-700 rounded-r-md"></div>

        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-0 inset-x-0 mx-auto w-[150px] h-[30px] bg-black rounded-b-3xl z-20 flex justify-center items-center gap-4">
            <div className="w-[40px] h-[6px] bg-zinc-900 rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-blue-900/40 rounded-full relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
               <div className="w-[4px] h-[4px] bg-blue-300/60 rounded-full"></div>
            </div>
          </div>

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
Iphone12ProMaxMockup.displayName = "Iphone12ProMaxMockup";


export const Iphone5Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[280px] h-[580px] rounded-[2.5rem] border-[4px] border-slate-300 dark:border-slate-700 bg-black flex-shrink-0",
          "ring-[6px] ring-slate-200 dark:ring-slate-800",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[10px] top-[80px] w-[4px] h-[24px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[130px] w-[4px] h-[24px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[170px] w-[4px] h-[24px] bg-slate-300 dark:bg-slate-700 rounded-l-md"></div>
        <div className="absolute top-[10px] right-[50px] w-[40px] h-[4px] bg-slate-300 dark:bg-slate-700 rounded-t-md"></div>

        <div className="relative w-full h-full rounded-[2.2rem] border-[4px] border-black bg-black overflow-hidden z-10 flex flex-col justify-between">
          <div className="w-full h-[75px] bg-black flex justify-center items-center gap-3 relative shrink-0">
             <div className="w-[8px] h-[8px] bg-zinc-900 rounded-full border border-zinc-800 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
             <div className="w-[45px] h-[6px] bg-zinc-800 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full bg-white dark:bg-slate-950 overflow-hidden">
            {videoSrc ? (
              <video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : src ? (
              <img src={src} alt="Mockup" className="w-full h-full object-cover" />
            ) : (
              children
            )}
          </div>
          
          <div className="w-full h-[75px] bg-black flex justify-center items-center shrink-0">
            <div className="w-[44px] h-[44px] rounded-full border-[2px] border-zinc-800 flex justify-center items-center shadow-inner">
              <div className="w-[14px] h-[14px] rounded-[4px] border-[1px] border-zinc-700"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
Iphone5Mockup.displayName = "Iphone5Mockup";


export const SamsungS24UltraMockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[700px] rounded-2xl border-[3px] border-slate-400 dark:border-slate-600 bg-black flex-shrink-0",
          "ring-[4px] ring-slate-200 dark:ring-slate-800",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[7px] top-[150px] w-[4px] h-[40px] bg-slate-400 dark:bg-slate-600 rounded-r-md"></div>
        <div className="absolute -right-[7px] top-[220px] w-[4px] h-[80px] bg-slate-400 dark:bg-slate-600 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[0.85rem] border-[6px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[8px] inset-x-0 mx-auto w-[14px] h-[14px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[5px] h-[5px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[0.5rem] overflow-hidden bg-white dark:bg-slate-950">
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
SamsungS24UltraMockup.displayName = "SamsungS24UltraMockup";

export const GooglePixel8Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[320px] h-[670px] rounded-[3rem] border-[4px] border-slate-300 dark:border-slate-600 bg-black flex-shrink-0",
          "ring-[6px] ring-slate-200 dark:ring-slate-700 shadow-2xl",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[10px] top-[180px] w-[6px] h-[50px] bg-slate-300 dark:bg-slate-600 rounded-r-md"></div>
        <div className="absolute -right-[10px] top-[260px] w-[6px] h-[100px] bg-slate-300 dark:bg-slate-600 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[2.75rem] border-[8px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[12px] inset-x-0 mx-auto w-[16px] h-[16px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[6px] h-[6px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-white dark:bg-slate-950">
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
GooglePixel8Mockup.displayName = "GooglePixel8Mockup";

export const GooglePixel10Mockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[690px] rounded-[2.5rem] border-[3px] border-slate-300 dark:border-slate-500 bg-black flex-shrink-0",
          "ring-[5px] ring-slate-100 dark:ring-slate-800 shadow-2xl",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[8px] top-[170px] w-[5px] h-[50px] bg-slate-300 dark:bg-slate-500 rounded-r-md"></div>
        <div className="absolute -right-[8px] top-[240px] w-[5px] h-[100px] bg-slate-300 dark:bg-slate-500 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[2.3rem] border-[6px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[10px] inset-x-0 mx-auto w-[14px] h-[14px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[5px] h-[5px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-white dark:bg-slate-950">
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
GooglePixel10Mockup.displayName = "GooglePixel10Mockup";
