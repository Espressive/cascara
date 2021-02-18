import { danger, warn, message } from 'danger';

const modifiedFiles = danger.git.modified_files;
const newFiles = danger.git.created_files;
const changedFiles = [...modifiedFiles, ...newFiles];

const changed = {
  fixtures: modifiedFiles.filter((file) => file.includes('fixture.js')),
  packages: changedFiles.filter((file) => file.includes('package.json')),
  snapshots: modifiedFiles.filter((file) => file.includes('test.snap')),
};

// No PR is too small to include a description of why you made a change
if (danger.github.pr.body.length < 10) {
  warn('Please include a description of your PR changes.');
}

// Check that someone has been assigned to this PR
if (danger.github.pr.assignee === null) {
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
if (changed.packages) {
  for (let file of changed.packages) {
    warn(
      `**${file}**: Please provide a reason we are changing package dependencies.`,
      file
    );
  }
}

// Check if we are modifying any Jest snapshots
if (changed.snapshots) {
  for (let file of changed.snapshots) {
    warn(
      `**${file}**: Please provide a reason we are having to change test snapshots.`,
      file
    );
  }
}
