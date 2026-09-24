import React from 'react'
import ProductCard from './ProductCard'

/** Responsive product grid: 2 cols (mobile) → 3 (tablet) → 4 (desktop). */
const ProductGrid = ({ products }) => (
  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
    {products.map((product) => (
      <ProductCard key={product._id} product={product} />
    ))}
  </div>
)

export default ProductGrid
