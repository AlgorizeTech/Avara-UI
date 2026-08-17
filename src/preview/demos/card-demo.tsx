"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { Bell, CreditCard, Download, Settings, Upload } from "lucide-react";

export default function CardDemo({
  variant = "bordered",
  interactive = false,
  layout = "standard",
}: {
  variant?: "bordered" | "default" | "flat";
  interactive?: boolean;
  layout?: "standard" | "grid" | "stats";
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden">
      {layout === "standard" && (
        <Card variant={variant} interactive={interactive} className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Bell className="w-5 h-5 text-indigo-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">System Update</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  A new version is available.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
              <Settings className="w-5 h-5 text-rose-500" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Account Notice</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Please verify your email address.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
            <button className="w-full py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              Mark all as read
            </button>
          </CardFooter>
        </Card>
      )}

      {layout === "grid" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="w-5 h-5 text-emerald-500" /> Download Report
              </CardTitle>
              <CardDescription>
                Export your analytics data as a CSV file for external processing.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-500" /> Import Data
              </CardTitle>
              <CardDescription>
                Upload legacy customer profiles to merge into your active CRM.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      )}

      {layout === "stats" && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Total Revenue
              </CardTitle>
              <CreditCard className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Subscriptions
              </CardTitle>
              <Bell className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+2350</div>
              <p className="text-xs text-emerald-500 font-medium mt-1">
                +180.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card variant={variant} interactive={interactive}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">
                Active Now
              </CardTitle>
              <Settings className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-zinc-500 font-medium mt-1">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
