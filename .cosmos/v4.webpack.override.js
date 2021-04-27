// NOTE: This file is for the v4 version of react-scripts
const path = require('path');
const workspaces = require('../package.json').workspaces;
const cosmosConfig = require('./config.json');

module.exports = (webpackConfig, env) => {
  // Creates an array of workspace packages for us to look in.
  // Function accepts a workspace definition
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
  // needs to have the root defined relative to the workspace assets
  webpackConfig.module.rules[1].oneOf[7].use[3].options.root = '';
  webpackConfig.module.rules[1].oneOf[6].use[3].options.root = '';
  console.log(webpackConfig.module.rules[1].oneOf[7].use[3]);

  return { ...webpackConfig };
};
