import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>ecec</span>,
  project: {
    link: 'https://github.com/nnecec/ecec',
  },
  docsRepositoryBase: 'https://github.com/nnecec/ecec',
  footer: {
    text: (
      <div>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://ecec.vercel.app" target="_blank" rel="noreferrer">
          ecec
        </a>
        .
      </div>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – ecec',
    }
  },
}

export default config
