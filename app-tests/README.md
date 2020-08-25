# App Tests

This area is intended to be used to test some of our component runtimes inside of different application toolchains. When consuming components inside of these applications, we will need to `cd` into each folder and run a `yarn install` for each. Essentially these applications should all be treated as separate applications. They are not included in our yarn or lerna workspaces definitions.

For testing with FDS/Cascara components, we should use yarn to link to our packages with runtimes built. At a later date, we will probably have to build a make command that sets this up for us in these repositories.

## Create A New Test Application

Any new applications for testing here should be created by `create-react-app` in this folder directly, NOT at the repo root.

1. First `cd app-tests`
2. Then run `npx create-react-app test-app-name` and replace `test-app-name` with the name of your test application.
3. `cd test-app-name`
4. Finally `yarn start` _(or whatever the initial development start script is for your toolchain)_

We may also initially validate some of these runtimes in other toolchains as well. The steps for creating a test application for a different toolchain will differ slightly from the above, but they should be located here in the same folder. _(For a nextjs application, `npx create-next-app` is a similar toolchain bootstrapping script)_

> If creating a nextjs application, it should start with the name `next-` to prevent a bunch of lint errors for React not being in scope. Next auto imports React on all components.
