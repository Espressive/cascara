import { useState } from 'react';

const useBoolean = (defaultValue = false) => {
  const [value, setValue] = useState(defaultValue);

  const toggle = () => setValue(!value);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return [
    value,
    {
      setFalse,
      setTrue,
      toggle,
    },
  ];
};

export default useBoolean;
