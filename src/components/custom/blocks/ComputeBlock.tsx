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
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Select the compute environment for your cluster.</p>
      </div>
      <div className="px-6 pb-6 space-y-3">
        <div onClick={() => setComputeEnv("kubernetes")} className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${computeEnv === "kubernetes" ? "border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950" : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"}`}>
          <div className="flex items-center gap-3">
            <div className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${computeEnv === "kubernetes" ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-300 dark:border-zinc-700"}`}></div>
            <div>
              <p className="text-sm font-medium">Kubernetes</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Run workloads on a K8s cluster.</p>
            </div>
          </div>
        </div>
        <div onClick={() => setComputeEnv("vm")} className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${computeEnv === "vm" ? "border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950" : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"}`}>
          <div className="flex items-center gap-3">
            <div className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${computeEnv === "vm" ? "border-zinc-900 dark:border-zinc-50" : "border-zinc-300 dark:border-zinc-700"}`}></div>
            <div>
              <p className="text-sm font-medium">Virtual Machine</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Access a VM configured cluster.</p>
            </div>
          </div>
        </div>
        <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50">
          <div>
            <p className="text-sm font-medium">Number of GPUs</p>
            <p className="text-[10px] text-zinc-500">You can add more later.</p>
          </div>
          <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md">
            <button onClick={() => setGpuCount(Math.max(0, gpuCount - 1))} className="cursor-pointer px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors active:bg-zinc-100 dark:active:bg-zinc-800 rounded-l-md">-</button>
            <span className="px-2 text-sm text-center w-8 font-mono">{gpuCount}</span>
            <button onClick={() => setGpuCount(gpuCount + 1)} className="cursor-pointer px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors active:bg-zinc-100 dark:active:bg-zinc-800 rounded-r-md">+</button>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}