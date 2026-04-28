"use client";

import * as React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";
import { ExternalLink, Settings, Star } from "@/app/components/ui/icons";
import { usePrototypeHref } from "@/app/contexts/PrototypeBasePathContext";

interface NavigationMenuProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "relative z-10 flex gap-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
NavigationMenu.displayName = "NavigationMenu";

interface NavigationMenuListProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenuList = React.forwardRef<
  HTMLUListElement,
  NavigationMenuListProps
>(({ className, children, ...props }, ref) => (
  <ul
    ref={ref}
    className={clsx(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  >
    {children}
  </ul>
));
NavigationMenuList.displayName = "NavigationMenuList";

interface NavigationMenuItemProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(({ className, children, ...props }, ref) => (
  <li ref={ref} className={className} {...props}>
    {children}
  </li>
));
NavigationMenuItem.displayName = "NavigationMenuItem";

interface NavigationMenuTriggerProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavigationMenuTrigger = React.forwardRef<
  HTMLButtonElement,
  NavigationMenuTriggerProps
>(({ className, children, ...props }, ref) => {
  return (
    <PopoverButton
      ref={ref}
      className={clsx(
        "tab-focus relative h-10 rounded-[20px] cursor-pointer px-3 text-[15px] font-medium outline-none hover:bg-content-primary/50 focus-visible:ring-2 focus-visible:ring-white/75 data-[active]:bg-content-primary/65",
        className
      )}
      {...props}
    >
      {children}
    </PopoverButton>
  );
});
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

interface NavigationMenuContentProps {
  className?: string;
  children: React.ReactNode | ((props: { close?: () => void }) => React.ReactNode);
  navClassName?: string;
  close?: () => void;
}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, children, navClassName, close, ...props }, ref) => (
  <PopoverPanel
    ref={ref}
    transition
    anchor={{ to: "bottom start" }}
    className={clsx(
      "z-20 flex w-[300px] origin-top translate-y-0 [--anchor-gap:20px] flex-col overflow-visible rounded-lg border border-border-primary bg-background-secondary text-sm opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out data-[closed]:translate-y-1 data-[closed]:opacity-0",
      className
    )}
    {...props}
  >
    <nav
      className={clsx(
        "text-content-tertiary py-3 z-20 text-[15px]/[20px]",
        navClassName
      )}
    >
      {typeof children === "function" ? children({ close }) : children}
    </nav>
  </PopoverPanel>
));
NavigationMenuContent.displayName = "NavigationMenuContent";

interface NavigationMenuTitleProps {
  className?: string;
  children: React.ReactNode;
  hasStarIcon?: boolean;
}

const NavigationMenuTitle: React.FC<NavigationMenuTitleProps> = ({
  className,
  children,
  hasStarIcon,
}) => (
  <div
    className={clsx(
      "flex items-center justify-between px-5 py-2 text-[11px]/[16px] font-bold uppercase",
      className
    )}
  >
    <span className="block w-full">{children}</span>
    {hasStarIcon && <Star />}
  </div>
);

interface NavigationMenuSectionProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenuSection: React.FC<NavigationMenuSectionProps> = ({
  className,
  children,
}) => (
  <ul className={clsx("flex flex-col list-none", className)}>{children}</ul>
);

interface NavigationMenuSectionItemProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenuSectionItem: React.FC<NavigationMenuSectionItemProps> = ({
  className,
  children,
}) => <li className={className}>{children}</li>;

interface NavigationMenuLinkProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  hasSettingsIcon?: boolean;
  hasExternalLinkIcon?: boolean;
}

const NavigationMenuLink = React.forwardRef<
  HTMLAnchorElement,
  NavigationMenuLinkProps
>(
  (
    {
      className,
      children,
      onClick,
      href,
      hasSettingsIcon,
      hasExternalLinkIcon,
      ...props
    },
    ref
  ) => {
    const resolvedHref = usePrototypeHref(href);
    const baseClassName = clsx(
      "py-2 px-5 block cursor-pointer hover:bg-background-tertiary w-full text-left",
      (hasSettingsIcon || hasExternalLinkIcon) &&
        "flex items-center justify-between",
      className
    );

    // If href is provided, use Next.js Link
    if (resolvedHref) {
      return (
        <Link
          ref={ref}
          href={resolvedHref}
          onClick={onClick}
          className={baseClassName}
          {...props}
        >
          <span>{children}</span>
          {hasSettingsIcon && <Settings />}
          {hasExternalLinkIcon && <ExternalLink />}
        </Link>
      );
    }

    // Otherwise, use button (for backwards compatibility)
    return (
      <button
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        onClick={onClick}
        className={baseClassName}
        {...props}
      >
        <span>{children}</span>
        {hasSettingsIcon && <Settings />}
        {hasExternalLinkIcon && <ExternalLink />}
      </button>
    );
  }
);
NavigationMenuLink.displayName = "NavigationMenuLink";

// Menu separator component
interface NavigationMenuSeparatorProps {
  className?: string;
}

const NavigationMenuSeparator: React.FC<NavigationMenuSeparatorProps> = ({
  className,
}) => (
  <hr className={clsx("my-3 h-px w-full border-border-primary", className)} />
);

// Create a wrapper component that combines Popover functionality
interface NavigationMenuDropdownProps {
  trigger: React.ReactNode;
  content: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);
  className?: string;
}

const NavigationMenuDropdown: React.FC<NavigationMenuDropdownProps> = ({
  trigger,
  content,
  className,
}) => (
  <Popover className={clsx("relative", className)}>
    {({ close }: { close: () => void }) => (
      <>
        {trigger}
        {React.isValidElement(content)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? React.cloneElement(content as React.ReactElement<any>, { close })
          : typeof content === "function"
          ? (content as (props: { close: () => void }) => React.ReactNode)({ close })
          : content}
      </>
    )}
  </Popover>
);

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuSeparator,
  NavigationMenuTitle,
  NavigationMenuSection,
  NavigationMenuSectionItem,
  NavigationMenuDropdown,
};
