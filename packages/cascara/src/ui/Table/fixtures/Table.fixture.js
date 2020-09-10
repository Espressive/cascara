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
      cancellabel: 'Cancel',
      label: 'Edit',
      savelabel: 'Save',
      type: 'edit',
    },
    {
      label: 'Delete',
      module: 'button',
      outcome: 'negative',
    },
  ],
  bulkActions: [
    {
      label: 'Export as CSV',
      module: {
        type: 'button',
      },
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

const onAction = (caller, data) => {
  console.clear();
  console.log(`Action ${caller.label} has been invoked with:`);
  console.log('caller: ', caller);
  console.log('data: ', data);
};

const Fixture = (
  <Table data={fakeEmployees} dataConfig={dataConfig} onAction={onAction} />
);

export default Fixture;
