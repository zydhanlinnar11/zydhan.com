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
const getSystemPreferredTheme = () => {
  // Check if the system prefers a light theme
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return 'light'
  }

  // Check if the system prefers a dark theme
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return 'dark'
  }

  // Return null if the system preference is not available or not supported
  return null
}

const updateTheme = (theme: Theme, newTheme: Partial<Theme>) => {
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

// Create the ThemeProvider component
const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)
  console.log(theme)

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

  useEffect(() => {
    // Set the theme mode from localStorage
    const persistedMode = localStorage.getItem('themeMode')
    if (persistedMode) {
      updateTheme(theme, { mode: persistedMode as 'light' | 'dark' })
    } else {
      // If theme.mode is undefined, check system's preferred theme
      if (!theme.mode) {
        const systemPreferredTheme = getSystemPreferredTheme()
        updateTheme(theme, {
          mode: systemPreferredTheme || 'dark',
        })
      }
    }
  }, [])

  useEffect(() => {
    // Update localStorage when theme mode changes
    localStorage.setItem('themeMode', theme.mode)
  }, [theme.mode])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

const useTheme = () => {
  const theme = useContext(ThemeContext)

  return {
    theme,
    setTheme: (newTheme: Partial<Theme>) => updateTheme(theme, newTheme),
  }
}

export { ThemeProvider, useTheme }
