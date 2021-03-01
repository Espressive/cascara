// https://github.com/bkucera/eslint-plugin-json-format

module.exports = {
  overrides: [
    {
      files: ['package.json'],
      settings: {
        'json/sort-package-json': 'standard',
      },
    },
  ],
  plugins: ['json-format'],
};
