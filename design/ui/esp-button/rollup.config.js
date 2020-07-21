import babel from '@rollup/plugin-babel';
import postcss from 'rollup-plugin-postcss';
import stringHash from 'string-hash';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs'
    },
    {
      file: 'es/index.js',
      format: 'es'
    }
  ],
  plugins: [
    postcss({
      extract: 'styles.css',
      sourceMap: true,
      minimize: true,
      modules: {
        generateScopedName: function(name, filename, css) {
          const path = require('path');
          const file = path.basename(filename, '.css').replace('.module', '');
          const hash = stringHash(css)
            .toString(36)
            .substr(0, 5);

          return file + '_' + name + '__' + hash;
        }
        // generateScopedName: '[name]__[local]___[hash:5]'
      },
      use: ['sass']
    }),
    babel({
      babelrc: false,
      babelHelpers: 'runtime',
      presets: ['react-app'],
      plugins: ['@babel/plugin-transform-runtime']
    })
  ]
};
