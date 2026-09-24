import React from 'react'

const Hero = ({ onShopNow }) => (
  <section className="border-b border-zinc-200 bg-zinc-50">
    <div className="mx-auto flex max-w-7xl flex-col items-start gap-5 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-medium text-zinc-600">
        New arrivals every week
      </span>
      <h1 className="max-w-2xl text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-5xl">
        Discover products you'll love.
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-zinc-600">
        Shop a curated selection from trusted sellers. Quality products, clear
        pricing, and a clean shopping experience.
      </p>
      <button
        type="button"
        onClick={onShopNow}
        className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-zinc-900 px-6 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/40 focus-visible:ring-offset-2"
      >
        Shop Now
      </button>
    </div>
  </section>
)

export default Hero
