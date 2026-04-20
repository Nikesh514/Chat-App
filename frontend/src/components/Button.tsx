import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import {
  baseButtonClass,
  sizeClasses,
  variantClasses,
  type ButtonSize,
  type ButtonVariant,
} from '@/utils/buttonStyles'
import { cn } from '@/utils/cn'

export type { ButtonSize, ButtonVariant }

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    disabled,
    leftIcon,
    rightIcon,
    children,
    type = 'button',
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled ?? isLoading}
      className={cn(baseButtonClass, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {isLoading ? (
        <span
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden
        />
      ) : (
        leftIcon
      )}
      {children}
      {!isLoading && rightIcon}
    </button>
  )
})
