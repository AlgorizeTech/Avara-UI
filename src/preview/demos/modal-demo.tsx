"use client";

import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@/components/custom/blocks/ModalBlock";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { accentStyle } from "@/lib/accent";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

export type ModalLayout =
  | "standard"
  | "form"
  | "confirmation"
  | "fullscreen"
  | "glass";

/**
 * Every layout below is ordinary composition — `Modal` plus the header, body
 * and footer slots — so what the preview renders is exactly what the Usage tab
 * hands you. Nothing here is baked into the component.
 */
export default function ModalDemo({
  layout = "standard",
  color = "primary",
}: {
  layout?: ModalLayout;
  color?: string;
}) {
  return (
    <div
      className={`relative w-full flex items-center justify-center min-h-[550px] overflow-hidden ${
        layout === "glass" ? "p-4 sm:p-8 bg-cover bg-center" : ""
      }`}
      style={{
        ...accentStyle(color),
        ...(layout === "glass"
          ? {
              backgroundImage:
                'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
            }
          : {}),
      }}
    >
      {layout === "glass" && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-0" />
      )}

      {layout === "standard" && <StandardModal />}
      {layout === "form" && <FormModal />}
      {layout === "confirmation" && <ConfirmationModal />}
      {layout === "fullscreen" && <FullscreenModal />}
      {layout === "glass" && <GlassModal />}
    </div>
  );
}

const triggerClass =
  "px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer";

/** Icon, headline, body copy and a pair of actions — the everyday shape. */
function StandardModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={triggerClass}>
        Open Standard Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="max-w-md bg-background rounded-2xl shadow-xl border border-border"
      >
        <div className="p-2 sm:p-4">
          <ModalHeader
            className="border-none p-4 pb-2 flex items-start justify-between gap-4"
            title={
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border bg-primary/10 text-primary border-primary/30">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    System Update Available
                  </h2>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    v2.4.0 Live
                  </span>
                </div>
              </div>
            }
          />
          <ModalBody className="p-4 pt-2 space-y-2">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
              A new software update is ready to be installed. This update
              includes new features, performance improvements, and critical
              security patches.
            </p>
          </ModalBody>
          <ModalFooter className="border-none p-4 pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Remind Me Later
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            >
              Install Now
            </button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}

/** A wider panel whose body is just your form markup. */
function FormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [inviteRole, setInviteRole] = useState("Viewer");

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={triggerClass}>
        Open Form Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="max-w-lg bg-background rounded-2xl shadow-xl border border-border"
      >
        <ModalHeader className="border-b border-border/60">
          <h2 className="text-lg font-semibold text-foreground">
            Invite Team Member
          </h2>
        </ModalHeader>
        <ModalBody className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Email Address
            </label>
            <input
              type="email"
              placeholder="colleague@company.com"
              className="w-full h-11 px-3 rounded-lg border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 border-border transition-shadow focus:ring-primary"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Role & Permissions
            </label>
            <SelectBlock
              options={[
                { label: "Viewer", value: "Viewer" },
                { label: "Editor", value: "Editor" },
                { label: "Administrator", value: "Administrator" },
              ]}
              value={inviteRole}
              onChange={setInviteRole}
              placeholder="Select a role"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">
              Personal Message (Optional)
            </label>
            <textarea
              placeholder="Welcome to the team!"
              rows={3}
              className="w-full p-3 rounded-lg border bg-background/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 border-border transition-shadow resize-none focus:ring-primary"
            />
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-border bg-muted/50">
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 rounded-lg font-medium text-muted-foreground hover:bg-muted/50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="px-5 py-2.5 rounded-lg font-semibold shadow-sm transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
          >
            Send Invite
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}

/** No header slot at all — a centred body carries the whole message. */
function ConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={triggerClass}>
        Open Confirmation Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        contentClassName="max-w-sm bg-background rounded-2xl shadow-xl border border-border"
        ariaLabel="Delete permanently?"
      >
        <ModalBody className="p-6 sm:p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 border shadow-sm transition-colors bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Delete permanently?
          </h2>
          <p className="text-sm text-foreground font-medium leading-relaxed mb-8">
            Are you sure you want to delete this item? This action cannot be
            undone and all data will be lost.
          </p>
          <div className="flex gap-3 w-full">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 rounded-lg font-medium text-muted-foreground border border-border hover:bg-muted transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 py-2.5 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors cursor-pointer"
            >
              Delete
            </button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

/** A tall panel: header and footer pinned, body taking the remaining height. */
function FullscreenModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={triggerClass}>
        Open Fullscreen Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        // max-h, not h: the panel is as tall as its content up to 90% of the
        // visible screen (dvh excludes the phone's browser bars), then the
        // body scrolls between the pinned header and footer.
        contentClassName="max-w-5xl max-h-[90dvh] bg-background rounded-2xl shadow-xl border border-border"
      >
        <ModalHeader className="border-b border-border pr-12">
          <div className="min-w-0">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              Project Configuration
            </h2>
            <p className="text-sm text-muted-foreground mt-1 font-normal">
              Manage all global settings for your workspace.
            </p>
          </div>
        </ModalHeader>
        <ModalBody className="max-h-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 p-2">
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                General
              </h3>
              <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
              <div className="h-24 w-full bg-muted rounded-lg animate-pulse" />
              <div className="h-12 w-3/4 bg-muted rounded-lg animate-pulse" />
            </div>
            <div className="space-y-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                Security
              </h3>
              <div className="h-32 w-full bg-muted rounded-lg animate-pulse" />
              <div className="h-12 w-full bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
        </ModalBody>
        {/* One row that wraps: Delete left, Discard + Save right. Phones get
            the short labels and compact buttons so all three fit a line. */}
        <ModalFooter className="border-t border-border bg-muted flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-6 sm:py-4">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Delete project"
            className="px-3 py-2 rounded-lg text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            Delete<span className="hidden sm:inline"> Project</span>
          </button>
          <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Discard changes"
              className="px-3 py-2 sm:px-4 rounded-lg text-sm font-medium text-muted-foreground hover:bg-background hover:text-foreground transition-colors cursor-pointer"
            >
              Discard<span className="hidden sm:inline"> Changes</span>
            </button>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Save configuration"
              className="px-4 py-2 sm:px-5 rounded-lg text-sm font-semibold shadow-sm transition-opacity bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            >
              Save<span className="hidden sm:inline"> Configuration</span>
            </button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

/** The same composition as Standard, restyled purely through the two class props. */
function GlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`relative z-10 ${triggerClass}`}
      >
        Open Glass Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        overlayClassName="bg-black/50 backdrop-blur-md"
        contentClassName="max-w-md bg-card/80 backdrop-blur-2xl backdrop-saturate-200 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-white/60 dark:border-white/20 text-foreground"
      >
        <div className="p-2 sm:p-4">
          <ModalHeader
            className="border-none p-4 pb-2 flex items-start justify-between gap-4"
            title={
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all border bg-white/50 dark:bg-white/10 border-white/40 dark:border-white/20 text-foreground">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    System Update Available
                  </h2>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    v2.4.0 Live
                  </span>
                </div>
              </div>
            }
          />
          <ModalBody className="p-4 pt-2 space-y-2">
            <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
              A new software update is ready to be installed. This update
              includes new features, performance improvements, and critical
              security patches.
            </p>
          </ModalBody>
          <ModalFooter className="border-none p-4 pt-4 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              Remind Me Later
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 active:scale-95 transition-all bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer"
            >
              Install Now
            </button>
          </ModalFooter>
        </div>
      </Modal>
    </>
  );
}
