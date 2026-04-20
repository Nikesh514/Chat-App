import { Link, NavLink } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/utils/constants'
import { cn } from '@/utils/cn'
import { Button } from '@/components/Button'
import { useTheme } from '@/store/ThemeContext'

const pillNavLink = ({ isActive }: { isActive: boolean }): string =>
  cn(
    'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'bg-surface-elevated text-text shadow-sm ring-1 ring-border/90 dark:bg-white/[0.12] dark:text-text dark:ring-white/10'
      : 'text-text-muted hover:bg-surface-muted/80 hover:text-text dark:hover:bg-white/[0.06]',
  )

const compactNavLink = ({ isActive }: { isActive: boolean }): string =>
  cn(
    'rounded-lg px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors sm:text-sm sm:normal-case sm:tracking-normal sm:font-medium',
    isActive
      ? 'bg-primary/15 text-primary'
      : 'text-text-muted hover:bg-surface-muted/70 hover:text-text',
  )

export function Navbar(): React.ReactElement {
  const { resolved, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface-elevated/90 shadow-[0_1px_0_0_oklch(0_0_0/0.04)] backdrop-blur-xl dark:bg-[oklch(0.1_0.005_260/0.92)] dark:shadow-[0_1px_0_0_oklch(1_0_0/0.06)]">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 sm:gap-6 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 justify-start">
          <Link
            to={ROUTES.HOME}
            className="flex min-w-0 items-center gap-3 text-text transition-opacity hover:opacity-90"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/12 text-base font-bold text-primary ring-1 ring-primary/20 dark:bg-primary/18 dark:ring-primary/25">
              P
            </span>
            <span className="hidden truncate text-base font-semibold tracking-tight sm:inline sm:text-[1.05rem]">
              {APP_NAME}
            </span>
          </Link>
        </div>

        <nav
          className="hidden flex-none items-center md:flex"
          aria-label="Main"
        >
          <div className="flex items-center gap-0.5 rounded-full border border-border/90 bg-surface-muted/55 p-1 dark:border-white/10 dark:bg-white/[0.05]">
            <NavLink to={ROUTES.HOME} className={pillNavLink} end>
              Home
            </NavLink>
            <NavLink to={ROUTES.CHAT} className={pillNavLink}>
              Chat
            </NavLink>
            <NavLink to={ROUTES.LOGIN} className={pillNavLink}>
              Login
            </NavLink>
          </div>
        </nav>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav
            className="mr-1 flex items-center gap-1 sm:mr-0 md:hidden"
            aria-label="Main mobile"
          >
            <NavLink to={ROUTES.HOME} className={compactNavLink} end>
              Home
            </NavLink>
            <NavLink to={ROUTES.CHAT} className={compactNavLink}>
              Chat
            </NavLink>
            <NavLink to={ROUTES.LOGIN} className={compactNavLink}>
              Login
            </NavLink>
          </nav>

          <Button
            type="button"
            variant="ghost"
            className="!h-10 !w-10 !min-w-0 shrink-0 gap-0 !rounded-xl !px-0 !py-0 hover:bg-surface-muted/90 dark:hover:bg-white/[0.08] sm:!h-9 sm:!w-9"
            onClick={toggleTheme}
            aria-label={resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolved === 'dark' ? (
              <SunIcon className="size-[1.35rem]" />
            ) : (
              <MoonIcon className="size-[1.35rem]" />
            )}
          </Button>

          <Link
            to={ROUTES.CHAT}
            className={cn(
              'hidden h-10 shrink-0 items-center justify-center rounded-xl px-5 text-sm font-semibold shadow-sm transition-colors sm:inline-flex',
              'bg-primary text-primary-foreground hover:bg-primary-hover',
              'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
            )}
          >
            Open chat
          </Link>
        </div>
      </div>
    </header>
  )
}

function SunIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }): React.ReactElement {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  )
}
