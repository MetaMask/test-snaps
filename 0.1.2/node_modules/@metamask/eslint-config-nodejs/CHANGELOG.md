# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2021-04-08

### Changed

- **(BREAKING)** Set minimum Node.js version to `^12.0.0` ([#144](https://github.com/MetaMask/eslint-config/pull/144))
- Publish this config as its own package ([#141](https://github.com/MetaMask/eslint-config/pull/141))
  - The contents of this package were previously published as part of [`@metamask/eslint-config`](https://npmjs.com/package/@metamask/eslint-config).
  For changes prior to version `6.0.0`, please refer to the changelog of that package.
  - To continue extending this config, install this package and update your `.eslintrc.js` `extends` array to include `@metamask/eslint-config-nodejs` instead of `@metamask/eslint-config/nodejs`.
- Update `eslint` and other ESLint peer dependencies ([#151](https://github.com/MetaMask/eslint-config/pull/151))

[Unreleased]:https://github.com/MetaMask/eslint-config/compare/v6.0.0...HEAD
[6.0.0]:https://github.com/MetaMask/eslint-config/tree/v6.0.0
