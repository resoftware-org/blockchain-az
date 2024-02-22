# Blockchain A-Z by re:Software S.L.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![License](https://img.shields.io/badge/License-LGPL%203.0%20only-blue.svg)][license]

**Blockchain A-Z** is a pot pourri of blockchain features, developed by [re:Software S.L.][parent-url].

- [Getting started](#getting-started)
- [Developer notes](#developer-notes)
- [Getting help](#getting-help)
- [License](#license)

**NOTE**: The author(s) and contributor(s) of this package cannot be held responsible for any loss of money or for any malintentioned usage forms of this package. Please use this package with caution.

## Getting started

### Dependencies

This project is maintained with [**lerna**](https://lerna.js.org/) to permit joining multiple sub-projects together in one codebase. 

```
  - node v18+ (stable LTS)
  - lerna v7
```

You can install lerna globally using `npm install -g lerna@4.0.0`.

Following command installs the **Blockchain A-Z** dependencies:

```bash
npm install --workspaces
```

### Building packages

Using lerna instead of npm, scripts will run directly inside *all* packages (use `--parallel` for parallel execution). If using npm or yarn, use the scripts as provided in package.json.

```bash
lerna run lint --stream
lerna run build --stream
lerna run test --stream
lerna run docs --stream
```

## Getting help

Use the following available resources to get help:

- [Reference Documentation][parent-docs]
- If you found a bug, [open a new issue][issues]

## License

Copyright 2024-present [re:Software S.L.][parent-url], All rights reserved.

Licensed under the [LGPL v3.0](LICENSE)


[license]: https://opensource.org/licenses/LGPL-3.0
[parent-url]: https://resoftware.es
[parent-docs]: https://resoftware-org.github.io/blockchain-az/
[issues]: https://github.com/resoftware-org/blockchain-az/issues
