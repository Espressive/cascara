import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import pt from '@espressive/prop-types';

const propTypes = {
  onChange: pt.function,
};
const CascaraDatePicker = ({ onChange }) => {
  const handleOnChange = useCallback(
    (date, dateString) => {
      onChange(date, dateString);
    },
    [onChange]
  );
  return <DatePicker onChange={handleOnChange} />;
};

CascaraDatePicker.propTypes = propTypes;
export default CascaraDatePicker;
