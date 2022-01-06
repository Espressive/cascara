# prettier-config

![npm (scoped)](https://img.shields.io/npm/v/@bjeco/prettier-config)

Portable configuration for [Prettier](https://prettier.io/)

## Install

```
yarn add -D @bjeco/prettier-config
```

> This configuration is turn-key and includes all dependencies as well as the preset.

## Setup

Add a `"prettier"` parameter to the package.json file which specifies the shared config:

```json
{
  "name": "my-library",
  "version": "9000.0.1",
  "prettier": "@bjeco/prettier-config"
}
```

[Prettier configuration settings](https://prettier.io/docs/en/configuration.html#sharing-configurations)

## TODO

- [ ] Add VSCode plugin and settings for auto fix setup
