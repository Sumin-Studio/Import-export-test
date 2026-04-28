import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, EllipsesVertical, Printer } from "@/components/ui/icons";
import PageHeader from "@/components/ui/page-header";

export default function PageHeaderSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Header Component</CardTitle>
        <CardDescription>
          The PageHeader component supports breadcrumbs, avatars, titles,
          subtitles, tags, overview stats, action zones, subtitle dropdowns, and
          tabs. Below are examples of each variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-8">
          {/* Minimal */}
          <div>
            <p className="text-body-standard-semibold mb-3">Minimal</p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader title="Simple Page Title" />
            </div>
          </div>

          {/* With breadcrumbs */}
          <div>
            <p className="text-body-standard-semibold mb-3">With Breadcrumbs</p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Settings"
                breadCrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Account" },
                  { label: "Settings" },
                ]}
              />
            </div>
          </div>

          {/* With avatar, subtitle, tag */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              Avatar, Subtitle &amp; Tag
            </p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Acme Corp"
                avatarName="A C"
                subtitle="Organisation"
                tag="Active"
              />
            </div>
          </div>

          {/* With subtitle dropdown */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              Subtitle with Dropdown
            </p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Purchases"
                subtitle="Bills"
                subtitleDropdown={[
                  { label: "Expenses overview", href: "#" },
                  { label: "Bills", href: "#" },
                  { label: "Purchase orders", href: "#" },
                  { label: "Suppliers", href: "#" },
                ]}
              />
            </div>
          </div>

          {/* With action zone */}
          <div>
            <p className="text-body-standard-semibold mb-3">With Action Zone</p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Invoices"
                breadCrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Invoices" },
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
                      Export
                    </Button>
                    <Button size="sm">New Invoice</Button>
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon-sm">
                          <EllipsesVertical className="size-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                }
              />
            </div>
          </div>

          {/* With overview stats */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              With Overview Stats
            </p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Dashboard"
                avatarName="D B"
                subtitle="Overview"
                tag="Q1 2026"
                overview={[
                  { title: "128", subtitle: "Projects" },
                  { title: "32K", subtitle: "Tasks" },
                  { title: "24", subtitle: "Teams" },
                  { title: "4.5K", subtitle: "Members" },
                  { title: "1.2K", subtitle: "Comments" },
                  { title: "15K", subtitle: "Files" },
                ]}
              />
            </div>
          </div>

          {/* With tabs */}
          <div>
            <p className="text-body-standard-semibold mb-3">With Tabs</p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Project Alpha"
                breadCrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Projects" },
                  { label: "Alpha" },
                ]}
                tabs={{
                  defaultValue: "overview",
                  items: [
                    {
                      value: "overview",
                      label: "Overview",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Overview content for Project Alpha.
                        </div>
                      ),
                    },
                    {
                      value: "tasks",
                      label: "Tasks",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Tasks content for Project Alpha.
                        </div>
                      ),
                    },
                    {
                      value: "settings",
                      label: "Settings",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Settings content for Project Alpha.
                        </div>
                      ),
                    },
                  ],
                }}
              />
            </div>
          </div>

          {/* Full-featured */}
          <div>
            <p className="text-body-standard-semibold mb-3">
              Full-Featured (All Options)
            </p>
            <div className="border-border-soft rounded-large overflow-hidden border">
              <PageHeader
                title="Acme Corp"
                avatarName="A C"
                subtitle="Financials"
                tag="Premium"
                breadCrumbs={[
                  { label: "Home", href: "/" },
                  { label: "Organisations" },
                  { label: "Acme Corp" },
                ]}
                subtitleDropdown={[
                  { label: "Financials", href: "#" },
                  { label: "Reporting", href: "#" },
                  { label: "Payroll", href: "#" },
                ]}
                overview={[
                  { title: "$1.2M", subtitle: "Revenue" },
                  { title: "$840K", subtitle: "Expenses" },
                  { title: "$360K", subtitle: "Profit" },
                  { title: "142", subtitle: "Invoices" },
                  { title: "38", subtitle: "Bills" },
                  { title: "12", subtitle: "Accounts" },
                ]}
                actionZone={
                  <>
                    <Button variant="secondary" size="icon-sm">
                      <Printer className="size-5" />
                    </Button>
                    <Button variant="secondary" size="sm">
                      Export
                    </Button>
                    <Button size="sm">New Transaction</Button>
                  </>
                }
                tabs={{
                  defaultValue: "summary",
                  items: [
                    {
                      value: "summary",
                      label: "Summary",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Financial summary for Acme Corp.
                        </div>
                      ),
                    },
                    {
                      value: "transactions",
                      label: "Transactions",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Transaction history for Acme Corp.
                        </div>
                      ),
                    },
                    {
                      value: "reports",
                      label: "Reports",
                      content: (
                        <div className="text-body-standard-regular text-text-subtle mx-5 mb-5">
                          Financial reports for Acme Corp.
                        </div>
                      ),
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
