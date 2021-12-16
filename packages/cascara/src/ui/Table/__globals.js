import pt from 'prop-types';
import { dataModules } from '../../modules/ModuleKeys';

const dataModuleOptions = Object.keys(dataModules);

export const PROP_TYPES = {
  // An array of action objects that will show up on the right side of a table row
  actions: pt.arrayOf(pt.shape({})),

  // An array of data objects that can potentially show up in the table.
  data: pt.arrayOf(pt.shape({})),

  // An ordered array of modules configured to show a corresponding `data` object
  dataDisplay: pt.arrayOf(
    pt.shape({
      module: pt.oneOf(dataModuleOptions).isRequired,
    })
  ),

  // The object property in a `data` object used to identify its uniqueness
  uniqueIdAttribute: pt.string,
};

export const UUID_PRIORITY_KEYS = [
  'eid',
  'uuid',
  'id',
  'sys_date_created',
  'number',
];

export const INFER_UNIQUE_ID = (objectKeys) => {
  for (const key of UUID_PRIORITY_KEYS) {
    if (objectKeys.includes(key)) {
      return key;
    }
  }
  return undefined;
};
