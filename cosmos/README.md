# Cosmos

Configuration files for running React Cosmos in our monorepo.

## Assumptions

There are a few assumptions being made for this configuration to work. If any of these assumptions become invalid, the configuration is liable to break.

### Running React Cosmos As A Binary

We are not installing any dependencies for Cosmos. Instead, we are running cosmos as a binary. This can be done with the command `npx react-cosmos` at the root of our application and it should see the config file at the root of the monorepo and run correctly. There is a script at the root of the directory called `cosmos` that should make running this easier.

### Using `react-scripts` To Bootstrap Our Applications

The assumption here is that we have not made any modifications to the out of the box `react-scripts` configuration with any plugins that allow modifying the Webpack configuration for `react-scripts`, and that we have not ejected any of our applications from that ecosystem.

### Yarn Workspaces For Our Monorepo

There are a couple assumptions here:

1. We are using Yarn workspaces to define packages shared in our monorepo
2. We are using the `workspaces` definition in the package.json file that expects an object called `packages` instead of just an array of package globs at the root of the `packages` object.
3. If we ever move the array of packages to the root of the `workspaces` config in the package.json, we need to update the `webpack.override.js` in this directory to reflect that

### All Fixtures Exist In A `/src` At The Root Of A Yarn Workspace

We are specifically not looking at code in any other location for a fixture. Fixtures should be colocated with the component they are being used to develop so this should not be an issue.

## Running Cosmos In A Package

If you would like to only run Cosmos on a specific package, this is also possible, but it means bringing your own cosmos.config.json and placing it in the package to make it work. There is a file called `cosmos.config.js.tpl` that can be copied into any package folder and removing the `.tpl` suffix. When running from the package directory, this should pick up all Cosmos for that particular package only.

The default [React Cosmos recommended config file](https://github.com/react-cosmos/react-cosmos/tree/master/docs#create-react-app) for `react-scripts` works just fine if there are fixtures inside of a workspace application building with `react-scripts`.

## `react-scripts` Is A Package Dependency

In order to use the same build infrastructure for `react-scripts` it also needs to be a dependency on any package that wants to use this global configuration. That means the the package level and also the root of the monorepo level.

There is a check that happens in `react-scripts` to make sure this dependency is present. Unless we override that check in the future, that means the dependency must be declared.
