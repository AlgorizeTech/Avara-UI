"use client";

import { SignupForm } from "@/components/custom/blocks/SignupForm";

export default function SignupFormDemo() {
  return (
    <div className="w-full flex items-center justify-center min-h-[800px] bg-zinc-50 dark:bg-[#020202] py-16 px-4 transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <SignupForm />
      </div>
    </div>
  );
}
