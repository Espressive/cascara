// const formatCSSVarsToSCSS = require('./formatCSSVarsToSCSS');
// const formatTokens = require('./formatTokens');

module.exports = {
  // format: {
  //   formatCSSVarsToSCSS,
  //   formatTokens,
  // },
  platforms: {
    css: {
      buildPath: 'dist/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
        {
          destination: 'tokens.json',
          format: 'json/nested',
        },
        {
          destination: '_variables.scss',
          format: 'scss/variables',
        },
      ],
      options: {
        outputReferences: true,
      },
      transformGroup: 'css',
    },
    // scss: {
    //   buildPath: 'dist/',
    //   files: [
    //     {
    //       destination: '_variables.scss',
    //       format: 'scss/variables',
    //       mapName: 'cascara',
    //     },
    //   ],
    //   transformGroup: 'scss',
    // },
    // sketch: {
    //   buildPath: 'dist/',
    //   files: [
    //     {
    //       destination: 'cascara.sketchpalette',
    //       format: 'sketch/palette/v2',
    //     },
    //   ],
    //   transforms: ['color/sketch'],
    // },
  },
  source: ['src/**/*.json'],
};
