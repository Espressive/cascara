const StyleDictionary = require('style-dictionary');
const cascaraHeader = require('./cascaraHeader');

const { formattedVariables } = StyleDictionary.formatHelpers;

module.exports = ({ dictionary, options }) => {
  return `${cascaraHeader(options)}:root {\n${formattedVariables(
    'css',
    dictionary,
    options.outputReferences
  )}\n}\n`;
};
