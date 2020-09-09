import React from 'react';

import './TableStyleTest.module.scss';
import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '../';

const fakeEmployees = generateFakeEmployees(50);

const dataConfig = {
  actions: [
    {
      label: 'View',
      module: 'button',
    },
    {
      label: 'Edit',
      module: 'edit',
      moduleData: {
        cancelLabel: 'Cancel',
        saveLabel: 'Save',
      },
    },
    {
      label: 'Disable',
      module: 'button',
    },
  ],
  bulkActions: [
    {
      label: 'Export as CSV',
      module: 'button',
    },
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
  uniqueIdAttribute: 'eid',
};

const onAction = (e, a) => {
  console.clear();
  console.log(`Action ${e} has been invoked with:`);
  console.log(a);
};

const Fixture = (
  <Table data={fakeEmployees} dataConfig={dataConfig} onAction={onAction} />
);

export default Fixture;
