"use client"
import Link from "next/link"
import { useEffect } from "react"

const ArrowLeft = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="3" d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
  </svg>
)

const projects = [
  { title: "Generic Furniture", href: "https://generic-furniture.vercel.app/", category: "E-Commerce" },
  { title: "Code Visualiser", href: "https://code-visualiser.vercel.app/", category: "Developer Tools" },
  { title: "Soft Corner Chat", href: "https://soft-corner-chat.vercel.app/", category: "Communication" },
  { title: "Codeflow Typing Arena", href: "https://codeflow-typing-arena.vercel.app/", category: "Gaming" },
  { title: "CareHive 2.0", href: "https://carehive-2-0.vercel.app/", category: "Healthcare" },
  { title: "Yukti Inclusion Hub", href: "https://yukti-inclusion-hub.vercel.app/", category: "Community" },
  { title: "Snehsena", href: "https://snehsena.vercel.app/", category: "Non-Profit" },
  { title: "Yukti Trust", href: "https://yukti-trust.vercel.app/", category: "Foundation" },
  { title: "Serenity Haven Locator", href: "https://serenity-haven-locator.vercel.app/", category: "Maps" },
  { title: "Yukticare Gold", href: "https://yuktiicare-gold.vercel.app/", category: "Premium Service" },
  { title: "Neon Vista Creative Hub", href: "https://neon-vista-creative-hub.vercel.app/", category: "Creative" },
]

export default function ProjectsPage() {
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
      <section className="min-h-[60vh] flex items-center justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-32">
        <div className="max-w-7xl mx-auto w-full">
          <Link
            href="/"
            className="inline-flex items-center mb-6 sm:mb-12 text-muted-foreground hover:text-foreground transition-colors font-bold text-sm sm:text-lg group"
          >
            <ArrowLeft className="w-4 h-4 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:-translate-x-2 transition-transform" />
            <span>Back</span>
          </Link>

          <div>
            <h1 className="font-bold tracking-tighter leading-none mb-4 sm:mb-8 text-3xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="block">OUR</span>
              <span className="block text-muted-foreground">PROJECTS</span>
            </h1>
            <div className="h-2 w-24 sm:w-48 bg-foreground mb-4 sm:mb-8"></div>
            <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
              A showcase of our work. Click any project to explore it live.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 sm:py-16 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700 group"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border-4 border-foreground p-4 sm:p-8 hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 bg-background"
                  style={{
                    boxShadow: "4px 4px 0 0 currentColor",
                  }}
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-6">
                    <div className="text-3xl sm:text-5xl font-black text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <ExternalLink className="w-4 h-4 sm:w-6 sm:h-6 text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>

                  <h3 className="text-base sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
                    {project.title}
                  </h3>
                  <div className="inline-block px-2 sm:px-3 py-1 border-2 border-foreground text-xs sm:text-sm font-bold">
                    {project.category}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="mb-4 sm:mb-8 text-3xl sm:text-6xl md:text-7xl lg:text-8xl">Like What You See?</h2>
            <p className="text-sm sm:text-xl text-muted-foreground mb-6 sm:mb-12 leading-relaxed px-4">
              Let's create something amazing together.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center px-8 sm:px-16 py-4 sm:py-8 bg-foreground text-background font-bold text-base sm:text-2xl hover:translate-x-3 hover:translate-y-3 transition-transform duration-200 border-4 border-foreground"
              style={{
                boxShadow: "8px 8px 0 0 currentColor",
              }}
            >
              <span>Start Your Project</span>
              <svg className="ml-2 sm:ml-4 w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
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
              <div className="text-xs sm:text-base text-background/70">
                <p className="break-all">flankertechsolutions@gmail.com</p>
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
