"use client"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useStore } from "@/lib/store"

const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
)

export default function LoginPage() {
  const router = useRouter()
  const { login, student, isAuthenticated } = useStore()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already authenticated
  if (isAuthenticated) {
    router.push("/dashboard")
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    if (student.email && student.email === email) {
      login(email, password)
      router.push("/dashboard")
    } else if (!student.email) {
      setError("No account found. Please register first.")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <div className="text-2xl sm:text-3xl font-black">FLANKERTECH</div>
          </Link>
          <h1 className="text-3xl sm:text-4xl font-black mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Sign in to your Career Portal</p>
        </div>

        {/* Login Form */}
        <div
          className="border-4 border-foreground p-6 sm:p-8 bg-background"
          style={{ boxShadow: "6px 6px 0 0 currentColor" }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="border-4 border-red-500 bg-red-500/10 p-4 text-red-500 text-sm font-bold">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-4 border-foreground bg-background px-4 py-3 font-medium focus:outline-none focus:ring-0 focus:border-foreground"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-4 border-foreground bg-background px-4 py-3 pr-12 font-medium focus:outline-none focus:ring-0 focus:border-foreground"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-foreground text-background font-bold py-4 px-6 border-4 border-foreground hover:translate-x-1 hover:translate-y-1 transition-transform"
              style={{ boxShadow: "4px 4px 0 0 currentColor" }}
            >
              SIGN IN
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="font-bold text-foreground hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground font-medium">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
