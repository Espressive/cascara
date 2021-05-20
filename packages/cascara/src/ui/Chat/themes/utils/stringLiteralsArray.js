const stringLiteralsArray = (...args) => {
  const tuple = (...args) => args;
  return tuple(...args);
};

export default stringLiteralsArray;
