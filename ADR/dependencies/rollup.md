# Rollup

version: 2.67.3
Date: 2022-02-02

### Features

- Improve side effect detection when using Array.prototype.groupBy/groupByToMap (#4360)
- Allow changing moduleSideEffects at any time during the build (#4379)
- Soft-deprecate ModuleInfo.hasModuleSideEffects in favour of ModuleInfo.moduleSideEffects (#4379)

### Bug Fixes

Do not include queries and hashes in generated file names when preserving modules (#4374)

### Pull Requests

- #4319: refactor: use fs, fs-extra, remove sander (@dnalborczyk)
- #4360: feat: add Array.prototype.groupBy/groupByToMap (@dnalborczyk)
- #4361: fix: more types (@dnalborczyk)
- #4369: fix: remove acorn-walk patch (@dnalborczyk)
- #4371: refactor: use fs.promises in cli/run (@dnalborczyk)
- #4372: refactor: use fs.promises in module loader (@dnalborczyk)
- #4374: Ignore queries and hashes in file names when preserving modules (@lukastaegert)
- #4375: Fix typo in \_config.js (@eltociear)
- #4376: refactor: fs.promises, move mkdir to writeoutputfile, Part 3 (@dnalborczyk)
- #4379: Deprecate hasModuleSideEffects in favor of moduleSideEffects and ensure it is mutable on ModuleInfo (@lukastaegert)

### Ecosystem updates

- rollup: v2.50.6 -> v2.67.3
- @rollup/plugin-node-resolve: v11.2.1 -> v13.1.3
- rollup-plugin-postcss v2.50.6 -> v2.67.3
