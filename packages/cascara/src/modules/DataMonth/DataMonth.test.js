import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import DataMonth from './DataMonth';
import { DisplayDataMonth } from './DataMonth.fixture';

describe('Input Month', () => {
  // without ModuleSandbox will render the property information into a span
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<DataMonth data-testid={testId} />).container;
    });

    test('renders without any props', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <span> by default', () => {
      const input = screen.getByTestId(testId);
      // Make sure the actual DOM element is not render an input
      expect(input.tagName).toMatch('SPAN');
    });
  });

  describe('editing', () => {
    // specifying ModuleSandbox will have the flag to render our input month field
    const testId = 'default';
    beforeEach(() =>
      render(<DisplayDataMonth data-testid={testId} isEditing />)
    );
    test('renders a <input month> by default', () => {
      const input = screen.getByTestId(testId);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'month');
    });

    test('change value', () => {
      const newMonth = '2021-07';
      const input = screen.getByTestId(testId);
      fireEvent.change(input, { target: { value: newMonth } });
      expect(input).toHaveValue(newMonth);
    });
  });
});
