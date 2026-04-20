import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftAddon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, label, error, hint, leftAddon, id, ...props },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? props.name ?? autoId

  return (
    <div className="w-full space-y-1.5 text-left">
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-text"
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-stretch overflow-hidden rounded-xl border border-border bg-surface-elevated shadow-sm transition-colors',
          'focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25',
          error && 'border-red-500/80 focus-within:border-red-500 focus-within:ring-red-500/25',
        )}
      >
        {leftAddon ? (
          <span className="flex items-center border-r border-border bg-surface-muted px-3 text-text-muted">
            {leftAddon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'min-h-11 w-full flex-1 bg-transparent px-3 py-2 text-sm text-text placeholder:text-text-muted',
            'disabled:cursor-not-allowed disabled:opacity-60',
            className,
          )}
          aria-invalid={error ? true : undefined}
          aria-describedby={
            error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
          }
          {...props}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
})
