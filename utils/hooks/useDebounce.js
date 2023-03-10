import { useRef, useLayoutEffect } from "react";

export const useDebounce = (dependency, milliSeconds, callback) => {
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
  }, [dependency, milliSeconds]);

  return;
};
