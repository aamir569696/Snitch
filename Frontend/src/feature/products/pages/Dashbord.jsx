import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useProduct } from "../Hooks/useProduct"
import { useSelector } from "react-redux"
import ProductCard from "../components/ProductCard"


const Dashbord = () => {
  const { handleGetSellerProduct } = useProduct()
  const navigate = useNavigate()

  const sellerProducts = useSelector((state) => state.product.sellerProducts)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    setLoading(true)
    Promise.resolve(handleGetSellerProduct())
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const products = Array.isArray(sellerProducts) ? sellerProducts : []

  const totalValue = useMemo(
    () =>
      products.reduce((sum, p) => sum + Number(p?.price?.amount ?? 0), 0),
    [products]
  )
  const primaryCurrency = products[0]?.price?.currency || "USD"

  return (
    <div  className="min-h-screen w-full bg-zinc-950 px-6 py-10 text-zinc-100 antialiased sm:px-8 lg:py-14">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Your Products
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Manage and review every product in your store.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/seller/create-product")}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 px-5 text-sm font-bold tracking-wide text-white shadow-lg shadow-orange-900/20 transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Product
          </button>
        </header>

        {/* Stats */}
        {!loading && products.length > 0 && (
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            <StatCard label="Total Products" value={products.length} />
            <StatCard
              label="Catalog Value"
              value={`${symbolFor(primaryCurrency)}${totalValue.toLocaleString()}`}
            />
            <StatCard
              label="Status"
              value="All Live"
              accent="text-emerald-400"
            />
          </div>
        )}

        {/* Content states */}
        {loading ? (
          <SkeletonGrid />
        ) : products.length === 0 ? (
          <EmptyState onCreate={() => navigate("/seller/create-product")} />
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

const symbolFor = (c) => {
  const map = { USD: "$", EUR: "€", GBP: "£", PKR: "₨", INR: "₹", AED: "د.إ" }
  return map[c] || `${c} `
}

const StatCard = ({ label, value, accent = "text-white" }) => (
  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-lg shadow-black/20">
    <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
      {label}
    </p>
    <p className={`mt-1.5 text-2xl font-bold ${accent}`}>{value}</p>
  </div>
)

const SkeletonGrid = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, i) => (
      <div
        key={i}
        className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
      >
        <div className="aspect-4/3 animate-pulse bg-zinc-800" />
        <div className="space-y-3 p-4">
          <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-full animate-pulse rounded bg-zinc-800" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-800" />
        </div>
      </div>
    ))}
  </div>
)

const EmptyState = ({ onCreate }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 px-6 py-20 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-800">
      <svg
        className="h-8 w-8 text-zinc-500"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-white">No products yet</h2>
    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-400">
      You haven't added any products to your store. Create your first listing to
      get started.
    </p>
    <button
      type="button"
      onClick={onCreate}
      className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-600 px-5 text-sm font-bold tracking-wide text-white shadow-lg shadow-orange-900/20 transition-all duration-200 hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
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
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      Create Product
    </button>
  </div>
)

export default Dashbord
