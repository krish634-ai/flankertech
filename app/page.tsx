"use client"
import Link from "next/link"
import { useState } from "react"

import React from "react"

import { useEffect, useRef } from "react"

// Inline SVG icon components - Premium unique designs
const SvgBase = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  />
)

const ArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2.5" />
  </SvgBase>
)

const Users = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <circle cx="9" cy="7" r="3.5" strokeWidth="2" />
    <path d="M5 21v-3a4 4 0 0 1 8 0v3M18 21v-3a4 4 0 0 0-3-3.87M15 7a3.5 3.5 0 1 1 0 7" strokeWidth="2" />
  </SvgBase>
)

const Award = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <circle cx="12" cy="8" r="5" strokeWidth="2" />
    <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5M12 13v6" strokeWidth="2" />
  </SvgBase>
)

const Briefcase = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2.5" strokeWidth="2" />
    <path d="M2 12h20" strokeWidth="2" />
  </SvgBase>
)

const Target = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <circle cx="12" cy="12" r="9" strokeWidth="2" />
    <circle cx="12" cy="12" r="5.5" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </SvgBase>
)

const Brain = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <path
      d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v3a3.5 3.5 0 0 0 3.5 3.5M14.5 2a3.5 3.5 0 0 1 3.5 3.5v3a3.5 3.5 0 0 1-3.5 3.5M12 11v10M9 14a3 3 0 0 0-3 3v3M15 14a3 3 0 0 1 3 3v3"
      strokeWidth="2"
    />
  </SvgBase>
)

const Star = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <polygon
      points="12 2 15.09 10.26 24 10.26 17.55 15.74 19.64 24 12 19.52 4.36 24 6.45 15.74 0 10.26 8.91 10.26"
      strokeWidth="1.5"
      fill="currentColor"
    />
  </SvgBase>
)

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </SvgBase>
)

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <path d="M18 2h-3a4 4 0 0 0-4 4v3H8v4h3v9h4v-9h3l1-4h-4V6a1 1 0 0 1 1-1h3z" strokeWidth="2" />
  </SvgBase>
)

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <SvgBase {...props}>
    <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="2" />
    <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
    <path d="M7 11h3v7H7zM13 11h3a2 2 0 0 1 2 2v4h-3v-4a1 1 0 0 0-1-1h-1v5h-3v-7z" strokeWidth="2" />
  </SvgBase>
)

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null)

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
      {/* Hero Section with massive typography */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-20 sm:py-32 pt-24 sm:pt-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-6 sm:space-y-12">
            <h1 className="font-bold tracking-tighter leading-none text-3xl sm:text-7xl md:text-8xl lg:text-9xl">
              <span className="block text-foreground">FLANKERTECH</span>
              <span className="block text-muted-foreground">SOLUTION</span>
            </h1>

            <div className="max-w-2xl">
              <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Where technology meets innovation. Building digital solutions that transform businesses and drive growth
                in the modern era.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 bg-foreground text-background font-bold text-sm sm:text-lg hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 border-4 border-foreground relative"
                style={{
                  boxShadow: "6px 6px 0 0 currentColor",
                }}
              >
                <span>Start Project</span>
                <svg
                  className="ml-2 sm:ml-3 w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/projects"
                className="group inline-flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 bg-background text-foreground font-bold text-sm sm:text-lg hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 border-4 border-foreground"
                style={{
                  boxShadow: "6px 6px 0 0 currentColor",
                }}
              >
                <span>View Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="mb-4 text-3xl sm:text-6xl md:text-7xl lg:text-8xl">Our Services</h2>
            <div className="h-2 w-20 sm:w-32 bg-foreground mb-8 sm:mb-16"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                number: "01",
                title: "Web Development",
                description: "Custom websites and web applications built with cutting-edge technologies.",
              },
              {
                number: "02",
                title: "Mobile Solutions",
                description: "Native and cross-platform mobile apps that deliver exceptional user experiences.",
              },
              {
                number: "03",
                title: "Cloud Services",
                description: "Scalable cloud infrastructure and deployment solutions for modern applications.",
              },
              {
                number: "04",
                title: "UI/UX Design",
                description: "User-centered design that combines aesthetics with functionality.",
              },
              {
                number: "05",
                title: "Consulting",
                description: "Strategic technology consulting to guide your digital transformation.",
              },
              {
                number: "06",
                title: "Support",
                description: "Ongoing maintenance and support to keep your systems running smoothly.",
              },
            ].map((service, index) => (
              <div
                key={index}
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700 group"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className="border-4 border-foreground p-4 sm:p-8 hover:translate-x-2 hover:translate-y-2 transition-transform duration-200 bg-background"
                  style={{
                    boxShadow: "4px 4px 0 0 currentColor",
                  }}
                >
                  <div className="text-3xl sm:text-5xl md:text-6xl font-black text-muted-foreground mb-3 sm:mb-6">
                    {service.number}
                  </div>
                  <h3 className="text-lg sm:text-2xl md:text-3xl mb-2 sm:mb-4">{service.title}</h3>
                  <p className="text-xs sm:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
              <h2 className="text-background mb-4 sm:mb-8 text-3xl sm:text-6xl md:text-7xl lg:text-8xl">
                About FlankerTech
              </h2>
              <div className="space-y-3 sm:space-y-6 text-sm sm:text-lg leading-relaxed text-background/80">
                <p>
                  We are a team of passionate technologists dedicated to building exceptional digital experiences. Our
                  mission is to empower businesses through innovative technology solutions.
                </p>
                <p>
                  With years of experience and a portfolio of successful projects, we bring expertise, creativity, and
                  dedication to every engagement.
                </p>
              </div>
            </div>

            <div
              data-fade
              className="opacity-0 translate-y-8 transition-all duration-700"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="grid grid-cols-2 gap-3 sm:gap-8">
                {[
                  { number: "50+", label: "Projects Delivered" },
                  { number: "30+", label: "Happy Clients" },
                  { number: "5+", label: "Years Experience" },
                  { number: "100%", label: "Client Satisfaction" },
                ].map((stat, index) => (
                  <div key={index} className="border-4 border-background p-3 sm:p-6 bg-foreground">
                    <div className="text-2xl sm:text-4xl md:text-5xl font-black text-background mb-1 sm:mb-2">
                      {stat.number}
                    </div>
                    <div className="text-xs sm:text-sm text-background/80 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="mb-4 sm:mb-8 text-3xl sm:text-6xl md:text-7xl lg:text-8xl">Ready to Start Your Project?</h2>
            <p className="text-sm sm:text-xl text-muted-foreground mb-6 sm:mb-12 leading-relaxed px-4">
              Let's discuss how we can help transform your ideas into reality.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center px-8 sm:px-16 py-4 sm:py-8 bg-foreground text-background font-bold text-base sm:text-2xl hover:translate-x-3 hover:translate-y-3 transition-transform duration-200 border-4 border-foreground"
              style={{
                boxShadow: "8px 8px 0 0 currentColor",
              }}
            >
              <span>Get In Touch</span>
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
                  href="/career"
                  className="block text-sm sm:text-base text-background/70 hover:text-background transition-colors"
                >
                  Career Portal
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
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/flankertechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-background/50 hover:border-background hover:bg-background/20 transition-all rounded text-background/70 hover:text-background"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/company/flankertech-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-background/50 hover:border-background hover:bg-background/20 transition-all rounded text-background/70 hover:text-background"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="4" cy="4" r="2" fill="currentColor" />
                  </svg>
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
