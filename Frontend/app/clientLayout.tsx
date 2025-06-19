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
  const isAuthPage = pathname.startsWith("/auth")

//  useEffect(() => { 
//   const userData = localStorage.getItem("userData")
//   const publicPages = ["/auth"]

//   // If user data doesn't exist and trying to access a protected page
//   if (!userData && !publicPages.includes(pathname)) {
//     router.push("/auth")
//   }

  // we can add role-based redirects here if needed later on


  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <div className="relative min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            { /* Conditionally render for auth page*/}
            { !isAuthPage && <Navigation />}
            <main className="relative">{children}</main>
            { !isAuthPage && <Footer />}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
