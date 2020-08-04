// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

// As of today, the default rules coming from our extending of `react-scripts`
// defaults are what is recommended for hooks. We may end up wanting to set up
// some advanced rules to check our own custom hooks that have dependencies.
// https://github.com/facebook/react/tree/master/packages/eslint-plugin-react-hooks#advanced-configuration

module.exports = {};
