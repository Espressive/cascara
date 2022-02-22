import { danger, warn, fail, message } from 'danger';

// Git specific values
const modifiedFiles = danger.git.modified_files;
const newFiles = danger.git.created_files;
const changedFiles = [...modifiedFiles, ...newFiles];

// Github specific values
const github = {
  assignee: danger.github.pr.assignee,
  description: danger.github.pr.body,
  title: danger.github.pr.title,
};

// Changed file evaluations
const changed = {
  fixtures: modifiedFiles.filter((file) => file.includes('fixture.js')),
  packages: changedFiles.filter((file) => file.includes('package.json')),
  snapshots: modifiedFiles.filter((file) => file.includes('test.snap')),
};

// PR description sections
const descSection = {
  dependencies: '### Dependencies',
  snapshots: '### Snapshots',
};

const isSnyk =
  github.title.includes('fix(Snyk)') || github.title.includes('[Snyk]');

const currentBranch = danger.github.pr.head.ref;
const targetBranch = danger.github.pr.base.ref;

const isCurrentDevelopOrMain = ['main', 'develop'].includes(currentBranch);
const isTargetBranchDevelopOrMain = ['main', 'develop'].includes(targetBranch);

// validate if the current and target branch are specifically main or develop
const isCurrentDevelop = currentBranch === 'develop';
const isTargetBranchMain = targetBranch === 'main';

// [FDS-444]: identify release branches and PRs
const isCurrentAReleaseBranch = currentBranch.search(/^release/) !== -1;
const isReleasePR = isCurrentAReleaseBranch && isTargetBranchMain;

const shouldDangerCheckPR =
  !isCurrentDevelopOrMain && !isTargetBranchDevelopOrMain;

const isDevelopComparedToMain = isCurrentDevelop && isTargetBranchMain;

// skip danger if current and target branch is main or develop
if (shouldDangerCheckPR) {
  message(
    `Dangerfile.js does not run when the current branch is ${currentBranch}`
  );
}

// fail danger if the current branch is develop intented to be merged to main
if (isDevelopComparedToMain) {
  fail(
    'Do not target main directly from develop. A separate release branch is needed'
  );
}
// Evaluates the description to see if it contains a particular section
const hasDescriptionSection = (section: keyof typeof descSection) =>
  github.description.includes(descSection[section]);

// No PR is too small to include a description of why you made a change
if (github.description.length < 10) {
  warn('Please include a description of your PR changes.');
}

// Check that someone has been assigned to this PR
if (github.assignee === null && !isSnyk && shouldDangerCheckPR) {
  warn(
    'Please assign someone to merge this PR, and optionally include people who should review.'
  );
}

// Check if we are modifying any Cosmos fixtures
if (changed.fixtures && shouldDangerCheckPR) {
  for (let file of changed.fixtures) {
    message(`**${file}**: This fixture has been changed.`, file);
  }
}

// Check if we are updating or adding any package dependencies
if (
  changed.packages &&
  !hasDescriptionSection('dependencies') &&
  !isSnyk &&
  shouldDangerCheckPR &&
  !isReleasePR
) {
  for (let file of changed.packages) {
    fail(
      `Please add a '${descSection.dependencies}' section to explain the reason we are changing dependencies.`
    );
  }
}

// Check if we are modifying any Jest snapshots
if (
  changed.snapshots &&
  !hasDescriptionSection('snapshots') &&
  shouldDangerCheckPR &&
  !isReleasePR
) {
  for (let file of changed.snapshots) {
    fail(
      `Please add a '${descSection.snapshots}' section to explain the reason we are changing snapshots.`
    );
  }
}
