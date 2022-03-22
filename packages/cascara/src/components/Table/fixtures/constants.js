export const COLUMNS = [
  {
    attribute: 'eid',
    isEditable: false,
    label: 'eid',
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

export const ACTIONS = {
  actionButtonMenuIndex: 0,
  modules: [
    {
      cancelLavel: 'Cancel',
      editLabel: 'Edit',
      module: 'edit',
      saveLabel: 'Save',
    },
    {
      content: 'View',
      module: 'button',
      name: 'viewInFAQ',
    },
  ],
};
