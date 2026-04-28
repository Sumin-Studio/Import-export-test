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
          className={`rounded-[20px] bg-[#1e3145] hover:bg-[#12283d] active:bg-[#424f60] flex max-w-[246px] items-center gap-3 overflow-hidden px-4 py-2 text-ellipsis text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-neutral-750)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-neutral-750)] font-medium leading-[24px] text-[15px] cursor-pointer ${className}`}
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
            <Icon name="Settings" size="small" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>Recent Organisations</DropdownMenuLabel>

          <DropdownMenuItem>
            <div className="space-x-2">
              <Avatar
                name="Demo Company"
                variant="business"
                color="violet"
                size="xsmall"
              />
              <span>Demo Company</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
