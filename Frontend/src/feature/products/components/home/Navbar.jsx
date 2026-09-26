import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const NAV_LINKS = [
  { label: 'Shop', to: '/' },
  { label: 'Collections', to: '/' },
  { label: 'Editorial', to: '/' },
  { label: 'About', to: '/' },
]

const Navbar = () => {
  const user = useSelector((state) => state.auth.user)
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    // Search UI only
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-sm' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-16 lg:px-24">
        
        {/* Mobile menu toggle (Left) */}
        <div className="flex flex-1 md:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            className={`flex h-10 w-10 items-center justify-start transition-colors focus:outline-none ${scrolled ? 'text-zinc-900' : 'text-white'}`}
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {/* Brand (Center on Mobile, Left on Desktop) */}
        <div className="flex flex-1 md:flex-none justify-center md:justify-start">
          <Link
            to="/"
            className={`shrink-0 text-2xl font-black uppercase tracking-[0.2em] transition-colors ${scrolled ? 'text-zinc-900' : 'text-white drop-shadow-md'}`}
          >
            Snitch
          </Link>
        </div>

        {/* Desktop nav (Center) */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={`${link.label}-${i}`}
              to={link.to}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all hover:opacity-100 ${
                scrolled ? 'text-zinc-500 hover:text-black' : 'text-white/70 hover:text-white drop-shadow-sm'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex flex-1 items-center justify-end gap-5">
          {/* Search (desktop) */}
          <form
            onSubmit={onSearch}
            role="search"
            className={`hidden lg:flex items-center transition-all ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="relative group">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-48 bg-transparent border-b border-zinc-300 py-1.5 pl-1 pr-6 text-xs text-zinc-900 placeholder-zinc-400 outline-none transition-all duration-300 focus:border-black focus:w-64"
              />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-zinc-400">
                <SearchIcon />
              </span>
            </div>
          </form>

          {/* Cart */}
          <button
            type="button"
            aria-label="Cart"
            className={`relative flex items-center justify-center transition-all hover:scale-110 focus:outline-none ${scrolled ? 'text-zinc-900' : 'text-white'}`}
          >
            <CartIcon />
            <span className={`absolute -right-2 -top-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold ${scrolled ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
              0
            </span>
          </button>

          {/* User area */}
          <div className="hidden md:flex items-center pl-2">
            {user ? (
              <div className="flex items-center gap-4">
                {user.role === 'seller' && (
                  <Link
                    to="/seller/dashboard"
                    className={`text-[11px] font-bold uppercase tracking-wider transition-colors ${scrolled ? 'text-zinc-500 hover:text-black' : 'text-white/70 hover:text-white'}`}
                  >
                    Dashboard
                  </Link>
                )}
                <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${scrolled ? 'bg-zinc-100 text-zinc-900' : 'bg-white/20 text-white backdrop-blur-md'}`}>
                  {(user.fullname || user.email || 'U').charAt(0).toUpperCase()}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className={`text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${scrolled ? 'text-zinc-500 hover:text-black' : 'text-white/80 hover:text-white'}`}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/register')}
                  className={`rounded-full px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] transition-transform hover:scale-105 ${scrolled ? 'bg-black text-white shadow-md' : 'bg-white text-black shadow-lg'}`}
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`absolute top-full left-0 w-full bg-white border-t border-zinc-100 transition-all duration-300 ease-in-out md:hidden ${mobileOpen ? 'max-h-screen opacity-100 shadow-xl' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-6 py-8 flex flex-col gap-8">
          <form onSubmit={onSearch} role="search" className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border-b border-zinc-200 py-3 pl-2 pr-10 text-sm text-zinc-900 placeholder-zinc-400 outline-none focus:border-black transition-colors"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400">
              <SearchIcon />
            </span>
          </form>

          <nav className="flex flex-col gap-6">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={`m-${link.label}-${i}`}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-black uppercase tracking-tighter text-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!user ? (
            <div className="flex flex-col gap-4 mt-4 pt-8 border-t border-zinc-100">
              <button
                type="button"
                onClick={() => { setMobileOpen(false); navigate('/login'); }}
                className="w-full rounded-full border border-zinc-200 py-3.5 text-xs font-bold uppercase tracking-widest text-zinc-900"
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => { setMobileOpen(false); navigate('/register'); }}
                className="w-full rounded-full bg-black py-3.5 text-xs font-bold uppercase tracking-widest text-white"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-8 border-t border-zinc-100">
              {user.role === 'seller' && (
                <Link
                  to="/seller/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-bold uppercase tracking-widest text-zinc-900"
                >
                  Seller Dashboard
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

const SearchIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const CartIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const MenuIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

export default Navbar
