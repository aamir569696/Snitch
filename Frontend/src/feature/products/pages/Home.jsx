import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useProduct } from '../Hooks/useProduct'
import Navbar from '../components/home/Navbar'
import Hero from '../components/home/Hero'
import ProductGrid from '../components/home/ProductGrid'
import { ProductSkeletonGrid } from '../components/home/ProductSkeleton'
import EmptyState from '../components/home/EmptyState'
import ErrorState from '../components/home/ErrorState'


const TrustFooter = () => (
  <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-zinc-900">
    <div className="mx-auto max-w-screen-2xl px-6 md:px-16 lg:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
        <div>
          <span className="text-2xl font-black tracking-[0.2em] uppercase mb-6 block">SNITCH</span>
          <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-xs">
            The definitive marketplace engineered for creators and sellers who demand perfection in every pixel.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Shop</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Menswear</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Support</h4>
          <ul className="space-y-4 text-sm font-medium text-zinc-500">
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-100 mb-6">Newsletter</h4>
          <p className="text-zinc-500 text-sm font-medium mb-4">Subscribe for exclusive drops and early access.</p>
          <div className="relative group">
            <input type="email" placeholder="Email Address" className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all" />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-2 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-900 text-xs font-medium text-zinc-600">
        <p>© {new Date().getFullYear()} Snitch. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
)

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
    <div className="min-h-screen bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
      <Navbar />
      <Hero onShopNow={scrollToProducts} />


      {/* ── Clean spacing bridge: Hero → Marketplace ── */}
      <div className="h-px w-full bg-zinc-100" />

      <main
        ref={productsRef}
        className="mx-auto max-w-screen-2xl px-6 py-16 md:px-16 lg:px-24 lg:py-28"
      >
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase">
            The Marketplace
          </h2>
          <p className="mt-3 text-sm font-medium text-zinc-500 max-w-md">
            {status === 'ready' && list.length > 0
              ? `Explore our entire catalog of ${list.length} premium product${list.length > 1 ? 's' : ''}`
              : 'Browse our full catalog of exclusive fashion drops.'}
          </p>
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

      <TrustFooter />
    </div>
  )
}

export default Home
