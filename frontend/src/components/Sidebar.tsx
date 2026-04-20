import { cn } from '@/utils/cn'
import { formatConversationTime } from '@/utils/formatTime'
import { Avatar } from '@/components/Avatar'
import { NotificationBadge } from '@/components/NotificationBadge'
import type { Conversation } from '@/types'

export interface SidebarProps {
  conversations: Conversation[]
  activeConversationId: string | null
  onSelect: (id: string) => void
  className?: string
  /** When set, show a dimmed overlay behind panel (mobile sheet). */
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({
  conversations,
  activeConversationId,
  onSelect,
  className,
  mobileOpen,
  onMobileClose,
}: SidebarProps): React.ReactElement {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] md:hidden"
          aria-label="Close conversations"
          onClick={onMobileClose}
        />
      ) : null}
      <aside
        className={cn(
          'flex h-full min-h-0 w-full flex-col border-border bg-surface-elevated shadow-card transition-transform duration-200 md:max-w-sm md:border-r md:shadow-none',
          'fixed inset-y-0 left-0 z-50 w-[min(100%,20rem)] md:static md:z-auto md:w-full md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className,
        )}
      >
        <div className="border-b border-border px-4 py-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Messages
          </h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-2" aria-label="Conversations">
          <ul className="space-y-1">
            {conversations.map((c) => {
              const active = c.id === activeConversationId
              return (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => {
                      onSelect(c.id)
                      onMobileClose?.()
                    }}
                    className={cn(
                      'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      active
                        ? 'bg-primary/10 ring-1 ring-primary/25'
                        : 'hover:bg-surface-muted',
                    )}
                  >
                    <Avatar
                      name={c.participant.name}
                      src={c.participant.avatarUrl}
                      size="md"
                      status={c.participant.status}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-medium text-text">
                          {c.participant.name}
                        </span>
                        <span className="shrink-0 text-[11px] text-text-muted tabular-nums">
                          {formatConversationTime(c.lastMessageAt)}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center justify-between gap-2">
                        <span className="truncate text-sm text-text-muted">
                          {c.lastMessagePreview}
                        </span>
                        <NotificationBadge count={c.unreadCount} />
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
    </>
  )
}
