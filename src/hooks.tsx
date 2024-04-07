import { useEffect } from "react";

export const useKeyDown = (callback: () => any, keys: string[]) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const wasAnyKeyPressed = keys.some((key) => event.key === key);
    if (wasAnyKeyPressed) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};

export const useKeyCombination = (callback: () => any, keyCombination: string[]) => {
  const onKeyDown = (event: KeyboardEvent) => {
    const isKeyCombinationPressed = keyCombination.every((key) => {
      if (key === "ctrl") {
        return event.ctrlKey;
      } else if (key === "shift") {
        return event.shiftKey;
      } else if (key === "alt") {
        return event.altKey;
      } else {
        return event.key === key;
      }
    });

    if (isKeyCombinationPressed) {
      event.preventDefault();
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onKeyDown]);
};
