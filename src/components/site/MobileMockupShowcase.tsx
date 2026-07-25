"use client";

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

// ---------------- IPHONE 14 PRO MAX ---------------- //
const IPHONE14_TS = `"use client";
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

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Control Panel / Tabs */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
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
      </div>

      {/* Dynamic Component Preview */}
      <ComponentPreview 
        tsCode={currentCode} 
        jsCode={currentCode}
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
