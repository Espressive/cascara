// This propType function should validate if we are using JSON data
const json = (props, propName, componentName) => {
  try {
    return JSON.parse(props[propName]);
  } catch (e) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
    );
  }
};

export { json };
