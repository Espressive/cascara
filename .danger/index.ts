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

// No PR is too small to include a description of why you made a change
if (github.description.length < 10) {
  warn('Please include a description of your PR changes.');
}

// Check that someone has been assigned to this PR
if (github.assignee === null && !isSnyk) {
  warn(
    'Please assign someone to merge this PR, and optionally include people who should review.'
  );
}

// Check if we are modifying any Cosmos fixtures
if (changed.fixtures) {
  for (let file of changed.fixtures) {
    message(`**${file}**: This fixture has been changed.`, file);
  }
}

// Check if we are updating or adding any package dependencies
if (changed.packages && !isSnyk) {
  for (let file of changed.packages) {
    fail(
      `Please add a '${descSection.dependencies}' section to explain the reason we are changing dependencies.`
    );
  }
}

// Check if we are modifying any Jest snapshots
if (changed.snapshots) {
  for (let file of changed.snapshots) {
    fail(
      `Please add a '${descSection.snapshots}' section to explain the reason we are changing snapshots.`
    );
  }
}
