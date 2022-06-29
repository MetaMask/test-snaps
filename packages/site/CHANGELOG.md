# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.0]
### Changed
- Test-snaps page redesign to include 2-column format and material design with bootstrap
- Refactor of attributes once in class into id (e2e breaking)
- Included PRs:
  - Attempt at redesigning the test-snaps interface page ([#40](https://github.com/MetaMask/test-snaps/pull/40))

## [1.0.0]
### Changed
- No changes this release.

## [0.4.0]
### Added
- Add notifications snap ([#41](https://github.com/MetaMask/test-snaps/pull/41))

## [0.3.0]
### Changed
- Request specific versions for snaps in production ([#37](https://github.com/MetaMask/test-snaps/pull/37))
  - When the site is deployed to GitHub pages at a path ending in its SemVer version, connecting to a snap will request the version corresponding to the URL.
  - For example, if the URL is `metamask.github.io/test-snaps/0.3.0`, version `0.3.0` will be requested.
  - This change will be backported to previous GitHub pages releases of this package.

## [0.2.0]
### Changed
- No changes this release.

## [0.1.3]
### Changed
- No changes this release.

## [0.1.2]
### Changed
- No changes this release.

## [0.1.1]
### Fixed
- package.json homepage

## [0.1.0]
### Added
- BIP44 snap for testing ([#20](https://github.com/MetaMask/test-snaps/pull/20))
- website build script ([#22](https://github.com/MetaMask/test-snaps/pull/22))

### Fixed
- Fix various monorepo-related issues ([#18](https://github.com/MetaMask/test-snaps/pull/18))

## [0.0.9]
### Changed
- No changes this release.

## [0.0.8]
### Changed
- No changes this release.

## [0.0.7]
### Added
- ascii fox

## [0.0.4]
### Uncategorized
- Fixed linting

## [0.0.3]
### Uncategorized
- Fixed build in sites package.json

## [0.0.1]
### Uncategorized
- Fixed CHANGELOGs
- Added dummy CHANGELOG.md to site package
- Added dummy package.json for site package
- Added title
- Changed index to take snapIds as inputs
- Changed confirm snap to be configurable via params
- Updated index.html
- Added Error to index.html
- Added proper serve command

[Unreleased]: https://github.com/MetaMask/test-snaps/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/MetaMask/test-snaps/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/MetaMask/test-snaps/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/MetaMask/test-snaps/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/MetaMask/test-snaps/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/MetaMask/test-snaps/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/MetaMask/test-snaps/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/MetaMask/test-snaps/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/test-snaps/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/test-snaps/compare/v0.0.9...v0.1.0
[0.0.9]: https://github.com/MetaMask/test-snaps/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/MetaMask/test-snaps/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/MetaMask/test-snaps/compare/v0.0.4...v0.0.7
[0.0.4]: https://github.com/MetaMask/test-snaps/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/MetaMask/test-snaps/compare/v0.0.1...v0.0.3
[0.0.1]: https://github.com/MetaMask/test-snaps/releases/tag/v0.0.1
