"use client";

import MultiSelect, {
  type MultiSelectOption,
  type MultiSelectValue,
} from "@/components/custom/ui/multi-select";
import { useThemeContext } from "@/contexts/theme-context";
import { loadGoogleFont, useGoogleFonts } from "@/hooks/use-google-fonts";

export function FontFamilyControl() {
  const { fontFamily, setFontFamily } = useThemeContext();
  const { fonts, isLoading } = useGoogleFonts();

  const handleFontChange = (selected: MultiSelectValue) => {
    if (!selected || Array.isArray(selected)) return;
    const selectedFont = selected.value || selected.label;
    setFontFamily(selectedFont);
    loadGoogleFont(selectedFont);
    // Set on <body>: docs project applies `inter.className` to body, whose class
    // selector outranks an inline font-family on <html>. Inline style on body wins.
    document.body.style.fontFamily = `"${selectedFont}", sans-serif`;
    localStorage.setItem("fontFamily", selectedFont);
  };

  const currentValue: MultiSelectOption | null = fontFamily
    ? { value: fontFamily, label: fontFamily }
    : null;

  return (
    <div className="w-full space-y-2.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
        Font Family
      </span>
      <MultiSelect
        options={fonts}
        value={currentValue}
        onChange={handleFontChange}
        placeholder="Select font family..."
        isClearable={true}
        isMulti={false}
        className="w-full text-xs"
        portal={false}
        loading={isLoading}
      />
    </div>
  );
}
