module.exports = {
  overrides: [
    {
      files: '*.fixture.js',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: '*.config.js',
      rules: {
        'sort-keys': 'off',
      },
    },
  ],
  rules: {
    'consistent-return': 'error',
    eqeqeq: 'error',
    'multiline-comment-style': ['error', 'starred-block'],
    'no-alert': 'error',
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-implicit-coercion': 'error',
    'no-undef-init': 'error',
    'no-use-before-define': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-destructuring': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true,
      },
    ],
    'sort-keys': 'error',
    'sort-vars': 'error',
    strict: ['error', 'never'],
    'vars-on-top': 'error',
    yoda: 'error',
  },
};
