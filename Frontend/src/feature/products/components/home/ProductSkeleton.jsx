import React from 'react'

/** Single skeleton card matching ProductCard's layout. */
const ProductSkeleton = () => (
  <div className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
    <div className="aspect-square animate-pulse bg-zinc-200" />
    <div className="space-y-3 p-4">
      <div className="h-4 w-3/4 animate-pulse rounded bg-zinc-200" />
      <div className="h-3 w-full animate-pulse rounded bg-zinc-200" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-zinc-200" />
      <div className="h-9 w-full animate-pulse rounded-lg bg-zinc-200" />
    </div>
  </div>
)

/** Grid of skeletons used while products load. */
export const ProductSkeletonGrid = ({ count = 8 }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
)

export default ProductSkeleton
