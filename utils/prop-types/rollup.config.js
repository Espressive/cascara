/**
 * This is custom because the root config breaks on this path.
 * Since we are not exporting any JSX nor SCSS, we don't need extra plugins.
 */
const rollupConfig = {
  external: ['prop-types'],
  input: 'src/index.js',
  output: [
    {
      file: 'dist/cjs/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/es/index.js',
      format: 'es',
    },
  ],
};

export default rollupConfig;
