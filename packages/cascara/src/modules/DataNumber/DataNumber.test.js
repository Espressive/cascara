import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fixtures from '../helpers/ModuleTestHelper.fixture';

const { numberTest } = fixtures;

describe('dataNumber', () => {
  /**
   * This test validates the data types going in are also going out.
   * i.e. without any type casting that corrupts the data.
   *
   * The test focuses on the data that is NOT mutated.
   */
  test("what goes in, must go out - 'at rest' data", async () => {
    // prepare action handler mock
    const onAction = jest.spyOn(console, 'log');

    render(numberTest);

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
        number: '5',
      }
    );

    /**
     * We expect that outbound data type is the same as
     * the inblound data type.
     */
    const submittedValue = onAction.mock.calls[0][1].number;
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

    render(numberTest);

    // wait for input to be present
    await waitFor(() => screen.findByRole('spinbutton', { name: 'Number' }));

    // make the form dirty
    const textInput = screen.getByRole('spinbutton', { name: 'Number' });
    fireEvent.input(textInput, { target: { value: 10 } });
    // useEvent.type(textInput, 10, { allAtOnce: true });

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
        number: '10',
      }
    );

    /**
     * We expect that outbound data type is the same as
     * the inblound data type.
     */
    const submittedValue = onAction.mock.calls[0][1].number;
    const submittedValueType = typeof submittedValue;
    expect(submittedValueType).toBe('string');
  });
});
