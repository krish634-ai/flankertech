"use client"

import React, { useState } from "react"
import { useStore } from "@/lib/store"

const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
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

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

const EditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
)

export default function ProfilePage() {
  const { student, myProjects, getSkillLevels, updateProfile } = useStore()
  const skillLevels = getSkillLevels()
  const completedProjects = myProjects.filter((p) => p.status === "finished")
  
  const [isEditing, setIsEditing] = useState(false)
  const [editName, setEditName] = useState(student.name)
  const [editEmail, setEditEmail] = useState(student.email)
  const [editUsername, setEditUsername] = useState(student.username)
  const [editAvatar, setEditAvatar] = useState(student.avatar || "")

  const handleSaveProfile = () => {
    updateProfile({
      name: editName,
      email: editEmail,
      username: editUsername,
      avatar: editAvatar,
    })
    setIsEditing(false)
  }

  const handleOpenEdit = () => {
    setEditName(student.name)
    setEditEmail(student.email)
    setEditUsername(student.username)
    setEditAvatar(student.avatar || "")
    setIsEditing(true)
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getNextLevelPoints = () => {
    const currentLevelThreshold = (student.level - 1) * 500
    const nextLevelThreshold = student.level * 500
    const progressToNextLevel = student.totalPoints - currentLevelThreshold
    const pointsNeeded = nextLevelThreshold - student.totalPoints
    const progressPercent = (progressToNextLevel / 500) * 100
    return { pointsNeeded, progressPercent }
  }

  const { pointsNeeded, progressPercent } = getNextLevelPoints()

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      {/* Header */}
      <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-left-4 duration-500">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black mb-2">
          Profile
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          View your progress, skills, and achievements.
        </p>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div
            className="bg-background border-4 border-foreground w-full max-w-md"
            style={{ boxShadow: "8px 8px 0 0 currentColor" }}
          >
            <div className="flex items-center justify-between p-6 border-b-4 border-foreground">
              <h2 className="text-xl font-black">Edit Profile</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 hover:bg-muted-foreground/10 transition-colors"
              >
                <CloseIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Avatar Upload */}
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <div className="w-20 h-20 border-4 border-foreground bg-muted-foreground/10 flex items-center justify-center overflow-hidden">
                      {editAvatar ? (
                        <img src={editAvatar || "/placeholder.svg"} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon className="w-10 h-10 text-muted-foreground" />
                      )}
                    </div>
                    <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <CameraIcon className="w-6 h-6 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground">Click the image to upload a new photo. JPG, PNG or GIF.</p>
                    {editAvatar && (
                      <button
                        type="button"
                        onClick={() => setEditAvatar("")}
                        className="text-xs font-bold text-red-500 hover:text-red-600 mt-1"
                      >
                        Remove photo
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full border-4 border-foreground bg-background px-4 py-3 font-medium focus:outline-none transition-all focus:translate-x-1"
                />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full border-4 border-foreground bg-background px-4 py-3 font-medium focus:outline-none transition-all focus:translate-x-1"
                />
              </div>
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full border-4 border-foreground bg-background px-4 py-3 font-medium focus:outline-none transition-all focus:translate-x-1"
                />
              </div>
            </div>
            <div className="p-6 border-t-4 border-foreground flex gap-4">
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 border-4 border-foreground px-4 py-3 font-bold hover:bg-muted-foreground/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="flex-1 bg-foreground text-background px-4 py-3 font-bold border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform"
                style={{ boxShadow: "4px 4px 0 0 currentColor" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
        {/* Main Profile Info */}
        <div
          className="lg:col-span-2 border-4 border-foreground p-6 sm:p-8 bg-foreground text-background relative"
          style={{ boxShadow: "6px 6px 0 0 var(--foreground)" }}
        >
          {/* Edit Button */}
          <button
            onClick={handleOpenEdit}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 border-2 border-background/30 hover:bg-background/10 transition-colors"
          >
            <EditIcon className="w-5 h-5" />
          </button>
          
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-background bg-background/10 flex items-center justify-center overflow-hidden transition-transform hover:scale-105">
              {student.avatar ? (
                <img src={student.avatar || "/placeholder.svg"} alt={student.name} className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-10 h-10 sm:w-12 sm:h-12" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-black mb-1">{student.name}</h2>
              <p className="text-background/60 text-sm mb-1">@{student.username}</p>
              <p className="text-background/70 mb-4">{student.email}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Joined {formatDate(student.joinedAt)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Level Card */}
        <div
          className="border-4 border-foreground p-6 sm:p-8 bg-background"
          style={{ boxShadow: "6px 6px 0 0 currentColor" }}
        >
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 border-4 border-foreground mb-4">
              <span className="text-3xl sm:text-4xl font-black">{student.level}</span>
            </div>
            <div className="text-lg font-black mb-2">LEVEL</div>
            <div className="text-sm text-muted-foreground mb-4">
              {pointsNeeded > 0 ? `${pointsNeeded} points to next level` : "Max level reached!"}
            </div>
            <div className="h-3 bg-muted-foreground/20 border-2 border-foreground">
              <div
                className="h-full bg-foreground transition-all duration-500"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
        <div className="border-4 border-foreground p-4 sm:p-6 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none" style={{ boxShadow: "4px 4px 0 0 currentColor" }}>
          <TrophyIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-3" />
          <div className="text-2xl sm:text-3xl font-black mb-1">{student.totalPoints}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Total Points
          </div>
        </div>

        <div className="border-4 border-foreground p-4 sm:p-6 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none" style={{ boxShadow: "4px 4px 0 0 currentColor" }}>
          <CheckIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-3" />
          <div className="text-2xl sm:text-3xl font-black mb-1">{completedProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Completed
          </div>
        </div>

        <div className="border-4 border-foreground p-4 sm:p-6 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none" style={{ boxShadow: "4px 4px 0 0 currentColor" }}>
          <StarIcon className="w-6 h-6 sm:w-8 sm:h-8 mb-3" />
          <div className="text-2xl sm:text-3xl font-black mb-1">{skillLevels.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Skills
          </div>
        </div>

        <div className="border-4 border-foreground p-4 sm:p-6 transition-all duration-200 hover:translate-x-1 hover:translate-y-1 hover:shadow-none" style={{ boxShadow: "4px 4px 0 0 currentColor" }}>
          <div className="w-6 h-6 sm:w-8 sm:h-8 mb-3 font-black text-lg sm:text-xl">#</div>
          <div className="text-2xl sm:text-3xl font-black mb-1">{myProjects.length}</div>
          <div className="text-xs sm:text-sm text-muted-foreground font-bold uppercase tracking-wider">
            Total Projects
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="mb-8 sm:mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
        <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">Skills & Expertise</h3>
        
        {skillLevels.length === 0 ? (
          <div className="border-4 border-dashed border-muted-foreground/30 p-8 text-center">
            <StarIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <div className="text-lg font-bold text-muted-foreground mb-1">
              No skills yet
            </div>
            <p className="text-sm text-muted-foreground/70">
              Complete projects to build your skill portfolio.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skillLevels.map((skill) => (
              <div
                key={skill.skill}
                className="border-4 border-foreground p-4 sm:p-6"
                style={{ boxShadow: "4px 4px 0 0 currentColor" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-sm sm:text-base">{skill.skill}</span>
                  <span className="text-xs font-bold text-muted-foreground">
                    LVL {skill.level}
                  </span>
                </div>
                <div className="h-2 bg-muted-foreground/20 mb-2">
                  <div
                    className="h-full bg-foreground transition-all duration-500"
                    style={{ width: `${(skill.level / 10) * 100}%` }}
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  {skill.projects} project{skill.projects !== 1 ? "s" : ""} completed
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Projects Section */}
      <div>
        <h3 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">Completed Projects</h3>
        
        {completedProjects.length === 0 ? (
          <div className="border-4 border-dashed border-muted-foreground/30 p-8 text-center">
            <TrophyIcon className="w-10 h-10 mx-auto mb-3 text-muted-foreground/50" />
            <div className="text-lg font-bold text-muted-foreground mb-1">
              No completed projects yet
            </div>
            <p className="text-sm text-muted-foreground/70">
              Start working on projects to see them here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {completedProjects.map((project) => (
              <div
                key={project.id}
                className="border-4 border-foreground p-4 sm:p-6 bg-foreground text-background"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-xs font-bold text-background/70 uppercase tracking-wider">
                        {project.category}
                      </span>
                    </div>
                    <h4 className="text-lg font-black">{project.title}</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs font-bold border border-background/30 px-2 py-1 text-background/80"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-black">+{project.points}</div>
                    <div className="text-xs text-background/70">points earned</div>
                    {project.completedAt && (
                      <div className="text-xs text-background/50 mt-1">
                        {formatDate(project.completedAt)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
