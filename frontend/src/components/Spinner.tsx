import { cn } from '@/utils/cn'

export interface SpinnerProps {
  className?: string
  label?: string
}

export function Spinner({
  className,
  label = 'Loading',
}: SpinnerProps): React.ReactElement {
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-3', className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span
        className="size-10 animate-spin rounded-full border-2 border-border border-t-primary"
        aria-hidden
      />
      <span className="sr-only">{label}</span>
    </div>
  )
}
