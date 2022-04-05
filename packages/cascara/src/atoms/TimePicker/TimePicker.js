import React, { useCallback } from 'react';
import '../../shared/AntDPicker.css';
import { TimePicker as AntdTimePicker } from 'antd';
import pt from '@espressive/prop-types';
import locales from '../../shared/locales';

const propTypes = {
  /**  format time 'HH:mm or HH:mm:ss'*/
  format: pt.string,
  /** Function that will hold the result-time selected */
  onChange: pt.func,
  /** optional: error|status */
  status: pt.string,
};

const TimePicker = ({ format, onChange, ...rest }) => {
  const handleOnChange = useCallback(
    (time, timeString) => {
      onChange(time, timeString);
    },
    [onChange]
  );
  return (
    <AntdTimePicker
      {...rest}
      format={format}
      locale={locales.es}
      onChange={handleOnChange}
    />
  );
};

TimePicker.propTypes = propTypes;
export default TimePicker;
