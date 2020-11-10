/* eslint-disable */

import React, { Component } from 'react';
import renderer from 'react-test-renderer';
import ErrorBoundary from './ErrorBoundary';
import DefaultErrorTemplate from './templates/DefaultErrorTemplate';

class ComponentWithError extends Component {
  render() {
    throw new Error('I Crashed!');
    return <div>{'Error'}</div>;
  }
}

class RegularComponent extends Component {
  render() {
    return <div>{'RegularComponent'}</div>;
  }
}

describe('<ErrorBoundary />', () => {
  console.error = jest.fn(); // eslint-disable-line no-console

  beforeEach(() => {
    console.error.mockClear(); // eslint-disable-line no-console
  });

  test('snapshot for empty state', () => {
    const snapshot = renderer.create(<ErrorBoundary />);
    expect(snapshot).toMatchSnapshot();
  });

  test('snapshot with props', () => {
    const props = {
      children: <ComponentWithError />,
      errorTemplate: DefaultErrorTemplate,
    };
    const snapshot = renderer.create(<ErrorBoundary {...props} />);
    expect(snapshot).toMatchSnapshot();
    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });

  test('should load DefaultErrorTemplate', () => {
    const props = {
      children: <ComponentWithError />,
    };
    const snapshot = renderer.create(<ErrorBoundary {...props} />);
    expect(snapshot).toMatchSnapshot();
    expect(console.error).toHaveBeenCalled(); // eslint-disable-line no-console
  });

  test('should load Component', () => {
    const props = {
      children: <RegularComponent />,
    };
    const snapshot = renderer.create(<ErrorBoundary {...props} />);
    expect(snapshot).toMatchSnapshot();
  });
});
