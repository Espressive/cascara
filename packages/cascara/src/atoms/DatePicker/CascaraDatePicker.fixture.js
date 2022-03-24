import React from 'react';
import DatePicker from './CascaraDatePicker';

const onChange = (val, val2) => {
  console.log({ val, val2 });
};
export default {
  datePicker: <DatePicker onChange={onChange} />,
};
