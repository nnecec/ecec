import type { KnipConfig } from 'knip'

const config: KnipConfig = {
  entry: ['src/index.jsx', 'src/index.tsx', 'src/entry/index.tsx'],
  project: ['src/**/*.{js,jsx}', 'src/**/*.{ts,tsx}'],
  ignore: ['e2e/**', 'babel.config.js', 'config/**', 'knip*'],
  paths: {
    '@/*': ['./src/*'],
    lodash: ['lodash-es'],
    moment: ['@dian/dayjs'],
  },
  rules: {
    unlisted: 'off',
    unresolved: 'off',
    binaries: 'off',
    dependencies: 'off',
    nsExports: 'off',
  },
  vite: {
    config: ['vite.config.{js,ts}'],
  },
  typescript: {
    config: ['tsconfig.json', 'tsconfig.*.json'],
  },
  postcss: {
    config: ['postcss.config.js', 'postcss.config.json', 'package.json'],
  },
  eslint: {
    config: ['.eslintrc', '.eslintrc.{js,json,cjs}', '.eslintrc.{yml,yaml}', 'package.json'],
    entry: ['eslint.config.js'],
  },
  'lint-staged': {
    config: [
      '.lintstagedrc',
      '.lintstagedrc.json',
      '.lintstagedrc.{yml,yaml}',
      '.lintstagedrc.{js,mjs,cjs}',
      'lint-staged.config.{js,mjs,cjs}',
      'package.json',
    ],
  },
}
export default config
