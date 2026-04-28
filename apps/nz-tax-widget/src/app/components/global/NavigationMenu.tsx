import * as React from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { clsx } from "clsx";
import Link from "next/link";
import { ExternalLink, Settings, Star } from "@/app/components/ui/icons";

interface NavigationMenuProps {
  className?: string;
  children: React.ReactNode;
}

const NavigationMenu = React.forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        "relative z-10 flex items-center justify-center",
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
      "group flex flex-1 list-none items-center justify-center gap-2",
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
  onClick?: () => void;
}

const NavigationMenuItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuItemProps
>(({ className, children, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    // Dispatch event for navigation menu hint popover with element reference
    if (typeof window !== "undefined") {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const navKey = (e.currentTarget as HTMLElement).getAttribute(
        "data-nav-key"
      );
      window.dispatchEvent(
        new CustomEvent("navigationMenuTriggered", {
          detail: {
            element: e.currentTarget,
            navKey: navKey,
            rect: {
              top: rect.top,
              left: rect.left,
              bottom: rect.bottom,
              right: rect.right,
              width: rect.width,
              height: rect.height,
            },
          },
        })
      );
    }
    onClick?.();
  };

  return (
    <li ref={ref} className={className} onClick={handleClick} {...props}>
      {children}
    </li>
  );
});
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
        "tab-focus hover:bg-content-primary/50 data-[active]:bg-content-primary/65 relative h-10 cursor-pointer rounded-[20px] px-3 text-[15px] font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/75",
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
  children: React.ReactNode;
  navClassName?: string;
}

const NavigationMenuContent = React.forwardRef<
  HTMLDivElement,
  NavigationMenuContentProps
>(({ className, children, navClassName, ...props }, ref) => (
  <PopoverPanel
    ref={ref}
    transition
    anchor={{ to: "bottom start" }}
    className={clsx(
      "border-border-primary bg-background-secondary z-20 flex w-[300px] origin-top translate-y-0 flex-col overflow-visible rounded-lg border text-sm opacity-100 shadow-[0px_3px_6px_0px_rgba(0,10,30,0.20)] transition ease-in-out [--anchor-gap:20px] data-[closed]:translate-y-1 data-[closed]:opacity-0",
      className
    )}
    {...props}
  >
    <nav
      className={clsx(
        "text-content-tertiary z-20 py-3 text-[15px]/[20px]",
        navClassName
      )}
    >
      {children}
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
  <ul className={clsx("flex list-none flex-col", className)}>{children}</ul>
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
  HTMLButtonElement | HTMLAnchorElement,
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
    const linkClassName = clsx(
      "hover:bg-background-tertiary block w-full cursor-pointer px-5 py-2 text-left",
      (hasSettingsIcon || hasExternalLinkIcon) &&
        "flex items-center justify-between",
      className
    );

    if (href) {
      return (
        <Link
          href={href}
          className={linkClassName}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          <span>{children}</span>
          {hasSettingsIcon && <Settings />}
          {hasExternalLinkIcon && <ExternalLink />}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        onClick={onClick}
        className={linkClassName}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
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
  <hr className={clsx("border-border-primary my-3 h-px w-full", className)} />
);

// Create a wrapper component that combines Popover functionality
interface NavigationMenuDropdownProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const NavigationMenuDropdown: React.FC<NavigationMenuDropdownProps> = ({
  trigger,
  content,
  className,
}) => (
  <Popover className={clsx("relative", className)}>
    {trigger}
    {content}
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
