import { danger, message } from 'danger';

export const modified = () => {
  // No PR is too small to include a description of why you made a change
  if (danger.git.modified_files.length > 1) {
    message('You have modified more than one file');
  }
};
