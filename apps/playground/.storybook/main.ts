// .storybook/main.ts

// Imports the Storybook's configuration API
import type { StorybookConfig } from '@storybook/types'

export default {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-interactions'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    docsPage: true
  }
} as StorybookConfig
