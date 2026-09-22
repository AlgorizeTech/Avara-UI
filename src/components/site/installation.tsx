import React from "react";
import { Cli } from "./cli";
import { SetupPath } from "./setup-path";
import registry from "../../../registry.json";

/**
 * The shape `<Installation>` reads out of `registry.json`. Declared locally
 * rather than imported from `shadcn` so a schema bump upstream cannot silently
 * change what the docs render.
 */
type RegistryItem = {
  name: string;
  title?: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: { target?: string }[];
};

const ITEMS = registry.items as RegistryItem[];

export interface InstallationProps {
  /** Registry item name, e.g. `calendar`. Everything else is derived. */
  name: string;
  /**
   * Whether to print the "set the project up first" banner above step 1.
   *
   * Defaults to `true` so every component page carries it without its MDX
   * having to remember. `<InstallGroup>` turns it off for the second and
   * subsequent blocks on a page — the reader has already read it once, and
   * repeating it four times buries the commands it is meant to introduce.
   */
  showSetupPath?: boolean;
}

/**
 * Shortens one of our own registry URLs back to the `name.json` shorthand
 * `<Cli>` expands. Anything else — a bare name like `utils`, which lives in
 * shadcn's upstream registry — is passed through for the CLI to resolve.
 */
function toAddArg(dependency: string): string {
  const own = dependency.match(/\/r\/([\w-]+\.json)$/);
  return own ? own[1] : dependency;
}

/** Human label for a dependency, with the `.json` and the URL stripped off. */
function label(dependency: string): string {
  return toAddArg(dependency).replace(/\.json$/, "");
}

/**
 * Every npm package an item pulls in, including the ones it inherits through its
 * registry dependencies.
 *
 * Listing only `item.dependencies` under-reports the real dependency surface: a page
 * for `fleet-tracker` would name `lucide-react` and never mention `leaflet` or
 * `react-leaflet`, which arrive with the `fleet-map` component it depends on. The CLI
 * installs them either way, so nothing breaks -- but the reader has no way to see that
 * adding one component brings a mapping library with it, which matters for bundle size,
 * licence review, and deciding whether to use the component at all.
 *
 * Walks the registry graph and unions the npm packages. `seen` guards the cycle;
 * bare upstream names like `utils` are not in our registry and are skipped.
 */
function transitivePackages(name: string, seen = new Set<string>()): string[] {
  if (seen.has(name)) return [];
  seen.add(name);

  const entry = ITEMS.find((candidate) => candidate.name === name);
  if (!entry) return [];

  const collected = [...(entry.dependencies ?? [])];
  for (const dependency of entry.registryDependencies ?? []) {
    collected.push(...transitivePackages(label(dependency), seen));
  }
  return collected;
}

/**
 * Matches the prop badges in Sandbox.tsx. Carries `data-badge`, which opts out
 * of the global inline-<code> styling in globals.css and docs-layout-content;
 * without it those rules win and the badge renders as a plain slate chip.
 */
const BADGE =
  "inline rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-medium text-primary ring-1 ring-primary/20 [overflow-wrap:anywhere] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]";

/**
 * One numbered step on the install rail. The number sits in a disc centred on
 * the rail (drawn as the parent's left border); the heading keeps its `id` so
 * `#install-<name>` links still land on it.
 */
function Step({
  number,
  id,
  title,
  children,
}: {
  number: number;
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="relative">
      {/* Rail is 1px left of the parent's 2rem padding; the 1.75rem disc is
          pulled back by half its width so it sits centred on the line. */}
      <span
        aria-hidden
        className="absolute top-0 -left-[calc(2rem+0.875rem+1px)] flex size-7 items-center justify-center rounded-full border border-zinc-300 bg-white font-mono text-xs font-semibold text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
      >
        {number}
      </span>
      <h3
        id={id}
        className="mt-0 mb-4 scroll-m-24 text-xl leading-7 font-semibold"
      >
        {title}
      </h3>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

/**
 * Dependencies every project already has once it has followed the installation
 * guide: `shadcn init` writes `lib/utils.ts` (the `cn` helper) and installs
 * `lucide-react` as the icon library. Almost every item in the registry lists
 * both, so repeating them under ninety-odd components buried the dependency
 * that was actually specific to a component — `leaflet`, `gsap`, `three` —
 * in the same two lines every time. They are filtered out here and named once,
 * in the SetupPath sentence above the command.
 */
const BASELINE_COMPONENTS = new Set(["utils"]);
const BASELINE_PACKAGES = new Set(["lucide-react"]);

/**
 * Separates two independent install blocks on a page that documents more than
 * one component. Without it the second block's "1." reads as a continuation of
 * the first block's steps rather than the start of a new sequence.
 */
function InstallDivider() {
  return (
    <div className="my-14 flex items-center gap-4">
      <span aria-hidden className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      <span className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
        or
      </span>
      <span aria-hidden className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
    </div>
  );
}

/**
 * Wraps the `<Installation>` blocks on a page that ships several independent
 * components, putting an `or` rule between them. Grouping them rather than
 * writing the separator by hand keeps it impossible to place one at the wrong
 * boundary, or to forget it when a component is added to the page.
 */
export function InstallGroup({ children }: { children: React.ReactNode }) {
  const blocks = React.Children.toArray(children).filter(
    // MDX can hand back whitespace between elements; those are not blocks.
    (child) => typeof child !== "string" || child.trim() !== "",
  );

  return (
    <>
      {blocks.map((block, i) => (
        <React.Fragment key={i}>
          {i > 0 && <InstallDivider />}
          {/* The setup banner belongs to the page, not to each block, so only
              the first one prints it. cloneElement rather than a context: the
              blocks are server components rendered in place, and this is the
              only prop that has to reach them. */}
          {i > 0 && React.isValidElement<InstallationProps>(block)
            ? React.cloneElement(block, { showSetupPath: false })
            : block}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * A path with a break opportunity after every "/", so a long target like
 * components/custom/blocks/CollageHeroBlock.tsx wraps at a segment boundary
 * on narrow screens instead of wherever the column happens to end.
 */
function BreakablePath({ path }: { path: string }) {
  const segments = path.split("/");
  return (
    <>
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <>
              /<wbr />
            </>
          )}
          {segment}
        </React.Fragment>
      ))}
    </>
  );
}

/** `a`, `b` and `c` — badged, so each dependency stays findable in the prose. */
function BadgeList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((item, i) => (
        <React.Fragment key={item}>
          {i > 0 && (i === items.length - 1 ? " and " : ", ")}
          <code data-badge className={BADGE}>
            {item}
          </code>
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * The standard install block for a documented component: install it, install
 * what it needs, use it. Nothing here asks the reader to paste a source file —
 * the registry is live, so the CLI writes the component for them.
 *
 * Only `name` is passed in. The command, the file it writes, the npm packages
 * and the sibling registry components are all read from `registry.json` — the
 * same file the CLI itself reads — so a page cannot drift from what actually
 * happens when someone runs the command.
 *
 * The two kinds of dependency need two different commands, which is why they
 * are listed separately: a registry component is a source file installed by
 * `shadcn add`, while an npm package is installed by the package manager.
 * Running `npm install select` would fetch an unrelated package from npm.
 *
 * The handful of components that need real post-install setup (wrapping the app
 * in a provider, an optional extra package) write it as ordinary MDX after this
 * element, so those steps keep their own heading in the table of contents.
 */
export function Installation({
  name,
  showSetupPath = true,
}: InstallationProps) {
  const item = ITEMS.find((entry) => entry.name === name);

  // Fail at build time rather than shipping a page whose install command is a
  // 404. Every name is generated from the registry, so this only fires when an
  // item is renamed or removed out from under the docs.
  if (!item) {
    throw new Error(
      `<Installation name="${name}"> — no item called "${name}" in registry.json.`,
    );
  }

  const title = item.title ?? name;
  const target = item.files?.[0]?.target;
  const direct = item.dependencies ?? [];
  const components = (item.registryDependencies ?? []).filter(
    (dependency) => !BASELINE_COMPONENTS.has(label(dependency)),
  );
  // Includes packages inherited through `components`; see transitivePackages.
  const packages = [...new Set(transitivePackages(name))]
    .filter((pkg) => !BASELINE_PACKAGES.has(pkg))
    .sort();
  const inherited = packages.filter((pkg) => !direct.includes(pkg));
  const total = packages.length + components.length;
  // True when the only things filtered out were the baseline ones — the reader
  // should hear that the component still needs them, just not from this page.
  const onlyBaseline =
    total === 0 &&
    ((item.registryDependencies?.length ?? 0) > 0 ||
      (item.dependencies?.length ?? 0) > 0);

  return (
    // data-toc-skip: the step headings are structure inside the Installation
    // section, not navigation targets. A page documenting four components would
    // otherwise put four identical "2. Install dependencies" in the sidebar.
    <div className="my-6" data-toc-skip>
      {showSetupPath && <SetupPath />}

      {/* The left border is the rail the step discs sit on. It runs to the end
          of the last step's content rather than stopping at its disc: a rail
          that ends mid-step looks like the step was cut off. */}
      <div className="ml-3.5 space-y-10 border-l border-zinc-200 pl-8 dark:border-zinc-800">
        <Step number={1} id={`install-${name}`} title={<>Install {title}</>}>
          <Cli command={`add ${name}.json`} />
          <p className="leading-7 text-gray-700 dark:text-gray-300">
            {target ? (
              <code>
                <BreakablePath path={target} />
              </code>
            ) : (
              <>The component</>
            )}{" "}
            is written into your project. Copy any snippet from a{" "}
            <strong className="font-semibold">Usage</strong> tab above and it runs.
          </p>
        </Step>

        {/* Step 2 always renders, even with nothing to install: every component
            then reads the same way, and "no dependencies" is worth stating. */}
        <Step
          number={2}
          id={`install-${name}-dependencies`}
          title="Install dependencies"
        >
          {total === 0 ? (
            <p className="leading-7 text-gray-700 dark:text-gray-300">
              {onlyBaseline ? (
                <>
                  Nothing beyond the shared setup — {title} needs only the{" "}
                  <code>cn</code> helper and <code>lucide-react</code>, which
                  the installation guide already put in place.
                </>
              ) : (
                <>
                  None — {title} has no npm packages or registry components to
                  install.
                </>
              )}
            </p>
          ) : (
            <>
              <p className="leading-7 text-gray-700 dark:text-gray-300">
                Step 1 installs {total > 1 ? "these" : "this"} for you. Run{" "}
                {total > 1 ? "them" : "it"} yourself only if you are adding{" "}
                {title} to an existing project by hand. The <code>cn</code>{" "}
                helper and <code>lucide-react</code> are not listed — the
                installation guide covers them once for every component.
                {inherited.length > 0 && (
                  <>
                    {" "}
                    <BadgeList items={inherited} /> come
                    {inherited.length > 1 ? "" : "s"} in with the component
                    {components.length > 1 ? "s" : ""} above rather than from{" "}
                    {title} directly.
                  </>
                )}
              </p>

              {components.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <BadgeList items={components.map(label)} />{" "}
                    {components.length > 1
                      ? "are components"
                      : "is a component"}
                    , not {components.length > 1 ? "packages" : "a package"} —
                    the shadcn CLI installs{" "}
                    {components.length > 1 ? "them" : "it"} as source files.
                  </p>
                  <Cli command={`add ${components.map(toAddArg).join(" ")}`} />
                </div>
              )}

              {packages.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                    <BadgeList items={packages} />{" "}
                    {packages.length > 1
                      ? "are npm packages"
                      : "is an npm package"}
                    .
                  </p>
                  <Cli command={`install ${packages.join(" ")}`} />
                </div>
              )}
            </>
          )}
        </Step>
      </div>
    </div>
  );
}
