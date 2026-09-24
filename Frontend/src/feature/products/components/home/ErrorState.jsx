import React from 'react'

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-20 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
      <svg
        className="h-8 w-8 text-red-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-zinc-900">
      Something went wrong
    </h2>
    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
      We couldn't load the products right now. Please try again in a moment.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-6 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-zinc-900 px-5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2"
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
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </svg>
      Retry
    </button>
  </div>
)

export default ErrorState
