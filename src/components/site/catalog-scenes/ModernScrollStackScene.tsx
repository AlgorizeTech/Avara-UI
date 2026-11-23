"use client";

import { DEFAULT_MODERN_SCROLL_STACK_ITEMS } from "@/components/custom/blocks/ModernScrollStackBlock";

// The component's own cards, at the angles they settle at once the stack has
// locked in, laid out as a fan so one still frame shows what scrolling does.
const TILT = [-9, -3, 3, 9];

/**
 * The Modern Scroll Stack catalog card's scene. The real component rests on an
 * empty block until it is scrolled, which a card cannot do, so this shows the
 * cards it stacks, fanned out in the settled state.
 */
export default function ModernScrollStackScene() {
  return (
    <div className="flex w-full flex-col items-center gap-5 px-6 py-6">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#E85A34]">
          What we do
        </span>
        <h2 className="text-[26px] font-bold leading-tight tracking-[-0.02em] text-foreground">
          Cards that stack as you scroll
        </h2>
      </div>
      <div className="flex items-center justify-center pb-3">
        {DEFAULT_MODERN_SCROLL_STACK_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className="flex h-[230px] w-[190px] shrink-0 flex-col justify-between rounded-[14px] p-4 shadow-lg"
            style={{
              backgroundColor: item.bgColor,
              color: item.textColor,
              marginLeft: index === 0 ? 0 : -18,
              transform: `rotate(${TILT[index]}deg) translateY(${Math.abs(TILT[index]) > 5 ? 10 : 0}px)`,
              zIndex: index + 1,
            }}>
            <div className="origin-top-left scale-[0.8]">{item.icon}</div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[17px] font-semibold leading-tight tracking-[-0.01em]">
                {item.title}
              </h3>
              <p className="text-[11px] leading-snug opacity-75">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
