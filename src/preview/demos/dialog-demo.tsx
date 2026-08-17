"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/blocks/DialogBlock";
import { Settings, Trash2, UserPlus } from "lucide-react";
import { useState } from "react";

export default function DialogDemo({
  layout = "standard",
}: {
  layout?: "standard" | "form" | "destructive" | "no-close" | "controlled";
}) {
  return (
    <div className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden">
      {layout === "standard" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-md shadow-sm transition-colors">
              <UserPlus className="w-4 h-4" /> Share Profile
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Profile</DialogTitle>
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2 my-4">
              <input
                className="flex h-10 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value="https://nexus.dev/u/johndoe"
                readOnly
              />
              <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm shrink-0">
                Copy Link
              </button>
            </div>
            <DialogFooter>
              <p className="text-xs text-zinc-500 text-left w-full sm:text-right mt-2 sm:mt-0 pt-2 border-t dark:border-zinc-800">
                Your profile is currently public.
              </p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "form" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-semibold rounded-md shadow-sm transition-colors">
              <Settings className="w-4 h-4 text-zinc-500" /> Edit Profile
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="name"
                  className="text-right text-sm font-medium"
                >
                  Name
                </label>
                <input
                  id="name"
                  defaultValue="John Doe"
                  className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label
                  htmlFor="username"
                  className="text-right text-sm font-medium"
                >
                  Username
                </label>
                <input
                  id="username"
                  defaultValue="@johndoe"
                  className="col-span-3 h-10 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <DialogFooter>
              {/* Closing behavior would normally be attached here */}
              <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm">
                Save changes
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "destructive" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 text-sm font-semibold rounded-md shadow-sm transition-colors">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-red-600 flex items-center gap-2">
                <Trash2 className="w-5 h-5" /> Are you absolutely sure?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete
                your account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex w-full sm:w-auto gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm">
                  Cancel
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md shadow-sm">
                  Yes, delete account
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "no-close" && (
        <Dialog>
          <DialogTrigger>
            <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-md shadow-sm transition-colors">
              <Settings className="w-4 h-4" /> Accept terms
            </button>
          </DialogTrigger>
          <DialogContent hideCloseButton>
            <DialogHeader>
              <DialogTitle>Terms of Service</DialogTitle>
              <DialogDescription>
                There is no “X” here — the user has to pick one of the buttons
                below (or press Escape).
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <div className="flex w-full sm:w-auto gap-2">
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white text-sm font-medium rounded-md shadow-sm">
                  Decline
                </button>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm">
                  Accept
                </button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {layout === "controlled" && <ControlledDialog />}
    </div>
  );
}

/** Open state owned by the parent, so the dialog can close itself after work finishes. */
function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    // Stand-in for an API call.
    setTimeout(() => {
      setSaving(false);
      setOpen(false);
    }, 1200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button className="flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-md shadow-sm transition-colors">
          <Settings className="w-4 h-4" /> Save settings
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save settings</DialogTitle>
          <DialogDescription>
            The dialog closes itself once the save finishes.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md shadow-sm disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
