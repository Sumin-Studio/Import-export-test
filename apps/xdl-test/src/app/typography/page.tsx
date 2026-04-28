import PageHeader from "@/components/ui/page-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TypographyPage() {
  return (
    <div className="bg-background-secondary min-h-screen">
      <PageHeader
        title="Typography"
        breadCrumbs={[{ label: "Home", href: "/" }, { label: "Typography" }]}
      >
        <div className="container mx-auto space-y-12 px-4 pb-12">
          {/* Semantic Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Semantic Typography</CardTitle>
              <CardDescription>
                Pre-composed text styles combining font family, size, weight,
                and line height into single utility classes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Headings */}
              <Card>
                <CardHeader>
                  <CardTitle>Headings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-heading-super-bold
                      </span>
                      <p className="text-heading-super-bold">
                        Super Bold Heading
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-heading-large-bold
                      </span>
                      <p className="text-heading-large-bold">
                        Large Bold Heading
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-heading-standard-bold
                      </span>
                      <p className="text-heading-standard-bold">
                        Standard Bold Heading
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-heading-small-bold
                      </span>
                      <p className="text-heading-small-bold">
                        Small Bold Heading
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-heading-tiny-bold
                      </span>
                      <p className="text-heading-tiny-bold">
                        Tiny Bold Heading
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Body Text */}
              <Card>
                <CardHeader>
                  <CardTitle>Body Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-large-semibold
                      </span>
                      <p className="text-body-large-semibold">
                        Large body text in semibold weight for emphasis.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-large-regular
                      </span>
                      <p className="text-body-large-regular">
                        Large body text in regular weight for standard
                        paragraphs.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-standard-semibold
                      </span>
                      <p className="text-body-standard-semibold">
                        Standard body text in semibold weight.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-standard-regular
                      </span>
                      <p className="text-body-standard-regular">
                        Standard body text in regular weight for default
                        content.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-small-semibold
                      </span>
                      <p className="text-body-small-semibold">
                        Small body text in semibold weight.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-body-small-regular
                      </span>
                      <p className="text-body-small-regular">
                        Small body text in regular weight.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Input & Label */}
              <Card>
                <CardHeader>
                  <CardTitle>Input &amp; Label</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-input-semibold
                      </span>
                      <p className="text-input-semibold">
                        Input text in semibold weight
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-input-regular
                      </span>
                      <p className="text-input-regular">
                        Input text in regular weight
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-label-small-semibold
                      </span>
                      <p className="text-label-small-semibold">
                        Small label text in semibold weight
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-label-small-regular
                      </span>
                      <p className="text-label-small-regular">
                        Small label text in regular weight
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-label
                      </span>
                      <p className="text-label">
                        Label text in semibold weight
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-label-secondary
                      </span>
                      <p className="text-label-secondary">
                        Label Secondary text in regular weight
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Data */}
              <Card>
                <CardHeader>
                  <CardTitle>Data Text</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-super-medium
                      </span>
                      <p className="text-data-super-medium">
                        Super Data Medium
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-super-regular
                      </span>
                      <p className="text-data-super-regular">
                        Super Data Regular
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-large-bold
                      </span>
                      <p className="text-data-large-bold">Large Data Bold</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-large-regular
                      </span>
                      <p className="text-data-large-regular">
                        Large Data Regular
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-standard-bold
                      </span>
                      <p className="text-data-standard-bold">
                        Standard Data Bold
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-standard-regular
                      </span>
                      <p className="text-data-standard-regular">
                        Standard Data Regular
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-small-bold
                      </span>
                      <p className="text-data-small-bold">Small Data Bold</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-data-small-regular
                      </span>
                      <p className="text-data-small-regular">
                        Small Data Regular
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation & Button */}
              <Card>
                <CardHeader>
                  <CardTitle>Navigation &amp; Button</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-button-standard-medium
                      </span>
                      <p className="text-button-standard-medium">
                        Standard Button Medium
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-button-small-medium
                      </span>
                      <p className="text-button-small-medium">
                        Small Button Medium
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-navigation-standard-medium
                      </span>
                      <p className="text-navigation-standard-medium">
                        Standard Navigation Medium
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-navigation-standard
                      </span>
                      <p className="text-navigation-standard">
                        Standard Navigation
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-navigation-label-semibold
                      </span>
                      <p className="text-navigation-label-semibold">
                        Navigation Label Semibold
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-notification-small
                      </span>
                      <p className="text-notification-small">
                        Small Notification
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-tag-standard-medium
                      </span>
                      <p className="text-tag-standard-medium">
                        Standard Tag Medium
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>

          {/* Primitive Typography */}
          <Card>
            <CardHeader>
              <CardTitle>Primitive Typography</CardTitle>
              <CardDescription>
                Raw typographic building blocks — typefaces, sizes, weights,
                line heights, and letter spacing.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Typefaces */}
              <Card>
                <CardHeader>
                  <CardTitle>Typefaces</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-primary
                      </span>
                      <p className="font-primary text-6xl">
                        Primary Font: National 2
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-secondary
                      </span>
                      <p className="font-secondary text-6xl">
                        Secondary Font: Inter
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Text Sizes */}
              <Card>
                <CardHeader>
                  <CardTitle>Text Sizes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-10
                      </span>
                      <p className="text-size-10">Text Size 10</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-11
                      </span>
                      <p className="text-size-11">Text Size 11</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-12
                      </span>
                      <p className="text-size-12">Text Size 12</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-13
                      </span>
                      <p className="text-size-13">Text Size 13</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-14
                      </span>
                      <p className="text-size-14">Text Size 14</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-15
                      </span>
                      <p className="text-size-15">Text Size 15</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-17
                      </span>
                      <p className="text-size-17">Text Size 17</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-22
                      </span>
                      <p className="text-size-22">Text Size 22</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-24
                      </span>
                      <p className="text-size-24">Text Size 24</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-28
                      </span>
                      <p className="text-size-28">Text Size 28</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-32
                      </span>
                      <p className="text-size-32">Text Size 32</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-44
                      </span>
                      <p className="text-size-44">Text Size 44</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        text-size-64
                      </span>
                      <p className="text-size-64">Text Size 64</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Line Heights */}
              <Card>
                <CardHeader>
                  <CardTitle>Line Heights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[0.95]
                      </span>
                      <p className="leading-[0.95]">
                        Line Height 95% Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Error corporis dignissimos esse,
                        soluta similique qui distinctio, repellendus eos
                        consequuntur odio quisquam possimus quae delectus harum
                        vero excepturi placeat officia optio.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.00]
                      </span>
                      <p className="leading-none">
                        Line Height 100% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.05]
                      </span>
                      <p className="leading-[1.05]">
                        Line Height 105% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.10]
                      </span>
                      <p className="leading-[1.10]">
                        Line Height 110% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.15]
                      </span>
                      <p className="leading-[1.15]">
                        Line Height 115% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.30]
                      </span>
                      <p className="leading-[1.30]">
                        Line Height 130% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.35]
                      </span>
                      <p className="leading-[1.35]">
                        Line Height 135% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.40]
                      </span>
                      <p className="leading-[1.40]">
                        Line Height 140% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        leading-[1.45]
                      </span>
                      <p className="leading-[1.45]">
                        Line Height 145% Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Cupiditate voluptates magni voluptatum
                        unde magnam et nemo, perferendis sunt corporis officia
                        fugiat corrupti sint cumque molestias harum maiores
                        tempore at itaque.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Font Weights */}
              <Card>
                <CardHeader>
                  <CardTitle>Font Weights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-light (300)
                      </span>
                      <p className="text-lg font-light">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-regular (400)
                      </span>
                      <p className="font-regular text-lg">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-medium (500)
                      </span>
                      <p className="text-lg font-medium">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-semibold (600)
                      </span>
                      <p className="text-lg font-semibold">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        font-bold (700)
                      </span>
                      <p className="text-lg font-bold">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Letter Spacing */}
              <Card>
                <CardHeader>
                  <CardTitle>Letter Spacing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <span className="text-muted-foreground text-xs">
                        tracking-default (0)
                      </span>
                      <p className="tracking-default text-lg">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                    <div>
                      <span className="text-muted-foreground text-xs">
                        tracking-tight (-3%)
                      </span>
                      <p className="text-lg tracking-tight">
                        The quick brown fox jumps over the lazy dog
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </PageHeader>
    </div>
  );
}
