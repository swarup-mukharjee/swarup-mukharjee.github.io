import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import AbstractShapes from "@/components/abstract-shapes"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SwarupMukharjee",
  description: "A stunning 3D parallax portfolio website with vibrant colors and animations",
  icons: {
    icon: "image/logo.png", 
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AbstractShapes />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
