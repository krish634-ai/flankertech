"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useStore } from "@/lib/store"
import SubmissionForm from "@/components/submission-form"

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function SubmitProjectPage() {
  const searchParams = useSearchParams()
  const projectId = searchParams.get("projectId")
  const { myProjects } = useStore()

  const project = myProjects.find((p) => p.id === projectId)

  if (!projectId || !project) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl font-black">Submit Project</h1>
          <p className="text-foreground/60 mt-2">Project not found</p>
        </div>

        <div className="border-4 border-dashed border-red-500 p-8 text-center">
          <p className="text-lg font-bold text-red-600 mb-6">
            Unable to find the project to submit.
          </p>
          <Link
            href="/dashboard/my-projects"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background font-bold border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform"
            style={{ boxShadow: "4px 4px 0 0 currentColor" }}
          >
            <ArrowIcon className="w-4 h-4 mr-2" />
            Back to My Projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mb-8">
        <Link
          href="/dashboard/my-projects"
          className="inline-flex items-center gap-1 text-foreground/60 hover:text-foreground mb-4 text-sm font-bold"
        >
          <ArrowIcon className="w-4 h-4 rotate-180" />
          Back
        </Link>
        <h1 className="text-3xl sm:text-5xl font-black mb-2">
          Submit "{project.title}"
        </h1>
        <p className="text-foreground/60">
          Submit your completed project files and screenshots for admin review.
        </p>
      </div>

      <div className="max-w-3xl">
        {/* Project Info */}
        <div className="border-4 border-foreground p-4 sm:p-6 mb-8 bg-foreground/5">
          <h2 className="font-bold text-sm uppercase mb-3">Project Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-foreground/60 font-bold">Category</p>
              <p className="font-bold">{project.category}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 font-bold">Difficulty</p>
              <p className="font-bold">{project.difficulty}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 font-bold">Duration</p>
              <p className="font-bold">{project.duration}</p>
            </div>
            <div>
              <p className="text-xs text-foreground/60 font-bold">Points Reward</p>
              <p className="font-bold text-lg">{project.points} pts</p>
            </div>
          </div>
          {project.requirements && project.requirements.length > 0 && (
            <div className="mt-4 pt-4 border-t-2 border-foreground/20">
              <p className="text-xs text-foreground/60 font-bold mb-2">Requirements:</p>
              <ul className="text-sm space-y-1">
                {project.requirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-bold">•</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Submission Form */}
        <SubmissionForm projectId={project.id} projectTitle={project.title} />
      </div>
    </div>
  )
}
