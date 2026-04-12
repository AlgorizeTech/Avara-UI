"use client";
import React, { useState } from "react";
import { ComponentCard, ToggleSwitch } from "../ui/base";

export function NotificationsBlock() {
  const [strictMode, setStrictMode] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);

  return (
    <ComponentCard>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium cursor-pointer select-none" onClick={() => setStrictMode(!strictMode)}>Strict Mode</label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Enable strict type checking.</p>
          </div>
          <ToggleSwitch active={strictMode} onChange={() => setStrictMode(!strictMode)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium cursor-pointer select-none" onClick={() => setPushNotifications(!pushNotifications)}>Push Notifications</label>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Receive alerts on your device.</p>
          </div>
          <ToggleSwitch active={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />
        </div>
      </div>
    </ComponentCard>
  );
}

export function SecurityBlock() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  return (
    <ComponentCard>
      <div className="p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm">Two-factor authentication</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Verify via email or phone number.</p>
        </div>
        <button onClick={() => setIs2FAEnabled(!is2FAEnabled)} className={`cursor-pointer h-8 px-3 inline-flex items-center justify-center rounded-md text-xs font-medium shadow transition-colors active:scale-95 ${is2FAEnabled ? "bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 border border-red-500/20" : "bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"}`}>
          {is2FAEnabled ? "Disable" : "Enable"}
        </button>
      </div>
    </ComponentCard>
  );
}