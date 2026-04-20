import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export interface TypingIndicatorProps {
  displayName: string
  className?: string
}

export function TypingIndicator({
  displayName,
  className,
}: TypingIndicatorProps): React.ReactElement {
  return (
    <div
      className={cn('flex w-full justify-start', className)}
      role="status"
      aria-live="polite"
      aria-label={`${displayName} is typing`}
    >
      <div className="flex items-center gap-3 rounded-2xl rounded-bl-md bg-surface-muted px-4 py-3 shadow-card">
        <div className="flex gap-1" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="size-2 rounded-full bg-text-muted"
              animate={{ y: [0, -4, 0], opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        <span className="text-xs text-text-muted">{displayName} is typing…</span>
      </div>
    </div>
  )
}
