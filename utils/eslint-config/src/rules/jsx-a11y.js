// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/jsx-eslint/eslint-plugin-jsx-a11y

module.exports = {
  extends: 'plugin:jsx-a11y/strict',
  plugins: ['jsx-a11y'],
  rules: {
    // Disabling this rule which has been deprecated but is still in the strict set for some reason
    'jsx-a11y/label-has-for': 0,
  },
};
