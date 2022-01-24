const currentGitBranch = require('current-git-branch');

module.exports = {
  env: {
    GIT_BRANCH: currentGitBranch(),
  },
  poweredByHeader: false,
};
