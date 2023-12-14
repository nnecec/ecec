const pluginNext = require('@next/eslint-plugin-next')
const root = require('../../.eslintrc.js')

/** @type {import('eslint').Linter.FlatConfig} */
module.exports = [
  ...root,
  {
    plugins: {
      '@next/next': pluginNext,
    },
    rules: {
      ...pluginNext.configs['core-web-vitals'].rules,
    },
  },
]
