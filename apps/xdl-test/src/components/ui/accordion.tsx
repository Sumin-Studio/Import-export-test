"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

import { cn } from "@/lib/utils";
import Icon from "@/components/ui/icon";

function Accordion({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn(className)}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "border-border-subtle data-[state=open]:before:bg-action-default relative border-b last:border-b-0 data-[state=open]:before:absolute data-[state=open]:before:inset-y-0 data-[state=open]:before:left-0 data-[state=open]:before:w-[3px] data-[state=open]:before:rounded-full",
        className
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 text-body-standard-semibold flex flex-1 items-center gap-3 px-4 py-3 text-left transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>[data-slot=accordion-chevron]]:rotate-180",
          className
        )}
        {...props}
      >
        <span
          data-slot="accordion-chevron"
          className="flex shrink-0 items-center justify-center transition-transform duration-200"
        >
          <Icon
            name="ChevronDown"
            size="xsmall"
            className="text-icon-default"
          />
        </span>
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionTriggerContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="accordion-trigger-content"
      className={cn("flex min-w-0 flex-1 items-center gap-3", className)}
      {...props}
    />
  );
}

function AccordionAvatar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="accordion-avatar"
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}

function AccordionTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="accordion-title"
      className={cn(
        "text-body-standard-semibold text-text-default truncate",
        className
      )}
      {...props}
    />
  );
}

function AccordionDescription({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="accordion-description"
      className={cn(
        "text-body-small-regular text-muted-foreground truncate",
        className
      )}
      {...props}
    />
  );
}

function AccordionSecondaryHeading({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="accordion-secondary-heading"
      className={cn(
        "text-body-standard-regular text-text-default truncate",
        className
      )}
      {...props}
    />
  );
}

function AccordionValue({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="accordion-value"
      className={cn(
        "text-body-standard-regular text-text-default ml-auto shrink-0 tabular-nums",
        className
      )}
      {...props}
    />
  );
}

function AccordionActions({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
    <div
      data-slot="accordion-actions"
      className={cn("flex shrink-0 items-center gap-1", className)}
      onClick={(e) => e.stopPropagation()}
      {...props}
    />
  );
}

function AccordionContent({
  className,
  children,
  pop,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content> & {
  pop?: boolean;
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn(
        "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down border-border-subtle border-t text-sm",
        pop
          ? "shadow-pop border-border-subtle bg-background-primary relative z-10 -mx-2 border-x"
          : "overflow-hidden"
      )}
      {...props}
    >
      <div className={cn("px-4 py-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionTriggerContent,
  AccordionAvatar,
  AccordionTitle,
  AccordionDescription,
  AccordionSecondaryHeading,
  AccordionValue,
  AccordionActions,
  AccordionContent,
};
