"use client"
import Link from "next/link"
import { useEffect } from "react"

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="3" d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const Mail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" />
    <path strokeWidth="2" d="M3 7l9 6 9-6" />
  </svg>
)

const Phone = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeWidth="2"
      d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
    />
  </svg>
)

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
)

const LinkedIn = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="2" />
    <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
    <circle cx="4" cy="4" r="2" fill="currentColor" />
  </svg>
)

export default function ContactPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-8")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = document.querySelectorAll("[data-fade]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-32">
        <div className="max-w-7xl mx-auto w-full">
          <Link
            href="/"
            className="inline-flex items-center mb-6 sm:mb-12 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm sm:text-lg group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:-translate-x-2 transition-transform" />
            <span>Back</span>
          </Link>

          <div className="space-y-8 sm:space-y-16">
            <div>
              <h1 className="font-bold tracking-tighter leading-none mb-4 sm:mb-8 text-3xl sm:text-7xl md:text-8xl lg:text-9xl">
                <span className="block">LET'S</span>
                <span className="block text-muted-foreground">CONNECT</span>
              </h1>
              <div className="h-2 w-24 sm:w-48 bg-foreground"></div>
            </div>

            {/* Contact Methods */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-5xl">
              {/* Email Card */}
              <div data-fade className="opacity-0 translate-y-8 transition-all duration-700 group">
                <a
                  href="mailto:flankertechsolutions@gmail.com"
                  className="block border-4 border-foreground p-5 sm:p-12 hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 bg-background"
                  style={{
                    boxShadow: "6px 6px 0 0 currentColor",
                  }}
                >
                  <Mail className="w-8 h-8 sm:w-16 sm:h-16 mb-4 sm:mb-8 text-foreground" />
                  <div className="text-3xl sm:text-6xl font-black mb-3 sm:mb-4">01</div>
                  <h3 className="text-lg sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Email</h3>
                  <p className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed break-all">
                    flankertechsolutions@gmail.com
                  </p>
                  <p className="text-xs sm:text-base text-muted-foreground mt-2 sm:mt-4">Response time: 24 hours</p>
                </a>
              </div>

              {/* Phone Card */}
              <div
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: "100ms" }}
              >
                <a
                  href="tel:+919313443908"
                  className="block border-4 border-foreground p-5 sm:p-12 hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 bg-background"
                  style={{
                    boxShadow: "6px 6px 0 0 currentColor",
                  }}
                >
                  <Phone className="w-8 h-8 sm:w-16 sm:h-16 mb-4 sm:mb-8 text-foreground" />
                  <div className="text-3xl sm:text-6xl font-black mb-3 sm:mb-4">02</div>
                  <h3 className="text-lg sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Phone</h3>
                  <p className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                    +91 931-3443-908
                  </p>
                  <p className="text-xs sm:text-base text-muted-foreground mt-2 sm:mt-4">Sat–Sun: 9:00 AM – 7:00 PM</p>
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div
              data-fade
              className="opacity-0 translate-y-8 transition-all duration-700 max-w-3xl"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="border-4 border-foreground p-5 sm:p-12 bg-foreground text-background">
                <h3 className="text-lg sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-6">Why Work With Us?</h3>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-lg leading-relaxed text-background/80">
                  <p>
                    We're committed to delivering exceptional results and building long-term partnerships with our
                    clients.
                  </p>
                  <p>
                    Every project receives our full attention and expertise, ensuring your success is our top priority.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-foreground py-8 sm:py-16 px-4 sm:px-6 md:px-12 bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12">
            <div>
              <div className="text-xl sm:text-3xl font-black mb-3 sm:mb-4">FLANKERTECH</div>
              <p className="text-xs sm:text-base text-background/70">Building the future, one project at a time.</p>
            </div>

            <div>
              <div className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</div>
              <nav className="space-y-2">
                <Link
                  href="/"
                  className="block text-sm sm:text-base text-background/70 hover:text-background transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  className="block text-sm sm:text-base text-background/70 hover:text-background transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/contact"
                  className="block text-sm sm:text-base text-background/70 hover:text-background transition-colors"
                >
                  Contact
                </Link>
              </nav>
            </div>

            <div>
              <div className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Connect</div>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/flankertechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-background/50 hover:border-background hover:bg-background/10 transition-all rounded text-background/70 hover:text-background"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/flankertech-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-background/50 hover:border-background hover:bg-background/10 transition-all rounded text-background/70 hover:text-background"
                  aria-label="LinkedIn"
                >
                  <LinkedIn className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t-2 border-background/20 text-center text-xs sm:text-base text-background/60">
            <p>&copy; {new Date().getFullYear()} FlankerTech Solution. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
