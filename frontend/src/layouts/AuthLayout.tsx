import { Link, Outlet } from 'react-router-dom'
import { APP_NAME, ROUTES } from '@/utils/constants'

export function AuthLayout(): React.ReactElement {
  return (
    <div className="flex min-h-svh flex-col bg-surface">
      <header className="border-b border-border/80 bg-surface-elevated/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
          <Link
            to={ROUTES.HOME}
            className="text-sm font-medium text-text-muted transition-colors hover:text-text"
          >
            ← Back to {APP_NAME}
          </Link>
          <Link
            to={ROUTES.CHAT}
            className="text-sm font-medium text-primary hover:text-primary-hover"
          >
            Try chat
          </Link>
        </div>
      </header>
      <div className="flex flex-1 items-center justify-center p-4">
        <Outlet />
      </div>
    </div>
  )
}
