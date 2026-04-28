"use client";

import { createContext, useContext } from "react";

export interface WalkthroughPathContextValue {
  basePath: string;
  label: string | null;
}

const defaultValue: WalkthroughPathContextValue = {
  basePath: "/app/walkthrough",
  label: null,
};

export const WalkthroughPathContext = createContext<WalkthroughPathContextValue>(defaultValue);

export function useWalkthroughPath(): WalkthroughPathContextValue {
  return useContext(WalkthroughPathContext);
}
