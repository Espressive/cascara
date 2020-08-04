// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  extends: [
    'eslint-config-react-app',
    './src/base',
    './src/hooks',
    './src/import',
    './src/jest',
    './src/jsx-a11y',
    './src/react',
  ].map(require.resolve),
};
