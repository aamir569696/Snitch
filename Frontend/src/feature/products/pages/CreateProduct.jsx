import React from 'react'
import ProductForm from '../components/ProductForm'

const CreateProduct = () => {
  return (
    <div className="min-h-screen w-full bg-zinc-950 px-6 py-10 text-zinc-100 antialiased sm:px-8 lg:py-16">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Create Product
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Add a new product to your store. Fill in the details below and
            upload up to 7 images before publishing.
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 sm:p-8">
          <ProductForm />
        </div>
      </div>
    </div>
  )
}

export default CreateProduct
