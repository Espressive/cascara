import React from 'react';
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
<<<<<<< HEAD
    },
    {
      actionName: 'delete',
      isLabeled: false,
      label: 'Delete',
      module: 'button',
      size: 'small',
=======
>>>>>>> FDS-115 Updated very old Form POC with actual components and modules from Table
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
<<<<<<< HEAD
        {
          attribute: 'password',
          isSecure: true,
          label: 'Password',
          module: 'text',
        },
      ],
      module: 'row',
      ratio: [1, 1, 2],
=======
      ],
      module: 'row',
>>>>>>> FDS-115 Updated very old Form POC with actual components and modules from Table
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

const getValue = (data, config) => {
  return { ...config, defaultValue: data[config.attribute] };
};

const prepareRowData = (data, rowConfig) =>
  rowConfig.map((field) => getValue(data, field));

// We will want to make this more robust to test multi-dimensional arrays and
// then include it in the prepareFormData switch
const isRow = (value) => {
  switch (typeof value[0]) {
    case 'undefined':
      return false;
    case 'object':
      return true;
    default:
      throw new Error('Bad data but we do not know why right now');
  }
};

const prepareFormData = (data, config) => {
  const fields = config.display.map((field) => {
    switch (typeof field[0]) {
      // This case is actually for an object at the root of the array
      case 'undefined':
        return getValue(data, field);
      // This case is technically telling us we have an object at the first index
      // which means we have a multi-dimensional array.
      case 'object':
        return prepareRowData(data, field);
      default:
        throw new Error('Only objects or arrays are supported in data.display');
    }
  });

  const { actions } = dataConfig;

  return {
    actions,
    fields,
  };
};

const jsonStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const FormPublicAPI = ({ data, dataConfig }) => {
  const handleFormAction = (action, data) => {
    // eslint-ignore-next-line no-console
    console.log(`Action: '${action.name}' has been invoked:`);
    // eslint-ignore-next-line no-console
    console.table(data);
  };

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
