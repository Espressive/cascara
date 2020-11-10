import React from 'react';
import renderer from 'react-test-renderer';
import DefaultErrorTemplate from './DefaultErrorTemplate';

const props = {
  error: new Error('I crashed!'),
  errorInfo: {
    componentStack: 'Lorem Ipsum is simply dummy text',
  },
};

describe('<DefaultErrorTemplate />', () => {
  test('snapshot for empty state', () => {
    const snapshot = renderer.create(<DefaultErrorTemplate />);
    expect(snapshot).toMatchSnapshot();
  });

  test('snapshot with props', () => {
    const snapshot = renderer.create(<DefaultErrorTemplate {...props} />);
    expect(snapshot).toMatchSnapshot();
  });
});
