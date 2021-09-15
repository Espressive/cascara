import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DataImage from './DataImage';
import { DisplayDataImage } from './DataImage.fixture';

describe('Input Image', () => {
  // without ModuleSandbox will render the property information into a span
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<DataImage data-testid={testId} />).container;
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
        <DisplayDataImage
          alt='Login'
          data-testid={testId}
          isEditing
          src='/media/examples/my-button.png'
        />
      )
    );
    test('renders a <input date> by default', () => {
      const input = screen.getByTestId(testId);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'image');
    });

    test('renders the src', () => {
      const input = screen.getByTestId(testId);
      expect(input).toHaveAttribute('alt', 'Login');
      expect(input).toHaveAttribute('src', '/media/examples/my-button.png');
    });
  });
});
