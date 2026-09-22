import React, { useState } from 'react'

const CURRENCY_SYMBOL = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  PKR: '₨',
  INR: '₹',
  AED: 'د.إ',
  CAD: 'C$',
  AUD: 'A$',
}

const formatPrice = (price) => {
  if (!price) return '—'
  const symbol = CURRENCY_SYMBOL[price.currency] || price.currency || ''
  const amount = Number(price.amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return `${symbol}${amount}`
}

const formatDate = (iso) => {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

/**
 * Presentational product card for the seller dashboard grid.
 */
const ProductCard = ({ product }) => {
  const images = product?.images || []
  const [imgError, setImgError] = useState(false)
  const cover = images[0]?.url

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-black/40">
      {/* Cover image */}
      <div className="relative aspect-4/3 overflow-hidden bg-zinc-800">
        {cover && !imgError ? (
          <img
            src={cover}
            alt={product.title || 'Product image'}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-600">
            <svg
              className="h-10 w-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* image count badge */}
        {images.length > 1 && (
          <span className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white backdrop-blur-sm">
            <svg
              className="h-3 w-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            {images.length}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-1 flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold text-white">
            {product.title || 'Untitled product'}
          </h3>
          <span className="shrink-0 rounded-lg bg-amber-500/10 px-2 py-0.5 text-sm font-bold text-amber-400">
            {formatPrice(product.price)}
          </span>
        </div>

        <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-400">
          {product.description || 'No description provided.'}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3">
          <span className="text-xs text-zinc-500">
            {formatDate(product.createdAt)}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
