"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function GlobalNav() {
  const pathname = usePathname()

  // Hide nav on dashboard pages
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-6">
        <div className="flex items-center justify-end">
          {/* Right side - Navigation buttons */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link
              href="/"
              className={`font-semibold transition-colors relative group text-sm sm:text-base ${
                isActive("/")
                  ? "text-foreground"
                  : "text-foreground/90 hover:text-foreground"
              }`}
            >
              Home
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ${
                  isActive("/") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/projects"
              className={`font-semibold transition-colors relative group text-sm sm:text-base ${
                isActive("/projects")
                  ? "text-foreground"
                  : "text-foreground/90 hover:text-foreground"
              }`}
            >
              Projects
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ${
                  isActive("/projects") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/career"
              className={`font-semibold transition-colors relative group text-sm sm:text-base ${
                isActive("/career")
                  ? "text-foreground"
                  : "text-foreground/90 hover:text-foreground"
              }`}
            >
              Career
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ${
                  isActive("/career") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
            <Link
              href="/contact"
              className={`font-semibold transition-colors relative group text-sm sm:text-base ${
                isActive("/contact")
                  ? "text-foreground"
                  : "text-foreground/90 hover:text-foreground"
              }`}
            >
              Contact
              <span
                className={`absolute bottom-0 left-0 h-0.5 bg-foreground transition-all duration-300 ${
                  isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
