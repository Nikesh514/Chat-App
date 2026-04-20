export type UserPresenceStatus = 'online' | 'offline' | 'away'

export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  status: UserPresenceStatus
}
