import { useLayoutEffect } from "react";

export const useDebounce = (dependency, milliSeconds, callback) => {
  useLayoutEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [dependency, milliSeconds]);

  return;
};
