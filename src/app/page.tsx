"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function InteractiveDensityPage() {
  // --- Global UI State ---
  const [activeTab, setActiveTab] = useState("Examples");

  // --- Component Specific State ---
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [strictMode, setStrictMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [computeEnv, setComputeEnv] = useState<"kubernetes" | "vm">(
    "kubernetes",
  );
  const [gpuCount, setGpuCount] = useState(8);

  // --- Handlers ---
  const handlePaymentSubmit = () => {
    setIsSubmittingPayment(true);
    // Simulate a network request
    setTimeout(() => {
      setIsSubmittingPayment(false);
    }, 1500);
  };

  const tabs = ["Examples", "Dashboard", "Tasks", "Playground"];

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 pb-20">
      {/* Ambient Background Glow (Dark Mode Only) */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden dark:flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] w-[800px] h-[500px] bg-zinc-800/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* --- Navbar --- */}
      {/* <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/80 dark:bg-[#09090b]/80 backdrop-blur-md transition-colors">
        <div className="container mx-auto max-w-screen-2xl flex h-14 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="size-6 bg-zinc-900 dark:bg-zinc-100 rounded-sm flex items-center justify-center group-hover:rotate-12 transition-transform">
                <span className="text-zinc-50 dark:text-zinc-900 text-xs font-bold">
                  /
                </span>
              </div>
              <span className="font-semibold text-sm">ui/nexus</span>
            </Link>
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {["Docs", "Components", "Blocks", "Charts"].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors cursor-pointer"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center w-64 h-8 px-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 text-xs text-zinc-500 group hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-text">
              <svg
                className="mr-2 size-3.5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Search documentation...
              <kbd className="ml-auto pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 px-1 font-mono text-[9px] font-medium text-zinc-500">
                <span>⌘</span>K
              </kbd>
            </div>
          </div>
        </div>
      </header> */}

      <main className="relative z-10 flex flex-col items-center pt-20 px-4 md:px-8">
        {/* --- Hero Section --- */}
        <div className="max-w-4xl text-center flex flex-col items-center">
          <Link href={'/docs'} className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group">
            ui-nexus/blocks, charts, and more
            <svg
              className="size-3 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-950 dark:text-zinc-50 text-balance">
            The Foundation for your Design System
          </h1>

          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-[42rem] mb-8 text-balance leading-relaxed">
            A set of beautifully designed, dynamic components that you can
            customize, extend, and build on. Start here, make it yours. Open
            Source.
          </p>
        </div>

        {/* --- Interactive Tabs --- */}
        <div className="w-full max-w-6xl mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto group">
            {/* FIX 2: Theme Dropdown width and spacing */}
            <div className="cursor-pointer hidden sm:flex items-center justify-between h-9 px-3 w-auto min-w-[130px] gap-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-zinc-500 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <span>Theme: Neutral</span>
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* --- Dense Component Grid --- */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* COLUMN 1 */}
          <div className="flex flex-col gap-6">
            <ComponentCard>
              <div className="flex flex-col space-y-1.5 p-6 pb-4">
                <h3 className="font-semibold leading-none tracking-tight">
                  Payment Method
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  All transactions are secure and encrypted.
                </p>
              </div>
              <div className="p-6 pt-0 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name on Card</label>
                  <input
                    className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-medium">Card Number</label>
                    <input
                      className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CVV</label>
                    <input
                      className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Month</label>
                    {/* FIX 1: Explicitly added dark:bg-zinc-950 and dark:text-white to options */}
                    <select className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm outline-none cursor-pointer text-zinc-900 dark:text-zinc-50">
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        January
                      </option>
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        February
                      </option>
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        March
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    {/* FIX 1: Explicitly added dark:bg-zinc-950 and dark:text-white to options */}
                    <select className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm outline-none cursor-pointer text-zinc-900 dark:text-zinc-50">
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        2026
                      </option>
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        2027
                      </option>
                      <option className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
                        2028
                      </option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handlePaymentSubmit}
                  disabled={isSubmittingPayment}
                  className="mt-2 w-full inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-50 text-sm font-medium text-white dark:text-zinc-900 shadow transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmittingPayment ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4 text-current"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Save Payment Method"
                  )}
                </button>
              </div>
            </ComponentCard>

            <ComponentCard>
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      className="text-sm font-medium cursor-pointer select-none"
                      onClick={() => setStrictMode(!strictMode)}
                    >
                      Strict Mode
                    </label>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Enable strict type checking.
                    </p>
                  </div>
                  <ToggleSwitch
                    active={strictMode}
                    onChange={() => setStrictMode(!strictMode)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label
                      className="text-sm font-medium cursor-pointer select-none"
                      onClick={() => setPushNotifications(!pushNotifications)}
                    >
                      Push Notifications
                    </label>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Receive alerts on your device.
                    </p>
                  </div>
                  <ToggleSwitch
                    active={pushNotifications}
                    onChange={() => setPushNotifications(!pushNotifications)}
                  />
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* COLUMN 2 */}
          <div className="flex flex-col gap-6">
            <ComponentCard className="flex flex-col items-center justify-center text-center p-8 border-dashed border-2 dark:border-zinc-800 dark:bg-zinc-950/30">
              <div className="flex -space-x-3 mb-4">
                <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-200 dark:bg-zinc-800"></div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-300 dark:bg-zinc-700"></div>
                <div className="size-10 rounded-full border-2 border-white dark:border-[#09090b] bg-zinc-400 dark:bg-zinc-600"></div>
              </div>
              <h3 className="font-semibold text-sm mb-1">No Team Members</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 max-w-[200px]">
                Invite your team to collaborate on this project.
              </p>
              <button className="cursor-pointer h-8 px-4 inline-flex items-center justify-center rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-xs font-medium shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors active:scale-95">
                + Invite Members
              </button>
            </ComponentCard>

            <ComponentCard>
              <div className="p-2 cursor-text">
                <div className="flex items-center px-3 py-2 bg-zinc-100 dark:bg-zinc-900 rounded-md group focus-within:ring-2 ring-zinc-400 dark:ring-zinc-600 transition-shadow">
                  <svg
                    className="size-4 text-zinc-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400 cursor-text"
                    placeholder="Search components..."
                  />
                  <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-500">
                    ESC
                  </kbd>
                </div>
                <div className="mt-2 px-2 py-4">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2 uppercase tracking-wider">
                    Suggestions
                  </p>
                  <div className="space-y-1">
                    {["Calendar", "Face Recognition", "Billing Settings"].map(
                      (item) => (
                        <div
                          key={item}
                          className="flex items-center px-2 py-1.5 text-sm rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors active:bg-zinc-200 dark:active:bg-zinc-700"
                        >
                          {item}
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>

          {/* COLUMN 3 */}
          <div className="flex flex-col gap-6">
            <ComponentCard>
              <div className="p-6 flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-sm">
                    Two-factor authentication
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                    Verify via email or phone number.
                  </p>
                </div>
                <button
                  onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                  className={`cursor-pointer h-8 px-3 inline-flex items-center justify-center rounded-md text-xs font-medium shadow transition-colors active:scale-95 ${
                    is2FAEnabled
                      ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20"
                      : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  }`}
                >
                  {is2FAEnabled ? "Disable" : "Enable"}
                </button>
              </div>
            </ComponentCard>

            <ComponentCard>
              <div className="p-6 pb-4">
                <h3 className="font-semibold text-sm">Compute Environment</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Select the compute environment for your cluster.
                </p>
              </div>
              <div className="px-6 pb-6 space-y-3">
                <div
                  onClick={() => setComputeEnv("kubernetes")}
                  className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    computeEnv === "kubernetes"
                      ? "border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950"
                      : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${
                        computeEnv === "kubernetes"
                          ? "border-zinc-900 dark:border-zinc-50"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">Kubernetes</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Run workloads on a K8s cluster.
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  onClick={() => setComputeEnv("vm")}
                  className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                    computeEnv === "vm"
                      ? "border-zinc-900 dark:border-zinc-50 bg-white dark:bg-zinc-950"
                      : "border-zinc-200 dark:border-zinc-800 bg-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`size-4 rounded-full border-4 flex items-center justify-center transition-colors ${
                        computeEnv === "vm"
                          ? "border-zinc-900 dark:border-zinc-50"
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}
                    ></div>
                    <div>
                      <p className="text-sm font-medium">Virtual Machine</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Access a VM configured cluster.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800/50">
                  <div>
                    <p className="text-sm font-medium">Number of GPUs</p>
                    <p className="text-[10px] text-zinc-500">
                      You can add more later.
                    </p>
                  </div>
                  <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-md">
                    <button
                      onClick={() => setGpuCount(Math.max(0, gpuCount - 1))}
                      className="cursor-pointer px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors active:bg-zinc-100 dark:active:bg-zinc-800 rounded-l-md"
                    >
                      -
                    </button>
                    <span className="px-2 text-sm text-center w-8 font-mono">
                      {gpuCount}
                    </span>
                    <button
                      onClick={() => setGpuCount(gpuCount + 1)}
                      className="cursor-pointer px-2 py-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors active:bg-zinc-100 dark:active:bg-zinc-800 rounded-r-md"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Dynamic Helper Components ---

function ComponentCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

function ToggleSwitch({
  active,
  onChange,
}: {
  active: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-9 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090b] ${
        active ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-200 dark:bg-zinc-800"
      }`}
    >
      <div
        className={`size-4 rounded-full bg-white dark:bg-zinc-950 shadow-sm transform transition-transform duration-200 ${
          active ? "translate-x-4" : "translate-x-0"
        }`}
      ></div>
    </button>
  );
}
