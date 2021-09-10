import { equals } from 'ramda';

const preserveBooleans = (data, dataDisplay) => {
  const booleanFields = dataDisplay
    .reduce((allFields, currentField) => {
      if (currentField.module === 'row') {
        allFields.push(...currentField.fields);
      } else {
        allFields.push(currentField);
      }

      return allFields;
    }, [])
    .filter((field) => field.module === 'checkbox');

  return {
    ...data,
    ...booleanFields.reduce((preserveBooleans, booleanField) => {
      if (equals(data[booleanField.value], ['on'])) {
        preserveBooleans[booleanField.attribute] = true;
      } else if (
        equals(data[booleanField.value], ['off']) ||
        equals(data[booleanField.value], [])
      ) {
        preserveBooleans[booleanField.attribute] = false;
      }
      return preserveBooleans;
    }, {}),
  };
};

export default preserveBooleans;
