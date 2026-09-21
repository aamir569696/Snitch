import React from 'react'

/**
 * Responsive grid of selected image previews with a hover remove overlay.
 * Presentational only.
 */
const ImagePreviewGrid = ({ images, onRemove }) => {
  if (images.length === 0) return null

  return (
    <ul className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
      {images.map((img) => (
        <li
          key={img.id}
          className="group relative aspect-square overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800"
        >
          <img
            src={img.preview}
            alt={img.file?.name || 'Selected product image'}
            className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />

          {/* hover overlay */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

          {/* remove button */}
          <button
            type="button"
            onClick={() => onRemove(img.id)}
            aria-label={`Remove ${img.file?.name || 'image'}`}
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-red-500 focus:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 group-hover:opacity-100"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}

export default ImagePreviewGrid
