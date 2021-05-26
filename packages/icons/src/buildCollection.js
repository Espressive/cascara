/**
 * This is an advanced example for creating icon bundles for Iconify SVG Framework.
 * It creates a bundle from all SVG files in a directory.
 *
 * This example uses Iconify Tools to convert icons to Iconify JSON format.
 * For Iconify Tools documentation visit https://docs.iconify.design/tools/node/
 */
const fs = require('fs');
const path = require('path');

// Installation: npm install --save-dev @iconify/tools
const tools = require('@iconify/tools');

// SVG files location
const source = path.resolve(__dirname, 'svg');

// Prefix to use for custom icons
const prefix = 'esp';

const snakeToCamel = (str) =>
  str.replace(/([-_]\w)/g, (g) => g[1].toUpperCase());

// Import icons
let collection;
tools
  .ImportDir(source, {
    prefix,
  })
  .then((result) => {
    collection = result;

    // Set prefix
    collection.prefix = prefix;

    // Options for SVGO optimization
    const SVGOOptions = {
      convertShapeToPath: true,
      mergePaths: true,
    };

    // Optimize SVG files
    //
    // collection.promiseEach() iterates all icons in collection and runs
    // promise for each icon, one at a time.
    return collection.promiseEach(
      (svg, key) =>
        new Promise((fulfill, reject) => {
          tools
            .SVGO(svg, SVGOOptions)
            .then((res) => {
              fulfill(res);
            })
            .catch((err) => {
              reject(`Error optimizing icon ${key}\n${err}`);
            });
        }),
      true
    );
  })
  .then(() => {
    // Clean up tags
    return collection.promiseEach(
      (svg, key) =>
        new Promise((fulfill, reject) => {
          tools
            .Tags(svg)
            .then((res) => {
              fulfill(res);
            })
            .catch((err) => {
              reject(`Error checking tags in icon ${key}\n${err}`);
            });
        }),
      true
    );
  })
  .then(() => {
    // Change color to "currentColor" to all icons
    // Use this only for monotone collections
    const options = {
      add: 'currentColor', // add "currentColor" to shapes that are missing color value
      default: 'currentColor', // change all colors to "currentColor"
    };

    //
    // // For icons that have palette use this instead:
    // const options = {
    // add: 'currentColor',
    // };
    //

    return collection.promiseEach(
      (svg) => tools.ChangePalette(svg, options),
      true
    );
  })
  .then(() => {
    const collectionNames = [];

    collection.forEach((svg, name) => {
      collectionNames.push(name);

      const iconFile = `var data = {body: '${svg.getBody()}', height: ${
        svg.height
      }, width: ${svg.width}};\nmodule.exports = data`;

      fs.writeFileSync(`${name}.js`, iconFile);
    });

    const indexFileImportSection = collectionNames
      .sort()
      .map(
        (iconName) =>
          `const ${snakeToCamel(iconName)}Icon = require ('./${iconName}');`
      )
      .join('\n');

    const indexFileExportSection = `module.exports = {
        ${collectionNames
          .sort()
          .map((iconName) => ` ${snakeToCamel(iconName)}Icon,`)
          .join('\n')}`;

    fs.writeFileSync(
      'index.js',
      `${indexFileImportSection}\n${indexFileExportSection}};`
    );
  })
  .catch((err) => {
    console.error(err);
  });
