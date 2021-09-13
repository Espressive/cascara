# Contribution guide

## Developing Cascara

Thank you for being part of the Cascara Team!
Please consider these guidelines when filing a pull request:

- Commits use [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/)
- Changelog is generated from our commit messages

## Commit process

When running `git commit`, you will be presented an interactive menu:

1. Select the option that best describes your change:
   ![Commitizen menu](./.assets/commitizen-interactive-menu-01.png 'Interactive commit menu')

2. Type the scope of the change:
   ![Commitizen menu](./.assets/commitizen-interactive-menu-02.png 'Interactive commit menu')

Here are some of our scopes:

- `/packages/cascara`
  - for fixtures -> Cosmos
  - for code -> Cascara
- `/packages/design-tokens` -> Design
- `/packages/framer` -> Prototypes
- `/packages/icons` -> Icons
- `/docs` -> Docs

3. Describe any **BREAKING CHANGES** and impacted **Issues**:

![Commitizen menu](./.assets/commitizen-interactive-menu-03.png 'Interactive commit menu')

That's it, happy coding!
