import { cn } from '@/utils/cn'

export interface NotificationBadgeProps {
  count: number
  className?: string
}

export function NotificationBadge({
  count,
  className,
}: NotificationBadgeProps): React.ReactElement | null {
  if (count <= 0) return null
  const label = count > 99 ? '99+' : String(count)
  return (
    <span
      className={cn(
        'inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 py-0.5 text-[10px] font-semibold leading-none text-primary-foreground',
        className,
      )}
      aria-label={`${count} unread messages`}
    >
      {label}
    </span>
  )
}
