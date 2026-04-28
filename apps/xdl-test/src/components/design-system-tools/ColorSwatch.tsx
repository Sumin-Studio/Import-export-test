"use client";

import { Card } from "@/components/ui/card";

interface ColorSwatchProps {
  color: string | { light: string; dark: string };
  name: string;
  className: string;
  description?: string;
}

export default function ColorSwatch({
  color,
  name,
  className,
  description,
}: ColorSwatchProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(className);
  };

  const getHexDisplay = (): string => {
    if (typeof color === "string") {
      return color.toUpperCase();
    }
    return `Light: ${color.light.toUpperCase()} / Dark: ${color.dark.toUpperCase()}`;
  };

  const hexDisplay = getHexDisplay();

  return (
    <Card
      className="cursor-pointer overflow-hidden transition-shadow hover:shadow-lg"
      onClick={copyToClipboard}
    >
      <div className="-my-6 flex flex-col">
        <div
          className={`aspect-video ${className}`}
          title="Click to copy class name"
        />
        <div className="space-y-1 p-3">
          <p className="text-foreground text-sm font-medium">{name}</p>
          <p className="text-muted-foreground font-mono text-xs">{className}</p>
          <p className="text-muted-foreground font-mono text-xs">
            {hexDisplay}
          </p>
          {description && (
            <p className="text-muted-foreground text-xs">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
}
