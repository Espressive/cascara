import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './Button';

test('Renders with defaults', () => {
  const snap = render(<Button />).container;

  expect(snap).toMatchSnapshot();

  // This should always be our first test rendering the bare component.
  // We might need to find a way to make this test not fail for a prop-type
  // error if there are missing required props. Eventually we want tests
  // to fail if there are any console errors.
});
