export const COLUMNS = [
  {
    attribute: 'eid',
    isEditable: false,
    label: 'eID',
    module: 'text',
  },
  {
    attribute: 'name',
    isEditable: true,
    label: 'Name',
    module: 'text',
  },
  {
    attribute: 'is_protected',
    isEditable: true,
    label: 'Protected',
    module: 'checkbox',
  },
  {
    attribute: 'created_in_elc',
    isEditable: true,
    label: 'ELC',
    module: 'checkbox',
  },
  {
    attribute: 'sys_created_by',
    isEditable: true,
    label: 'Created by',
    module: 'email',
  },
  {
    attribute: 'sys_date_created',
    isEditable: false,
    label: 'Created at',
    module: 'text',
  },
];

export const ACTIONS = [
  {
    label: 'View',
    handler: () => console.log('View Stuff'),
  },
  {
    label: 'Edit',
    handler: () => console.log('Do Stuff'),
  },
];
