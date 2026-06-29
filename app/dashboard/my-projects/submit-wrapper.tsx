"use client"

import { Suspense } from "react"
import SubmitProjectPage from "./submit/page"

export function SubmitWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SubmitProjectPage />
    </Suspense>
  )
}
