// This propType function should validate if we are using JSON data

// eslint-disable-next-line consistent-return -- this can't return anything
function json(props, propName, componentName) {
  try {
    JSON.parse(props[propName]);
  } catch (e) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`
    );
  }
}

export { json };
