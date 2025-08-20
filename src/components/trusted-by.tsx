"use client"

import { useEffect, useRef, useState } from "react";
import { HPELogo, OnepointLogo, SamsungLogo } from "@/components/icons/logos";

export function TrustedBy() {
  const [isMobileOverlayOpen, setIsMobileOverlayOpen] = useState(false)
  const [isMobileOverlayInteractive, setIsMobileOverlayInteractive] = useState(false)
  const mobileTrackRef = useRef<HTMLDivElement | null>(null)
  const overlayEnableTimeoutRef = useRef<number | null>(null)
  const recentlyClosedUntilRef = useRef<number>(0)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  useEffect(() => {
    if (!isMobileOverlayOpen) return
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      if (!mobileTrackRef.current) return
      const target = e.target as Node
      if (!mobileTrackRef.current.contains(target)) {
        // Close when clicking outside
        setIsMobileOverlayOpen(false)
        setIsMobileOverlayInteractive(false)
        if (overlayEnableTimeoutRef.current !== null) {
          window.clearTimeout(overlayEnableTimeoutRef.current)
          overlayEnableTimeoutRef.current = null
        }
      }
    }
    document.addEventListener("pointerdown", handleOutside)
    return () => document.removeEventListener("pointerdown", handleOutside)
  }, [isMobileOverlayOpen])

  useEffect(() => {
    return () => {
      if (overlayEnableTimeoutRef.current !== null) {
        window.clearTimeout(overlayEnableTimeoutRef.current)
      }
    }
  }, [])

  const openMobileOverlay = () => {
    if (isMobileOverlayOpen) return
    setIsMobileOverlayOpen(true)
    setIsMobileOverlayInteractive(false)
    if (overlayEnableTimeoutRef.current !== null) {
      window.clearTimeout(overlayEnableTimeoutRef.current)
    }
    overlayEnableTimeoutRef.current = window.setTimeout(() => {
      setIsMobileOverlayInteractive(true)
      overlayEnableTimeoutRef.current = null
    }, 200)
  }

  const closeMobileOverlay = () => {
    setIsMobileOverlayOpen(false)
    setIsMobileOverlayInteractive(false)
    if (overlayEnableTimeoutRef.current !== null) {
      window.clearTimeout(overlayEnableTimeoutRef.current)
      overlayEnableTimeoutRef.current = null
    }
    // Swallow the next tap shortly after closing to avoid accidental scroll/activation
    recentlyClosedUntilRef.current = Date.now() + 450
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-8">
        {/* Centered text */}
        <div className="mb-20">
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
          Aube propulse les équipes les plus performantes au monde.
          </h2>
          <p className="text-lg sm:text-xl font-medium text-muted-foreground">
          Des entreprises émergentes aux sociétés historiques.
          </p>
        </div>

        {/* Logos - Mobile (marquee with edge fade) */}
        <div className="sm:hidden relative w-full overflow-x-hidden overflow-y-visible edge-fade-mask py-3" ref={mobileTrackRef}>
          <div
            className={`flex items-center w-[200%] marquee-rtl transition-all duration-300 ${isMobileOverlayOpen ? "blur-sm" : ""}`}
            onPointerDown={(e) => {
              if (Date.now() < recentlyClosedUntilRef.current) {
                e.preventDefault()
                e.stopPropagation()
                return
              }
              if (!isMobileOverlayOpen) {
                e.preventDefault()
                e.stopPropagation()
                openMobileOverlay()
              }
            }}
          >
            <div className="flex items-center justify-around gap-14 min-w-full pr-14 text-foreground">
              <SamsungLogo className="h-5" />
              <HPELogo className="h-6" />
              <OnepointLogo className="h-7" />
              <SamsungLogo className="h-5" />
              <HPELogo className="h-6" />
            </div>
            <div className="flex items-center justify-around gap-14 min-w-full pr-14 text-foreground">
              <SamsungLogo className="h-5" />
              <HPELogo className="h-6" />
              <OnepointLogo className="h-7" />
              <SamsungLogo className="h-5" />
              <HPELogo className="h-6" />
            </div>
          </div>
          {/* Mobile toggle overlay */}
          <div className={`${isMobileOverlayOpen && isMobileOverlayInteractive ? "pointer-events-auto" : "pointer-events-none"} absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-200 ${isMobileOverlayOpen ? "opacity-100" : "opacity-0"}`}>
            <button
              type="button"
              className="text-sm font-medium text-foreground bg-neutral-100 dark:bg-neutral-900 border border-foreground/15 px-3 py-1.5 rounded-4xl cursor-pointer flex items-center gap-1"
              onPointerDown={(e) => {
                e.stopPropagation()
                closeMobileOverlay()
                scrollToSection('latest-work')
              }}
            >
              Nos réalisations
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Logos - Desktop (row with hover overlay) */}
        <div className="hidden sm:flex relative items-center justify-center gap-20 sm:gap-30 lg:gap-50 text-foreground group cursor-pointer transition-all duration-300">
          <div className="flex items-center justify-center transition-all duration-300 group-hover:blur-sm">
            <SamsungLogo className="h-5" />
          </div>
          <div className="flex items-center justify-center transition-all duration-300 group-hover:blur-sm">
            <HPELogo className="h-6" />
          </div>
          <div className="flex items-center justify-center transition-all duration-300 group-hover:blur-sm">
            <OnepointLogo className="h-7" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                scrollToSection('latest-work')
              }}
              className="pointer-events-auto text-sm font-medium text-foreground bg-neutral-100 dark:bg-neutral-900 border border-foreground/15 px-3 py-1.5 rounded-4xl cursor-pointer flex items-center gap-1"
            >
              Nos réalisations
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
