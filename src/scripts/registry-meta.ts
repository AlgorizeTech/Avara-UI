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
  "Fleet-tracker.tsx": "fleet-tracker",
  "Pricing-plan.tsx": "pricing-plan",
  "Support-dashboard.tsx": "support-dashboard",
  "DesignComponentsFolder.tsx": "design-components-folder",
  "DesignFolderBox.tsx": "design-folder-box",
};

export const META: Record<string, ItemMeta> = {
  // ---- Curated in Phase 3. Verified against source. ----
  button: {
    description:
      "A button with variants, sizes, loading state, and a click ripple effect. Reach for it as the default action element anywhere in an interface.",
    categories: ["actions", "forms"],
    docs: "Default export. Supports variant (default | destructive | outline | secondary | ghost | link), size (sm | lg), and a `loading` prop. Ripple keyframes are injected into document.head on mount, so no Tailwind config or global CSS changes are needed.",
  },
  card: {
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
  progress: {
    description:
      "A themeable progress bar with an optional labelled field wrapper. Use it for determinate operations where percentage complete is known.",
    categories: ["feedback"],
    docs: "Named exports: Progress, ProgressField, getThemeStyles. Use ProgressField when you need a label and value readout; use Progress bare inside your own layout.",
  },
  toggle: {
    description:
      "A two-state switch with controlled and uncontrolled modes. Use it for settings that apply immediately, rather than a checkbox in a submitted form.",
    categories: ["forms"],
    docs: "Named export: Toggle. Forwards a ref and accepts `checked` / `onCheckedChange` for controlled use, or `defaultChecked` for uncontrolled.",
  },
  "otp-input": {
    description:
      "A segmented one-time-passcode field with auto-advance, paste handling, and backspace navigation. Use it for email or SMS verification steps.",
    categories: ["forms", "authentication"],
    docs: "Pasting a full code into any cell distributes the digits across all cells.",
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
    docs: "Named exports: InputBlock, getThemeStyles. Accepts type (text | password | email | number | file), variant (default | filled | underlined | glow), inputSize, and a color token (indigo | rose | emerald | zinc, or your own). Pass `error` to switch it into the invalid state; `helperText` renders below when there is no error.",
  },
  select: {
    description:
      "A searchable select with single or multiple selection, option groups and per-option icons. Use it when a native <select> cannot carry enough structure.",
    categories: ["forms"],
    docs: "Named exports: SelectBlock, getThemeStyles. `options` take { label, value, icon?, group? } — supplying `group` renders grouped headings. `value` accepts a string, or an array when multiple selection is enabled. Several other blocks depend on this one.",
  },
  form: {
    description:
      "Form scaffolding — wrapper, field, error and submit — with a shared color theme and a glitch error variant. Use it to keep field spacing and validation styling consistent across a form.",
    categories: ["forms"],
    docs: "Named exports: FormWrapper, FormField, FormError, FormSubmit, getThemeStyles. Layout and styling only — bring your own state, via react-hook-form or otherwise. FormSubmit takes `isSubmitting` to render its pending state.",
  },
  "date-picker": {
    description:
      "A single-date field with a popover calendar, typed entry and validation states. Use it for one-off dates such as a deadline or birth date.",
    categories: ["forms", "dates"],
    docs: "Named exports: DatePickerBlock, getThemeStyles. Controlled via `value: Date | null` and `onChange`. Shares the variant, color and size vocabulary of the `input` item, so the two line up visually in the same form. For month grids or event display, use `calendar` instead.",
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
    docs: "Named exports: ToggleGroup, ToggleGroupItem, getThemeStyles. Set `type` to single or multiple — `value` is a string for single, an array for multiple. Compose ToggleGroupItem children; the group passes theme and size down.",
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
  stepper: {
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
  "auth-form": {
    description:
      "A sign-in and sign-up form with social buttons, password reveal and four layout variants. Use it as the entry point of an authenticated app.",
    categories: ["authentication", "forms"],
    docs: "Named exports: AuthForm, getThemeStyles. `type` is login | signup; `variant` is default | split | glass | minimal — split renders a gradient side panel. Presentation only: no auth provider is wired in, so connect your own submit handler.",
  },
  "signup-form": {
    description:
      "A standalone registration form with inline field validation and animated error states. Use it where sign-up is its own page rather than a tab beside sign-in.",
    categories: ["authentication", "forms"],
    docs: "Named export: SignupForm. Uses Framer Motion for field-level error transitions. Validation is client-side presentation only — enforce it again on your server.",
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
      "A data-driven accordion taking an array of items, with single or multiple open sections. Use it for FAQs and any list of collapsible sections.",
    categories: ["layout"],
    docs: "Named export: Accordion. Pass `accordionData` as { value, title, icon?, content } — content accepts a string array or a node. `type` is single | multiple; set `collapsible` to let the last open section close. Variants: default | bordered | filled | ghost. Wraps the `ui-accordion` Radix primitive. For a single section, `collapsible` is lighter.",
  },
  breadcrumb: {
    description:
      "A breadcrumb trail with per-item icons and automatic collapsing when the path is long. Use it to show position in a deep hierarchy.",
    categories: ["navigation"],
    docs: "Named exports: BreadcrumbBlock, getThemeStyles. `items` take { label, href?, icon? }; `maxItems` collapses the middle into an ellipsis past that count. Separator styles: classic | slash | solid | ghost. Renders next/link, so it needs edits outside Next.js.",
  },
  "navigation-menu": {
    description:
      "A horizontal navigation bar with dropdown panels and a sliding active indicator. Use it for primary site navigation with grouped links.",
    categories: ["navigation"],
    docs: "Named exports: NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, getThemeStyles. Compose the parts; the root tracks active and hovered state and animates the indicator between triggers. Variants: default | minimal | glass.",
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
    docs: "Named exports: SidebarProvider, Sidebar, SidebarHeader, SidebarBrand, SidebarContent, SidebarGroup, SidebarFooter, useSidebar. Wrap your app in SidebarProvider; read `expanded` and `isMobileOpen` from useSidebar to drive your own toggle. Variants: attached | floating.",
  },
  navbar: {
    description:
      "A responsive marketing navbar with logo, links, mobile menu and GSAP entrance animation. Use it as the top bar of a landing page.",
    categories: ["navigation", "marketing"],
    docs: "Named exports: NavbarBlock, getThemeStyles. Variants: default | floating | centered | minimal | glass. Uses next/link, so it needs edits outside Next.js. For app chrome with dropdown panels, use `navigation-menu`.",
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
    docs: "Named exports: ScrollAreaBlock, getThemeStyles. `orientation` is vertical | horizontal | both; `autoHide` fades the bar when idle and `hideTrack` drops the track entirely. Needs a bounded height to scroll — give it an explicit height or a flex parent.",
  },
  "vertical-tabs": {
    description:
      "A tab panel that stacks vertically or horizontally, with GSAP transitions between panels. Use it for settings and documentation sections with long content.",
    categories: ["navigation", "layout"],
    docs: "Named exports: VerticalTabs, getThemeStyles. `tabs` take { id, label, icon?, content }. `orientation` switches between vertical and horizontal without changing the API. Variants: default | glass | minimal | bordered.",
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
      "A generic data table with sortable columns, custom cell renderers and GSAP row animation. Use it for straightforward tabular data that needs sorting but not filtering.",
    categories: ["data-display"],
    docs: "Named exports: TableBlock, getThemeStyles. Generic over your row type — `columns` take { key, label, sortable?, align?, render? }, where `render` receives the whole row. Variants: default | minimal | glass; sizes sm | md | lg. For search, filtering, pagination and column resizing, use `advanced-table`.",
  },
  "advanced-table": {
    description:
      "A data table with search, per-column filtering, pagination, column sizing and typed sorting. Reach for it when a plain table is no longer enough.",
    categories: ["data-display"],
    docs: "Named exports: AdvancedTableBlock, getThemeStyles. `columns` take { key, header, sortable?, width?, sortType?, render? } — set `sortType` to number so numeric columns do not sort lexically. Depends on `select` for the page-size control. For a simpler table, use `table`.",
  },
  "data-grid": {
    description:
      "An editable spreadsheet-style grid with inline cell editing and keyboard navigation. Use it when users need to change values in place rather than just read them.",
    categories: ["data-display"],
    docs: "Named exports: DataGridBlock, getThemeStyles. `columns` take { field, headerName, width?, type?, readOnly? } — `type` number constrains input. Editing is local to the component, so persist changes through your own handler. Zero runtime dependencies.",
  },
  chart: {
    description:
      "A dependency-free chart rendering bar, line, pie and donut from a single data array. Use it for simple dashboard visuals without pulling in a charting library.",
    categories: ["data-display"],
    docs: "Named exports: ChartBlock. `data` takes { label, value }; switch presentation with `type` (bar | line | pie | donut) and set `height` in pixels. Hand-drawn SVG with no chart library, so bundle cost is nil — but there are no axes, tooltips or scales beyond what is drawn. Use a real charting library for analytical work.",
  },
  timeline: {
    description:
      "A vertical event timeline with status states, icons and GSAP scroll reveal. Use it for order tracking and process status where each step is done, current or upcoming.",
    categories: ["data-display"],
    docs: "Named exports: TimelineBlock, getThemeStyles. Items take { id, title, date, description?, icon?, status } where status is completed | current | upcoming and drives the colour. `layout` places entries left | center | right. For entrance animation variety without status semantics, use `animated-timeline`.",
  },
  "animated-timeline": {
    description:
      "A timeline whose entries animate in on scroll, with five entrance styles. Use it on marketing pages for company history and roadmap sections.",
    categories: ["data-display", "marketing"],
    docs: "Named exports: AnimatedTimelineBlock, getThemeStyles. `animation` is fade-up | slide-in | zoom-in | flip-up | blur-in; `layout` is left | right | center. Uses IntersectionObserver rather than a motion library, so it has no runtime dependencies. For status-driven progress, use `timeline`.",
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
  globe: {
    description:
      "An interactive 3D Globe with 9 animation variants matching site theme colors, including dotted matrix, wireframe hologram, digital matrix, energy shield, minimal flat 3D, activity heatmap, cyber hex, tactical radar sweep, and galaxy spiral.",
    categories: ["data-display", "marketing", "maps"],
    docs: "Named export: Globe. Accepts `variant` (9 variants), `size`, `speed`, `interactive`, `glowColor`, `primaryColor`, `markers`, `arcs`. Dynamically adapts to site `var(--primary)` theme color.",
  },
  footer: {
    description:
      "A collection of 4 modern, animated, fully responsive Footer components for web applications, SaaS platforms, and marketing landing pages.",
    categories: ["marketing", "navigation", "layout"],
    docs: "Named export: Footer. Accepts `variant` (4 responsive variants: simple-centered, glass-dock, neon-glow-pulse, quantum-particle-beam), `brandName`, `tagline`, `logo`, `className`. All variants adapt across mobile, tablet, and desktop screens.",
  },
  "product-details": {
    description:
      "A collection of 4 production-ready, high-converting, fully responsive E-commerce Product Details components featuring split galleries, floating cards, bento hero showcases, and color-synced image previews.",
    categories: ["commerce", "marketing", "layout"],
    docs: "Named export: ProductDetails. Accepts `variant` (4 variants: modern-split-gallery, floating-card-glass, bento-editorial-showcase, color-sync-gallery), `title`, `price`, `originalPrice`, `description`, `className`. Adaptable across mobile, tablet, and desktop viewports.",
  },
  flowchart: {
    description:
      "A node-and-connector flow diagram with highlightable paths and GSAP transitions. Use it to explain a pipeline or decision flow.",
    categories: ["data-display"],
    docs: "Named exports: Flowchart, FlowCanvas, FlowNode, FlowConnection, useFlowchart. Nodes declare `connectedPaths`; setting the active path highlights every node and connection on it. Positions are authored by you — there is no auto-layout.",
  },
  invoice: {
    description:
      "A printable invoice with line items, tax and totals, in three presentation styles. Use it for billing summaries and receipt pages.",
    categories: ["commerce", "data-display"],
    docs: "Named exports: Invoice, getThemeStyles. `InvoiceData` carries invoiceNumber, parties, dates and an `items` array of { item, description?, hours|qty, rate }. Totals are computed for you. Variants: default | minimal | glass.",
  },
  cart: {
    description:
      "A shopping cart with quantity controls, variant details and totals, rendered as drawer, modal, popover or full page. Use it for the cart step of a storefront.",
    categories: ["commerce"],
    docs: "Named exports: CartBlock, getThemeStyles. Switch presentation with `type` (drawer | modal | popover | page) without changing the item data. Items carry { id, name, price, quantity, size?, color? }. Cart state is yours to own — this renders it and reports changes.",
  },
  "api-playground": {
    description:
      "An interactive API request builder with method selector, headers, query params and a response viewer. Use it in developer documentation so readers can try endpoints inline.",
    categories: ["code", "data-display"],
    docs: "Named exports: ApiPlaygroundBlock, getThemeStyles, and the types ApiPlaygroundRequest, ApiMockHandler, ApiResponse. Methods GET | POST | PUT | PATCH | DELETE are colour-coded. Ships a mock response by default — pass a `mockHandler`, or wire it to a real fetch. Depends on `select`. Sending real requests from the browser is subject to CORS.",
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
      "Device frames for iPhone, Samsung and Pixel that wrap a screenshot, video or live children. Use them to present an app on a marketing page.",
    categories: ["media", "marketing"],
    docs: "Named exports: Iphone14ProMaxMockup, Iphone12ProMaxMockup, Iphone5Mockup, SamsungS24UltraMockup, GooglePixel8Mockup, GooglePixel10Mockup. Each takes `src`, `videoSrc`, or arbitrary children rendered inside the screen. Pure CSS and SVG — no images to ship.",
  },
  "image-compare": {
    description:
      "A before/after image slider with five handle styles and drag or click positioning. Use it for retouching, redesign and product comparison sections.",
    categories: ["media"],
    docs: "Named export: ImageCompare. `beforeImage` and `afterImage` take URLs, with `beforeLabel` / `afterLabel` for the badges and `initialPosition` as a 0-100 percentage. Variants: classic-slider | split-handle | glowing-divider | badge-overlay | minimal. Both images should share an aspect ratio or the reveal will misalign.",
  },

  // ---- Phase 4D: overlays, feedback & messaging ----
  dialog: {
    description:
      "A composable modal dialog with focus trapping, overlay and controlled or uncontrolled open state. Use it as the general-purpose dialog primitive.",
    categories: ["overlays"],
    docs: "Named exports: Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, useDialog. Use `defaultOpen` for uncontrolled, or `open` with `onOpenChange` to drive it. `asChild` on the trigger merges props into your own element instead of rendering a button. For preset confirmation and fullscreen layouts, use `modal`.",
  },
  modal: {
    description:
      "A themed modal with standard, form, fullscreen and confirmation presets and GSAP transitions. Use it when you want a ready-made layout rather than composing a dialog.",
    categories: ["overlays"],
    docs: "Named exports: ModalBlock, getThemeStyles. `type` is standard | form | fullscreen | confirmation; variants are default | glass | minimal | bordered. Depends on `select` for the form preset. For an unopinionated primitive, use `dialog`.",
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
    docs: "Named exports: ToastProvider, useToast, getThemeStyles. Wrap your app in ToastProvider, then call `toast()` from useToast. Types: success | error | info | warning | default. Set `duration` to 0 to require manual dismissal. `sonner` does the same job with a stacked look and no provider.",
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
    docs: "Named exports: CustomCodeBlock, CodeTab. `tabs` take { code, language, fileName }; a single tab renders without the tab strip. Pulls in `react-icons` as well as `lucide-react` for file-type icons. Highlighting is a built-in regex tokenizer, not Shiki or Prism — good for snippets, not a full editor.",
  },
  terminal: {
    description:
      "A terminal-styled code block with a title bar, window controls and copy button. Use it to present install and CLI commands the way a reader expects to see them.",
    categories: ["code"],
    docs: "Named exports: TerminalBlock, getThemeStyles. `code` is the only required prop; `language` defaults to bash and also understands sh, shell, terminal, html, xml, css and a generic JS/TS fallback. `filename` fills the title bar and `copyable` toggles the copy button. Variants: default | glass | minimal. Highlighting is a built-in regex tokenizer, not Shiki or Prism — good for snippets, not a full editor. For several files behind tabs, use `custom-code-block`.",
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
    docs: "Named exports: AIChat, plus ChatThread and Message types. Presentation only — responses are mocked, so wire it to your own model endpoint. Variants: default | minimal | glass. Handles thread switching and message rendering; streaming and persistence are yours.",
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
      "A composable hero section with centre or split layouts, background patterns and a badge slot. Use it as the opening section of a landing page.",
    categories: ["marketing", "layout"],
    docs: "Named exports: Hero, HeroContent, HeroBadge, HeroBadgeText, getThemeStyles. `layout` is center | left | split-right | split-left; `pattern` adds a grid or dot backdrop; variants are default | glass | glow. Composable and content-agnostic — no runtime dependencies. For ready-made copy and CTAs, use `homepage-hero`.",
  },
  "homepage-hero": {
    description:
      "A prop-driven hero with rotating typed words, badge link, CLI command and two CTAs. Use it as a complete above-the-fold section without composing parts.",
    categories: ["marketing"],
    docs: "Named export: HomepageHeroBlock. Everything is a prop — `typingWords` cycles between `titlePrefix` and `titleSuffix`, and `cliCommand` renders a copyable install line. Animated with Motion; uses next/link, so it needs edits outside Next.js. `homepage-hero-typing` is the same layout without the motion dependency.",
  },
  "homepage-hero-typing": {
    description:
      "The homepage hero with a hand-rolled typing effect and no motion library. Use it when you want the same layout without the extra dependency.",
    categories: ["marketing"],
    docs: "Named export: HomepageHeroTypingBlock. Identical prop surface to `homepage-hero`, but the typing runs on timers instead of Motion — lighter, with less entrance animation. Uses next/link, so it needs edits outside Next.js.",
  },
  "hero-video-player": {
    description:
      "A video hero with thumbnail, glow and a modal player that opens on click. Use it for product demo sections that should not autoplay.",
    categories: ["marketing", "media"],
    docs: "Named export: HeroVideoPlayer. `videoUrl` and `thumbnailUrl` drive it; `aspectRatio` is 16/9 | 21/9 | 4/3 | 1/1 and `modalSize` is md | lg | xl | full. `onPlay` and `onClose` hook into analytics. Loading the video only on open keeps it off the initial page weight.",
  },
  pricing: {
    description:
      "A complete pricing system with plan cards, a comparison table and an interactive plan builder. Use it as the full pricing page rather than a single section.",
    categories: ["commerce", "marketing"],
    docs: "Named exports: PricingCards, PricingBuilder, getThemeStyles, plus Plan, PricingData, TableFeature, TableSection and PricingTableData types. The largest pricing item — variants are default | premium | elegant | minimal | bordered. Uses next/link, so it needs edits outside Next.js. For a single card row, use `pricing-plans` or `pricing-section`.",
  },
  "pricing-plan": {
    description:
      "Three pricing layouts in one item — basic cards, a feature table and a usage slider that recalculates price. Use the slider variant for consumption-based products.",
    categories: ["commerce", "marketing"],
    docs: "Named exports: BasicPricingPlan, TablePricingPlan, SliderPricingPlan. The heaviest dependency graph in the registry: pulls `ui-badge`, `ui-button`, `ui-card` and `ui-slider`. Note `ui-card` installs to components/ui/card.tsx and will overwrite an existing shadcn card — review before adding to an established project.",
  },
  "pricing-plans": {
    description:
      "A three-tier pricing card row with a highlighted recommended plan and GSAP entrance. Use it as a self-contained pricing section on a landing page.",
    categories: ["commerce", "marketing"],
    docs: "Named export: PricingPlans. Self-contained with its own plan content — copy and adapt rather than configuring through props. Uses next/link, so it needs edits outside Next.js. Installs with no registry dependencies, not even `utils`.",
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
      "A light/dark toggle in icon, pill or dropdown form, with a GSAP icon transition. Use it in a navbar or settings panel.",
    categories: ["utilities", "actions"],
    docs: "Named export: ThemeSwitcher. Variants: icon | pill | dropdown — dropdown includes a system option. Requires `next-themes` with a ThemeProvider mounted above it; without one it renders but will not change the theme.",
  },
  "design-components-folder": {
    description:
      "An animated folder that opens to fan out component preview cards. Use it on portfolio and feature pages to reveal a collection on interaction.",
    categories: ["media", "marketing"],
    docs: "Named export: DesignComponentsFolder. Framer Motion drives the open and card-fan animation; `color` tints the folder. Uses next/image, so it needs edits outside Next.js. For the empty folder shape, use `design-folder-box`.",
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
      "A list wrapper that staggers its children in with five entrance styles. Use it to bring feature lists and search results in gracefully.",
    categories: ["utilities"],
    docs: "Named exports: AnimatedList, AnimatedListItem. `variant` is flip | slide-right | slide-left | slide-up | pop; tune with `staggerDelay`, `duration` and a GSAP `ease` string. Wrap AnimatedListItem children — the parent orchestrates the timeline.",
  },
  "animated-typography": {
    description:
      "Headings and paragraphs that animate in with typewriter, glitch, blur and reveal effects. Use it for section titles that should draw the eye once.",
    categories: ["typography", "marketing"],
    docs: "Named exports: AnimatedTypographyBlock, getThemeStyles. `as` picks the tag (h1-h6, p, span, blockquote) so semantics stay correct whatever the effect. No runtime dependencies — CSS and timers only. For per-character motion, use `text-animation`.",
  },
  "text-animation": {
    description:
      "Character and word-level text motion driven by Framer Motion. Use it for hero headlines that need finer control than a whole-block fade.",
    categories: ["typography", "marketing"],
    docs: "Named export: TextAnimation. `text` is a plain string it splits internally; `as` sets the rendered element and `delay` / `duration` control timing. For dependency-free effects, use `animated-typography`.",
  },
  counter: {
    description:
      "A number component in four modes — stepper, count-up, circular progress and countdown. Use it for quantity inputs and animated statistics.",
    categories: ["data-display", "forms"],
    docs: "Named exports: CounterBlock, getThemeStyles. `type` is stepper | animated | circular | countdown — stepper is an input with min/max, the others are display-only. Variants: default | outline | soft | vertical.",
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
    docs: "Named exports: FleetTracker, Vehicle. `fleetData` take { id, location, lat, lng, status, speed? } with status active | idle | maintenance. **Import Leaflet's CSS yourself** — `import \"leaflet/dist/leaflet.css\"` — or the map renders as broken tiles. Leaflet touches `window`, so load it client-side only. For the map-free list, use `fleet-tracker`.",
  },
  "fleet-tracker": {
    description:
      "A vehicle list with selection and location details, loading its map lazily. Use it as the lighter fleet view when a full map is not needed up front.",
    categories: ["data-display"],
    docs: "Named export: FleetTracker. Uses next/dynamic with `ssr: false` to defer the map, so it needs Next.js. Installs standalone with no registry dependencies. For the full map view, use `fleet-map`.",
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
};
