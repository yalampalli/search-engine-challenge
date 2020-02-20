import { useState, useEffect } from "react";

/**
 * Debounce hook to delay the setState updater function values
 * @param {*} value Value to be debounced
 * @param {*} delay delay in milliseconds
 */
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
