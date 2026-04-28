import { useState, useEffect } from "react";

export function useKeyboardNavigation(): boolean {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState<boolean>(false); // Changed to false to match typical initial state
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  useEffect(() => {
    // Mark as hydrated and set initial keyboard state
    setIsHydrated(true);
    setIsUsingKeyboard(true); // Now set to true after hydration

    const handleMouseDown = (): void => {
      setIsUsingKeyboard(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Tab") {
        setIsUsingKeyboard(true);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // During SSR and before hydration, assume not using keyboard to be safe
  return isHydrated ? isUsingKeyboard : false;
}
