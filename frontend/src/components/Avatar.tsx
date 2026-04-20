import { cn } from '@/utils/cn'
import type { UserPresenceStatus } from '@/types'

export interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  status?: UserPresenceStatus
  className?: string
}

const sizeMap = {
  sm: 'size-9 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-14 text-base',
} as const

const statusColor: Record<UserPresenceStatus, string> = {
  online: 'bg-emerald-500',
  away: 'bg-amber-400',
  offline: 'bg-zinc-400 dark:bg-zinc-500',
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const a = parts[0]?.[0] ?? '?'
  const b = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (a + b).toUpperCase()
}

export function Avatar({
  name,
  src,
  size = 'md',
  status,
  className,
}: AvatarProps): React.ReactElement {
  return (
    <div
      className={cn('relative inline-flex shrink-0', className)}
      role="img"
      aria-label={status ? `${name}, ${status}` : name}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className={cn(
            'rounded-2xl object-cover ring-2 ring-surface-elevated',
            sizeMap[size],
          )}
        />
      ) : (
        <span
          className={cn(
            'flex items-center justify-center rounded-2xl bg-primary/15 font-semibold text-primary ring-2 ring-surface-elevated',
            sizeMap[size],
          )}
        >
          {initials(name)}
        </span>
      )}
      {status ? (
        <span
          className={cn(
            'absolute bottom-0 right-0 size-3 rounded-full ring-2 ring-surface-elevated',
            statusColor[status],
          )}
          title={status}
        />
      ) : null}
    </div>
  )
}
