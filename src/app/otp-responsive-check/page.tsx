"use client";

import { OtpInputBlock } from "@/components/custom/blocks/OtpInputBlock";

export default function OtpResponsiveCheck() {
  return (
    <div className="flex flex-col gap-8 p-4">
      {(["default", "filled", "underlined"] as const).map((variant) =>
        [4, 6, 8].map((len) => (
          <div key={`${variant}-${len}`} className="flex flex-col items-center gap-4">
            <span>
              {variant} / {len} digits
            </span>
            <div className="w-full max-w-sm">
              <OtpInputBlock
                length={len}
                variant={variant}
                data-test={`sm-${variant}-${len}`}
              />
            </div>
            <div className="w-[288px]">
              <OtpInputBlock
                length={len}
                variant={variant}
                data-test={`xs-${variant}-${len}`}
              />
            </div>
          </div>
        )),
      )}
    </div>
  );
}
