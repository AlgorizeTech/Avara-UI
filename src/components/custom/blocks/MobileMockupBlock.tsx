import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

export const Iphone17ProMaxMockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative mx-auto w-[340px] h-[712px] rounded-[3.75rem] border-[3px] border-border bg-black flex-shrink-0",
          "ring-[6px] ring-muted shadow-2xl",
          className
        )}
        {...props}
      >
        {/* Left rail: Action button, then volume up / down. */}
        <div className="absolute -left-[13px] top-[128px] w-[5px] h-[30px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[13px] top-[188px] w-[5px] h-[58px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[13px] top-[260px] w-[5px] h-[58px] bg-muted rounded-l-md"></div>

        {/* Right rail: side button, then the flush Camera Control. */}
        <div className="absolute -right-[13px] top-[200px] w-[5px] h-[88px] bg-muted rounded-r-md"></div>
        <div className="absolute -right-[12px] top-[320px] w-[4px] h-[36px] rounded-r-md bg-gradient-to-b from-foreground/20 to-foreground/30"></div>

        {/* The 17 Pro Max runs a near-uniform bezel, so the screen border is
            thinner here than on the 14 Pro Max below. */}
        <div className="relative w-full h-full rounded-[3.55rem] border-[7px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[9px] inset-x-0 mx-auto w-[100px] h-[29px] bg-black rounded-full z-20 flex justify-between items-center px-3 shadow-inner">
            <div className="w-[10px] h-[10px] bg-zinc-900 rounded-full shadow-[inset_0_0_2px_rgba(255,255,255,0.08)]"></div>
            <div className="w-[13px] h-[13px] bg-zinc-900 rounded-full flex items-center justify-center relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
              <div className="w-[6px] h-[6px] bg-blue-900/40 rounded-full relative">
                <div className="absolute inset-0 m-auto w-[2px] h-[2px] bg-blue-300/60 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="relative w-full h-full rounded-[3.1rem] overflow-hidden bg-background">
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
Iphone17ProMaxMockup.displayName = "Iphone17ProMaxMockup";

export const Iphone14ProMaxMockup = React.forwardRef<HTMLDivElement, MockupProps>(
  ({ children, src, videoSrc, className, ...props }, ref) => {
    return (
      <div 
        ref={ref}
        className={cn(
          "relative mx-auto w-[330px] h-[680px] rounded-[3.5rem] border-[4px] border-border bg-black flex-shrink-0",
          "ring-[8px] ring-muted",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[14px] top-[120px] w-[6px] h-[28px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[6px] h-[55px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[6px] h-[55px] bg-muted rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[190px] w-[6px] h-[80px] bg-muted rounded-r-md"></div>

        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-2 inset-x-0 mx-auto w-[110px] h-[32px] bg-black rounded-full z-20 flex justify-end items-center px-4 shadow-inner">
            <div className="w-[14px] h-[14px] bg-zinc-900 rounded-full flex items-center justify-center relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]">
               <div className="w-[6px] h-[6px] bg-blue-900/40 rounded-full relative">
                  <div className="absolute inset-0 m-auto w-[2px] h-[2px] bg-blue-300/60 rounded-full"></div>
               </div>
            </div>
          </div>

          <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-background">
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
          "relative mx-auto w-[330px] h-[680px] rounded-[3.5rem] border-[4px] border-border bg-black flex-shrink-0",
          "ring-[8px] ring-muted",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[14px] top-[120px] w-[6px] h-[28px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[170px] w-[6px] h-[55px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[240px] w-[6px] h-[55px] bg-muted rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[190px] w-[6px] h-[80px] bg-muted rounded-r-md"></div>

        <div className="relative w-full h-full rounded-[3.2rem] border-[10px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-0 inset-x-0 mx-auto w-[150px] h-[30px] bg-black rounded-b-3xl z-20 flex justify-center items-center gap-4">
            <div className="w-[40px] h-[6px] bg-zinc-900 rounded-full"></div>
            <div className="w-[12px] h-[12px] bg-blue-900/40 rounded-full relative shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
               <div className="w-[4px] h-[4px] bg-blue-300/60 rounded-full"></div>
            </div>
          </div>

          <div className="relative w-full h-full rounded-[2.6rem] overflow-hidden bg-background">
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
          "relative mx-auto w-[280px] h-[580px] rounded-[2.5rem] border-[4px] border-border bg-black flex-shrink-0",
          "ring-[6px] ring-muted",
          className
        )}
        {...props}
      >
        <div className="absolute -left-[10px] top-[80px] w-[4px] h-[24px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[130px] w-[4px] h-[24px] bg-muted rounded-l-md"></div>
        <div className="absolute -left-[10px] top-[170px] w-[4px] h-[24px] bg-muted rounded-l-md"></div>
        <div className="absolute top-[10px] right-[50px] w-[40px] h-[4px] bg-muted rounded-t-md"></div>

        <div className="relative w-full h-full rounded-[2.2rem] border-[4px] border-black bg-black overflow-hidden z-10 flex flex-col justify-between">
          <div className="w-full h-[75px] bg-black flex justify-center items-center gap-3 relative shrink-0">
             <div className="w-[8px] h-[8px] bg-zinc-900 rounded-full border border-zinc-800 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)]"></div>
             <div className="w-[45px] h-[6px] bg-zinc-800 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full bg-background overflow-hidden">
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
          "relative mx-auto w-[330px] h-[700px] rounded-2xl border-[3px] border-foreground/25 bg-black flex-shrink-0",
          "ring-[4px] ring-muted",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[7px] top-[150px] w-[4px] h-[40px] bg-foreground/25 rounded-r-md"></div>
        <div className="absolute -right-[7px] top-[220px] w-[4px] h-[80px] bg-foreground/25 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[0.85rem] border-[6px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[8px] inset-x-0 mx-auto w-[14px] h-[14px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[5px] h-[5px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[0.5rem] overflow-hidden bg-background">
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
          "relative mx-auto w-[320px] h-[670px] rounded-[3rem] border-[4px] border-foreground/20 bg-black flex-shrink-0",
          "ring-[6px] ring-muted shadow-2xl",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[10px] top-[180px] w-[6px] h-[50px] bg-foreground/20 rounded-r-md"></div>
        <div className="absolute -right-[10px] top-[260px] w-[6px] h-[100px] bg-foreground/20 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[2.75rem] border-[8px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[12px] inset-x-0 mx-auto w-[16px] h-[16px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[6px] h-[6px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[2.2rem] overflow-hidden bg-background">
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
          "relative mx-auto w-[330px] h-[690px] rounded-[2.5rem] border-[3px] border-foreground/20 bg-black flex-shrink-0",
          "ring-[5px] ring-muted shadow-2xl",
          className
        )}
        {...props}
      >
        <div className="absolute -right-[8px] top-[170px] w-[5px] h-[50px] bg-foreground/20 rounded-r-md"></div>
        <div className="absolute -right-[8px] top-[240px] w-[5px] h-[100px] bg-foreground/20 rounded-r-md"></div>
        
        <div className="relative w-full h-full rounded-[2.3rem] border-[6px] border-black bg-black overflow-hidden z-10">
          <div className="absolute top-[10px] inset-x-0 mx-auto w-[14px] h-[14px] bg-zinc-950 rounded-full z-20 shadow-[inset_0_0_2px_rgba(255,255,255,0.1)] flex items-center justify-center">
            <div className="w-[5px] h-[5px] bg-blue-900/60 rounded-full"></div>
          </div>
          
          <div className="relative w-full h-full rounded-[1.9rem] overflow-hidden bg-background">
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
