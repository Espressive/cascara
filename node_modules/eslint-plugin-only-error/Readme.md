# eslint-plugin-only-error


Upgrade warnings to errors

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-only-error`:

```
$ npm install eslint-plugin-only-error --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-only-error` globally.

## Usage

Add `only-error` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "only-error"
    ]
}
```

_This plugin is based on [eslint-plugin-only-warn](https://github.com/bfanger/eslint-plugin-only-warn) by [Bob Fanger](https://github.com//bfanger)._
