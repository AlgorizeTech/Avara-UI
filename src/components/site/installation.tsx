import React from "react";
import { Cli } from "./cli";
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
 * Matches the prop badges in Sandbox.tsx. Carries `data-badge`, which opts out
 * of the global inline-<code> styling in globals.css and docs-layout-content;
 * without it those rules win and the badge renders as a plain slate chip.
 */
const BADGE =
  "inline-block rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-medium text-primary ring-1 ring-primary/20 [overflow-wrap:anywhere]";

const STEP_HEADING = "text-2xl font-semibold mb-3 mt-8 scroll-m-24";

/**
 * Separates two independent install blocks on a page that documents more than
 * one component. Without it the second block's "1." reads as a continuation of
 * the first block's steps rather than the start of a new sequence.
 */
function InstallDivider() {
  return (
    <div className="my-12 flex items-center gap-4">
      <span
        aria-hidden
        className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"
      />
      <span className="text-xs font-medium tracking-[0.2em] text-zinc-400 uppercase dark:text-zinc-500">
        or
      </span>
      <span
        aria-hidden
        className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800"
      />
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
          {block}
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
export function Installation({ name }: InstallationProps) {
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
  const packages = item.dependencies ?? [];
  const components = item.registryDependencies ?? [];
  const total = packages.length + components.length;

  return (
    // data-toc-skip: the step headings are structure inside the Installation
    // section, not navigation targets. A page documenting four components would
    // otherwise put four identical "2. Install dependencies" in the sidebar.
    <div className="my-6" data-toc-skip>
      <h3 id={`install-${name}`} className={`${STEP_HEADING} first:mt-0`}>
        1. Install {title}
      </h3>

      <div className="space-y-3">
        <Cli command={`add ${name}.json`} />
        <p className="leading-7 text-gray-700 dark:text-gray-300">
          {target ? <code>{target}</code> : <>The component</>} is written into
          your project. Copy any snippet from a{" "}
          <strong className="font-bold">Usage</strong> tab above and it runs.
        </p>
      </div>

      {/* Step 2 always renders, even with nothing to install: every component
          then reads the same way, and "no dependencies" is worth stating. */}
      <h3 id={`install-${name}-dependencies`} className={STEP_HEADING}>
        2. Install dependencies
      </h3>

      <div className="space-y-3">
        {total === 0 ? (
          <p className="leading-7 text-gray-700 dark:text-gray-300">
            None — {title} has no npm packages or registry components to
            install.
          </p>
        ) : (
          <>
            <p className="leading-7 text-gray-700 dark:text-gray-300">
              Step 1 installs {total > 1 ? "these" : "this"} for you. Run{" "}
              {total > 1 ? "them" : "it"} yourself only if you are adding{" "}
              {title} to an existing project by hand.
            </p>

            {components.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                  <BadgeList items={components.map(label)} />{" "}
                  {components.length > 1 ? "are components" : "is a component"},
                  not {components.length > 1 ? "packages" : "a package"} — the
                  shadcn CLI installs {components.length > 1 ? "them" : "it"} as
                  source files.
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
      </div>
    </div>
  );
}
