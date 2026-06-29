"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"

const UploadIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const TrashIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

interface SubmissionFormProps {
  projectId: string
  projectTitle: string
}

export default function SubmissionForm({ projectId, projectTitle }: SubmissionFormProps) {
  const router = useRouter()
  const { submitProject } = useStore()
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState("")
  const [zipFile, setZipFile] = useState<File | null>(null)
  const [screenshots, setScreenshots] = useState<File[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleZipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "application/zip" || file.name.endsWith(".zip")) {
        setZipFile(file)
        setError("")
      } else {
        setError("Please upload a valid ZIP file")
      }
    }
  }

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageFiles = files.filter((f) => f.type.startsWith("image/"))

    if (imageFiles.length !== files.length) {
      setError("Only image files are allowed for screenshots")
      return
    }

    if (imageFiles.length > 10) {
      setError("Maximum 10 screenshots allowed")
      return
    }

    setScreenshots([...screenshots, ...imageFiles])
    setError("")
  }

  const removeScreenshot = (index: number) => {
    setScreenshots(screenshots.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!zipFile) {
      setError("ZIP file is required")
      return
    }

    if (screenshots.length === 0) {
      setError("At least one screenshot is required")
      return
    }

    if (!description.trim()) {
      setError("Project description is required")
      return
    }

    setLoading(true)

    try {
      // Simulate file upload - in production, use a real file upload service
      const zipUrl = URL.createObjectURL(zipFile)
      const screenshotUrls = screenshots.map((f) => URL.createObjectURL(f))

      submitProject(projectId, zipUrl, screenshotUrls, description)

      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/my-projects")
      }, 2000)
    } catch (err) {
      setError("Failed to submit project. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border-4 border-foreground p-8 bg-foreground text-background text-center">
        <CheckIcon className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Submission Successful!</h2>
        <p className="mb-4">Your project has been submitted for review. An admin will review it shortly.</p>
        <p className="text-sm text-background/70">Redirecting to My Projects...</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="border-4 border-red-500 p-4 bg-red-500/10">
          <p className="text-red-600 font-bold">{error}</p>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-sm font-bold mb-2">
          Project Description <span className="text-red-500">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what you've built, challenges overcome, and key features implemented..."
          rows={5}
          className="w-full px-4 py-3 bg-background border-4 border-foreground font-mono text-sm focus:outline-none"
        />
      </div>

      {/* ZIP File Upload */}
      <div>
        <label className="block text-sm font-bold mb-2">
          Project ZIP File <span className="text-red-500">*</span>
        </label>
        <div className="border-4 border-dashed border-foreground/50 p-6 text-center bg-foreground/5 cursor-pointer hover:bg-foreground/10 transition-colors">
          <input
            type="file"
            accept=".zip"
            onChange={handleZipChange}
            className="hidden"
            id="zip-input"
          />
          <label htmlFor="zip-input" className="cursor-pointer">
            <UploadIcon className="w-8 h-8 mx-auto mb-2 text-foreground/60" />
            <p className="font-bold mb-1">Click to upload ZIP file</p>
            <p className="text-sm text-foreground/60">or drag and drop your project files</p>
          </label>
        </div>
        {zipFile && (
          <div className="mt-2 p-3 bg-green-500/10 border-2 border-green-500 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5 text-green-500" />
              <span className="font-bold text-sm">{zipFile.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setZipFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Screenshots Upload */}
      <div>
        <label className="block text-sm font-bold mb-2">
          Screenshots (All Pages) <span className="text-red-500">*</span>
        </label>
        <div className="border-4 border-dashed border-foreground/50 p-6 text-center bg-foreground/5 cursor-pointer hover:bg-foreground/10 transition-colors">
          <input
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
            multiple
            className="hidden"
            id="screenshots-input"
          />
          <label htmlFor="screenshots-input" className="cursor-pointer">
            <UploadIcon className="w-8 h-8 mx-auto mb-2 text-foreground/60" />
            <p className="font-bold mb-1">Click to upload screenshots</p>
            <p className="text-sm text-foreground/60">Upload images of every page/section ({screenshots.length}/10)</p>
          </label>
        </div>

        {/* Screenshots Preview */}
        {screenshots.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
            {screenshots.map((file, index) => (
              <div key={index} className="relative border-4 border-foreground p-2 bg-foreground/5">
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={`Screenshot ${index + 1}`}
                  className="w-full h-32 object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeScreenshot(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white hover:bg-red-700 rounded"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
                <p className="text-xs font-bold mt-1 text-center text-foreground/60">
                  {index + 1}. {file.name.substring(0, 15)}...
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Requirements Checklist */}
      <div className="border-4 border-foreground p-4 bg-foreground/5">
        <p className="font-bold mb-3">Before submitting, ensure:</p>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-foreground" />
            All project files are included in the ZIP
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-foreground" />
            Screenshots show every page/section of the project
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-foreground" />
            Description clearly explains the project
          </li>
          <li className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-foreground" />
            All requirements from the project brief are met
          </li>
        </ul>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading || !zipFile || screenshots.length === 0}
        className="w-full px-6 py-3 bg-foreground text-background font-bold border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ boxShadow: loading ? "none" : "4px 4px 0 0 currentColor" }}
      >
        {loading ? "Submitting..." : "Submit Project for Review"}
      </button>

      <p className="text-xs text-foreground/60 text-center">
        Once submitted, an admin or developer will review your project and provide feedback.
      </p>
    </form>
  )
}
