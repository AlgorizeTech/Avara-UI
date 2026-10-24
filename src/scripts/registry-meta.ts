/**
 * Human-authored registry metadata.
 *
 * generate-registry.ts derives everything mechanical (names, file paths,
 * dependencies, targets) by parsing the source. It CANNOT derive prose.
 * Description, categories and post-install notes live here.
 *
 * Keys are the generated item name (kebab-case). Anything absent falls back to
 * a placeholder and is reported by `npm run generate:registry` so the gap is
 * visible rather than silently shipped.
 */

export type ItemMeta = {
  /**
   * Overrides the title derived from the item name. Only needed when
   * kebab-to-title-case gets it wrong in a way the acronym list in
   * generate-registry.ts does not already cover.
   */
  title?: string;
  /** One sentence, present tense: what it does and when you'd reach for it. */
  description: string;
  /** Controlled vocabulary — see CATEGORIES below. Do not invent new ones ad hoc. */
  categories: string[];
  /** Post-install notes: exports, gotchas, required setup. Shown after `shadcn add`. */
  docs?: string;
  /**
   * Registry items the documented usage needs but the component source does not
   * import, so they cannot be derived from the imports the way everything else
   * is. Without these, `shadcn add <item>` succeeds and the copied usage then
   * fails to resolve the module.
   *
   * Only for genuine usage dependencies. A component merely shown on the same
   * page (see `carousel`) gets its own Installation block instead.
   */
  usageDependencies?: string[];
};

/** The controlled category vocabulary. Adding a term here is a deliberate act. */
export const CATEGORIES = [
  "actions",
  "authentication",
  "code",
  "commerce",
  "communication",
  "data-display",
  "dates",
  "feedback",
  "forms",
  "layout",
  "maps",
  "marketing",
  "media",
  "navigation",
  "overlays",
  "scroll",
  "typography",
  "utilities",
] as const;

/**
 * Name overrides where the mechanical kebab-case of the filename is wrong or
 * collides with another item.
 */
export const NAME_OVERRIDES: Record<string, string> = {
  // Filename → item name
  "ThreeDCarouselBlock.tsx": "carousel-3d",
  "UtilityBlocks.tsx": "utility",
  "Alerts.tsx": "alert",
  "CustomCodeBlock.tsx": "custom-code-block",
  "Ai-chat.tsx": "ai-chat",
  "Fleet-map.tsx": "fleet-map",
  "Pricing-plan.tsx": "pricing-plan",
  "Support-dashboard.tsx": "support-dashboard",
  "DesignComponentsFolder.tsx": "design-components-folder",
  "DesignFolderBox.tsx": "design-folder-box",
  "CounterSectionBlock.tsx": "counter-section",
  "WalletBlock.tsx": "wallet",
  "FAQSectionBlock.tsx": "faq-section",
  "ConfidentialFolderBlock.tsx": "confidential-folder",
  "SecureEnvelopeBlock.tsx": "secure-envelope",
  "ScrollSplitCardsBlock.tsx": "scroll-split-cards",
  "ErrorSectionBlock.tsx": "error-section",
  "NotFoundSectionBlock.tsx": "not-found-section",
  "DesignsToolkitBlock.tsx": "designs-toolkit",
};

export const META: Record<string, ItemMeta> = {
  "modern-scroll-stack": {
    title: "Modern Scroll Stack",
    description:
      "A sticky scroll-driven service cards stack where cards slide up from below with horizontal fan offsets and smoothly tilt into resting angles as they lock into place.",
    categories: ["scroll", "marketing", "data-display"],
    docs: "Named export: ModernScrollStack (also default export), DEFAULT_MODERN_SCROLL_STACK_ITEMS, ModernScrollStackItem, and ModernScrollStackProps.",
  },
  "not-found-section": {
    title: "Not Found Section",
    description:
      "A responsive, full-page 404 Hyperspace website section with ambient radial glow, masked cyber grid backdrop, animated compass indicator, and customizable shortcuts.",
    categories: ["marketing", "layout", "feedback"],
    docs: "Named export: NotFoundSection (also default export) and NotFoundSectionProps. Ready for drop-in use in Next.js not-found.tsx or standalone 404 routes.",
  },
  "error-section": {
    title: "Error Section",
    description:
      "A responsive, animated Cyberpunk Diagnostic Terminal Error Website Section with full Light and Dark mode adaptive styling, diagnostic monitors, and live stacktrace inspection.",
    categories: ["marketing", "layout", "feedback"],
    docs: "Named export: ErrorSection (also default export) and ErrorSectionProps. Designed to serve as a full-page 500, 404, or runtime error boundary with light & dark theme support, one-click incident copying, and reboot action triggers.",
  },
  "secure-envelope": {
    description:
      "An interactive classified security envelope & travel pass sleeve component featuring a secret card that glides out horizontally on hover and elevates gracefully onto the cover on click with 3D flip physics.",
    categories: ["data-display", "marketing", "actions"],
    docs: "Named export: SecureEnvelope (also ConfidentialFolder).",
  },
  "scroll-split-cards": {
    description:
      "A cinematic scroll-driven storytelling card component that splits a seamless panoramic image into three panels, expands gaps, flips 180° in 3D into editorial narratives, and glides away.",
    categories: ["scroll", "media", "marketing"],
    docs: "Named export: ScrollSplitCards.",
  },
  "confidential-folder": {
    description:
      "An interactive confidential folder sleeve with a card that slides out horizontally on hover and gracefully elevates on click.",
    categories: ["data-display", "marketing", "actions"],
    docs: "Named export: ConfidentialFolder, OrbitalSpirograph.",
  },
  "faq-section": {
    description:
      "A complete animated FAQ website section pairing an editorial header with a dynamic morphing nature photography canvas and an expandable question accordion.",
    categories: ["marketing", "layout"],
    docs: "Named export: FAQSection (also default export); AnimatedFAQBlock and the FAQItem type are also exported; the sample data FAQ_ITEMS lives in faq-section-data.ts, which installs alongside.",
  },
  "animated-faq": {
    description:
      "An FAQ section pairing an accordion of questions with a picture canvas that resizes and crossfades to each open answer. Use it for landing-page FAQs that should feel editorial rather than list-like.",
    categories: ["marketing", "layout"],
    docs: "Named export: AnimatedFAQBlock (also the default export); the sample data `FAQ_ITEMS` lives in animated-faq-data.ts, which installs alongside. All motion is CSS — no animation library.",
  },
  "animated-faq-visuals": {
    description:
      "Theme-adaptive interactive visual preview components (CLI terminal, token customizer, MIT license certificate, performance HUD) for animated FAQ sections.",
    categories: ["marketing", "data-display"],
    docs: "Exports: CLIInstallationVisual, ThemingVisual, LicensingVisual, PerformanceVisual.",
  },
  "card-stack": {
    description:
      "A layered deck of cards featuring fluid drag-to-discard gestures, button-driven directional slide animations, and realistic depth perspective.",
    categories: ["data-display", "marketing", "actions"],
    docs: "Named export: CardStack (also default). Accepts items, visibleCards, swipeToDismiss, canDismissLastCard, loop, showHeader, and showNavigation.",
  },
  wallet: {
    description:
      "An interactive fintech cardholder wallet component featuring 3 serially staggered cards, curved pocket scoop, bottom thumb cutout, and light/dark mode styling.",
    categories: ["data-display", "marketing", "actions"],
    docs: "Named export: Wallet. Accepts cards array, overallBalance, allowReveal, and autoRevealOnHover.",
  },
  dashboard: {
    description:
      "An admin dashboard home: greeting with all-time totals, a period switch, an overview chart with a tab per metric, activity feed, traffic sources, visitors by country and top authors. Three looks: classic, glass, and liquid-glass (using LiquidGlassWrapper, LiquidGlassBackground, and LiquidGlassSvgFilter).",
    categories: ["data-display", "layout"],
    docs: "Named exports: Dashboard (also the default) plus LiquidGlassWrapper, LiquidGlassBackground, LiquidGlassSvgFilter, and the DashboardMetric, DashboardPoint, DashboardTotal, DashboardActivity, DashboardShare, DashboardAuthor, DashboardPayment, DashboardShortcut, DashboardLinks, DashboardPeriod and DashboardVariant types. variant: 'classic' (default) | 'glass' | 'liquid-glass'; all read the same props, and glass/liquid-glass also read `payments`, `shortcuts`, `totals[].metric` / `href` and `activity[].person` / `avatar`. Every number comes from props: `metrics` carry a series per period (day | week | month, oldest first) and an optional `change` per period; `sources`, `countries` and `authors` are keyed by period; `activity` items have a type of user | post | payment | message. Pass `linkComponent` (e.g. next/link) for the panel links and `onExport` to replace the built-in CSV. Composes toggle-group (segmented), chart and popover. Clock-dependent text renders after mount, so server and client markup agree.",
  },
  "counter-section": {
    description:
      "A collection of 4 animated high-impact Counter and Stats Sections with viewport-triggered count-up easing, zero shadows, and full adaptive styling.",
    categories: ["marketing", "data-display"],
    docs: "Named export: CounterSection. Accepts variant ('cyber-hud' | 'minimal-slash' | 'halftone-cinema' | 'spotlight-gradient') and custom stats array with value, prefix, suffix, decimals, label, sublabel, and tag.",
  },
  globe: {
    description:
      "An interactive 3D WebGL globe visualization with location markers, arc curves, and rotation controls. Use it for global presence and location showcases.",
    categories: ["data-display", "marketing"],
  },
  "homepage-hero": {
    description:
      "A feature-rich hero section with animated typing text, interactive CLI copy badge, gradient action buttons, and feature list.",
    categories: ["marketing", "layout"],
  },
  "horizontal-rail": {
    description:
      "A horizontal sliding rail layout with smooth drag inertia, snapping cards, and navigation controls. Use it for showcasing products, media cards, or horizontal content.",
    categories: ["layout", "scroll", "media"],
  },
  // ---- Curated in Phase 3. Verified against source. ----
  button: {
    usageDependencies: ["icons"],
    description:
      "A button with variants, sizes, loading state, and a click ripple effect. Reach for it as the default action element anywhere in an interface.",
    categories: ["actions", "forms"],
    docs: "Default export. Supports variant (default | destructive | outline | secondary | ghost | link), size (sm | lg), and a `loading` prop. Ripple keyframes are injected into document.head on mount, so no Tailwind config or global CSS changes are needed.",
  },
  card: {
    usageDependencies: ["product-card"],
    description:
      "A composable surface with header, title, description, content, and footer slots. Use it to group related content into a bounded block.",
    categories: ["layout"],
    docs: "Named exports: Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter. Compose them rather than passing props to a single element.",
  },
  tooltip: {
    description:
      "A portal-rendered tooltip with fade and zoom entrance, positioned on hover or focus. Use it for short labels that clarify an unlabeled control.",
    categories: ["overlays"],
    docs: "Named exports: TooltipProvider, Tooltip, TooltipTrigger, TooltipContent. Requires the `animate-in`, `fade-in` and `zoom-in-95` utilities — on Tailwind v4 add `@import \"tw-animate-css\";` to your global stylesheet, on v3 use the `tailwindcss-animate` plugin. Content renders through a React portal at z-index 9999.",
  },
  skeleton: {
    description:
      "A loading placeholder with a pulse or shimmer sweep. Use it to hold layout space while content is still being fetched.",
    categories: ["feedback"],
    docs: "Shimmer keyframes ship inline in a scoped <style> block — no global CSS or Tailwind config changes required.",
  },
  "social-links": {
    description:
      "A row of brand marks that link out — X, GitHub, LinkedIn, YouTube, Instagram, Facebook, Discord, Dribbble, email. Use it in footers, profile cards and author bylines.",
    categories: ["navigation", "marketing"],
    docs: "Named export: SocialLinks (plus the SocialLink and SocialNetwork types). `links` is { network, href, label? }[]; `variant` is tile | outline | ghost, `size` is sm | md | lg. Links open in a new tab unless `external` is false; mailto links never do. Brand marks are inline SVG, so no icon package is needed.",
  },
  progress: {
    description:
      "A themeable progress bar in three forms — a single bar, a multi-segment track, and a ring — with an optional labelled field wrapper. Use it for determinate operations where percentage complete is known.",
    categories: ["feedback"],
    docs: "Named exports: Progress, ProgressField, MultiProgress, ProgressSegment, CircularProgress (getThemeStyles lives in progress-theme.ts, useCountUp in progress-hooks.ts; both install alongside). Use ProgressField when you need a label and value readout; use Progress bare inside your own layout. MultiProgress holds ProgressSegment children that share its `max`, each with its own `color`, for breakdowns across one track. CircularProgress draws the same value as a ring — `circleSize` is the diameter, `barSize` the stroke, and children replace the centred percentage (a function child receives the counting value). Everything fills from zero on mount and tweens later changes via the useCountUp hook; `animate={false}` opts out and `duration` sets the mount run.",
  },
  toggle: {
    description:
      "A two-state switch with controlled and uncontrolled modes. Use it for settings that apply immediately, rather than a checkbox in a submitted form.",
    categories: ["forms"],
    docs: "Named export: Toggle. Forwards a ref and accepts `checked` / `onCheckedChange` for controlled use, or `defaultChecked` for uncontrolled.",
  },
  "book-flip": {
    description:
      "An interactive 3D Book Flip / Leaf Carousel component simulating realistic book page turns, open spreads, spine folds, and bottom leaf navigation controls.",
    categories: ["data-display", "utilities"],
    docs: "Supports leaves array prop, controlled currentIndex, keyboard navigation, and custom aspect ratios.",
  },
  "product-card": {
    description:
      "A reusable, prop-driven E-commerce Product Card supporting color swatches, badges, ratings, quick view, and action buttons.",
    categories: ["data-display", "commerce"],
    docs: "Supports variant=('standard' | 'compact' | 'horizontal'), title, price, colors, badge, rating, onAddToCart, onBuyNow, and onQuickView.",
  },
  "range-date-picker": {
    description:
      "An interactive Range Date Picker featuring single month, dual-month, and rate-priced calendar layouts with customizable theme colors.",
    categories: ["forms", "utilities"],
    docs: "Named export: RangeDatePicker. Supports variant=('single' | 'dual' | 'priced-single' | 'priced-dual'), getPrice, color, value={from, to}, onChange, disablePast / minDate / maxDate. `showTime` adds Start / End time columns: the card opens as a bare calendar (empty when uncontrolled) and a time rail unfolds beside it on the first pick — under it when narrow — and folds away on Clear; `timeFormat` (12h | 24h) and `minuteStep` tune the columns. Installs time-picker alongside.",
  },
  "otp-input": {
    description:
      "A segmented one-time-passcode field with auto-advance, paste handling, and backspace navigation. Use it for email or SMS verification steps.",
    categories: ["forms", "authentication"],
    docs: "Pasting a full code into any cell distributes the digits across all cells.",
  },
  folder: {
    description:
      "A tactile folder — skeleton cards or your own photos tuck behind a frosted-glass pocket and fan out into an arc on hover. Use it for file groups, galleries and drag-and-drop upload targets.",
    categories: ["data-display"],
    docs: "Named exports: Folder, SkeletonCard (plus FolderFile / FolderProps types). `files` is { thumb?, name?, progress? }[]; without files, `peek` skeleton cards show. `color` tints body, pocket, icon and cards via OKLCH; `icon` is a lucide component. Hover, tap or focus opens the fan; past five files it pages with arrows or by dragging a card. `interactive` adds drag-and-drop + click-to-browse with `onFiles`, `progress` and `onRemoveFile`. Pulls in `tooltip` for file-name hovers.",
  },
  "conversation-timeline": {
    description:
      "A dense rail of thin marks, one per message, that expands into a labelled list on hover — a minimap for long chats. Use it beside a conversation to jump between messages.",
    categories: ["navigation", "communication"],
    docs: "Named export: ConversationTimeline (plus the TimelineCheckpoint type). `checkpoints` is `{ id, label, sublabel?, role? }[]`, `activeId` marks the selected row with `accent` and `onSelect` receives a clicked id. `side` puts labels left or right; `rowHeight` / `collapsedRowHeight` set the expanded and resting row sizes, `visibleCount` caps rows before scrolling and `labelWidth` fixes the label column. Hover or focus expands it; touch devices stay expanded; respects prefers-reduced-motion.",
  },
  "copy-button": {
    description:
      "A clipboard button that confirms the copy in place — the icon pops to a check and the label swaps to \"Copied!\" — plus a read-only Copy Field for links, tokens and commands. Use it anywhere a value needs to be copied without a toast.",
    categories: ["actions", "forms"],
    docs: "Named exports: CopyButton, CopyField; the useCopyToClipboard hook is exported from copy-button-hooks.ts, which installs alongside. `value` is the text copied; `label` / `copiedLabel` / `errorLabel` set the three states, `timeout` how long the confirmation lingers, `iconOnly` drops the label. Variants are solid | soft | outline | ghost, sizes sm | md | lg, `color` a preset or hex. CopyField wraps a read-only input with the button beside it (or `inset` inside it) and forwards `buttonProps`. Falls back to execCommand where the Clipboard API is unavailable.",
  },
  "time-picker": {
    description:
      "Scrollable hour / minute / AM-PM columns for choosing a time of day, with themed selection and disabled ranges. The building block behind the date pickers' time mode.",
    categories: ["dates", "forms"],
    docs: "Named export: TimePicker. The setTime, roundToStep and formatTime helpers live in time-picker-utils.ts, which installs alongside. `value` is a Date whose day is preserved on change; `format` is 12h | 24h, `minuteStep` sets granularity, and `minTime` / `maxTime` disable times outside a window on that day. Used by `date-picker` and `range-date-picker` when `showTime` is on.",
  },
  "selection-frame": {
    description:
      "That box Figma draws around a selected layer — corner handles and a crisp accent stroke — around any text span or block. Use it to spotlight a word, a card or a screenshot region in docs and marketing.",
    categories: ["typography"],
    docs: "Named export: SelectionFrame (also exports the FrameHandles and FrameLine types). Wrap any child; it is measured live with a ResizeObserver. `handles` is square | circle, `line` is solid | dashed | long, `dash` overrides the [dash, gap] pair, `animated` marches dashed/long strokes and pops the handles in, `color` is any CSS colour (Figma blue default), `radius` and `padding` are pixels, and `inline={false}` makes it block-level. Respects prefers-reduced-motion.",
  },
  "apple-select": {
    description:
      "An iOS-style text selection rendered from a fixed character range — translucent highlight with lollipop handles on either end. Use it in docs, tutorials and marketing copy to point at part of a sentence.",
    categories: ["typography"],
    docs: "Named export: AppleSelect. `text` is the full string and `selection` is a `[start, end]` character range (end exclusive, like String.slice) or an array of them for several phrases. The range is fixed by the author, not draggable. `color` takes any CSS colour, `handles={false}` drops the lollipops, and `animate` fades the highlight in on mount. Renders a <p> by default; `as=\"span\"` sets it inline inside your own paragraph. Other HTML attributes are forwarded to it.",
  },
  kbd: {
    description:
      "An inline keyboard-key badge for rendering shortcuts. Use it in menus, tooltips, and docs where a keystroke needs to look pressable.",
    categories: ["typography"],
    docs: "Compose several side by side for chords, e.g. <Kbd>Ctrl</Kbd> <Kbd>K</Kbd>.",
  },
  pagination: {
    description:
      "A page navigator with previous/next controls and truncated page ranges. Use it for paged tables and result lists.",
    categories: ["navigation"],
    docs: "Renders framework-agnostic buttons, not router links, so wire navigation through your own handler.",
  },
  marquee: {
    description:
      "A continuously scrolling row or column of content that loops seamlessly. Use it for logo walls and testimonial strips.",
    categories: ["data-display"],
    docs: "Duplicate the children set to keep the loop seamless; supports reverse and vertical orientations.",
  },

  // ---- Phase 4A: forms & input controls ----
  input: {
    description:
      "A text input with label, helper text, error state, icon slots and password reveal. Reach for it as the default field in any form.",
    categories: ["forms"],
    docs: "Named exports: InputBlock, getThemeStyles (from input-theme.ts, which installs alongside). Accepts type (text | password | email | number | file), variant (default | filled | underlined | glow), inputSize, and a color token (indigo | rose | emerald | zinc, or your own). Pass `error` to switch it into the invalid state; `helperText` renders below when there is no error.",
  },
  select: {
    description:
      "A searchable select with single or multiple selection, option groups and per-option icons. Use it when a native <select> cannot carry enough structure.",
    categories: ["forms"],
    docs: "Named exports: SelectBlock, getThemeStyles (from select-theme.ts, which installs alongside). `options` take { label, value, icon?, group? } — supplying `group` renders grouped headings. `value` accepts a string, or an array when multiple selection is enabled. Several other blocks depend on this one.",
  },
  form: {
    usageDependencies: ["input"],
    description:
      "Form scaffolding — wrapper, field, error and submit — with a shared color theme and a glitch error variant. Use it to keep field spacing and validation styling consistent across a form.",
    categories: ["forms"],
    docs: "Named exports: FormWrapper, FormField, FormError, FormSubmit, getThemeStyles (from form-theme.ts, which installs alongside). Layout and styling only — bring your own state, via react-hook-form or otherwise. FormSubmit takes `isSubmitting` to render its pending state.",
  },
  "date-picker": {
    description:
      "A single-date field with a popover calendar, typed entry and validation states. Use it for one-off dates such as a deadline or birth date.",
    categories: ["forms", "dates"],
    docs: "Named exports: DatePickerBlock, getThemeStyles (from date-picker-theme.ts, which installs alongside). Controlled via `value: Date | null` and `onChange`. Shares the variant, color and size vocabulary of the `input` item, so the two line up visually in the same form. For month grids or event display, use `calendar` instead.",
  },
  calendar: {
    description:
      "A full month calendar with event dots, range selection and a dashboard layout. Reach for it when dates need to be seen in context rather than just entered.",
    categories: ["dates"],
    docs: "Named exports: Calendar, CalendarDashboard, CalendarDayButton. Built on react-day-picker; variants are default | minimal | glass. `mockEvents` is a Record<string, string[]> keyed by date for the event dots. Pulls in `select` and `ui-button` as registry dependencies. For a plain date field, use `date-picker`.",
  },
  "toggle-group": {
    description:
      "A set of toggle buttons behaving as either radio group or checkbox group. Use it for view switches and filter bars where all options should stay visible.",
    categories: ["forms", "actions"],
    docs: "Named exports: ToggleGroup, ToggleGroupItem, getThemeStyles. Set `type` to single or multiple — `value` is a string for single, an array for multiple. Compose ToggleGroupItem children; the group passes theme and size down. `color` accepts primary (the theme token), indigo, rose, emerald, zinc or a hex. `variant=\"segmented\"` is a pill track whose highlight slides to the pressed item; a single segmented group keeps its choice when clicked again and moves it with the arrow keys.",
  },
  "ui-multi-select": {
    description:
      "A multi-select combobox with search, clearable chips, hierarchical options and optional portal rendering. Use it when users pick several values from a long list.",
    categories: ["forms", "utilities"],
    docs: "Named export: MultiSelect. Set `hierarchical` with nested `children` options for parent/child groups, and `portal` to escape a clipping overflow container. `isMulti` and `isClearable` are independent, so it also works as a searchable single select.",
  },
  upload: {
    description:
      "A drag-and-drop file dropzone with per-file progress, previews, retry and time-remaining. Use it for multi-file uploads where users need to watch each file land.",
    categories: ["forms", "feedback"],
    docs: "Named exports: Dropzone, UploadItem, formatBytes, formatTimeLeft. Dropzone handles the drop target and reports via `onFilesDrop`; render an UploadItem per file and drive its `status` and `progress` yourself. No transport is included — wire it to your own upload call.",
  },
  "half-stars": {
    description:
      "A star rating supporting half-star precision, in read-only or interactive mode. Use it for reviews and any score shown out of five.",
    categories: ["forms", "data-display"],
    docs: "Named export: HalfStars. Set `interactive` to let users pick a rating and `allowHalf` for half-star steps. `onHoverChange` fires during hover so you can preview the value before commit. Leave `interactive` off to render a static score.",
  },
  "heart-signal": {
    description:
      "A slow, ultra-smooth cardiac heart signal waveform component with 2 visual variants (realtime EKG line trace and fluid multi-lead cardiac wave).",
    categories: ["data-display", "media"],
    docs: "Named export: HeartSignal. Supports 2 smooth variants (ecg-line and cardiac-wave), live BPM telemetry badge, speed control, and active theme color integration.",
  },
  "squircle-carousel": {
    description:
      "Horizontal flowing carousel where images are masked behind a barrel-distorted grid of rounded cubes with snap physics and smooth inertia.",
    categories: ["media", "scroll"],
    docs: "Named export: SquircleCarousel. Interactive drag with grab cursor, momentum physics, barrel fisheye distortion, and squircle grid masking.",
  },
  "flow-gallery": {
    description:
      "Horizontal and diagonal 3D cascading gallery stream with continuous downward auto-flow motion, drag inertia physics, and isometric perspective depth.",
    categories: ["media", "scroll"],
    docs: "Named export: FlowGallery. Interactive drag with grab cursor, continuous downward auto-flow, 3D isometric plane, and Next Themes adaptation.",
  },
  stepper: {
    usageDependencies: ["select"],
    description:
      "A horizontal step indicator with icons and GSAP transitions between steps. Use it to show progress through a known, ordered sequence.",
    categories: ["navigation", "forms"],
    docs: "Named exports: Stepper, StepperContent. `steps` take { id, title, description?, icon?, content? }. Controlled via `currentStep` and `onStepChange` — the component displays progress but does not own it. For the full state machine, use `wizard`.",
  },
  "split-stepper": {
    description:
      "A two-column stepper with a sticky side panel and stacked cards that advance as you scroll. Use it for onboarding and feature walkthroughs on a landing page.",
    categories: ["navigation", "scroll", "marketing"],
    docs: "Named export: SplitStepper. `stickySide` places the pinned column left or right; `cardDepthScale` and `cardOffset` tune the stacked-card depth effect. Needs real page height to scroll through — it will look inert inside a short container.",
  },
  wizard: {
    description:
      "A multi-step form flow with context-driven navigation, progress bar and completion callback. Reach for it when a form is long enough to need splitting across steps.",
    categories: ["forms", "navigation"],
    docs: "Named exports: Wizard, WizardProgress, WizardContainer, WizardStep, WizardTitle, WizardDescription, useWizard. Wizard owns the step state; children read `currentStep`, `nextStep` and `prevStep` from the useWizard hook. `onComplete` fires on the final step. Unlike `stepper`, this manages navigation for you.",
  },
  "login-form": {
    description:
      "A sign-in form with social buttons, password reveal, remember-me and four layout variants. Use it as the entry point of an authenticated app.",
    categories: ["authentication", "forms"],
    docs: "Default export: LoginForm. Also exports getThemeStyles (from login-form-theme.ts, which installs alongside) and the LoginFormValues type. Fields and buttons are the library's input and button items, which install alongside it. `variant` is default | split | glass | minimal — split renders a gradient side panel. `onSubmit` receives the validated credentials; without it the form simulates a round trip. `signupHref` points at the matching `register-form` page. Validation is client-side presentation only — enforce it again on your server.",
  },
  "register-form": {
    description:
      "A sign-up form with paired name fields, password confirmation, a terms checkbox and four layout variants. Use it wherever new accounts are created.",
    categories: ["authentication", "forms"],
    docs: "Default export: RegisterForm. Also exports getThemeStyles (from register-form-theme.ts, which installs alongside) and the RegisterFormValues type. Fields and buttons are the library's input and button items, which install alongside it. `variant` is default | split | glass | minimal — split renders a gradient side panel. `onSubmit` receives the validated fields; without it the form simulates a round trip. `loginHref` points at the matching `login-form` page, and `minPasswordLength` sets the client-side minimum. Validation is client-side presentation only — enforce it again on your server.",
  },
  "signup-form": {
    description:
      "A standalone registration form with inline field validation and animated error states. Use it where sign-up is its own page rather than a tab beside sign-in.",
    categories: ["authentication", "forms"],
    docs: "Named export: SignupForm. Uses Motion for field-level error transitions. Validation is client-side presentation only — enforce it again on your server.",
  },
  "verify-badge": {
    description:
      "A small verified checkmark badge with an optional draw-in animation. Use it beside names and handles to mark a confirmed account.",
    categories: ["data-display"],
    docs: "Named export: VerifyBadge. Sizes are sm | md | lg | xl, `color` takes any CSS colour, and `animate` plays the check-draw on mount.",
  },
  settings: {
    description:
      "Pre-built settings panels for notification and security preferences, laid out as toggle rows. Use them as a starting point for an account settings page.",
    categories: ["forms", "layout"],
    docs: "Named exports: NotificationsBlock, SecurityBlock. These are self-contained example panels with their own local state and hardcoded labels — copy and adapt rather than configuring through props. Depends on `ui-base` for ComponentCard and ToggleSwitch.",
  },
  payment: {
    description:
      "A card payment form with number, expiry month/year selects and a simulated submit state. Use it as the checkout step in a commerce flow.",
    categories: ["commerce", "forms"],
    docs: "Named export: PaymentBlock. A self-contained example with hardcoded month and year options and a mocked submit — adapt it rather than configuring through props. Depends on `select` and `ui-base`. No payment provider is wired in; never handle raw card numbers without a PCI-compliant processor such as Stripe Elements.",
  },

  // ---- Phase 4B: navigation & structure ----
  accordion: {
    description:
      "A data-driven accordion taking an array of items, with five distinct variants and an optional stack entrance that deals the items into place. Use it for FAQs and any list of collapsible sections.",
    categories: ["layout"],
    docs: "Named export: Accordion. Pass `accordionData` as { value, title, icon?, content } — content accepts a string array or a node. `type` is single | multiple; set `collapsible` to let the last open section close. Variants: default (open row lifts out as a card) | bordered (rail on the open row) | filled (open row inverts to primary) | elevated (cards, open one on a ring) | ghost (type and hairlines). `animation=\"stack\"` piles the items and deals them out on scroll-in via the Web Animations API; skipped under reduced motion. Wraps the `ui-accordion` Radix primitive. For a single section, `collapsible` is lighter.",
  },
  breadcrumb: {
    description:
      "A breadcrumb trail with per-item icons and automatic collapsing when the path is long. Use it to show position in a deep hierarchy.",
    categories: ["navigation"],
    docs: "Named exports: BreadcrumbBlock, getThemeStyles (from breadcrumb-theme.ts, which installs alongside). `items` take { label, href?, icon? }; `maxItems` collapses the middle into an ellipsis past that count. Separator styles: classic | slash | solid | ghost. Renders next/link, so it needs edits outside Next.js.",
  },
  "navigation-menu": {
    description:
      "A horizontal navigation bar with dropdown panels and a sliding active indicator. Use it for primary site navigation with grouped links.",
    categories: ["navigation"],
    docs: "Named exports: NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, getThemeStyles (from navigation-menu-theme.ts, which installs alongside). Compose the parts; the root tracks active and hovered state and animates the indicator between triggers. Variants: default | minimal | glass.",
  },
  menubar: {
    description:
      "A desktop-style menu bar with click-to-open menus, separators and keyboard navigation. Use it for application chrome rather than website navigation.",
    categories: ["navigation"],
    docs: "Named exports: Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator. Once a menu is open, hovering another trigger switches to it — the File/Edit/View behaviour of a native app.",
  },
  sidebar: {
    description:
      "A collapsible application sidebar with grouped items, brand header, footer and a mobile drawer. Use it as the primary shell for a dashboard.",
    categories: ["navigation", "layout"],
    docs: "Named exports: SidebarProvider, Sidebar, SidebarHeader, SidebarBrand, SidebarContent, SidebarGroup, SidebarFooter, useSidebar (from sidebar-context.ts, which installs alongside). Wrap your app in SidebarProvider; read `expanded` and `isMobileOpen` from useSidebar to drive your own toggle. Variants: attached | floating. Collapsed item labels show in the `tooltip` item, which installs alongside.",
  },
  navbar: {
    description:
      "A responsive marketing navbar with logo, links, mobile menu and GSAP entrance animation. Use it as the top bar of a landing page.",
    categories: ["navigation", "marketing"],
    docs: "Named exports: NavbarBlock, getThemeStyles (from navbar-theme.ts, which installs alongside). Variants: default | floating | centered | minimal | glass | ecommerce-mega-nav. Links render through `linkComponent` (a plain `a` by default; pass next/link in Next.js). The mobile menu toggles are the `button` item, which installs alongside. For app chrome with dropdown panels, use `navigation-menu`.",
  },
  command: {
    description:
      "A command palette with fuzzy search, grouped results and a dialog mode. Use it for the ⌘K quick-action menu in an application.",
    categories: ["navigation", "overlays"],
    docs: "Named exports: Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator. Use CommandDialog with `open` / `onOpenChange` for the overlay form, or Command inline. Set `shouldFilter` false to filter server-side yourself. Bind your own ⌘K listener — no global shortcut is registered for you.",
  },
  "context-menu": {
    description:
      "A right-click context menu that opens at the pointer, with items, separators and shortcut hints. Use it for secondary actions on a row or canvas object.",
    categories: ["overlays", "actions"],
    docs: "Named exports: ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut. The trigger suppresses the native browser menu inside its bounds. Positioned from pointer coordinates, so it opens where the user clicked rather than anchored to an element.",
  },
  collapsible: {
    description:
      "A minimal show/hide disclosure with controlled and uncontrolled modes. Use it for a single expandable region where a full accordion is overkill.",
    categories: ["layout"],
    docs: "Named exports: Collapsible, CollapsibleTrigger, CollapsibleContent. Use `defaultOpen` for uncontrolled, or `open` with `onOpenChange` to drive it yourself. For several linked sections, use `accordion`.",
  },
  "color-picker": {
    description:
      "An interactive 360° Color Spectrum Wheel and Color Palette component featuring 2D color picking, lightness & alpha sliders, format toggles (HEX, RGB, HSL), one-click copy, and EyeDropper API support.",
    categories: ["forms", "utilities"],
    docs: "Named export: ColorPicker. Pass `value` and `onChange`. Set `variant` to 'standalone' for full card or 'popover' for trigger dropdown. Supports `showPresets`, `showAlpha`, and `showEyeDropper`.",
  },
  piano: {
    description:
      "An interactive Playable Piano component featuring Web Audio API synthesizers, physical keyboard keybindings (A-S-D-F-G-H-J-K-L-; and W-E-T-Y-U-O-P), master volume slider, and toggleable key indicators.",
    categories: ["media", "utilities"],
    docs: "Named export: Piano. Supports `defaultVolume` (0 to 1), `defaultShowKeys` (boolean), and `className`. Synthesizes real acoustic piano notes using native Web Audio API.",
  },
  resizable: {
    description:
      "Draggable split panes in horizontal or vertical layout, with min and max size constraints. Use it for editor and preview layouts users can rebalance.",
    categories: ["layout"],
    docs: "Named exports: ResizablePanelGroup, ResizablePanel, ResizableHandle. Sizes are percentages — `defaultSize`, `minSize` and `maxSize` per panel. Set `withHandle` to render a visible grip. Groups nest, so a horizontal split can contain a vertical one.",
  },
  "scroll-area": {
    description:
      "A scroll container with styled, optionally auto-hiding scrollbars in either axis. Use it to keep scrollbar appearance consistent across browsers.",
    categories: ["layout", "scroll"],
    docs: "Named exports: ScrollAreaBlock, getThemeStyles (from scroll-area-theme.ts, which installs alongside). `orientation` is vertical | horizontal | both; `autoHide` fades the bar when idle and `hideTrack` drops the track entirely. Needs a bounded height to scroll — give it an explicit height or a flex parent.",
  },
  "vertical-tabs": {
    title: "Tabs",
    description:
      "A tab panel whose rail runs across the top or down the side, with GSAP transitions between panels. Use it for settings and documentation sections with long content.",
    categories: ["navigation", "layout"],
    docs: "Named exports: VerticalTabs, getThemeStyles (from vertical-tabs-theme.ts, which installs alongside). `tabs` take { id, label, icon?, content }. `orientation` defaults to horizontal and switches to vertical without changing the API. Variants: default | glass | minimal | bordered | underline | segmented | soft | elevated — every one renders in both orientations. Ships full tablist semantics: arrow keys along the rail, Home/End, and a focus ring drawn in your accent. `underline` and `segmented` move a single measured indicator between tabs; motion is skipped under prefers-reduced-motion.",
  },
  item: {
    description:
      "A row primitive pairing media, title, description and actions in one aligned layout. Use it to build list rows, notification entries and search results.",
    categories: ["layout", "data-display"],
    docs: "Named export: ItemBlock. `media` and `actions` take arbitrary nodes, so an avatar and a button drop straight in. Variants: default | compact | card | bordered. Passing `onClick` makes the whole row interactive.",
  },
  icons: {
    description:
      "A set of 26 brand SVG icons — Google, GitHub, Apple, Microsoft, Slack, LinkedIn and more — as React components. Use them for social sign-in buttons and provider lists.",
    categories: ["media", "utilities"],
    docs: "Named exports include GoogleIcon, GitHubIcon, AppleIcon, MicrosoftIcon, SlackIcon, LinkedInIcon, TwitterIcon, FacebookIcon, EmailIcon. Inline SVG with no runtime dependency — not even `cn` — so this item installs standalone. Size via className; brand marks keep their own colours.",
  },
  "design-folder-box": {
    description:
      "A frosted-glass folder shape with title and subtitle, used as a decorative container. Use it on portfolio and feature sections where a plain card is too plain.",
    categories: ["media", "marketing"],
    docs: "Named export: DesignFolderBox. Presentational only — `color` tints the glass. For the version that holds stacked cards inside the folder, use `design-components-folder`.",
  },

  // ---- Phase 4C: data display ----
  table: {
    description:
      "Composable table primitives — you write the rows, so no column config and no required data shape. Use it for tabular data you want full control over.",
    categories: ["data-display"],
    docs: "Named exports: Table, TableHeading, TableContent, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableEmpty, TableExpandedRow, TableExpandToggle, TableRowActions, useTableStyles, getThemeStyles. Each primitive renders its native element and forwards refs, so `colSpan` and aria attributes pass through. Variant (default | minimal | glass | soft), size (sm | md | lg) and color are set once on `Table` and read from context; `soft` is the admin-dashboard look (rounded panel, tinted header band, pill controls, round row actions). Also exports the stateful DataTable family — DataTableTabs, DataTableFilter, DataTableReset, DataTableBatchAction — and the cell/toolbar parts TableAction, TableRowAction, TableBadge and TablePerson. `sticky` on TableHead/TableCell pins a column to the right edge. Sorting and expansion are controlled props — the component never reorders your data. For search, paging, selection and batch actions wired up for you, use `advanced-table`.",
  },
  "advanced-table": {
    description:
      "A stateful data table with search, typed sorting, pagination, row selection and batch actions — composed, so your data keeps its own shape.",
    categories: ["data-display"],
    docs: "Named exports: DataTable plus DataTableHeading/Content/Header/Body/Row/Head/Cell/Footer/Empty, DataTableSearch, DataTablePageSize, DataTableSelect, DataTableSelectAll, DataTableBatchBar, DataTableInfo, DataTablePagination, DataTableExpandToggle, DataTableExpandedRow, DataTableTabs, DataTableFilter, DataTableReset, DataTableBatchAction, TableAction, TableRowAction, TableBadge, TablePerson, useDataTable, resolveAccessor. `DataTableTabs` and `DataTableFilter` filter one field each by exact match (`by` is a dot path or accessor); `useDataTable` exposes `filters`, `isFiltered` and `resetAll`. `variant=\"soft\"` gives the admin-dashboard look. `DataTableBody` takes a render function receiving the current page of rows. `getRowId` defaults to id → _id → uuid; `sortBy` accepts a dot path or an accessor function (add `sortId` for functions). Builds on `table` and depends on `select` for the page-size control.",
  },
  "data-grid": {
    description:
      "An editable spreadsheet-style grid with inline cell editing and keyboard navigation. Use it when users need to change values in place rather than just read them.",
    categories: ["data-display"],
    docs: "Named exports: DataGridBlock, getThemeStyles (from data-grid-theme.ts, which installs alongside). `columns` take { field, headerName, width?, type?, readOnly? } — `type` number constrains input. Editing is local to the component, so persist changes through your own handler. Zero runtime dependencies.",
  },
  chart: {
    description:
      "A dependency-free chart rendering bar, line, pie and donut from a single data array. Use it for simple dashboard visuals without pulling in a charting library.",
    categories: ["data-display"],
    docs: "Named exports: ChartBlock. `data` takes { label, value, color? }; switch presentation with `type` (bar | line | pie | donut | donut-legend | stacked-bar) and set `height` in pixels for the axis charts. The two legend types colour each share from `colors` (theme accent first) and take `centerLabel` / `hoverLabel`. Hand-drawn SVG with no chart library, so bundle cost is nil — but there are no axes or scales beyond what is drawn. Use a real charting library for analytical work.",
  },
  timeline: {
    description:
      "A vertical event timeline with status states, icons and GSAP scroll reveal. Use it for order tracking and process status where each step is done, current or upcoming.",
    categories: ["data-display"],
    docs: "Named exports: TimelineBlock, getThemeStyles (from timeline-theme.ts, which installs alongside). Items take { id, title, date, description?, icon?, status } where status is completed | current | upcoming and drives the colour. `layout` places entries left | center | right. For entrance animation variety without status semantics, use `animated-timeline`.",
  },
  "animated-timeline": {
    description:
      "A timeline whose entries animate in on scroll, with five entrance styles. Use it on marketing pages for company history and roadmap sections.",
    categories: ["data-display", "marketing"],
    docs: "Named exports: AnimatedTimelineBlock, getThemeStyles (from animated-timeline-theme.ts, which installs alongside). `animation` is fade-up | slide-in | zoom-in | flip-up | blur-in; `layout` is left | right | center. Uses IntersectionObserver rather than a motion library, so it has no runtime dependencies. For status-driven progress, use `timeline`.",
  },
  "radial-orbital-timeline": {
    description:
      "A dynamic orbital visualization component that displays nodes in a circular pattern around a central point. Each node represents a data point with title, status, and energy level.",
    categories: ["data-display", "marketing"],
    docs: "Named export: RadialOrbitalTimeline. `nodes` take { id, title, date, status, energyLevel, description, icon?, connectedNodes? }. Click or hover nodes to reveal inspector popover card. Supports `autoRotate`, `rotationSpeed`, and custom accent colors.",
  },
  "user-graph": {
    description:
      "An orbital diagram placing a user at the centre with tools and sub-agents circling around. Use it to illustrate an AI agent or integration ecosystem.",
    categories: ["data-display", "marketing"],
    docs: "Named exports: UserGraph. Takes orbiting tools, sub-apps and sub-agents, each with its own icon and colour tokens. Presentational — the layout is decorative, not a real graph engine, so it will not lay out arbitrary node counts gracefully.",
  },
  "network-graph": {
    description:
      "Concentric rings of avatar nodes around a centre node, with a staggered entrance. Use it for community, integration and social-proof sections.",
    categories: ["data-display", "marketing"],
    docs: "Named export: NetworkGraph. `nodes` take { id, ring, image?, fallback?, label?, size? } — `ring` assigns the orbit. Tune spacing with `ringCount`, `baseRadius` and `ringGap`; `animateIn` staggers the reveal. Positions are computed by ring, not by force simulation.",
  },
  footer: {
    description:
      "A collection of 4 modern, animated, fully responsive Footer components for web applications, SaaS platforms, and marketing landing pages.",
    categories: ["marketing", "navigation", "layout"],
    docs: "Named export: Footer. Accepts `variant` (4 responsive variants: simple-centered, glass-dock, neon-glow-pulse, quantum-particle-beam), `brandName`, `tagline`, `logo`, `socialLinks`, `className`. The social row is the `social-links` item, which installs alongside. All variants adapt across mobile, tablet, and desktop screens.",
  },
  "booking-card": {
    usageDependencies: ["glass-panel"],
    description:
      "A booking panel for any card: a day strip paged a week at a time, time slots in groups, a button that reads back the choice, and a confirmation that draws itself in. Use it wherever a page ends in an appointment.",
    categories: ["forms", "dates"],
    docs: "Named export: BookingCard (plus the BookingSlot and Booking types). `BookingCard` is a compound component — put `BookingCard.Days`, `BookingCard.Slots`, `BookingCard.Submit` and `BookingCard.Confirmation` inside it in any layout; it holds the chosen day and slot and calls `onBook`. It draws no surface of its own: make it the padded inside of whatever panel it sits in so the confirmation reaches the edges. The selected day and slot, the submit and 'Add to calendar' buttons, the check mark and the focus rings use the `--primary` token.",
  },
  "bento-showcase": {
    description:
      "A six-card marketing bento on black: a hero with a live chat, a case-studies laptop, a headline, figures that scroll up, the plans on a phone, and a team strip that scrolls left. Use it as the showcase section of an agency or services landing page.",
    categories: ["marketing", "layout"],
    docs: "Named export: BentoShowcase, with parts Card, Hero, CaseStudies, Headline, Stats, Phone and Team. Composed from the marquee, chat-bubble, half-stars, mobile-mockup and button items, which install alongside it. Headlines are children — wrap the display phrase in <em> for the serif italic; `Card` takes a `tone` and grid placement via className.",
  },
  "book-appointment": {
    description:
      "A practitioner's page that ends in an appointment: portrait and contact, scores as stars, two small charts, and a booking panel — glass or solid. Use it for clinics, salons, consultations.",
    categories: ["forms", "marketing"],
    docs: "Named export: BookAppointment. Composed from the booking-card, glass-panel, half-stars and chart items, which install alongside it. Pass `practitioner`, `slotGroups` and `onBook`; `scores`, `visitReasons` and `activities` fill the stars, donut and bar; `variant` switches glass to solid.",
  },
  "data-flow": {
    usageDependencies: ["button", "half-stars", "icons"],
    description:
      "A sources → core → outputs section: platform cards on the left feed one node in the middle, which fans out to result cards on the right, with curved connectors that draw in on first view and then carry a moving dash. Use it to explain a pipeline, an integration, or where an AI product's data comes from.",
    categories: ["marketing", "data-display"],
    docs: "Named export: DataFlow, with parts Source, Core, Output, Pill, Tag and Row. Composed from the flowchart and apple-select items, which install alongside it (`intro` + `highlights` render through AppleSelect); the docs example also uses half-stars and button inside its output cards. Connectors are measured from the cards at runtime (ResizeObserver), hidden below lg; `reveal` is in-view or immediate; `accent` pins the dash colour, otherwise it follows --primary. Wrap intro phrases in <mark> for black pills.",
  },
  "platform-grid": {
    usageDependencies: ["icons"],
    description:
      "Everything a product offers as one hairline grid: small icon-and-name tiles and a few 2×2 features that show a piece of the product on a tilting card. Reveals as a wave from the centre, then a spotlight follows the pointer. Use it as the 'full platform' section of a product site.",
    categories: ["marketing", "navigation"],
    docs: "Named export: PlatformGrid, with parts Tile, Feature, Mock and Pill. Composed from the tilted-card item, which installs alongside it. Cells pack densely (grid-auto-flow: dense) so features stay square at 8, 6, 4, 3 or 2 columns; `reveal` is in-view or immediate; `fadeEdges` masks the outer columns; `accent` pins the hover/spotlight colour, otherwise it follows --primary. Tiles with `href` are links (`linkComponent` for a router Link).",
  },
  "support-hero": {
    description:
      "A product hero on a soft grey ground: a headline that rises in word by word, one line and one call to action, then a bento of frosted cards — integrations, two figures that count up, two portraits and a team card with faces scattered over it. Use it as the opening section of a SaaS or AI product site.",
    categories: ["marketing", "layout"],
    docs: "Named export: SupportHero, with parts Card, Integrations, Stat, Photo and Team. Composed from the glass-panel, text-animation, counter and button items, which install alongside it. Cards land in one staggered pass after the headline (`reveal` in-view or immediate); Stats count up when on screen; hover lifts cards, zooms portraits and drifts the faces. `cta` takes a label plus `onClick` or `href`.",
  },
  "circular-text": {
    description:
      "Words set on a circle, turning slowly, with room in the middle for a mark, a play button or a link. Use it for video badges, stamps and 'see the work' links.",
    categories: ["typography"],
    docs: "Named export: CircularText. `text` repeats to fill the ring (or `repeat` times), `size` in px, `speed` seconds per turn (0 holds still), `direction`, `fontSize`/`tracking` in units of a 100-wide circle, `color` (currentColor follows the parent), `innerRing`. Children sit in the middle. Holds still under prefers-reduced-motion.",
  },
  "avatar-stack": {
    description:
      "A row of overlapping faces that folds the rest into a +N disc and takes a trailing action. Use it as the social-proof cue under a headline or beside a count.",
    categories: ["data-display"],
    docs: "Named export: AvatarStack. `avatars` are { src, alt? }; `size` sm | md | lg; `max` faces before the +N disc; `ringClassName` is the gap colour; `action` renders last at face size; `spreadOnHover` fans the faces apart under the pointer; `liftOnHover` raises the hovered face above its neighbours; `showTooltip` controls hover tooltips.",
  },
  "fashion-hero": {
    description:
      "A fashion hero: a bold headline between a turning video badge and a stack of faces, five staggered columns of looks on flat colour that tilt under the pointer, a call to action on the middle look, and a footer with a quote and the next story. Use it for a clothing store, a lookbook or an editorial landing page.",
    categories: ["marketing", "layout"],
    docs: "Named export: FashionHero (plus FashionHero.Look). Composed from the circular-text, avatar-stack, text-animation, tilted-card and dialog items, which install alongside it. Pass `heading`, up to seven `looks` ({ src, alt, tone, blend?, position? }), `video` ({ badge, url }), `avatars` + `avatarsHref`, `cta`, `quote`, `teaser` and `linkComponent`; `accent` sets --primary, `reveal` is in-view or immediate.",
  },
  "component-wall": {
    description:
      "A landing hero for a component library: a headline that blurs in word by word and keeps one word turning, a lead, an install command that names whichever card a camera has just landed on, two actions, a line of trust and the tools it is built with in batches — centred between two walls of screenshots that never end, one camera resting high and the other low, or on the left of a single wall.",
    categories: ["marketing", "layout"],
    usageDependencies: ["tech-stack", "icons"],
    docs: "Named export: ComponentWall (plus the ComponentWallItem type). Composed from the image-wall, text-animation, copy-button, avatar-stack and half-stars items, which install alongside it, and takes a tech-stack in its `stack` slot. Pass `badge` ({ label, href? }), `heading` (a string, revealed word by word; write `{word}` where `headingWords` take turns every `wordInterval` ms, and name one word in `accent` for the primary colour), `description` (a string or inline JSX — it renders inside a <p>), `install` ({ command } — write `{item}` where the focused card's `slug` goes, e.g. `npx shadcn@latest add @algorize-ui/{item}`), `primaryAction`/`secondaryAction` ({ label, href, icon? }), `trust` ({ text, avatars?, rating? }), `items` ({ title, image, slug? }[] — every screenshot sits in the same 493:332 frame; slug defaults to the title in kebab-case) and `stack` (a node — a <TechStack> of <TechStackGroup>s of <TechStackTool name icon />: the tools over the lower wall on desktop and under the band on phones; in the centred layout it closes the copy column, where the compact variant fits). `columns`, `interval` (ms the camera rests; 0 holds still), `order` (serial | shuffle), `zoom`, `intro` (ms the camera drifts with nothing in focus while the copy arrives; default 1800) and `onFocus` pass straight to the wall; `layout` is split (copy left, wall right), center (copy between two walls — the left camera resting high, the right low, taking turns, the second wall dealing the same items from halfway through; the tools sit under the copy; zoom defaults to 0.9; below lg a single band of every card sits between the copy and the tools), or center-background (`persistentBackground`); `showMobileWall` (boolean, default true: set to false to completely hide wall animations on small screens <lg across all layouts); `linkComponent` takes next/link. The headline uses your theme's font-serif, the command font-mono; colours are theme tokens.",
  },
  "collage-hero": {
    description:
      "A playful hero: a badge whose name turns around a mark, a serif headline with two coloured words, hashtag pills, a five-column photo collage and a footer with a quote, a scroll pill and a watch-video trigger. Use it for a kindergarten, studio, school or any warm, busy place.",
    categories: ["marketing", "layout"],
    docs: "Named export: CollageHero (plus CollageHero.Badge and CollageHero.Photo). Composed from the button, circular-text and dialog items, which install alongside it. Pass `brand`, `heading` (with <em> for the coloured words), `tags`, `caption`, seven `photos`, `quote`, `scrollLabel`/`scrollTo` and `video` ({ text, url }). `accent` sets --primary for the section, `highlight` the second colour; `reveal` is in-view or immediate.",
  },
  "flavour-carousel": {
    description:
      "A product hero for anything that comes in flavours: the product stands in a mountain of powder against a moss backdrop and its flavours flank it on four tilted cream tiles. It rises from behind the powder spinning and settles; then every five seconds, or on a click, the chosen tile slides into the cup and the cup cross-fades to that flavour without moving; a glow takes the flavour's colour, a price pill and add-to-cart hang under the cup. One component for both themes: in dark mode the tiles go translucent black.",
    categories: ["marketing", "commerce", "media"],
    docs: "Named export: FlavourCarousel. Composed from the button item, which installs alongside it. Pass `flavours` ({ name, price?, tint?, product, tile }[] — every product image must share the same crop), `heading`, `interval` in ms (0 turns autoplay off), `initial`, `reveal` (in-view, immediate or none), `onChange` and `onAdd` (omit it to hide the cart button) with `addLabel`. `backgroundImage` is the backdrop and `foregroundImage` the transparent powder cutout laid in front of the cup (`foregroundHeight` of the stage tall); without them the scene is drawn from `background`, `mound` ([light, dark]) and `paper`.",
  },
  "honeycomb-hero": {
    description:
      "A travel hero on a dark ground that shifts colour: a light line over a huge white word whose letters turn the theme's primary where they cross the photographs, and a honeycomb of hexagonal photographs with a primary hexagonal call to action set among them. The large hexagon is the slide on screen; its photograph fills the background, tinted with that photograph's own tone, so the whole section changes colour as, every four seconds or on the arrows at the foot, every hexagon moves one step along the ring, endlessly.",
    categories: ["marketing", "layout"],
    docs: "Named export: HoneycombHero. Pass `title` and `titleAccent` (its letters that cross the photographs take `titleOverlapColor`, the primary by default), `subtitle`, `primaryActionLabel` (a \\n breaks the line; a compass sits above it in the hexagon) and `primaryActionHref`, `images` ({ src, alt, tone? }[] in queue order — nine cells are visible; tone is the deep colour behind everything while that photograph is featured), `socialLinks`, `interval` in ms (0 turns autoplay off) and `onChange`. The overlapping letters, rule, arrows and call to action follow the theme's primary (the hexagon's compass and label primary-foreground); `accent` sets --primary for the section, `background` is the tone for photographs without one (a deep shade of the primary by default); `linkComponent` takes next/link.",
  },
  gallery: {
    title: "Gallery",
    description:
      "A versatile, multi-variant interactive visual gallery featuring revolving 3D orbit rings, responsive bento grids, vertical continuous reels, 3D pill carousels, and perspective arc carousels. Use it for agencies, portfolios, product showcases, and creative hero sections.",
    categories: ["media", "scroll", "layout"],
    docs: "Named export: Gallery (also exports OrbitGallery for backward compatibility). Default export: Gallery. Variants: orbit | bento | reel | pill | arc. Pass items ({ image, alt, title?, subtitle?, href? }), speed/duration, orientation, aspect, autoSlide, and radius/gap options.",
  },
  "hero-carousel": {
    description:
      "A full-bleed photo hero with a queue of cards: the front card is the slide on screen, the ones behind it are what comes next. Every five seconds or on a click the queue slides forward, the photograph behind crossfades and the headline and caption follow. A glass panel carries the faces of past guests, an intro and the call to action.",
    categories: ["marketing", "layout"],
    docs: "Named export: HeroCarousel. Composed from the avatar-stack item, which installs alongside it. Pass `slides` ({ image, alt, title, description?, heading?, position? }), `eyebrow`, `heading`, `intro`, `avatars` + `avatarsLabel`, `cta` ({ label, href }) and `linkComponent`. `interval` is the autoplay gap in ms (0 turns it off), `accent` sets --primary, `reveal` is in-view or immediate, `onChange` reports the front slide.",
  },
  newsletter: {
    description:
      "A sign-up section in three layouts: readers' faces drifting around a centred form, a panel with a pointer glow and a ticker of who just joined, or the form beside a fanned stack of recent issues. The form becomes a thank-you when your promise resolves.",
    categories: ["marketing", "forms"],
    docs: "Named export: Newsletter, with parts Heading, Intro, Form, Proof, Ticker and Issues. Composed from the input, button, marquee and tilted-card items, which install alongside it. `variant` is portraits | spotlight | issues, each styled for light and dark mode; `portraits` takes up to four faces; `Form` takes `onSubscribe(email)` (a promise holds the busy state), `action`, `successTitle`/`successText`; `accent` pins the glow and button colour; `reveal` is in-view or immediate.",
  },
  waitlist: {
    description:
      "A pre-launch sign-up in three layouts: a compact card, a brand mark with a live countdown over the form, or a pill on a soft ground with the faces already in and a bar of the spots claimed. The form becomes the reader's place in line — a number that counts up, and an invite link to copy — when your promise resolves.",
    categories: ["marketing", "forms"],
    docs: "Named export: Waitlist, with parts Mark, Countdown, Heading, Intro, Form, Proof and Spots. Composed from the counter, input, button, avatar-stack, progress and copy-button items, which install alongside it. `variant` is card | launch | queue, each styled for light and dark mode; `Countdown` takes a `date` and is the counter's slide countdown; `Form` takes `onJoin(email)` — resolve a number to show it as the place in line, throw an Error to show its message — plus `action`, `shareUrl`, `note` and the success copy; `Spots` takes `claimed` and `total`; `accent` pins the colour; `reveal` is in-view or immediate.",
  },
  "glass-panel": {
    description:
      "A frosted surface in four shapes and the aurora ground it sits on. Use it for glass bento layouts, profile and booking pages — or flip it to solid cards with one prop.",
    categories: ["layout"],
    docs: "Named exports: GlassBackdrop, GlassPanel (plus SurfaceVariant, GlassShape types); useSurface is exported from glass-panel-context.ts, which installs alongside. `GlassBackdrop` washes three `aurora` colours behind a 12-column grid (`gridClassName` for row heights and gaps) and sets `variant` (glass | solid) for every `GlassPanel` inside; panels take `shape` (slab, tile, disc, capsule), `interactive`, and Tailwind column spans.",
  },
  "profile-page": {
    // The documented page puts a Verify Badge beside the name and Social Links
    // under the contact details; installing profile-page must bring both.
    usageDependencies: ["verify-badge", "social-links"],
    description:
      "A person's profile as a glass bento page: an aurora backdrop, frosted panels, and a 24-hour dial that shows their working window live. Use it for team directories, member pages and public profiles.",
    categories: ["layout", "marketing"],
    docs: "Named exports: ProfilePage, WorkdayDial (GlassPanel is re-exported from the glass-panel item, which installs alongside; useSurface comes from its glass-panel-context.ts). useLocalTime is exported from profile-page-hooks.ts, which installs alongside. `ProfilePage` is the glass backdrop and 12-column grid; place `GlassPanel`s inside with `shape` and column spans. `WorkdayDial` takes `timeZone`, `start`, `end`, `place`, `name`.",
  },
  "product-details": {
    description:
      "A collection of 4 production-ready, high-converting, fully responsive E-commerce Product Details components featuring split galleries, floating cards, bento hero showcases, and color-synced image previews.",
    categories: ["commerce", "marketing", "layout"],
    docs: "Named export: ProductDetails. Accepts `variant` (4 variants: modern-split-gallery, floating-card-glass, bento-editorial-showcase, color-sync-gallery), `title`, `price`, `originalPrice`, `description`, `className`. Adaptable across mobile, tablet, and desktop viewports.",
  },
  "image-viewer": {
    description:
      "A collection of 4 responsive E-commerce Image Viewer components featuring inner lens magnifying zoom, HD side portal projection, carousel sliders, and interactive thumbnail strips.",
    categories: ["media", "commerce", "data-display"],
    docs: "Named export: ImageViewer. Accepts `variant` (4 variants: inner-zoom, side-zoom, slider, thumbnails), `thumbnailPosition` (left, right, bottom), `images`, `colors`, `badge`, `showWishlist`, `enableLightbox`, `className`. Includes built-in fullscreen lightbox modal with keyboard and arrow controls.",
  },
  flowchart: {
    description:
      "A node-and-connector flow diagram with highlightable paths and GSAP transitions. Use it to explain a pipeline or decision flow.",
    categories: ["data-display"],
    docs: "Named exports: Flowchart, FlowCanvas, FlowNode, FlowConnection, useFlowchart. Nodes declare `connectedPaths`; setting the active path highlights every node and connection on it. Positions are authored by you — there is no auto-layout. `layout=\"fluid\"` drops the fixed canvas so connections can be drawn over your own layout; `FlowConnection` takes `dashed`, `flowDash`, `glow` and `drawDuration`.",
  },
  invoice: {
    description:
      "A printable invoice with line items, tax and totals, in three presentation styles. Use it for billing summaries and receipt pages.",
    categories: ["commerce", "data-display"],
    docs: "Named exports: Invoice, getThemeStyles (from invoice-theme.ts, which installs alongside). `InvoiceData` carries invoiceNumber, parties, dates and an `items` array of { item, description?, hours|qty, rate }. Totals are computed for you. Variants: default | minimal | glass.",
  },
  cart: {
    description:
      "A shopping cart with quantity controls, variant details and totals, rendered as drawer, modal, popover or full page. Use it for the cart step of a storefront.",
    categories: ["commerce"],
    docs: "Named exports: CartBlock, getThemeStyles (from cart-theme.ts, which installs alongside), and the CartItem type. Switch presentation with `type` (drawer | modal | popover | page) without changing the item data. Pass the products in from the parent via `initialItems` — the component ships no sample data and renders its empty state without them. Items carry { id, name, price, quantity, gradient, size?, color? }; quantity and removal are handled internally. The trigger animates itself: a periodic tilt-and-ring nudge while the cart has items and has never been opened, a spring on press, and a badge pop whenever the count grows — all skipped under prefers-reduced-motion.",
  },
  "api-playground": {
    description:
      "An interactive API request builder with method selector, headers, query params and a response viewer. Use it in developer documentation so readers can try endpoints inline.",
    categories: ["code", "data-display"],
    docs: "Named exports: ApiPlaygroundBlock, getThemeStyles (from api-playground-theme.ts, which installs alongside), and the types ApiPlaygroundRequest, ApiMockHandler, ApiResponse. Methods GET | POST | PUT | PATCH | DELETE are colour-coded. Ships a mock response by default — pass a `mockHandler`, or wire it to a real fetch. Depends on `select`. Sending real requests from the browser is subject to CORS.",
  },
  compute: {
    description:
      "A compute-resource panel showing instance sizing and usage as a settings-style card. Use it as a starting point for an infrastructure or plan-usage screen.",
    categories: ["data-display", "layout"],
    docs: "Named export: ComputeBlock. A self-contained example with hardcoded values and local state — copy and adapt rather than configuring through props. Depends on `ui-base` for ComponentCard.",
  },
  utility: {
    description:
      "Two small dashboard panels — a team member list and a command search box — built on the shared card shell. Use them as filler panels while assembling a dashboard layout.",
    categories: ["layout", "utilities"],
    docs: "Named exports: TeamMembersBlock, CommandSearchBlock. Self-contained examples with hardcoded content — copy and adapt rather than configuring through props. Depends on `ui-base`.",
  },
  "mobile-mockup": {
    description:
      "Device frames for iPhone (5 through 17 Pro Max), Samsung and Pixel that wrap a screenshot, video or live children. Use them to present an app on a marketing page.",
    categories: ["media", "marketing"],
    docs: "Named exports: Iphone17ProMaxMockup, Iphone14ProMaxMockup, Iphone12ProMaxMockup, Iphone5Mockup, SamsungS24UltraMockup, GooglePixel8Mockup, GooglePixel10Mockup. Each takes `src`, `videoSrc`, or arbitrary children rendered inside the screen. Pure CSS and SVG — no images to ship.",
  },
  "image-wall": {
    description:
      "A wall of screenshots that never ends, and a camera hanging over it: it rests zoomed in on one card, then every few seconds pulls back, glides to the next and settles on it. Use it wherever a set of images should keep showing itself — a hero, a gallery band, a showcase.",
    categories: ["media", "marketing"],
    docs: "Named export: ImageWall (plus the WallItem type). Pass `items` ({ title, image }[] — every image is cropped from its top edge into the same 493:332 frame) and give it a height with `className`; it fills its box. `columns` sets the tile, `interval` the rest between flights in ms (0 holds still), `order` is serial (card by card) or shuffle (every card once per round, at random), `zoom` the resting scale — a box under 420px tall eases it down to 0.72 so a few cards fit, one under 640px wide to 0.5 so the flight between cards stays visible on a phone; `intro` (ms) drifts the camera, pulled back with nothing in focus, before its first landing; `anchor` ({ x?, y? }, shares of the box, default the middle) is where the resting card sits; `onFocus` reports the card in view. The camera holds while hovered, while the tab is hidden and while off screen; under prefers-reduced-motion it cuts instead of flying.",
  },
  "image-compare": {
    description:
      "A before/after image slider with five handle styles and drag or click positioning. Use it for retouching, redesign and product comparison sections.",
    categories: ["media"],
    docs: "Named export: ImageCompare. `beforeImage` and `afterImage` take URLs, with `beforeLabel` / `afterLabel` for the badges and `initialPosition` as a 0-100 percentage. Variants: classic-slider | split-handle | glowing-divider | badge-overlay | minimal. Both images should share an aspect ratio or the reveal will misalign.",
  },
  "tech-stack": {
    usageDependencies: ["icons"],
    description:
      "The tools a product is built with: a label, then one group of marks at a time in two rows — an odd group as three over four — each mark blurring out and the next group blurring in. Use it as the \"Built with\" line in a hero or footer.",
    categories: ["marketing", "data-display"],
    docs: "Named exports: TechStack, TechStackGroup and TechStackTool. Compose it: <TechStack label interval variant> holds <TechStackGroup> children, each holding <TechStackTool name icon /> (icon is any node — an inline SVG or an <img>). One group shows at a time and gives way to the next every `interval` ms (default 3600; 0 holds the first), only while on screen; with prefers-reduced-motion the swap is a cut. `variant` is labelled (label on the left, names beside marks from xl up) or compact (label centred between hairlines, marks only, names as tooltips and screen-reader text). `label` takes any node. Four to eight tools per group read well. Colours are theme tokens.",
  },
  "table-of-contents": {
    description:
      "An interactive Table of Contents navigation block with sticky right-side positioning, real-time scroll-spy, animated Motion indicators, and section search filtering.",
    categories: ["navigation", "scroll"],
    docs: "Named export: TableOfContentsBlock. Accepts `headings` array of ({ id, title, level }) objects, `showProgress`, `showSearch`, and `color` props. Wraps document content on the left while keeping the TOC sticky on the right.",
  },

  // ---- Phase 4D: overlays, feedback & messaging ----
  dialog: {
    usageDependencies: ["copy-button"],
    description:
      "A composable modal dialog with focus trapping, overlay and controlled or uncontrolled open state. Use it as the general-purpose dialog primitive.",
    categories: ["overlays"],
    docs: "Named exports: Dialog, DialogTrigger, DialogClose, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, useDialog (from dialog-context.ts, which installs alongside), plus the DialogSize type. Use `defaultOpen` for uncontrolled, or `open` with `onOpenChange` to drive it — `onOpenChange` also fires on Escape and backdrop clicks, which is where you refuse a dismissal while async work is in flight. Size the panel with `size`: sm | md | lg | xl | full, where full fills the viewport and drops the rounding, border and height cap; `className` is merged after it and wins. `hideCloseButton` drops the built-in X. Dialogs nest — render one inside another's content and the inner one portals above its parent, with Escape and backdrop clicks reaching only the topmost. For a controlled overlay you drive entirely from your own state, use `modal`.",
  },
  modal: {
    description:
      "A composable overlay handling the portal, backdrop, scroll lock, Escape and backdrop dismissal, with no preset layout of its own. Use it when you hold the open state and want the panel to render your own markup.",
    categories: ["overlays"],
    docs: "Named exports: Modal, ModalHeader, ModalBody, ModalFooter, plus the ModalProps and ModalSectionProps types. Modal is controlled — pass `isOpen` and `onClose`; there is no trigger and no `type` or `variant`. Size and skin the panel with `contentClassName` and the backdrop with `overlayClassName`; `hideCloseButton` drops the built-in X and `primaryCloseButton` tints it. Pass `ariaLabel` whenever the heading is not inside ModalHeader. Every slot is optional. The documented form example uses `select`. For a trigger-driven dialog with uncontrolled open state, use `dialog`.",
    usageDependencies: ["select"],
  },
  drawer: {
    description:
      "A panel that slides in from any screen edge, with overlay and GSAP easing. Use it for mobile navigation, filters and detail panels.",
    categories: ["overlays"],
    docs: "Named exports: Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter. `side` chooses the entry edge. Controlled via `open` and `onOpenChange`. Note it also exports a local `Button` used by its demo — import your own for real use.",
  },
  popover: {
    description:
      "A floating panel anchored to a trigger, with collision detection and side/align control. Use it for filter menus and inline detail cards.",
    categories: ["overlays"],
    docs: "Named exports: Popover, PopoverTrigger, PopoverContent. `side` and `align` set the preferred placement; `avoidCollisions` flips it near a viewport edge, with `collisionPadding` as the margin. Zero runtime dependencies — positioning is hand-rolled, not Floating UI. For hover labels use `tooltip`, for right-click use `context-menu`.",
  },
  alert: {
    description:
      "An inline alert with seven semantic types, five visual styles and optional dismiss. Use it for form-level and page-level messages that stay in the layout.",
    categories: ["feedback"],
    docs: "Named export: Alert. `type` is primary | secondary | success | danger | warning | info | dark; `variant` is solid | outline | modern | glass | glow. Set `dismissible` with `onDismiss` to make it closable. For transient messages, use `toast` or `sonner`.",
  },
  toast: {
    description:
      "A provider-based toast system with six screen positions, action buttons and auto-dismiss. Use it for transient confirmations triggered from anywhere in the tree.",
    categories: ["feedback"],
    docs: "Named exports: ToastProvider (ToastBlock.tsx) and useToast (toast-context.ts, which installs alongside). Wrap your app in ToastProvider, then call `toast()` from useToast. Types: success | error | info | warning | default; `variant` is default | glow | glass | minimal. Set `stack` on the provider to pile toasts behind the newest one (hover fans them out). Set `duration` to 0 to require manual dismissal; hovering pauses the timer. `sonner` does the same job with a module-level API and no provider.",
  },
  sonner: {
    description:
      "A stacked toast notifier driven by a module-level function rather than a React context. Use it when you want to fire notifications from outside the component tree.",
    categories: ["feedback"],
    docs: "Named exports: Toaster, toast, toastState. Mount Toaster once, then call `toast()` from anywhere — including non-React code — since state lives in a module singleton. Set `expand` to fan the stack apart on hover. For a context-based API, use `toast`.",
  },
  loader: {
    description:
      "A loading indicator in five shapes — spinner, dots, pulse, ring and bar — with an optional caption. Use it for inline and full-panel pending states.",
    categories: ["feedback"],
    docs: "Named exports: LoaderBlock, getThemeColor. `variant` picks the shape, `size` is sm | md | lg | xl, and `text` renders a caption beneath. Pure CSS animation with no runtime dependencies. For content-shaped placeholders, use `skeleton`.",
  },
  "ui-codeblocks": {
    description:
      "A compact code surface with syntax colouring and a copy button, used inside the docs site. Install it for a lightweight code display without tabs.",
    categories: ["code"],
    docs: "Named export: CodeBlocks. The minimal internal code viewer — for multi-file tabs and filename headers, use `custom-code-block`; for CLI commands, use `terminal`. Installs `ui-code-renderer` alongside it, which brings in Shiki.",
  },
  "ui-code-renderer": {
    description:
      "Shiki-backed syntax highlighting for a single snippet, with matched light and dark themes, a shared cached highlighter and a non-shifting fallback while a cold snippet resolves.",
    categories: ["code"],
    docs: "Named export: CodeRenderer, plus `warmHighlighter` and `prefetchHighlight` for callers that know a snippet before it is shown — prefetching one makes its first paint already highlighted, with no unstyled flash. Takes `code` and a Shiki `lang`. One Shiki instance and one markup cache are shared by every block on the page. A snippet that is still cold renders inside `pre.shiki-pending`; style that class to match your `.shiki` metrics so the swap does not shift the page. Pulled in automatically by `ui-codeblocks` — install it directly only if you are building your own code surface.",
  },
  "custom-code-block": {
    description:
      "A tabbed code viewer with filenames, language badges and per-tab copy. Use it in documentation to show the same example across several files.",
    categories: ["code"],
    docs: "Named exports: CustomCodeBlock, CodeTab. `tabs` take { code, language, fileName }; a single tab renders without the tab strip. Uses `lucide-react` for file-type icons. Highlighting is a built-in regex tokenizer, not Shiki or Prism — good for snippets, not a full editor.",
  },
  terminal: {
    description:
      "A terminal-styled code block with a title bar, window controls and copy button. Use it to present install and CLI commands the way a reader expects to see them.",
    categories: ["code"],
    docs: "Named exports: TerminalBlock, getThemeStyles (from terminal-theme.ts, which installs alongside). `code` is the only required prop; `language` defaults to bash and also understands sh, shell, terminal, html, xml, css and a generic JS/TS fallback. `filename` fills the title bar and `copyable` toggles the copy button. Variants: default | glass | minimal. Highlighting is a built-in regex tokenizer, not Shiki or Prism — good for snippets, not a full editor. For several files behind tabs, use `custom-code-block`.",
  },
  chat: {
    description:
      "A complete messaging interface with contact list, conversation pane and composer. Use it as the shell for a support or direct-messaging feature.",
    categories: ["communication"],
    docs: "Named exports: ChatApp, plus Contact and CurrentUser types. A full application layout rather than a single element — it ships demo contacts and messages you replace with your own data. Variants: default | minimal | glass. For individual message bubbles, use `chat-bubble`.",
  },
  "chat-bubble": {
    description:
      "Message bubble primitives with sent/received styling, grouping-aware corners, avatars and read receipts. Use them to build a custom message thread.",
    categories: ["communication"],
    docs: "Named exports: ChatBubble, ChatAvatar, ChatMessage, ChatTimestamp. `layout` is default | group-top | group-middle | group-bottom and adjusts the corner radii so consecutive messages from one sender read as a block. `status` renders sent | delivered | read ticks. These are the pieces `chat` assembles.",
  },
  "ai-chat": {
    description:
      "An AI assistant interface with thread history sidebar, streaming-style responses and a prompt composer. Use it as the front end for an LLM feature.",
    categories: ["communication"],
    docs: "Named exports: AIChat, plus ChatThread, Message, ChatModel, EffortOption, ComposerTool, SendPayload and UploadHandler types. Responses are mocked — wire `onSend` ({ content, attachments, model, effort, tools }) to your endpoint and `uploadFile` (file, onProgress, signal) to your storage. The composer ships with a + menu (`tools`: one upload row opens the picker, the rest insert @Label mentions), drag-and-drop attachments (rocket progress indicator), a `models` picker, a Faster↔Smarter `efforts` slider that lights the prompt bar at the top level, and mic dictation via getUserMedia + the Web Speech API with graceful fallbacks. Variants: default | minimal | glass | compact (no history sidebar — opens as a hero with `heroTitle` over the prompt bar until the first message; `showSidebar={false}` does the same for any variant).",
  },
  email: {
    description:
      "A full email client layout with folders, labels, message list, reading pane and attachments. Use it as the shell for an inbox or ticketing view.",
    categories: ["communication"],
    docs: "Named exports: EmailApp, plus Email, EmailLabel and Attachment types. The largest block in the registry — a complete application layout with demo data to replace, not a single element. Variants: default | minimal | glass.",
  },

  // ---- Phase 4E: marketing & landing blocks ----
  hero: {
    description:
      "A prop-driven hero section supporting revolving 3D orbit ring, spring word bounce, character typewriter, 3D split marquee slider, pet-shop, doctor, and facility CAD grid variants.",
    categories: ["marketing"],
    docs: "Named export: HeroBlock. Everything is a prop — `variant` switches between 'orbit', 'bounce', 'typing', 'slider', 'pet-shop', 'doctor', and 'facility', with interactive animations, theme color support, and responsive layouts.",
  },
  "video-player": {
    description:
      "A video hero with thumbnail and glow that plays in a modal, inline in the card, or directly on load — behind a YouTube embed or a native HTML5 video.",
    categories: ["marketing", "media"],
    docs: "Named export: VideoPlayer. `videoUrl` and `thumbnailUrl` drive it; `playbackMode` is modal | inline | direct and `source` is youtube | video (a native <video>). `aspectRatio` is 16/9 | 21/9 | 4/3 | 1/1 and `modalSize` is md | lg | xl | full. `onPlay` and `onClose` hook into analytics. In modal and inline the media only loads on click, so it stays off the initial page weight; `direct` renders it immediately and honours `autoPlay` / `muted` / `loop`.",
  },
  "audio-player": {
    title: "Audio Player",
    description:
      "An audio player with artwork, transport, scrubber and volume, in a hero card, a compact bar, or wrapped around the browser's native controls.",
    categories: ["marketing", "media"],
    docs: "Named export: AudioPlayer. `audioUrl` and `artworkUrl` drive it; `variant` is hero | bar | native. Built on a plain <audio> element with no player library, so it adds no npm weight beyond the icons. Playback state mirrors the element's own events, which keeps it correct when a media key or the native controls change it. `skipSeconds` sizes the jump buttons (0 hides them) and the accent follows `--theme-color`.",
  },
  "video-player-plyr": {
    title: "Video Player (Plyr)",
    description:
      "A hero video player built on Plyr — one accessible, skinnable control bar in front of HTML5 files, YouTube and Vimeo alike.",
    categories: ["media"],
    docs: "Named export: PlyrPlayer. Requires the `plyr` package, which the CLI installs. `provider` is html5 | youtube | vimeo and `mediaType` is video | audio; `accentColor` sets Plyr's `--plyr-color-main`, and `controls` takes Plyr's control-name array. Plyr is imported dynamically inside an effect, so the component server-renders cleanly. Its control icons come from Plyr's CDN sprite by default — set `iconUrl` to a self-hosted `plyr.svg` if the page must not reach a third-party host.",
  },
  "video-player-jw": {
    title: "Video Player (JW Player)",
    description:
      "A hero video player built on JW Player, with colour skin presets and a native fallback for when the licensed library is unavailable.",
    categories: ["media"],
    docs: "Named exports: JwPlayer, JW_DEMO_LIBRARY_URL, plus the JwSkinConfig and JwSkinPreset types. No npm dependency — the JW library is a licensed remote script loaded from `libraryUrl`. It defaults to JW's public documentation library, which is fine to evaluate against but must be replaced with your own `https://cdn.jwplayer.com/libraries/<PLAYER_ID>.js` before shipping; a self-hosted build also needs `licenseKey`. `skin` picks a colour preset (default | midnight | neon | sunset | minimal), `skinConfig` takes a raw JW skin object, and `skinUrl` / `skinName` point at a custom stylesheet. If the library fails to load the component falls back to a native <video> rather than a black box.",
  },
  pricing: {
    description:
      "A complete pricing system with plan cards, a comparison table, an interactive plan builder and an interactive service checklist.",
    categories: ["commerce", "marketing"],
    docs: "Named exports: PricingCards, PricingBuilder, PricingTable, PricingSlider, PricingTypographic, PricingPlans. The largest pricing item — variants include cards, builder, table, slider, typographic, and interactive service checklist. The typographic billing switch is the `toggle-group` item, which installs alongside.",
  },
  "pricing-plan": {
    description:
      "Three pricing layouts in one item — basic cards, a feature table and a usage slider that recalculates price. Use the slider variant for consumption-based products.",
    categories: ["commerce", "marketing"],
    docs: "Named exports: BasicPricingPlan, TablePricingPlan, SliderPricingPlan. The heaviest dependency graph in the registry: pulls `ui-badge`, `ui-button`, `ui-card` and `ui-slider`. Note `ui-card` installs to components/ui/card.tsx and will overwrite an existing shadcn card — review before adding to an established project.",
  },
  "pricing-section": {
    description:
      "A compact pricing section with monthly and annual toggle. Use it when pricing is one part of a longer landing page rather than its own page.",
    categories: ["commerce", "marketing"],
    docs: "Named export: PricingSection. Self-contained with hardcoded plans — copy and adapt. Uses next/link, so it needs edits outside Next.js. Installs standalone with no registry dependencies.",
  },
  "pricing-section-v4": {
    description:
      "A refreshed pricing section with a cleaner card treatment and no animation dependency. Use it as the lighter alternative to the GSAP-based pricing sections.",
    categories: ["commerce", "marketing"],
    docs: "Named export: PricingSectionV4. Self-contained with hardcoded plans — copy and adapt. Uses next/link, so it needs edits outside Next.js. No GSAP, so it is the lightest of the pricing items.",
  },
  "floating-contact-button": {
    description:
      "A floating support bubble that expands into a chat panel, with state persisted to localStorage. Use it for live chat and contact widgets on marketing sites.",
    categories: ["communication", "marketing"],
    docs: "Named export: FloatingContactButtonBlock. `position` is bottom-right | bottom-left; `containerMode` fixed pins it to the viewport while absolute scopes it to a parent. Open state survives reloads via `localStorageKey`. Messages are local — connect your own backend.",
  },
  "theme-switcher": {
    description:
      "A light/dark toggle in icon, pill or dropdown form, with a circular reveal that grows out of the control and a GSAP icon transition. Use it in a navbar or settings panel.",
    categories: ["utilities", "actions"],
    docs: "Named export: ThemeSwitcher. Variants: icon | pill | dropdown — dropdown includes a system option. Switching runs a circular View-Transition reveal from the clicked control; the CSS it needs is injected by the component, so nothing goes in globals.css. `reveal={false}` for an instant switch. Requires `next-themes` with a ThemeProvider mounted above it; without one it renders but will not change the theme.",
  },
  "design-components-folder": {
    description:
      "An animated folder that opens to fan out component preview cards. Use it on portfolio and feature pages to reveal a collection on interaction.",
    categories: ["media", "marketing"],
    docs: "Named export: DesignComponentsFolder. Motion drives the open and card-fan animation; `color` tints the folder. Uses next/image, so it needs edits outside Next.js. For the empty folder shape, use `design-folder-box`.",
  },
  "memories-card": {
    description:
      "A swipeable stack of photo cards with location, date and tag metadata. Use it for travel, gallery and testimonial carousels.",
    categories: ["media", "marketing"],
    docs: "Named export: MemoriesCard. `items` take { id, title, location, date, image, description?, tag? }; `onCardChange` reports the active index. Drag or click to advance the stack.",
  },
  "support-container": {
    description:
      "A support ticket list with filters, detail view and empty state, configured through one content object. Use it to drop a help-desk view into an existing layout.",
    categories: ["communication", "layout"],
    docs: "Named export: SupportContainer. Configured via a single nested prop object covering header, filters, tickets, emptyState and detailView — all copy is passed in, so it localises without edits. Installs standalone with no registry dependencies.",
  },
  "support-dashboard": {
    description:
      "A full help-desk dashboard with tickets, SLA tracking, contact details and chat or table layouts. Use it as the agent-facing side of a support product.",
    categories: ["communication", "data-display"],
    docs: "Named exports: SupportDashboard, plus Ticket, TicketContact, TicketSLA, TicketMessage and SupportData types. `layout` switches between chat and table views over the same ticket data. Depends on `select`. The most feature-complete block in the registry — expect to replace its demo data wholesale.",
  },
  "support-page": {
    description:
      "A customer-facing support page with ticket list, reply composer and details sidebar. Use it as the end-user counterpart to the agent dashboard.",
    categories: ["communication"],
    docs: "Named export: SupportPage. Configured through one nested content object covering header, filters, tickets, replySection and detailsSection. Depends on `select`. For the agent-side view with SLA tracking, use `support-dashboard`.",
  },
  // ---- Phase 4F: motion, scroll & domain-specific ----
  "animated-list": {
    description:
      "A container component for rendering lists with animated item insertions, reorders, or removals. Ideal for dynamic notifications or feeds.",
    categories: ["media", "scroll"],
    docs: "Renders animated lists with smooth insertion and deletion transitions.",
  },
  "animated-typography": {
    description:
      "Headings and paragraphs that animate in with scramble, typewriter, rotating-word, blur and reveal effects. Use it for section titles that should draw the eye once.",
    categories: ["typography", "marketing"],
    docs: "Named exports: AnimatedTypographyBlock, getThemeStyles (from animated-typography-theme.ts, which installs alongside). `as` picks the tag (h1-h6, p, span, blockquote) so semantics stay correct whatever the effect. The rotating variants (letter-bounce, typewriter, word-flip, blur-swap) cycle `words` between `titlePrefix` and `titleSuffix`, one every `interval` ms (or `index`, when something else keeps time); `text` stays what screen readers announce. `prefixPosition` is fixed (the text before the words holds still) or fluid (it re-centres as the word changes). `bare` hands the type to `className` for composing into a section heading, and `play={false}` holds a reveal until it is wanted. No runtime dependencies — CSS and timers only. For per-character motion, use `text-animation`.",
  },
  "text-animation": {
    description:
      "Character and word-level text motion driven by Motion. Use it for hero headlines that need finer control than a whole-block fade.",
    categories: ["typography", "marketing"],
    docs: "Named export: TextAnimation. `text` is a plain string it splits internally; `as` sets the rendered element and `delay` / `duration` control timing; `renderWord(word, index)` swaps what a word renders as on the word-level variants (pop-in, flip, blur-in-up) while keeping its entrance. For dependency-free effects, use `animated-typography`.",
  },
  counter: {
    description:
      "A number component in four modes — stepper, count-up, circular progress and countdown. Use it for quantity inputs and animated statistics.",
    categories: ["data-display", "forms"],
    docs: "Named exports: CounterBlock, getThemeStyles (from counter-theme.ts, which installs alongside). `type` is stepper | animated | circular | countdown — stepper is an input with min/max, the others are display-only. Variants: default | outline | soft | vertical for the stepper; `slide` for the countdown (soft tiles, only the figure that changed slides — the same countdown the waitlist item uses). The countdown takes `targetDate` (Date, ISO string or timestamp) and `doneLabel`. The animated type also takes `bare` (just the figure, no card), `decimals`, `startOnView` (count once visible) and `className`. `color` accepts a theme name, a hex code or `inherit`.",
  },
  carousel: {
    description:
      "Three image carousels in one file — a plain slider, a full-bleed hero with autoplay, and a thumbnail-navigated gallery. Reach for it for product shots, galleries and landing-page heroes.",
    categories: ["media", "navigation"],
    docs: "Named exports: ImageCarousel, HeroCarousel, CustomCarousel. All three take an images array; HeroCarousel adds autoplay and CustomCarousel adds thumbnail navigation. Built on next/image, so remote hosts must be allowed in next.config.",
  },
  "carousel-3d": {
    description:
      "A perspective carousel where cards rotate through depth, with drag and autoplay. Use it for portfolio and gallery sections that need presence.",
    categories: ["media", "marketing"],
    docs: "Named exports: ThreeDCarousel, CarouselItem. `items` take { id, title, category, image, description? }. `autoPlay` with `autoPlayInterval` advances it; dragging pauses. Renders a plain <img>, so it works outside Next.js.",
  },
  "curved-carousel": {
    description:
      "A continuously scrolling carousel whose cards follow a curved arc path. Use it for logo walls and showcase strips that should feel ambient.",
    categories: ["media", "marketing"],
    docs: "Named exports: CurvedCarousel, CurvedCarouselCard. `speed` sets the drift rate and `autoPlay` toggles motion. Loops continuously rather than paging, so it suits decorative rows more than navigable content.",
  },
  dock: {
    description:
      "A macOS-style dock where icons magnify as the pointer approaches. Use it for app launchers and playful navigation bars.",
    categories: ["navigation"],
    docs: "Named exports: Dock, DockItem. `items` take { id, label, icon, onClick?, isActive?, badge? }. `magnification` sets peak scale and `distance` the falloff radius. Pointer-driven — on touch devices it degrades to a plain icon row.",
  },
  "draggable-card-list": {
    description:
      "An interactive reorderable card list with 60fps Motion spring physics, right-side grip handles, and custom card metadata.",
    categories: ["data-display", "layout"],
    docs: "Named exports: DraggableCardList, DraggableCardItem. Accepts `items` ({ id, title, description, date, badge, linkText, linkUrl, completed }), `onReorder`, `title`, `dragHandlePosition` ('right' | 'left'), `enableCheckboxes`, and `enableBadges`.",
  },
  "infrastructure-topology": {
    description:
      "An interactive live data flow infrastructure topology graph with animated SVG beams, central neural mesh hub, service cards, and metrics.",
    categories: ["data-display", "layout"],
    docs: "Named export: InfrastructureTopology. Accepts `headerTitle`, `headerSubtitle`, `statusBadge`, `bandwidthBadge`, `centerTitle`, `nodes`, `metrics`, `animated`, `interactive`.",
  },
  "magic-bento": {
    description:
      "A bento grid whose cards light up and follow the pointer on hover. Use it for feature grids on a landing page.",
    categories: ["layout", "marketing"],
    docs: "Named exports: MagicBento, MagicBentoCard. Compose cards as children and set `highlight` on the ones that should stand out; span cards across columns with your own grid classes. Layout-agnostic — it supplies the effect, you supply the grid.",
  },
  "masonry-grid": {
    description:
      "A CSS-column masonry layout with staggered entrance animation. Use it for image galleries and card walls of uneven height.",
    categories: ["layout", "media"],
    docs: "Named export: MasonryGrid. Generic over your item type — pass `items` and a `renderItem` callback. Column count and gaps come from `columnsClassName` and `gapClassName`, so responsive behaviour is plain Tailwind. CSS columns fill top-to-bottom per column, so visual order differs from DOM order.",
  },
  "tilted-card": {
    description:
      "A card that tilts in 3D toward the pointer with a moving glare highlight. Use it to make a single feature or product card feel tactile.",
    categories: ["media", "marketing"],
    docs: "Named export: TiltedCard. Wraps arbitrary children; tune `tiltIntensity`, `glareOpacity` and `scaleOnHover`. Pointer-driven, so it is inert on touch — keep the content readable without the effect.",
  },
  "fan-stack": {
    description:
      "Overlapping cards in a tilted diagonal cascade, dealt out of one pile into place as the stack scrolls into view. Use it for a short numbered sequence — steps, phases, a three-part system.",
    categories: ["scroll", "marketing"],
    docs: "Named exports: FanStack, FanStackCard, FanStackTitle, FanStackStep, FanStackDescription, FanStackPoints, FanStackPoint, FanStackThumb (plus the FanStackTone and FanStackThumbSide types). Compose cards as children — any number works; each card's `tone` (muted | light | accent) and its thumb's `side` (right | left | top) default by position. `FanStackThumb` takes your own `<img>` or framework image as its child. Colours derive from `--primary`. The cascade is a container query: below 768px of width the cards become a CSS sticky stack, each sliding over the last (`stickyTop` clears a fixed header). The deal is scrubbed by scroll (`scrub` seconds of lag, 0 to lock it); pass `scrollerRef` when it scrolls inside a container. The deal is skipped under prefers-reduced-motion.",
  },
  "scroll-stack": {
    description:
      "Cards that stack and scale as the page scrolls, revealing each in turn. Use it for step-by-step feature walkthroughs.",
    categories: ["scroll", "marketing"],
    docs: "Named exports: ScrollStack, StackItem. `items` take { id, title, description?, content?, color?, icon? }; `depthScale` and `cardGap` tune the stack. Pass `scroller` when the page scrolls inside a container rather than the window. No runtime dependencies.",
  },
  "scroll-accordion-showcase": {
    description:
      "A scroll-linked accordion pairing expanding text steps with a synced image panel. Use it for long-form product explainers.",
    categories: ["scroll", "marketing"],
    docs: "Named export: ScrollAccordionShowcase. `displayMode` is both | text-only | image-only; items carry stepNumber, tags and an image. The open step persists via `localStorageKey`. Needs real page height to advance.",
  },
  "split-scroll-stack": {
    description:
      "A two-column scroll stack with a pinned side panel and cards that advance alongside it. Use it for feature tours that pair narrative with visuals.",
    categories: ["scroll", "marketing"],
    docs: "Named export: SplitScrollStack. `stickySide` pins left or right; `cardDepthScale` and `cardOffset` tune the stack. Driven by GSAP ScrollTrigger, so it needs real page height — it will look inert in a short container. Same family as `split-stepper`.",
  },
  "sticky-scroll-stack": {
    description:
      "A sticky section whose panels swap content as you scroll, supporting list, image, split and custom layouts. Use it for feature sections with varied content per step.",
    categories: ["scroll", "marketing"],
    docs: "Named export: StickyScrollStack. Each item sets `contentType` (list | image | split | custom) so steps need not share a shape. Uses next/image, so it needs edits outside Next.js.",
  },
  "horizontal-scroll-stack": {
    description:
      "A section that converts vertical scrolling into horizontal card movement with a progress indicator. Use it for process timelines and step sequences.",
    categories: ["scroll", "marketing"],
    docs: "Named export: HorizontalScrollStack. Items take { id, number, title, description, icon? }. Pins the section and maps scroll progress to horizontal travel, so it needs enough page height to complete — and it takes over scrolling while pinned, which is worth testing on touch.",
  },
  "video-accordion": {
    description:
      "Horizontal panels that expand on selection to play a video, with poster fallbacks. Use it for product feature showcases.",
    categories: ["media", "marketing"],
    docs: "Named exports: VideoAccordion, AccordionPanel. Panels take { id, title, description?, videoSrc, posterUrl? }; `defaultActiveId` sets the initially open one. Videos load per panel — keep them short and muted, since autoplay with sound is blocked by browsers.",
  },
  "cursor-animation": {
    description:
      "A custom cursor with magnetic, glow, trail, spotlight and crosshair effects, scoped to its children. Use it on portfolio and agency sites.",
    categories: ["utilities", "marketing"],
    docs: "Named export: CursorAnimation. `variant` is magnetic | glow | trail | badge | spotlight | expand | crosshair; `trailCount` sets trail length and `label` fills the badge variant. Wrap a region rather than the page so normal cursors survive elsewhere. Pointer-only — no effect on touch.",
  },
  "ui-fluid-glass-slider": {
    description:
      "A glass-morphism slide viewer with fluid GSAP transitions between panels. Use it for hero galleries with a soft, liquid feel.",
    categories: ["media"],
    docs: "Named export: FluidGlassSlider. Slides take { id, image, title, subtitle }. Installs standalone with no registry dependencies — not even `utils`.",
  },
  "fleet-map": {
    description:
      "A live fleet tracking view pairing a Leaflet map with a vehicle list and status filters. Use it for logistics and delivery dashboards.",
    categories: ["maps", "data-display"],
    docs: "Named exports: FleetTracker, Vehicle. `fleetData` take { id, location, lat, lng, status, speed? } with status active | idle | maintenance. **Import Leaflet's CSS yourself** — `import \"leaflet/dist/leaflet.css\"` — or the map renders as broken tiles. Leaflet touches `window`, so load it client-side only.",
  },
  "data-maps": {
    description:
      "A choropleth world map colouring countries by metric, with fill and dot variants. Use it for geographic analytics and regional breakdowns.",
    categories: ["maps", "data-display"],
    docs: "Named exports: DataMaps, DataPoint. `dataPoints` take { id, name, active, new, color?, flag? } keyed by country id; `variant` is fill | dots, with `center` and `zoom` for the initial view. **Import Leaflet's CSS yourself** and supply your own GeoJSON. Uses next/image, so it needs edits outside Next.js.",
  },
  "qr-code-generator": {
    description:
      "A QR code renderer with size, colour and error-correction options. Use it for sharing links, tickets and pairing codes.",
    categories: ["utilities"],
    docs: "Named export: QrCodeGenerator. `value` is the encoded string; `level` is L | M | Q | H — higher survives more damage but packs less data. Keep `bgColor` and `fgColor` high-contrast or scanners will fail. Renders to canvas via qrcode.react.",
  },
  "qr-code-reader": {
    description:
      "A camera-based QR scanner that decodes frames in the browser and reports matches. Use it for check-in and pairing flows.",
    categories: ["utilities"],
    docs: "Named export: QrCodeReader. `onRead` fires with the decoded string. Requires camera permission **and a secure context** — it works on HTTPS and localhost, and silently fails on plain HTTP. Decoding runs on the main thread via jsQR, so expect load on low-end devices. Handle permission denial in your own UI.",
  },

  // ---- Shared primitives (src/components/custom/ui) ----
  // accordion / avatar / badge / button / sheet / slider are derived from
  // shadcn/ui (MIT, Copyright (c) 2023 shadcn). See THIRD-PARTY-NOTICES.md.
  // The attribution is repeated in each item's `docs` so it reaches the
  // consumer at install time, not only in a file in our repo.
  "ui-accordion": {
    description:
      "The Radix-backed accordion primitive that the higher-level Accordion block composes. Install it only if you want the unstyled base directly.",
    categories: ["utilities"],
    docs: "Named exports: Accordion, AccordionItem, AccordionTrigger, AccordionContent. This is the internal primitive — most projects want the `accordion` item instead. Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-avatar": {
    description:
      "The Radix avatar primitive with image and fallback slots. Used for user representation in the chat, support and dashboard blocks.",
    categories: ["utilities"],
    docs: "Named exports: Avatar, AvatarImage, AvatarFallback. Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-badge": {
    description:
      "A small status label primitive with CVA-driven variants. Used internally by pricing blocks.",
    categories: ["utilities"],
    docs: "Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-button": {
    description:
      "A minimal CVA button primitive with Radix Slot support for `asChild`. Used internally by the Calendar and pricing blocks.",
    categories: ["utilities"],
    docs: "This is the internal primitive, not the main `button` item. Prefer `button` unless you specifically need the Slot-based base. Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-sheet": {
    description:
      "The Radix dialog-based sheet primitive that slides in from a screen edge. Used for drawers and mobile navigation panels.",
    categories: ["utilities"],
    docs: "Named exports: Sheet, SheetTrigger, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription. Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-slider": {
    description:
      "The Radix slider primitive used by pricing blocks for usage-based tier selection.",
    categories: ["utilities"],
    docs: "Derived from shadcn/ui (MIT, Copyright (c) 2023 shadcn).",
  },
  "ui-base": {
    description:
      "Shared layout scaffolding (ComponentCard, ToggleSwitch) used by the settings, payment, compute and utility blocks.",
    categories: ["utilities"],
    docs: "Named exports: ComponentCard, ToggleSwitch. Pulled in automatically as a dependency — rarely installed directly.",
  },
  "ui-card": {
    description:
      "The card surface primitive that the pricing-plan block composes.",
    categories: ["utilities"],
    docs: "NOTE: installs to components/ui/card.tsx and will overwrite a shadcn `card` already present. Review before installing into an existing project.",
  },
  reviews: {
    description:
      "A high-converting Review and Testimonial section with a 3D rotating background globe, smooth right-to-left marquee cards, and client rating badges.",
    categories: ["marketing", "data-display"],
  },
  "particle-canvas": {
    description:
      "A high-performance HTML Canvas component that converts text or images into thousands of animated particles with multiple visual variants and interactive mouse mechanics.",
    categories: ["media", "data-display"],
  },
  "split-flap": {
    title: "Split-Flap Display",
    description:
      "An authentic, physics-driven Split-Flap Display component simulating retro-mechanical flap cards, 3D perspective flips, and synthesized click sounds with ivory and minimalist variants.",
    categories: ["data-display", "media"],
    docs: "Named exports: SplitFlap, SPLIT_FLAP_CHARSET. Default export: SplitFlap. Variants: ivory | minimalist. Features 3D mechanical rotateX animation, Web Audio API sound generator, and responsive size presets.",
  },
  "top-destinations": {
    title: "Top Destinations",
    description:
      "A dual-row scroll-driven destination showcase with opposite-direction GSAP ScrollTrigger parallax travel, full-bleed photography, and interactive hover details.",
    categories: ["marketing", "data-display", "scroll"],
    docs: "Named exports: TopDestinations, TopDestinationsCard, DEFAULT_DESTINATIONS (plus DestinationItem type). Accepts items array or row1Items/row2Items, scrollOffset, and scrollerRef.",
  },
  "falling-tags": {
    title: "Falling Tags",
    description:
      "A physics-based interactive tags playground where badges float, fall under gravity, collide realistically, and can be dragged and thrown.",
    categories: ["marketing", "data-display"],
    docs: "Named exports: FallingTagsBlock (default), FallingTagItem, FallingTagPalette.",
  },
  "designs-toolkit": {
    title: "Designs Toolkit",
    description:
      "A pinned resource toolkit grid featuring authentic 3D pushpins, staggered cards, brand icon badges, and connected corkboard path lines.",
    categories: ["marketing", "data-display"],
    docs: "Named exports: DesignsToolkitBlock (default), ToolkitItem.",
  },
};

