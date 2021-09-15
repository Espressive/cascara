import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateFile from './DataFile';
import { DisplayDataFile } from './DataFile.fixture';

describe('Input File', () => {
  // without ModuleSandbox will render the property information into a span
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<DateFile data-testid={testId} />).container;
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
      render(<DisplayDataFile data-testid={testId} isEditing />)
    );
    test('renders a <input file> by default', () => {
      const input = screen.getByTestId(testId);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'file');
    });

    test('selec a file', () => {
      const file = new File(['hello'], 'hello.png', { type: 'image/png' });
      const input = screen.getByTestId(testId);
      userEvent.upload(input, file);
      expect(input.files[0]).toStrictEqual(file);
      expect(input.files.item(0)).toStrictEqual(file);
      expect(input.files).toHaveLength(1);
    });
  });
});
