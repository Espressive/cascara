import React from 'react';

import Form from '../../ui/Form/Form';

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
  <Form
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
};
