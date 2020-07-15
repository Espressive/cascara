const path = require('path');
const fs = require('fs');

// NOTE: This custom file is for running Cosmos with npx as a binary in conjunction
// with react-scripts from the root of a monorepo that uses Yarn workspaces.

// We need to use similar functionality to make sure our modules resolve correctly
// the same way react-scripts does this in their paths.js file for CRA
// https://github.com/facebook/create-react-app/blob/2da5517689b7510ff8d8b0148ce372782cb285d7/packages/react-scripts/config/paths.js#L15
const appDirectory = fs.realpathSync(process.cwd());

// Make sure we are using the package level config for consistency
const cosmosConfig = require(appDirectory + '/cosmos.config.json');

module.exports = (webpackConfig, env, whatev) => {
  // Set the html template file to be the one defined in the cosmos staticPath
  // We need to use `path()` here so we can get the relative location for the index.html
  webpackConfig.plugins[0].options.template = path.resolve(
    appDirectory,
    cosmosConfig.staticPath + '/index.html'
  );

  return { ...webpackConfig };
};
