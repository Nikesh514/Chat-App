import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ROUTES } from '@/utils/constants'

export function Login(): React.ReactElement {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate(ROUTES.CHAT, { replace: true })
    }, 450)
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft">
      <h1 className="text-2xl font-semibold tracking-tight text-text">Welcome back</h1>
      <p className="mt-2 text-sm text-text-muted">
        Sign in to continue. This demo accepts any non-empty credentials.
      </p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        No account?{' '}
        <Link
          to={ROUTES.SIGNUP}
          className="font-medium text-primary hover:text-primary-hover"
        >
          Create one
        </Link>
      </p>
    </div>
  )
}
