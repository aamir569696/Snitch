import React, { useState } from 'react'
import { useNavigate } from 'react-router'

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
  const symbol = CURRENCY_SYMBOL[price.currency] || `${price.currency || ''} `
  const amount = Number(price.amount ?? 0).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  return `${symbol}${amount}`
}

/**
 * Reusable product card. Uses images[0].url, price.amount/currency, and _id.
 * Clicking anywhere on the card navigates to /productdetail/:productId.
 * An optional `onSelect(product)` overrides the default navigation.
 */
const ProductCard = ({ product, onSelect }) => {
  const [imgError, setImgError] = useState(false)
  const navigate = useNavigate()
  const cover = product?.images?.[0]?.url

  const handleActivate = () => {
    if (onSelect) {
      onSelect(product)
      return
    }
    if (product?._id) navigate(`/productdetail/${product._id}`)
  }

  return (
    <article
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product?.title || 'product'}`}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleActivate()
        }
      }}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100">
        {cover && !imgError ? (
          <img
            src={cover}
            alt={product.title || 'Product'}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300">
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
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-1 text-sm font-semibold text-zinc-900">
          {product.title || 'Untitled product'}
        </h3>
        <p className="mt-1 line-clamp-2 flex-1 text-xs leading-relaxed text-zinc-500">
          {product.description || 'No description available.'}
        </p>

        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-bold text-zinc-900">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-medium text-zinc-500">
            {product.price?.currency}
          </span>
        </div>

        <span className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-zinc-200 py-2 text-xs font-semibold text-zinc-700 transition-colors duration-200 group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white">
          View Details
        </span>
      </div>
    </article>
  )
}

export default ProductCard
