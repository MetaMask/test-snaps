# `@metamask/eslint-config-jest`

MetaMask's [Jest](https://jestjs.io/) ESLint configuration.

## Usage

```bash
yarn add --dev \
    eslint@^7.23.0 \
    eslint-plugin-import@^2.22.0 \
    eslint-plugin-jest@^23.6.0 \
    @metamask/eslint-config@^5.0.0 \
    @metamask/eslint-config-jest@^5.0.0
```

The order in which you extend ESLint rules matters.
The `@metamask/*` eslint configs should be added to the `extends` array _last_,
with `@metamask/eslint-config` first, and `@metamask/eslint-config-*` in any
order thereafter.

```js
module.exports = {
  root: true,

  extends: [
    // These should be added last unless you know what you're doing.
    '@metamask/eslint-config',
    '@metamask/eslint-config-jest',
  ],
}
```
