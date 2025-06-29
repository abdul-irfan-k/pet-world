import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const setItem = (newValue: T) => {
    if (typeof window !== 'undefined') {
      setValue(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  const removeItem = () => {
    if (typeof window !== 'undefined') {
      setValue(undefined);
      localStorage.removeItem(key);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const item = localStorage.getItem(key);
      setValue(item ? JSON.parse(item) : initialValue);
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      setValue(initialValue);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        if (event.newValue) {
          setValue(JSON.parse(event.newValue));
        } else {
          setValue(undefined);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return { data: value, setData: setItem, removeData: removeItem };
}
