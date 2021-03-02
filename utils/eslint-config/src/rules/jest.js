// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/jest-community/eslint-plugin-jest

module.exports = {
  env: { 'jest/globals': true },
  extends: ['plugin:jest/recommended'],
  plugins: ['jest'],
  rules: {
    'jest/consistent-test-it': ['error', { fn: 'test' }],
    'jest/lowercase-name': ['error', { ignoreTopLevelDescribe: true }],
    'jest/no-commented-out-tests': 'error',
    'jest/no-deprecated-functions': 'error',
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 1,
    'jest/no-identical-title': 'error',
    'jest/no-jasmine-globals': 'error',
    'jest/no-jest-import': 'error',
    'jest/no-large-snapshots': 'error',
    'jest/prefer-to-be-null': 'error',
    'jest/prefer-to-be-undefined': 'error',
    'jest/prefer-to-have-length': 'error',
    'jest/prefer-todo': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/valid-describe': 'error',
    'jest/valid-expect': 'error',
    'jest/valid-expect-in-promise': 'error',
  },
};
