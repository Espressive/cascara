const getAttributeValueFromRecord = (attribute, record) => {
  const attributeExists = record.hasOwnProperty(attribute);

  if (attributeExists) {
    return record[attribute];
  }

  throw new Error(`Attribute ${attribute} doesn't exist in record`);
};

export { getAttributeValueFromRecord };
