/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    jest: true,
  },
  root: true,
  extends: ['@nnecec/eslint-config/react-universal'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
  ignorePatterns: ['target', 'packages/**/dist', 'packages/**/.turbo'],
  rules: {
    '@typescript-eslint/no-explicit-any': "off",
  },
}
