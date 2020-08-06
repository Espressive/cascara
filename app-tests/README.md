# App Tests

This area is intended to be used to test some of our component runtimes inside of different application toolchains. When consuming components inside of these applications, we will need to `cd` into each folder and run a `yarn install` for each. Essentially these applications should all be treated as separate applications. They are not included in our yarn or lerna workspaces definitions.

For testing with FDS/Cascara components, we should use yarn to link to our packages with runtimes built. At a later date, we will probably have to build a make command that sets this up for us in these repositories.
