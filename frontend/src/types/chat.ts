import type { User } from '@/types/user'

export type MessageDeliveryStatus = 'sending' | 'sent' | 'delivered'

export interface Message {
  id: string
  conversationId: string
  senderId: string
  text: string
  createdAt: string
  status?: MessageDeliveryStatus
}

export interface Conversation {
  id: string
  participant: User
  lastMessagePreview: string
  lastMessageAt: string
  unreadCount: number
}
