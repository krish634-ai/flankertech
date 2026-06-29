"use client"

import React from "react"

import Link from "next/link"
import { useStore } from "@/lib/store"
import NotificationsPanel from "@/components/notifications-panel"

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

const TrophyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
)

const statusColors = {
  pending: "bg-muted-foreground/20 text-muted-foreground",
  working: "bg-foreground text-background",
  finished: "bg-foreground text-background",
}

const statusLabels = {
  pending: "Pending",
  working: "In Progress",
  finished: "Completed",
}

export default function DashboardPage() {
  const { student, myProjects, availableProjects } = useStore()

  const pendingProjects = myProjects.filter((p) => p.status === "pending")
  const workingProjects = myProjects.filter((p) => p.status === "working")
  const completedProjects = myProjects.filter((p) => p.status === "finished")

  const recentProjects = myProjects.slice(-3).reverse()

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Header with Notifications */}
      <div className="flex items-start justify-between mb-8 sm:mb-12">
        <div className="animate-in fade-in slide-in-from-left-4 duration-500 flex-1">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-2">
            Welcome back,
          </h1>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-muted-foreground">
            {student.name ? student.name.split(" ")[0] : "Student"}
          </h2>
          <p className="text-muted-foreground mt-2">@{student.username || "user"}</p>
        </div>
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <NotificationsPanel />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        <div
          className="border-4 border-foreground p-4 sm:p-6 bg-background transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          style={{ boxShadow: "4px 4px 0 0 currentColor" }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
            {student.level}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Level
          </div>
        </div>

        <div
          className="border-4 border-foreground p-4 sm:p-6 bg-background transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          style={{ boxShadow: "4px 4px 0 0 currentColor" }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
            {student.totalPoints}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Points
          </div>
        </div>

        <div
          className="border-4 border-foreground p-4 sm:p-6 bg-background transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          style={{ boxShadow: "4px 4px 0 0 currentColor" }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
            {completedProjects.length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Completed
          </div>
        </div>

        <div
          className="border-4 border-foreground p-4 sm:p-6 bg-background transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
          style={{ boxShadow: "4px 4px 0 0 currentColor" }}
        >
          <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1">
            {workingProjects.length}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            In Progress
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <Link
          href="/dashboard/projects"
          className="group border-4 border-foreground p-6 sm:p-8 bg-foreground text-background hover:translate-x-2 hover:translate-y-2 transition-transform"
          style={{ boxShadow: "6px 6px 0 0 currentColor" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-black mb-2">Browse Projects</div>
              <div className="text-sm text-background/70">
                {availableProjects.length} projects available
              </div>
            </div>
            <ArrowIcon className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>

        <Link
          href="/dashboard/my-projects"
          className="group border-4 border-foreground p-6 sm:p-8 bg-background hover:translate-x-2 hover:translate-y-2 transition-transform"
          style={{ boxShadow: "6px 6px 0 0 currentColor" }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl sm:text-2xl font-black mb-2">My Projects</div>
              <div className="text-sm text-muted-foreground">
                {myProjects.length} projects selected
              </div>
            </div>
            <ArrowIcon className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-black">Recent Projects</h3>
          <Link
            href="/dashboard/my-projects"
            className="text-sm font-bold text-muted-foreground hover:text-foreground transition-colors"
          >
            View All
          </Link>
        </div>

        {recentProjects.length === 0 ? (
          <div
            className="border-4 border-dashed border-muted-foreground/30 p-8 sm:p-12 text-center"
          >
            <TrophyIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
            <div className="text-lg font-bold text-muted-foreground mb-2">
              No projects yet
            </div>
            <p className="text-sm text-muted-foreground/70 mb-4">
              Start by browsing available projects and selecting one to work on.
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
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="border-4 border-foreground p-4 sm:p-6 bg-background hover:translate-x-1 hover:translate-y-1 transition-transform"
                style={{ boxShadow: "4px 4px 0 0 currentColor" }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="text-lg sm:text-xl font-black mb-1">
                      {project.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.category} • {project.points} points
                    </div>
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-bold uppercase tracking-wider ${statusColors[project.status]}`}
                  >
                    {statusLabels[project.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Progress Overview */}
      {myProjects.length > 0 && (
        <div>
          <h3 className="text-xl sm:text-2xl font-black mb-6">Progress Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-4 border-foreground p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-black mb-1">
                {pendingProjects.length}
              </div>
              <div className="text-sm text-muted-foreground font-bold">Pending</div>
              <div className="mt-3 h-2 bg-muted-foreground/20">
                <div
                  className="h-full bg-muted-foreground/50"
                  style={{
                    width: `${myProjects.length > 0 ? (pendingProjects.length / myProjects.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="border-4 border-foreground p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-black mb-1">
                {workingProjects.length}
              </div>
              <div className="text-sm text-muted-foreground font-bold">Working</div>
              <div className="mt-3 h-2 bg-muted-foreground/20">
                <div
                  className="h-full bg-foreground"
                  style={{
                    width: `${myProjects.length > 0 ? (workingProjects.length / myProjects.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div className="border-4 border-foreground p-4 sm:p-6">
              <div className="text-2xl sm:text-3xl font-black mb-1">
                {completedProjects.length}
              </div>
              <div className="text-sm text-muted-foreground font-bold">Finished</div>
              <div className="mt-3 h-2 bg-muted-foreground/20">
                <div
                  className="h-full bg-foreground"
                  style={{
                    width: `${myProjects.length > 0 ? (completedProjects.length / myProjects.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
