import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover focus-visible:ring-2 focus-visible:ring-primary/40',
  secondary:
    'bg-surface-muted text-text shadow-sm hover:bg-border/80 dark:hover:bg-surface-muted/90',
  outline:
    'border border-border bg-transparent text-text hover:bg-surface-muted/60',
  ghost: 'bg-transparent text-text hover:bg-surface-muted/70',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-9 gap-1.5 rounded-lg px-3 text-sm',
  md: 'h-11 gap-2 rounded-xl px-4 text-sm font-medium',
  lg: 'h-12 gap-2 rounded-xl px-6 text-base font-medium',
}

const baseButtonClass =
  'inline-flex items-center justify-center transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50'

export function buttonClassName(options: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}): string {
  const { variant = 'primary', size = 'md', className } = options
  return cn(baseButtonClass, variantClasses[variant], sizeClasses[size], className)
}

export { variantClasses, sizeClasses, baseButtonClass }
