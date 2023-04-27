import React from 'react';
import DatePicker from '.';

const handleChange = (param, param2, param3) =>
  console.log(param, param2, param3);

export default {
  selectDate: <DatePicker onChange={handleChange} />,
  selectWeek: <DatePicker onChange={handleChange} picker='week' />,
  selectMonth: <DatePicker onChange={handleChange} picker='month' />,
  selectQuarter: <DatePicker onChange={handleChange} picker='quarter' />,
  selectYear: <DatePicker onChange={handleChange} picker='year' />,
  selectDateLang: (
    <DatePicker lang={navigator.language} onChange={handleChange} />
  ),
};
