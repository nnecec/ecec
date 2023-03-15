import { ThemeProvider,useTheme } from '@afojs/hooks'

export const UseThemeExampleInternal = () => {
  const { theme, setTheme, selectedTheme } = useTheme()
  
  return (
    <div className="flex gap-2">
      <select value={selectedTheme} onChange={e => setTheme(e.target.value as any)}>
        <option value="auto">auto</option>
        <option value="light">light</option>
        <option value="dark">dark</option>
      </select>

      <div>
        You are choose: {theme} mode!
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
