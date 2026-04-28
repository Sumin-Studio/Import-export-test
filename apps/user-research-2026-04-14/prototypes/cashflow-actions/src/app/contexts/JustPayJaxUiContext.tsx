"use client";

import { createContext, useContext } from "react";

/** JAX Just Pay thread: v2 matches prototype 2; v3 is for alternate chat chrome (prototype 3). */
export type JustPayJaxChatVariant = "v2" | "v3";

const JustPayJaxUiContext = createContext<JustPayJaxChatVariant>("v2");

export function JustPayJaxUiProvider({
  children,
  variant = "v2",
}: {
  children: React.ReactNode;
  variant?: JustPayJaxChatVariant;
}) {
  return (
    <JustPayJaxUiContext.Provider value={variant}>
      {children}
    </JustPayJaxUiContext.Provider>
  );
}

export function useJustPayJaxUi(): JustPayJaxChatVariant {
  return useContext(JustPayJaxUiContext);
}
