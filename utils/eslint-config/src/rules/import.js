const { cosmos } = require('../utils/filePaths');

// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/benmosher/eslint-plugin-import

module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:import/electron',
    'plugin:import/react',
  ],
  overrides: [
    {
      files: cosmos,
      rules: {
        // We need to be able to do this for multi-fixture files
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
  rules: {
    'import/exports-last': 'error',
    'import/extensions': 'error',
    'import/no-namespace': 'error',
  },
};
