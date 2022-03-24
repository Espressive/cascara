import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import { DatePicker as AntDatePicker } from 'antd';
import pt from '@espressive/prop-types';

const propTypes = {
  onChange: pt.function,
};
const DatePicker = ({ onChange, ...rest }) => {
  const handleOnChange = useCallback(
    (date, dateString) => {
      onChange(date, dateString);
    },
    [onChange]
  );
  return <AntDatePicker {...rest} onChange={handleOnChange} />;
};

DatePicker.propTypes = propTypes;
export default DatePicker;
