# `@metamask/eslint-config-nodejs`

MetaMask's [Node.js](https://nodejs.org) ESLint configuration.

## Usage

```bash
yarn add --dev \
    eslint@^7.23.0 \
    eslint-plugin-import@^2.22.0 \
    eslint-plugin-node@^11.1.0 \
    @metamask/eslint-config@^5.0.0 \
    @metamask/eslint-config-nodejs@^5.0.0
```

The order in which you extend ESLint rules matters.
The `@metamask/*` eslint configs should be added to the `extends` array _last_,
with `@metamask/eslint-config` first, and `@metamask/eslint-config-*` in any
order thereafter.

```js
module.exports = {
  extends: [
    // These should be added last unless you know what you're doing.
    '@metamask/eslint-config',
    '@metamask/eslint-config-nodejs',
  ],
}
```

To lint the `.eslintrc.js` file itself, you will **need** to add this config in addition to the base config.
