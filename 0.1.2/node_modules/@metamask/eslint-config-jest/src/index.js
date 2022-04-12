module.exports = {
  plugins: ['jest'],

  env: {
    'jest/globals': true,
  },

  extends: ['plugin:jest/recommended', 'plugin:jest/style'],

  rules: {
    'jest/consistent-test-it': ['error', { fn: 'it' }],
    'jest/lowercase-name': ['error', { ignore: ['describe'] }],
    'jest/no-duplicate-hooks': 'error',
    'jest/no-if': 'error',
    'jest/no-test-return-statement': 'error',
    'jest/prefer-hooks-on-top': 'error',
    'jest/prefer-spy-on': 'error',
    'jest/prefer-strict-equal': 'error',
    'jest/prefer-todo': 'error',
    'jest/require-top-level-describe': 'error',
    'jest/require-to-throw-message': 'error',
    'jest/valid-expect': ['error', { alwaysAwait: true }],
    'jest/no-restricted-matchers': [
      'error',
      {
        resolves: 'Use `expect(await promise)` instead.',
        toBeFalsy: 'Avoid `toBeFalsy`',
        toBeTruthy: 'Avoid `toBeTruthy`',
        toMatchSnapshot: 'Use `toMatchInlineSnapshot()` instead',
        toThrowErrorMatchingSnapshot:
          'Use `toThrowErrorMatchingInlineSnapshot()` instead',
      },
    ],
  },
};
