"use client";

import { useMemo } from "react";
import MultiSelect, {
  type MultiSelectOption,
  type MultiSelectValue,
} from "@/components/custom/ui/multi-select";
import { DEFAULT_FONT_FAMILY, useThemeContext } from "@/contexts/theme-context";
import {
  applyFontFamily,
  clearFontFamily,
  FONT_FAMILY_STORAGE_KEY,
  useGoogleFonts,
} from "@/hooks/use-google-fonts";

// Pinned to the top so the reader can get back to the site default without a
// full theme reset (it is also somewhere in the Google list, but not findable
// without scrolling).
const DEFAULT_OPTION: MultiSelectOption = {
  value: DEFAULT_FONT_FAMILY,
  label: `${DEFAULT_FONT_FAMILY} (Default)`,
};

export function FontFamilyControl() {
  const { fontFamily, setFontFamily } = useThemeContext();
  const { fonts, isLoading } = useGoogleFonts();

  const options = useMemo(() => [DEFAULT_OPTION, ...fonts], [fonts]);

  const handleFontChange = (selected: MultiSelectValue) => {
    if (Array.isArray(selected)) return;
    const selectedFont = selected ? selected.value || selected.label : null;

    // Clearing the field or picking the pinned option both mean "back to default".
    if (!selectedFont || selectedFont === DEFAULT_FONT_FAMILY) {
      setFontFamily(DEFAULT_FONT_FAMILY);
      clearFontFamily();
      localStorage.removeItem(FONT_FAMILY_STORAGE_KEY);
      return;
    }

    setFontFamily(selectedFont);
    applyFontFamily(selectedFont);
    localStorage.setItem(FONT_FAMILY_STORAGE_KEY, selectedFont);
  };

  const currentValue: MultiSelectOption =
    fontFamily === DEFAULT_FONT_FAMILY
      ? DEFAULT_OPTION
      : { value: fontFamily, label: fontFamily };

  return (
    <div className="w-full space-y-2.5">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">
        Font Family
      </span>
      <MultiSelect
        options={options}
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
