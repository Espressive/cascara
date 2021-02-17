import { danger, warn, message } from 'danger';

const modifiedFiles = danger.git.modified_files;
const newFiles = danger.git.created_files;
const changedFiles = [...modifiedFiles, ...newFiles];

const changedPackages = changedFiles.filter((file) =>
  file.includes('package.json')
);

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

// Check if a package.json file has been modified anywhere
if (changedPackages) {
  for (let file of changedPackages) {
    warn(
      `**${file}**: Please provide a reason that we are making changes to package dependencies`
    );
  }
}
