import { fireEvent, render, screen } from '@testing-library/react';

import cosmosFixtures from './DataDateTime.fixture';

// We cannot destructure during import because the default export in Cosmos
// multi-fixture files is an object so we need to import the fixtures first,
// then destructure them separately.
const { display, editing } = cosmosFixtures;

const VALUE = '2018-06-12T19:30';

describe('Input Date Time', () => {
  // without ModuleSandbox will render the property information into a span
  describe('display', () => {
    const labelText = 'Display';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(display).container;
    });

    test('renders without any props', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <span> by default', () => {
      const input = screen.getByLabelText(labelText);
      // Make sure the actual DOM element is not render an input
      expect(input.tagName).toMatch('SPAN');
    });
  });

  describe('editing', () => {
    const labelText = 'Editing';
    // specifying ModuleSandbox will have the flag to render our input date field

    beforeEach(() => render(editing));
    test('renders a <input date> by default', () => {
      const input = screen.getByLabelText(labelText);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'datetime-local');
      expect(input).toHaveValue(VALUE);
    });

    test('change value', () => {
      const newDate = '2018-06-14T19:30';
      const input = screen.getByLabelText(labelText);
      fireEvent.change(input, { target: { value: newDate } });
      expect(input).toHaveValue(newDate);
    });
  });
});
