import PageHeader from "@/components/ui/page-header";
import IconsSection from "@/components/design-system-tools/IconsSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function IconsPage() {
  return (
    <div className="bg-background-secondary min-h-screen">
      <PageHeader
        title="Icons"
        breadCrumbs={[{ label: "Home", href: "/" }, { label: "Icons" }]}
      >
        <div className="container mx-auto px-4 pb-12">
          <Card>
            <CardHeader>
              <CardTitle>Icon Library</CardTitle>
              <CardDescription>
                Browse and search all available icons. Click any icon to copy
                its name.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IconsSection showHeader={false} />
            </CardContent>
          </Card>
        </div>
      </PageHeader>
    </div>
  );
}
