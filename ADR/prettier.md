# Prettier

version: 2.5.1
Date: 2021-12-02

[diff](https://github.com/prettier/prettier/compare/2.5.0...2.5.1)

#### Improve formatting for empty tuple types ([#11884](https://github.com/prettier/prettier/pull/11884) by [@sosukesuzuki](https://github.com/sosukesuzuki))

<!-- prettier-ignore -->
```tsx
// Input
type Foo =
  Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooo extends []
    ? Foo3
    : Foo4;

// Prettier 2.5.0
type Foo = Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooo extends [

]
  ? Foo3
  : Foo4;

// Prettier 2.5.0 (tailingCommma = all)
// Invalid TypeScript code
type Foo = Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooo extends [
  ,
]
  ? Foo3
  : Foo4;

// Prettier 2.5.1
type Foo =
  Foooooooooooooooooooooooooooooooooooooooooooooooooooooooooo extends []
    ? Foo3
    : Foo4;

```

#### Fix compatibility with Jest inline snapshot test ([#11892](https://github.com/prettier/prettier/pull/11892) by [@fisker](https://github.com/fisker))

A internal change in Prettier@v2.5.0 accidentally breaks the Jest inline snapshot test.

### Ecosystem updates

- none
