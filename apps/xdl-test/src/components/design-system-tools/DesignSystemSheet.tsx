"use client";

import { useState } from "react";
import ColorSwatch from "@/components/design-system-tools/ColorSwatch";
import {
  primitiveColors,
  semanticColors,
  type SemanticColor,
} from "@/lib/colors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import IconsSection from "@/components/design-system-tools/IconsSection";
import { Palette } from "lucide-react";

export default function DesignSystemSheet() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <button
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
          aria-label="Open design system"
        >
          <Palette className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-full overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>Design System</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <DesignSystemContent />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DesignSystemContent() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="color-palette">
        <AccordionTrigger>
          <div>
            <h1 className="font-primary mb-2 text-4xl font-bold">
              Color Palette
            </h1>
            <p className="text-muted-foreground">
              Click any color swatch to copy the tailwind class name
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Primitive Colors Section */}
            <AccordionItem value="primitive">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Primitive Colors
              </AccordionTrigger>
              <AccordionContent>
                <div className="">
                  <Accordion type="single" collapsible className="w-full">
                    {Object.entries(primitiveColors).map(
                      ([colorName, colors]) => (
                        <AccordionItem key={colorName} value={colorName}>
                          <AccordionTrigger className="font-primary text-xl font-semibold capitalize">
                            {colorName}
                          </AccordionTrigger>
                          <AccordionContent>
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
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Semantic Colors Section */}
            <AccordionItem value="semantic">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Semantic Colors
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {Object.entries(semanticColors).map(
                    ([categoryName, colors]) => (
                      <AccordionItem key={categoryName} value={categoryName}>
                        <AccordionTrigger className="font-primary text-xl font-semibold capitalize">
                          {categoryName}
                        </AccordionTrigger>
                        <AccordionContent>
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
                        </AccordionContent>
                      </AccordionItem>
                    )
                  )}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="typography">
        <AccordionTrigger>
          <div>
            <h1 className="font-primary mb-2 text-4xl font-bold">Typography</h1>
            <p className="text-muted-foreground">
              All things typography related
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Primitive Typography Section */}
            <AccordionItem value="primitive">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Primitive Typography
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Typefaces */}
                  <AccordionItem value="typefaces">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Typefaces
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                  {/* Text Sizes */}
                  <AccordionItem value="text-sizes">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Text Sizes
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="line-heights">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Line Heights
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-6">
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[0.95]
                          </span>
                          <p className="leading-[0.95]">
                            Line Height 95% Lorem, ipsum dolor sit amet
                            consectetur adipisicing elit. Error corporis
                            dignissimos esse, soluta similique qui distinctio,
                            repellendus eos consequuntur odio quisquam possimus
                            quae delectus harum vero excepturi placeat officia
                            optio.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.00]
                          </span>
                          <p className="leading-none">
                            Line Height 100% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.05]
                          </span>
                          <p className="leading-[1.05]">
                            Line Height 105% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.10]
                          </span>
                          <p className="leading-[1.10]">
                            Line Height 110% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.15]
                          </span>
                          <p className="leading-[1.15]">
                            Line Height 115% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.30]
                          </span>
                          <p className="leading-[1.30]">
                            Line Height 130% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.35]
                          </span>
                          <p className="leading-[1.35]">
                            Line Height 135% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.40]
                          </span>
                          <p className="leading-[1.40]">
                            Line Height 140% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground text-xs">
                            leading-[1.45]
                          </span>
                          <p className="leading-[1.45]">
                            Line Height 145% Lorem ipsum dolor sit amet
                            consectetur adipisicing elit. Cupiditate voluptates
                            magni voluptatum unde magnam et nemo, perferendis
                            sunt corporis officia fugiat corrupti sint cumque
                            molestias harum maiores tempore at itaque.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {/* Font Weights */}
                  <AccordionItem value="font-weights">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Font Weights
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                  {/* Letter Spacing */}
                  <AccordionItem value="letter-spacing">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Letter Spacing
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
            {/* Semantic Typography Section */}
            <AccordionItem value="semantic">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Semantic Typography
              </AccordionTrigger>
              <AccordionContent>
                <Accordion type="single" collapsible className="w-full">
                  {/* Headings */}
                  <AccordionItem value="headings">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Headings
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Body Text */}
                  <AccordionItem value="body">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Body Text
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Input & Label */}
                  <AccordionItem value="input-label">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Input & Label
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Data */}
                  <AccordionItem value="data">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Data Text
                    </AccordionTrigger>
                    <AccordionContent>
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
                          <p className="text-data-large-bold">
                            Large Data Bold
                          </p>
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
                          <p className="text-data-small-bold">
                            Small Data Bold
                          </p>
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
                    </AccordionContent>
                  </AccordionItem>

                  {/* Navigation & Button */}
                  <AccordionItem value="navigation-button">
                    <AccordionTrigger className="font-primary text-2xl font-bold">
                      Navigation & Button
                    </AccordionTrigger>
                    <AccordionContent>
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
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="icons">
        <AccordionTrigger>
          <div>
            <h1 className="font-primary mb-2 text-4xl font-bold">Icons</h1>
            <p className="text-muted-foreground">
              Browse and search all available icons
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <IconsSection />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="spacing-and-sizing">
        <AccordionTrigger>
          <div>
            <h1 className="font-primary mb-2 text-4xl font-bold">
              Spacing and Sizing
            </h1>
            <p className="text-muted-foreground">
              All things Spacing and Sizing
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Accordion type="single" collapsible className="w-full">
            {/* Navigation & Button */}
            <AccordionItem value="radii">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Radii
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            {/* Shadow */}
            <AccordionItem value="shadow">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Shadow
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            {/* Borders */}
            <AccordionItem value="borders">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Borders
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            {/* Dimensions */}
            <AccordionItem value="dimensions">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Dimensions
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
            {/* Spacing */}
            <AccordionItem value="spacing">
              <AccordionTrigger className="font-primary text-2xl font-bold">
                Spacing
              </AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
