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
    'prettier', // This has to be last so it can override any conflicting rules in previous rulesets
  ],
  ignorePatterns: [
    '/build', // do not lint any code in a package root build directory
    '/dist', // do not lint any code in a package root dist directory
  ],
  overrides: [], // Do not define overrides here. Instead define them in their respective plugin ruleset
  plugins: [
    'only-error', // This plugin will change all warnings into errors
  ],
};
