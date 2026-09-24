import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/' },
  { label: 'New Arrivals', to: '/' },
  { label: 'About', to: '/' },
]

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')

  const onSearch = (e) => {
    e.preventDefault()
    // Search UI only — wiring to a search route can be added later.
  }

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          className="shrink-0 text-lg font-bold uppercase tracking-[0.25em] text-zinc-900"
        >
          Snitch
        </Link>

        {/* Desktop nav */}
        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={`${link.label}-${i}`}
              to={link.to}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search (desktop) */}
        <form
          onSubmit={onSearch}
          role="search"
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              aria-label="Search products"
              className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-200 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-900/10"
            />
          </div>
        </form>

        {/* Right cluster */}
        <div className="ml-auto flex items-center gap-1 md:ml-4">
          {/* Cart */}
          <button
            type="button"
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40"
          >
            <CartIcon />
            <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-zinc-900 px-1 text-[10px] font-bold text-white">
              0
            </span>
          </button>

          {/* User area */}
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === 'seller' && (
                <Link
                  to="/seller/dashboard"
                  className="hidden rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 sm:inline-block"
                >
                  Dashboard
                </Link>
              )}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                {(user.fullname || user.email || 'U').charAt(0).toUpperCase()}
              </span>
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:text-zinc-900"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
              >
                Sign up
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-700 transition-colors hover:bg-zinc-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 md:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <div className="space-y-4 px-4 py-4 sm:px-6">
            <form onSubmit={onSearch} role="search" className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                <SearchIcon />
              </span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:bg-white"
              />
            </form>

            <nav className="flex flex-col">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={`m-${link.label}-${i}`}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {!user && (
              <div className="flex gap-2 border-t border-zinc-200 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="flex-1 rounded-lg border border-zinc-200 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className="flex-1 rounded-lg bg-zinc-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

const SearchIcon = () => (
  <svg
    className="h-4 w-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const CartIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const MenuIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default Navbar
