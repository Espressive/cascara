// NOTE: This file is for the v4 version of react-scripts

const path = require('path');
const cosmosConfig = require('./config.json');

module.exports = (webpackConfig, env) => {
  // Set the html template file to be the one defined in the cosmos staticPath
  webpackConfig.plugins[0].options.template = path.resolve(
    cosmosConfig.staticPath,
    'index.html'
  );

  // Override the options that are telling webpack to not look for a babelrc
  // config at the root. This is to make sure we process all of our files
  webpackConfig.module.rules[1].oneOf[3].options.babelrc = true;
  webpackConfig.module.rules[1].oneOf[3].options.configFile = true;

  // Rules index 4-7 are all for styles. The last two use resolve-url-loader which
  // needs to have the root defined relative to the workspace assets. Setting 'root'
  // to empty allows sass to resolve the file assets as it normally would for development
  webpackConfig.module.rules[1].oneOf[7].use[3].options.root = '';
  webpackConfig.module.rules[1].oneOf[6].use[3].options.root = '';

  return { ...webpackConfig };
};
