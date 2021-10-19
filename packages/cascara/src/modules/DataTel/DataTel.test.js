import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import cosmosFixtures, { displayProps, editingProps } from './DataTel.fixture';
import testFixtures from '../helpers/ModuleTestHelper.fixture';

// We cannot destructure during import because the default export in Cosmos
// multi-fixture files is an object so we need to import the fixtures first,
// then destructure them separately.
const { display, editing, displayNoLabel, editingNoLabel } = cosmosFixtures;
const { telTest } = testFixtures;

describe('DataTel', () => {
  // without ModuleSandbox will render the property information into a span
  describe('display', () => {
    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(display).container;
    });

    test('snapshot', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <span> by default', () => {
      const input = screen.getByLabelText(displayProps.label);
      // Make sure the actual DOM element is not render an input
      expect(input.tagName).toMatch('SPAN');
      // Make sure the dom element that has our aria-label is the input
      expect(input.classList.contains('Tel')).toBe(true);
    });
  });

  describe('editing', () => {
    // We need a place to store the view for snapshot testing. This is not required when we are using `screen` directly from RTL.
    let view;

    beforeEach(() => {
      // Set the render container to our `view` so it is in scope for the snapshot test
      view = render(editing).container;
    });

    test('snapshot', () => {
      expect(view).toMatchSnapshot();
    });

    test('renders a <input date> by default', () => {
      const input = screen.getByLabelText(editingProps.label);
      // Check that we also use the correct type
      expect(input).toHaveAttribute('type', 'tel');
      expect(input).toHaveValue('123-456-7890');
    });

    test('change value', () => {
      const newTel = '456-124-7890';
      const input = screen.getByLabelText(editingProps.label);
      fireEvent.change(input, { target: { value: newTel } });
      expect(input).toHaveValue(newTel);
    });
  });

  describe('accessibility', () => {
    test('editing', () => {
      render(editing);

      const input = screen.getByLabelText(editingProps.label);
      // The label tag is the parent wrapper
      const label = input.closest('label');

      // Test is written this way to make sure we know that both values need to be the same.
      const linkedLabelValue = editingProps.label;

      // Verify label for attribute has linked value
      expect(label).toHaveAttribute(
        'for',
        expect.stringContaining(linkedLabelValue)
      );
      // Verify input id attribute has linked value
      expect(input).toHaveAttribute(
        'id',
        expect.stringContaining(linkedLabelValue)
      );
      // Check that the input does NOT have an aria-label defined because there is a label tag
      expect(input).not.toHaveAttribute('aria-label');
    });

    test('display no label', () => {
      // Make sure that the input is still accessible with label text even when we are not showing a label tag in tables
      render(displayNoLabel);
      const input = screen.getByLabelText(displayProps.label);
      expect(input).toBeDefined();
    });

    test('editing no label', () => {
      // Make sure that the input is still accessible with label text even when we are not showing a label tag in tables
      render(editingNoLabel);
      const input = screen.getByLabelText(editingProps.label);
      expect(input).toBeDefined();
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

      render(telTest);

      // wait for checkbox to be present
      await waitFor(() => screen.findByRole('checkbox', { name: 'Checkbox' }));

      // get the checkbox and check it
      const checkboxInput = screen.getByRole('checkbox', {
        name: 'Checkbox',
      });
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
          tel: '911',
        }
      );

      /**
       * We expect that outbound data type is the same as
       * the inblound data type.
       */
      const submittedValue = onAction.mock.calls[0][1].tel;
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

      render(telTest);

      // wait for input to be present
      await waitFor(() => screen.getByRole('checkbox', { name: 'Checkbox' }));

      // make the form dirty
      const colorInput = screen.getByLabelText('Tel');
      fireEvent.input(colorInput, { target: { value: '199' } });

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
          tel: '199',
        }
      );

      /**
       * We expect that outbound data type is the same as
       * the inblound data type.
       */
      const submittedValue = onAction.mock.calls[0][1].tel;
      const submittedValueType = typeof submittedValue;
      expect(submittedValueType).toBe('string');
    });
  });
});
