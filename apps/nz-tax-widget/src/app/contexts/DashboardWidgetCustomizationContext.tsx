"use client";

import { createContext } from "react";

/** Set on each widget root so CustomizationOverlay can call remove by id. */
export const WidgetIdContext = createContext<string | null>(null);

export const CustomizationContext = createContext<{
  isCustomising: boolean;
  onRemoveWidget?: (widgetId: string) => void;
}>({ isCustomising: false });
