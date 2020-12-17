import * as yup from 'yup';

/**
 * Defines the schema (typings) for the entity
 *
 * The purpose is to validate any instance against this schema. */
export const schema = yup.object({
  url: yup.string,
  id: yup.number,
  eid: yup.string,
  email: yup.email,
  username: yup.string,
  full_name: yup.string,
  first_name: yup.string,
  last_name: yup.string,
  middle_name: yup.string,
  user_type: yup.string,
  date_of_birth: yup.date,
  secondary_email: yup.email,
  nickname: yup.string,
  alias: yup.email,
  start_date: yup.date,
  termination_date: yup.date,
  social_profile_picture: yup.string,
  title: yup.string,
  employee_number: yup.string,
  manager: yup.string,
  job_role: yup.string,
  mentor: yup.string,
  last_sms_timestamp: yup.string,
  sms_subscription: yup.bool,
  terms_accepted: yup.bool,
  user_state: yup.string,
  about_me: yup.string,
  location: yup.string,
  cost_center: yup.string,
  office_address: yup.string,
  remote_worker: yup.bool,
  work_collaboration: yup.string,
  home_address: yup.string,
  key: yup.string,
  office_location: yup.string,
  is_active: yup.bool,
  is_admin: yup.bool,
  is_manager: yup.bool,
  preferred_language_id: yup.string,
  mobile_type: yup.string,
  computer_type: yup.string,
  sys_custom_fields: yup.string,
  custom_map: yup.string,
  scim_dict: yup.string,
});

/**
 * Defines the shape of the entity to be used when consuming this resource. */
export const shape = [
  {
    attribute: 'url',
    isEditable: false,
    label: 'URL',
    module: 'string',
  },
  {
    attribute: 'id',
    isEditable: false,
    label: 'ID',
    module: 'number',
  },
  {
    attribute: 'eid',
    isEditable: false,
    label: 'eID',
    module: 'string',
  },
  {
    attribute: 'email',
    isEditable: true,
    label: 'eMail',
    module: 'email',
  },
  {
    attribute: 'username',
    isEditable: false,
    label: 'Username',
    module: 'string',
  },
  {
    attribute: 'full_name',
    isEditable: false,
    label: 'Full Name',
    module: 'string',
  },
  {
    attribute: 'first_name',
    isEditable: true,
    label: 'First Name',
    module: 'string',
  },
  {
    attribute: 'last_name',
    isEditable: true,
    label: 'Last Name',
    module: 'string',
  },
  {
    attribute: 'middle_name',
    isEditable: true,
    label: 'Middle Name',
    module: 'string',
  },
  {
    attribute: 'user_type',
    isEditable: true,
    label: 'User Type',
    module: 'select',

    // todo @manu: use the correct options for user type
    options: [
      {
        label: 'Argentina',
        value: 'Argentina',
      },
      {
        label: 'Brazil',
        value: 'Brazil',
      },
      {
        label: 'USA',
        value: 'USA',
      },
    ],
  },
  {
    attribute: 'date_of_birth',
    isEditable: true,
    label: 'Date of Birth',
    module: 'date',
  },
  {
    attribute: 'secondary_email',
    isEditable: true,
    label: 'Secondary eMail',
    module: 'email',
  },
  {
    attribute: 'nickname',
    isEditable: true,
    label: 'Nickname',
    module: 'string',
  },
  {
    attribute: 'alias',
    isEditable: true,
    label: 'Alias',
    module: 'email',
  },

  {
    attribute: 'start_date',
    isEditable: true,
    label: 'Start Date',
    module: 'date',
  },
  {
    attribute: 'termination_date',
    isEditable: true,
    label: 'Termination Date',
    module: 'date',
  },

  // @brian we need a module to display these, otherwise we should not include it
  // {
  //   attribute: 'images',
  //   isEditable: false,
  //   label: 'Images',
  //   module: 'string',
  // },

  {
    attribute: 'social_profile_picture',
    isEditable: true,
    label: 'Social Profile Picture',
    module: 'string',
  },

  {
    attribute: 'title',
    isEditable: true,
    label: 'Title',
    module: 'string',
  },

  {
    attribute: 'employee_number',
    isEditable: false,
    label: 'Employee Number',
    module: 'string',
  },
  {
    attribute: 'manager',
    isEditable: false,
    label: 'Maganer',
    module: 'string',
  },
  {
    attribute: 'job_role',
    isEditable: false,
    label: 'Job Role',
    module: 'string',
  },
  {
    attribute: 'mentor',
    isEditable: false,
    label: 'Mentor',
    module: 'string',
  },
  {
    attribute: 'last_sms_timestamp',
    isEditable: false,
    label: 'Last SMS Timestamp',
    module: 'string',
  },
  {
    attribute: 'sms_subscription',
    isEditable: true,
    label: 'SMS Subscription',
    module: 'checkbox',
  },
  {
    attribute: 'terms_accepted',
    isEditable: true,
    label: 'Terms Accepted',
    module: 'checkbox',
  },
  {
    attribute: 'user_state',
    isEditable: true,
    label: 'User State',
    module: 'string',
  },

  // todo @manu: we need a module for entity select
  //  {
  //    attribute: 'groups',
  //    isEditable: false,
  //    label: 'Groups',
  //    module: 'string',
  //  },
  {
    attribute: 'about_me',
    isEditable: true,
    label: 'About Me',
    module: 'string',
  },
  {
    attribute: 'location',
    isEditable: false,
    label: 'Location',
    module: 'string',
  },
  {
    attribute: 'cost_center',
    isEditable: false,
    label: 'Cost Center',
    module: 'string',
  },
  {
    attribute: 'office_address',
    isEditable: true,
    label: 'Office Address',
    module: 'string',
  },
  {
    attribute: 'remote_worker',
    isEditable: true,
    label: 'Remote',
    module: 'checkbox',
  },
  {
    attribute: 'work_collaboration',
    isEditable: false,
    label: 'Work Collaboration',
    module: 'string',
  },

  // todo @manu: we need a module to display a list of entities
  //  {
  //    attribute: 'phone_numbers',
  //    isEditable: false,
  //    label: 'Phone Numbers',
  //    module: 'string',
  //  },

  {
    attribute: 'home_address',
    isEditable: true,
    label: 'Home Address',
    module: 'string',
  },
  {
    attribute: 'key',
    isEditable: false,
    label: 'token',
    module: 'string',
  },

  // todo @manu: possible a 'enum' module?
  // {
  //   attribute: 'delegates',
  //   isEditable: false,
  //   label: 'Delegates',
  //   module: 'string',
  // },
  //  {
  //    attribute: 'delegate_of',
  //    isEditable: false,
  //    label: 'Delegate of',
  //    module: 'string',
  //  },
  //  {
  //    attribute: 'favorites',
  //    isEditable: false,
  //    label: 'Favorites',
  //    module: 'string',
  //  },

  // todo @manu: figure out what this is
  //  {
  //    attribute: 'shadow_block',
  //    isEditable: false,
  //    label: 'token',
  //    module: 'string',
  //  },

  {
    attribute: 'office_location',
    isEditable: true,
    label: 'Office Location',
    module: 'string',
  },
  {
    attribute: 'is_active',
    isEditable: true,
    label: 'Active',
    module: 'checkbox',
  },

  // todo @manu: how do we handle this one?
  //  {
  //    attribute: 'esp_dict',
  //    isEditable: false,
  //    label: 'token',
  //    module: 'string',
  //  },

  {
    attribute: 'is_admin',
    isEditable: true,
    label: 'Admin',
    module: 'checkbox',
  },
  {
    attribute: 'is_manager',
    isEditable: false,
    label: 'Manager',
    module: 'checkbox',
  },

  // todo @manu: entity list module?
  //  {
  //    attribute: 'key',
  //    isEditable: false,
  //    label: 'token',
  //    module: 'string',
  //  },

  {
    attribute: 'preferred_language_id',
    isEditable: true,
    label: 'Prefferred Language',
    module: 'string',
  },

  {
    attribute: 'mobile_type',
    isEditable: false,
    label: 'Mobile Type',
    module: 'select',
    options: [
      {
        label: 'Android',
        value: 'Android',
      },
      {
        label: 'iOS',
        value: 'iOS',
      },
    ],
  },
  {
    attribute: 'computer_type',
    isEditable: false,
    label: 'token',
    module: 'select',
    options: [
      {
        label: 'Macintosh',
        value: 'Macintosh',
      },
      {
        label: 'PC',
        value: 'PC',
      },
    ],
  },
  {
    attribute: 'sys_custom_fields',
    isEditable: false,
    label: 'Sys Custom Fields',
    module: 'string',
  },
  {
    attribute: 'custom_map',
    isEditable: false,
    label: 'Custom Map',
    module: 'string',
  },
  {
    attribute: 'scim_dict',
    isEditable: false,
    label: 'SCIM Dict',
    module: 'string',
  },
];

/**
 * Entity instance validation
 * Validates the provided entity instance against the entity's schema
 *
 * @param {Object} entityInstance An entity instance to validate
 * @param {Object} options A set of options to further configure the validation
 * @param {Boolean} options.strict only validate the input, and skip any coercion or transformation
 * @param {Boolean} options.abortEarly return from validation methods on the first error rather than after all validations run
 * @param {Boolean} options.stripUnknown remove unspecified keys from objects
 * @param {Boolean} options.recursive when false validations will not descend into nested schema (relevant for objects or arrays)
 * @param {Object} options.context any context needed for validating schema conditions
 */
export function validate(
  entityInstance,
  {
    strict = false,
    abortEarly = true,
    stripUnknown = false,
    recursive = true,
    context = {},
  }
) {
  return schema.validate(entityInstance, {
    strict,
    abortEarly,
    stripUnknown,
    recursive,
    context,
  });
}
