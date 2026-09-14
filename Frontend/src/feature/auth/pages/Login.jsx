import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../Hook/useAuth'

const Login = () => {
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await handleLogin(form)
      navigate('/')
    } catch (err) {
      setError(
        err?.response?.data?.message || 'Invalid credentials. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#0B0C0E] text-zinc-100 antialiased lg:grid lg:grid-cols-2">
      {/* ===================== LEFT — glassmorphic hero ===================== */}
      <aside className="relative hidden overflow-hidden lg:block">
        {/* ambient gold/amber mesh glow */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_25%_25%,rgba(255,184,0,0.12),transparent_55%),radial-gradient(120%_120%_at_80%_85%,rgba(230,161,0,0.14),transparent_50%),linear-gradient(160deg,#0d0e12,#0b0c0e_60%,#08090b)]" />
        <div className="absolute -left-16 -top-16 h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.45),transparent_70%)] blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(230,161,0,0.4),transparent_70%)] blur-3xl" />

        {/* abstract 3D glass shards */}
        <div className="pointer-events-none absolute inset-0">
          <span className="absolute left-[28%] top-[22%] h-56 w-56 rotate-[18deg] rounded-[26px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md" />
          <span className="absolute left-[52%] top-[48%] h-36 w-36 -rotate-12 rounded-[40px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md" />
          <span className="absolute left-[20%] top-[36%] h-24 w-24 rotate-[30deg] rounded-[20px] border border-white/15 bg-gradient-to-br from-white/15 to-white/[0.02] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/40" />

        {/* hero text */}
        <span className="absolute left-14 top-14 text-lg font-medium uppercase tracking-[0.5em] text-white/90">
          Snitch
        </span>
        <div className="absolute inset-x-14 bottom-16 max-w-xl">
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-white xl:text-5xl">
            Reignite your presence.
            <br />
            <span className="text-amber-300 [text-shadow:0_0_18px_rgba(255,184,0,0.55),0_0_44px_rgba(255,184,0,0.35)]">
              Manage without limits.
            </span>
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-white/50">
            Step back into your workspace and pick up exactly where you left off.
          </p>
        </div>
      </aside>

      {/* ===================== RIGHT — floating glass login card ===================== */}
      <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8 lg:min-h-full">
        {/* soft ambient amber glow behind the card */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,184,0,0.18),transparent_62%)] blur-3xl" />

        <section className="relative w-full max-w-md rounded-2xl border border-white/5 bg-zinc-900/60 p-8 shadow-2xl shadow-amber-500/10 backdrop-blur-xl sm:p-10">
          <header className="mb-9 text-center">
            <span className="inline-block text-2xl font-bold uppercase tracking-[0.42em] text-white">
              Snitch
            </span>
            <p className="mt-3 text-sm text-zinc-500">
              Welcome back. Log in to your account.
            </p>
          </header>

          <form onSubmit={onSubmit} className="space-y-7">
            {/* Email */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="border-b border-zinc-800 bg-transparent py-2.5 text-[0.95rem] text-white caret-amber-400 placeholder-zinc-600 transition-colors duration-300 focus:border-amber-500 focus:outline-none [-webkit-text-fill-color:#fff] autofill:shadow-[0_0_0_1000px_#0B0C0E_inset] autofill:[transition:background-color_9999s_ease-in-out_0s]"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-xs font-semibold uppercase tracking-wider text-zinc-400"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/forgot-password')}
                  className="text-xs text-amber-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="w-full border-b border-zinc-800 bg-transparent py-2.5 pr-14 text-[0.95rem] text-white caret-amber-400 placeholder-zinc-600 transition-colors duration-300 focus:border-amber-500 focus:outline-none [-webkit-text-fill-color:#fff] autofill:shadow-[0_0_0_1000px_#0B0C0E_inset] autofill:[transition:background-color_9999s_ease-in-out_0s]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute inset-y-0 right-0 flex items-center text-[0.66rem] font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-amber-500"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            {/* CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full transform rounded-xl bg-gradient-to-r from-amber-600 to-amber-400 py-3 font-bold uppercase tracking-wider text-black shadow-lg shadow-amber-500/10 transition-all duration-300 hover:-translate-y-0.5 hover:from-amber-500 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Logging in…' : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-medium text-amber-500 hover:underline"
            >
              Sign up
            </button>
          </p>
        </section>
      </main>

      {/* ===================== viewport footer ===================== */}
      <span className="absolute bottom-4 left-6 text-[10px] tracking-widest text-zinc-600 uppercase">
        © {new Date().getFullYear()} Snitch
      </span>
      <span className="absolute bottom-4 right-6 text-[10px] tracking-widest text-zinc-600 uppercase">
        Privacy · Terms
      </span>
    </div>
  )
}

export default Login
