"use client"

import type { ReactNode } from "react"
import { ParallaxProvider as ScrollParallaxProvider } from "react-scroll-parallax"

export function ParallaxProvider({ children }: { children: ReactNode }) {
  return <ScrollParallaxProvider>{children}</ScrollParallaxProvider>
}
