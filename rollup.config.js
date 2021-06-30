import path from 'path';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import stringHash from 'string-hash';

const isDevelopment = (p) => p.env.NODE_ENV === 'development';

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
      const hash = isDevelopment(process)
        ? 'DEV_MODE'
        : stringHash(css).toString(36).substr(0, 5);

      return `☕️_${file}_${name}__${hash}`;
    },
  },
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

// NOTE: This last statement is bad. We should not include all of Nivo. That should be removed once
// app_web is updated to support es6 modules in Webpack builds.
const external = (id) => !id.startsWith('.') && !id.startsWith('/');

// Pragmatically create a Rollup config for each package
const getRollupConfig = ({ pwd, babelConfigFile }) => {
  const SOURCE_DIR = path.resolve(pwd);
  // Get the package.json file
  const pkgConfig = require(`${SOURCE_DIR}/package.json`);
  // Relative input location for Rollup to bundle from
  const input = [`${SOURCE_DIR}/src/index.js`, `${SOURCE_DIR}/src/private.js`];

  // Shared Rollup plugins
  const rollupPlugins = [nodeResolve(), postcss(getPostCSSOptions()), json()];

  // Common JS configuration
  const cjsConfig = {
    external,
    input,
    output: {
      dir: `${SOURCE_DIR}/${pkgConfig.main.replace('/index.js', '')}`,
      format: 'cjs',
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
      dir: `${SOURCE_DIR}/${pkgConfigModule.replace('/index.js', '')}`,
      format: 'es',
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
