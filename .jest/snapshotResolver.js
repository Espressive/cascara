// Jest uses these functions to resolve snapshot test file paths.

const resolveSnapshotPath = (testPath, snapshotExtension) =>
  testPath.replace('.js', snapshotExtension);

const resolveTestPath = (snapshotFilePath, snapshotExtension) =>
  snapshotFilePath.replace(snapshotExtension, '.js');

module.exports = {
  resolveSnapshotPath,
  resolveTestPath,

  // Used by Jest to check the above functions for consistency
  testPathForConsistencyCheck: 'component/example.test.js',
};
