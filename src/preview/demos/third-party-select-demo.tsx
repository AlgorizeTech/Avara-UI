"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useState } from "react";
import Select, {
  components,
  type ClassNamesConfig,
  type GroupBase,
  type OptionProps,
} from "react-select";
import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Badge } from "@/components/custom/ui/badge";
import { cn } from "@/lib/utils";
import { accentStyle } from "@/lib/accent";

type Option = { value: string; label: string; hint?: string };

const frameworks: Option[] = [
  { value: "next", label: "Next.js", hint: "App Router" },
  { value: "vite", label: "React + Vite", hint: "SPA" },
  { value: "remix", label: "React Router", hint: "Framework mode" },
  { value: "astro", label: "Astro", hint: "Islands" },
  { value: "expo", label: "Expo", hint: "React Native" },
];

const regions: Option[] = [
  { value: "iad", label: "Washington, D.C." },
  { value: "fra", label: "Frankfurt" },
  { value: "sin", label: "Singapore" },
  { value: "gru", label: "São Paulo" },
  { value: "syd", label: "Sydney" },
];

/**
 * `unstyled` switches off every emotion style react-select injects, leaving a
 * fully accessible but visually blank combobox. `classNames` then paints each
 * internal slot with Tailwind classes — so the control ends up matching the
 * `Input` and `SelectBlock` components exactly, with no CSS overrides and no
 * specificity fights.
 */
function createClassNames<IsMulti extends boolean>(): ClassNamesConfig<
  Option,
  IsMulti,
  GroupBase<Option>
> {
  return {
    control: ({ isFocused, isDisabled }) =>
      cn(
        "min-h-9 rounded-md border bg-background px-3 py-1 text-sm transition-colors !cursor-pointer cursor-pointer",
        isFocused ? "border-primary ring-2 ring-primary/30" : "border-border hover:border-primary/50",
        isDisabled && "!cursor-not-allowed opacity-50",
      ),
    valueContainer: () => "gap-1 py-0.5 !cursor-pointer cursor-pointer",
    placeholder: () => "text-muted-foreground !cursor-pointer cursor-pointer select-none",
    singleValue: () => "text-foreground !cursor-pointer cursor-pointer select-none",
    input: () => "text-foreground [&_input:focus]:ring-0 [&_input]:!cursor-pointer [&_input]:cursor-pointer",
    indicatorSeparator: () => "bg-border",
    dropdownIndicator: () => "text-muted-foreground px-1 hover:text-primary transition-colors !cursor-pointer cursor-pointer",
    clearIndicator: () => "text-muted-foreground px-1 hover:text-primary transition-colors !cursor-pointer cursor-pointer",
    menu: () =>
      "mt-2 overflow-hidden rounded-md border border-border bg-popover shadow-lg",
    menuList: () => "p-1",
    option: ({ isFocused, isSelected, isDisabled }) =>
      cn(
        "!cursor-pointer cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm transition-colors",
        isDisabled && "!cursor-not-allowed opacity-50",
        isSelected
          ? cn("bg-primary/15 font-medium text-primary", isFocused && "bg-primary/25")
          : isFocused
            ? "bg-primary/10 text-primary"
            : "text-foreground",
      ),
    noOptionsMessage: () => "py-6 text-center text-sm text-muted-foreground select-none",
    multiValue: () =>
      "items-center gap-1 rounded-sm border border-primary/20 bg-primary/10 px-1.5 py-0.5 text-xs text-primary",
    multiValueLabel: () => "text-primary font-medium select-none",
    multiValueRemove: () =>
      "rounded-sm text-primary/70 hover:bg-primary/20 hover:text-primary transition-colors !cursor-pointer cursor-pointer",
  };
}

/**
 * Built once per selection mode. react-select infers `IsMulti` from the
 * `isMulti` prop, and a single `boolean`-typed config would widen `onChange`
 * to "one option or many" at every call site.
 */
const singleClassNames = createClassNames<false>();
const multiClassNames = createClassNames<true>();

/**
 * Option renderers are plain components, so the hint line and the tick are
 * ours. Note the inner wrapper: even under `unstyled`, react-select keeps a
 * few functional emotion rules on the option element itself — one of them
 * sets `display: block` — so lay the row out one level in rather than
 * fighting the cascade with `!flex`.
 */
const Option_ = (props: OptionProps<Option, false, GroupBase<Option>>) => (
  <components.Option {...props} className={cn(props.className, "!cursor-pointer cursor-pointer select-none")}>
    <span className="flex w-full items-center justify-between gap-2 !cursor-pointer cursor-pointer select-none">
      <span className="flex flex-col !cursor-pointer cursor-pointer select-none">
        <span className="!cursor-pointer cursor-pointer">{props.data.label}</span>
        {props.data.hint && (
          <span className="text-xs text-muted-foreground !cursor-pointer cursor-pointer">{props.data.hint}</span>
        )}
      </span>
      {props.isSelected && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
    </span>
  </components.Option>
);

export default function ReactSelectThemed({ color }: { color?: string } = {}) {
  const [framework, setFramework] = useState<Option | null>(frameworks[0]);
  const [deployRegions, setDeployRegions] = useState<readonly Option[]>([regions[0], regions[1]]);

  return (
    <Card className="w-full max-w-lg" style={accentStyle(color)}>
      <CardHeader>
        <CardTitle>Deployment target</CardTitle>
        <CardDescription>react-select, unstyled and repainted with design tokens</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-5 pb-6">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="framework" className="text-sm font-medium text-foreground">
            Framework
          </label>
          <Select
            inputId="framework"
            unstyled
            isClearable
            options={frameworks}
            value={framework}
            onChange={setFramework}
            classNames={singleClassNames}
            components={{ Option: Option_ }}
            placeholder="Pick a framework…"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="regions" className="text-sm font-medium text-foreground">
            Regions
          </label>
          <Select
            inputId="regions"
            unstyled
            isMulti
            closeMenuOnSelect={false}
            options={regions}
            value={deployRegions}
            onChange={setDeployRegions}
            classNames={multiClassNames}
            placeholder="Select one or more…"
          />
          <p className="text-xs text-muted-foreground">
            Chips reuse the same geometry as the Badge component.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Deploying to</span>
          {deployRegions.length === 0 && (
            <span className="text-xs text-muted-foreground">nowhere yet</span>
          )}
          {deployRegions.map((region) => (
            <Badge
              key={region.value}
              variant="outline"
              className="border-primary/25 bg-primary/10 text-primary font-medium"
            >
              {region.label}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
