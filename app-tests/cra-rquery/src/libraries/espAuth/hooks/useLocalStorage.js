import { useEffect, useState } from 'react';

export const useLocalStorage = ({ key, type = 'string', initialValue }) => {
  const valueIsNotAString = Boolean(type !== 'string');
  const [value, setValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);

      return value
        ? valueIsNotAString
          ? JSON.parse(value)
          : value
        : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    if (value) {
      try {
        localStorage.setItem(
          key,
          valueIsNotAString ? JSON.stringify(value) : value
        );
      } catch (err) {
        console.warn(`Error while trying to set ${key} in localStorage`, err);
      }
    } else {
      try {
        localStorage.removeItem(key);
      } catch (err) {
        console.warn(
          `Error while trying to remove ${key} from localStorage`,
          err
        );
      }
    }
  }, [key, value, valueIsNotAString]);

  return [value, setValue];
};
