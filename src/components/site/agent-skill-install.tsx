import { CodeBlock } from "@/components/ui/code-block";
import { Cli } from "@/components/site/cli";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/site/tabs";
import {
  SKILL_ITEM,
  type SkillClient,
  skillFileLinks,
  skillInstallCommand,
  skillInstallPrompt,
  skillTarget,
} from "@/lib/agent-skill";

const PARAGRAPH = "mb-4 text-[15px] leading-[1.8] text-foreground/60";
const INLINE_CODE =
  "rounded bg-foreground/[0.06] px-1.5 py-0.5 font-mono text-[12px] text-foreground/70 whitespace-nowrap";

/**
 * How to install the agent skill for one agent, as two tabs: "Ask your agent"
 * (a prompt to paste, the easiest way and the same on every system) and
 * "Manual" (one command that runs in any terminal, or, for agents that read an
 * instructions file, the block to paste).
 *
 * A fence in MDX cannot interpolate, so this prints the configured host and
 * skill name (same reason as RegistryConfig). The Markdown mirror prints the
 * same text from the same functions in `lib/agent-skill`.
 */
export function SkillInstall({ client, file }: { client: SkillClient; file?: string }) {
  const manual = skillInstallCommand(client);

  return (
    <div className="my-4">
      <Tabs defaultValue="agent">
        <TabsList aria-label="Install method">
          <TabsTrigger value="agent">Ask your agent</TabsTrigger>
          {client !== "agents" && <TabsTrigger value="cli">shadcn CLI</TabsTrigger>}
          <TabsTrigger value="manual">Manual</TabsTrigger>
        </TabsList>

        <TabsContent value="agent">
          <p className={PARAGRAPH}>
            {client === "agents" ? (
              <>
                Paste this into your agent. It adds the block to{" "}
                <code className={INLINE_CODE}>{file ?? "AGENTS.md"}</code> for you.
              </>
            ) : (
              "Paste this into your agent. It downloads the files and puts them in the right folder, on any system."
            )}
          </p>
          <CodeBlock>
            <code className="language-text">{skillInstallPrompt(client, file)}</code>
          </CodeBlock>
        </TabsContent>

        {client !== "agents" && (
          <TabsContent value="cli">
            <p className={PARAGRAPH}>
              Run this from your project root. It is the same shadcn command you use for components, so it works with
              npm, pnpm, yarn and bun, on macOS, Linux and Windows. It writes{" "}
              <code className={INLINE_CODE}>{targetOf(client)}</code>.
            </p>
            <Cli command={`add ${SKILL_ITEM[client]}.json`} />
            <p className="mt-3 mb-2 text-[13px] leading-6 text-foreground/50">
              To update later, run it again with <code className={INLINE_CODE}>--overwrite</code> at the end.
            </p>
          </TabsContent>
        )}

        <TabsContent value="manual">
          {client === "agents" ? (
            <>
              <p className={PARAGRAPH}>
                Create <code className={INLINE_CODE}>{file ?? "AGENTS.md"}</code> if it does not exist, then paste this
                block at the end. There is nothing to run, so it is the same on every system.
              </p>
              <CodeBlock>
                <code className={`language-${manual.lang}`}>{manual.code}</code>
              </CodeBlock>
            </>
          ) : (
            <ManualCommand client={client} command={manual} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/** What an install writes: the one file, or the folder. */
function targetOf(client: "claude" | "cursor") {
  const { dir, files } = skillTarget(client);
  return files.length === 1 ? `${dir}/${files[0]}` : `${dir}/`;
}

function ManualCommand({
  client,
  command,
}: {
  client: "claude" | "cursor";
  command: { lang: string; code: string };
}) {
  const { files } = skillTarget(client);
  const target = targetOf(client);

  return (
    <>
      <p className={PARAGRAPH}>
        Run this one line from your project root. It works the same in macOS and Linux terminals, Windows PowerShell,
        Command Prompt and Git Bash, and needs Node.js 18 or newer (you have it if you use npm). It writes{" "}
        <code className={INLINE_CODE}>{target}</code>
        {files.length > 1 ? ` (${files.length} files)` : ""}.
      </p>
      <CodeBlock>
        <code className={`language-${command.lang}`}>{command.code}</code>
      </CodeBlock>
      <p className="mt-4 mb-2 text-[13px] leading-6 text-foreground/50">
        Command blocked or no Node.js? Save {files.length > 1 ? "each file" : "the file"} yourself, keeping the file
        {files.length > 1 ? " names" : " name"} and creating the folders if they are missing:
      </p>
      <ul className="mb-4 list-inside list-disc space-y-1 text-[14px] leading-[1.8] text-foreground/60">
        {skillFileLinks(client).map(({ file, url, saveAs }) => (
          <li key={saveAs}>
            <a href={url} className="font-mono text-[13px] text-primary hover:underline">
              {file}
            </a>
            <span className="text-foreground/40">
              {" "}
              — save as <span className="font-mono text-[12px]">{saveAs}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
