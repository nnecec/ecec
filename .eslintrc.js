/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  env: {
    jest: true
  },
  root: true,
  extends: ['@nnecec/eslint-config/react'],
  settings: {
    next: {
      rootDir: ['apps/*/']
    }
  }
}
