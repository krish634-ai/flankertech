"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
)

const PlusIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

export default function AdminPage() {
  const router = useRouter()
  const { student, availableProjects, addProject, updateProject, deleteProject, isAuthenticated, getAllSubmissions } = useStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectGoal: "",
    category: "",
    difficulty: "Beginner" as "Beginner" | "Intermediate" | "Advanced",
    skills: "",
    duration: "",
    points: 0,
    requirements: "",
  })

  // Check authorization
  if (!isAuthenticated || (student.role !== "admin" && student.role !== "developer")) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-foreground/60 mb-6">You don't have permission to access this page.</p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Go back to dashboard
        </Link>
      </div>
    )
  }

  const submissions = getAllSubmissions()
  const pendingSubmissions = submissions.filter((s) => s.status === "pending_review")

  const handleAddProject = () => {
    if (formData.title && formData.description && formData.category) {
      addProject({
        title: formData.title,
        description: formData.description,
        projectGoal: formData.projectGoal,
        category: formData.category,
        difficulty: formData.difficulty,
        skills: formData.skills.split(",").map((s) => s.trim()),
        duration: formData.duration,
        points: formData.points,
        requirements: formData.requirements.split(",").map((r) => r.trim()),
      })

      setFormData({
        title: "",
        description: "",
        projectGoal: "",
        category: "",
        difficulty: "Beginner",
        skills: "",
        duration: "",
        points: 0,
        requirements: "",
      })
      setShowAddForm(false)
    }
  }

  const myProjects = availableProjects.filter((p) => p.createdBy === student.id)

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-black mb-2">Admin Dashboard</h1>
        <p className="text-foreground/60">Manage projects and review student submissions</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {/* Projects Management */}
        <div className="border-4 border-foreground p-6 bg-foreground/5">
          <h2 className="text-xl font-bold mb-4">Project Management</h2>
          <p className="text-foreground/60 text-sm mb-4">Create and manage available projects for students</p>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="px-6 py-3 bg-foreground text-background font-bold border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform"
            style={{ boxShadow: "2px 2px 0 0 currentColor" }}
          >
            <PlusIcon className="w-4 h-4 inline mr-2" />
            Add New Project
          </button>
        </div>

        {/* Submissions Review */}
        <div className="border-4 border-blue-600 p-6 bg-blue-600/5">
          <h2 className="text-xl font-bold mb-4">Review Submissions</h2>
          <p className="text-foreground/60 text-sm mb-4">
            {pendingSubmissions.length} pending submission{pendingSubmissions.length !== 1 ? "s" : ""}
          </p>
          <Link
            href="/dashboard/submissions"
            className="inline-flex px-6 py-3 bg-blue-600 text-white font-bold border-4 border-blue-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
            style={{ boxShadow: "2px 2px 0 0 currentColor" }}
          >
            Review Now
          </Link>
        </div>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="mb-8 p-6 border-4 border-foreground bg-foreground/5">
          <h2 className="text-2xl font-bold mb-6">Create New Project</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Project Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            />
            <input
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            />
            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono md:col-span-2"
              rows={3}
            />
            <textarea
              placeholder="Project Goal"
              value={formData.projectGoal}
              onChange={(e) => setFormData({ ...formData, projectGoal: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono md:col-span-2"
              rows={2}
            />
            <input
              type="text"
              placeholder="Skills (comma-separated)"
              value={formData.skills}
              onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            />
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as "Beginner" | "Intermediate" | "Advanced" })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <input
              type="text"
              placeholder="Duration (e.g., 2 weeks)"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            />
            <input
              type="number"
              placeholder="Points"
              value={formData.points}
              onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono"
            />
            <textarea
              placeholder="Requirements (comma-separated)"
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="px-4 py-2 bg-background border-4 border-foreground/20 focus:border-foreground focus:outline-none font-mono md:col-span-2"
              rows={2}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddProject}
              className="px-6 py-3 bg-green-600 text-white font-bold border-4 border-green-600 hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              Create Project
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 bg-foreground/10 border-4 border-foreground/20 font-bold hover:translate-x-1 hover:translate-y-1 transition-transform"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 gap-4">
        <h2 className="text-2xl font-bold mb-4">Your Projects ({myProjects.length})</h2>
        {myProjects.length === 0 ? (
          <p className="text-foreground/60 py-8 text-center">No projects yet. Create one to get started!</p>
        ) : (
          myProjects.map((project) => (
            <div key={project.id} className="p-6 border-4 border-foreground bg-foreground/5 hover:translate-x-1 hover:translate-y-1 transition-transform">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-foreground/70 mb-3">{project.description}</p>
                  {project.projectGoal && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-foreground/60">Goal:</p>
                      <p className="text-foreground/70">{project.projectGoal}</p>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-foreground/20 border-2 border-foreground text-sm font-bold">{project.category}</span>
                    <span className="px-3 py-1 bg-foreground/20 border-2 border-foreground text-sm font-bold">{project.difficulty}</span>
                    <span className="px-3 py-1 bg-foreground/20 border-2 border-foreground text-sm font-bold">{project.duration}</span>
                    <span className="px-3 py-1 bg-blue-600/20 text-blue-700 border-2 border-blue-600 text-sm font-bold">{project.points} pts</span>
                  </div>
                  {project.skills && (
                    <div className="mb-3">
                      <p className="text-sm font-semibold text-foreground/60 mb-1">Skills:</p>
                      <div className="flex flex-wrap gap-1">
                        {project.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-foreground/10 border border-foreground/30 text-xs rounded font-bold">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingId(project.id)}
                    className="p-3 hover:bg-foreground/20 border-2 border-foreground/30 transition-colors"
                    title="Edit"
                  >
                    <EditIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-3 hover:bg-red-600/20 border-2 border-red-600/30 transition-colors text-red-600"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
