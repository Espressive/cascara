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
const getRollupConfig = ({ pwd, babelConfigFile, isModule }) => {
  const SOURCE_DIR = path.resolve(pwd);
  const PRIVATE_PATH = `${SOURCE_DIR}/src/private.js`;

  // Get the package.json file
  const pkgConfig = require(`${SOURCE_DIR}/package.json`);

  // Relative input location for Rollup to bundle from
  const input = [`${SOURCE_DIR}/src/index.js`];

  // Not all packages have private exports
  if (fs.existsSync(PRIVATE_PATH)) {
    input.push(PRIVATE_PATH);
  }

  // Shared Rollup plugins for code-only packages
  const rollupPlugins = [nodeResolve(), postcss(getPostCSSOptions()), json()];

  // Gather info about the package
  const IS_CJS = Boolean(pkgConfig?.main);
  const IS_ESM = Boolean(pkgConfig?.module);
  const TYPE = pkgConfig?.type;

  // check if only ESM is part of the output
  const ESM_ONLY = IS_CJS && !IS_ESM && TYPE === 'module';

  // separate out our bundle into chunks based on section for now
  // const manualChunks = (id) => {
  //   const CHUNK_SECTIONS = [
  //     'layouts',
  //     'placeholders',
  //     'private',
  //     'structures',
  //     'ui',
  //   ];
  //   for (const segment of CHUNK_SECTIONS) {
  //     if (id.startsWith(`${SOURCE_DIR}/src/${segment}`)) {
  //       return segment;
  //     }
  //   }
  //   if (id.includes('node_modules')) {
  //     return 'vendor';
  //   }
  //   return undefined;
  // };

  // Common JS configuration
  const cjsConfig = {
    external,
    input,
    output: {
      dir: `${SOURCE_DIR}/dist/cjs`,
      exports: 'auto',
      format: 'cjs',
      // manualChunks,
      sourcemap: true,
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

  // Modules configuration
  const esConfig = {
    external,
    input,
    output: {
      dir: `${SOURCE_DIR}/dist/es`,
      exports: 'auto',
      format: 'es',
      // manualChunks,
      sourcemap: true,
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
    return ESM_ONLY ? [esConfig] : [cjsConfig, esConfig];
  }

  return ESM_ONLY ? [esConfig] : [cjsConfig, esConfig];
};

export default getRollupConfig;
