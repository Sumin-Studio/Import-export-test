import Icon from "@/components/ui/icon";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardCurrency, Search, Settings } from "@/components/ui/icons";

export default function OrganisationMenu({
  className,
  name,
}: {
  className?: string;
  name: string;
}) {
  const nameInitials = name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase();
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          className={`rounded-medium hover:bg-theme-secondary-hover bg-theme-secondary-default text-size-15 active:bg-theme-secondary-active flex max-w-[200px] items-center gap-1 overflow-hidden px-3 py-2 leading-6 text-ellipsis text-white focus:outline-none focus-visible:ring-2 md:max-w-[300px] ${className}`}
        >
          <span className="nav-1440:inline hidden">{name}</span>
          <span className="nav-1440:hidden">{nameInitials}</span>
          <Icon name="CaretDown" size="xsmall" className="text-white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-4 min-w-[300px]">
        <DropdownMenuGroup>
          <div className="px-5 py-2">
            <Avatar name={name} variant="business" color="pink" size="small" />
            <span className="px-2 py-1 font-bold">{name}</span>
          </div>

          <DropdownMenuItem>
            <Settings className="size-5" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CardCurrency className="size-5" />
            Subscription
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup className="mb-2 px-5">
          <div className="relative">
            <Label htmlFor="search" className="sr-only">
              Search
            </Label>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 select-none">
              <Search className="size-6" />
            </div>
            <Input
              type="search"
              placeholder="Search organisations"
              className="h-10 pl-12"
            />
          </div>
        </DropdownMenuGroup>

        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent Organisations</DropdownMenuLabel>

          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Fleetwood Motors"
                variant="business"
                color="violet"
                size="xsmall"
              />
              <span>Fleetwood Motors</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Livingstone Auto Repairs"
                variant="business"
                color="yellow"
                size="xsmall"
              />
              <span>Livingstone Auto Repairs</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Blue Breeze"
                variant="business"
                color="turquoise"
                size="xsmall"
              />
              <span>Blue Breeze</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Makers Mugs"
                variant="business"
                color="pink"
                size="xsmall"
              />
              <span>Makers Mugs</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Blue Breeze"
                variant="business"
                color="turquoise"
                size="xsmall"
              />
              <span>Demo Company (Australia)</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <Icon
                name="Addition"
                size="small"
                className="bg-background-quaternary rounded-small"
              />
              <span>Add new organisation</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Other Practices</DropdownMenuLabel>

          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="UK United"
                variant="business"
                color="violet"
                size="xsmall"
              />
              <span>UK United</span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between gap-2">
            <span>View all practices</span>
            <div>
              <Icon name="ArrowPopOut" size="small" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Practice Tools</DropdownMenuLabel>

          <DropdownMenuItem className="flex justify-between gap-2">
            <span>Xero Partner Hub</span>
            <div>
              <Icon name="ArrowPopOut" size="small" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between gap-2">
            <span>Xero HQ</span>
            <div>
              <Icon name="ArrowPopOut" size="small" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between gap-2">
            <span>My Xero</span>
            <div>
              <Icon name="ArrowPopOut" size="small" />
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex justify-between gap-2">
            <span>Workpapers</span>
            <div>
              <Icon name="ArrowPopOut" size="small" />
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
