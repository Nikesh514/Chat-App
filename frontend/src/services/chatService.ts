import { CURRENT_USER_ID } from '@/utils/constants'
import type { Message } from '@/types'

const randomId = (): string =>
  `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`

/**
 * Mock “network” send — resolves after a short delay. Swap for real API calls.
 */
export function sendMessageMock(
  conversationId: string,
  text: string,
): Promise<Message> {
  const trimmed = text.trim()
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        id: randomId(),
        conversationId,
        senderId: CURRENT_USER_ID,
        text: trimmed,
        createdAt: new Date().toISOString(),
        status: 'sent',
      })
    }, 280)
  })
}
