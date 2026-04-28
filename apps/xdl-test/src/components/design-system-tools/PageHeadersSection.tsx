import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsesVertical, Printer } from "@/components/ui/icons";
import PageHeader from "@/components/ui/page-header";

export default function PageHeadersSection() {
  return (
    <>
      {/* <PageHeader
        title="Page title"
        avatarName="A V"
        actionZone={
          <>
            <Button variant="secondary" size="icon-sm">
              <Printer className="size-5" />
            </Button>
            <Button variant="secondary" size="icon-sm">
              <Edit className="size-5" />
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button size="sm">Primary</Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon-sm">
                  <EllipsesVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
      /> */}

      <PageHeader
        title="Page title"
        subtitle="Subtitle"
        tag="Tag value"
        breadCrumbs={["Home", "Section", "Subsection"]}
        avatarName="A V"
        overview={[
          { title: "128", subtitle: "Projects" },
          { title: "32K", subtitle: "Tasks" },
          { title: "24", subtitle: "Teams" },
          { title: "4.5K", subtitle: "Members" },
          { title: "1.2K", subtitle: "Comments" },
          { title: "15K", subtitle: "Files" },
        ]}
        subtitleDropdown={[
          { label: "Expenses overview", href: "/expenses" },
          { label: "Bills", href: "/bills" },
          { label: "Purchase orders", href: "/purchase-orders" },
          { label: "Suppliers", href: "/suppliers" },
          { label: "Items", href: "/items" },
        ]}
        actionZone={
          <>
            <Button variant="secondary" size="icon-sm">
              <Printer className="size-5" />
            </Button>
            <Button variant="secondary" size="icon-sm">
              <Edit className="size-5" />
            </Button>
            <Button variant="secondary" size="sm">
              Secondary
            </Button>
            <Button size="sm">Primary</Button>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon-sm">
                  <EllipsesVertical className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                  <DropdownMenuItem>Item</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        }
        tabs={{
          items: [
            {
              value: "tab-1",
              label: "Tab 1",
              content: (
                <div className="mx-5 mb-5">
                  Tab 1 Lorem, ipsum dolor sit amet consectetur adipisicing
                  elit. Laborum ab molestiae esse quae, accusamus commodi error,
                  dolorem incidunt blanditiis ratione temporibus odit enim
                  excepturi deserunt asperiores, vitae nisi sed in.
                </div>
              ),
            },
            {
              value: "tab-2",
              label: "Tab 2",
              content: (
                <div className="mx-5 mb-5">
                  Tab 2 Lorem, ipsum dolor sit amet consectetur adipisicing
                  elit. Laborum ab molestiae esse quae, accusamus commodi error,
                  dolorem incidunt blanditiis ratione temporibus odit enim
                  excepturi deserunt asperiores, vitae nisi sed in.
                </div>
              ),
            },
            {
              value: "tab-3",
              label: "Tab 3",
              content: (
                <div className="mx-5 mb-5">
                  Tab 3 Lorem, ipsum dolor sit amet consectetur adipisicing
                  elit. Laborum ab molestiae esse quae, accusamus commodi error,
                  dolorem incidunt blanditiis ratione temporibus odit enim
                  excepturi deserunt asperiores, vitae nisi sed in.
                </div>
              ),
            },
            {
              value: "tab-4",
              label: "Tab 4",
              content: (
                <div className="mx-5 mb-5">
                  Tab 4 Lorem, ipsum dolor sit amet consectetur adipisicing
                  elit. Laborum ab molestiae esse quae, accusamus commodi error,
                  dolorem incidunt blanditiis ratione temporibus odit enim
                  excepturi deserunt asperiores, vitae nisi sed in.
                </div>
              ),
            },
          ],
          defaultValue: "tab-1",
        }}
      />
      {/* <PageHeader
        title="Navigation Tabs"
        subtitle="Links to other pages"
        tabs={{
          items: [
            { value: "overview", label: "Overview", href: "/overview" },
            { value: "details", label: "Details", href: "/details" },
            { value: "analytics", label: "Analytics", href: "/analytics" },
            { value: "settings", label: "Settings", href: "/settings" },
          ],
        }}
      /> */}

      {/* <Panel /> */}
    </>
  );
}
