"use client";

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  cloneElement,
  useCallback,
  useRef,
  useMemo,
} from "react";
import clsx from "clsx";
import { WidthProvider, Responsive, Layout, type Layouts } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { usePrototypeSettings } from "@/app/contexts/PrototypeSettingsContext";

const ResponsiveReactGridLayout = WidthProvider(Responsive);

interface GridItem {
  id: string;
  component: React.ReactNode;
  width: number;
  height: number;
  colSpan?: 1 | 2; // Add column span support
}

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface DraggableGridProps {
  items: GridItem[];
  onItemsChange?: (items: GridItem[]) => void;
  isCustomising: boolean;
  onSave?: () => void;
  onToggleColSpan?: (itemId: string) => void; // Add callback for column span toggle
  /** When set, grid positions follow these layouts per breakpoint (e.g. AU tax-only default). */
  presetLayouts?: Layouts | null;
  /** One-shot staggered rise/fade for widgets after leaving Tailor composer. */
  tailorEntranceReveal?: boolean;
}

export default function DraggableGrid({
  items,
  onItemsChange,
  isCustomising,
  onToggleColSpan,
  presetLayouts = null,
  tailorEntranceReveal = false,
}: DraggableGridProps) {
  const { displayMode, isTaxHighlightWidgetId } = usePrototypeSettings();
  const [mounted, setMounted] = useState(false);
  const [layouts, setLayouts] = useState<Layouts>({});
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("md");
  const resizeTicking = useRef(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1600) setCurrentBreakpoint("md");
      else if (width >= 1000) setCurrentBreakpoint("sm");
      else if (width >= 800) setCurrentBreakpoint("xs");
      else setCurrentBreakpoint("xxs");
    };

    updateBreakpoint();

    const handleResize = () => {
      if (!resizeTicking.current) {
        requestAnimationFrame(() => {
          updateBreakpoint();
          resizeTicking.current = false;
        });
        resizeTicking.current = true;
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Helper function to get widget dimensions based on breakpoint
  const getWidgetDimensions = useCallback(
    (item: GridItem) => {
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
    },
    [currentBreakpoint]
  );

  // Convert width/height to grid units based on breakpoint and colSpan
  const getGridDimensions = useCallback(
    (item: GridItem, breakpoint: string) => {
      const colSpan = item.colSpan || 1;
      const height = item.height;

      // For xxs (single column), all items take full width (1 column)
      if (breakpoint === "xxs") {
        // On mobile, height is auto, so we adjust grid height units
        return { w: 1, h: height === 522 ? 2 : 1 };
      }

      // Get max columns for this breakpoint
      const maxCols = getColsForBreakpoint(breakpoint);

      // Width is based on colSpan, but can't exceed available columns
      const w = Math.min(colSpan, maxCols);
      const h = height === 522 ? 2 : 1;
      return { w, h };
    },
    []
  );

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

  // Generate layouts for all breakpoints
  const generateLayouts = useCallback(() => {
    const breakpoints = ["md", "sm", "xs", "xxs"];
    const layoutsOut: { [breakpoint: string]: LayoutItem[] } = {};

    if (presetLayouts) {
      const itemIds = new Set(items.map((it) => it.id));
      breakpoints.forEach((breakpoint) => {
        const template = presetLayouts[breakpoint];
        if (template?.length) {
          layoutsOut[breakpoint] = template
            .filter((cell) => itemIds.has(cell.i))
            .map((cell) => ({ ...cell }));
        }
      });
      return layoutsOut;
    }

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
        const { w, h } = getGridDimensions(item, breakpoint);

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

      layoutsOut[breakpoint] = layout;
    });

    return layoutsOut;
  }, [items, getGridDimensions, presetLayouts]);

  // Content-based key so parent re-renders that only replace the `items` array
  // reference (same ids/dimensions/colSpan) do not retrigger layout sync.
  const layoutSyncKey =
    items
      .map((i) => `${i.id}:${i.colSpan ?? 1}:${i.width}x${i.height}`)
      .join("|") +
    "::" +
    (presetLayouts
      ? JSON.stringify(
          (["md", "sm", "xs", "xxs"] as const).map((bp) => presetLayouts[bp] ?? [])
        )
      : "");

  const generateLayoutsRef = useRef(generateLayouts);
  generateLayoutsRef.current = generateLayouts;

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    setLayouts(generateLayoutsRef.current());
  }, [layoutSyncKey]);

  const onDragStart = () => {
    // Prevent text selection during drag
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
  };

  const onDragStop = (layout: Layout[]) => {
    // Re-enable text selection after drag
    document.body.style.userSelect = "";
    document.body.style.webkitUserSelect = "";

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

  // Memoize grid items to prevent unnecessary re-renders
  const gridItems = useMemo(
    () =>
      items.map((item, index) => {
        const dimensions = getWidgetDimensions(item);
        const highlightDim =
          displayMode === "highlight" && !isTaxHighlightWidgetId(item.id);
        return (
          <div
            key={item.id}
            className={clsx(
              "relative h-full min-h-0",
              isCustomising
                ? "cursor-grab active:cursor-grabbing"
                : "cursor-default",
              highlightDim && "grayscale"
            )}
            style={{
              minWidth: dimensions.minWidth,
              minHeight: dimensions.minHeight,
              // Add will-change hint when customizing to optimize transforms
              ...(isCustomising && {
                willChange: "transform",
                backfaceVisibility: "hidden",
                transform: "translateZ(0)",
              }),
            }}
          >
            <div
              className={clsx(
                "h-full w-full",
                tailorEntranceReveal && "tailor-widget-entrance-in"
              )}
              style={
                tailorEntranceReveal
                  ? { animationDelay: `${index * 52}ms` }
                  : undefined
              }
            >
              {cloneElement(
                item.component as React.ReactElement<{
                  isCustomising: boolean;
                  onToggleColSpan?: () => void;
                  colSpan?: 1 | 2;
                }>,
                {
                  isCustomising,
                  onToggleColSpan: onToggleColSpan
                    ? () => onToggleColSpan(item.id)
                    : undefined,
                  colSpan: item.colSpan || 1,
                }
              )}
            </div>
          </div>
        );
      }),
    [
      items,
      isCustomising,
      onToggleColSpan,
      getWidgetDimensions,
      displayMode,
      isTaxHighlightWidgetId,
      tailorEntranceReveal,
    ]
  );

  if (!mounted) {
    return (
      <>
        {items.map((item, index) => {
          const dimensions = getWidgetDimensions(item);
          const highlightDim =
            displayMode === "highlight" && !isTaxHighlightWidgetId(item.id);
          return (
            <div
              key={item.id}
              className={clsx(
                "relative h-full min-h-0",
                currentBreakpoint !== "xxs" && item.height === 522
                  ? "lg:row-span-2"
                  : "",
                highlightDim && "grayscale"
              )}
              style={dimensions}
            >
              <div
                className={clsx(
                  "h-full w-full",
                  tailorEntranceReveal && "tailor-widget-entrance-in"
                )}
                style={
                  tailorEntranceReveal
                    ? { animationDelay: `${index * 52}ms` }
                    : undefined
                }
              >
              {cloneElement(
                item.component as React.ReactElement<{
                  isCustomising: boolean;
                  onToggleColSpan?: () => void;
                  colSpan?: 1 | 2;
                }>,
                {
                  isCustomising: false,
                  onToggleColSpan: onToggleColSpan
                    ? () => onToggleColSpan(item.id)
                    : undefined,
                  colSpan: item.colSpan || 1,
                }
              )}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  // Use grid layout for larger screens
  return (
    <ResponsiveReactGridLayout
      className={`layout ${isCustomising ? "customizing pt-2.5 lg:pt-0" : ""}`}
      layouts={layouts}
      onDragStart={onDragStart}
      onDragStop={onDragStop}
      onBreakpointChange={onBreakpointChange}
      breakpoints={{ md: 1600, sm: 1000, xs: 800, xxs: 1 }}
      cols={{ md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={251}
      isDraggable={isCustomising}
      isResizable={false}
      margin={[20, 20]}
      containerPadding={[0, 0]}
      useCSSTransforms={true}
      compactType={presetLayouts ? null : "vertical"}
      autoSize={true}
      preventCollision={Boolean(presetLayouts)}
      transformScale={1}
    >
      {gridItems}
    </ResponsiveReactGridLayout>
  );
}
