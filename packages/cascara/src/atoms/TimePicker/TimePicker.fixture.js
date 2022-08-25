import React from 'react';
import TimePicker from '.';
import moment from 'moment';

const handleChange = (param, param2) => console.log(param, param2);
const format = 'HH:mm';
export default {
  defaultTimeSec: (
    <TimePicker
      defaultValue={moment('15:08', format)}
      format='h:mm a'
      onChange={handleChange}
      picker='quarter'
      useNativeInput
    />
  ),
  time: <TimePicker format={format} onChange={handleChange} />,
  timeError: <TimePicker onChange={handleChange} status='error' />,
  timeWarning: <TimePicker onChange={handleChange} status='warning' />,
  hmma: <TimePicker format='h:mm a' onChange={handleChange} />,
  hmm: <TimePicker format={format} onChange={handleChange} />,
};
