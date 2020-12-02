/** eslint-disable no-console */
import React from 'react';
import faker from 'faker';
import { Container } from 'semantic-ui-react';
import Table from '..';

faker.seed(1);

const testData = (qty) =>
  new Array(qty).fill(null).map((e, i) => {
    // So we never have collisions, we have to start at 2 instead of 1
    faker.seed(i++ + 1);

    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();

    return (e = {
      active: faker.random.boolean(),
      country: faker.random.arrayElement(['USA', 'Brazil', 'Argentina']),
      eid: faker.random.uuid(),
      email: faker.internet.email(),
      employeeNumber: faker.random.number(),
      fullName: `${firstName} ${lastName}`,
      homePhone: faker.phone.phoneNumber(),
      long:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio at modi cupiditate doloremque quasi deserunt distinctio amet perferendis ipsam, alias nemo quia necessitatibus! Sapiente suscipit soluta magni quisquam consequuntur, quos maxime voluptatibus tenetur expedita architecto dolore omnis odit neque quas. Illum reiciendis consequatur similique ipsum repellendus culpa debitis aliquid cupiditate?',
      officePhone: faker.phone.phoneNumber(),
      title: faker.name.jobTitle(),
    });
  });

const dataConfig = {
  actions: [
    {
      label: 'view',
      module: 'button',
    },
    {
      module: 'edit',
    },
  ],
  display: [
    {
      attribute: 'eid',
      isEditable: false,
      label: 'Full Name',
      module: 'textarea',
    },
    {
      attribute: 'fullName',
      label: 'Full Name',
      module: 'text',
    },
    {
      attribute: 'long',
      label: 'Long Attr',
      module: 'text',
    },
    {
      attribute: 'email',
      label: 'Email',
      module: 'email',
    },
    {
      attribute: 'homePhone',
      label: 'Home Phone',
      module: 'text',
    },
  ],
};

const Fixture = () => (
  <Container>
    <Table
      data={testData(30)}
      dataConfig={dataConfig}
      onAction={console.log}
      uniqueIdAttribute={'eid'}
    />
  </Container>
);

export default Fixture;
