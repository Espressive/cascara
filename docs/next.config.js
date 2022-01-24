// const withTM = require('next-transpile-modules')([
//   '@espressive/cascara',
//   '@espressive/icons',
// ]);
const currentGitBranch = require('current-git-branch');

module.exports = {
  env: {
    GIT_BRANCH: currentGitBranch(),
  },
  poweredByHeader: false,
  // reactStrictMode: true,
  target: 'serverless',
};
