// We should almost definitely not be adding rules here. Instead, we should be modifying rules in our eslint-config-espressive package

module.exports = {
  extends: ['@espressive', 'prettier'], // prettier must be last so we override any rules that potentially conflict with Prettier
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
};
