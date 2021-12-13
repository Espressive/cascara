export const extendColorScheme = (colorScheme, overrides) => {
  let result = colorScheme;
  Object.keys(overrides).forEach((color) => {
    result = {
      ...result,
      [color]: {
        ...colorScheme[color],
        ...overrides[color],
      },
    };
  });
  return result;
};

export const pickValuesFromColorScheme = (colorScheme, componentAreas) => {
  let result = {};
  Object.keys(colorScheme).forEach((color) => {
    const colorValues = componentAreas.reduce((accumulator, area) => {
      return {
        ...accumulator,
        [area]: colorScheme[color][area],
      };
    }, {});
    result = {
      ...result,
      [color]: colorValues,
    };
  });
  return result;
};
