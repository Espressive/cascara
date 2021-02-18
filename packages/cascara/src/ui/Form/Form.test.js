import React from 'react';
import faker from 'faker';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'mutationobserver-shim';

import Form from './';

faker.seed(1);

describe('Form', () => {
  const safeDate = new Date('2021-11-02T22:22:33.405Z');
  const data = {
    avatar: faker.image.avatar(),
    country: faker.address.countryCode(),
    date: safeDate,
    department: faker.name.jobArea(),
    eid: faker.random.uuid(),
    firstName: faker.name.firstName(),
    homePhone: faker.phone.phoneNumber(),
    lastName: faker.name.lastName(),
    officePhone: faker.phone.phoneNumber(),
    title: faker.name.jobTitle(),
  };

  const dataConfig = {
    actions: [
      {
        cancelLabel: 'Cancelar',
        dataTestIDs: {
          cancel: 'cancelButton',
          edit: 'editButton',
          save: 'saveButton',
        },
        editLabel: 'Editar',
        module: 'edit',
        saveLabel: 'Guardar',
      },
      {
        actionName: 'delete',
        'data-testid': 'deleteButton',
        isLabeled: false,
        label: 'Delete',
        module: 'button',
        size: 'small',
      },
    ],
    display: [
      {
        attribute: 'eid',
        label: 'EID',
        module: 'text',
      },
      {
        fields: [
          {
            attribute: 'firstName',
            label: 'First Name',
            module: 'text',
          },
          {
            attribute: 'lastName',
            label: 'Last Name',
            module: 'text',
          },
          {
            attribute: 'officePhone',
            label: 'Office Phone',
            module: 'text',
          },
        ],
        module: 'row',
        ratio: [1, 1, 2],
      },
      {
        attribute: 'homePhone',
        label: 'Home Phone',
        module: 'text',
      },
      {
        fields: [
          {
            attribute: 'title',
            isEditable: false,
            label: 'Title',
            module: 'text',
          },
          {
            attribute: 'department',
            isEditable: false,
            label: 'Department',
            module: 'text',
          },
          {
            attribute: 'country',
            isEditable: false,
            label: 'Country',
            module: 'text',
          },
        ],
        module: 'row',
      },
    ],
  };

  let view;

  beforeAll(() => {});

  test('snapshot test', () => {
    view = render(<Form data={data} dataConfig={dataConfig} />).container;

    expect(view).toMatchSnapshot();
  });

  test('component tree', async () => {
    render(<Form data={data} dataConfig={dataConfig} />);

    const eid = await screen.findByText('EID');
    const firstName = await screen.findByText('First Name');
    const lastName = await screen.findByText('Last Name');
    const homePhone = await screen.findByText('Home Phone');
    const officePhone = await screen.findByText('Office Phone');
    const title = await screen.findByText('Title');
    const department = await screen.findByText('Department');
    const country = await screen.findByText('Country');

    const editButton = await screen.findByTestId('editButton');
    const deleteButton = await screen.findByTestId('deleteButton');

    expect(eid).toBeInTheDocument();
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(homePhone).toBeInTheDocument();
    expect(officePhone).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(department).toBeInTheDocument();
    expect(country).toBeInTheDocument();

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test('it starts in edit mode when isInitialEditing is true', async () => {
    render(<Form data={data} dataConfig={dataConfig} isInitialEditing />);

    const cancelButton = await screen.findByTestId('cancelButton');
    const saveButton = await screen.findByTestId('saveButton');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();

    const editButton = screen.queryByTestId('editButton');
    expect(editButton).not.toBeInTheDocument();
  });

  test('general flow: View Mode -> Edit Mode -> Save Action -> View Mode', async () => {
    const onAction = jest.fn();

    render(<Form data={data} dataConfig={dataConfig} onAction={onAction} />);

    // make sure we are in view mode
    let cancelButton = screen.queryByTestId('cancelButton');
    let saveButton = screen.queryByTestId('saveButton');
    let editButton = screen.queryByTestId('editButton');

    expect(cancelButton).not.toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    // enter edit mode
    userEvent.click(editButton);

    // make sure we are in edit mode
    cancelButton = await screen.findByTestId('cancelButton');
    saveButton = await screen.findByTestId('saveButton');
    editButton = screen.queryByTestId('editButton');

    expect(cancelButton).toBeInTheDocument();
    expect(saveButton).toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();

    // save button should be disabled when form is pristine
    expect(saveButton).toBeDisabled();

    // edit some data
    let firstName = await screen.findByLabelText('First Name');
    expect(firstName).toBeInTheDocument();

    userEvent.type(firstName, 'nio');

    saveButton = await screen.findByTestId('saveButton');
    expect(saveButton).not.toBeDisabled();

    // Save action
    userEvent.click(saveButton);

    // make sure we are back to view mode
    editButton = await screen.findByTestId('editButton');
    cancelButton = screen.queryByTestId('cancelButton');
    saveButton = screen.queryByTestId('saveButton');

    expect(cancelButton).not.toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    // check that onAction event was triggered
    expect(onAction).toHaveBeenCalledTimes(2);

    expect(onAction).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'edit.start',
      }),
      expect.objectContaining(data)
    );

    // check that the data is actually updated in the event
    expect(onAction).toHaveBeenLastCalledWith(
      expect.objectContaining({
        name: 'edit.save',
      }),
      expect.objectContaining({
        ...data,
        firstName: `${data.firstName}nio`,
      })
    );
  });

  test('onAction events', async () => {
    const onAction = jest.fn();

    render(<Form data={data} dataConfig={dataConfig} onAction={onAction} />);

    // verify buttons are there
    let deleteButton = screen.queryByTestId('deleteButton');
    let editButton = screen.queryByTestId('editButton');

    expect(deleteButton).toBeInTheDocument();
    expect(editButton).toBeInTheDocument();

    // enter edit mode
    userEvent.click(deleteButton);

    // check that onAction event was triggered
    expect(onAction).toHaveBeenCalled();
  });
});
