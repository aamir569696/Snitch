import React, { useRef, useState } from 'react'
import { useProduct } from '../Hooks/useProduct'
import FormField from './FormField'
import PriceInput from './PriceInput'
import ImageUploader from './ImageUploader'
import Toast from './Toast'

const ProductForm = () => {
  const { handleCreateProduct } = useProduct()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [images, setImages] = useState([]) // [{ file, id, preview }]

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null) // { type, message }

  const descRef = useRef(null)

  const autoGrow = (el) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }

  const validate = () => {
    const next = {}
    if (!title.trim()) next.title = 'Title is required.'
    else if (title.trim().length < 3)
      next.title = 'Title must be at least 3 characters.'

    if (!description.trim()) next.description = 'Description is required.'

    if (!amount) next.price = 'Price is required.'
    else if (Number(amount) <= 0) next.price = 'Price must be greater than 0.'

    if (images.length === 0) next.images = 'Please add at least one image.'

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (!validate()) return

    const formData = new FormData()
    formData.append('title', title.trim())
    formData.append('description', description.trim())
    formData.append('priceAmount', amount)
    formData.append('priceCurrency', currency)
    images.forEach((img) => formData.append('images', img.file))

    try {
      setSubmitting(true)
      await handleCreateProduct({ formData })
      setToast({ type: 'success', message: 'Product created successfully.' })
      setTitle('')
      setDescription('')
      setAmount('')
      setCurrency('USD')
      images.forEach((img) => URL.revokeObjectURL(img.preview))
      setImages([])
      setErrors({})
      if (descRef.current) descRef.current.style.height = 'auto'
    } catch (err) {
      setToast({
        type: 'error',
        message:
          err?.response?.data?.message ||
          'Something went wrong while creating the product. Please try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  const inputBase =
    'w-full rounded-xl border bg-zinc-800/50 px-4 text-sm text-white placeholder-zinc-500 outline-none transition-all duration-200 focus:ring-2 focus:ring-amber-500/40'

  const fieldBorder = (hasError) =>
    hasError
      ? 'border-red-500/50 focus:border-red-500'
      : 'border-zinc-700 focus:border-amber-500'

  return (
    <>
      <form onSubmit={onSubmit} noValidate className="space-y-7">
        <FormField id="title" label="Title" required error={errors.title}>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Minimalist Leather Wallet"
            aria-invalid={!!errors.title}
            className={`h-12 ${inputBase} ${fieldBorder(!!errors.title)}`}
          />
        </FormField>

        <FormField
          id="description"
          label="Description"
          required
          error={errors.description}
        >
          <textarea
            id="description"
            name="description"
            ref={descRef}
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value)
              autoGrow(e.target)
            }}
            placeholder="Describe your product — materials, sizing, and what makes it special…"
            aria-invalid={!!errors.description}
            className={`min-h-30 resize-y py-3 leading-relaxed ${inputBase} ${fieldBorder(
              !!errors.description
            )}`}
          />
        </FormField>

        <div className="border-t border-zinc-800/80" />

        <FormField
          id="price-amount"
          label="Price"
          required
          error={errors.price}
        >
          <PriceInput
            amount={amount}
            currency={currency}
            onAmountChange={setAmount}
            onCurrencyChange={setCurrency}
            error={errors.price}
          />
        </FormField>

        <div className="border-t border-zinc-800/80" />

        <ImageUploader
          images={images}
          onChange={(imgs) => {
            setImages(imgs)
            if (errors.images)
              setErrors((prev) => ({ ...prev, images: undefined }))
          }}
          error={errors.images}
          onError={(msg) => setErrors((prev) => ({ ...prev, images: msg }))}
        />

        <button
          type="submit"
          disabled={submitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 text-sm font-bold tracking-wide text-white shadow-lg shadow-orange-900/20 transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100 disabled:hover:brightness-100 sm:h-14"
        >
          {submitting ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 0 1 8-8V0C5.37 0 0 5.37 0 12h4z"
                />
              </svg>
              Creating…
            </>
          ) : (
            'Create Product'
          )}
        </button>
      </form>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </>
  )
}

export default ProductForm