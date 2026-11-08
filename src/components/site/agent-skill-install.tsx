import { CodeBlock } from "@/components/ui/code-block";
import { type SkillClient, skillInstallCommand } from "@/lib/agent-skill";

/**
 * The commands that put the agent skill into a project, per client. A fence in
 * MDX cannot interpolate, so the guide uses this to print the configured host
 * and skill name (same reason as RegistryConfig). The Markdown mirror prints
 * the same text from `skillInstallCommand`.
 */
export function SkillInstall({ client }: { client: SkillClient }) {
  const { lang, code } = skillInstallCommand(client);
  return (
    <CodeBlock>
      <code className={`language-${lang}`}>{code}</code>
    </CodeBlock>
  );
}
