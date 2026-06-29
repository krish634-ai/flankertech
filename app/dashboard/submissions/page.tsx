"use client"

import React from "react"
import Link from "next/link"
import { useStore } from "@/lib/store"
import SubmissionReview from "@/components/submission-review"

const ArrowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export default function AdminReviewPage() {
  const { student, isAuthenticated } = useStore()

  // Check if user is authenticated and is an admin/developer
  if (!isAuthenticated || (student.role !== "admin" && student.role !== "developer")) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-5xl font-black mb-2">Access Denied</h1>
          <p className="text-foreground/60 text-sm">Only admins and developers can review submissions</p>
        </div>

        <div className="border-4 border-red-500 p-8 text-center bg-red-500/5">
          <p className="text-lg font-bold text-red-600 mb-6">
            You do not have permission to access this page.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 bg-foreground text-background font-bold border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform"
            style={{ boxShadow: "4px 4px 0 0 currentColor" }}
          >
            <ArrowIcon className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return <SubmissionReview studentRole={student.role} />
}
