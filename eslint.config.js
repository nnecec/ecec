const nnecec = require('@nnecec/eslint-config').default

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  ...nnecec({}),
  {
    ignores: ['target', 'packages/**/dist', 'packages/**/.turbo'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
]
