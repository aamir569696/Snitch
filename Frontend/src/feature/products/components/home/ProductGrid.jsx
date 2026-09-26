import React from 'react'
import ProductCard from './ProductCard'

/** Responsive product grid: 1 col (mobile) → 2 (sm) → 3 (md) → 4 (lg). */
const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
)

export default ProductGrid
