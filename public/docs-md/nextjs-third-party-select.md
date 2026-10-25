export const metadata = docsPageMetadata("third-party/select", {
  title: "Select",
  description: `Integrate react-select with Avara UI — unstyled plus classNames, so a searchable multi-select matches your Input exactly.`
});

# Select

react-select is what people usually mean when they ask for "Select2 in React":
searchable, multi-select, async loading, creatable options, grouped menus, and a
combobox that is keyboard- and screen-reader-correct out of the box.

Avara UI ships its own Select for the ordinary
case. Reach for react-select when you need the search, the async loading or the
tag input — and then make it look like everything else.

## Unstyled, then repainted

The whole integration is two props. `unstyled` switches off every emotion style
react-select injects, leaving a fully accessible but visually blank combobox.
`classNames` then paints each internal slot with Tailwind classes, so the control
ends up matching Input exactly — with no CSS
overrides and no specificity fights.

export const usageSelect = `import { useState } from "react";

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
 * \`unstyled\` switches off every emotion style react-select injects, leaving a
 * fully accessible but visually blank combobox. \`classNames\` then paints each
 * internal slot with Tailwind classes — so the control ends up matching the
 * \`Input\` and \`SelectBlock\` components exactly, with no CSS overrides and no
 * specificity fights.
 */
function createClassNames(): ClassNamesConfig
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
 * Built once per selection mode. react-select infers \`IsMulti\` from the
 * \`isMulti\` prop, and a single \`boolean\`-typed config would widen \`onChange\`
 * to "one option or many" at every call site.
 */
const singleClassNames = createClassNames();
const multiClassNames = createClassNames();

/**
 * Option renderers are plain components, so the hint line and the tick are
 * ours. Note the inner wrapper: even under \`unstyled\`, react-select keeps a
 * few functional emotion rules on the option element itself — one of them
 * sets \`display: block\` — so lay the row out one level in rather than
 * fighting the cascade with \`!flex\`.
 */
const Option_ = (props: OptionProps>) => (

        {props.data.label}
        {props.data.hint && (
          {props.data.hint}
        )}
      
      {props.isSelected && }

);

export default function ReactSelectThemed() {
  const [framework, setFramework] = useState(frameworks[0]);
  const [deployRegions, setDeployRegions] = useState([regions[0], regions[1]]);

  return (

        Deployment target
        react-select, unstyled and repainted with design tokens

            Framework

            Regions

            Chips reuse the same geometry as the Badge component.

          Deploying to
          {deployRegions.length === 0 && (
            nowhere yet
          )}
          {deployRegions.map((region) => (
            
              {region.label}
            
          ))}

  );
}`;

` points at. `id` lands on the wrapper, not the input, so a label wired to it does nothing.',
        },
      ],
      usage: usageSelect,
      code: extractCode("src/components/custom/blocks/SelectBlock.tsx"),
    },
  ]}
/>

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

## Two things that will bite

**A `boolean`-typed `classNames` config widens `onChange` everywhere.** react-select
infers `IsMulti` from the `isMulti` prop, and a config annotated
`ClassNamesConfig` drags that `boolean` back into the
component's own inference — so `onChange` starts handing you "one option or
many" at every call site. Build the config from a small generic factory instead
and instantiate it once per mode, as the snippet does.

**`unstyled` is not quite total.** A few functional emotion rules survive, and one
of them sets `display: block` on the option element. Laying a row out with
`flex` in the `option` classNames therefore does nothing. Put the layout one
level in, inside your own wrapper element, rather than reaching for `!flex`.

## Going further

Everything below is the same `classNames` config with a different entry point:

        Need
        Import

        Options loaded from an API as you type
        {'AsyncSelect'} from {'react-select/async'}

        Let people add options that do not exist
        {'CreatableSelect'} from {'react-select/creatable'}

        Both
        {'AsyncCreatableSelect'} from {'react-select/async-creatable'}

Each takes the same `unstyled`, `classNames` and `components` props, so the
styling above carries over unchanged — only the data source differs.

For a plain dropdown with no search and no tags, the built-in
Select is smaller and needs no configuration.

---

**Component Path:** `[framework]\third-party\select\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
