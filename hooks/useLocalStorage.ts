import { useEffect, useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (newValue: T) => void] {
  const [value, setStateValue] = useState<T>();

  useEffect(() => {
    if (value === undefined) {
      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        try {
          const value = JSON.parse(localStorageValue);
          setStateValue(value);
        } catch (e) {}
      }
    }
  }, [value, key, setStateValue]);

  const setLocalStorageValue = (value: T) => {
    setStateValue(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  };

  return [value || initialValue, setLocalStorageValue];
}
