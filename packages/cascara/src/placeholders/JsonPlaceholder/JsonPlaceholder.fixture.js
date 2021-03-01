import React from 'react';
import JsonPlaceholder from './JsonPlaceholder';
const testJson = {
  stuff: {
    okay: true,
    something: 23,
    string: 'cool',
  },
};

/* eslint-disable sort-keys -- fixture export sorting not needed */
export default {
  default: <JsonPlaceholder data={testJson} />,
  isInitialOpen: <JsonPlaceholder data={testJson} isInitialOpen />,
  title: <JsonPlaceholder data={testJson} title='Custom Title' />,
  style: (
    <JsonPlaceholder
      data={testJson}
      style={{ maxWidth: '50%', backgroundColor: 'red' }}
      title='Style'
    />
  ),
  className: (
    <JsonPlaceholder
      className='test-class'
      data={testJson}
      title='Custom className'
    />
  ),
};
/* eslint-enable sort-keys */
