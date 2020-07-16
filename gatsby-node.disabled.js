const path = require('path');
const glob = require('glob');
// This file gets moved inside of the .docz folder so paths should be relative
// to the .docz folder and not the repository location of this file.
const workspaces = require('../package.json').workspaces;

// We need to opt out of some component types having modules resolved (mainly apps).
const OPT_OUT_MODULES = ['apps/*'];

// Remove any of the above defined workspace packages from our array of glob
// definitions before we generate a list of module resolutions.
const filteredPackages = workspaces.packages.filter(
  (pkg) => !OPT_OUT_MODULES.includes(pkg)
);

exports.onCreateWebpackConfig = (args) => {
  console.warn('HERE WE GO!!!!!!!!!!!!!!!!!!!');
  console.warn(filteredPackages);

  // Start with at least the main node_modules folder
  let modulePaths = [path.resolve('../node_modules')];

  // Find all of the workspace pakcages based on package.json config
  filteredPackages.forEach((pkg) => {
    // Again... relative to the .docz folder
    const repoPacks = glob.sync('../' + pkg);

    // Get at all packages in the folders defined
    repoPacks.forEach((repoPkg) => {
      // Use path so we can get a full resolution to each folder
      const pkgModules = path.resolve(repoPkg + '/node_modules');

      // Add the folder to our array of src to process with Babel
      modulePaths.push(pkgModules);
    });
  });

  console.log(modulePaths);

  args.actions.setWebpackConfig({
    resolve: {
      modules: modulePaths,
    },
  });
};
