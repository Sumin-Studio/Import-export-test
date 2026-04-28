import PageHeader from "@/components/ui/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SpacingAndSizingPage() {
  return (
    <div className="bg-background-secondary min-h-screen">
      <PageHeader
        title="Spacing & Sizing"
        breadCrumbs={[
          { label: "Home", href: "/" },
          { label: "Spacing & Sizing" },
        ]}
      >
        <div className="container mx-auto space-y-12 px-4 pb-12">
          {/* Radii */}
          <Card>
            <CardHeader>
              <CardTitle>Radii</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-circle
                  </span>
                  <p className="rounded-circle bg-foreground size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-xlarge
                  </span>
                  <p className="rounded-xlarge bg-foreground size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-large
                  </span>
                  <p className="rounded-large bg-foreground size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-medium
                  </span>
                  <p className="rounded-medium bg-foreground size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-small
                  </span>
                  <p className="rounded-small bg-foreground size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    rounded-none
                  </span>
                  <p className="bg-foreground size-40 rounded-none"></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shadow */}
          <Card>
            <CardHeader>
              <CardTitle>Shadow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-lift
                  </span>
                  <p className="bg-background shadow-lift rounded-xlarge m-10 size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-pop
                  </span>
                  <p className="bg-background shadow-pop rounded-xlarge m-10 size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-overlap-top
                  </span>
                  <p className="bg-background shadow-overlap-top rounded-xlarge m-10 size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-overlap-left
                  </span>
                  <p className="bg-background shadow-overlap-left rounded-xlarge m-10 size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-overlap-bottom
                  </span>
                  <p className="bg-background shadow-overlap-bottom rounded-xlarge m-10 size-40"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    shadow-overlap-right
                  </span>
                  <p className="bg-background shadow-overlap-right rounded-xlarge m-10 size-40"></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Borders */}
          <Card>
            <CardHeader>
              <CardTitle>Borders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <span className="text-muted-foreground text-xs">
                    border-border-strong
                  </span>
                  <p className="bg-background border-border-strong rounded-xlarge m-10 size-40 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    border-border-regular
                  </span>
                  <p className="bg-background border-border-regular rounded-xlarge m-10 size-40 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    border-border-subtle
                  </span>
                  <p className="bg-background border-border-subtle rounded-xlarge m-10 size-40 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    border-border-soft
                  </span>
                  <p className="bg-background border-border-soft rounded-xlarge m-10 size-40 border"></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>Dimensions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-3 (12px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-3 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-4 (16px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-4 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-5 (20px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-5 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-6 (24px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-6 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-8 (32px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-8 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-10 (40px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-[60px] (60px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-[60px] border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-80 (320px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-80 border"></p>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    size-[400px] (400px)
                  </span>
                  <p className="bg-background border-border-strong rounded-small size-[400px] border"></p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Spacing */}
          <Card>
            <CardHeader>
              <CardTitle>Spacing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-0 (0px)
                  </span>
                  <div className="flex gap-0">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-1 (4px)
                  </span>
                  <div className="flex gap-1">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-2 (8px)
                  </span>
                  <div className="flex gap-2">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-3 (12px)
                  </span>
                  <div className="flex gap-3">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-4 (16px)
                  </span>
                  <div className="flex gap-4">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-5 (20px)
                  </span>
                  <div className="flex gap-5">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-6 (24px)
                  </span>
                  <div className="flex gap-6">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-8 (32px)
                  </span>
                  <div className="flex gap-8">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-12 (48px)
                  </span>
                  <div className="flex gap-12">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground text-xs">
                    gap-16 (64px)
                  </span>
                  <div className="flex gap-16">
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                    <p className="bg-background border-border-strong rounded-small size-10 border"></p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageHeader>
    </div>
  );
}
