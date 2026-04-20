import { formatMessageTime } from '@/utils/formatTime'
import { cn } from '@/utils/cn'
import type { Message } from '@/types'

export interface ChatBubbleProps {
  message: Message
  isOwn: boolean
}

export function ChatBubble({ message, isOwn }: ChatBubbleProps): React.ReactElement {
  return (
    <div
      className={cn('flex w-full', isOwn ? 'justify-end' : 'justify-start')}
    >
      <div
        className={cn(
          'max-w-[min(100%,28rem)] rounded-2xl px-4 py-2.5 text-sm shadow-card',
          isOwn
            ? 'rounded-br-md bg-primary text-primary-foreground'
            : 'rounded-bl-md bg-surface-muted text-text',
        )}
      >
        <p className="whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
        <p
          className={cn(
            'mt-1 text-[11px] tabular-nums',
            isOwn ? 'text-primary-foreground/75' : 'text-text-muted',
          )}
        >
          <time dateTime={message.createdAt}>{formatMessageTime(message.createdAt)}</time>
          {isOwn && message.status === 'sending' ? (
            <span className="ml-2 opacity-80">Sending…</span>
          ) : null}
        </p>
      </div>
    </div>
  )
}
