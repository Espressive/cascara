// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/mysticatea/eslint-plugin-eslint-comments

module.exports = {
  extends: ['plugin:eslint-comments/recommended'],
  rules: {
    'eslint-comments/no-unused-disable': 'error',
    'eslint-comments/require-description': [
      'error',
      { ignore: ['eslint-enable'] },
    ],
  },
};
