module.exports = {
  parser: '@typescript-eslint/parser',

  env: {
    // Specifying the ES version automatically sets the correct parser option.
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    // For TypeScript, this should always be the latest release (not pre-release) here:
    // https://github.com/tc39/ecma262/releases
    es2020: true,
  },

  parserOptions: {
    sourceType: 'module',
  },

  plugins: ['@typescript-eslint'],

  extends: ['plugin:@typescript-eslint/recommended'],

  rules: {
    // Should be disabled per Prettier
    '@typescript-eslint/no-extra-semi': 'off',

    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-namespace': [
      'error',
      { allowDefinitionFiles: true },
    ],
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-parameter-properties': 'error',
    '@typescript-eslint/no-require-imports': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/unified-signatures': 'error',
    '@typescript-eslint/no-dupe-class-members': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { vars: 'all', args: 'all', argsIgnorePattern: '[_]+' },
    ],

    '@typescript-eslint/default-param-last': 'error',
    'default-param-last': 'off',

    '@typescript-eslint/no-unused-expressions': [
      'error',
      { allowShortCircuit: true, allowTernary: true },
    ],
    'no-unused-expressions': 'off',

    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    'no-use-before-define': 'off',

    '@typescript-eslint/no-useless-constructor': 'error',
    'no-useless-constructor': 'off',

    // Handled by TypeScript
    'import/no-unresolved': 'off',
  },
};
