import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatBubble } from '@/components/ChatBubble'
import { Button } from '@/components/Button'
import { Avatar } from '@/components/Avatar'
import { Input } from '@/components/Input'
import { Sidebar } from '@/components/Sidebar'
import { Spinner } from '@/components/Spinner'
import { TypingIndicator } from '@/components/TypingIndicator'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useChat } from '@/store/ChatContext'
import { CURRENT_USER_ID } from '@/utils/constants'

export function ChatPage(): React.ReactElement {
  const {
    conversations,
    messagesByConversation,
    activeConversationId,
    activeConversation,
    selectConversation,
    sendText,
  } = useChat()

  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showTyping, setShowTyping] = useState(false)

  const bottomRef = useRef<HTMLDivElement>(null)
  const isMd = useMediaQuery('(min-width: 768px)')

  const messages = activeConversationId
    ? (messagesByConversation[activeConversationId] ?? [])
    : []

  const scrollToBottom = useCallback((): void => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, activeConversationId, showTyping, scrollToBottom])

  useEffect(() => {
    if (!activeConversationId) return
    const timers: ReturnType<typeof window.setTimeout>[] = []
    timers.push(window.setTimeout(() => setShowTyping(false), 0))
    timers.push(window.setTimeout(() => setShowTyping(true), 600))
    timers.push(window.setTimeout(() => setShowTyping(false), 3200))
    return () => {
      timers.forEach((id) => window.clearTimeout(id))
    }
  }, [activeConversationId])

  useEffect(() => {
    if (!isMd) return
    const id = window.requestAnimationFrame(() => {
      setSidebarOpen(false)
    })
    return () => window.cancelAnimationFrame(id)
  }, [isMd])

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    if (!activeConversationId || !draft.trim() || sending) return
    setSending(true)
    try {
      await sendText(activeConversationId, draft)
      setDraft('')
    } finally {
      setSending(false)
    }
  }

  if (!activeConversation) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <Spinner label="Loading conversations" />
      </div>
    )
  }

  const peer = activeConversation.participant
  const statusLabel =
    peer.status === 'online'
      ? 'Online'
      : peer.status === 'away'
        ? 'Away'
        : 'Offline'

  return (
    <div className="flex min-h-[calc(100svh-4rem)] flex-1 overflow-hidden bg-surface">
      <Sidebar
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelect={selectConversation}
        mobileOpen={sidebarOpen}
        onMobileClose={() => setSidebarOpen(false)}
      />

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center gap-3 border-b border-border bg-surface-elevated/95 px-3 py-3 backdrop-blur-md sm:px-4">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="md:hidden"
            aria-label="Open conversations"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="size-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </Button>
          <Avatar name={peer.name} src={peer.avatarUrl} size="md" status={peer.status} />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-semibold text-text">{peer.name}</h1>
            <p className="text-xs text-text-muted">{statusLabel}</p>
          </div>
        </header>

        <div
          className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4 sm:px-6"
          role="log"
          aria-live="polite"
          aria-relevant="additions"
        >
          {messages.map((m) => (
            <ChatBubble
              key={m.id}
              message={m}
              isOwn={m.senderId === CURRENT_USER_ID}
            />
          ))}
          {showTyping ? <TypingIndicator displayName={peer.name} /> : null}
          <div ref={bottomRef} />
        </div>

        <form
          onSubmit={(e) => {
            void onSubmit(e)
          }}
          className="border-t border-border bg-surface-elevated/90 p-3 backdrop-blur-md sm:p-4"
        >
          <div className="mx-auto flex max-w-4xl min-w-0 gap-2">
            <div className="min-w-0 flex-1">
              <Input
                name="message"
                placeholder="Write a message…"
                autoComplete="off"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                className="min-h-12 rounded-2xl"
                aria-label="Message"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              className="shrink-0 rounded-2xl px-5"
              isLoading={sending}
              disabled={!draft.trim()}
            >
              Send
            </Button>
          </div>
        </form>
      </section>
    </div>
  )
}
