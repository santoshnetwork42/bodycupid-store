import { useRef, useLayoutEffect } from "react";

export const useDebounce = (value, milliSeconds, callback) => {
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    const handler = setTimeout(() => {
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }
      callback();
      firstUpdate.current = true;
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return;
};
