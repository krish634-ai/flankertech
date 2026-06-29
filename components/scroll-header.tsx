"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function ScrollHeader() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y = window.scrollY || 0
        const delta = y - lastY.current
        // Threshold to avoid jitter
        const threshold = 6

        if (y <= 8) {
          // Always show at very top
          setHidden(false)
        } else if (delta > threshold) {
          // Scrolling down -> hide
          setHidden(true)
        } else if (delta < -threshold) {
          // Scrolling up -> show
          setHidden(false)
        }

        lastY.current = y
        ticking.current = false
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0",
      ].join(" ")}
      aria-label="Site header"
    >
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-center">
          <Link href="/">
            <button className="group relative rounded-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border border-border px-6 py-3 text-sm md:text-base font-semibold text-foreground cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20">
              <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
              <span className="relative">FLANKERTECH SOLUTION</span>
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}
