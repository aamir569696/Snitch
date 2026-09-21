import React, { useEffect, useState } from 'react'

/**
 * Self-dismissing toast, top-right. Presentational only.
 * `type` is 'success' | 'error'. Calls onClose after the duration.
 */
const Toast = ({ type = 'success', message, onClose, duration = 4000 }) => {
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLeaving(true), duration)
    return () => clearTimeout(t)
  }, [duration])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(() => onClose?.(), 250)
    return () => clearTimeout(t)
  }, [leaving, onClose])

  const isSuccess = type === 'success'

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 top-4 z-50 flex w-[calc(100vw-2rem)] max-w-sm items-start gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-md transition-all duration-250 sm:right-6 sm:top-6 ${
        leaving
          ? 'translate-x-4 opacity-0'
          : 'translate-x-0 opacity-100'
      } ${
        isSuccess
          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200'
          : 'border-red-500/30 bg-red-500/10 text-red-200'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
          isSuccess ? 'bg-emerald-500/20' : 'bg-red-500/20'
        }`}
      >
        {isSuccess ? (
          <svg
            className="h-3.5 w-3.5 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            className="h-3.5 w-3.5 text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </span>

      <p className="flex-1 text-sm leading-relaxed">{message}</p>

      <button
        type="button"
        onClick={() => setLeaving(true)}
        aria-label="Dismiss notification"
        className="-mr-1 -mt-1 rounded-lg p-1 text-zinc-400 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
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
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  )
}

export default Toast
