import React from 'react';
import pt from 'prop-types';

const propTypes = {
  defaultValue: pt.string,
  options: pt.arrayOf(
    pt.shape({
      key: pt.string.isRequired,
      label: pt.string,
      value: pt.any,
    })
  ),
};

const Select = ({
  defaultValue,
  name,
  onSelect,
  options = [],
  placeholder,
}) => {
  const placeholderKey = placeholder.split(' ').join();

  const handleSelectionChange = (e) => {
    const {
      target: { name, value },
    } = e;

    onSelect({ name, value });
  };

  const availableOptions = options.map(({ key, label, value }) => (
    <option key={key} value={value}>
      {label}
    </option>
  ));

  return (
    <select name={name} onChange={handleSelectionChange}>
      <option key={placeholderKey} value={''}>
        {placeholder}
      </option>
      {availableOptions}
    </select>
  );
};

Select.propTypes = propTypes;

export default Select;
