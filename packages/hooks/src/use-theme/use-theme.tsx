import { createContext, useContext } from 'react'
import { useLocalStorage, useMedia } from '@ecec/hooks'

import type { Dispatch, ReactNode, SetStateAction } from 'react'

export type Theme = 'dark' | 'light' | 'system'

type ThemeContextType = {
  selectedTheme: Theme
  setTheme: Dispatch<SetStateAction<Theme | undefined>>
  theme: Omit<Theme, 'system'>
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

function ThemeProvider({ children }: { children: ReactNode }): JSX.Element {
  const [selectedTheme = 'system', setTheme] = useLocalStorage<Theme>('system')
  const prefersDarkMode = useMedia('(prefers-color-scheme: dark)', false)

  const theme = selectedTheme === 'system' ? (prefersDarkMode ? 'dark' : 'light') : selectedTheme

  return (
    <ThemeContext.Provider value={{ selectedTheme, setTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  )
}

function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export { ThemeProvider, useTheme }
