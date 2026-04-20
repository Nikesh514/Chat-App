import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { STORAGE_KEYS } from '@/utils/constants'

export type ThemePreference = 'light' | 'dark' | 'system'

interface ThemeContextValue {
  theme: ThemePreference
  resolved: 'light' | 'dark'
  setTheme: (t: ThemePreference) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): ThemePreference {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.THEME)
    if (raw === 'light' || raw === 'dark' || raw === 'system') return raw
  } catch {
    /* ignore */
  }
  return 'system'
}

function getSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function ThemeProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [theme, setThemeState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? 'system' : readStoredTheme(),
  )
  const [systemDark, setSystemDark] = useState(() =>
    typeof window === 'undefined' ? false : getSystemDark(),
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (): void => {
      setSystemDark(mq.matches)
    }
    mq.addEventListener('change', handler)
    return () => {
      mq.removeEventListener('change', handler)
    }
  }, [])

  const resolved: 'light' | 'dark' =
    theme === 'system' ? (systemDark ? 'dark' : 'light') : theme

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolved === 'dark')
  }, [resolved])

  const setTheme = useCallback((t: ThemePreference) => {
    setThemeState(t)
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, t)
    } catch {
      /* ignore */
    }
  }, [])

  const toggleTheme = useCallback(() => {
    const next = resolved === 'dark' ? 'light' : 'dark'
    setTheme(next)
  }, [resolved, setTheme])

  const value = useMemo(
    () => ({ theme, resolved, setTheme, toggleTheme }),
    [theme, resolved, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
