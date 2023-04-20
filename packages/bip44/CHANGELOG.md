# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [5.2.0]
### Changed
- No changes this release.

## [5.1.2]
### Changed
- No changes this release.

## [5.1.1]
### Fixed
- Patch `luxon` to fix LavaMoat incompatibility ([#154](https://github.com/MetaMask/test-snaps/pull/154))

## [5.1.0]
### Changed
- No changes this release.

## [5.0.3]
### Changed
- No changes this release.

## [5.0.2]
### Changed
- Stop transpiling BIP-44 snap dependencies ([#145](https://github.com/MetaMask/test-snaps/pull/145))

## [5.0.1]
### Changed
- No changes this release.

## [5.0.0]
### Changed
- Update snaps packages ([#141](https://github.com/MetaMask/test-snaps/pull/141))

### Removed
- **BREAKING:** Remove all usage of `snap_confirm` ([#122](https://github.com/MetaMask/test-snaps/pull/122))
    - `snap_confirm` usage was replaced with `snap_dialog`

## [4.6.4]
### Changed
- No changes this release.

## [4.6.3]
### Changed
- Update snaps-cli, snap shasums ([#136](https://github.com/MetaMask/test-snaps/pull/136))

## [4.6.2]
### Changed
- No changes this release.

## [4.6.1]
### Changed
- No changes this release.

## [4.6.0]
### Changed
- No changes this release.

## [4.5.0]
### Changed
- No changes this release.

## [4.4.1]
### Changed
- No changes this release.

## [4.4.0]
### Changed
- No changes this release.

## [4.3.0]
### Changed
- No changes this release.

## [4.2.0]
### Added
- Add `endowment:rpc` permission ([#105](https://github.com/MetaMask/test-snaps/pull/105))

## [4.1.2]
### Changed
- No changes this release.

## [4.1.1]
### Changed
- No changes this release.

## [4.1.0]
### Changed
- Handle breaking changes with new version of Snaps Platform ([#95](https://github.com/MetaMask/test-snaps/pull/95))

## [4.0.2]
### Changed
- No changes this release.

## [4.0.1]
### Changed
- No changes this release.

## [4.0.0]
### Changed
- No changes this release.

## [3.2.0]
### Changed
- Update `@metamask/key-tree` and fix breaking changes ([#82](https://github.com/MetaMask/test-snaps/pull/82))

## [3.1.0]
### Fixed
- Fix issue with converting bytes to hex ([#73](https://github.com/MetaMask/test-snaps/pull/73))

## [3.0.2]
### Changed
- No changes this release.

## [3.0.1]
### Fixed
- Fix `clean` npm script ([#67](https://github.com/MetaMask/test-snaps/pull/67))
- Fix `publish:all` npm script ([#68](https://github.com/MetaMask/test-snaps/pull/68))

## [3.0.0]
### Changed
- **BREAKING**: Upgrade test-snaps to use Node v16 ([#53](https://github.com/MetaMask/test-snaps/pull/53))
- **BREAKING:** Update BIP-44 test snap to use `snap_getBip44Entropy` ([#57](https://github.com/MetaMask/test-snaps/pull/57))

## [2.0.0]
### Changed
- No changes this release.

## [1.0.0]
### Changed
- **BREAKING:** Update test snaps to export `onRpcRequest` via CommonJS syntax ([#44](https://github.com/MetaMask/test-snaps/pull/44))

## [0.4.0]
### Changed
- No changes this release.

## [0.3.0]
### Changed
- **BREAKING:** Bump `@metamask/key-tree` to `4.0.0` ([#35](https://github.com/MetaMask/test-snaps/pull/35))

## [0.2.0]
### Fixed
- Fix snap manifest version ([#30](https://github.com/MetaMask/test-snaps/pull/30))

## [0.1.3]
### Changed
- No changes this release.

## [0.1.2]
### Changed
- No changes this release.

## [0.1.1]
### Changed
- No changes this release.

## [0.1.0]
### Added
- Changelog ([#24](https://github.com/MetaMask/test-snaps/pull/24))
- BIP44 snap for testing ([#20](https://github.com/MetaMask/test-snaps/pull/20))

[Unreleased]: https://github.com/MetaMask/test-snaps/compare/v5.2.0...HEAD
[5.2.0]: https://github.com/MetaMask/test-snaps/compare/v5.1.2...v5.2.0
[5.1.2]: https://github.com/MetaMask/test-snaps/compare/v5.1.1...v5.1.2
[5.1.1]: https://github.com/MetaMask/test-snaps/compare/v5.1.0...v5.1.1
[5.1.0]: https://github.com/MetaMask/test-snaps/compare/v5.0.3...v5.1.0
[5.0.3]: https://github.com/MetaMask/test-snaps/compare/v5.0.2...v5.0.3
[5.0.2]: https://github.com/MetaMask/test-snaps/compare/v5.0.1...v5.0.2
[5.0.1]: https://github.com/MetaMask/test-snaps/compare/v5.0.0...v5.0.1
[5.0.0]: https://github.com/MetaMask/test-snaps/compare/v4.6.4...v5.0.0
[4.6.4]: https://github.com/MetaMask/test-snaps/compare/v4.6.3...v4.6.4
[4.6.3]: https://github.com/MetaMask/test-snaps/compare/v4.6.2...v4.6.3
[4.6.2]: https://github.com/MetaMask/test-snaps/compare/v4.6.1...v4.6.2
[4.6.1]: https://github.com/MetaMask/test-snaps/compare/v4.6.0...v4.6.1
[4.6.0]: https://github.com/MetaMask/test-snaps/compare/v4.5.0...v4.6.0
[4.5.0]: https://github.com/MetaMask/test-snaps/compare/v4.4.1...v4.5.0
[4.4.1]: https://github.com/MetaMask/test-snaps/compare/v4.4.0...v4.4.1
[4.4.0]: https://github.com/MetaMask/test-snaps/compare/v4.3.0...v4.4.0
[4.3.0]: https://github.com/MetaMask/test-snaps/compare/v4.2.0...v4.3.0
[4.2.0]: https://github.com/MetaMask/test-snaps/compare/v4.1.2...v4.2.0
[4.1.2]: https://github.com/MetaMask/test-snaps/compare/v4.1.1...v4.1.2
[4.1.1]: https://github.com/MetaMask/test-snaps/compare/v4.1.0...v4.1.1
[4.1.0]: https://github.com/MetaMask/test-snaps/compare/v4.0.2...v4.1.0
[4.0.2]: https://github.com/MetaMask/test-snaps/compare/v4.0.1...v4.0.2
[4.0.1]: https://github.com/MetaMask/test-snaps/compare/v4.0.0...v4.0.1
[4.0.0]: https://github.com/MetaMask/test-snaps/compare/v3.2.0...v4.0.0
[3.2.0]: https://github.com/MetaMask/test-snaps/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/MetaMask/test-snaps/compare/v3.0.2...v3.1.0
[3.0.2]: https://github.com/MetaMask/test-snaps/compare/v3.0.1...v3.0.2
[3.0.1]: https://github.com/MetaMask/test-snaps/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/MetaMask/test-snaps/compare/v2.0.0...v3.0.0
[2.0.0]: https://github.com/MetaMask/test-snaps/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/MetaMask/test-snaps/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/MetaMask/test-snaps/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/MetaMask/test-snaps/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/MetaMask/test-snaps/compare/v0.1.3...v0.2.0
[0.1.3]: https://github.com/MetaMask/test-snaps/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/MetaMask/test-snaps/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/MetaMask/test-snaps/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/MetaMask/test-snaps/releases/tag/v0.1.0
