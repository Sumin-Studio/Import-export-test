"use client";

import React, { useState, useEffect, cloneElement, useCallback } from "react";

// Define Layout type locally to avoid importing from react-grid-layout during SSR
type Layout = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
};

interface GridItem {
  id: string;
  component: React.ReactNode;
  width: number;
  height: number;
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Layouts {
  [breakpoint: string]: LayoutItem[];
}

interface DraggableGridProps {
  items: GridItem[];
  onItemsChange?: (items: GridItem[]) => void;
  isCustomising: boolean;
  onSave?: () => void;
}

export default function DraggableGrid({
  items,
  onItemsChange,
  isCustomising,
}: DraggableGridProps) {
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<Layouts>({});
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("md");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [GridLayout, setGridLayout] = useState<React.ComponentType<any> | null>(null);

  // Dynamically import react-grid-layout only on client side to avoid SSR localStorage errors
  useEffect(() => {
    let isActive = true;

    const loadGridLayout = async () => {
      try {
        const mod = await import("react-grid-layout");
        const Responsive = mod.Responsive ?? mod.default?.Responsive;
        const WidthProvider = mod.WidthProvider ?? mod.default?.WidthProvider;

        if (!isActive) return;

        if (typeof Responsive === "function" && typeof WidthProvider === "function") {
          setGridLayout(() => WidthProvider(Responsive));
          return;
        }

        // In this runtime, WidthProvider may be unavailable from the ESM build.
        // Fallback to the static CSS grid below instead of mounting an unstable layout engine.
        console.warn("react-grid-layout WidthProvider unavailable; using static grid fallback.");
      } catch (error) {
        console.error("Failed to load react-grid-layout:", error);
      }
    };

    loadGridLayout();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    // Function to determine current breakpoint based on window width
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1600) setCurrentBreakpoint("md");
      else if (width >= 1000) setCurrentBreakpoint("sm");
      else if (width >= 800) setCurrentBreakpoint("xs");
      else setCurrentBreakpoint("xxs");
    };

    // Set initial breakpoint
    updateBreakpoint();

    // Add resize listener
    const handleResize = () => updateBreakpoint();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to get widget dimensions based on breakpoint
  const getWidgetDimensions = (item: GridItem) => {
    if (currentBreakpoint === "xxs") {
      return {
        width: "440px",
        height: "auto",
        minWidth: "440px",
        minHeight: "auto",
        maxWidth: "440px",
        maxHeight: "none",
      };
    }

    return {
      width: `${item.width}px`,
      height: `${item.height}px`,
      minWidth: `${item.width}px`,
      minHeight: `${item.height}px`,
      maxWidth: `${item.width}px`,
      maxHeight: `${item.height}px`,
    };
  };

  // Convert width/height to grid units based on breakpoint
  const getGridDimensions = (
    width: number,
    height: number,
    breakpoint: string
  ) => {
    // For xxs (single column), all items take full width (1 column)
    if (breakpoint === "xxs") {
      // On mobile, height is auto, so we adjust grid height units
      return { w: 1, h: height === 522 ? 2 : 1 };
    }

    // Map pixel dimensions to grid units for other breakpoints
    // Assuming 450px = 1 grid unit width, 261px = 1 grid unit height
    const w = 1; // All widgets are 1 column wide
    const h = height === 522 ? 2 : 1;
    return { w, h };
  };

  // Generate layouts for all breakpoints
  const generateLayouts = useCallback(() => {
    const breakpoints = ["md", "sm", "xs", "xxs"];
    const layouts: Layouts = {};

    const getColsForBreakpoint = (breakpoint: string) => {
      switch (breakpoint) {
        case "md":
          return 4;
        case "sm":
          return 3;
        case "xs":
          return 2;
        case "xxs":
          return 1;
        default:
          return 4;
      }
    };

    breakpoints.forEach((breakpoint) => {
      const cols = getColsForBreakpoint(breakpoint);
      const layout: LayoutItem[] = [];

      // Create a 2D grid to track occupied spaces
      const grid: boolean[][] = [];
      const maxRows = 20; // Start with reasonable max rows

      // Initialize grid
      for (let row = 0; row < maxRows; row++) {
        grid[row] = new Array(cols).fill(false);
      }

      // Function to check if a position is available
      const isPositionAvailable = (
        x: number,
        y: number,
        w: number,
        h: number
      ) => {
        if (x + w > cols || y + h > maxRows) return false;

        for (let row = y; row < y + h; row++) {
          for (let col = x; col < x + w; col++) {
            if (grid[row][col]) return false;
          }
        }
        return true;
      };

      // Function to mark a position as occupied
      const markPosition = (x: number, y: number, w: number, h: number) => {
        for (let row = y; row < y + h; row++) {
          for (let col = x; col < x + w; col++) {
            grid[row][col] = true;
          }
        }
      };

      // Find best position for each item
      items.forEach((item) => {
        const { w, h } = getGridDimensions(item.width, item.height, breakpoint);

        let placed = false;
        let bestX = 0;
        let bestY = 0;

        // Try to find the best position (top-left most available spot)
        for (let y = 0; y < maxRows && !placed; y++) {
          for (let x = 0; x <= cols - w && !placed; x++) {
            if (isPositionAvailable(x, y, w, h)) {
              bestX = x;
              bestY = y;
              placed = true;
            }
          }
        }

        // Mark the position as occupied
        markPosition(bestX, bestY, w, h);

        layout.push({
          i: item.id,
          x: bestX,
          y: bestY,
          w,
          h,
        });
      });

      layouts[breakpoint] = layout;
    });

    return layouts;
  }, [items]);

  // Update layouts when items change
  useEffect(() => {
    const newLayouts = generateLayouts();
    setLayouts(newLayouts);
  }, [generateLayouts]);

  const onDragStart = () => {};

  const onDragStop = (layout: Layout[]) => {
    if (!isCustomising || !onItemsChange) return;

    // Convert layout changes back to items order
    const currentLayout = layout;

    // Sort by position (y first, then x)
    const sortedLayout = [...currentLayout].sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;
      return a.x - b.x;
    });

    // Reorder items based on layout
    const reorderedItems = sortedLayout
      .map((layoutItem) => items.find((item) => item.id === layoutItem.i))
      .filter(Boolean) as GridItem[];

    // Only call onItemsChange if the order actually changed
    const currentOrder = items.map((item) => item.id).join(",");
    const newOrder = reorderedItems.map((item) => item.id).join(",");

    if (currentOrder !== newOrder) {
      onItemsChange(reorderedItems);
    }
  };

  const onBreakpointChange = (breakpoint: string) => {
    setCurrentBreakpoint(breakpoint);
  };

  if (!mounted || !GridLayout) {
    return (
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
        {items.map((item) => {
          const dimensions = getWidgetDimensions(item);
          return (
            <div
              key={item.id}
              className={`relative ${
                currentBreakpoint !== "xxs" && item.height === 522
                  ? "lg:row-span-2"
                  : ""
              }`}
              style={dimensions}
            >
              {cloneElement(
                item.component as React.ReactElement<{
                  isCustomising: boolean;
                }>,
                {
                  isCustomising: false,
                }
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Use grid layout for larger screens
  // Use React.createElement since GridLayout is stored in state and JSX can't use state variables as components
  return React.createElement(
    GridLayout,
    {
      className: `layout ${isCustomising ? "pt-2.5 lg:pt-0" : ""}`,
      layouts,
      onDragStart,
      onDragStop,
      onBreakpointChange,
      breakpoints: { md: 1600, sm: 1000, xs: 800, xxs: 1 },
      cols: { md: 4, sm: 3, xs: 2, xxs: 1 },
      rowHeight: 251,
      isDraggable: isCustomising,
      isResizable: false,
      margin: [20, 20],
      containerPadding: [0, 0],
      useCSSTransforms: true,
      compactType: "vertical",
      autoSize: true,
    },
    items.map((item) => {
      const dimensions = getWidgetDimensions(item);
      return (
        <div
          key={item.id}
          className={`relative ${
            isCustomising
              ? "cursor-grab active:cursor-grabbing"
              : "cursor-default"
          }`}
          style={{
            minWidth: dimensions.minWidth,
            minHeight: dimensions.minHeight,
          }}
        >
          <div className="h-full w-full">
            {cloneElement(
              item.component as React.ReactElement<{
                isCustomising: boolean;
              }>,
              {
                isCustomising,
              }
            )}
          </div>
        </div>
      );
    })
  );
}
