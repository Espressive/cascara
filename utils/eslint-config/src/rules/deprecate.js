// For brevity, we start with the recomended defaults and extend with our own rules.
// Please make sure we are looking at any rules in the recommended set before adding
// them below. If we are overriding a recommended rule, we should make a comment for
// each rule.
//
// https://github.com/AlexMost/eslint-plugin-deprecate

module.exports = {
  plugins: ['deprecate'],
  rules: {
    'deprecate/import': [
      'error',
      {
        name: 'memobind',
        use: 'the eslint doc suggestions to correctly resolve',
      },
      { name: 'fela', use: 'CSS Modules' },
    ],
  },
};
