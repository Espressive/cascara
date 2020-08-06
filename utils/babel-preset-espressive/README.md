# babel-preset-espressive

Babel preset used by Espressive in CRA/react-scripts applications. Not used for building runtimes of libraries like Cascara.

## Getting Started

#### Install The Package

This Babel preset can be used at the root of a monorepo package. It should be added as a `devDependency`. Until this becomes a published package, this needs to be done manually.

```
"devDependencies": {
  "babel-preset-espressive": "*"
},
```

Then run `yarn install`.

#### Add The Preset To Babel

[Babel can be configured with presets in a few different ways](https://babeljs.io/docs/en/presets) depending on how it is being run (CLI, Webpack, Rollup) so it is important to understand where this preset is being used in order to add it. Once the package has been installed, using the preset should be as simple as including it in the build configuration:

```
{
  "presets": ["espressive"]
}
```

## Future

Currently this preset is only being used in Rollup for building runtimes. We may want to include a few other preset options in this package at a later date that make it easier to build runtimes optionally. This preset may also become packaged with a reusable Rollbar config at some point to make setting up new component packages easier to setup and maintain.
