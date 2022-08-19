import React, { useCallback, useState } from 'react';
import { TimePicker as AntdTimePicker } from 'antd';
import pt from '@espressive/prop-types';
import locales from '../../shared/locales';

const propTypes = {
  /**  format time 'HH:mm or HH:mm:ss'*/
  format: pt.string,
  /** localize picker */
  lang: pt.string,
  /** Function that will hold the result-time selected */
  onChange: pt.func,
  /** optional: error|status */
  status: pt.string,
};

const TimePicker = ({ format, lang, onChange, ...rest }) => {
  const [isOpen, setOpen] = useState(false);
  const handleOnChange = useCallback(
    (time, timeString) => {
      setOpen(false);
      onChange(time, timeString);
    },
    [onChange]
  );

  const handleOnClick = useCallback((val) => {
    setOpen(val);
  }, []);

  return (
    <AntdTimePicker
      {...rest}
      format={format}
      locale={lang ? locales[lang] : ''}
      onChange={handleOnChange}
      onOpenChange={handleOnClick}
      open={isOpen}
    />
  );
};

TimePicker.propTypes = propTypes;
export default TimePicker;
