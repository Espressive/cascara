import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';

import Form from '../../ui/Form';

import fixtures, {
  handleFormAction,
} from '../helpers/ModuleTestHelper.fixture';

const { checkboxTest } = fixtures;

describe('datacheckbox', () => {
  test('it returns the correct data type', async () => {
    const onAction = jest.fn();

    render(
      <Form
        actions={{
          modules: [
            {
              module: 'edit',
            },
          ],
        }}
        data={{
          id: '01',
          checkbox: false,
        }}
        dataDisplay={[
          {
            attribute: 'id',
            label: 'ID',
            module: 'text',
          },
          {
            attribute: 'checkbox',
            label: 'Checkbox',
            module: 'checkbox',
          },
        ]}
        isInitialEditing
        onAction={onAction}
      />
    );

    await waitFor(() => screen.findByRole('checkbox', { name: 'Checkbox' }));

    const checkboxInput = screen.getByRole('checkbox', { name: 'Checkbox' });
    fireEvent.click(checkboxInput);

    const saveButton = screen.getByRole('button', { name: 'Save' });
    fireEvent.click(saveButton);

    expect(onAction).toBeCalledWith({ name: 'edit.save' });
    // expect(log.mock.calls[0][1]).toEqual({ checkbox: true });
  });
});
