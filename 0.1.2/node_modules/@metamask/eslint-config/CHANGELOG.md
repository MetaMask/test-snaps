# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [6.0.0] - 2021-04-08

## Changed

- **(BREAKING)** Set minimum Node.js version to `^12.0.0` ([#144](https://github.com/MetaMask/eslint-config/pull/144))
- **(BREAKING)** Set ECMAScript version to `es2017`/`8` ([#150](https://github.com/MetaMask/eslint-config/pull/150))
- **(BREAKING)** Add the [Prettier](https://prettier.io) ESLint plugin and extend the recommended Prettier ESLint config ([#96](https://github.com/MetaMask/eslint-config/pull/96))
  - See [here](https://github.com/prettier/eslint-plugin-prettier/blob/d993f24/eslint-plugin-prettier.js#L62-L73) for the `eslint-plugin-prettier` rules and [here](https://github.com/prettier/eslint-config-prettier/blob/abf3ba1/index.js) for the rules of `eslint-config-prettier`, which the plugin extends.
  - The rules of this config should otherwise be unchanged.
- Update `eslint` and other ESLint peer dependencies ([#151](https://github.com/MetaMask/eslint-config/pull/151))

## Removed

- **(BREAKING)** All configs except the base config ([#141](https://github.com/MetaMask/eslint-config/pull/141))
  - All configs are now published as separate packages, and must be extended by referencing their package names:
    - [`@metamask/eslint-config`](https://npmjs.com/package/@metamask/eslint-config) (the base config)
    - [`@metamask/eslint-config-jest`](https://npmjs.com/package/@metamask/eslint-config-jest)
    - [`@metamask/eslint-config-mocha`](https://npmjs.com/package/@metamask/eslint-config-mocha)
    - [`@metamask/eslint-config-nodejs`](https://npmjs.com/package/@metamask/eslint-config-nodejs)
    - [`@metamask/eslint-config-typescript`](https://npmjs.com/package/@metamask/eslint-config-typescript)

## [5.0.0] - 2021-02-02

### Changed

- **(BREAKING)** Enable `semi` in base config ([#101](https://github.com/MetaMask/eslint-config/pull/101))
- **(BREAKING)** Disallow spaces before parentheses of named functions ([#101](https://github.com/MetaMask/eslint-config/pull/101))
- **(BREAKING)** Upgrade to TypeScript v4 and corresponding `@typescript-eslint` dependencies ([#79](https://github.com/MetaMask/eslint-config/pull/79), [#80](https://github.com/MetaMask/eslint-config/pull/80), [#103](https://github.com/MetaMask/eslint-config/pull/103))

## [4.1.0] - 2020-10-21

### Changed

- Disable `node/no-missing-import` ([#75](https://github.com/MetaMask/eslint-config/pull/75))
- Disable `node/no-missing-require` ([#75](https://github.com/MetaMask/eslint-config/pull/75))

## [4.0.0] - 2020-10-20

### Changed

- **(BREAKING)** Update to ESLint v7 (#46, #58, #62, #63)
- Relax `member-delimiter-style` for TypeScript ([#68](https://github.com/MetaMask/eslint-config/pull/68))
- Disable `space-before-function-paren` for TypeScript ([#65](https://github.com/MetaMask/eslint-config/pull/65))

## [3.2.0] - 2020-08-20

### Changed

- Relax `prefer-destructuring` rules (#57)

## [3.1.0] - 2020-08-19

### Changed

- Disable prefer-object-spread (#54)

## [3.0.0] - 2020-08-11

### Changed

- Disallow all anonymous default exports (#52)
- Set maximum empty lines to 1 (#51)

## [2.2.0] - 2020-07-14

### Changed

- Relax no-plusplus rule (#44)

## [2.1.1] - 2020-04-17

### Changed

- Disable `require-await` (#37)

## [2.1.0] - 2020-02-24

### Changed

- Disable `@typescript-eslint/no-extra-parens` (#29)

## [2.0.0] - 2020-02-20

### Added

- Add import rules to base config  (#24)
- Clarified TypeScript config & publishing docs

### Changed

- Explicitly specify all core rules (#17)
- Update TypeScript config (#25)

### Removed

- Remove root flag from TS config (#20)

## [1.2.0] - 2020-02-18

### Changed

- Disable Jest lowercase-name for describe blocks (#14)

## [1.1.0] - 2020-02-11

### Added

- Add README file
- Add Mocha config (#13)

## [1.0.0] - 2020-01-21

### Added

- Add base, TypeScript, and Jest configs (#3)

[Unreleased]:https://github.com/MetaMask/eslint-config/compare/v6.0.0...HEAD
[6.0.0]:https://github.com/MetaMask/eslint-config/compare/v5.0.0...v6.0.0
[5.0.0]:https://github.com/MetaMask/eslint-config/compare/v4.1.0...v5.0.0
[4.1.0]:https://github.com/MetaMask/eslint-config/compare/v4.0.0...v4.1.0
[4.0.0]:https://github.com/MetaMask/eslint-config/compare/v3.2.0...v4.0.0
[3.2.0]:https://github.com/MetaMask/eslint-config/compare/v3.1.0...v3.2.0
[3.1.0]:https://github.com/MetaMask/eslint-config/compare/v3.0.0...v3.1.0
[3.0.0]:https://github.com/MetaMask/eslint-config/compare/v2.2.0...v3.0.0
[2.2.0]:https://github.com/MetaMask/eslint-config/compare/v2.1.1...v2.2.0
[2.1.1]:https://github.com/MetaMask/eslint-config/compare/v2.1.0...v2.1.1
[2.1.0]:https://github.com/MetaMask/eslint-config/compare/v2.0.0...v2.1.0
[2.0.0]:https://github.com/MetaMask/eslint-config/compare/v1.2.0...v2.0.0
[1.2.0]:https://github.com/MetaMask/eslint-config/compare/v1.1.0...v1.2.0
[1.1.0]:https://github.com/MetaMask/eslint-config/compare/v1.0.0...v1.1.0
[1.0.0]:https://github.com/MetaMask/eslint-config/tree/v1.0.0
