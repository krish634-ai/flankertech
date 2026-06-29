"use client"

import React, { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import type { Project } from "@/lib/store"

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const DownloadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const FileIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

interface ProjectDetailModalProps {
  project: Project
  isOpen: boolean
  onClose: () => void
  isSelected: boolean
  onSelect: (projectId: string) => void
}

function ModalContent({
  project,
  isOpen,
  onClose,
  isSelected,
  onSelect,
}: ProjectDetailModalProps) {
  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Escape key closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  const handlePdfDownload = () => {
    if (project.pdfUrl) {
      window.open(project.pdfUrl, "_blank")
    }
  }

  if (typeof window === "undefined") return null

  return createPortal(
    <>
      {/* Blurred backdrop */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: isOpen ? 1 : 0,
          transition: "opacity 0.25s ease",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal — dead-center using flex on the viewport */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
        style={{ pointerEvents: "none" }}
        aria-hidden="true"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          className="bg-background border-4 border-foreground w-full max-w-2xl flex flex-col"
          style={{
            pointerEvents: "auto",
            maxHeight: "90vh",
            transform: isOpen ? "scale(1) translateY(0)" : "scale(0.95) translateY(16px)",
            opacity: isOpen ? 1 : 0,
            transition: "transform 0.25s ease, opacity 0.25s ease",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header — sticky inside the modal box */}
          <div className="border-b-4 border-foreground p-4 sm:p-6 flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex-1 min-w-0">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider bg-foreground/20 border-2 border-foreground mb-2">
                {project.difficulty}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight">{project.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 hover:bg-foreground/10 border-2 border-foreground/20 hover:border-foreground transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1">
            <div className="p-4 sm:p-6 space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                <div className="border-4 border-foreground p-3 text-center">
                  <div className="text-2xl font-black mb-1">{project.points}</div>
                  <div className="text-xs font-bold text-foreground/60">POINTS</div>
                </div>
                <div className="border-4 border-foreground p-3 text-center">
                  <div className="text-xl font-black mb-1">{project.duration}</div>
                  <div className="text-xs font-bold text-foreground/60">DURATION</div>
                </div>
                <div className="border-4 border-foreground p-3 text-center">
                  <div className="text-lg font-black mb-1">{project.skills.length}</div>
                  <div className="text-xs font-bold text-foreground/60">SKILLS</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-black mb-3">Description</h3>
                <p className="text-foreground/80 leading-relaxed">{project.description}</p>
              </div>

              {/* Project Goal */}
              {project.projectGoal && (
                <div className="border-l-4 border-foreground bg-foreground/5 p-4">
                  <h3 className="text-lg font-black mb-2">Project Goal</h3>
                  <p className="text-foreground/80">{project.projectGoal}</p>
                </div>
              )}

              {/* Requirements */}
              {project.requirements && project.requirements.length > 0 && (
                <div>
                  <h3 className="text-lg font-black mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {project.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 p-2 border-l-4 border-foreground/30">
                        <CheckIcon className="w-5 h-5 flex-shrink-0 text-foreground/60 mt-0.5" />
                        <span className="text-foreground/80">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div>
                <h3 className="text-lg font-black mb-3">Skills You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 border-2 border-foreground font-bold text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Category & Duration Info */}
              <div className="grid grid-cols-2 gap-4 bg-foreground/5 p-4 border-4 border-foreground/20">
                <div>
                  <p className="text-xs font-bold text-foreground/60 mb-1">CATEGORY</p>
                  <p className="font-black">{project.category}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground/60 mb-1">DIFFICULTY LEVEL</p>
                  <p className="font-black">{project.difficulty}</p>
                </div>
              </div>

              {/* PDF Download */}
              <div className="border-4 border-blue-600 bg-blue-600/5 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <FileIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-bold text-blue-600">Project Documentation</p>
                    <p className="text-xs text-foreground/60">PDF guide with detailed instructions</p>
                  </div>
                </div>
                {project.pdfUrl ? (
                  <button
                    onClick={handlePdfDownload}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-bold border-4 border-blue-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
                    style={{ boxShadow: "2px 2px 0 0 #1d4ed8" }}
                  >
                    <DownloadIcon className="w-5 h-5" />
                    Download PDF Guide
                  </button>
                ) : (
                  <div className="p-3 bg-blue-600/20 border-2 border-blue-600 text-blue-700 font-bold text-center">
                    PDF documentation available in preparation
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-foreground p-4 sm:p-6 flex gap-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 font-bold border-4 border-foreground/30 hover:border-foreground transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onSelect(project.id)
                onClose()
              }}
              disabled={isSelected}
              className={`flex-1 px-4 py-3 font-bold border-4 border-foreground transition-all flex items-center justify-center gap-2 ${
                isSelected
                  ? "bg-foreground text-background opacity-50 cursor-not-allowed"
                  : "bg-foreground text-background hover:translate-x-1 hover:translate-y-1"
              }`}
              style={!isSelected ? { boxShadow: "2px 2px 0 0 currentColor" } : undefined}
            >
              {isSelected ? (
                <>
                  <CheckIcon className="w-5 h-5" />
                  Already Selected
                </>
              ) : (
                <>Select Project</>
              )}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default function ProjectDetailModal(props: ProjectDetailModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!props.isOpen || !mounted) return null

  return <ModalContent {...props} />
}
