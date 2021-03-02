# eslint-config-espressive

Eslint config used by Espressive

## Getting Started

#### Install The Package

This eslint config can be used at the root of a repository (recommended) OR at the root of a monorepo package. It should be added as a `devDependency`. Until this becomes a published package, this needs to be done manually.

```
"devDependencies": {
  "eslint-config-espressive": "*"
},
```

Then run `yarn install`. Note that during the install process, there will be warnings that there are unmet peer dependencies. These dependencies need to be installed at the root of where this config is being added. These can also be added under `devDependencies`. Again, this works best if we run this at the root of a repository.

After installing all peer dependencies, there should be no warnings from this package.

#### Add An Eslint Config

At the root of where eslint is expected to be used, add an `eslint.config.js` file:

```
module.exports = {
  root: true,
  extends: 'espressive',
};
```

This [config could be extended](https://eslint.org/docs/user-guide/configuring) from here, but hopefully that is not needed.

## Future

As of the creation of this file, we are not including the peer dependencies so we can set the dependencies from one location in the repository tree. We might end up later including these dependencies in the package so they do not also need to be added as dependencies wherever eslint is being set up.
