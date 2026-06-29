"use client"

import React from "react"

import { useState } from "react"
import { useStore } from "@/lib/store"
import ProjectDetailModal from "@/components/project-detail-modal"

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const difficultyColors = {
  Beginner: "bg-muted-foreground/20 text-foreground",
  Intermediate: "bg-foreground/80 text-background",
  Advanced: "bg-foreground text-background",
}

export default function ProjectsPage() {
  const { availableProjects, myProjects, confirmProject } = useStore()
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("All")
  const [difficultyFilter, setDifficultyFilter] = useState("All")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const categories = ["All", ...new Set(availableProjects.map((p) => p.category))]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredProjects = availableProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(search.toLowerCase()) ||
      project.description.toLowerCase().includes(search.toLowerCase()) ||
      project.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = categoryFilter === "All" || project.category === categoryFilter
    const matchesDifficulty = difficultyFilter === "All" || project.difficulty === difficultyFilter
    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const isProjectSelected = (projectId: string) => {
    return myProjects.some((p) => p.id === projectId)
  }

  const handleConfirmProject = (projectId: string) => {
    if (!isProjectSelected(projectId)) {
      confirmProject(projectId)
    }
  }

  const selectedProject = selectedProjectId ? availableProjects.find((p) => p.id === selectedProjectId) : null

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-2">
            Available Projects
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse and select projects to work on. Click on any project to view full details, requirements, and download the PDF guide.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
          {/* Search */}
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects, skills..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 sm:py-4 border-4 border-foreground bg-background text-foreground font-bold placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold border-4 border-foreground transition-all ${
                    categoryFilter === category
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="w-px bg-foreground/20 hidden sm:block" />

            <div className="flex flex-wrap gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setDifficultyFilter(difficulty)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-bold border-4 border-foreground transition-all ${
                    difficultyFilter === difficulty
                      ? "bg-foreground text-background"
                      : "bg-background text-foreground hover:bg-foreground/10"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 sm:mb-6">
          <span className="text-sm font-bold text-muted-foreground">
            {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
          {filteredProjects.map((project) => {
            const selected = isProjectSelected(project.id)
            return (
              <div
                key={project.id}
                className={`border-4 border-foreground p-4 sm:p-6 transition-all ${
                  selected ? "bg-foreground/5" : "bg-background hover:translate-x-1 hover:translate-y-1"
                }`}
                style={{ boxShadow: selected ? "none" : "4px 4px 0 0 currentColor" }}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div>
                    <span className={`inline-block px-2 py-1 text-xs font-bold uppercase tracking-wider mb-2 ${difficultyColors[project.difficulty]}`}>
                      {project.difficulty}
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">{project.title}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black">{project.points}</div>
                    <div className="text-xs text-muted-foreground font-bold">POINTS</div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs font-bold text-muted-foreground bg-muted-foreground/10 px-2 py-1">
                    {project.category}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground bg-muted-foreground/10 px-2 py-1">
                    {project.duration}
                  </span>
                  {project.pdfUrl && (
                    <span className="text-xs font-bold text-blue-600 bg-blue-600/10 px-2 py-1 flex items-center gap-1">
                      <FileIcon className="w-3 h-3" />
                      PDF Guide
                    </span>
                  )}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-bold border-2 border-foreground/30 px-2 py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedProjectId(project.id)}
                    className="w-full px-4 py-3 font-bold text-sm transition-all border-4 border-blue-600 bg-blue-600/10 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    View Details & PDF
                  </button>
                  <button
                    onClick={() => handleConfirmProject(project.id)}
                    disabled={selected}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 font-bold text-sm transition-all border-4 border-foreground ${
                      selected
                        ? "bg-foreground text-background cursor-not-allowed"
                        : "bg-background text-foreground hover:bg-foreground hover:text-background"
                    }`}
                  >
                    {selected ? (
                      <>
                        <CheckIcon className="w-4 h-4" />
                        Already Selected
                      </>
                    ) : (
                      <>
                        <PlusIcon className="w-4 h-4" />
                        Select Project
                      </>
                    )}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="border-4 border-dashed border-muted-foreground/30 p-8 sm:p-12 text-center">
            <div className="text-lg font-bold text-muted-foreground mb-2">
              No projects found
            </div>
            <p className="text-sm text-muted-foreground/70">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          isOpen={selectedProjectId !== null}
          onClose={() => setSelectedProjectId(null)}
          isSelected={isProjectSelected(selectedProject.id)}
          onSelect={handleConfirmProject}
        />
      )}
      </div>

      {/* Footer with Social Links */}
      <footer className="border-t-4 border-foreground py-8 sm:py-12 px-4 sm:px-6 md:px-12 bg-foreground/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="font-black text-lg sm:text-xl mb-2">FLANKERTECH</div>
              <p className="text-xs sm:text-sm text-muted-foreground">Building the future, one project at a time.</p>
            </div>
            
            <div className="flex items-center gap-4">
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

          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-foreground/20 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} FlankerTech Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
