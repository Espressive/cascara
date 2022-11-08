import React, { useCallback, useEffect, useRef } from 'react';
import pt from 'prop-types';
import styles from './Checkbox.module.scss';

const propTypes = {
  checked: pt.bool,
  indeterminate: pt.bool,
  name: pt.string,
  onChange: pt.func,
};

const Checkbox = ({
  checked = false,
  indeterminate = false,
  name,
  onChange = () => {},
}) => {
  const el = useRef();

  useEffect(() => {
    if (indeterminate) {
      // el.indeterminate = true;
    } else {
      // el.indeterminate = false;
    }
  }, [indeterminate]);

  const handleOnChange = useCallback(
    (e) => {
      const { checked, name } = e.currentTarget;

      onChange({ checked, name });
    },
    [onChange]
  );

  return (
    <input
      checked={checked ? 1 : 0}
      className={styles._}
      name={name}
      onChange={handleOnChange}
      ref={el}
      type={'checkbox'}
    />
  );
};

Checkbox.propTypes = propTypes;

export default Checkbox;
