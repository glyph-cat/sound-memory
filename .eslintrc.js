module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'react-app/jest',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  rules: {
    /**
     * Note that 'off' | 'warn' | 'error' is preferred over 0 | 1 | 2
     * This increases readability of the rules and we won't mistake it for
     * some other value, for example, the `2` in `indent: ['error', 2]`
     *
     * '@typescript-eslint/...'
     * @see https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
     *
     * 'import/...'
     * @see https://www.npmjs.com/package/eslint-plugin-import
     */

    // === Code Health ===
    // Problems that fall under this category may produce nasty bugs
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-var-requires': 'off',
    eqeqeq: ['warn', 'always'],
    'import/no-anonymous-default-export': 'off',
    'import/no-cycle': 'warn',
    'import/no-deprecated': 'warn',
    'import/no-unresolved': 'error',
    'no-duplicate-imports': 'error',
    'no-shadow': 'error',

    // === Code that requires attention ===
    'no-warning-comments': ['off', {
      terms: ['TODO', 'TOFIX', 'KIV'],
    }],

    // === Code Styles ===
    // Problems that fall under this category will at most make the codebase
    // look inconsistent
    'import/newline-after-import': 'warn',
    indent: ['warn', 2],
    'lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'no-irregular-whitespace': [
      'warn',
      {
        skipStrings: true,
        skipComments: true,
        skipRegExps: true,
        skipTemplates: true,
      },
    ],
    'no-trailing-spaces': 'warn',
    'operator-linebreak': [
      'warn',
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before',
        },
      },
    ],
    'padded-blocks': [
      'warn',
      {
        classes: 'always',
        switches: 'never',
      },
      { allowSingleLineBlocks: true },
    ],
    'prefer-const': 'warn',
    quotes: ['warn', 'single'],
    'react/display-name': 0,
    'react/jsx-no-bind': 1,
    'react/no-children-prop': 1,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0, // No longer needed in React ≥17.0
    semi: ['warn', 'never'],
    yoda: ['warn', 'never'],
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'warn',
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
  },
}
