import GlobalTool from "@/components/global/global-navigation/GlobalTool";
import Icon from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";

export default function GlobalTools({
  brand,
  className,
}: {
  brand: "sb" | "xph";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-[8px] justify-end shrink-0 px-[12px] ${className ?? ""}`}>
      {brand === "sb" && (
        <>
          <GlobalTool>
            <Icon name="Addition" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1280:flex hidden">
            <Icon name="Sparkle" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1280:flex hidden">
            <Icon name="Search" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1280:flex hidden">
            <Icon name="Question" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1920:flex hidden">
            <Icon name="Notification" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1920:flex hidden">
            <Icon name="Grid" size="large" />
          </GlobalTool>
          <GlobalTool className="nav-1920:hidden">
            <Icon name="EllipsesVertical" size="large" />
          </GlobalTool>
        </>
      )}
      {brand === "xph" && (
        <>
          <GlobalTool aria-label="JAX">
            <Icon name="Clock" size="large" />
          </GlobalTool>
          <GlobalTool aria-label="Help">
            <Icon name="Question" size="large" />
          </GlobalTool>
          <GlobalTool aria-label="Notifications">
            <Icon name="Notification" size="large" />
          </GlobalTool>
          <GlobalTool aria-label="Apps">
            <Icon name="Grid" size="large" />
          </GlobalTool>
        </>
      )}
      <Avatar
        color="turquoise"
        name="Alex Xavia"
        asChild="button"
        size="medium"
        className="shrink-0 size-10 !ring-0 hover:!ring-0 focus-visible:!ring-2 focus-visible:!ring-[var(--color-neutral-750)] focus-visible:!ring-offset-2 focus-visible:!ring-offset-[var(--color-neutral-750)] focus-visible:!shadow-none cursor-pointer"
      />
    </div>
  );
}
