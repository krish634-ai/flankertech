"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useStore, type SubmissionStatus } from "@/lib/store"

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
)

const statusConfig: Record<SubmissionStatus, { label: string; color: string; icon: typeof CheckIcon }> = {
  pending_review: {
    label: "Pending Review",
    color: "bg-yellow-500/20 text-yellow-700 border-yellow-500",
    icon: ClockIcon,
  },
  approved: {
    label: "Approved",
    color: "bg-green-500/20 text-green-700 border-green-500",
    icon: CheckIcon,
  },
  rejected: {
    label: "Rejected",
    color: "bg-red-500/20 text-red-700 border-red-500",
    icon: XIcon,
  },
}

interface SubmissionReviewProps {
  studentRole: string
}

export default function SubmissionReviewPage({ studentRole }: SubmissionReviewProps) {
  const { getAllSubmissions, myProjects, student, approveSubmission, rejectSubmission } = useStore()
  const [expandedSubmissionId, setExpandedSubmissionId] = useState<string | null>(null)
  const [rejectionReason, setRejectionReason] = useState<Record<string, string>>({})
  const [processingId, setProcessingId] = useState<string | null>(null)

  const submissions = getAllSubmissions()
  const pendingSubmissions = submissions.filter((s) => s.status === "pending_review")

  // Check authorization
  if (studentRole !== "admin" && studentRole !== "developer") {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-foreground/60 mb-6">Only admins and developers can review submissions.</p>
        <Link href="/dashboard" className="text-blue-500 hover:underline">
          Go back to dashboard
        </Link>
      </div>
    )
  }

  const handleApprove = (submissionId: string) => {
    setProcessingId(submissionId)
    approveSubmission(submissionId, student.id)
    setTimeout(() => setProcessingId(null), 500)
  }

  const handleReject = (submissionId: string) => {
    const reason = rejectionReason[submissionId]
    if (!reason.trim()) {
      alert("Please provide a rejection reason")
      return
    }
    setProcessingId(submissionId)
    rejectSubmission(submissionId, reason, student.id)
    setTimeout(() => setProcessingId(null), 500)
  }

  const getProjectTitle = (projectId: string) => {
    const project = myProjects.find((p) => p.id === projectId)
    return project?.title || "Unknown Project"
  }

  if (submissions.length === 0) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-black mb-2">Submission Review</h1>
          <p className="text-foreground/60">Review and approve/reject student project submissions.</p>
        </div>

        <div className="border-4 border-dashed border-foreground/30 p-12 text-center">
          <ClockIcon className="w-12 h-12 mx-auto mb-4 text-foreground/40" />
          <p className="text-lg font-bold text-foreground/60">No submissions yet</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-5xl font-black mb-2">Submission Review</h1>
        <p className="text-foreground/60 mb-4">Review and approve/reject student project submissions.</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="border-4 border-foreground p-4">
            <div className="text-2xl font-black">{pendingSubmissions.length}</div>
            <div className="text-xs font-bold text-foreground/60">Pending</div>
          </div>
          <div className="border-4 border-foreground p-4 bg-green-500/10">
            <div className="text-2xl font-black">{submissions.filter((s) => s.status === "approved").length}</div>
            <div className="text-xs font-bold text-foreground/60">Approved</div>
          </div>
          <div className="border-4 border-foreground p-4 bg-red-500/10">
            <div className="text-2xl font-black">{submissions.filter((s) => s.status === "rejected").length}</div>
            <div className="text-xs font-bold text-foreground/60">Rejected</div>
          </div>
        </div>
      </div>

      {/* Pending Submissions */}
      {pendingSubmissions.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
            <ClockIcon className="w-6 h-6" />
            Pending Review ({pendingSubmissions.length})
          </h2>
          <div className="space-y-4">
            {pendingSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="border-4 border-foreground p-4 bg-yellow-500/5"
                style={{ boxShadow: "4px 4px 0 0 currentColor" }}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-black mb-1">{getProjectTitle(submission.projectId)}</h3>
                    <p className="text-sm text-foreground/60">
                      Submitted on {new Date(submission.submissionDate).toLocaleDateString()} at{" "}
                      {new Date(submission.submissionDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setExpandedSubmissionId(
                        expandedSubmissionId === submission.id ? null : submission.id
                      )
                    }
                    className="px-4 py-2 bg-foreground text-background font-bold border-2 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform whitespace-nowrap"
                  >
                    {expandedSubmissionId === submission.id ? "Collapse" : "Review"}
                  </button>
                </div>

                {/* Expanded Review Section */}
                {expandedSubmissionId === submission.id && (
                  <div className="border-t-4 border-foreground pt-4 space-y-4">
                    {/* Description */}
                    <div>
                      <p className="font-bold mb-2">Project Description:</p>
                      <div className="bg-foreground/5 p-3 border-2 border-foreground/20 rounded max-h-40 overflow-y-auto">
                        <p className="text-sm whitespace-pre-wrap">{submission.description}</p>
                      </div>
                    </div>

                    {/* Screenshots */}
                    <div>
                      <p className="font-bold mb-2">Screenshots ({submission.screenshots.length}):</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {submission.screenshots.map((url, index) => (
                          <a
                            key={index}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border-2 border-foreground overflow-hidden hover:opacity-75 transition-opacity"
                          >
                            <img
                              src={url || "/placeholder.svg"}
                              alt={`Screenshot ${index + 1}`}
                              className="w-full h-32 object-cover"
                            />
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* ZIP File */}
                    <div>
                      <p className="font-bold mb-2">Project Files:</p>
                      <a
                        href={submission.zipUrl}
                        download
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors"
                      >
                        Download ZIP File
                      </a>
                    </div>

                    {/* Review Actions */}
                    <div className="border-t-2 border-foreground pt-4 space-y-3">
                      <div>
                        <label className="block font-bold mb-2">Rejection Reason (if rejected):</label>
                        <textarea
                          value={rejectionReason[submission.id] || ""}
                          onChange={(e) =>
                            setRejectionReason({
                              ...rejectionReason,
                              [submission.id]: e.target.value,
                            })
                          }
                          placeholder="Describe any issues or improvements needed..."
                          rows={3}
                          className="w-full px-3 py-2 bg-background border-2 border-foreground/20 rounded font-mono text-sm focus:outline-none focus:border-foreground"
                        />
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApprove(submission.id)}
                          disabled={processingId === submission.id}
                          className="flex-1 px-4 py-3 bg-green-600 text-white font-bold border-2 border-green-600 hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                          <CheckIcon className="w-5 h-5 inline mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(submission.id)}
                          disabled={processingId === submission.id}
                          className="flex-1 px-4 py-3 bg-red-600 text-white font-bold border-2 border-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                          <XIcon className="w-5 h-5 inline mr-2" />
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed Submissions */}
      {submissions.filter((s) => s.status !== "pending_review").length > 0 && (
        <div>
          <h2 className="text-2xl font-black mb-6">
            Processed Submissions ({submissions.filter((s) => s.status !== "pending_review").length})
          </h2>
          <div className="space-y-3">
            {submissions
              .filter((s) => s.status !== "pending_review")
              .map((submission) => {
                const config = statusConfig[submission.status]
                const Icon = config.icon
                return (
                  <div key={submission.id} className={`border-4 border-foreground p-4 ${config.color}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className="w-5 h-5" />
                          <span className="font-bold text-sm">{config.label}</span>
                        </div>
                        <p className="font-bold">{getProjectTitle(submission.projectId)}</p>
                        <p className="text-xs opacity-75">
                          {new Date(submission.reviewedAt || "").toLocaleDateString()}
                        </p>
                      </div>
                      {submission.rejectionReason && (
                        <div className="text-right text-xs max-w-xs">
                          <p className="font-bold mb-1">Reason:</p>
                          <p className="opacity-75">{submission.rejectionReason}</p>
                        </div>
                      )}
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
