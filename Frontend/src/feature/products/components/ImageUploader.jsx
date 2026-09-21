import React, { useCallback, useRef, useState } from 'react'
import ImagePreviewGrid from './ImagePreviewGrid'

const MAX_IMAGES = 7

/**
 * Premium drag-and-drop uploader with click-to-browse fallback,
 * a pill counter, and a preview grid.
 * Presentational only — files array + setter owned by the parent.
 */
const ImageUploader = ({ images, onChange, error, onError }) => {
  const inputRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)

  const remaining = MAX_IMAGES - images.length
  const isFull = remaining <= 0

  const addFiles = useCallback(
    (fileList) => {
      const incoming = Array.from(fileList).filter((f) =>
        f.type.startsWith('image/')
      )
      if (incoming.length === 0) return

      if (images.length + incoming.length > MAX_IMAGES) {
        onError?.(`You can upload a maximum of ${MAX_IMAGES} images.`)
      }

      const allowed = incoming.slice(0, remaining)
      if (allowed.length === 0) return

      const withPreviews = allowed.map((file) => ({
        file,
        id: `${file.name}-${file.size}-${
          crypto.randomUUID?.() ?? Date.now() + Math.random()
        }`,
        preview: URL.createObjectURL(file),
      }))
      onChange([...images, ...withPreviews])
    },
    [images, remaining, onChange, onError]
  )

  const onInputChange = (e) => {
    if (e.target.files?.length) addFiles(e.target.files)
    e.target.value = ''
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    if (isFull) {
      onError?.(`You can upload a maximum of ${MAX_IMAGES} images.`)
      return
    }
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files)
  }

  const removeImage = (id) => {
    const target = images.find((img) => img.id === id)
    if (target?.preview) URL.revokeObjectURL(target.preview)
    onChange(images.filter((img) => img.id !== id))
  }

  const openBrowser = () => {
    if (!isFull) inputRef.current?.click()
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-zinc-200">
          Product Images
          <span className="ml-0.5 text-amber-400">*</span>
        </label>

        {/* counter pill */}
        <span
          aria-live="polite"
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors duration-200 ${
            isFull
              ? 'border-amber-500/40 bg-amber-500/10 text-amber-300'
              : 'border-zinc-700 bg-zinc-800/60 text-zinc-400'
          }`}
        >
          {images.length}/{MAX_IMAGES} selected
        </span>
      </div>

      {/* Dropzone */}
      <div
        role="button"
        tabIndex={isFull ? -1 : 0}
        aria-disabled={isFull}
        aria-label="Upload images. Drag and drop files here, or press Enter to browse."
        onClick={openBrowser}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isFull) {
            e.preventDefault()
            openBrowser()
          }
        }}
        onDragOver={(e) => {
          e.preventDefault()
          if (!isFull) setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={`flex min-h-45 flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 ${
          isFull
            ? 'cursor-not-allowed border-zinc-800 bg-zinc-900/40 opacity-60'
            : isDragging
            ? 'scale-[1.01] cursor-pointer border-amber-500 bg-amber-500/[0.07]'
            : 'cursor-pointer border-zinc-700 bg-zinc-800/30 hover:border-amber-500/60 hover:bg-zinc-800/50'
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300 ${
            isDragging ? 'bg-amber-500/20' : 'bg-zinc-800'
          }`}
        >
          <svg
            className={`h-7 w-7 transition-colors duration-300 ${
              isDragging ? 'text-amber-400' : 'text-zinc-400'
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-zinc-300">
            {isFull ? (
              'Maximum of 7 images reached'
            ) : (
              <>
                <span className="font-semibold text-amber-400">
                  Click to upload
                </span>{' '}
                or drag and drop
              </>
            )}
          </p>
          <p className="text-xs text-zinc-500">
            PNG, JPG or WEBP — up to {MAX_IMAGES} images
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onInputChange}
          disabled={isFull}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      {error && (
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
      )}

      <ImagePreviewGrid images={images} onRemove={removeImage} />
    </div>
  )
}

export { MAX_IMAGES }
export default ImageUploader
