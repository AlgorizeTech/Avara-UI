import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@/lib/utils";
import { badgeVariants } from "./badge-variants";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

type BadgeProps = React.HTMLAttributes<HTMLElement> & {
  className?: string;
  variant?: BadgeVariant;
  asChild?: boolean;
};

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: BadgeProps) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge };
