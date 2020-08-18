// We should almost definitely not be adding rules here. Instead, we should be modifying rules in our eslint-config-espressive package

module.exports = {
  extends: '@espressive/eslint-config-espressive',
  overrides: [
    {
      files: '**/next-*/**/*',
      rules: {
        'react/react-in-jsx-scope': 0,
      },
    },
  ],
  root: true,
};
