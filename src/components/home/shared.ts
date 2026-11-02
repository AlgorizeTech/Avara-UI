/* ═══════════════════════════════════════════════
   SHARED TYPE RAMP
   One set of classes per role so every section reads the same. Colours are
   an opacity ladder on the theme's ink (`text-foreground/NN`) rather than
   separate greys, so the theme customizer re-skins the page with the rest
   of the site.
   ═══════════════════════════════════════════════ */

export const SECTION_INNER = "max-w-[1160px] mx-auto px-5 md:px-10";
export const SECTION_EYEBROW =
	"inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/30 mb-3";
export const SECTION_H2 =
	"font-serif font-normal text-[clamp(26px,3.6vw,46px)] leading-[1.15] tracking-[-0.02em] text-foreground mb-3";
export const SECTION_SUB =
	"text-[15px] leading-[1.65] text-foreground/45 max-w-[490px]";
export const CARD_TITLE =
	" text-[16px] lg:text-[18px] font-semibold text-foreground mb-[7px]";
export const CARD_COPY = "text-[13px] leading-[1.65] text-foreground/45";
export const CARD_SURFACE = "border border-foreground/[0.06] bg-card";
export const EYEBROW_PILL =
	"inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] backdrop-blur px-3 py-1 text-[12px] text-foreground/90";
export const CHIP =
	"shrink-0 whitespace-nowrap text-[9px] font-bold uppercase tracking-wider leading-none px-1.5 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/30";
export const BTN_CLAY =
	"inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background text-[14px] font-semibold tracking-[0.3px] px-7 py-3 hover:bg-foreground/90 transition-colors";
export const BTN_SOFT =
	"inline-flex items-center justify-center gap-2 rounded-full bg-foreground/[0.04] hover:bg-foreground/10 text-foreground text-[14px] font-medium px-7 py-3 transition-colors";
