# Cascara SASS

Collection of variables and mixins for consistent styling.

## Getting Started

### Usage

To access the variables and mixins in this package, you must declare the library in your SCSS file.

```
@use '@espressive/cascara/styles' as *;
```

> This will make all variables and mixins available in the file you are working on. The `as *` is important as it makes everything in the library available without a namespace.

### Requirements

We are using the latest version of Dart Sass. [Please review all documentation(https://sass-lang.com/documentation)] as there are some minor differences with LibSass and Ruby Sass which are older.

## What's Available

### Variables

All variables that are created from `@espressive/design-tokens` are available once declared with `@use`.

### Mixins & Helpers

There are a number of helpers available with scopes.

#### Media Queries

```
.ResponsiveModule:before {
  content: "tiny";

  @include media-xs {
    content: "small";
  }

  @include media-md {
    content: "medium";
  }

  @include media-lg {
    content: "large";
  }

  @include media-xl {
    content: "extra large";
  }
}
```

#### Scroll

```
.ScrollingModule {
  @include scroll-all;
  // or
  @include scroll-horizontal;
  // or
  @include scroll-vertical;
}
```
