import fs from 'fs';
import path from 'path';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import stringHash from 'string-hash';
import cssUrl from 'postcss-url';

const isDevelopment = process.env.NODE_ENV === 'development';

// Move our babel config into the root but use it to compile all of our packages
const getBabelOptions = ({
  // This path has to be relative to our packages
  babelConfigFile = '../../babel.config.js',
  useESModules,
}) => ({
  babelHelpers: 'runtime',
  configFile: babelConfigFile,
  exclude: '**/node_modules/**',
  plugins: [['@babel/plugin-transform-runtime', { useESModules }]],
});

// Also making this a function since we may need to move some of the PostCSS config to the package root to be used in Cosmos or Doc tooling.
const getPostCSSOptions = () => ({
  // extract: 'styles.css',
  minimize: true,
  modules: {
    generateScopedName: function (name, filename, css) {
      const path = require('path');
      const [file] = path.basename(filename).split('.');
      const hash = isDevelopment
        ? 'DEV_MODE'
        : stringHash(css).toString(36).substr(0, 5);

      return `☕️_${file}_${name}__${hash}`;
    },
  },
  plugins: [cssUrl({ url: 'inline' })],
  sourceMap: true,
  use: [
    'sass',
    // [
    //   'sass',
    //   {
    //     // includePaths: [path.resolve('../../node_modules/@espressive/')],
    //     importer: [
    //       (url, prev, done) => {
    //         // Convert `@use "foo/bar"` to "node_modules/foo/sass/bar".
    //         const components = url.split('/');
    //         const file = path.resolve('../../node_modules/', ...components);

    //         // console.log(file);
    //         done({
    //           // file: `node_modules/${components.first}/sass/${innerPath}`,
    //           file,
    //         });
    //       },
    //     ],
    //   },
    // ],
  ],
});

const external = (id) =>
  !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');

// Pragmatically create a Rollup config for each package
const getRollupConfig = ({ pwd, babelConfigFile }) => {
  const SOURCE_DIR = path.resolve(pwd);
  const PRIVATE_PATH = `${SOURCE_DIR}/src/private.js`;

  // Get the package.json file
  const pkgConfig = require(`${SOURCE_DIR}/package.json`);

  // Relative input location for Rollup to bundle from
  const input = [`${SOURCE_DIR}/src/index.js`];

  // If we have a private export, add it to our list of inputs
  if (fs.existsSync(PRIVATE_PATH)) {
    input.push(PRIVATE_PATH);
  }

  // Shared Rollup plugins
  const rollupPlugins = [nodeResolve(), postcss(getPostCSSOptions()), json()];

  // separate out our bundle into chunks based on section for now
  const manualChunks = (id) => {
    const CHUNK_SECTIONS = fs
      // Check our source directory
      .readdirSync(`${SOURCE_DIR}/src`, {
        withFileTypes: true,
      })
      // Remove anything except directories https://nodejs.org/api/fs.html#class-fsdirent
      .filter((dirent) => dirent.isDirectory())
      // Get anything in these directories and use a flat map to merge all returned
      // arrays to a single array. This is not recursive, so depth from src is only 2.
      .flatMap(({ name: subDir }) => {
        const filePath = path.join(SOURCE_DIR, 'src', subDir);
        return (
          fs
            // Get the file types again
            .readdirSync(filePath, {
              withFileTypes: true,
            })
            // Filter directories again
            .filter(
              (dirent) =>
                dirent.isDirectory() &&
                // Check to make sure the first character is uppercase
                dirent.name.charAt(0) === dirent.name.charAt(0).toUpperCase()
            )
            // Return the subdir and name for the segment chunk
            .map(({ name }) => `${subDir}/${name}`)
        );
      });

    for (const segment of CHUNK_SECTIONS) {
      if (id.startsWith(`${SOURCE_DIR}/src/${segment}`)) {
        return segment;
      }
    }
    if (id.includes('node_modules')) {
      return 'vendor';
    }
    return undefined;
  };

  // Common JS configuration
  const cjsConfig = {
    external,
    input,
    output: {
      // We use the directory defined in the package.json to determine the output location
      // instead of hard coding a path to output our files.
      dir: `${SOURCE_DIR}/${pkgConfig.main.replace('/index.js', '')}`,
      // Even though the default for `export` here is 'auto' we for some reason need to explicitly define it for cjs with a default vs named export
      exports: 'auto',
      format: 'cjs',
      manualChunks,
      sourcemap: true,
      sourcemapExcludeSources: true,
      validate: true,
    },
    plugins: [
      babel(
        getBabelOptions({
          babelConfigFile,
          useESModules: false,
        })
      ),
      ...rollupPlugins,
    ],
  };

  const pkgConfigModule = pkgConfig ? pkgConfig.module || '' : '';

  // Modules configuration
  const esConfig = {
    external,
    input,
    output: {
      // We use the directory defined in the package.json to determine the output location
      // instead of hard coding a path to output our files.
      dir: `${SOURCE_DIR}/${pkgConfigModule.replace('/index.js', '')}`,
      format: 'es',
      manualChunks,
      sourcemap: true,
      sourcemapExcludeSources: true,
      validate: true,
    },
    plugins: [
      babel(
        getBabelOptions({
          babelConfigFile,
          useESModules: true,
        })
      ),
      ...rollupPlugins,
    ],
  };

  if (process.env.WATCH_MODE) {
    return [cjsConfig, esConfig];
  }

  return [cjsConfig, esConfig];
};

export default getRollupConfig;
