"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React, { useState } from "react";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Button } from "@/components/custom/ui/button";
import { 
  Iphone14ProMaxMockup, 
  Iphone12ProMaxMockup, 
  Iphone5Mockup, 
  SamsungS24UltraMockup,
  GooglePixel8Mockup,
  GooglePixel10Mockup
} from "@/components/custom/blocks/MobileMockupBlock";


const COMPONENT_IPHONE14 = `import React from "react";
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
Iphone14ProMaxMockup.displayName = "Iphone14ProMaxMockup";`;

const COMPONENT_IPHONE12 = `import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

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
Iphone12ProMaxMockup.displayName = "Iphone12ProMaxMockup";`;

const COMPONENT_IPHONE5 = `import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

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
Iphone5Mockup.displayName = "Iphone5Mockup";`;

const COMPONENT_SAMSUNG = `import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

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
SamsungS24UltraMockup.displayName = "SamsungS24UltraMockup";`;

const COMPONENT_PIXEL8 = `import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

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
GooglePixel8Mockup.displayName = "GooglePixel8Mockup";`;

const COMPONENT_PIXEL10 = `import React from "react";
import { cn } from "@/lib/utils";

export interface MockupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  src?: string;
  videoSrc?: string;
}

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
GooglePixel10Mockup.displayName = "GooglePixel10Mockup";`;

// ---------------- IPHONE 14 PRO MAX ---------------- //
const IPHONE14_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { Iphone14ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <Iphone14ProMaxMockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </Iphone14ProMaxMockup>
    </div>
  );
}`;

// ---------------- IPHONE 12 PRO MAX ---------------- //
const IPHONE12_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { Iphone12ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <Iphone12ProMaxMockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </Iphone12ProMaxMockup>
    </div>
  );
}`;

// ---------------- IPHONE 5 ---------------- //
const IPHONE5_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { Iphone5Mockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <Iphone5Mockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </Iphone5Mockup>
    </div>
  );
}`;

// ---------------- SAMSUNG S24 ULTRA ---------------- //
const SAMSUNG_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { SamsungS24UltraMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <SamsungS24UltraMockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </SamsungS24UltraMockup>
    </div>
  );
}`;

// ---------------- GOOGLE PIXEL 8 ---------------- //
const PIXEL8_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { GooglePixel8Mockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <GooglePixel8Mockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </GooglePixel8Mockup>
    </div>
  );
}`;

// ---------------- GOOGLE PIXEL 10 ---------------- //
const PIXEL10_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import React from "react";
import { GooglePixel10Mockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function AppShowcasePage() {
  return (
    <div className="flex justify-center p-8">
        <GooglePixel10Mockup>
            <img 
              src="/assets/mockups/dashboard_light.png" 
              alt="Light Dashboard" 
              className="dark:hidden w-full h-full object-cover" 
            />
            <img 
              src="/assets/mockups/dashboard_dark.png" 
              alt="Dark Dashboard" 
              className="hidden dark:block w-full h-full object-cover" 
            />
        </GooglePixel10Mockup>
    </div>
  );
}`;


export function MobileMockupShowcase() {
  const [activeDevice, setActiveDevice] = useState<"iphone5" | "iphone12" | "iphone14" | "samsung" | "pixel8" | "pixel10">("iphone5");

  const getCurrentCode = () => {
    switch (activeDevice) {
      case "iphone5": return IPHONE5_TS;
      case "iphone12": return IPHONE12_TS;
      case "iphone14": return IPHONE14_TS;
      case "samsung": return SAMSUNG_TS;
      case "pixel8": return PIXEL8_TS;
      case "pixel10": return PIXEL10_TS;
    }
  };

  const getComponentName = () => {
    switch (activeDevice) {
      case "iphone5": return "Iphone5Mockup";
      case "iphone12": return "Iphone12ProMaxMockup";
      case "iphone14": return "Iphone14ProMaxMockup";
      case "samsung": return "SamsungS24UltraMockup";
      case "pixel8": return "GooglePixel8Mockup";
      case "pixel10": return "GooglePixel10Mockup";
    }
  };

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("mobile-mockup-change", {
          detail: { componentName: getComponentName() },
        })
      );
    }
  }, [activeDevice]);

  const renderMockup = () => {
    switch (activeDevice) {
      case "iphone5":
        return (
          <Iphone5Mockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </Iphone5Mockup>
        );
      case "iphone12":
        return (
          <Iphone12ProMaxMockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </Iphone12ProMaxMockup>
        );
      case "iphone14":
        return (
          <Iphone14ProMaxMockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </Iphone14ProMaxMockup>
        );
      case "samsung":
        return (
          <SamsungS24UltraMockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </SamsungS24UltraMockup>
        );
      case "pixel8":
        return (
          <GooglePixel8Mockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </GooglePixel8Mockup>
        );
      case "pixel10":
        return (
          <GooglePixel10Mockup>
             <img src="/assets/mockups/dashboard_light.png" alt="Light Dashboard" className="dark:hidden w-full h-full object-cover" />
             <img src="/assets/mockups/dashboard_dark.png" alt="Dark Dashboard" className="hidden dark:block w-full h-full object-cover" />
          </GooglePixel10Mockup>
        );
    }
  };

  const currentCode = getCurrentCode();

  const getComponentCode = () => {
    switch (activeDevice) {
      case "iphone5": return COMPONENT_IPHONE5;
      case "iphone12": return COMPONENT_IPHONE12;
      case "iphone14": return COMPONENT_IPHONE14;
      case "samsung": return COMPONENT_SAMSUNG;
      case "pixel8": return COMPONENT_PIXEL8;
      case "pixel10": return COMPONENT_PIXEL10;
      default: return COMPONENT_IPHONE14;
    }
  };


  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Control Panel / Tabs */}
      <ShowcaseControlPanel className="flex flex-col sm:flex-row gap-6 p-4 rounded-xl flex-wrap">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Device Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5 flex-wrap gap-1">
            {[
              { id: "iphone5", label: "iPhone 5" },
              { id: "iphone12", label: "iPhone 12 Pro Max" },
              { id: "iphone14", label: "iPhone 14 Pro Max" },
              { id: "samsung", label: "Samsung S24 Ultra" },
              { id: "pixel8", label: "Google Pixel 8" },
              { id: "pixel10", label: "Google Pixel 10" }
            ].map((v) => (
              <button
                key={v.id}
                onClick={() => setActiveDevice(v.id as any)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all cursor-pointer ${
                  activeDevice === v.id
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* Dynamic Component Preview */}
      <ComponentPreview 
        tsCode={getComponentCode()} 
        jsCode={getComponentCode()}
        usageCode={currentCode}
        jsUsageCode={currentCode}
        name={getComponentName()}
      >
        <div className="flex items-center justify-center w-full min-h-[750px] p-8">
          {renderMockup()}
        </div>
      </ComponentPreview>
    </div>
  );
}
