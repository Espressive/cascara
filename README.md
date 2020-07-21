# fds-monorepo

Espressive test repository to validate new monorepo tooling to support our Functional Design System.

## Yarn

- [x] Set up separate workspaces for apps, ui, utils, etc
- [ ] Support for pnp and/or yarn 2.x

## React Cosmos

- [x] Create config that can be run at the monorepo root
- [x] Create config that can be run in a package
- [x] Centralize dependencies for both configs at application root
- [x] Make any webpack overrides react to changes in cosmos.config or package.json

## Prettier

- [x] Set up a prettier config for the monorepo that is portable to all workspaces
- [x] Set up a precommit hook to always run prettier before commiting changes
  - [ ] [Watch known issue for husky](https://github.com/typicode/husky/issues/639) that does not fire hooks in some GIT GUIs like Sourcetree or Tower

## VS Code

- [x] Set up a workspace file with all recommended settings and plugins for the monorepo (probably will be more later)
- [x] Auto lint and prettier on save 🙏🏽

## Docz

- [x] Set up Docz at root level to build from workspace readme.mdx files
- [ ] Define what views are needed for all documentation
- [x] Add component/display support for all above views
- [ ] Add support to analyze component composition and link to atomic components in doc system
- [ ] Add support to link to component designs in Abstract

## Rollup

- [x] Set up Rollup to compile components consumed by apps
- [x] Evaluate if Rollup is actually the best option for this
- [x] See if Rollup compilation can borrow all of the same babel configs from react-scripts
- [ ] Make sure tooling supports watch commands on these components once these packages become compiled dependencies
- [ ] Evaluate if we need to change the React Cosmos config for these packages to use a different configuration if the build system diverges too much from react-scripts so the DX is consistent with the output of the builds

## Framer X

- [x] Set up a library in Framer X and understand how we link our source components to exports for Framer
- [ ] Get components compiled so we can process using [`component-importer`](https://github.com/framer/component-importer)
- [ ] CSS Modules?
- [ ] Build system to deploy package updates to Framer components when made
- [ ] Determine if there is a consistent URL for library components on web that we could link to

## Abstract/Sketch

- [ ] Figure out what our Abstract file links are for assets to add them as links to MDX

## Make

- [ ] Set up common commands and make recipes area to simplify tooling maintenance and process
- [ ] Reusable package-scoped commands with wildcards (start, build, etc)
- [ ] Doc generation and build/serve commands
- [ ] Centralized "help" available from all make command groups

## Testing

- [ ] Set up testing and figure out how we set up coverage per package
- [ ] Cypress support for all UI tests as well

## Eslint

- [ ] Revise our exising eslint config to be a baseline of extending `react-scripts` config and adding our own on top
- [ ] Validate that none of the base config conflicts with Prettier
- [ ] Remove any of our current extending configs that conflict with Prettier
- [ ] Relax any of our existing rules that we are fighting or no longer best practice

## Husky

- [x] Set up Husky for git hooks
- [x] pre-commit should at least run prettier
- [ ] pre-push should run tests, lint
- [ ] Lint on changed files MIGHT only be needed for FDS components since linting is built in to react-scripts... we might want to make sure that stays in the build pipeline once we have Rollup
- [ ] Enforce git-flow branching structure
