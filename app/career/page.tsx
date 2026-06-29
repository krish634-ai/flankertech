"use client"

import Link from "next/link"
import React, { useEffect, useRef } from "react"

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-2m-4-3V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1m4 0a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1" />
  </svg>
)

const GraduationIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 10v6m0 0l-8.5-5.5-8.5 5.5m0 0V8a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2m-17 0l8.5-5.5 8.5 5.5" />
  </svg>
)

const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
  </svg>
)

const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.5 16.5l-1.42 3.536a2 2 0 0 0 2.28 2.684l2.42-1.271" />
    <path d="M12 9v0m0 0c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
    <path d="M12 9v12m0 0l-3.5-1.75m7 1.75l3.5-1.75" />
  </svg>
)

export default function CareerPage() {
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
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 py-20 sm:py-32 pt-24 sm:pt-32"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-6 sm:space-y-12">
            <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
              <h1 className="font-black tracking-tighter leading-none text-3xl sm:text-7xl md:text-8xl lg:text-9xl mb-4">
                <span className="block">BUILD YOUR</span>
                <span className="block text-muted-foreground">TECH CAREER</span>
              </h1>
            </div>

            <div data-fade className="opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: "100ms" }}>
              <p className="text-sm sm:text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Our Career Portal connects talented developers with real-world projects, industry experience, and job opportunities. Start learning, build a portfolio, and launch your tech career.
              </p>
            </div>

            <div data-fade className="opacity-0 translate-y-8 transition-all duration-700" style={{ transitionDelay: "200ms" }}>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 bg-foreground text-background font-bold text-sm sm:text-lg hover:translate-x-2 hover:translate-y-2 transition-transform border-4 border-foreground"
                  style={{ boxShadow: "6px 6px 0 0 currentColor" }}
                >
                  Join Now
                  <ArrowRightIcon className="w-4 h-4 sm:w-6 sm:h-6 ml-2" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center px-6 sm:px-12 py-3 sm:py-6 bg-background text-foreground font-bold text-sm sm:text-lg hover:translate-x-2 hover:translate-y-2 transition-transform border-4 border-foreground"
                  style={{ boxShadow: "6px 6px 0 0 currentColor" }}
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4">How It Works</h2>
            <div className="h-2 w-20 sm:w-32 bg-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                step: "01",
                title: "Register",
                description: "Sign up and create your profile in minutes",
                icon: UserIcon,
              },
              {
                step: "02",
                title: "Learn & Build",
                description: "Complete projects to build real-world experience",
                icon: GraduationIcon,
              },
              {
                step: "03",
                title: "Earn Points",
                description: "Get recognized for completed projects",
                icon: TrophyIcon,
              },
              {
                step: "04",
                title: "Land Jobs",
                description: "Showcase your portfolio to employers",
                icon: BriefcaseIcon,
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  data-fade
                  className="opacity-0 translate-y-8 transition-all duration-700"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="border-4 border-foreground p-6 sm:p-8 h-full hover:translate-x-1 hover:translate-y-1 transition-transform">
                    <div className="text-4xl sm:text-5xl font-black text-muted-foreground mb-4">{item.step}</div>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                      <h3 className="text-xl sm:text-2xl font-black">{item.title}</h3>
                    </div>
                    <p className="text-sm sm:text-base text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4">What You Get</h2>
            <div className="h-2 w-20 sm:w-32 bg-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              {
                title: "Project-Based Learning",
                description: "Work on real projects that are used in production by actual companies",
                features: ["8+ diverse projects", "All difficulty levels", "Skill progression"],
              },
              {
                title: "Hands-On Experience",
                description: "Build a professional portfolio while learning industry-standard technologies",
                features: ["Real-world projects", "Code review", "Best practices"],
              },
              {
                title: "Community & Support",
                description: "Connect with other developers and get feedback on your work",
                features: ["Active community", "Expert reviews", "Peer support"],
              },
              {
                title: "Points & Achievements",
                description: "Earn points for completed projects and track your progress",
                features: ["Points system", "Achievements", "Leaderboards"],
              },
              {
                title: "Job Opportunities",
                description: "Get access to job listings and career development resources",
                features: ["Job board", "Networking", "Career guidance"],
              },
              {
                title: "Certifications",
                description: "Earn certificates that showcase your skills to employers",
                features: ["Digital certs", "Portfolio links", "Shareable badges"],
              },
            ].map((item, index) => (
              <div
                key={index}
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="border-4 border-foreground p-6 sm:p-8 hover:translate-x-1 hover:translate-y-1 transition-transform">
                  <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Provide Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4">We Provide</h2>
            <div className="h-2 w-20 sm:w-32 bg-background" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {[
              {
                title: "Curated Projects",
                description: "Carefully designed projects that teach real-world skills and technologies used by leading companies",
                points: ["HTML/CSS to Advanced AI", "Frontend to Backend", "Mobile Development"],
              },
              {
                title: "Expert Reviews",
                description: "Get detailed feedback on your work from experienced developers and technical experts",
                points: ["Code quality feedback", "Best practices", "Performance tips"],
              },
              {
                title: "Learning Resources",
                description: "Access comprehensive guides, PDFs, and documentation for every project",
                points: ["Project guides", "API documentation", "Tutorial links"],
              },
              {
                title: "Skill Development",
                description: "Progress through structured learning paths with increasing difficulty levels",
                points: ["Beginner to Advanced", "Skill tracking", "Progress analytics"],
              },
              {
                title: "Networking Opportunities",
                description: "Connect with industry professionals and other talented developers",
                points: ["Community forum", "Events", "Mentorship"],
              },
              {
                title: "Career Support",
                description: "Get guidance on career paths, resume building, and job search strategies",
                points: ["Resume tips", "Interview prep", "Job matching"],
              },
            ].map((item, index) => (
              <div
                key={index}
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="border-4 border-background p-6 sm:p-8">
                  <h3 className="text-xl sm:text-2xl font-black mb-3">{item.title}</h3>
                  <p className="text-sm sm:text-base text-background/80 mb-4">{item.description}</p>
                  <div className="space-y-2">
                    {item.points.map((point, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Path Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground">
        <div className="max-w-7xl mx-auto">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700 mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4">Your Career Path</h2>
            <div className="h-2 w-20 sm:w-32 bg-foreground" />
            <p className="text-sm sm:text-lg text-muted-foreground max-w-3xl mt-6">
              From beginner to professional developer, we've designed a comprehensive learning path to accelerate your career growth.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            {[
              {
                level: "Beginner",
                duration: "3-4 months",
                skills: ["HTML/CSS", "JavaScript Basics", "Responsive Design", "Git & GitHub"],
                projects: "3-4 projects",
                points: "600+ points",
              },
              {
                level: "Intermediate",
                duration: "4-5 months",
                skills: ["React", "Node.js", "Databases", "APIs", "Testing"],
                projects: "4-5 projects",
                points: "1200+ points",
              },
              {
                level: "Advanced",
                duration: "5-6 months",
                skills: ["System Design", "Advanced React", "DevOps", "Cloud Services", "AI/ML"],
                projects: "3-4 projects",
                points: "1800+ points",
              },
            ].map((level, index) => (
              <div
                key={index}
                data-fade
                className="opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="border-4 border-foreground p-6 sm:p-8 hover:translate-x-1 hover:translate-y-1 transition-transform bg-foreground/5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black mb-2">{level.level}</h3>
                      <p className="text-sm sm:text-base text-muted-foreground font-bold">{level.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-muted-foreground mb-2">Core Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {level.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1 bg-foreground text-background text-xs font-bold rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-muted-foreground">Projects</p>
                        <p className="text-lg sm:text-xl font-black">{level.projects}</p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-muted-foreground">Points</p>
                        <p className="text-lg sm:text-xl font-black text-green-600">{level.points}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 border-t-4 border-foreground bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <div data-fade className="opacity-0 translate-y-8 transition-all duration-700">
            <h2 className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 sm:mb-8">
              Ready to Build Your Tech Career?
            </h2>
            <p className="text-sm sm:text-xl text-background/80 mb-8 sm:mb-12 leading-relaxed px-4">
              Join thousands of developers who are building real projects, earning points, and landing their dream tech jobs.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 sm:px-16 py-4 sm:py-8 bg-background text-foreground font-bold text-base sm:text-2xl hover:translate-x-2 hover:translate-y-2 transition-transform border-4 border-background"
                style={{ boxShadow: "6px 6px 0 0 currentColor" }}
              >
                Join Free Today
                <RocketIcon className="w-5 h-5 sm:w-7 sm:h-7 ml-2 sm:ml-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 sm:px-16 py-4 sm:py-8 bg-transparent text-background font-bold text-base sm:text-2xl hover:translate-x-2 hover:translate-y-2 transition-transform border-4 border-background"
                style={{ boxShadow: "6px 6px 0 0 currentColor" }}
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-foreground py-8 sm:py-16 px-4 sm:px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-12 mb-8">
            <div>
              <div className="text-xl sm:text-3xl font-black mb-3 sm:mb-4">FLANKERTECH</div>
              <p className="text-xs sm:text-base text-muted-foreground">Building careers in tech, one project at a time.</p>
            </div>

            <div>
              <div className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</div>
              <nav className="space-y-2">
                <Link href="/" className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href="/projects" className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Projects
                </Link>
                <Link href="/contact" className="block text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </nav>
            </div>

            <div>
              <div className="text-base sm:text-xl font-bold mb-3 sm:mb-4">Connect With Us</div>
              <div className="flex gap-3">
                <a
                  href="https://instagram.com/flankertechsolutions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border-2 border-muted-foreground/50 hover:border-foreground hover:bg-foreground/10 transition-all rounded text-muted-foreground hover:text-foreground"
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
                  className="p-2 border-2 border-muted-foreground/50 hover:border-foreground hover:bg-foreground/10 transition-all rounded text-muted-foreground hover:text-foreground"
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

          <div className="pt-4 sm:pt-8 border-t-2 border-foreground/20 text-center text-xs sm:text-base text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FlankerTech Career Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
