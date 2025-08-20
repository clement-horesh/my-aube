"use client"

import { useTheme as useNextTheme } from "next-themes"
import { useEffect, useState } from "react"

export function useTheme() {
  const { resolvedTheme } = useNextTheme()
  const [isMounted, setIsMounted] = useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return {
    theme: resolvedTheme || "light",
    mounted: isMounted,
  }
} 