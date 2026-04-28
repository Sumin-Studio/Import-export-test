"use client";

import type React from "react";
import { useNavigation } from "@/app/contexts/NavigationContext";

interface PanelLinkProps {
  panel: "search" | "jax" | "help" | "to-do" | "notifications" | "apps";
  subPanel?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PanelLink({
  panel,
  subPanel,
  children,
  className,
  onClick,
}: PanelLinkProps) {
  const { openPanel } = useNavigation();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // When linking directly to a subpanel, set isDirect to true
    const isDirect = !!subPanel;
    openPanel(panel, subPanel, isDirect);
    onClick?.();
  };

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
