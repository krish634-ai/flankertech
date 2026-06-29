"use client"

import React, { useState } from "react"

import Link from "next/link"
import { useStore, type ProjectStatus } from "@/lib/store"

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const PlayIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const AlertIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3.05h16.94a2 2 0 0 0 1.71-3.05L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
)

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-muted-foreground/20 text-muted-foreground border-muted-foreground/30",
    icon: ClockIcon,
    nextStatus: "working" as ProjectStatus,
    nextLabel: "Start Working",
  },
  working: {
    label: "In Progress",
    color: "bg-foreground/10 text-foreground border-foreground",
    icon: PlayIcon,
    nextStatus: null,
    nextLabel: null,
  },
  submitted: {
    label: "Submitted",
    color: "bg-yellow-500/20 text-yellow-700 border-yellow-500",
    icon: UploadIcon,
    nextStatus: null,
    nextLabel: null,
  },
  approved: {
    label: "Approved",
    color: "bg-green-500/20 text-green-600 border-green-500",
    icon: CheckIcon,
    nextStatus: null,
    nextLabel: null,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/20 text-red-600 border-red-500",
    icon: AlertIcon,
    nextStatus: null,
    nextLabel: null,
  },
}

export default function MyProjectsPage() {
  const { myProjects, updateProjectStatus, markNotificationAsRead } = useStore()
  const [expandedNotifications, setExpandedNotifications] = useState<Record<string, boolean>>({})

  const pendingProjects = myProjects.filter((p) => p.status === "pending")
  const workingProjects = myProjects.filter((p) => p.status === "working")
  const submittedProjects = myProjects.filter((p) => p.status === "submitted")
  const approvedProjects = myProjects.filter((p) => p.status === "approved")
  const rejectedProjects = myProjects.filter((p) => p.status === "rejected")
  const completedProjects = myProjects.filter((p) => p.status === "approved" || p.status === "rejected")

  const handleStatusChange = (projectId: string, newStatus: ProjectStatus) => {
    updateProjectStatus(projectId, newStatus)
  }

  if (myProjects.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-2">
            My Projects
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Track and manage your selected projects.
          </p>
        </div>

        <div className="border-4 border-dashed border-muted-foreground/30 p-8 sm:p-12 text-center">
          <div className="text-lg font-bold text-muted-foreground mb-2">
            No projects selected yet
          </div>
          <p className="text-sm text-muted-foreground/70 mb-6">
            Browse available projects and select ones you want to work on.
          </p>
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background font-bold text-sm hover:translate-x-1 hover:translate-y-1 transition-transform border-4 border-foreground"
            style={{ boxShadow: "4px 4px 0 0 currentColor" }}
          >
            Browse Projects
            <ArrowIcon className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-2">
          My Projects
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Complete the workflow: Start → Submit → Get Approved → Earn Points
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-8 sm:mb-12">
        <div className="border-4 border-foreground p-3 sm:p-6">
          <div className="text-xl sm:text-3xl font-black mb-1">{pendingProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold">Pending</div>
        </div>
        <div className="border-4 border-foreground p-3 sm:p-6 bg-foreground/5">
          <div className="text-xl sm:text-3xl font-black mb-1">{workingProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold">Working</div>
        </div>
        <div className="border-4 border-foreground p-3 sm:p-6 bg-yellow-500/10">
          <div className="text-xl sm:text-3xl font-black mb-1">{submittedProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold">Submitted</div>
        </div>
        <div className="border-4 border-foreground p-3 sm:p-6 bg-green-500/10">
          <div className="text-xl sm:text-3xl font-black mb-1">{approvedProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold">Approved</div>
        </div>
      </div>

      {/* Completed Projects */}
      {workingProjects.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2">
            <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Ready to Submit ({workingProjects.length})
          </h2>
          <div className="space-y-4">
            {workingProjects.map((project) => {
              const config = statusConfig[project.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={project.id}
                  className="border-4 border-foreground p-4 sm:p-6 bg-foreground text-background"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider bg-background text-foreground">
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-xs font-bold text-background/70">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black mb-1">{project.title}</h3>
                      <p className="text-sm text-background/70 line-clamp-2 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="text-xs font-bold border-2 border-background/30 px-2 py-1 text-background/80">
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 2 && (
                          <span className="text-xs font-bold text-background/70">
                            +{project.skills.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black">{project.points}</div>
                        <div className="text-xs text-background/70 font-bold">POINTS</div>
                      </div>
                      <Link
                        href={`/dashboard/my-projects/submit?projectId=${project.id}`}
                        className="px-4 py-2 bg-background text-foreground font-bold text-sm border-4 border-background hover:translate-x-1 hover:translate-y-1 transition-transform whitespace-nowrap"
                        style={{ boxShadow: "2px 2px 0 0 rgb(0,0,0)" }}
                      >
                        Submit Now
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Submitted Projects */}
      {submittedProjects.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2">
            <UploadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Pending Approval ({submittedProjects.length})
          </h2>
          <div className="space-y-4">
            {submittedProjects.map((project) => {
              const config = statusConfig[project.status]
              const StatusIcon = config.icon
              const unreadNotifs = (project.notifications || []).filter((n) => !n.read)
              return (
                <div
                  key={project.id}
                  className="border-4 border-foreground p-4 sm:p-6 bg-yellow-500/10 relative"
                  style={{ boxShadow: "4px 4px 0 0 currentColor" }}
                >
                  {unreadNotifs.length > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {unreadNotifs.length}
                    </div>
                  )}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-xs font-bold text-foreground/60">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black mb-1">{project.title}</h3>
                      <p className="text-sm text-foreground/60 line-clamp-1">Waiting for admin review...</p>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black">{project.points}</div>
                        <div className="text-xs text-foreground/60 font-bold">POTENTIAL</div>
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  {(project.notifications || []).length > 0 && (
                    <div className="mt-4 pt-4 border-t-4 border-yellow-500/50">
                      {(project.notifications || []).map((notif) => (
                        <div key={notif.id} className={`p-3 mb-2 border-l-4 ${
                          notif.type === "approved" 
                            ? "border-green-500 bg-green-500/10" 
                            : "border-red-500 bg-red-500/10"
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-bold text-sm mb-1">
                                {notif.type === "approved" ? "Approved! ✓" : "Rejected ✗"}
                              </p>
                              <p className="text-xs text-foreground/70">{notif.message}</p>
                            </div>
                            {!notif.read && (
                              <button
                                onClick={() => markNotificationAsRead(project.id, notif.id)}
                                className="text-xs font-bold ml-2 px-2 py-1 bg-foreground/20 hover:bg-foreground/30 rounded"
                              >
                                Mark Read
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Rejected Projects */}
      {rejectedProjects.length > 0 && (
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2">
            <AlertIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Needs Resubmission ({rejectedProjects.length})
          </h2>
          <div className="space-y-4">
            {rejectedProjects.map((project) => {
              const config = statusConfig[project.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={project.id}
                  className="border-4 border-red-500 p-4 sm:p-6 bg-red-500/10"
                  style={{ boxShadow: "4px 4px 0 0 currentColor" }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-xs font-bold text-red-700">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black mb-2">{project.title}</h3>
                      {project.submission?.rejectionReason && (
                        <div className="bg-red-500/20 p-2 rounded border-l-4 border-red-600 mb-2">
                          <p className="text-xs font-bold text-red-700 mb-1">Rejection Reason:</p>
                          <p className="text-sm text-red-700">{project.submission.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <Link
                        href={`/dashboard/my-projects/submit?projectId=${project.id}`}
                        className="px-4 py-2 bg-red-600 text-white font-bold text-sm border-4 border-red-600 hover:translate-x-1 hover:translate-y-1 transition-transform whitespace-nowrap"
                        style={{ boxShadow: "2px 2px 0 0 currentColor" }}
                      >
                        Resubmit
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Approved Projects */}
      {approvedProjects.length > 0 && (
        <div>
          <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2">
            <CheckIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Completed ({approvedProjects.length})
          </h2>
          <div className="space-y-4">
            {approvedProjects.map((project) => {
              const config = statusConfig[project.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={project.id}
                  className="border-4 border-green-500 p-4 sm:p-6 bg-green-500/10"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider bg-green-600 text-white">
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-xs font-bold text-green-700">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black mb-1">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.skills.slice(0, 3).map((skill) => (
                          <span key={skill} className="text-xs font-bold border-2 border-green-600 px-2 py-1 text-green-700">
                            {skill}
                          </span>
                        ))}
                        {project.skills.length > 3 && (
                          <span className="text-xs font-bold text-green-700">
                            +{project.skills.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <div className="text-right">
                        <div className="text-2xl font-black text-green-700">{project.points}</div>
                        <div className="text-xs text-green-700 font-bold">POINTS EARNED</div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Pending Projects */}
      {pendingProjects.length > 0 && (
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6 flex items-center gap-2">
            <ClockIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            Pending Start ({pendingProjects.length})
          </h2>
          <div className="space-y-4">
            {pendingProjects.map((project) => {
              const config = statusConfig[project.status]
              const StatusIcon = config.icon
              return (
                <div
                  key={project.id}
                  className="border-4 border-foreground p-4 sm:p-6 bg-background hover:translate-x-1 hover:translate-y-1 transition-transform"
                  style={{ boxShadow: "4px 4px 0 0 currentColor" }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-bold uppercase tracking-wider border-2 ${config.color}`}>
                          <StatusIcon className="w-3 h-3" />
                          {config.label}
                        </span>
                        <span className="text-xs font-bold text-muted-foreground">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black mb-1">{project.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{project.description}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-black">{project.points}</div>
                        <div className="text-xs text-muted-foreground font-bold">POINTS</div>
                      </div>
                      <button
                        onClick={() => handleStatusChange(project.id, "working")}
                        className="px-4 py-2 bg-foreground text-background font-bold text-sm border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform whitespace-nowrap"
                      >
                        Start
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
