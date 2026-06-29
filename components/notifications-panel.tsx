"use client"

import React, { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface Notification {
  id: string
  type: "points" | "approval" | "certificate" | "new_project"
  title: string
  message: string
  timestamp: string
  read: boolean
}

const BellIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 10.26 24 10.26 17.55 16.91 20.64 25.09 12 19.45 3.36 25.09 6.45 16.91 0 10.26 8.91 10.26 12 2" />
  </svg>
)

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "points",
    title: "Points Earned!",
    message: "You earned 100 points for completing 'E-Commerce Dashboard' project",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "approval",
    title: "Project Approved",
    message: "Your submission for 'Weather App' has been approved by the admin",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "certificate",
    title: "Certificate Ready",
    message: "Your certificate for completing the Intermediate level is ready to download",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "4",
    type: "new_project",
    title: "New Project Available",
    message: "Check out 'Machine Learning Model' - a new Advanced level project",
    timestamp: "5 days ago",
    read: true,
  },
  {
    id: "5",
    type: "points",
    title: "Bonus Points",
    message: "You received 50 bonus points for being consistent this week",
    timestamp: "1 week ago",
    read: true,
  },
]

const notificationColors = {
  points: "bg-yellow-500/10 border-yellow-500 text-yellow-700",
  approval: "bg-green-500/10 border-green-500 text-green-700",
  certificate: "bg-blue-500/10 border-blue-500 text-blue-700",
  new_project: "bg-purple-500/10 border-purple-500 text-purple-700",
}

const notificationIcons = {
  points: <StarIcon className="w-4 h-4" />,
  approval: <CheckIcon className="w-4 h-4" />,
  certificate: <StarIcon className="w-4 h-4" />,
  new_project: <CheckIcon className="w-4 h-4" />,
}

function NotificationsSidebar({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
}: {
  isOpen: boolean
  onClose: () => void
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onClearAll: () => void
}) {
  const unreadCount = notifications.filter((n) => !n.read).length

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (typeof window === "undefined") return null

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity duration-300"
        style={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Notifications"
        className="fixed top-0 right-0 h-full w-full max-w-md bg-background border-l-4 border-foreground z-[9999] flex flex-col"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-8px 0 32px rgba(0,0,0,0.2)" : "none",
        }}
      >
        {/* Header */}
        <div className="border-b-4 border-foreground p-4 sm:p-6 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl sm:text-2xl font-black">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-xs sm:text-sm text-muted-foreground">
                {unreadCount} unread
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-foreground/10 transition-colors rounded border-2 border-transparent hover:border-foreground/20"
            aria-label="Close notifications"
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <BellIcon className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground font-bold mb-2">No notifications</p>
              <p className="text-xs text-muted-foreground/70">
                You're all caught up! Check back later for updates.
              </p>
            </div>
          ) : (
            <div className="p-4 sm:p-6 space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`border-2 p-3 sm:p-4 cursor-pointer transition-all hover:translate-x-1 ${
                    notificationColors[notification.type]
                  } ${!notification.read ? "border-current" : "border-current/30"}`}
                  onClick={() => onMarkAsRead(notification.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex-shrink-0">
                      {notificationIcons[notification.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm sm:text-base">
                        {notification.title}
                      </div>
                      <p className="text-xs sm:text-sm mt-1 opacity-90">
                        {notification.message}
                      </p>
                      <p className="text-xs mt-2 opacity-70">
                        {notification.timestamp}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 rounded-full bg-current mt-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="border-t-4 border-foreground p-4 sm:p-6 flex-shrink-0">
            <button
              onClick={onClearAll}
              className="w-full px-4 py-2 text-sm font-bold border-2 border-foreground bg-background hover:bg-foreground/5 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  )
}

export default function NotificationsPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState(mockNotifications)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }

  const handleClearAll = () => {
    setNotifications([])
  }

  return (
    <>
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-foreground hover:text-foreground/80 transition-colors"
        aria-label={`Notifications${unreadCount > 0 ? `, ${unreadCount} unread` : ""}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Portal-based sidebar — only renders after mount to avoid SSR mismatch */}
      {mounted && (
        <NotificationsSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          notifications={notifications}
          onMarkAsRead={handleMarkAsRead}
          onClearAll={handleClearAll}
        />
      )}
    </>
  )
}
