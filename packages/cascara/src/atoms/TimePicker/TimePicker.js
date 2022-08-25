import React, { useCallback, useState } from 'react';
import moment from 'moment';
import { TimePicker as AntdTimePicker } from 'antd';
import pt from '@espressive/prop-types';
import locales from '../../shared/locales';
import { Button, Input } from 'reakit';
import styles from '../../modules/DataModule.module.scss';

const propTypes = {
  /**  format time 'HH:mm or HH:mm:ss'*/
  format: pt.string,
  /** localize picker */
  lang: pt.string,
  /** Function that will hold the result-time selected */
  onChange: pt.func,
  /** optional: error|status */
  status: pt.string,

  useNativeInput: pt.bool,
};

const TimePicker = ({ format, lang, onChange, useNativeInput, ...rest }) => {
  const [inputValue, setValue] = useState('');

  const handleNativeChange = useCallback(
    ({ target }) => {
      const { value } = target;
      setValue(value);
    },
    [setValue]
  );

  const handleOkButton = useCallback(() => {
    const time = moment(inputValue, format);
    onChange(time, inputValue);
  }, [inputValue, format, onChange]);

  const handleOnChange = useCallback(
    (time, timeString) => {
      onChange(time, timeString);
    },
    [onChange]
  );

  return useNativeInput ? (
    <>
      <Input
        {...rest}
        className={styles.Input}
        onChange={handleNativeChange}
        type='time'
        value={inputValue}
      />
      <Button
        className={`ui basic icon button`}
        disabled={!inputValue}
        onClick={handleOkButton}
        style={{ padding: '0.4em' }}
      >
        Ok
      </Button>
    </>
  ) : (
    <AntdTimePicker
      {...rest}
      format={format}
      locale={lang ? locales[lang] : ''}
      onChange={handleOnChange}
    />
  );
};

TimePicker.propTypes = propTypes;
export default TimePicker;
