import { ThemeProvider, useTheme } from '@ecec/hooks'

export const UseThemeExampleInternal = () => {
  const { selectedTheme, setTheme, theme } = useTheme()

  return (
    <div className="flex gap-2">
      <select onChange={e => setTheme(e.target.value as any)} value={selectedTheme}>
        <option value="auto">auto</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>

      <div>
        You are choose {selectedTheme} mode, current theme is {theme}.
      </div>
    </div>
  )
}

export const UseThemeExample = () => {
  return (
    <ThemeProvider>
      <UseThemeExampleInternal />
    </ThemeProvider>
  )
}
