"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

export type Brand = "sb" | "xph";

interface BrandThemeContextType {
  brand: Brand;
  setBrand: (brand: Brand) => void;
  toggleBrand: () => void;
}

const BrandThemeContext = createContext<BrandThemeContextType | undefined>(
  undefined
);

const STORAGE_KEY = "xdl-brand";

export function BrandThemeProvider({ children }: { children: ReactNode }) {
  // Always start with "xph" so server and first client render match (avoids hydration mismatch).
  // Sync from localStorage after mount.
  const [brand, setBrandState] = useState<Brand>("xph");

  useEffect(() => {
    const storedBrand = localStorage.getItem(STORAGE_KEY) as Brand | null;
    if (storedBrand && (storedBrand === "sb" || storedBrand === "xph")) {
      setBrandState(storedBrand);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, brand);
  }, [brand]);

  const setBrand = useCallback((newBrand: Brand) => {
    setBrandState(newBrand);
  }, []);

  const toggleBrand = useCallback(() => {
    setBrandState((prev) => (prev === "sb" ? "xph" : "sb"));
  }, []);

  return (
    <BrandThemeContext.Provider value={{ brand, setBrand, toggleBrand }}>
      {children}
    </BrandThemeContext.Provider>
  );
}

export function useBrandTheme() {
  const context = useContext(BrandThemeContext);
  if (!context) {
    throw new Error("useBrandTheme must be used within BrandThemeProvider");
  }
  return context;
}
