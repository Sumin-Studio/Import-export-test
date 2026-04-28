import GlobalTool from "@/components/global/global-navigation/GlobalTool";
import Icon from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";

export default function GlobalTools({ brand }: { brand: "sb" | "xph" }) {
  return (
    <div className="flex items-center gap-2 px-3">
      {brand === "sb" && (
        <GlobalTool>
          <Icon name="Addition" size="large" />
        </GlobalTool>
      )}
      {brand === "xph" && (
        <GlobalTool>
          <Icon name="Clock" size="large" />
        </GlobalTool>
      )}
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

      <Avatar
        color="turquoise"
        name="Alex Xavia"
        asChild="button"
        size="medium"
      />
    </div>
  );
}
