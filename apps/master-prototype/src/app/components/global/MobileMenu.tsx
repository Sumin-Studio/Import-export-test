"use client";
import { useContext, useState, useEffect } from "react";
import {
  Popover,
  PopoverButton,
  PopoverPanel,
  PopoverBackdrop,
} from "@headlessui/react";
import {
  Hamburger,
  ChevronMobile,
  Sales,
  Purchases,
  Reporting,
  Accounting,
  Payroll,
  Tax,
  Contacts,
  Home,
  Projects,
} from "@/app/components/ui/icons";
import {
  getRegionNavigation,
  NavigationItem,
  NavigationSection,
} from "@/app/lib/RegionContent";
import {
  NavigationMenuTitle,
  NavigationMenuSection,
  NavigationMenuSectionItem,
  NavigationMenuLink,
  NavigationMenuSeparator,
} from "./NavigationMenu";
import { useRegion } from "@/app/contexts/RegionContext";
import OrgMenu from "../menus/OrgMenu";
import { BannerHeightContext } from "@/app/contexts/BannerHeightContext";

interface MenuProps {
  onClose: () => void;
  navClassName?: string;
  ulClassName?: string;
  buttonClassName?: string;
  titleClassName?: string;
  region: string;
  sectionKey: keyof ReturnType<typeof getRegionNavigation>;
}

interface Element {
  id: number;
  name: string;
  Component: React.ComponentType;
  sectionKey: keyof ReturnType<typeof getRegionNavigation>;
}

// Generic menu component that renders navigation based on region and section
const RegionBasedMenu: React.FC<MenuProps> = ({
  onClose,
  navClassName,
  region,
  sectionKey,
}) => {
  const navigation = getRegionNavigation(region);
  const section = navigation[
    sectionKey as keyof typeof navigation
  ] as NavigationSection;

  if (!section) return null;

  const renderNavigationItem = (item: NavigationItem) => {
    switch (item.type) {
      case "title":
        return (
          <NavigationMenuTitle
            key={item.id}
            hasStarIcon={item.hasStarIcon}
            className="px-5 py-2 text-[11px]/[16px] font-bold uppercase text-content-tertiary"
          >
            {item.label}
          </NavigationMenuTitle>
        );
      case "separator":
        return (
          <NavigationMenuSeparator
            key={item.id}
            className="my-3 h-px w-full border-border-primary"
          />
        );
      case "link":
        return (
          <NavigationMenuSectionItem key={item.id}>
            <NavigationMenuLink
              href={item.href}
              onClick={onClose}
              hasSettingsIcon={item.hasSettingsIcon}
              hasExternalLinkIcon={item.hasExternalLinkIcon}
              className="py-2 px-5 block cursor-pointer hover:bg-background-tertiary w-full text-left text-[15px]/[20px] text-content-primary"
            >
              {item.label}
            </NavigationMenuLink>
          </NavigationMenuSectionItem>
        );
      default:
        return null;
    }
  };

  return (
    <nav className={navClassName}>
      <NavigationMenuSection>
        {section.items.map(renderNavigationItem)}
      </NavigationMenuSection>
    </nav>
  );
};

const elements: Element[] = [
  { id: 1, name: "Sales", Component: Sales, sectionKey: "sales" },
  { id: 2, name: "Purchases", Component: Purchases, sectionKey: "purchases" },
  { id: 4, name: "Reporting", Component: Reporting, sectionKey: "reporting" },
  { id: 5, name: "Payroll", Component: Payroll, sectionKey: "payroll" },
  {
    id: 6,
    name: "Accounting",
    Component: Accounting,
    sectionKey: "accounting",
  },
  { id: 7, name: "Tax", Component: Tax, sectionKey: "tax" },
  { id: 8, name: "Contacts", Component: Contacts, sectionKey: "contacts" },
  { id: 9, name: "Projects", Component: Projects, sectionKey: "projects" },
];

export default function MobileMenu() {
  const { region } = useRegion();
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [isSBDesignStudioOpen, setIsSBDesignStudioOpen] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bannerHeight = useContext(BannerHeightContext);

  const handleToggle = (id: number): void => {
    setActiveElement((prev) => (prev === id ? null : id));
  };

  const handleSBDSToggle = (): void => {
    setIsSBDesignStudioOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover className="relative inline-flex nav-1049:hidden">
      {({ close, open }: { close: () => void; open: boolean }) => {
        // Update our local state when Popover's open state changes
        if (open !== isOpen) {
          setIsOpen(open);
        }
        return (
          <>
            <PopoverButton className="flex cursor-pointer h-16 w-16 items-center justify-center bg-content-primary/10 outline-none hover:bg-content-primary/50 focus-visible:ring-[2px] focus-visible:ring-inset focus-visible:ring-white/75 data-[active]:bg-content-primary/50">
              <Hamburger />
              <span className="sr-only">Menu</span>
            </PopoverButton>
            <PopoverBackdrop
              className="linear fixed inset-0 top-16 bg-content-primary/75 transition duration-200 data-[closed]:opacity-0"
              transition
              style={{ top: `${bannerHeight + 64}px` }}
            />
            <PopoverPanel
              transition
              className="fixed w-[284px] bottom-0 data-closed:-translate-x-full transition linear duration-300 origin-left overflow-x-hidden overflow-y-scroll bg-background-primary shadow-[0px_1px_4px_2px_rgba(0,0,0,0.10)] z-[60]"
              style={{
                top: `${bannerHeight + 64}px`,
              }}
            >
              <div>
                <button
                  className="mb-2 flex w-full cursor-pointer items-center justify-between border-b border-[#CCCED2] p-3 text-[15px]/[24px] text-content-primary"
                  onClick={handleSBDSToggle}
                  type="button"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className="flex size-10 items-center justify-center">
                      <span className="flex size-8 flex-none items-center justify-center rounded-[3px] bg-[#9EEEFD] text-center text-[13px]/[20px] font-bold uppercase">
                        FS
                      </span>
                    </span>
                    Foxglove Studios
                  </span>
                  <span className="ml-auto flex size-10 transform items-center justify-center">
                    <ChevronMobile />
                  </span>
                </button>
                <div
                  className={`linear absolute bottom-0 top-0 z-10 w-[284px] transform bg-background-primary text-[14px] text-content-primary duration-300 ${
                    isSBDesignStudioOpen
                      ? "translate-x-0 overflow-y-scroll"
                      : "translate-x-full overflow-y-hidden"
                  }`}
                >
                  <OrgMenu
                    onClose={close}
                    showBackButton={true}
                    onBackClick={handleSBDSToggle}
                  />
                </div>
                <button
                  className="group flex w-full cursor-pointer items-center justify-items-start gap-2 px-3 text-[15px]/[24px] font-medium text-content-primary"
                  type="button"
                >
                  <span className="flex size-10 items-center justify-center">
                    <Home className="stroke-current" />
                  </span>
                  Home
                </button>
                {elements.map(({ id, name, Component, sectionKey }) => (
                  <div key={id}>
                    <button
                      className="group flex w-full cursor-pointer items-center justify-items-start gap-2 px-3 text-[15px]/[24px] font-medium text-content-primary"
                      onClick={() => {
                        handleToggle(id);
                      }}
                      type="button"
                    >
                      <span className="flex size-10 items-center justify-center">
                        <Component />
                      </span>
                      {name}
                      <span className="ml-auto flex size-10 items-center justify-center">
                        <ChevronMobile />
                      </span>
                    </button>
                    <div
                      className={`linear absolute bottom-0 top-0 z-10 w-[284px] transform bg-background-primary duration-300 ${
                        activeElement === id
                          ? "translate-x-0"
                          : "translate-x-full"
                      }`}
                    >
                      <button
                        className="group flex w-full items-center justify-items-start gap-2 border-b border-[#CCCED2] cursor-pointer pl-5 pr-3 py-2 text-[15px]/[24px] font-medium text-content-primary"
                        onClick={() => {
                          handleToggle(id);
                        }}
                        type="button"
                      >
                        {name}
                        <span className="ml-auto flex size-10 items-center justify-center rotate-180">
                          <ChevronMobile />
                        </span>
                      </button>
                      <RegionBasedMenu
                        region={region}
                        sectionKey={sectionKey}
                        navClassName="text-sm text-content-primary py-3"
                        onClose={close}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
}
