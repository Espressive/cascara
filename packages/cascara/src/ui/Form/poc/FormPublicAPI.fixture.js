/* eslint-disable react/no-multi-comp */
import React from 'react';
import faker from 'faker';
import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

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
      label: 'Cancel',
      module: 'button',
    },
    {
      label: 'Save',
      module: 'button',
      variant: 'positive',
    },
  ],
  display: [
    [
      {
        attribute: 'firstName',
        label: 'First Name',
        type: 'string',
      },
      {
        attribute: 'lastName',
        label: 'Last Name',
        type: 'string',
      },
      {
        attribute: 'lastName',
        label: 'Last Name',
        type: 'string',
      },
    ],
    {
      attribute: 'homePhone',
      label: 'Home Phone',
      type: 'phone',
    },
    [
      {
        attribute: 'title',
        isEditable: false,
        label: 'Title',
        type: 'string',
      },
      {
        attribute: 'department',
        isEditable: false,
        label: 'Department',
        type: 'string',
      },
    ],
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

const fakeFormStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const Field = ({
  label = 'label',
  defaultValue = 'defaultValue',
  isEditable = true,
}) => {
  const fakeContainer = {
    margin: '1em',
  };
  const fakeInput = {
    borderColor: isEditable ? 'grey' : 'transparent',
    borderRadius: '.25em',
    borderStyle: 'solid',
    borderWidth: '1px',
    padding: isEditable ? '.5em' : 0,
  };
  return (
    <div style={fakeContainer}>
      {label}
      <div style={fakeInput}>{defaultValue}</div>
    </div>
  );
};

const FieldGroup = ({ children, length = 1 }) => {
  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${length}, 1fr)`,
  };
  return <div style={style}>{children}</div>;
};

const FormPublicAPI = ({ data, dataConfig }) => {
  return (
    <div>
      <div style={{ margin: '1em' }}>
        <h1>FormPublicAPI Test</h1>
      </div>

      <JsonPlaceholder
        data={data}
        isInitialOpen
        style={jsonStyle}
        title='data'
      />
      <JsonPlaceholder
        data={dataConfig}
        isInitialOpen
        style={jsonStyle}
        title='dataConfig'
      />
      <JsonPlaceholder
        data={prepareFormData(data, dataConfig)}
        isInitialOpen
        style={jsonStyle}
        title='To Display'
      />
      <div style={fakeFormStyle}>
        <div style={{ margin: '1em' }}>
          <h2>Fake Form</h2>
        </div>
        {prepareFormData(data, dataConfig).fields.map((field, i) => {
          if (isRow(field)) {
            return (
              <FieldGroup length={field.length}>
                {field.map((rowField, i) => (
                  <Field key={i} {...rowField} />
                ))}
              </FieldGroup>
            );
          } else {
            return <Field key={i} {...field} />;
          }
        })}
        <div style={{ margin: '1em', textAlign: 'right' }}>
          {prepareFormData(data, dataConfig).actions.map((action, i) => (
            <button key={i}>{action.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Fixture = <FormPublicAPI data={data} dataConfig={dataConfig} />;

export default Fixture;
