'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import HennaLogo from '@/components/HennaLogo'

export default function AdminLogin({ configured }: { configured: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).catch(() => null)
    const json = await res?.json().catch(() => ({}))
    setBusy(false)
    if (!res?.ok) {
      setError(json?.error ?? 'Could not log in. Please check your connection.')
      return
    }
    setPassword('')
    router.refresh()
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-henna">
        <div className="max-w-sm mx-auto bg-ivory rounded-3xl border border-gold/30 shadow-card p-8">
          <div className="flex justify-center mb-6">
            <HennaLogo size="md" href="" />
          </div>
          <h1 className="font-heading text-2xl font-semibold text-chocolate text-center mb-1">Shop Dashboard</h1>
          <p className="font-body text-sm text-chocolate/55 text-center mb-7">Manage products, prices and delivery fees.</p>

          {configured ? (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label htmlFor="admin-password" className="font-body text-sm font-medium text-chocolate block mb-1.5">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="input-henna"
                  required
                />
              </div>
              {error && <p className="font-body text-sm text-rose-red" role="alert">{error}</p>}
              <button type="submit" disabled={busy || !password} className="btn-primary w-full justify-center disabled:opacity-60">
                {busy ? 'Checking...' : 'Log in'}
              </button>
            </form>
          ) : (
            <p className="font-body text-sm text-chocolate/70 leading-relaxed bg-cream border border-gold/30 rounded-xl p-4">
              The dashboard is not switched on yet. Add an <strong>ADMIN_PASSWORD</strong> of at least 8 characters in
              Vercel (Settings, Environment Variables), then redeploy.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
