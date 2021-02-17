import { danger, warn } from 'danger';

// Alert that snapshot files have been changed
export const snapshots = () => {
  danger.git.modified_files.map((file) => console.log(file));
};
