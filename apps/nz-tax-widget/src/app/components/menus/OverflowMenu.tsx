import {
  OverflowSearch,
  OverflowJax,
  OverflowNotifications,
  OverflowApps,
  OverflowHelp,
} from "@/app/components/ui/icons";
import { useNavigation } from "@/app/contexts/NavigationContext";

interface MenuProps {
  onClose: () => void;
}

export default function OverflowMenu({ onClose }: MenuProps) {
  const { openPanel } = useNavigation();
  return (
    <ul>
      <li>
        <button
          className="text-content-primary hover:bg-background-tertiary nav-1049:hidden inline-flex w-full items-center gap-1 py-1 pr-5 pl-3 text-left text-[15px]/[20px]"
          onClick={() => {
            openPanel("search");
            onClose();
          }}
          type="button"
        >
          <span className="flex size-8 items-center justify-center">
            <OverflowSearch />
          </span>
          Search
        </button>
      </li>
      <li>
        <button
          className="text-content-primary hover:bg-background-tertiary nav-1100:hidden inline-flex w-full items-center gap-1 py-1 pr-5 pl-3 text-left text-[15px]/[20px]"
          onClick={() => {
            openPanel("jax");
            onClose();
          }}
          type="button"
        >
          <span className="flex size-8 items-center justify-center">
            <OverflowJax />
          </span>
          Just ask Xero
        </button>
      </li>
      <li>
        <button
          className="text-content-primary hover:bg-background-tertiary nav-1168:hidden inline-flex w-full items-center gap-1 py-1 pr-5 pl-3 text-left text-[15px]/[20px]"
          onClick={() => {
            openPanel("help");
            onClose();
          }}
          type="button"
        >
          <span className="flex size-8 items-center justify-center">
            <OverflowHelp />
          </span>
          Help
        </button>
      </li>
      <li>
        <button
          className="text-content-primary hover:bg-background-tertiary inline-flex w-full items-center justify-between gap-1 py-1 pr-5 pl-3 text-left text-[15px]/[20px]"
          onClick={() => {
            openPanel("notifications");
            onClose();
          }}
          type="button"
        >
          <span className="flex items-center gap-1">
            <span className="flex size-8 items-center justify-center">
              <OverflowNotifications />
            </span>
            Notifications
          </span>
          <span className="ml-auto flex size-[18px] items-center justify-center rounded-full border border-current text-[9px]/[12px] font-bold">
            2
          </span>
        </button>
      </li>
      <li>
        <button
          className="text-content-primary hover:bg-background-tertiary inline-flex w-full items-center gap-1 py-1 pr-5 pl-3 text-left text-[15px]/[20px]"
          onClick={() => {
            openPanel("apps");
            onClose();
          }}
          type="button"
        >
          <span className="flex size-8 items-center justify-center">
            <OverflowApps />
          </span>
          Apps
        </button>
      </li>
    </ul>
  );
}
