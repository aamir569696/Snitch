import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import useAuth from '../Hook/useAuth'
import './register.css'
import ContinueGoogle from '../components/ContinueGoogle'

const Register = () => {
  const { handleRegister } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    contact: '',
    password: '',
    isSeller: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await handleRegister(form)
      navigate('/')
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="snitch-auth">
      {/* ===================== LEFT — liquid gold hero ===================== */}
      <aside className="snitch-hero">
        <div className="snitch-silk" aria-hidden="true">
          <span className="snitch-silk__layer snitch-silk__layer--1" />
          <span className="snitch-silk__layer snitch-silk__layer--2" />
          <span className="snitch-silk__layer snitch-silk__layer--3" />
          <span className="snitch-silk__grain" />
        </div>

        {/* floating glass sculpture */}
        <div className="snitch-sculpture" aria-hidden="true">
          <span className="snitch-shard snitch-shard--a" />
          <span className="snitch-shard snitch-shard--b" />
          <span className="snitch-shard snitch-shard--c" />
        </div>

        <div className="snitch-hero__content">
          <span className="snitch-hero__brand">Snitch</span>

          <h1 className="snitch-hero__headline">
            Craft your presence.
            <br />
            <span className="snitch-hero__glow">Sell without limits.</span>
          </h1>
          <p className="snitch-hero__sub">
            A curated marketplace engineered for creators and sellers who expect
            more from every pixel, every interaction, every detail.
          </p>
        </div>
      </aside>

      {/* ===================== RIGHT — floating glass form ===================== */}
      <main className="snitch-stage">
        <div className="snitch-bloom" aria-hidden="true" />

        <section className="snitch-card">
          <header className="snitch-card__head">
            <span className="snitch-card__brand">Snitch</span>
            <p className="snitch-card__sub">Create your account</p>
          </header>

          <form onSubmit={onSubmit} className="snitch-form">
            <div className="snitch-grid">
              <Field
                id="fullname"
                label="Full Name"
                name="fullname"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={form.fullname}
                onChange={onChange}
              />
              <Field
                id="email"
                label="Email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={onChange}
              />
            </div>

            <Field
              id="contact"
              label="Contact Number"
              name="contact"
              type="tel"
              autoComplete="tel"
              placeholder="+92 555 000 0000"
              value={form.contact}
              onChange={onChange}
            />

            {/* Password */}
            <div className="snitch-field">
              <label htmlFor="password" className="snitch-label">
                Password
              </label>
              <div className="snitch-inputwrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={form.password}
                  onChange={onChange}
                  placeholder="••••••••"
                  className="snitch-input snitch-input--pw"
                />
                <span className="snitch-trail" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="snitch-pwtoggle"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Seller toggle */}
            <div className="snitch-seller">
              <div className="snitch-seller__text">
                <span className="snitch-seller__title">Register as a Seller</span>
                <span className="snitch-seller__hint">
                  Unlock the seller dashboard & product listings
                </span>
              </div>
              <label className="snitch-switch">
                <input
                  type="checkbox"
                  name="isSeller"
                  checked={form.isSeller}
                  onChange={onChange}
                  className="snitch-switch__input"
                />
                <span className="snitch-switch__track">
                  <span className="snitch-switch__thumb" />
                </span>
              </label>
            </div>

            {error && (
              <p className="snitch-error" role="alert">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="snitch-cta">
              <span className="snitch-cta__label">
                {loading ? 'Creating Account…' : 'Create Account'}
              </span>
            </button>



          </form>

         

          <div className="snitch-divider">



            <span>or</span>
          </div>

         <ContinueGoogle />
 
          <p className="snitch-switchlink">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="snitch-link"
            >
              Log in
            </button>

 

          </p>
        </section>
      </main>

      {/* ===================== footer pinned to viewport corners ===================== */}
      <footer className="snitch-footer">
        <span className="snitch-footer__left">© {new Date().getFullYear()} Snitch</span>
        <span className="snitch-footer__right">Privacy · Terms</span>
      </footer>
    </div>
  )
}

const Field = ({ id, label, ...props }) => (
  <div className="snitch-field">
    <label htmlFor={id} className="snitch-label">
      {label}
    </label>
    <div className="snitch-inputwrap">
      <input id={id} required className="snitch-input" {...props} />
      <span className="snitch-trail" aria-hidden="true" />
    </div>
  </div>
)

export default Register
