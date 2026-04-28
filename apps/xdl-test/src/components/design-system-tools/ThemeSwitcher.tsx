/* eslint-disable */
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useBrandTheme, type Brand } from "@/app/contexts/BrandThemeContext";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { brand, setBrand } = useBrandTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed right-4 bottom-4 flex items-center gap-3">
        <button
          className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
          disabled
          aria-hidden="true"
        >
          <span className="sr-only">Loading</span>
          <Moon className="h-5 w-5" />
        </button>
      </div>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center gap-4">
      {/* Brand Selector */}
      <div className="bg-background-inverse-primary rounded-[calc(var(--radius-md)+var(--spacing)*1)] p-1">
        <ToggleGroup
          type="single"
          value={brand}
          onValueChange={(value) => {
            if (value) setBrand(value as Brand);
          }}
          className="bg-neutral-200 dark:bg-neutral-800"
        >
          <ToggleGroupItem
            value="sb"
            aria-label="Switch to Small Business brand"
            className="data-[state=on]:bg-blue-550 data-[state=on]:text-white"
          >
            SB
          </ToggleGroupItem>
          <ToggleGroupItem
            value="xph"
            aria-label="Switch to Xero Practice Manager brand"
            className="data-[state=on]:bg-neutral-800 data-[state=on]:text-white dark:data-[state=on]:bg-neutral-200 dark:data-[state=on]:text-neutral-900"
          >
            XPH
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white transition-colors hover:bg-neutral-700 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
      >
        <span className="sr-only">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </span>
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
