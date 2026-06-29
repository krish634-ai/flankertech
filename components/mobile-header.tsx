"use client"

export default function MobileHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 block lg:hidden">
      <div className="w-full max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-center py-2 border-b border-white/10 bg-black/70 backdrop-blur">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Go to Home"
            className="text-white font-bold tracking-wide hover:text-blue-400 transition-colors text-sm md:text-base"
          >
            FLANKERTECH SOLUTION
          </button>
        </div>
      </div>
    </header>
  )
}
