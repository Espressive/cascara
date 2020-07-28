import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import stringHash from 'string-hash';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'es/index.js',
      format: 'es',
    },
  ],
  // These are any exernal modules that we do not want to include in our builds. If we include
  // a module in this list, it should also be declared as a peer depenency for our package. In
  // the future we need to have a way to easily check these definitions for our overall library.
  // This might be another reason that it is good to move this configuration to the root level
  // for overall consistency.
  external: ['react', 'prop-types', 'classnames/bind'],
  // Adding this onwarn config to throw an error and fail if we have any warnings so we do not
  // have anything unresolved we do not see.
  // onwarn: (warning) => {
  //   throw new Error(warning.message);
  // },
  plugins: [
    postcss({
      // extract: 'styles.css',
      sourceMap: true,
      minimize: true,
      modules: {
        generateScopedName: function (name, filename, css) {
          const path = require('path');
          const file = path.basename(filename, '.css').replace('.module', '');
          const hash = stringHash(css).toString(36).substr(0, 5);

          return file + '_' + name + '__' + hash;
        },
        // generateScopedName: '[name]__[local]___[hash:5]'
      },
      use: ['sass'],
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: ['espressive'],
      plugins: ['@babel/plugin-transform-runtime'],
    }),
  ],
};
