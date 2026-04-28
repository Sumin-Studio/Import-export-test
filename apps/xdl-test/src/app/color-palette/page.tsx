import PageHeader from "@/components/ui/page-header";
import ColorSwatch from "@/components/design-system-tools/ColorSwatch";
import {
  primitiveColors,
  semanticColors,
  type SemanticColor,
} from "@/lib/colors";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ColorPalettePage() {
  return (
    <div className="bg-background-secondary min-h-screen">
      <PageHeader
        title="Color Palette"
        breadCrumbs={[{ label: "Home", href: "/" }, { label: "Color Palette" }]}
      >
        <div className="container mx-auto space-y-12 px-4 pb-12">
          {/* Semantic Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Semantic Colors</CardTitle>
              <CardDescription>
                Theme-aware color tokens that automatically adapt to light and
                dark modes. Use these for consistent, meaningful styling.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(semanticColors).map(([categoryName, colors]) => (
                <Card key={categoryName}>
                  <CardHeader>
                    <CardTitle className="capitalize">{categoryName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                      {(colors as SemanticColor[]).map((color) => (
                        <ColorSwatch
                          key={color.class}
                          color={color.hex}
                          name={color.name}
                          className={color.class}
                          description={color.description}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>

          {/* Primitive Colors */}
          <Card>
            <CardHeader>
              <CardTitle>Primitive Colors</CardTitle>
              <CardDescription>
                Raw color values across all palettes and shades. Use semantic
                tokens when possible; reach for primitives only when needed.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(primitiveColors).map(([colorName, colors]) => (
                <Card key={colorName}>
                  <CardHeader>
                    <CardTitle className="capitalize">{colorName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-8 2xl:grid-cols-12">
                      {colors.map((color) => (
                        <ColorSwatch
                          key={color.class}
                          color={color.hex}
                          name={color.name}
                          className={color.class}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </PageHeader>
    </div>
  );
}
