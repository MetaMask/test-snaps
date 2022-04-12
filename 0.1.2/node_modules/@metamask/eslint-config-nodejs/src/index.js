module.exports = {
  plugins: ['node'],

  env: {
    node: true,
  },

  extends: ['plugin:node/recommended'],

  rules: {
    // Possible Errors
    'node/handle-callback-err': ['error', '^(err|error)$'],
    'node/no-callback-literal': 'error',
    'node/no-missing-import': 'off', // Duplicates `import/no-unresolved`
    'node/no-missing-require': 'off', // Duplicates `import/no-unresolved`
    'node/no-new-require': 'error',
    'node/no-path-concat': 'error',
    'node/no-process-exit': 'error',
    'node/no-unsupported-features/es-syntax': 'off',

    // Stylistic rules
    'node/callback-return': 'error',
    'node/exports-style': 'error',
    'node/global-require': 'error',
    'node/no-mixed-requires': 'error',
    'node/no-process-env': 'error',
    'node/no-restricted-import': 'error',
    'node/no-restricted-require': 'error',
    'node/no-sync': 'error',
    'node/prefer-global/buffer': 'error',
    'node/prefer-global/console': 'error',
    'node/prefer-global/process': 'error',
    'node/prefer-global/text-decoder': 'error',
    'node/prefer-global/text-encoder': 'error',
    'node/prefer-global/url-search-params': 'error',
    'node/prefer-global/url': 'error',
    'node/prefer-promises/dns': 'error',
    'node/prefer-promises/fs': 'error',

    // Deprecated eslint core rule, erroneously enabled by recommended Node rules
    // https://eslint.org/docs/rules/no-process-exit
    'no-process-exit': 'off',
  },
};
