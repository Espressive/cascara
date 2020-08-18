const path = require('path');
const fs = require('fs');
const glob = require('glob');
const workspaces = require('../package.json').workspaces;
const cosmosConfig = require('./config.json');

// NOTE: This custom file is for running Cosmos with npx as a binary in conjunction
// with react-scripts from the root of a monorepo that uses Yarn workspaces.

// We need to use similar functionality to make sure our modules resolve correctly
// the same way react-scripts does this in their paths.js file for CRA
// https://github.com/facebook/create-react-app/blob/2da5517689b7510ff8d8b0148ce372782cb285d7/packages/react-scripts/config/paths.js#L15
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = (webpackConfig, env, whatev) => {
  // react-scripts defines a single appSrc to be processed in their rules. This is fine
  // for almost all of our use cases... except for JS where we need Babel to process our
  // code the same way as it does in a CRA project. So we need to extend the rule to look
  // not just in a /src folder at the root, but actually all "src" folders in our project.
  // This might be something we need to evaluate for other loader rules as well.

  // NOTE: react-scripts goes through a lot of trouble to make sure you are not importing code from
  // outside of a /src folder
  // https://github.com/facebook/create-react-app/blob/2da5517689b7510ff8d8b0148ce372782cb285d7/packages/react-scripts/config/webpack.config.js#L331

  // NOTE: here is the rule in the react-scripts webpack.config that defines the Babel processing:
  // https://github.com/facebook/create-react-app/blob/2da5517689b7510ff8d8b0148ce372782cb285d7/packages/react-scripts/config/webpack.config.js#L395

  // This function accepts a workspace definition
  const allSrc = (packages) => {
    // Start with an empty array
    let allPackages = [];

    // Look in all package definition folders first
    packages.forEach((pkg) => {
      const repoPacks = glob.sync(pkg);

      // Look at all packages in the folder
      repoPacks.forEach((repoPkg) => {
        // Use our full path resolution function to define the src folder for each
        const pkgSrc = resolveApp(repoPkg + '/src');
        // Add the folder to our array of src to process with Babel
        allPackages.push(pkgSrc);
      });
    });

    return allPackages;
  };

  // NOTE: This section below might need to be something we replace in the whole original webpack
  // config if there are other loaders that do not work as expected like images or fonts.

  // Set sass-loader to use dart-sass for faster compiling, and also to get `@use`
  const sassLoaderOptions = {
    sourceMap: true,
    // Prefer dart-sass (sass)
    implementation: require('sass'),
    sassOptions: {
      // This is where we might enable or disable fiber for dart-sass
      // https://webpack.js.org/loaders/sass-loader/#implementation
      fiber: false,
    },
  };

  // Set for regular SCSS
  webpackConfig.module.rules[2].oneOf[5].use[4].options = sassLoaderOptions;

  // Set for SCSS with CSS modules
  webpackConfig.module.rules[2].oneOf[6].use[4].options = sassLoaderOptions;

  // Change the babel preset this configuration is using. This extends the babel CRA preset.
  webpackConfig.module.rules[2].oneOf[1].options.presets = [
    require.resolve('@espressive/babel-preset-espressive'),
  ];

  // Change the original string for application appSrc to an array.
  webpackConfig.module.rules[2].oneOf[1].include = allSrc(workspaces.packages);

  // Set the html template file to be the one defined in the cosmos staticPath
  webpackConfig.plugins[0].options.template = resolveApp(
    cosmosConfig.staticPath + '/index.html'
  );

  return { ...webpackConfig };
};
