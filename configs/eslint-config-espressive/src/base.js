// "off" or 0 - turn the rule off
// "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
// "error" or 2 - turn the rule on as an error (exit code will be 1)

module.exports = {
  rules: { 'no-console': 2, 'no-unused-vars': 2 },
  overrides: [
    {
      // Override some rules for fixtures
      files: '*.fixture.js',
      rules: {
        'no-console': 0,
      },
    },
  ],
};
