# eslint-config

Eslint config used by Espressive

## Note

This config extends the `eslint-config-react-app` eslint config as a baseline because we use these lint rules on the `eslint-config-react-app` toolchain. There are lint rules in that preset that are requried for code to run and build correctly in a CRA environment.

Our `peerDependencies` should always match the version of `eslint-config-react-app` that we are using: https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/package.json

Any plugins we are using that are not part of `eslint-config-react-app` should be defined as full `dependencies`

## Getting Started

#### Install The Package

This eslint config can be used at the root of a repository (recommended) OR at the root of a monorepo package. It should be added as a `devDependency`. Until this becomes a published package, this needs to be done manually.

```
"devDependencies": {
  "@espressive/eslint-config": "*"
},
```

Then run `yarn install`. Note that during the install process, there will be warnings that there are unmet peer dependencies. These dependencies need to be installed at the root of where this config is being added. These can also be added under `devDependencies`. Again, this works best if we run this at the root of a repository.

After installing all peer dependencies, there should be no warnings from this package.

#### Add An Eslint Config

##### Option 1:

Add an "eslintConfig" parameter to the package.json file as an object containing an "extends" parameter:

```
{
  "name": "my-library",
  "version": "9000.0.1",
  "eslintConfig": {
    "extends": "@espressive"
  }
}
```

Option 2:
At the root of where eslint is expected to be used, add an `eslint.config.js` file:

```
module.exports = {
  root: true,
  extends: '@espressive',
};
```

## Other Plugins

There are a number of [other great eslint plugins](https://github.com/dustinspecker/awesome-eslint#plugins) which we may decide to include here at at later date.
