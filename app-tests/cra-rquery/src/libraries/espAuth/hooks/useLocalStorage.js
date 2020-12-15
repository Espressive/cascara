import { useEffect, useState } from 'react';

export const useLocalStorage = (itemKey, itemType = 'string', initialValue) => {
  const valueIsNotAString = Boolean(itemType !== 'string');
  const [value, setValue] = useState(() => {
    try {
      const value = localStorage.getItem(itemKey);

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
          itemKey,
          valueIsNotAString ? JSON.stringify(value) : value
        );
      } catch (err) {
        console.warn(
          `Error while trying to set ${itemKey} in localStorage`,
          err
        );
      }
    } else {
      try {
        localStorage.removeItem(itemKey);
      } catch (err) {
        console.warn(
          `Error while trying to remove ${itemKey} from localStorage`,
          err
        );
      }
    }
  }, [itemKey, value, valueIsNotAString]);

  return [value, setValue];
};
