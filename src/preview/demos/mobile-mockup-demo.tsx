"use client";

import {
  Iphone14ProMaxMockup,
  Iphone12ProMaxMockup,
  Iphone5Mockup,
  SamsungS24UltraMockup,
  GooglePixel8Mockup,
  GooglePixel10Mockup,
} from "@/components/custom/blocks/MobileMockupBlock";

export default function MobileMockupDemo({
  activeDevice = "iphone5",
}: {
  activeDevice?: "iphone5" | "iphone12" | "iphone14" | "samsung" | "pixel8" | "pixel10";
}) {
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

  return (
    <div className="flex items-center justify-center w-full min-h-[750px] p-8">
      {renderMockup()}
    </div>
  );
}
