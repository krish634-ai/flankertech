"use client"

import Link from "next/link"
import { useState } from "react"

export function DesktopNav() {
  const [lineHovered, setLineHovered] = useState(false)

  return (
    <nav className="nav-bar-simple nav-visible hidden lg:block">
      <div className="nav-container-simple">
        <div className="w-full max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between">
            {/* Left side - Decorative line */}
            <div className="flex items-center">
              <div
                onMouseEnter={() => setLineHovered(true)}
                onMouseLeave={() => setLineHovered(false)}
                className="transition-all duration-300 ease-out"
                style={{
                  width: lineHovered ? "60px" : "30px",
                  height: "4px",
                  backgroundColor: "white",
                }}
              />
            </div>

            {/* Brand in the center */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Go to Home"
              className="text-white font-bold tracking-wide hover:text-white/80 transition-colors"
            >
              FLANKERTECH SOLUTION
            </button>

            {/* Navigation buttons on the right */}
            <div className="flex items-center gap-8">
              <Link
                href="/"
                className="text-white/90 hover:text-white font-semibold transition-colors relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/projects"
                className="text-white/90 hover:text-white font-semibold transition-colors relative group"
              >
                Projects
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/career"
                className="text-white/90 hover:text-white font-semibold transition-colors relative group"
              >
                Career
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
              <Link
                href="/contact"
                className="text-white/90 hover:text-white font-semibold transition-colors relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DesktopNav
