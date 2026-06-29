"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export type ProjectStatus = "pending" | "working" | "submitted" | "approved" | "rejected"
export type UserRole = "student" | "admin" | "developer"
export type SubmissionStatus = "pending_review" | "approved" | "rejected"

export interface Project {
  id: string
  title: string
  description: string
  category: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  skills: string[]
  duration: string
  points: number
  projectGoal?: string
  requirements?: string[]
  pdfUrl?: string
  createdBy?: string
  createdAt?: string
}

export interface Submission {
  id: string
  projectId: string
  studentId: string
  zipUrl: string
  screenshots: string[]
  description: string
  submissionDate: string
  status: SubmissionStatus
  reviewedBy?: string
  reviewedAt?: string
  rejectionReason?: string
}

export interface StudentProject extends Project {
  status: ProjectStatus
  startedAt: string
  completedAt?: string
  submission?: Submission
  notifications: Array<{
    id: string
    type: "approved" | "rejected"
    message: string
    read: boolean
    createdAt: string
  }>
}

export interface Student {
  id: string
  name: string
  email: string
  username: string
  avatar?: string
  joinedAt: string
  level: number
  totalPoints: number
  completedProjects: number
  role: UserRole
}

interface StoreState {
  isAuthenticated: boolean
  student: Student
  myProjects: StudentProject[]
  availableProjects: Project[]
  submissions: Submission[]
  login: (email: string, password: string) => boolean
  register: (name: string, email: string, username: string, password: string, role?: UserRole) => boolean
  logout: () => void
  updateProfile: (data: { name?: string; email?: string; username?: string; avatar?: string }) => void
  confirmProject: (projectId: string) => void
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void
  getSkillLevels: () => { skill: string; level: number; projects: number }[]
  addProject: (project: Omit<Project, "id">) => void
  updateProject: (projectId: string, data: Partial<Project>) => void
  deleteProject: (projectId: string) => void
  submitProject: (projectId: string, zipUrl: string, screenshots: string[], description: string) => Submission
  approveSubmission: (submissionId: string, reviewedBy: string) => void
  rejectSubmission: (submissionId: string, reason: string, reviewedBy: string) => void
  addNotification: (projectId: string, type: "approved" | "rejected", message: string) => void
  markNotificationAsRead: (projectId: string, notificationId: string) => void
  getAllSubmissions: () => Submission[]
}

const availableProjectsData: Project[] = [
  {
    id: "1",
    title: "E-Commerce Dashboard",
    description: "Build a comprehensive admin dashboard for managing products, orders, and customers with analytics.",
    category: "Web Development",
    difficulty: "Advanced",
    skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    duration: "4 weeks",
    points: 500,
    projectGoal: "Create a full-featured admin dashboard with real-time analytics, inventory management, and order processing capabilities.",
    requirements: [
      "Responsive dashboard layout with multiple views",
      "Product CRUD operations",
      "Order management with status tracking",
      "Customer analytics and reports",
      "Real-time data updates",
      "User authentication and authorization",
      "Database integration",
    ],
    pdfUrl: "https://example.com/ecommerce-dashboard-guide.pdf",
  },
  {
    id: "2",
    title: "Weather App",
    description: "Create a responsive weather application with real-time data and location-based forecasts.",
    category: "Mobile Development",
    difficulty: "Beginner",
    skills: ["React Native", "API Integration", "UI/UX"],
    duration: "2 weeks",
    points: 200,
    projectGoal: "Build a mobile weather application that displays current weather and 7-day forecasts based on user location.",
    requirements: [
      "Geolocation integration",
      "Real-time weather API integration",
      "Current weather display",
      "7-day forecast view",
      "Search by city",
      "Weather alerts",
      "Responsive UI design",
    ],
    pdfUrl: "https://example.com/weather-app-guide.pdf",
  },
  {
    id: "3",
    title: "Task Management System",
    description: "Develop a collaborative task management tool with real-time updates and team features.",
    category: "Full Stack",
    difficulty: "Intermediate",
    skills: ["Next.js", "Prisma", "WebSocket", "Authentication"],
    duration: "3 weeks",
    points: 350,
    projectGoal: "Create a team collaboration tool for managing tasks with real-time updates and team communication features.",
    requirements: [
      "User authentication and team management",
      "Task creation, editing, and deletion",
      "Task assignment to team members",
      "Real-time notifications",
      "Task priority and status tracking",
      "Team collaboration features",
      "Activity logging",
    ],
    pdfUrl: "https://example.com/task-management-guide.pdf",
  },
  {
    id: "4",
    title: "Portfolio Website",
    description: "Design and build a stunning portfolio website with animations and modern design principles.",
    category: "Frontend",
    difficulty: "Beginner",
    skills: ["HTML/CSS", "JavaScript", "Responsive Design"],
    duration: "1 week",
    points: 150,
    projectGoal: "Build an impressive personal portfolio website showcasing your projects and skills with smooth animations.",
    requirements: [
      "Responsive design for all devices",
      "Smooth page transitions and animations",
      "Project showcase section",
      "About and skills sections",
      "Contact form integration",
      "SEO optimization",
      "Performance optimization",
    ],
    pdfUrl: "https://example.com/portfolio-guide.pdf",
  },
  {
    id: "5",
    title: "REST API Development",
    description: "Create a scalable REST API with authentication, rate limiting, and comprehensive documentation.",
    category: "Backend",
    difficulty: "Intermediate",
    skills: ["Node.js", "Express", "MongoDB", "JWT"],
    duration: "2 weeks",
    points: 300,
    projectGoal: "Develop a production-ready REST API with proper authentication, validation, and error handling.",
    requirements: [
      "RESTful API design principles",
      "JWT authentication",
      "Input validation and sanitization",
      "Error handling and logging",
      "Rate limiting and security headers",
      "API documentation (Swagger/OpenAPI)",
      "Unit tests",
      "Database integration",
    ],
    pdfUrl: "https://example.com/rest-api-guide.pdf",
  },
  {
    id: "6",
    title: "Machine Learning Model",
    description: "Build and deploy a machine learning model for image classification with a web interface.",
    category: "AI/ML",
    difficulty: "Advanced",
    skills: ["Python", "TensorFlow", "Flask", "Docker"],
    duration: "5 weeks",
    points: 600,
    projectGoal: "Create and deploy a machine learning model that classifies images and integrates with a web application.",
    requirements: [
      "Dataset preparation and preprocessing",
      "Model training and validation",
      "Model optimization",
      "Web interface for predictions",
      "API endpoint for predictions",
      "Model versioning and deployment",
      "Performance metrics and monitoring",
    ],
    pdfUrl: "https://example.com/ml-model-guide.pdf",
  },
  {
    id: "7",
    title: "Chat Application",
    description: "Create a real-time chat application with private messaging and group chat features.",
    category: "Full Stack",
    difficulty: "Intermediate",
    skills: ["Socket.io", "React", "Node.js", "Redis"],
    duration: "3 weeks",
    points: 400,
    projectGoal: "Build a real-time chat platform with private messaging, group chats, and user presence indicators.",
    requirements: [
      "User authentication",
      "Real-time messaging with WebSockets",
      "Private and group chat features",
      "User presence and typing indicators",
      "Message history",
      "User search and discovery",
      "Notifications and alerts",
    ],
    pdfUrl: "https://example.com/chat-app-guide.pdf",
  },
  {
    id: "8",
    title: "Blog Platform",
    description: "Build a full-featured blog platform with markdown support, comments, and SEO optimization.",
    category: "Web Development",
    difficulty: "Beginner",
    skills: ["Next.js", "MDX", "Tailwind CSS"],
    duration: "2 weeks",
    points: 250,
    projectGoal: "Create a modern blog platform with markdown support, rich content editing, and user engagement features.",
    requirements: [
      "Blog post creation with markdown",
      "Categories and tags",
      "Comments system",
      "Search functionality",
      "Responsive design",
      "SEO optimization",
      "Social sharing features",
    ],
    pdfUrl: "https://example.com/blog-platform-guide.pdf",
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      student: {
        id: "",
        name: "",
        email: "",
        username: "",
        joinedAt: "",
        level: 1,
        totalPoints: 0,
        completedProjects: 0,
        role: "student",
      },
      myProjects: [],
      availableProjects: availableProjectsData,
      submissions: [],

      login: (email: string, _password: string) => {
        const { student } = get()
        if (student.email === email) {
          set({ isAuthenticated: true })
          return true
        }
        return false
      },

      register: (name: string, email: string, username: string, _password: string, role: UserRole = "student") => {
        set({
          isAuthenticated: true,
          student: {
            id: `${role}-${Date.now()}`,
            name,
            email,
            username,
            joinedAt: new Date().toISOString(),
            level: 1,
            totalPoints: 0,
            completedProjects: 0,
            role,
          },
        })
        return true
      },

      logout: () => {
        set({ isAuthenticated: false })
      },

      updateProfile: (data: { name?: string; email?: string; username?: string; avatar?: string }) => {
        const { student } = get()
        set({
          student: {
            ...student,
            ...(data.name && { name: data.name }),
            ...(data.email && { email: data.email }),
            ...(data.username && { username: data.username }),
            ...(data.avatar !== undefined && { avatar: data.avatar }),
          },
        })
      },

      confirmProject: (projectId: string) => {
        const { availableProjects, myProjects } = get()
        const project = availableProjects.find((p) => p.id === projectId)

        if (project && !myProjects.find((p) => p.id === projectId)) {
          const studentProject: StudentProject = {
            ...project,
            status: "pending",
            startedAt: new Date().toISOString(),
            notifications: [],
          }

          set({
            myProjects: [...myProjects, studentProject],
          })
        }
      },

      updateProjectStatus: (projectId: string, status: ProjectStatus) => {
        const { myProjects, student } = get()

        const updatedProjects = myProjects.map((p) => {
          if (p.id === projectId) {
            return { ...p, status }
          }
          return p
        })

        const approvedCount = updatedProjects.filter((p) => p.status === "approved").length
        const totalPoints = updatedProjects
          .filter((p) => p.status === "approved")
          .reduce((sum, p) => sum + p.points, 0)

        const level = Math.floor(totalPoints / 500) + 1

        set({
          myProjects: updatedProjects,
          student: {
            ...student,
            completedProjects: approvedCount,
            totalPoints,
            level,
          },
        })
      },

      getSkillLevels: () => {
        const { myProjects } = get()
        const skillMap: Record<string, { count: number; points: number }> = {}

        myProjects
          .filter((p) => p.status === "approved")
          .forEach((project) => {
            project.skills.forEach((skill) => {
              if (!skillMap[skill]) {
                skillMap[skill] = { count: 0, points: 0 }
              }
              skillMap[skill].count++
              skillMap[skill].points += project.points / project.skills.length
            })
          })

        return Object.entries(skillMap).map(([skill, data]) => ({
          skill,
          level: Math.min(Math.floor(data.points / 100) + 1, 10),
          projects: data.count,
        }))
      },

      addProject: (projectData: Omit<Project, "id">) => {
        const { availableProjects, student } = get()
        const newProject: Project = {
          id: `project-${Date.now()}`,
          ...projectData,
          createdBy: student.id,
          createdAt: new Date().toISOString(),
        }
        set({ availableProjects: [...availableProjects, newProject] })
      },

      updateProject: (projectId: string, data: Partial<Project>) => {
        const { availableProjects, student } = get()
        const project = availableProjects.find((p) => p.id === projectId)

        if (project && project.createdBy === student.id) {
          const updatedProjects = availableProjects.map((p) =>
            p.id === projectId ? { ...p, ...data } : p
          )
          set({ availableProjects: updatedProjects })
        }
      },

      deleteProject: (projectId: string) => {
        const { availableProjects, student } = get()
        const project = availableProjects.find((p) => p.id === projectId)

        if (project && project.createdBy === student.id) {
          set({
            availableProjects: availableProjects.filter((p) => p.id !== projectId),
          })
        }
      },

      submitProject: (projectId: string, zipUrl: string, screenshots: string[], description: string) => {
        const { myProjects, student, submissions } = get()
        
        const submission: Submission = {
          id: `sub-${Date.now()}`,
          projectId,
          studentId: student.id,
          zipUrl,
          screenshots,
          description,
          submissionDate: new Date().toISOString(),
          status: "pending_review",
        }

        const updatedProjects = myProjects.map((p) => {
          if (p.id === projectId) {
            return {
              ...p,
              status: "submitted" as ProjectStatus,
              submission,
              notifications: p.notifications || [],
            }
          }
          return p
        })

        set({
          myProjects: updatedProjects,
          submissions: [...submissions, submission],
        })

        return submission
      },

      approveSubmission: (submissionId: string, reviewedBy: string) => {
        const { myProjects, submissions, student } = get()

        const submission = submissions.find((s) => s.id === submissionId)
        if (!submission) return

        const approvedSubmission: Submission = {
          ...submission,
          status: "approved",
          reviewedBy,
          reviewedAt: new Date().toISOString(),
        }

        const updatedProjects = myProjects.map((p) => {
          if (p.id === submission.projectId) {
            const updatedProject = {
              ...p,
              status: "approved" as ProjectStatus,
              completedAt: new Date().toISOString(),
              submission: approvedSubmission,
              notifications: [
                ...(p.notifications || []),
                {
                  id: `notif-${Date.now()}`,
                  type: "approved" as const,
                  message: "Your project submission has been approved! You earned points.",
                  read: false,
                  createdAt: new Date().toISOString(),
                },
              ],
            }

            // Update points and level
            if (p.status !== "approved") {
              const completedProjects = updatedProject.notifications
                .filter((n) => n.type === "approved").length
              const totalPoints = (student.totalPoints || 0) + p.points
              const level = Math.floor(totalPoints / 500) + 1

              set({
                student: {
                  ...student,
                  totalPoints,
                  completedProjects,
                  level,
                },
              })
            }

            return updatedProject
          }
          return p
        })

        const updatedSubmissions = submissions.map((s) =>
          s.id === submissionId ? approvedSubmission : s
        )

        set({
          myProjects: updatedProjects,
          submissions: updatedSubmissions,
        })
      },

      rejectSubmission: (submissionId: string, reason: string, reviewedBy: string) => {
        const { myProjects, submissions } = get()

        const submission = submissions.find((s) => s.id === submissionId)
        if (!submission) return

        const rejectedSubmission: Submission = {
          ...submission,
          status: "rejected",
          reviewedBy,
          reviewedAt: new Date().toISOString(),
          rejectionReason: reason,
        }

        const updatedProjects = myProjects.map((p) => {
          if (p.id === submission.projectId) {
            return {
              ...p,
              status: "working" as ProjectStatus,
              submission: rejectedSubmission,
              notifications: [
                ...(p.notifications || []),
                {
                  id: `notif-${Date.now()}`,
                  type: "rejected" as const,
                  message: `Your submission was rejected. Error: ${reason}. Please resubmit with corrections.`,
                  read: false,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          }
          return p
        })

        const updatedSubmissions = submissions.map((s) =>
          s.id === submissionId ? rejectedSubmission : s
        )

        set({
          myProjects: updatedProjects,
          submissions: updatedSubmissions,
        })
      },

      addNotification: (projectId: string, type: "approved" | "rejected", message: string) => {
        const { myProjects } = get()

        const updatedProjects = myProjects.map((p) => {
          if (p.id === projectId) {
            return {
              ...p,
              notifications: [
                ...(p.notifications || []),
                {
                  id: `notif-${Date.now()}`,
                  type,
                  message,
                  read: false,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          }
          return p
        })

        set({ myProjects: updatedProjects })
      },

      markNotificationAsRead: (projectId: string, notificationId: string) => {
        const { myProjects } = get()

        const updatedProjects = myProjects.map((p) => {
          if (p.id === projectId) {
            return {
              ...p,
              notifications: (p.notifications || []).map((n) =>
                n.id === notificationId ? { ...n, read: true } : n
              ),
            }
          }
          return p
        })

        set({ myProjects: updatedProjects })
      },

      getAllSubmissions: () => {
        const { submissions } = get()
        return submissions
      },
    }),
    {
      name: "student-dashboard-storage",
    }
  )
)
