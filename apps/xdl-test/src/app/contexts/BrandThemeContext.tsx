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

export function BrandThemeProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState<Brand>(() => {
    // Initialize from localStorage if available
    if (typeof window !== "undefined") {
      const storedBrand = localStorage.getItem("xdl-brand") as Brand | null;
      if (storedBrand && (storedBrand === "sb" || storedBrand === "xph")) {
        return storedBrand;
      }
    }
    return "sb";
  });

  // Update localStorage when brand changes
  useEffect(() => {
    localStorage.setItem("xdl-brand", brand);
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
