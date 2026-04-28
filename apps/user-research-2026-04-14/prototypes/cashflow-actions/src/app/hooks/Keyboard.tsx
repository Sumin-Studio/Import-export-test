import { useState, useEffect } from 'react';

export function useKeyboardNavigation(): boolean {
  const [isUsingKeyboard, setIsUsingKeyboard] = useState<boolean>(true);

  useEffect(() => {
    const handleMouseDown = (): void => {
      setIsUsingKeyboard(false);
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Tab') {
        setIsUsingKeyboard(true);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return isUsingKeyboard;
}