import React from 'react';
import TimePicker from '.';
import moment from 'moment';

const handleChange = (param, param2) => console.log(param, param2);
const format = 'HH:mm:ss';
export default {
  defaultTimeSec: (
    <TimePicker
      defaultValue={moment('12:08', format)}
      onChange={handleChange}
      picker='quarter'
    />
  ),
  time: <TimePicker format={format} onChange={handleChange} />,
  timeError: <TimePicker onChange={handleChange} status='error' />,
  timeWarning: <TimePicker onChange={handleChange} status='warning' />,
};
