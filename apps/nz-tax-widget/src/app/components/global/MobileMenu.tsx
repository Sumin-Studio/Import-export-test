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
  Home,
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
import OrgMenu from "@/components/menus/OrgMenu";
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

  if (!section || !section.items || section.items.length === 0) return null;

  const renderNavigationItem = (item: NavigationItem) => {
    switch (item.type) {
      case "title":
        return (
          <NavigationMenuTitle
            key={item.id}
            hasStarIcon={item.hasStarIcon}
            className="text-content-tertiary px-5 py-2 text-[11px]/[16px] font-bold uppercase"
          >
            {item.label}
          </NavigationMenuTitle>
        );
      case "separator":
        return (
          <NavigationMenuSeparator
            key={item.id}
            className="border-border-primary my-3 h-px w-full"
          />
        );
      case "link":
        return (
          <NavigationMenuSectionItem key={item.id}>
            <NavigationMenuLink
              href={"href" in item ? item.href : undefined}
              onClick={onClose}
              hasSettingsIcon={item.hasSettingsIcon}
              hasExternalLinkIcon={item.hasExternalLinkIcon}
              className="hover:bg-background-tertiary text-content-primary block w-full cursor-pointer px-5 py-2 text-left text-[15px]/[20px]"
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
    <nav className={navClassName} aria-label="Mobile menu section">
      <NavigationMenuSection>
        {section.items.map(renderNavigationItem)}
      </NavigationMenuSection>
    </nav>
  );
};

const allElements: Element[] = [
  { id: 1, name: "Clients", Component: Sales, sectionKey: "clients" },
  { id: 2, name: "Insights", Component: Purchases, sectionKey: "insights" },
  { id: 4, name: "Jobs", Component: Reporting, sectionKey: "jobs" },
  { id: 5, name: "Workpapers", Component: Payroll, sectionKey: "workpapers" },
  {
    id: 6,
    name: "Tax",
    Component: Accounting,
    sectionKey: "tax",
  },
  //   { id: 8, name: "Payroll", Component: Tax, sectionKey: "payroll" },
  { id: 9, name: "Reports", Component: Reporting, sectionKey: "reports" },
  { id: 7, name: "Practice", Component: Tax, sectionKey: "practice" },
];

export default function MobileMenu() {
  const { region } = useRegion();
  const [activeElement, setActiveElement] = useState<number | null>(null);
  const [isSBDesignStudioOpen, setIsSBDesignStudioOpen] =
    useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const bannerHeight = useContext(BannerHeightContext);

  // Filter elements to only show sections that exist in the current region's navigation
  const navigation = getRegionNavigation(region);
  const elements = allElements.filter(
    (el) => navigation[el.sectionKey as keyof typeof navigation] != null
  );

  const handleToggle = (id: number): void => {
    setActiveElement((prev) => (prev === id ? null : id));
  };

  const handleSBDSToggle = (): void => {
    setIsSBDesignStudioOpen((prev) => !prev);
  };

  // Handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("overflow-hidden");
    } else {
      document.documentElement.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <Popover className="nav-1049:hidden relative inline-flex">
      {({ close }: { close: () => void }) => {
        const handleClose = () => {
          setIsOpen(false);
          close();
        };

        return (
          <>
            <PopoverButton
              className="bg-content-primary/10 hover:bg-content-primary/50 data-[active]:bg-content-primary/50 flex h-16 w-16 cursor-pointer items-center justify-center outline-none focus-visible:ring-[2px] focus-visible:ring-white/75 focus-visible:ring-inset"
              onClick={() => setIsOpen(true)}
            >
              <Hamburger />
              <span className="sr-only">Menu</span>
            </PopoverButton>
            <PopoverBackdrop
              className="linear bg-content-primary/75 fixed inset-0 top-16 transition duration-200 data-[closed]:opacity-0"
              transition
              style={{ top: `${bannerHeight + 80}px` }}
            />
            <PopoverPanel
              transition
              className="linear bg-background-primary fixed bottom-0 z-[60] w-[284px] origin-left overflow-x-hidden overflow-y-scroll shadow-[0px_1px_4px_2px_rgba(0,0,0,0.10)] transition duration-300 data-closed:-translate-x-full"
              style={{
                top: `${bannerHeight + 80}px`,
              }}
            >
              <div>
                <button
                  className="text-content-primary mb-2 flex w-full cursor-pointer items-center justify-between border-b border-[#CCCED2] p-3 text-[15px]/[24px]"
                  onClick={handleSBDSToggle}
                  type="button"
                >
                  <span className="flex items-center gap-2 font-bold">
                    <span className="flex size-10 items-center justify-center">
                      <span className="flex size-8 flex-none items-center justify-center rounded-[3px] bg-[#9EEEFD] text-center text-[13px]/[20px] font-bold uppercase">
                        HE
                      </span>
                    </span>
                    Hornblower Enterprises
                  </span>
                  <span className="ml-auto flex size-10 transform items-center justify-center">
                    <ChevronMobile />
                  </span>
                </button>
                <div
                  className={`linear bg-background-primary text-content-primary absolute top-0 bottom-0 z-10 w-[284px] transform text-[14px] duration-300 ${
                    isSBDesignStudioOpen
                      ? "translate-x-0 overflow-y-scroll"
                      : "translate-x-full overflow-y-hidden"
                  }`}
                >
                  <OrgMenu
                    onClose={handleClose}
                    showBackButton={true}
                    onBackClick={handleSBDSToggle}
                  />
                </div>
                <button
                  className="group text-content-primary flex w-full cursor-pointer items-center justify-items-start gap-2 px-3 text-[15px]/[24px] font-medium"
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
                      className="group text-content-primary flex w-full cursor-pointer items-center justify-items-start gap-2 px-3 text-[15px]/[24px] font-medium"
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
                      className={`linear bg-background-primary absolute top-0 bottom-0 z-10 w-[284px] transform duration-300 ${
                        activeElement === id
                          ? "translate-x-0"
                          : "translate-x-full"
                      }`}
                    >
                      <button
                        className="group text-content-primary flex w-full cursor-pointer items-center justify-items-start gap-2 border-b border-[#CCCED2] py-2 pr-3 pl-5 text-[15px]/[24px] font-medium"
                        onClick={() => {
                          handleToggle(id);
                        }}
                        type="button"
                      >
                        {name}
                        <span className="ml-auto flex size-10 rotate-180 items-center justify-center">
                          <ChevronMobile />
                        </span>
                      </button>
                      <RegionBasedMenu
                        region={region}
                        sectionKey={sectionKey}
                        navClassName="text-sm text-content-primary py-3"
                        onClose={handleClose}
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
