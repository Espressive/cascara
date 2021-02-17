import { danger } from 'danger';

// Alert that snapshot files have been changed
export const snapshots = () => {
  if (danger.git.modified_files.length > 1) {
    const files = danger.git.modified_files.map((file) => console.log(file));
  }
};
