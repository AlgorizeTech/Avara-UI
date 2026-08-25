"use client";
import { useState } from "react";
import { ComponentCard } from "../ui/base";

export function ComputeBlock() {
  const [computeEnv, setComputeEnv] = useState<"kubernetes" | "vm">("kubernetes");
  const [gpuCount, setGpuCount] = useState(8);

  return (
    <ComponentCard>
      <div className="p-6 pb-4">
        <h3 className="font-semibold text-sm">Compute Environment</h3>
        <p className="text-xs text-muted-foreground mt-1">Select the compute environment for your cluster.</p>
      </div>
      <div className="px-6 pb-6 space-y-3">
        <div onClick={() => setComputeEnv("kubernetes")} className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${computeEnv === "kubernetes" ? "border-zinc-900 dark:border-zinc-50 bg-background" : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-border"}`}>
          <div className="flex items-center gap-3">
            <div className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${computeEnv === "kubernetes" ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-300 dark:border-zinc-700"}`}></div>
            <div>
              <p className="text-sm font-medium">Kubernetes</p>
              <p className="text-xs text-muted-foreground">Run workloads on a K8s cluster.</p>
            </div>
          </div>
        </div>
        <div onClick={() => setComputeEnv("vm")} className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${computeEnv === "vm" ? "border-zinc-900 dark:border-zinc-50 bg-background" : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-border"}`}>
          <div className="flex items-center gap-3">
            <div className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${computeEnv === "vm" ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-300 dark:border-zinc-700"}`}></div>
            <div>
              <p className="text-sm font-medium">Virtual Machine</p>
              <p className="text-xs text-muted-foreground">Access a VM configured cluster.</p>
            </div>
          </div>
        </div>
        <div className="pt-4 flex items-center justify-between border-t border-border">
          <div>
            <p className="text-sm font-medium">Number of GPUs</p>
            <p className="text-[10px] text-muted-foreground">You can add more later.</p>
          </div>
          <div className="flex items-center border border-border rounded-md">
            <button onClick={() => setGpuCount(Math.max(0, gpuCount - 1))} className="cursor-pointer px-2 py-1 text-muted-foreground hover:text-foreground transition-colors active:bg-muted rounded-l-md">-</button>
            <span className="px-2 text-sm text-center w-8 font-mono">{gpuCount}</span>
            <button onClick={() => setGpuCount(gpuCount + 1)} className="cursor-pointer px-2 py-1 text-muted-foreground hover:text-foreground transition-colors active:bg-muted rounded-r-md">+</button>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}