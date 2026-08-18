import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[60vh] gap-4 text-zinc-500">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-400 dark:text-zinc-600" />
      <p className="text-sm font-medium animate-pulse">Loading component...</p>
    </div>
  );
}
