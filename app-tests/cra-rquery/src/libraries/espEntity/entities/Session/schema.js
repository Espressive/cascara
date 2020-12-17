import * as yup from 'yup';

/**
 * Defines the schema (typings) for the entity
 *
 * The purpose is to validate any instance against this schema. */
export const schema = yup.object({
  key: yup.string,
});

/**
 * Defines the shape of the entity to be used when consuming this resource. */
export const shape = [
  {
    key: {
      attribute: 'key',
      isEditable: false,
      isLabeled: false,
      label: 'token',
      module: 'string',
    },
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
