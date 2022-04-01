import React, { useCallback } from 'react';
import 'antd/dist/antd.css';
import { DatePicker as AntDatePicker } from 'antd';
import pt from '@espressive/prop-types';
import PICKER_TYPE from './_globals';

const propTypes = {
  /** Function that will hold the result-date selected */
  onChange: pt.func,
  /** String that will define the type of calendar to present date|week|month|quarter|year */
  picker: pt.oneOf([...Object.keys(PICKER_TYPE), null]),
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
