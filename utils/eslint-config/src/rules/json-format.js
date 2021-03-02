// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
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
