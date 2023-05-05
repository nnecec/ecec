import type { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <span>afo</span>,
  project: {
    link: 'https://github.com/nnecec/afo',
  },
  docsRepositoryBase: 'https://github.com/nnecec/afo',
  footer: {
    text: (
      <div>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://afo-docs.vercel.app" target="_blank" rel="noreferrer">
          afo
        </a>
        .
      </div>
    ),
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – afo',
    }
  },
}

export default config
