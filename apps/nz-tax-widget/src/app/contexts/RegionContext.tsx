"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Region } from "@/app/lib/regions";

type RegionContextType = {
  region: Region;
  setRegion: (region: Region) => void;
};

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({
  children,
  initialRegion,
}: {
  children: ReactNode;
  initialRegion: Region;
}) {
  const [region, setRegion] = useState<Region>(initialRegion);

  // Update cookie when region changes
  // This is now handled by the middleware, but we still need to update the cookie
  // when the user manually changes the region in the UI.
  const handleSetRegion = (newRegion: Region) => {
    setRegion(newRegion);
    document.cookie = `region=${newRegion};max-age=${60 * 60 * 24 * 7};path=/`;
  };

  return (
    <RegionContext.Provider value={{ region, setRegion: handleSetRegion }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider");
  }
  return context;
}
