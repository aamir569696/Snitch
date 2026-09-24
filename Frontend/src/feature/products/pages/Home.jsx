import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../Hooks/useProduct'
import Navbar from '../components/home/Navbar'
import Hero from '../components/home/Hero'
import ProductGrid from '../components/home/ProductGrid'
import { ProductSkeletonGrid } from '../components/home/ProductSkeleton'
import EmptyState from '../components/home/EmptyState'
import ErrorState from '../components/home/ErrorState'

const Home = () => {
  // State layer: products come from the existing Redux slice.
  const products = useSelector((state) => state.product.products)
  const { handleGetallProducts } = useProduct()

  // Local UI states wrap the existing hook call (no data logic recreated).
  const [status, setStatus] = useState('loading') // loading | error | ready
  const productsRef = useRef(null)

  const loadProducts = useCallback(async () => {
    setStatus('loading')
    try {
      await handleGetallProducts()
      setStatus('ready')
    } catch {
      setStatus('error')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  const list = Array.isArray(products) ? products : []

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased">
      <Navbar />
      <Hero onShopNow={scrollToProducts} />

      <main
        ref={productsRef}
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
              All Products
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {status === 'ready' && list.length > 0
                ? `Showing ${list.length} product${list.length > 1 ? 's' : ''}`
                : 'Browse our full catalog'}
            </p>
          </div>
        </div>

        {status === 'loading' && <ProductSkeletonGrid count={8} />}

        {status === 'error' && <ErrorState onRetry={loadProducts} />}

        {status === 'ready' &&
          (list.length === 0 ? (
            <EmptyState />
          ) : (
            <ProductGrid products={list} />
          ))}
      </main>

      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center text-xs text-zinc-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Snitch. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Home
