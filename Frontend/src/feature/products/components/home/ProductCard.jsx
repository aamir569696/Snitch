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
 * Reusable premium product card.
 */
const ProductCard = ({ product, onSelect }) => {
  const [imgError, setImgError] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const navigate = useNavigate()
  const cover = product?.images?.[0]?.url

  const handleActivate = () => {
    if (onSelect) {
      onSelect(product)
      return
    }
    if (product?._id) navigate(`/productdetail/${product._id}`)
  }

  const toggleWishlist = (e) => {
    e.stopPropagation()
    setIsWishlisted(!isWishlisted)
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
      className="group flex cursor-pointer flex-col focus:outline-none"
    >
      {/* ── Image Container ── */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#F5F5F7] border border-zinc-200/60 shadow-md mb-4">
        {cover && !imgError ? (
          <img
            src={cover}
            alt={product.title || 'Product'}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-zinc-300">
            <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Premium dark hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none rounded-xl" />

        {/* Floating Wishlist Button */}
        <button
          type="button"
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full text-zinc-900 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-white hover:scale-110 shadow-sm"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.5"
            className={`h-4 w-4 ${isWishlisted ? 'text-red-500' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>

      {/* ── Typography / Body ── */}
      <div className="flex flex-col gap-1 px-0.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-sm font-semibold tracking-tight text-zinc-900 group-hover:text-black transition-colors leading-snug">
            {product.title || 'Untitled Product'}
          </h3>
          <span className="shrink-0 text-sm font-mono font-medium text-zinc-800">
            {formatPrice(product.price)}
          </span>
        </div>
        <p className="line-clamp-1 text-xs font-medium text-zinc-400">
          {product.description || 'No description available.'}
        </p>
      </div>
    </article>
  )
}

export default ProductCard
