const { cosmos, tests } = require('../utils/filePaths');

// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/yannickcr/eslint-plugin-react

module.exports = {
  extends: ['plugin:react/recommended'],
  overrides: [
    {
      files: cosmos,
      rules: {
        // Fixtures are not about optimizing and we should allow binding in a
        // fixture for a quick POC
        'react/jsx-no-bind': 'off',
        // For a fixture we may need to define multiple components in a file frequently.
        'react/no-multi-comp': 'off',
        // Fixtures are supposed to be for development work. We should
        // not enforce definitions of prop types on fixtures.
        'react/prop-types': 'off',
        // Export keys on multi export fixtures show up in the Cosmos UI.
        // We do not necessarily always want these to show up in
        // alphabetical order.
        'sort-keys': 0,
      },
    },
    {
      files: tests,
      rules: {
        'react/no-multi-comp': 'off',
        'react/prop-types': 'off',
      },
    },
  ],
  rules: {
    'react/boolean-prop-naming': 'error',
    'react/button-has-type': 'error',
    'react/default-props-match-prop-types': 'error',
    'react/destructuring-assignment': 'error',
    'react/forbid-foreign-prop-types': 'error',
    'react/forbid-prop-types': 'error',
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-boolean-value': 'error',
    'react/jsx-fragments': 'error',
    'react/jsx-key': 'error',
    'react/jsx-no-bind': 'error',
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-default-props': 'error',
    'react/jsx-sort-props': 'error',
    'react/no-access-state-in-setstate': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-multi-comp': [
      'error',
      {
        ignoreStateless: true,
      },
    ],
    'react/no-render-return-value': 'error',
    'react/no-string-refs': 'error',
    'react/no-this-in-sfc': 'error',
    'react/no-typos': 'error',
    'react/no-unused-prop-types': 'error',
    'react/no-unused-state': 'error',
    'react/prefer-stateless-function': 'error',
    'react/require-render-return': 'error',
    'react/self-closing-comp': 'error',
    'react/sort-prop-types': 'error',
    'react/style-prop-object': 'error',
  },
};
