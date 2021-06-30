const StyleDictionary = require('style-dictionary');

const { fileHeader } = StyleDictionary.formatHelpers;

module.exports = (options) => {
  // console.log(process.env.npm_config_registry);

  return options.showFileHeader
    ? `// ${process.env.npm_package_name} v${
        process.env.npm_package_version
      }${fileHeader(options.showFileHeader, 'short')}`
    : '';
};
