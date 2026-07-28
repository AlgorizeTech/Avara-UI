"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { SignupForm } from "@/components/custom/blocks/SignupForm";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const SIGNUP_ENGINE_CODE_TS = `/* Exposes the full Premium SignupBlock architecture via module export */`;
const SIGNUP_ENGINE_CODE_JS = `/* Exposes the full Premium SignupBlock architecture via module export */`;

export function SignupFormShowcase() {
  const generateUsageCode = (isTs: boolean) => {
    return `import { SignupForm } from "@/components/custom/blocks/SignupBlock";

export default function AuthPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center p-4 bg-zinc-50 dark:bg-[#050505]">
      <SignupForm />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Feature Highlight Panel */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">
              Animated Inputs
            </strong>
            Inputs feature a dynamic blur-glow when focused, powered by Framer
            Motion.
          </div>
          <div>
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">
              Completion Progress
            </strong>
            Watch the top progress bar fill up as you successfully complete
            required fields.
          </div>
          <div>
            <strong className="text-zinc-900 dark:text-zinc-100 block mb-1">
              Micro-Interactions
            </strong>
            Custom SVG checkboxes, password strength meters, and staggered
            entrance sequences.
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SignupForm"
        tsCode={SIGNUP_ENGINE_CODE_TS}
        jsCode={SIGNUP_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center min-h-[800px] bg-zinc-50 dark:bg-[#020202] py-16 px-4 transition-colors duration-300 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="w-full max-w-md relative z-10">
            <SignupForm />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
