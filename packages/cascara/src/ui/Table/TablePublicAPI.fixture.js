import React from 'react';
import faker from 'faker';
import JsonDisplay from '../../lib/JsonDisplay';

// TODO: this might make sense to abstract into a memoized generator function
// or potentially if we could define data schemas for mocks, then generate
// deterministic data to output with a consistent seed that we can then reuse.

// zero is not a valid seed for faker
faker.seed(1);
const data = new Array(20).fill(null).map((e, i) => {
  // So we never have collisions, we have to start at 2 instead of 1
  faker.seed(i++ + 1);
  return (e = {
    avatar: faker.image.avatar(),
    country: faker.address.countryCode(),
    date: faker.date.future(),
    department: faker.name.jobArea(),
    eid: faker.random.uuid(),
    fullName: faker.fake(
      '{{name.lastName}}, {{name.firstName}} {{name.suffix}}'
    ),
    homePhone: faker.phone.phoneNumber(),
    nickname: faker.name.firstName(),
    officePhone: faker.phone.phoneNumber(),
    title: faker.name.jobTitle(),
  });
});

const dataConfig = {
  actions: [
    {
      label: 'Edit',
      onClick: console.warn('Clicked Edit'),
      type: 'button',
    },
    <button>'Test'</button>,
  ],
  display: [
    {
      attribute: 'fullName',
      isEditable: false,
      label: 'Full Name',
      type: 'string',
    },
    {
      attribute: 'homePhone',
      isEditable: true,
      label: 'Home Phone',
      type: 'phone',
    },
  ],
};

const prepareData = (data, config) =>
  data.map((obj) => {
    const displayData = config?.display.map((itemConfig) => ({
      ...itemConfig,
      value: obj[itemConfig.attribute],
    }));
    return { actions: config?.actions, displayData };
  });

const jsonStyle = {
  display: 'inline-block',
  verticalAlign: 'top',
  width: '50%',
};

const TablePublicAPI = ({ data, dataConfig }) => {
  return (
    <div>
      <JsonDisplay data={dataConfig} isInitialOpen title='dataConfig' />
      <JsonDisplay data={data} isInitialOpen style={jsonStyle} title='data' />
      <JsonDisplay
        data={prepareData(data, dataConfig)}
        isInitialOpen
        style={jsonStyle}
        title='To Display'
      />
    </div>
  );
};

const Fixture = <TablePublicAPI data={data} dataConfig={dataConfig} />;

export default Fixture;
