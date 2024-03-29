const devOnly = require('../utils/devOnly');
const { cosmos, tests, tooling } = require('../utils/filePaths');

// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://eslint.org/docs/rules/

module.exports = {
  extends: ['eslint:recommended'],
  overrides: [
    {
      files: cosmos,
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
      },
    },
    {
      files: tests,
      rules: {
        'no-alert': 'off',
        'no-console': 'off',
      },
    },
    {
      files: tooling,
      rules: {
        'no-console': 'off',
      },
    },
  ],
  rules: {
    'consistent-return': 'error',
    eqeqeq: 'error',
    'multiline-comment-style': ['error', 'separate-lines'],
    'no-alert': 'error',
    'no-console': devOnly,
    'no-duplicate-imports': 'error',
    'no-implicit-coercion': 'error',
    'no-undef-init': 'error',
    'no-unused-vars': 'error',
    'no-use-before-define': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'sort-keys': 'error',
    'sort-vars': 'error',
    strict: ['error', 'never'],
    'vars-on-top': 'error',
    yoda: 'error',
  },
};
