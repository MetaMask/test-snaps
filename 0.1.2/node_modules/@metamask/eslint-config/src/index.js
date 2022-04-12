module.exports = {
  env: {
    // Specifying the ES version automatically sets the correct parser option.
    // https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments
    // For JavaScript, ES2017 is our effective minimum version due to the use
    // of Esprima by transitive dependencies.
    // It doesn't handle object rest spread, which is a 2018 feature.
    'es2017': true,
    'shared-node-browser': true,
  },

  plugins: ['import', 'prettier'],

  extends: ['eslint:recommended', 'plugin:prettier/recommended'],

  rules: {
    /* Prettier rules */
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        quoteProps: 'consistent',
      },
      {
        // Allow consumers to override this prettier config.
        // This is the default, but we specify it for the sake of clarity.
        usePrettierrc: true,
      },
    ],

    // Prettier has some opinions on mixed-operators, and there is ongoing work
    // to make the output code clear. The workaround for keeping this rule enabled
    // requires breaking parts of operations into different variables -- which we
    // decided to be worse.
    // https://github.com/prettier/eslint-config-prettier#no-mixed-operators
    'no-mixed-operators': 'off',

    // Prettier wraps e.g. single line functions with ternaries in parens by default, but
    // if the line is long enough it breaks it into a separate line and removes the parens.
    // The second behavior conflicts with this rule. There is some advice on the repo about
    // how you can keep it enabled:
    // https://github.com/prettier/eslint-config-prettier#no-confusing-arrow
    // However, in practice this conflicts with prettier adding parens around short lines,
    // when autofixing in vscode and others.
    'no-confusing-arrow': 'off',

    'curly': ['error', 'all'],
    'max-len': 'off',
    'no-tabs': 'error',
    'no-unexpected-multiline': 'off',
    'quotes': 'off',

    // Not required by prettier, but potentially gotchas.
    'no-restricted-syntax': ['error', 'SequenceExpression'],

    /* Core rules */
    'accessor-pairs': 'error',
    'array-callback-return': 'error',
    'block-scoped-var': 'error',
    'camelcase': [
      'error',
      {
        properties: 'never',
        allow: ['^UNSAFE_'],
      },
    ],
    'consistent-return': 'error',
    'consistent-this': ['error', 'self'],
    'default-case': 'error',
    'default-param-last': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'allow-null'],
    'func-name-matching': 'error',
    'grouped-accessor-pairs': 'error',
    'guard-for-in': 'error',
    'lines-between-class-members': 'error',
    'max-statements-per-line': [
      'error',
      {
        max: 1,
      },
    ],
    'new-cap': [
      'error',
      {
        newIsCap: true,
        capIsNew: false,
      },
    ],
    'no-alert': 'error',
    'no-array-constructor': 'error',
    'no-bitwise': 'error',
    'no-buffer-constructor': 'error',
    'no-caller': 'error',
    'no-constructor-return': 'error',
    'no-div-regex': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-eq-null': 'error',
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-label': 'error',
    'no-implicit-coercion': 'error',
    'no-implicit-globals': 'error',
    'no-implied-eval': 'error',
    'no-inner-declarations': ['error', 'functions'],
    'no-invalid-this': 'error',
    'no-iterator': 'error',
    'no-label-var': 'error',
    'no-labels': [
      'error',
      {
        allowLoop: false,
        allowSwitch: false,
      },
    ],
    'no-lone-blocks': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-multi-str': 'error',
    'no-native-reassign': 'error',
    'no-negated-condition': 'error',
    'no-negated-in-lhs': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-object': 'error',
    'no-new-wrappers': 'error',
    'no-octal-escape': 'error',
    'no-param-reassign': 'error',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-proto': 'error',
    'no-restricted-globals': ['error', 'event'],
    'no-return-assign': ['error', 'except-parens'],
    'no-script-url': 'error',
    'no-self-compare': 'error',
    'no-shadow': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': [
      'error',
      {
        defaultAssignment: false,
      },
    ],
    'no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'all',
        argsIgnorePattern: '[_]+',
      },
    ],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'no-void': 'error',
    'object-shorthand': 'error',
    'one-var': [
      'error',
      {
        initialized: 'never',
      },
    ],
    'operator-assignment': 'error',
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'directive',
        next: '*',
      },
      {
        blankLine: 'any',
        prev: 'directive',
        next: 'directive',
      },
    ],
    'prefer-const': 'error',
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: {
          array: false,
          object: true,
        },
        AssignmentExpression: {
          array: false,
          object: false,
        },
      },
      {
        enforceForRenamedProperties: false,
      },
    ],
    'prefer-numeric-literals': 'error',
    'prefer-promise-reject-errors': 'error',
    'prefer-regex-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'radix': 'error',
    'require-atomic-updates': 'error',
    'require-unicode-regexp': 'error',
    'spaced-comment': [
      'error',
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ',',
        ],
        exceptions: ['=', '-'],
      },
    ],
    'symbol-description': 'error',
    'yoda': ['error', 'never'],

    /* import plugin rules */
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': [
      'error',
      'never',
      {
        json: 'always',
      },
    ],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/newline-after-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-amd': 'error',
    'import/no-anonymous-default-export': 'error',
    'import/no-duplicates': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-named-as-default': 'error',
    'import/no-named-as-default-member': 'error',
    'import/no-named-default': 'error',
    'import/no-self-import': 'error',
    'import/no-unassigned-import': 'error',
    'import/no-unresolved': [
      'error',
      {
        commonjs: true,
      },
    ],
    'import/no-useless-path-segments': [
      'error',
      {
        commonjs: true,
        noUselessIndex: true,
      },
    ],
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'error',
    'import/unambiguous': 'error',
  },
};
