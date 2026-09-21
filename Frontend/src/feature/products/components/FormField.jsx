import React from 'react'

/**
 * Reusable label + control wrapper with consistent spacing,
 * optional helper text and an animated error message.
 * Purely presentational.
 */
const FormField = ({
  id,
  label,
  error,
  helper,
  required = false,
  labelAddon = null,
  children,
}) => {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-3">
        <label
          htmlFor={id}
          className="text-sm font-medium text-zinc-200"
        >
          {label}
          {required && <span className="ml-0.5 text-amber-400">*</span>}
        </label>
        {labelAddon}
      </div>

      {children}

      {helper && !error && (
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{helper}</p>
      )}

      <div
        className={`grid overflow-hidden transition-all duration-200 ${
          error ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="min-h-0">
          <p
            className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400"
            role="alert"
          >
            <svg
              className="h-3.5 w-3.5 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </p>
        </div>
      </div>
    </div>
  )
}

export default FormField
