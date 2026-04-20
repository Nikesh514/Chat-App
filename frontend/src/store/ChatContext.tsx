import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { sendMessageMock } from '@/services/chatService'
import {
  INITIAL_CONVERSATIONS,
  INITIAL_MESSAGES,
} from '@/services/mockChatData'
import { CURRENT_USER_ID } from '@/utils/constants'
import type { Conversation, Message } from '@/types'

interface ChatState {
  conversations: Conversation[]
  messagesByConversation: Record<string, Message[]>
  activeConversationId: string | null
}

type ChatAction =
  | { type: 'SELECT_CONVERSATION'; id: string }
  | { type: 'ADD_MESSAGE'; conversationId: string; message: Message }
  | { type: 'MARK_READ'; conversationId: string }

const initialState: ChatState = {
  conversations: INITIAL_CONVERSATIONS,
  messagesByConversation: INITIAL_MESSAGES,
  activeConversationId: INITIAL_CONVERSATIONS[0]?.id ?? null,
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SELECT_CONVERSATION':
      return { ...state, activeConversationId: action.id }
    case 'ADD_MESSAGE': {
      const { conversationId, message } = action
      const prev = state.messagesByConversation[conversationId] ?? []
      const preview =
        message.text.length > 80 ? `${message.text.slice(0, 80)}…` : message.text
      const updated = state.conversations.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              lastMessagePreview: preview,
              lastMessageAt: message.createdAt,
              unreadCount:
                message.senderId === CURRENT_USER_ID
                  ? 0
                  : c.id === state.activeConversationId
                    ? 0
                    : c.unreadCount + 1,
            }
          : c,
      )
      const conversations = [...updated].sort(
        (a, b) =>
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime(),
      )
      return {
        ...state,
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: [...prev, message],
        },
        conversations,
      }
    }
    case 'MARK_READ': {
      const conversations = state.conversations.map((c) =>
        c.id === action.conversationId ? { ...c, unreadCount: 0 } : c,
      )
      return { ...state, conversations }
    }
    default:
      return state
  }
}

interface ChatContextValue {
  conversations: Conversation[]
  messagesByConversation: Record<string, Message[]>
  activeConversationId: string | null
  activeConversation: Conversation | null
  selectConversation: (id: string) => void
  sendText: (conversationId: string, text: string) => Promise<void>
  markConversationRead: (conversationId: string) => void
}

const ChatContext = createContext<ChatContextValue | null>(null)

export function ChatProvider({ children }: { children: ReactNode }): React.ReactElement {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const activeConversation =
    state.conversations.find((c) => c.id === state.activeConversationId) ?? null

  const selectConversation = useCallback((id: string) => {
    dispatch({ type: 'SELECT_CONVERSATION', id })
    dispatch({ type: 'MARK_READ', conversationId: id })
  }, [])

  const sendText = useCallback(async (conversationId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const message = await sendMessageMock(conversationId, trimmed)
    dispatch({ type: 'ADD_MESSAGE', conversationId, message })
  }, [])

  const markConversationRead = useCallback((conversationId: string) => {
    dispatch({ type: 'MARK_READ', conversationId })
  }, [])

  const value = useMemo(
    () => ({
      conversations: state.conversations,
      messagesByConversation: state.messagesByConversation,
      activeConversationId: state.activeConversationId,
      activeConversation,
      selectConversation,
      sendText,
      markConversationRead,
    }),
    [
      state.conversations,
      state.messagesByConversation,
      state.activeConversationId,
      activeConversation,
      selectConversation,
      sendText,
      markConversationRead,
    ],
  )

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export function useChat(): ChatContextValue {
  const ctx = useContext(ChatContext)
  if (!ctx) {
    throw new Error('useChat must be used within ChatProvider')
  }
  return ctx
}
