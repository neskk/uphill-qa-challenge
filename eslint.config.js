import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        cy: 'readonly', // For Cypress
        Cypress: 'readonly',
      },
    },
    plugins: {
      js: pluginJs,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      eqeqeq: 'error',
      curly: 'error',
      'prefer-const': 'error',
      semi: ['error', 'always'],
    },
  },
];