"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface ControlsContextType {
  isControlsVisible: boolean;
  toggleControls: () => void;
}

const ControlsContext = createContext<ControlsContextType | undefined>(
  undefined
);

export function ControlsProvider({ children }: { children: ReactNode }) {
  const [isControlsVisible, setIsControlsVisible] = useState(
    // process.env.NODE_ENV === "development"
    true
  );

  const toggleControls = useCallback(() => {
    setIsControlsVisible((prev) => !prev);
  }, []);

  return (
    <ControlsContext.Provider value={{ isControlsVisible, toggleControls }}>
      {children}
    </ControlsContext.Provider>
  );
}

export function useControls() {
  const context = useContext(ControlsContext);
  if (!context) {
    throw new Error("useControls must be used within ControlsProvider");
  }
  return context;
}
