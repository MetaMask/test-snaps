module.exports = {
  root: true,

  extends: ['../../.eslintrc.js'],

  overrides: [
    {
      files: ['*.js'],
      rules: {
        'node/no-unpublished-require': 'off',
        'node/global-require': 'off',
        'import/no-dynamic-require': 'off',
      },
    },
  ],
};
