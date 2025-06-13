"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // useEffect(() => {
  //   // Check if user is registered/logged in
  //   const userData = localStorage.getItem("userData")
  //   const publicPages = ["/registration", "/login", "/logout"]

  //   if (!userData && !publicPages.includes(pathname)) {
  //     router.push("/registration")
  //   } else if (userData) {
  //     const user = JSON.parse(userData)
  //     if (!user.isLoggedIn && !publicPages.includes(pathname)) {
  //       router.push("/login")
  //     }
  //   }
  // }, [router, pathname])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <Navigation />
            <main className="relative">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
