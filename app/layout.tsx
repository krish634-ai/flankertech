import type React from "react"
import "./globals.css"
import "./rotating-text.css"

import { Inter, Outfit } from "next/font/google"

import { ThemeProvider } from "@/components/theme-provider"
import { GlobalNav } from "@/components/global-nav"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata = {
  title: "FLANKERTECH SOLUTION - Premium Internship Experience",
  description:
    "Transform your career with structured learning, expert mentorship, and professional recognition. Where talent meets opportunity in the premium internship ecosystem.",
  generator: "v0.dev",
  keywords: "internships, career development, skill assessment, mentorship, professional growth, FLANKERTECH SOLUTION",
  authors: [{ name: "FLANKERTECH SOLUTION" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} ${inter.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GlobalNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
