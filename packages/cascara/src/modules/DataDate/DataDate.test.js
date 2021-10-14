import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DateDate from './DataDate';
import { DisplayDataDate } from './DataDate.fixture';
import testFixtures from '../helpers/ModuleTestHelper.fixture';

const { dateTest } = testFixtures;

const VALUE = '2021-07-24';

describe('Input Date', () => {
  // without ModuleSandbox will render the property information into a span
  describe('default', () => {
    const testId = 'default';

    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(<DateDate data-testid={testId} />).container;
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
        <DisplayDataDate data-testid={testId} isEditing value={'2021-07-24'} />
      )
    );
    test('renders a <input date> by default', () => {
      const input = screen.getByTestId(testId);
      // Check that we also use the correct type for accessibility
      expect(input).toHaveAttribute('type', 'date');
      expect(input).toHaveValue(VALUE);
    });

    test('change value', () => {
      const newDate = '2021-07-23';
      const input = screen.getByTestId(testId);
      userEvent.type(input, newDate);
      expect(input).toHaveValue(newDate);
    });
  });

  describe('data types', () => {
    /**
     * This test validates the data types going in are also going out.
     * i.e. without any type casting that corrupts the data.
     *
     * The test focuses on the data that is NOT mutated.
     */
    test("what goes in, must go out - 'at rest' data", async () => {
      // prepare action handler mock
      const onAction = jest.spyOn(console, 'log');

      render(dateTest);

      // wait for checkbox to be present
      await waitFor(() => screen.findByRole('checkbox', { name: 'Checkbox' }));

      // get the checkbox and check it
      const checkboxInput = screen.getByRole('checkbox', { name: 'Checkbox' });
      fireEvent.change(checkboxInput, { target: { checked: true } });

      // submit the form
      const saveButton = screen.getByRole('button', { name: 'Save' });
      fireEvent.click(saveButton);

      // wait for the form to be in display mode
      await waitFor(() => screen.findByRole('button', { name: 'Edit' }));

      /**
       * We expect the mock to have been called with two params:
       *
       * - the action object which includes the action name
       * - the data sibmitted by the form
       */
      expect(onAction).toBeCalledWith(
        { name: 'edit.save' },
        {
          checkbox: true,
          date: '2021-07-24',
        }
      );

      /**
       * We expect that outbound data type is the same as
       * the inblound data type.
       */
      const submittedValue = onAction.mock.calls[0][1].date;
      const submittedValueType = typeof submittedValue;
      expect(submittedValueType).toBe('string');
    });

    /**
     * This test validates the data types going in are also going out.
     * i.e. without any type casting that corrupts the data.
     *
     * The test focuses on the data that is mutated.
     */
    test("what goes in, must go out - 'mutated' data", async () => {
      // prepare action handler mock
      const onAction = jest.spyOn(console, 'log');

      render(dateTest);

      // wait for checkbox to be present
      await waitFor(() => screen.getByRole('checkbox', { name: 'Checkbox' }));

      // make the form dirty
      const colorInput = screen.getByLabelText('Date');
      fireEvent.input(colorInput, { target: { value: '2021-07-25' } });

      // submit the form
      const saveButton = screen.getByRole('button', { name: 'Save' });
      fireEvent.click(saveButton);

      // wait for the form to be in display mode
      await waitFor(() => screen.findByRole('button', { name: 'Edit' }));

      /**
       * We expect the mock to have been called with two params:
       *
       * - the action object which includes the action name
       * - the data sibmitted by the form
       */
      expect(onAction).toBeCalledWith(
        { name: 'edit.save' },
        {
          checkbox: false,
          date: '2021-07-25',
        }
      );

      /**
       * We expect that outbound data type is the same as
       * the inblound data type.
       */
      const submittedValue = onAction.mock.calls[0][1].date;
      const submittedValueType = typeof submittedValue;
      expect(submittedValueType).toBe('string');
    });
  });
});
