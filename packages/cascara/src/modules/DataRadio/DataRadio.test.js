import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fixtures from '../helpers/ModuleTestHelper.fixture';

const { radioTest } = fixtures;

describe('dataRadio', () => {
  /**
   * This test validates the data types going in are also going out.
   * i.e. without any type casting that corrupts the data.
   *
   * The test focuses on the data that is NOT mutated.
   */
  test("what goes in, must go out - 'at rest' data", async () => {
    // prepare action handler mock
    const onAction = jest.spyOn(console, 'log');

    render(radioTest);

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
        One: '',
        Two: '',
        checkbox: true,
        radio: true,
      }
    );

    /**
     * We expect that outbound data type is the same as
     * the inblound data type.
     */
    const submittedValue = onAction.mock.calls[0][1].radio;
    const submittedValueType = typeof submittedValue;
    expect(submittedValueType).toBe('boolean');
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

    render(radioTest);

    // wait for checkbox to be present
    await waitFor(() => screen.findByRole('checkbox', { name: 'Checkbox' }));

    // make the form dirty
    const radioInput = screen.getByRole('radio', { name: 'One' });
    fireEvent.change(radioInput, { target: { checked: true } });
    // useEvent.type(radioInput, 10, { allAtOnce: true });

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
        One: 'One',
        Two: '',
        checkbox: false,
        radio: true,
      }
    );

    /**
     * We expect that outbound data type is the same as
     * the inblound data type.
     */
    const submittedValue = onAction.mock.calls[0][1].radio;
    const submittedValueType = typeof submittedValue;
    expect(submittedValueType).toBe('boolean');
  });
});
