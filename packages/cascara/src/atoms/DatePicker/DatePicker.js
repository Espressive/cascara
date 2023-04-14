import React, { useCallback } from 'react';
import { DatePicker as AntDatePicker } from 'antd';
import pt from '@espressive/prop-types';
import PICKER_TYPE from './_globals';
import locales from '../../shared/locales';
const propTypes = {
  /** date format */
  format: pt.string,
  /** localize picker */
  lang: pt.string,
  /** Function that will hold the result-date selected */
  onChange: pt.func,
  /** String that will define the type of calendar to present date|week|month|quarter|year */
  picker: pt.oneOf([...Object.keys(PICKER_TYPE), null]),
};
const DatePicker = ({ format, onChange, lang, ...rest }) => {
  const defaultLang = 'en-US';
  const defaultFormat = 'YYYY-MM-DD';
  const dateFormat = lang ? locales[lang]?.lang?.dateFormat : defaultFormat;
  const locale = lang ? locales[lang] : locales[defaultLang];

  const handleOnChange = useCallback(
    (date, dateString) => {
      onChange(date, dateString, dateFormat);
    },
    [dateFormat, onChange]
  );
  return (
    <AntDatePicker
      {...rest}
      aria-label='Date'
      format={format ? format : dateFormat}
      locale={locale}
      onChange={handleOnChange}
    />
  );
};
DatePicker.propTypes = propTypes;
export default DatePicker;
