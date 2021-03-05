const { fixtures } = require('../utils/filePaths');

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
      files: fixtures,
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
    // 'react/jsx-wrap-multilines': ['error', {
    //   "arrow": "parens-new-line",
    //   "assignment": "parens-new-line",
    //   "condition": "ignore",
    //   "declaration": "parens-new-line",
    //   "logical": "ignore",
    //   "prop": "ignore",
    //   "return": "parens-new-line",
    // }],
    'react/no-access-state-in-setstate': 'error',
    'react/no-children-prop': 'error',
    'react/no-danger': 'error',
    'react/no-find-dom-node': 'error',
    'react/no-multi-comp': 'error',
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
