const formatCSS = require('./formatCSS');
const formatTokens = require('./formatTokens');

module.exports = {
  format: {
    formatCSS,
    formatTokens,
  },
  platforms: {
    css: {
      buildPath: 'dist/',
      files: [
        {
          destination: '_variables.scss',
          format: 'formatCSS',
        },
        {
          destination: 'tokens.json',
          format: 'formatTokens',
        },
      ],
      options: {
        outputReferences: true,
        showFileHeader: true,
      },
      transformGroup: 'scss',
    },
  },
  source: ['src/**/*.json'],
};
