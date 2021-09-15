import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import DateDateTime from './DataDateTime';
import { DisplayDataDateTime } from './DataDateTime.fixture';

const VALUE = '2018-06-12T19:30';

describe('Input Date Time', () => {
  // without ModuleSandbox will render the property information into a span
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<DateDateTime data-testid={testId} />).container;
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
    // specifying ModuleSandbox will have the flag to render our input date field
    const testId = 'default';
    beforeEach(() =>
      render(
        <DisplayDataDateTime data-testid={testId} isEditing value={VALUE} />
      )
    );
    test('renders a <input date> by default', () => {
      const input = screen.getByTestId(testId);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'datetime-local');
      expect(input).toHaveValue(VALUE);
    });

    test('change value', () => {
      const newDate = '2018-06-14T19:30';
      const input = screen.getByTestId(testId);
      fireEvent.change(input, { target: { value: newDate } });
      expect(input).toHaveValue(newDate);
    });
  });
});
