export const APP_NAME = 'Pulse'

export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  LOGIN: '/login',
  SIGNUP: '/signup',
} as const

/** Mock authenticated user id — replace with real auth integration. */
export const CURRENT_USER_ID = 'user-current'

export const STORAGE_KEYS = {
  THEME: 'pulse-theme',
} as const
