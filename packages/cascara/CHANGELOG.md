# Change Log

## 3.0.2

### Patch Changes

- 08a1fd661: chore(FDS-389):[Docs]: Fix propTypes for Table
- be9fb6ac2: fix(FDS-517): [Stat] - unwanted icon is rendered in Stat component
- 004622250: feat/FDS(516): [Cascara] - revert table form and chat names to their originals
- 6f5528e4f: chore(FDS-508): [Rollup] - bump rollup to v2.67.3 and update ecosystem

## 3.0.1

### Patch Changes

- aae2861a7: fix(FDS-447) [Section] Fix first/last child margins for consitency in layout
- 273e3b39a: fix(FDS-515): [Dashboard] widget line does not implement stacked prop

## 3.0.0

### Major Changes

- fd5ead388: fix(FDS-426): [MAJOR: Install Warnings] Fixed peerDependency warnings internally and by updates to package dependencies. There are major version changes on dependencies which is causing us to do a major version bump. No updates should be needed.

### Minor Changes

- fd5ead388: chore(FDS-451): [Performance] Build output now exports to separate component files
- fd5ead388: feat(FDS-436) [Image] Adds a responsive Image component MVP
  fix(FDS-436) [Columns] Resolves an issue where column count was not working due to CSS shorthand specificity
  fix(FDS-436) [Columns,Section] Creates more consistent classname generation from components that have a class name matching the file name in CSS Modules

### Patch Changes

- fd5ead388: chore(FDS-438): Move Boundaries Colums Stat Title into atoms folder
- fd5ead388: chore(FDS-244):[Theme]: Color processing is defensive
- fd5ead388: chore(FDS-440) [scaffolding] Rename /system-components to /scaffolding for better semantics in organizing future components
- Updated dependencies [fd5ead388]
  - @espressive/prop-types@2.0.0

## 2.0.0

### Patch Changes

- e3b7463c5: chore(FDS-255):[ActionButton]: Unit test for ActionButton
- e3b7463c5: chore(FDS-33):[ActionEdit]: Create unit test for ActionEdit buttons
- e3b7463c5: chore(FDS-189):[Cascara]: Validate data-component usage on Cascara
- e3b7463c5: chore(FDS-38):[DataText]: Improve unit tests
- e3b7463c5: chore(FDS-427): [Cascara] - add @espressive/prop-types as peer-dep
- e3b7463c5: chore(FDS-161): [useMemo] - Optimize portions of Cascara that can/should benefit from memoization
- e3b7463c5: chore(FDS-37):[DataTextArea]: Improve unit test for textarea
- e3b7463c5: chore(FDS-329): [DataCheckbox]: Improve unit test for checkbox
- e3b7463c5: feat(FDS-396): [Chat] - use ramda instead of lodash
- Updated dependencies [e3b7463c5]
  - @espressive/prop-types@1.1.0

## 1.0.1

### Patch Changes

- 2692652: chore(FDS-255):[ActionButton]: Unit test for ActionButton
- 2692652: chore(FDS-33):[ActionEdit]: Create unit test for ActionEdit buttons
- 2692652: chore(FDS-38):[DataText]: Improve unit tests
- 2692652: chore(FDS-427): [peerDependencies] - add @espressive/prop-types as peerDependencies
- 2692652: chore(FDS-161): [useMemo] - Optimize portions of Cascara that can/should benefit from memoization
- 2692652: chore(FDS-37):[DataTextArea]: Improve unit test for textarea
- 2692652: chore(FDS-329): [DataCheckbox]: Improve unit test for DataCheckbox
- 2692652: feat(FDS-396): [Removed Lodash] - use ramda instead of lodash

## 1.0.0

### Major Changes

- 74dc6dc: feat(FDS-331): [Table, Form, Message] - add 'Old' suffix to Table & Form to prepare for a hook-based API, and rename Chat to Chat

### Minor Changes

- 74dc6dc: feat(FDS-374): [Cascara] - Section and Title component MVP

### Patch Changes

- 74dc6dc: feat(FDS-375): [Cascara] - Switch DOM node to Role instead
- 74dc6dc: feat(FDS-313): [Cascara] - Update the existing color theme for Dashboard
- 74dc6dc: fix(FDS-372): [ViewConfig] - allow spaces in attr search box
- 74dc6dc: feat(FDS-373): [Columns] - Component mvp
- 74dc6dc: feat(FDS-371): [Boundaries] - improve error fallback component
- 74dc6dc: chore(FDS-93): [Build] - Remove DEV_MODE suffix for prod environment
- 74dc6dc: feat(FDS-382): Stat component mvp
- 74dc6dc: fix(FDS-397): [Table] - fix broken styles
- 74dc6dc: chore(FDS-376): [@espressive/prop-types] - New custom prop-types package with additional, reusable prop typings. Updates select Cascara components to also use this new package.

## 0.9.0

### Minor Changes

- f14f888: feat(FDS-374): [Cascara] - Section and Title component MVP

### Patch Changes

- f14f888: fix(FDS-372): [ViewConfig] - allow spaces in attr search box

## 0.8.3

### Patch Changes

- 5848d17: fix(FDS-380) Firefox scroll working with fallback

## 0.8.2

### Patch Changes

- eb5e0c9: fix(FDS-379) Fix cross browser issues with Structure Nav/Header

## 0.8.1

### Patch Changes

- 7f05908: fix(FDS-368) Nav descenders getting cut off
  fix(FDS-366) More permissive prop types on Nav slot component for linkComponent with older routers
  fix(FDS-370) Aria role on Popper with fallback
  fix(FDS-369) Update ActionStack for handler

## 0.8.0

### Minor Changes

- 77a8868: feat(FDS-367) ViewConfig filter preserve per path

### Patch Changes

- 77a8868: fix(DEV-FDS-365) ViewConfig scrolling

## 0.7.2

### Patch Changes

- b267115: Popover to accept className

## 0.7.1

### Patch Changes

- 215595f: Private export Popover and Loader

## 0.7.0

### Minor Changes

- 4579d9a: chore(fds 362) admin structure improvements

## 0.6.1

### Patch Changes

- 47e37f5: Make AdminStructure compatible with legacy

## 0.6.0

### Minor Changes

- c4cdddf: Add Flex component and /atoms section

## 0.5.4

### Patch Changes

- a16d940: feat(FDS-351): ActionStack correct system styles
- Updated dependencies [a16d940]
  - @espressive/icons@0.2.1

## 0.5.3

### Patch Changes

- aec5cee: hotfix(FDS-352): Add optional chaining for getting length on dataDisplay object keys in Form
- aec5cee: hotfix(FDS-352): Update logic for empty/loading in Form

## 0.5.2

### Patch Changes

- ff75947: hotfix(FDS-352): Add optional chaining for getting length on dataDisplay object keys in Form

## 0.5.1

### Patch Changes

- 47fe269: **ViewConfig:** Change default trigger icon, memoized options list, loading state
- Updated dependencies [47fe269]
  - @espressive/icons@0.2.0

## 0.5.0

### Minor Changes

- d3bc06a: Using Changesets
- d3bc06a: chore(FDS-342): Add Module DataEmail

### Patch Changes

- d3bc06a: chore(FDS-342): Add DataDateTime Module - input date-time field
- d3bc06a: chore(FDS-346): [Cascara Form] - remove resolveAllowedActions prop from form
- Updated dependencies [d3bc06a]
  - @espressive/icons@0.1.0
  - @espressive/design-tokens@0.1.5

## 0.4.3

### Patch Changes

- Graduate release
- Updated dependencies [undefined]
  - @espressive/design-tokens@0.1.4
  - @espressive/icons@0.0.3

## 0.4.2

### Patch Changes

- b05f7ad: alpha test
- Updated dependencies [b05f7ad]
  - @espressive/design-tokens@0.1.3
  - @espressive/icons@0.0.2

## 0.4.2-alpha.46

### Patch Changes

- alpha test
- Updated dependencies [undefined]
  - @espressive/design-tokens@0.1.3-alpha.5
  - @espressive/icons@0.0.2-alpha.7

## 0.0.0-next-202181701135

### Patch Changes

- 1f5b237: Adding support for changesets
- Updated dependencies [1f5b237]
  - @espressive/design-tokens@0.0.0-next-202181701135
  - @espressive/icons@0.0.0-next-202181701135

## 0.4.2-alpha.45

### Patch Changes

- Adding support for changesets
- Updated dependencies [undefined]
  - @espressive/design-tokens@0.1.3-alpha.4
  - @espressive/icons@0.0.2-alpha.6

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.
