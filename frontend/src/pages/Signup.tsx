import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { ROUTES } from '@/utils/constants'

export function Signup(): React.ReactElement {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault()
    setError(null)
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in name, email, and password.')
      return
    }
    if (password.length < 8) {
      setError('Use at least 8 characters for your password.')
      return
    }
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      navigate(ROUTES.CHAT, { replace: true })
    }, 500)
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-border bg-surface-elevated p-8 shadow-soft">
      <h1 className="text-2xl font-semibold tracking-tight text-text">Create your account</h1>
      <p className="mt-2 text-sm text-text-muted">
        Quick signup — mock only; data stays in this browser session.
      </p>

      <form className="mt-8 space-y-4" onSubmit={onSubmit} noValidate>
        <Input
          name="name"
          label="Name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jordan Lee"
        />
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="At least 8 characters"
          hint="Minimum 8 characters."
        />
        {error ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" variant="primary" className="w-full" isLoading={loading}>
          Sign up
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-medium text-primary hover:text-primary-hover"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}
