"use client";

import {
  LiquidGlassSvgFilter,
  Modal,
  type ModalVariant,
} from "@/components/custom/blocks/ModalBlock";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { accentStyle } from "@/lib/accent";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export type ModalLayout =
  | "standard"
  | "form"
  | "confirmation"
  | "fullscreen"
  | "glass"
  | "liquid-glass";

export default function ModalDemo({
  layout = "standard",
  color = "primary",
}: {
  layout?: ModalLayout;
  color?: string;
}) {
  const isGlass = layout === "glass" || layout === "liquid-glass";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center min-h-[550px] overflow-hidden",
        isGlass
          ? "p-0 -my-6 -mx-4 w-[calc(100%+2rem)] min-w-[calc(100%+2rem)] max-w-none min-h-[550px]"
          : "w-full p-4 sm:p-8"
      )}
      style={accentStyle(color)}
    >
      <LiquidGlassSvgFilter />
      {isGlass && (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_1200,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg")',
          }}
        />
      )}
      {isGlass && (
        <div className="absolute inset-0 bg-black/25 pointer-events-none z-0" />
      )}

      {layout === "standard" && <StandardModal />}
      {layout === "form" && <FormModal />}
      {layout === "confirmation" && <ConfirmationModal />}
      {layout === "fullscreen" && <FullscreenModal />}
      {layout === "glass" && <GlassModal />}
      {layout === "liquid-glass" && <LiquidGlassModal />}
    </div>
  );
}

const triggerClass =
  "px-6 py-3 rounded-lg font-semibold transition-transform active:scale-95 shadow-md bg-primary hover:bg-primary/90 text-primary-foreground cursor-pointer";

/** Standard update modal variant — pass only variant, title, badge, description, and buttons */
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
        variant="standard"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}

/** Form modal variant — pass variant, title, and form inputs as children */
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
        variant="form"
        title="Invite Team Member"
        cancelText="Cancel"
        confirmText="Send Invite"
        onConfirm={() => setIsOpen(false)}
      >
        <div className="space-y-4">
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
        </div>
      </Modal>
    </>
  );
}

/** Confirmation modal variant — pass only variant, title, description, and action buttons */
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
        variant="confirmation"
        title="Delete permanently?"
        description="Are you sure you want to delete this item? This action cannot be undone and all data will be lost."
        cancelText="Cancel"
        confirmText="Delete"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}

/** Fullscreen modal variant — wide scrollable layout with pinned actions */
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
        variant="fullscreen"
        title="Project Configuration"
        description="Manage all global settings for your workspace."
        deleteText="Delete Project"
        cancelText="Discard Changes"
        confirmText="Save Configuration"
        onConfirm={() => setIsOpen(false)}
        onDelete={() => setIsOpen(false)}
      >
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
      </Modal>
    </>
  );
}

/** Glass modal variant — beautiful frosted glass blur effect */
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
        variant="glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}

/** Liquid Glass modal variant — our modal design with authentic liquid glass refraction */
function LiquidGlassModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`relative z-10 ${triggerClass}`}
      >
        Open Liquid Glass Modal
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="liquid-glass"
        title="System Update Available"
        badge="v2.4.0 Live"
        icon={<Sparkles className="w-6 h-6 text-white drop-shadow-sm" />}
        description="A new software update is ready to be installed. This update includes new features, performance improvements, and critical security patches."
        cancelText="Remind Me Later"
        confirmText="Install Now"
        onConfirm={() => setIsOpen(false)}
      />
    </>
  );
}
