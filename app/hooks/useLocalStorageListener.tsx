import { useEffect, useState } from 'react';

const useLocalStorageListener = (key: string): string | null => {
  const [storageValue, setStorageValue] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  });

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      console.log('triggered :', event)
      if (event.key === key) {
        setStorageValue(event.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return storageValue;
};

export default useLocalStorageListener;
