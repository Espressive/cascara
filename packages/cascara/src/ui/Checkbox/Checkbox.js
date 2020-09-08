import React, { useEffect, useRef } from 'react';

const Checkbox = ({
  checked = false,
  indeterminate = false,
  name,
  onChange = () => {},
}) => {
  const el = useRef();

  function handleOnChange(e) {
    const { checked, name } = e.currentTarget;

    onChange({ checked, name });
  }

  useEffect(() => {
    if (indeterminate) {
      // el.indeterminate = true;
    } else {
      // el.indeterminate = false;
    }
  }, [indeterminate]);

  return (
    <input
      checked={checked ? 1 : 0}
      name={name}
      onChange={handleOnChange}
      ref={el}
      type={'checkbox'}
    />
  );
};

export default Checkbox;
