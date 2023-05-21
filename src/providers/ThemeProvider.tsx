'use client'
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import darkDefault from '@/styles/themes/dark-default.module.scss'

const themes = {
  default: {
    light: '',
    dark: darkDefault.theme,
  },
}

// Define the type for the theme object
type Theme = {
  color: 'default'
  mode: 'light' | 'dark'
}

// Define the initial theme
const initialTheme: Theme = {
  color: 'default',
  mode: 'light',
}

// Create the context for the theme
const ThemeContext = createContext<Theme>(initialTheme)

// Create the ThemeProvider component
const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)
  useEffect(() => {
    const handleClassNameChange = () => {
      const htmlElement = document.documentElement
      const classNames = Array.from(htmlElement.classList)
      const matchedTheme = Object.entries(themes).find(([themeName, theme]) =>
        Object.values(theme).some((className) => classNames.includes(className))
      )

      if (matchedTheme) {
        const [themeName, themeStyles] = matchedTheme
        const mode = themeStyles.light ? 'light' : 'dark'

        setTheme((prevTheme) => ({
          ...prevTheme,
          color: themeName as 'default',
          mode,
        }))
      } else {
        setTheme((prevTheme) => ({
          ...prevTheme,
          color: 'default',
          mode: 'light',
        }))
      }
    }

    const observer = new MutationObserver(handleClassNameChange)
    observer.observe(document.documentElement, { attributes: true })

    // Clean up observer
    return () => {
      observer.disconnect()
    }
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const theme = useContext(ThemeContext)

  const updateTheme = (newTheme: Partial<Theme>) => {
    const htmlElement = document.documentElement

    // Remove existing theme class names
    Object.values(themes).forEach((theme) => {
      Object.values(theme).forEach((className) => {
        if (!className) return
        htmlElement.classList.remove(className)
      })
    })

    // Add new theme class name
    const { color, mode } = { ...theme, ...newTheme }
    const themeStyles = themes[color]
    if (themeStyles && themeStyles[mode]) {
      htmlElement.classList.add(themeStyles[mode])
    }
  }

  return { theme, setTheme: updateTheme }
}

export { ThemeProvider, useTheme }
