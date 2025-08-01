import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "ProcurePro",
  description: "Generated by create next app",
    generator: 'v0.dev',
    icons: {
    icon: "/logo4.png", // relative to /public folder
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
