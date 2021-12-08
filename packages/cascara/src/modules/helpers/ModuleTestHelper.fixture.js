import React from 'react';

import FormOld from '../../ui/Form_OLD/Form_OLD';

const ACTIONS = {
  modules: [
    {
      module: 'edit',
    },
  ],
};

const DATA_DISPLAY = [
  {
    attribute: 'checkbox',
    label: 'Checkbox',
    module: 'checkbox',
  },
  {
    attribute: 'date',
    label: 'Date',
    module: 'date',
  },
  {
    attribute: 'dateTime',
    label: 'Date Time',
    module: 'datetime',
  },
  {
    attribute: 'email',
    label: 'Email',
    module: 'email',
  },
  {
    attribute: 'json',
    label: 'JSON',
    module: 'json',
  },
  {
    attribute: 'number',
    label: 'Number',
    module: 'number',
  },
  {
    attribute: 'radio',
    label: 'Radio',
    module: 'radio',
    options: [{ label: 'One' }, { label: 'Two' }],
  },
  {
    attribute: 'select',
    label: 'Select',
    module: 'select',
    options: [
      {
        key: 'red pill',
        text: 'red pill',
        value: 'red pill',
      },
      {
        key: 'blue pill',
        text: 'blue pill',
        value: 'blue pill',
      },
    ],
  },
  {
    attribute: 'text',
    label: 'Text',
    module: 'text',
  },
  {
    attribute: 'textarea',
    label: 'Textarea',
    module: 'textarea',
  },
  {
    attribute: 'color',
    label: 'Color',
    module: 'color',
  },
  {
    attribute: 'date',
    label: 'Date',
    module: 'date',
  },
  {
    attribute: 'datetime',
    label: 'Datetime',
    module: 'datetime',
  },
  {
    attribute: 'month',
    label: 'Month',
    module: 'month',
  },
  {
    attribute: 'password',
    label: 'Password',
    module: 'password',
  },
  {
    attribute: 'range',
    label: 'Range',
    module: 'range',
  },
  {
    attribute: 'tel',
    label: 'Tel',
    module: 'tel',
  },
  {
    attribute: 'time',
    label: 'Time',
    module: 'time',
  },
  {
    attribute: 'url',
    label: 'URL',
    module: 'url',
  },
  {
    attribute: 'week',
    label: 'Week',
    module: 'week',
  },
];

const DATA = [
  {
    checkbox: true,
    date: '2021-09-18T02:57:33.513Z',
    dateMonth: '2021-07',
    dateTime: '2018-06-07T00:00',
    email: 'engineering@espressive.com',
    json: {
      test: 'json',
    },
    number: 1,
    radio: true,
    select: '',
    text: 'Test',
    textarea: 'A sentence with 5 words',
  },
];

const ModuleTestWrapper = ({
  actions = ACTIONS,
  dataDisplay = DATA_DISPLAY,
  data = DATA,
  onAction = console.log,
}) => (
  <FormOld
    actions={actions}
    data={data}
    dataDisplay={dataDisplay}
    isInitialEditing
    onAction={onAction}
  />
);

export default {
  checkboxTest: (
    <ModuleTestWrapper
      data={{ checkbox: false, text: '' }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[8]]}
    />
  ),
  jsonTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        json: {
          type: 'test',
          number: 1,
        },
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[4]]}
    />
  ),
  numberTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        number: 5,
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[5]]}
    />
  ),
  radioTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        radio: true,
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[6]]}
    />
  ),
  selectTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        select: 'blue pill',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[7]]}
    />
  ),
  textTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        text: 'Espressive',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[8]]}
    />
  ),
  textareaTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        textarea: '',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[9]]}
    />
  ),
  colorTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        color: '#a1a1a1',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[10]]}
    />
  ),
  dateTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        date: '2021-07-24',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[11]]}
    />
  ),
  datetimeTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        datetime: '2018-06-12T19:30',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[12]]}
    />
  ),
  emailTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        email: 'engineers@espressive.com',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[3]]}
    />
  ),
  monthTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        month: '2018-06',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[13]]}
    />
  ),
  passwordTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        password: 'a very secret password',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[14]]}
    />
  ),
  rangeTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        range: 10,
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[15]]}
    />
  ),
  telTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        tel: '911',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[16]]}
    />
  ),
  timeTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        time: '16:20',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[17]]}
    />
  ),
  urlTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        url: 'https://www.espressive.com',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[18]]}
    />
  ),
  weekTest: (
    <ModuleTestWrapper
      data={{
        checkbox: false,
        week: '2021-W15',
      }}
      dataDisplay={[DATA_DISPLAY[0], DATA_DISPLAY[19]]}
    />
  ),
};
