const withTM = require('next-transpile-modules')([
  '@espressive/cascara',
  '@espressive/prop-types',
  '@espressive/icons',
]);
const currentGitBranch = require('current-git-branch');

module.exports = withTM({
  env: {
    GIT_BRANCH: currentGitBranch(),
  },
  poweredByHeader: false,
  // reactStrictMode: true,
  target: 'serverless',
});
