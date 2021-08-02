import React, { useCallback } from 'react';
import faker from 'faker';

import Form from './Form';

// zero is not a valid seed for faker
faker.seed(1);
const data = {
  avatar: faker.image.avatar(),
  country: faker.address.countryCode(),
  date: faker.date.future(),
  department: faker.name.jobArea(),
  eid: faker.random.uuid(),
  firstName: faker.name.firstName(),
  homePhone: faker.phone.phoneNumber(),
  lastName: faker.name.lastName(),
  officePhone: faker.phone.phoneNumber(),
  title: faker.name.jobTitle(),
};

const actions = {
  modules: [
    {
      module: 'edit',
    },
    {
      actionName: 'delete',
      label: 'Delete',
      module: 'button',
    },
    {
      actionName: 'view',
      label: 'View',
      module: 'button',
    },
  ],
};

const dataDisplay = [
  {
    attribute: 'eid',
    isEditable: false,
    label: 'EID',
    module: 'text',
  },
  {
    fields: [
      {
        attribute: 'firstName',
        isEditable: true,
        label: 'First Name',
        module: 'text',
      },
      {
        attribute: 'lastName',
        isEditable: true,
        label: 'Last Name',
        module: 'text',
      },
    ],
    module: 'row',
  },
  {
    attribute: 'homePhone',
    isEditable: true,
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
];

const BasicForm = (props) => {
  const handleFormAction = useCallback((action, data) => {
    // eslint-ignore-next-line no-console -- we need this to be a developer message
    console.log(`Action: '${action.name}' has been invoked:`);
    // eslint-ignore-next-line no-console -- we need this to be a developer message
    console.table(data);
  }, []);

  return (
    <>
      <h1>FormPublicAPI Test</h1>
      <p>
        Looks like we also need to bring this closer to alignment with Table:
      </p>
      <ul>
        <li>
          <code>dataConfig</code> needs to be removed and separated into
          different slices. Since we do not have Form in use anywhere, we do not
          have to worry about alerting developers to these changes.
          <ul>
            <li>
              <code>actions</code>
            </li>
            <li>
              <code>dataDisplay</code>
            </li>
          </ul>
        </li>
      </ul>

      <Form {...props} onAction={handleFormAction} />
    </>
  );
};

const InitialEditing = (props) => (
  <>
    <h1>Initial Editing Form</h1>{' '}
    <p>A form can be in an editing state initially.</p> <Form {...props} />
  </>
);

export { dataDisplay };
export default {
  basic: <BasicForm actions={actions} data={data} dataDisplay={dataDisplay} />,
  initialEditing: (
    <InitialEditing
      actions={actions}
      data={data}
      dataDisplay={dataDisplay}
      isInitialEditing
    />
  ),
};
