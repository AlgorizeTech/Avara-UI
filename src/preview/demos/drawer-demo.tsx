"use client";

import {
  Button,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "@/components/custom/blocks/Drawer";
import React, { useState } from "react";

type Side = "top" | "bottom" | "left" | "right";

/** One trigger + one drawer, so several can live side by side in a frame. */
function DrawerTile({ side }: { side: Side }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        {side}
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen} side={side}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>side=&quot;{side}&quot;</DrawerTitle>
            <DrawerDescription>
              The drawer slides in from the {side} edge and sizes itself to
              match.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default function DrawerDemo({
  side = "right",
  open = false,
  showAll,
}: {
  side?: Side;
  open?: boolean;
  /** Render-all mode: one trigger per edge in a single frame. */
  showAll?: "sides";
}) {
  const [isOpen, setIsOpen] = useState(open);

  React.useEffect(() => {
    setIsOpen(open);
  }, [open]);

  if (showAll === "sides") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-4 min-h-[400px] bg-background transition-colors duration-300">
        {(["top", "right", "bottom", "left"] as Side[]).map((s) => (
          <DrawerTile key={s} side={s} />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[500px] py-8 px-4 bg-background transition-colors duration-300">
      <Button onClick={() => setIsOpen(true)}>Open Drawer ({side})</Button>

      <Drawer open={isOpen} onOpenChange={setIsOpen} side={side}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Interactive Drawer</DrawerTitle>
            <DrawerDescription>
              This drawer slides in from the {side}. It uses CSS transitions for
              butter-smooth easing and handles its own unmount lifecycles.
            </DrawerDescription>
          </DrawerHeader>

          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="p-4 rounded-xl border border-border bg-muted/50">
                <p className="text-sm font-medium text-foreground/80">
                  Put your navigation links, forms, or detailed information
                  inside this content area. Scroll works perfectly without
                  pushing the header off screen.
                </p>
              </div>
              <div className="h-8 w-3/4 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-1/2 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-full bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-2/3 bg-muted rounded-md animate-pulse" />
              <div className="h-8 w-full bg-muted rounded-md animate-pulse" />
            </div>
          </div>

          <DrawerFooter>
            <Button onClick={() => setIsOpen(false)}>Save changes</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
