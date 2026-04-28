import * as React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";

type TabItem = {
  value: string;
  label: string;
  content?: React.ReactNode;
  href?: string;
};

type DropdownItem = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type BreadCrumb = {
  label: string;
  href?: string;
};

type PageHeaderProps = {
  breadCrumbs?: string[] | BreadCrumb[];
  avatarName?: string;
  title?: string;
  subtitle?: string;
  tag?: string;
  overview?: Array<{ title: string; subtitle: string }>;
  actionZone?: React.ReactNode;
  tabs?: {
    items: TabItem[];
    defaultValue?: string;
  } | null;
  subtitleDropdown?: DropdownItem[] | null;
  children?: React.ReactNode;
};

export default function PageHeader({
  breadCrumbs,
  avatarName,
  title,
  subtitle,
  tag,
  overview,
  actionZone,
  tabs = null,
  subtitleDropdown = null,
  children,
}: PageHeaderProps) {
  const Wrapper = tabs ? Tabs : React.Fragment;
  const wrapperProps = tabs
    ? {
        defaultValue: tabs.defaultValue || tabs.items[0].value,
        className: "gap-0",
      }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <header className="border-border-soft bg-background mb-5 border-b">
        <div className="p-5">
          {breadCrumbs && (
            <div className="-mt-2 mb-1 flex items-center gap-1">
              {breadCrumbs.map((crumb, index) => {
                const label = typeof crumb === "string" ? crumb : crumb.label;
                const href =
                  typeof crumb === "string" ? "#" : crumb.href || "#";

                return (
                  <div key={index} className="flex items-center">
                    <Link href={href} className="text-text-faint text-xs">
                      {label}
                    </Link>
                    {index <= breadCrumbs.length - 1 && (
                      <Icon
                        size="xsmall"
                        name="ArrowRightSmall"
                        className="text-border-regular"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex justify-between gap-2">
            <div className="flex items-center gap-2">
              {avatarName && (
                <Avatar
                  name={avatarName}
                  color="red"
                  variant="business"
                  size="xsmall"
                />
              )}
              <div className="flex items-baseline gap-2">
                <h1 className="font-primary text-size-24 leading-tight font-bold tracking-tight">
                  {title || "Page Title"}
                </h1>
                {subtitle && (
                  <h2 className="text-size-22 text-text-faint flex items-center font-medium">
                    {subtitle}{" "}
                    {subtitleDropdown && (
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="tertiary" size="icon-sm">
                            <Icon name="ArrowDownSmall" size="small" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                          <DropdownMenuGroup>
                            {subtitleDropdown.map((item, index) =>
                              item.href ? (
                                <DropdownMenuItem key={index} asChild>
                                  <Link href={item.href}>{item.label}</Link>
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem
                                  key={index}
                                  onClick={item.onClick}
                                >
                                  {item.label}
                                </DropdownMenuItem>
                              )
                            )}
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </h2>
                )}
              </div>
              {tag && (
                <div className="border-border-soft text-sentiment-neutral-foreground rounded-full border px-2 py-0.5 text-xs font-medium">
                  {tag}
                </div>
              )}
            </div>
            <div className="flex gap-2">{actionZone}</div>
          </div>
          {overview && (
            <div className="border-border-soft rounded-medium mt-2 grid grid-cols-2 gap-px overflow-hidden border md:grid-cols-3 lg:grid-cols-6">
              {overview?.map((item, index) => (
                <div
                  key={index}
                  className="border-border-soft -mx-px translate-y-px border-b px-3 py-2"
                >
                  <div className="border-border-soft -ml-3 -translate-x-px space-y-1 border-l pl-3">
                    <h2 className="text-size-15 md:text-size-17 leading-none font-semibold">
                      {item.title}
                    </h2>
                    <p className="text-size-13 text-text-faint leading-none">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {tabs && (
          <TabsList className="border-border-soft mx-5 -mt-2">
            {tabs.items.map((item) =>
              item.href ? (
                <Link key={item.value} href={item.href}>
                  <TabsTrigger value={item.value} asChild>
                    <span>{item.label}</span>
                  </TabsTrigger>
                </Link>
              ) : (
                <TabsTrigger key={item.value} value={item.value}>
                  {item.label}
                </TabsTrigger>
              )
            )}
          </TabsList>
        )}
      </header>
      {tabs ? (
        <div className="container mx-auto px-4 pb-12">
          {tabs.items
            .filter((item) => item.content)
            .map((item) => (
              <TabsContent key={item.value} value={item.value}>
                {item.content}
              </TabsContent>
            ))}
        </div>
      ) : (
        children
      )}
    </Wrapper>
  );
}
