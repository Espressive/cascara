/*
 * "off" or 0 - turn the rule off
 * "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
 * "error" or 2 - turn the rule on as an error (exit code will be 1)
 */

module.exports = {
  env: { 'jest/globals': true },
  plugins: ['jest'],
  rules: {
    'jest/consistent-test-it': [2, { fn: 'test' }],
    'jest/lowercase-name': [2, { ignoreTopLevelDescribe: true }],
    'jest/no-commented-out-tests': 2,
    'jest/no-deprecated-functions': 2,
    'jest/no-disabled-tests': 2,
    'jest/no-focused-tests': 1,
    'jest/no-identical-title': 2,
    'jest/no-jasmine-globals': 2,
    'jest/no-jest-import': 2,
    'jest/no-large-snapshots': 2,
    'jest/prefer-to-be-null': 2,
    'jest/prefer-to-be-undefined': 2,
    'jest/prefer-to-have-length': 2,
    'jest/prefer-todo': 2,
    'jest/require-top-level-describe': 2,
    'jest/valid-describe': 2,
    'jest/valid-expect': 2,
    'jest/valid-expect-in-promise': 2,
  },
};
