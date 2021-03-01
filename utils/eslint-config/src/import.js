// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  rules: {
    'import/exports-last': 2,
    'import/extensions': 2,
    'import/no-duplicates': 2,
    'import/no-namespace': 2,
  },
};
