import React from 'react'

const Hero = ({ onShopNow }) => (
  <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0a0a0a] group">
    {/* Background Image */}
    <img 
      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2070&auto=format&fit=crop" 
      alt="High fashion streetwear" 
      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[3s] ease-out group-hover:scale-105"
    />
    
    {/* Cinematic Gradients */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 pointer-events-none"></div>
    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px] pointer-events-none"></div>

    {/* Content */}
    <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-20">
      <span className="mb-6 inline-flex items-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2 text-xs font-bold tracking-[0.25em] uppercase text-zinc-200 shadow-xl">
        The Fall / Winter Collection
      </span>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-8 leading-[1.05]">
        <span className="drop-shadow-2xl">CURATED FOR</span>
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-500 drop-shadow-lg">
          THE BOLD.
        </span>
      </h1>
      
      <p className="max-w-xl text-base md:text-lg font-medium text-zinc-300 mb-12 leading-relaxed tracking-wide drop-shadow-md">
        The new era of streetwear has arrived. Minimalist design, uncompromising quality, and an exclusive digital storefront tailored for visionaries.
      </p>
      
      <button
        type="button"
        onClick={onShopNow}
        className="group/btn relative overflow-hidden rounded-full bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)]"
      >
        <span className="relative z-10 flex items-center gap-3">
          Shop the Collection
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
  </section>
)

export default Hero
