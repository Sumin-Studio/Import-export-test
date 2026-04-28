"use client";

import { usePathname } from "next/navigation";
import MenuItem from "@/components/global/global-navigation/MenuItem";

export default function MenuItems({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <MenuItem text="Components" href="/" highlighted={pathname === "/"} />
      <MenuItem
        text="Icons"
        href="/icons"
        highlighted={pathname.startsWith("/icons")}
      />
      <MenuItem
        text="Color Palette"
        href="/color-palette"
        highlighted={pathname.startsWith("/color-palette")}
      />
      <MenuItem
        text="Typography"
        href="/typography"
        highlighted={pathname.startsWith("/typography")}
      />
      <MenuItem
        text="Spacing & Sizing"
        href="/spacing-and-sizing"
        highlighted={pathname.startsWith("/spacing-and-sizing")}
      />
      {/* <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <MenuItem text="Sales" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="mt-4 min-w-[300px]">
          <DropdownMenuGroup>
            <DropdownMenuItem>Sales overview</DropdownMenuItem>
            <DropdownMenuItem>Invoices</DropdownMenuItem>
            <DropdownMenuItem>Progress payments</DropdownMenuItem>
            <DropdownMenuItem>Payment links</DropdownMenuItem>
            <DropdownMenuItem>Online payments</DropdownMenuItem>
            <DropdownMenuItem>Quotes</DropdownMenuItem>
            <DropdownMenuItem>Products and services</DropdownMenuItem>
            <DropdownMenuItem>Customers</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex justify-between gap-4">
              Sales settings <Icon name="Settings" containerClassName="-my-2" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <MenuItem text="Purchases" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="mt-4 min-w-[300px]">
          <DropdownMenuGroup>
            <DropdownMenuItem>Expenses overview</DropdownMenuItem>
            <DropdownMenuItem>Bills</DropdownMenuItem>
            <DropdownMenuItem>Purchase orders</DropdownMenuItem>
            <DropdownMenuItem>Suppliers</DropdownMenuItem>
            <DropdownMenuItem>Items</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="flex justify-between gap-4">
              Expenses settings{" "}
              <Icon name="Settings" containerClassName="-my-2" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <MenuItem text="Reporting" />
      <MenuItem text="Payroll" />
      <MenuItem text="Accounting" />
      <MenuItem text="Tax" />
      <MenuItem text="Contacts" />
      <MenuItem text="Projects" /> */}
    </div>
  );
}
