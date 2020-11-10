/** eslint-disable no-console */
import React from 'react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import './TableStyleTest.module.scss';
import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '..';

const data = generateFakeEmployees(50).map((employee) => ({
  ...employee,
}));

const dataConfig = {
  actions: [
    {
      content: 'view',
      module: 'button',
      name: 'view',
      size: 'small',
    },
    {
      content: 'edit',
      module: 'edit',
      name: 'edit',
      size: 'small',
    },
  ],
  display: [
    {
      attribute: 'fullName',
      isEditable: true,
      label: 'Full Name',
      module: 'text',
    },
    {
      attribute: 'email',
      isEditable: true,
      label: 'Email',
      module: 'email',
    },
    {
      attribute: 'homePhone',
      isEditable: true,
      label: 'Home Phone',
      module: 'text',
    },
  ],
};

const Fixture = () => (
  <>
    <JsonPlaceholder data={dataConfig} title='dataConfig' />
    <Table
      data={data}
      dataConfig={dataConfig}
      onAction={console.log}
      uniqueIdAttribute={'eid'}
    />
  </>
);

export default Fixture;
