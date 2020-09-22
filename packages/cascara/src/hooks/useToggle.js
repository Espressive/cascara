import { useCallback, useState } from 'react';

const useToggle = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle];
};

export default useToggle;
