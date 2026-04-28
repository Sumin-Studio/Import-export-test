"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

interface IframeContextType {
  isIframeVisible: boolean;
  toggleIframe: () => void;
}

const IframeContext = createContext<IframeContextType | undefined>(undefined);

export function IframeProvider({ children }: { children: ReactNode }) {
  const [isIframeVisible, setIsIframeVisible] = useState(false);

  const toggleIframe = useCallback(() => {
    setIsIframeVisible((prev) => !prev);
  }, []);

  return (
    <IframeContext.Provider value={{ isIframeVisible, toggleIframe }}>
      {children}
    </IframeContext.Provider>
  );
}

export function useIframe() {
  const context = useContext(IframeContext);
  if (!context) {
    throw new Error("useIframe must be used within IframeProvider");
  }
  return context;
}
