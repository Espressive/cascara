import React from 'react';
import JsonPlaceholder from './JsonPlaceholder';
const testJson = {
  stuff: {
    okay: true,
    something: 23,
    string: 'cool',
  },
};

export default {
  className: (
    <JsonPlaceholder
      className='test-class'
      data={testJson}
      title='Custom className'
    />
  ),
  default: <JsonPlaceholder data={testJson} />,
  loading: <JsonPlaceholder data={null} />,
  emptyArray: <JsonPlaceholder data={[]} />,
  emptyObject: <JsonPlaceholder data={{}} />,
  isInitialOpen: <JsonPlaceholder data={testJson} isInitialOpen />,
  style: (
    <JsonPlaceholder
      data={testJson}
      style={{
        backgroundColor: 'red',
        maxWidth: '50%',
      }}
      title='Style'
    />
  ),
  title: <JsonPlaceholder data={testJson} title='Custom Title' />,
};
