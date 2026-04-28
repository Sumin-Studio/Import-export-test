"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type RegionContextType = {
  region: string;
  setRegion: (region: string) => void;
  showPopup: boolean;
  openPopup: () => void;
  dismissPopup: () => void;
};

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export function RegionProvider({
  children,
  initialRegion,
}: {
  children: ReactNode;
  initialRegion: string;
}) {
  const [region, setRegion] = useState(initialRegion);
  const [showPopup, setShowPopup] = useState(true);

  // Update cookie when region changes
  useEffect(() => {
    document.cookie = `region=${region};max-age=${60 * 60 * 24 * 7};path=/`;
  }, [region]);

  const openPopup = () => setShowPopup(true);
  const dismissPopup = () => setShowPopup(false);

  return (
    <RegionContext.Provider
      value={{ region, setRegion, showPopup, openPopup, dismissPopup }}
    >
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
