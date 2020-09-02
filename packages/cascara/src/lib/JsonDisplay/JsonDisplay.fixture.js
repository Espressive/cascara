import React from 'react';
import JsonDisplay from './JsonDisplay';
const testJson = {
  stuff: {
    okay: true,
    something: 23,
    string: 'cool',
  },
};

/* eslint-disable sort-keys */
export default {
  default: <JsonDisplay data={testJson} />,
  isInitialOpen: <JsonDisplay data={testJson} isInitialOpen />,
  title: <JsonDisplay data={testJson} title='Custom Title' />,
  style: (
    <JsonDisplay
      data={testJson}
      style={{ maxWidth: '50%', backgroundColor: 'red' }}
      title='Style'
    />
  ),
  className: (
    <JsonDisplay
      className='test-class'
      data={testJson}
      title='Custom className'
    />
  ),
};
/* eslint-enable sort-keys */
