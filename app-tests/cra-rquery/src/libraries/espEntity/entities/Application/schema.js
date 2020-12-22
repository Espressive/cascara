import * as yup from 'yup';

export const schema = yup.object({
  active: yup.bool,
  created_in_elc: yup.bool,
  default_task_type: yup.string,
  description: yup.string,
  eid: yup.string,
  is_protected: yup.bool,
  last_sync_time: yup.date,
  name: yup.string,
  override_faq: yup.bool,
  override_intent_id: yup.string,
  sys_created_by: yup.string().email(),
  sys_date_created: yup.date,
  sys_date_updated: yup.date,
  sys_updated_by: yup.string().email(),
  type: yup.string,
});

export const shape = {
  active: {
    attribute: 'active',
    isEditable: true,
    label: 'Active',
    module: 'checkbox',
  },
  created_in_elc: {
    attribute: 'created_in_elc',
    isEditable: false,
    label: 'From ELC',
    module: 'checkbox',
  },
  default_task_type: {
    attribute: 'default_task_type',
    isEditable: true,
    label: 'Default Task Type',
    module: 'text',
  },
  description: {
    attribute: 'description',
    isEditable: true,
    label: 'Description',
    module: 'text',
  },
  eid: {
    attribute: 'eid',
    isEditable: false,
    label: 'eID',
    module: 'text',
  },
  is_protected: {
    attribute: 'is_protected',
    isEditable: true,
    label: 'Protected',
    module: 'checkbox',
  },
  last_sync_time: {
    attribute: 'last_sync_time',
    isEditable: false,
    label: 'Last Synced',
    module: 'text',
  },
  name: {
    attribute: 'name',
    isEditable: true,
    label: 'Name',
    module: 'text',
  },
  override_faq: {
    attribute: 'override_faq',
    isEditable: true,
    label: 'Override FAQ',
    module: 'checkbox',
  },
  override_intent_id: {
    attribute: 'override_intent_id',
    isEditable: true,
    label: 'Override Intent',
    module: 'text',
  },
  sys_created_by: {
    attribute: 'sys_created_by',
    isEditable: true,
    label: 'Created by',
    module: 'email',
  },
  sys_date_created: {
    attribute: 'sys_date_created',
    isEditable: false,
    label: 'Created At',
    module: 'text',
  },
  sys_date_updated: {
    attribute: 'sys_date_updated',
    isEditable: false,
    label: 'Updated At',
    module: 'text',
  },
  sys_updated_by: {
    attribute: 'sys_updated_by',
    isEditable: true,
    label: 'Updated by',
    module: 'email',
  },
  type: {
    attribute: 'type',
    isEditable: true,
    label: 'Type',
    module: 'text',
  },
};

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
