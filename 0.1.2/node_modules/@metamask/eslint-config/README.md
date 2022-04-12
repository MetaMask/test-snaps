# `@metamask/eslint-config`

MetaMask's base ESLint configuration.

## Usage

Our default export contains a base set of ESLint rules for ES6+:

```bash
yarn add --dev \
    eslint@^7.23.0 \
    eslint-plugin-import@^2.22.0 \
    @metamask/eslint-config@^5.0.0
```

The order in which you extend ESLint rules matters.
The `@metamask/*` eslint configs should be added to the `extends` array _last_,
with `@metamask/eslint-config` first, and `@metamask/eslint-config-*` in any
order thereafter.

```js
module.exports = {
  extends: [
    // This should be added last unless you know what you're doing.
    '@metamask/eslint-config',
  ],
}
```
