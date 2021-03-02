// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  extends: [
    'react-app',
    './rules/base',
    './rules/deprecate',
    './rules/eslint-comments',
    './rules/hooks',
    './rules/import',
    './rules/jest',
    './rules/json-format',
    './rules/jsx-a11y',
    './rules/react',
  ],
  overrides: [
    {
      files: ['**/*.fixture.js', '**/*.decorator.js'],
      rules: {
        'import/no-anonymous-default-export': 0,
        'no-alert': 0,
        'no-console': 0,
      },
    },
  ],
};
