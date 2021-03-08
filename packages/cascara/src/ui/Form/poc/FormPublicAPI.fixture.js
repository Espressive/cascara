import React, { useCallback } from 'react';
import faker from 'faker';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import Form from '../Form';

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

const dataConfig = {
  actions: [
    {
      module: 'edit',
    },
    {
      actionName: 'delete',
      isLabeled: false,
      label: 'Delete',
      module: 'button',
      size: 'small',
    },
    {
      actionName: 'delete',
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
      ],
      module: 'row',
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

const jsonStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const FormPublicAPI = ({ data, dataConfig }) => {
  const handleFormAction = useCallback((action, data) => {
    // eslint-ignore-next-line no-console -- we need this to be a developer message
    console.log(`Action: '${action.name}' has been invoked:`);
    // eslint-ignore-next-line no-console -- we need this to be a developer message
    console.table(data);
  }, []);

  return (
    <div>
      <div style={{ margin: '1em' }}>
        <h1>FormPublicAPI Test</h1>
      </div>

      <JsonPlaceholder data={data} style={jsonStyle} title='data' />
      <JsonPlaceholder data={dataConfig} style={jsonStyle} title='dataConfig' />

      <Form
        data={data}
        dataConfig={dataConfig}
        isInitialEditing
        onAction={handleFormAction}
      />
    </div>
  );
};

const Fixture = <FormPublicAPI data={data} dataConfig={dataConfig} />;

export default Fixture;
