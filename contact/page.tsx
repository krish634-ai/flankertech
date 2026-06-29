"use client"

import React, { useEffect, useState } from "react"
import { Mail, Phone, Facebook, Instagram } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContactPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col font-outfit">
      {/* Cursor Follower Effect */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      />

      {/* Simple header */}
      <header className="p-6 relative z-10">
        <Link href="/" className="flex items-center space-x-2 group">
          <ArrowLeft className="h-5 w-5 group-hover:translate-x-[-5px] transition-transform" />
          <span className="font-medium">Back to Home</span>
        </Link>
      </header>

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10 flex-1 flex items-center">
        <div className="max-w-3xl mx-auto md:mx-0 w-full">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 text-left">
            Contact Us
          </h1>
          <div className="space-y-6 text-lg">
            <p className="flex items-center gap-3">
              <Mail className="h-6 w-6 text-gray-400" />
              Email: <Link href="mailto:flankertechsolutions@gmail.com" className="underline hover:text-gray-300">flankertechsolutions@gmail.com</Link>
            </p>
            <p className="flex items-center gap-3">
              <Phone className="h-6 w-6 text-gray-400" />
              Phone: <Link href="tel:+919313443908" className="underline hover:text-gray-300">9313443908</Link>
            </p>

            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-4">Opening Hours</h2>
              <p className="text-xl font-medium">Phone</p>
              <p className="text-gray-400">Saturday – Sunday: 9.00 – 22.00</p>
              <p className="text-xl font-medium mt-4">Chat</p>
              <p className="text-gray-400">Monday – Sunday: 8.00 – 22.00</p>
            </div>

            <div className="pt-8">
              <h2 className="text-3xl font-bold mb-4">Connect on Social Media</h2>
              <div className="flex space-x-6">
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-8 w-8" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-8 w-8" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 text-center text-white/60 relative z-10">
        <p>© 2024 InternHype. All rights reserved.</p>
      </footer>
    </div>
  )
}
