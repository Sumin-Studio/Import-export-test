"use client";

import { useState, useMemo, ChangeEvent } from "react";
import { MagnifyingGlass } from "@/components/ui/icons";
import * as Icons from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import Icon, {
  ICON_SIZES_ARRAY,
  type IconName,
  type IconSize,
} from "@/components/ui/icon";

const ICON_NAMES = Object.keys(Icons)
  .filter(
    (name) =>
      name !== "default" && name.charAt(0) === name.charAt(0).toUpperCase()
  )
  .sort((a, b) => a.localeCompare(b));

interface IconGridProps {
  icons: string[];
  previewSize: IconSize;
}

function IconGrid({ icons, previewSize }: IconGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12">
      {icons.map((iconName) => {
        return (
          <div
            key={iconName}
            className="hover:bg-accent border-border flex flex-col items-center justify-center gap-3 rounded-lg border p-4 transition-colors"
            onClick={() => {
              navigator.clipboard.writeText(iconName);
            }}
            title="Click to copy icon name"
          >
            <div className="bg-background-secondary">
              <Icon name={iconName as IconName} size={previewSize.label} />
            </div>
            <span className="text-muted-foreground w-full truncate text-center text-[8px]">
              {iconName}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function IconsSection({
  showHeader = true,
}: {
  showHeader?: boolean;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewSize, setPreviewSize] = useState(ICON_SIZES_ARRAY[3]); // Default to medium

  const filteredIcons = useMemo(() => {
    if (!searchQuery) return ICON_NAMES;

    const query = searchQuery.toLowerCase();
    return ICON_NAMES.filter((iconName) =>
      iconName.toLowerCase().includes(query)
    ).sort((a, b) => a.localeCompare(b));
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      {showHeader && (
        <div>
          <h2 className="font-primary mb-2 text-2xl font-bold">Icons</h2>
          <p className="text-muted-foreground mb-4">
            Browse and search all available icons. Click any icon to copy its
            name.
          </p>
        </div>
      )}

      <div className="space-y-4">
        <div className="relative">
          <MagnifyingGlass className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="pl-10"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-muted-foreground text-sm font-medium">
            Preview Size
          </label>
          <div className="flex flex-wrap gap-2">
            {ICON_SIZES_ARRAY.map((size: IconSize) => (
              <button
                key={size.label}
                onClick={() => setPreviewSize(size)}
                className={`border-border rounded-md border px-3 py-1.5 text-sm transition-colors ${
                  previewSize.containerSize === size.containerSize
                    ? "bg-primary text-primary-foreground"
                    : "bg-background hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {size.label} ({size.containerSize}px)
              </button>
            ))}
          </div>
        </div>
      </div>

      {filteredIcons.length > 0 ? (
        <div>
          <p className="text-muted-foreground mb-4 text-sm">
            Found {filteredIcons.length} icon
            {filteredIcons.length !== 1 ? "s" : ""}
          </p>
          <IconGrid icons={filteredIcons} previewSize={previewSize} />
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="text-muted-foreground">
            No icons found matching &quot;{searchQuery}&quot;
          </p>
        </div>
      )}
    </div>
  );
}
