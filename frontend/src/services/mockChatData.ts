import { CURRENT_USER_ID } from '@/utils/constants'
import type { Conversation, Message, User } from '@/types'

const now = Date.now()

export const MOCK_CURRENT_USER: User = {
  id: CURRENT_USER_ID,
  name: 'You',
  email: 'you@example.com',
  status: 'online',
}

const users: Record<string, User> = {
  'user-alex': {
    id: 'user-alex',
    name: 'Alex Rivera',
    email: 'alex@example.com',
    status: 'online',
  },
  'user-sam': {
    id: 'user-sam',
    name: 'Sam Okonkwo',
    email: 'sam@example.com',
    status: 'away',
  },
  'user-jordan': {
    id: 'user-jordan',
    name: 'Jordan Lee',
    email: 'jordan@example.com',
    status: 'offline',
  },
}

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: users['user-alex'],
    lastMessagePreview: 'Sounds good — I’ll send the doc in a minute.',
    lastMessageAt: new Date(now - 1000 * 60 * 12).toISOString(),
    unreadCount: 2,
  },
  {
    id: 'conv-2',
    participant: users['user-sam'],
    lastMessagePreview: 'Let’s sync tomorrow morning?',
    lastMessageAt: new Date(now - 1000 * 60 * 60 * 3).toISOString(),
    unreadCount: 0,
  },
  {
    id: 'conv-3',
    participant: users['user-jordan'],
    lastMessagePreview: 'Thanks for the quick turnaround!',
    lastMessageAt: new Date(now - 1000 * 60 * 60 * 26).toISOString(),
    unreadCount: 1,
  },
]

function msg(
  id: string,
  conversationId: string,
  senderId: string,
  text: string,
  minutesAgo: number,
): Message {
  return {
    id,
    conversationId,
    senderId,
    text,
    createdAt: new Date(now - 1000 * 60 * minutesAgo).toISOString(),
    status: 'delivered',
  }
}

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    msg('m-1', 'conv-1', 'user-alex', 'Hey! Are we still on for the review?', 45),
    msg('m-2', 'conv-1', CURRENT_USER_ID, 'Yes — wrapping up notes now.', 40),
    msg('m-3', 'conv-1', 'user-alex', 'Perfect. Need anything from design?', 35),
    msg(
      'm-4',
      'conv-1',
      CURRENT_USER_ID,
      'If you can drop the latest Figma link, that would help.',
      30,
    ),
    msg(
      'm-5',
      'conv-1',
      'user-alex',
      'Sounds good — I’ll send the doc in a minute.',
      12,
    ),
  ],
  'conv-2': [
    msg('m-6', 'conv-2', CURRENT_USER_ID, 'Did you get a chance to look at the metrics?', 200),
    msg(
      'm-7',
      'conv-2',
      'user-sam',
      'Yep — engagement is up week over week. Nice work.',
      195,
    ),
    msg('m-8', 'conv-2', CURRENT_USER_ID, 'Let’s sync tomorrow morning?', 190),
  ],
  'conv-3': [
    msg('m-9', 'conv-3', 'user-jordan', 'The prototype looks solid.', 1600),
    msg(
      'm-10',
      'conv-3',
      CURRENT_USER_ID,
      'Appreciate it! I’ll iterate on the empty states next.',
      1590,
    ),
    msg('m-11', 'conv-3', 'user-jordan', 'Thanks for the quick turnaround!', 1580),
  ],
}
