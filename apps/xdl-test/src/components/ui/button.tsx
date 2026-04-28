import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1 whitespace-nowrap font-medium transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 focus-visible:outline  focus-visible:outline-ring focus-visible:outline-2 focus-visible:outline-offset-1 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-theme-background text-primary-foreground hover:bg-theme-secondary-hover active:bg-theme-secondary-active dark:bg-theme-background-dark dark:text-text-default dark:hover:bg-theme-secondary-hover-dark dark:active:bg-theme-secondary-active-dark disabled:bg-action-disabled-default",
        secondary:
          "border border-border-subtle bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 active:bg-action-secondary-active dark:active:bg-action-secondary-active-dark disabled:opacity-50",
        tertiary:
          "bg-transparent text-secondary-foreground hover:bg-secondary/80 disabled:opacity-50",
        destructive:
          "bg-background-primary hover:bg-action-negative-hover active:bg-action-negative-active text-sentiment-negative-foreground border border-sentiment-negative-foreground focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 disabled:bg-action-disabled-default disabled:text-primary-foreground disabled:border-action-disabled-default",
        inverse:
          "bg-background-inverse-primary text-text-inverse hover:bg-action-inverse-hover active:bg-action-inverse-active disabled:opacity-50 focus-visible:outline-sentiment-standard-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-3 py-2 has-[>svg]:px-3 rounded-large text-sm",
        sm: "h-8 rounded-small gap-1.5 px-2 py-1.5 has-[>svg]:px-2.5 rounded-medium text-[13px]",
        xs: "h-7 rounded-small gap-1.5 px-2 py-1 has-[>svg]:px-2.5 text-[13px]",
        icon: "size-10 p-2 rounded-large",
        "icon-sm": "size-8 p-1.5 rounded-medium",
        "icon-xs": "size-7 p-1 rounded-small",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
