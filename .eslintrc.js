// We should almost definitely not be adding rules here. Instead, we should be modifying rules in our eslint-config-espressive package

module.exports = {
  extends: '@espressive',
  overrides: [
    {
      files: ['**/next-*/**/*', 'docs/**/*'],
      rules: {
        'jsx-a11y/anchor-is-valid': 0,
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
  root: true,
  rules: {
    // TODO: Remove each of these disabled rules and resolve the lint errors in separate PRs for each.
    'import/named': 0,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,
    'import/no-unresolved': 0,
    'jest/no-done-callback': 0,
    'no-prototype-builtins': 0,
    'react/button-has-type': 0,
    'react/display-name': 0,
    'react/forbid-prop-types': 0,
    'react/function-component-definition': 0,
    'react/jsx-key': 0,
    'react/jsx-no-bind': 0,
    'react/prop-types': 0,
  },
};
