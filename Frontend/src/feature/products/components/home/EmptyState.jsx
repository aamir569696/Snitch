import React from 'react'

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-zinc-50 px-6 py-20 text-center">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100">
      <svg
        className="h-8 w-8 text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    </div>
    <h2 className="text-lg font-semibold text-zinc-900">
      No products available yet.
    </h2>
    <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-zinc-500">
      Check back soon — new products will appear here as they are added.
    </p>
  </div>
)

export default EmptyState
