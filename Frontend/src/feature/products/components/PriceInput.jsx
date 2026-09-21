import React, { useEffect, useRef, useState } from 'react'

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'PKR', symbol: '₨' },
  { code: 'EUR', symbol: '€' },
  { code: 'GBP', symbol: '£' },
  { code: 'AED', symbol: 'د.إ' },
  { code: 'INR', symbol: '₹' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
]

/**
 * Stripe-style unified price control: amount + custom currency dropdown
 * merged into a single bordered group with a subtle divider.
 * Presentational only — value/onChange owned by the parent form.
 */
const PriceInput = ({
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  error,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const active = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0]

  useEffect(() => {
    const onClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const handleAmount = (e) => {
    const raw = e.target.value
    if (raw === '' || /^\d*\.?\d{0,2}$/.test(raw)) onAmountChange(raw)
  }

  return (
    <div
      ref={ref}
      className={`relative flex h-12 items-stretch overflow-visible rounded-xl border bg-zinc-800/50 transition-all duration-200 focus-within:ring-2 focus-within:ring-amber-500/40 ${
        error
          ? 'border-red-500/50'
          : 'border-zinc-700 focus-within:border-amber-500'
      }`}
    >
      {/* symbol */}
      <span className="flex select-none items-center pl-4 pr-1 text-sm font-medium text-zinc-500">
        {active.symbol}
      </span>

      {/* amount */}
      <input
        id="price-amount"
        name="price-amount"
        type="text"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0.00"
        value={amount}
        onChange={handleAmount}
        aria-invalid={!!error}
        aria-describedby={error ? 'price-error' : undefined}
        className="w-full bg-transparent px-2 text-sm text-white placeholder-zinc-500 outline-none"
      />

      {/* divider */}
      <span className="my-2 w-px bg-zinc-700" aria-hidden="true" />

      {/* custom currency dropdown */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Currency: ${active.code}`}
        className="flex items-center gap-1.5 rounded-r-xl px-4 text-sm font-medium text-zinc-200 transition-colors duration-200 hover:bg-zinc-700/40 focus:outline-none focus-visible:bg-zinc-700/40"
      >
        {active.code}
        <svg
          className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select currency"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-20 max-h-60 w-32 overflow-auto rounded-xl border border-zinc-700 bg-zinc-900 p-1.5 shadow-2xl shadow-black/40"
        >
          {CURRENCIES.map((c) => {
            const selected = c.code === currency
            return (
              <li key={c.code} role="option" aria-selected={selected}>
                <button
                  type="button"
                  onClick={() => {
                    onCurrencyChange(c.code)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors duration-150 ${
                    selected
                      ? 'bg-amber-500/15 text-amber-300'
                      : 'text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <span>{c.code}</span>
                  <span className="text-zinc-500">{c.symbol}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default PriceInput
