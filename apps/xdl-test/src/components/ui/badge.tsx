import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { clsx } from "clsx";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden leading-none",
  {
    variants: {
      variant: {
        default:
          "text-text-faint [a&]:hover:bg-accent [a&]:hover:text-accent-foreground border-border-soft",
        neutral:
          "border-transparent bg-sentiment-neutral-background text-sentiment-neutral-foreground [a&]:hover:bg-primary/90",
        positive:
          "border-transparent bg-sentiment-positive-background text-sentiment-positive-foreground [a&]:hover:bg-secondary/90",
        negative:
          "border-transparent bg-sentiment-negative-background text-sentiment-negative-foreground [a&]:hover:bg-sentiment-negative-background/90 focus-visible:ring-sentiment-negative-background/20 dark:focus-visible:ring-sentiment-negative-background/40 dark:bg-sentiment-negative-background/60",
        warning:
          "border-transparent bg-sentiment-warning-background text-sentiment-warning-foreground [a&]:hover:bg-secondary/90",
        inform:
          "border-transparent bg-sentiment-inform-background text-sentiment-inform-foreground [a&]:hover:bg-secondary/90",
      },
      size: {
        xsmall: "px-2 py-0.5 text-size-11",
        small: "px-2 py-1 text-size-12",
        medium: "px-3 py-1.5 text-size-13",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "small",
    },
  }
);

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={clsx(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
