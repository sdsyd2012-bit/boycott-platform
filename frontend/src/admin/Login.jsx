import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { login } from './adminApi.js'
import { Button, Field, TextInput, Spinner } from './ui.jsx'
import { FlagIcon } from '../components/icons.jsx'

export default function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(username.trim(), password)
    setLoading(false)
    if (result.ok) {
      navigate('/admin', { replace: true })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-white/10 dark:bg-slate-900">
          <div className="border-b border-slate-200/70 bg-slate-50 px-8 py-7 text-center dark:border-white/10 dark:bg-slate-950/50">
            <Link
              to="/"
              className="mx-auto flex w-fit items-center gap-2.5"
              title="العودة إلى الموقع"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900">
                <FlagIcon className="h-6 w-auto" />
              </span>
              <span className="font-display text-xl font-bold text-slate-900 dark:text-white">
                دليل البدائل
              </span>
            </Link>
            <h1 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
              لوحة التحكم
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              سجّل دخولك لإدارة المنتجات والمقالات والفيديوهات.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-8 py-7">
            {error && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                {error}
              </div>
            )}

            <Field label="اسم المستخدم">
              <TextInput
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                autoComplete="username"
                required
                autoFocus
              />
            </Field>

            <Field label="كلمة المرور">
              <TextInput
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </Field>

            <Button type="submit" disabled={loading} className="w-full py-3">
              {loading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  جارِ الدخول…
                </>
              ) : (
                'دخول إلى لوحة التحكم'
              )}
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
          <Link to="/" className="font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400">
            ← العودة إلى الموقع
          </Link>
        </p>
      </div>
    </div>
  )
}
