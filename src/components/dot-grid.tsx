"use client"

import { useEffect, useRef } from "react"

type DotConnectorGridProps = {
  rows?: number
  cols?: number
  height?: number
  dotRadius?: number
  className?: string
}

export function DotConnectorGrid({
  rows = 10,
  cols = 30,
  height = 240,
  dotRadius = 2,
  className,
}: DotConnectorGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const dotActivityRef = useRef<Float32Array | null>(null)
  const lastNowRef = useRef<number>(0)

  useEffect(() => {
    const containerElement = containerRef.current
    const canvasElement = canvasRef.current
    if (!containerElement || !canvasElement) return

    const context = canvasElement.getContext("2d")
    if (!context) return

    let animationFrameId = 0
    let isDisposed = false
    let deviceScale = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const points: Array<{ x: number; y: number }> = []
    type ActivePath = {
      indices: number[]
      startMs: number
      segmentDurations: number[]
      totalDurationMs: number
      fadeStartMs: number | null
      fadeDurationMs: number
    }
    const activePaths: ActivePath[] = []

    const padding = 16
    // Fewer simultaneous lines overall, tuned to grid size
    const targetDensity = 0.004
    const densityCount = Math.floor(rows * cols * targetDensity)
    const maxPaths = Math.min(6, Math.max(3, densityCount))
    // Spawn new paths less frequently for a calmer effect
    const addEveryMs = 420
    let lastAddMs = 0

    function computePoints(width: number, heightPx: number) {
      points.length = 0
      if (cols <= 1 || rows <= 1) return
      const innerWidth = Math.max(1, width - padding * 2)
      const innerHeight = Math.max(1, heightPx - padding * 2)
      const stepX = innerWidth / (cols - 1)
      const stepY = innerHeight / (rows - 1)
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < cols; colIndex++) {
          points.push({
            x: padding + colIndex * stepX,
            y: padding + rowIndex * stepY,
          })
        }
      }
      dotActivityRef.current = new Float32Array(points.length)
    }

    function resizeCanvas() {
      const width = containerElement.clientWidth
      const heightPx = height
      canvasElement.style.width = `${width}px`
      canvasElement.style.height = `${heightPx}px`
      canvasElement.width = Math.floor(width * deviceScale)
      canvasElement.height = Math.floor(heightPx * deviceScale)
      context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)
      computePoints(width, heightPx)
    }

    function randomIndex(maxExclusive: number) {
      return Math.floor(Math.random() * maxExclusive)
    }

    function pickNeighborIndex(currentIndex: number): number {
      // Convert index to grid coordinates
      const row = Math.floor(currentIndex / cols)
      const col = currentIndex % cols
      // Possible neighbor deltas (including diagonals)
      const deltas = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [-1, 1], [1, -1], [1, 1],
      ] as const
      const candidates: number[] = []
      for (const [dr, dc] of deltas) {
        const nr = row + dr
        const nc = col + dc
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          candidates.push(nr * cols + nc)
        }
      }
      if (candidates.length === 0) return currentIndex
      return candidates[Math.floor(Math.random() * candidates.length)]
    }

    function addRandomPath(nowMs: number) {
      if (nowMs - lastAddMs < addEveryMs) return
      lastAddMs = nowMs
      if (activePaths.length >= maxPaths) return

      const start = randomIndex(points.length)
      const segmentsCount = 1 + Math.floor(Math.random() * 10) // 1..10 connections
      const indices: number[] = [start]
      for (let s = 0; s < segmentsCount; s++) {
        const nextIndex = pickNeighborIndex(indices[indices.length - 1])
        indices.push(nextIndex)
      }
      const segmentDurations: number[] = []
      let total = 0
      for (let i = 0; i < segmentsCount; i++) {
        const d = 900 + Math.floor(Math.random() * 900) // slower per segment
        segmentDurations.push(d)
        total += d
      }
      const fadeDurationMs = 900 + Math.floor(Math.random() * 900)
      activePaths.push({
        indices,
        startMs: nowMs,
        segmentDurations,
        totalDurationMs: total,
        fadeStartMs: null,
        fadeDurationMs,
      })
    }

    function getThemeAwareColors() {
      const computed = getComputedStyle(containerElement)
      // Fallbacks aim for acceptable contrast in both themes
      const dot = computed.color || "rgba(148,163,184,0.7)"
      const line = computed.color || "rgba(148,163,184,1)"
      const bg = computed.backgroundColor || "transparent"
      const isDark = document.documentElement.classList.contains("dark")
      // Prefer higher contrast line base
      const preferredLine = isDark ? "rgb(255,255,255)" : "rgb(0,0,0)"
      return { dot, line, preferredLine, bg, isDark }
    }

    function draw(nowMs: number) {
      if (isDisposed) return
      const { width, height: heightPx } = canvasElement
      // width/height here are device pixels; context was scaled back to CSS pixels
      context.clearRect(0, 0, width, heightPx)
      const { dot: dotColor, preferredLine, isDark } = getThemeAwareColors()
      const lastNow = lastNowRef.current || nowMs
      const deltaMs = Math.max(0, nowMs - lastNow)
      lastNowRef.current = nowMs
      const smoothingMs = 180
      const lerpFactor = 1 - Math.exp(-deltaMs / smoothingMs)

      // Draw continuous paths with fade-out after completion
      const activeDotIndices = new Set<number>()
      // Pass 1: collect active dots for this frame (no drawing)
      for (let i = activePaths.length - 1; i >= 0; i--) {
        const path = activePaths[i]
        const lifeMs = nowMs - path.startMs

        let fadeMultiplier = 1
        if (lifeMs >= path.totalDurationMs) {
          if (path.fadeStartMs === null) path.fadeStartMs = nowMs
          const fadeElapsed = nowMs - (path.fadeStartMs ?? nowMs)
          fadeMultiplier = Math.max(0, 1 - fadeElapsed / path.fadeDurationMs)
          if (fadeMultiplier <= 0) {
            // Will be removed in the stroke pass
            continue
          }
        }

        // Determine current drawing progress across segments
        let remaining = lifeMs
        let currentSegment = 0
        for (; currentSegment < path.segmentDurations.length; currentSegment++) {
          const d = path.segmentDurations[currentSegment]
          if (remaining < d) break
          remaining -= d
        }

        const indices = path.indices
        const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
        activeDotIndices.add(indices[0])
        for (let s = 0; s < currentSegment; s++) {
          activeDotIndices.add(indices[s])
          activeDotIndices.add(indices[s + 1])
        }
        if (currentSegment < path.segmentDurations.length) {
          const segProgress = clamp01(remaining / path.segmentDurations[currentSegment])
          if (segProgress > 0) activeDotIndices.add(indices[currentSegment])
          if (segProgress >= 1) activeDotIndices.add(indices[currentSegment + 1])
        } else {
          activeDotIndices.add(indices[indices.length - 1])
        }
      }

      // Update dot activity with smoothing
      const activity = dotActivityRef.current || new Float32Array(points.length)
      if (activity.length !== points.length) {
        dotActivityRef.current = new Float32Array(points.length)
      }
      for (let i = 0; i < points.length; i++) {
        const current = activity[i] || 0
        const target = activeDotIndices.has(i) ? 1 : 0
        const next = current + (target - current) * lerpFactor
        activity[i] = next
      }
      dotActivityRef.current = activity

      // Draw dots with animation for size and color
      const baseAlpha = isDark ? 0.28 : 0.42
      const highlightAlpha = isDark ? 0.7 : 0.65
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const a = activity[i] || 0
        // Base dot
        context.fillStyle = asRgba(dotColor, baseAlpha)
        context.beginPath()
        context.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        context.fill()

        if (a > 0.001) {
          // Overlay highlight with increased radius and line color
          const radius = dotRadius * (1 + 0.5 * a)
          context.fillStyle = asRgba(preferredLine, highlightAlpha * a)
          context.beginPath()
          context.arc(p.x, p.y, radius, 0, Math.PI * 2)
          context.fill()
        }
      }
      for (let i = activePaths.length - 1; i >= 0; i--) {
        const path = activePaths[i]
        const lifeMs = nowMs - path.startMs

        let fadeMultiplier = 1
        if (lifeMs >= path.totalDurationMs) {
          if (path.fadeStartMs === null) path.fadeStartMs = nowMs
          const fadeElapsed = nowMs - (path.fadeStartMs ?? nowMs)
          fadeMultiplier = Math.max(0, 1 - fadeElapsed / path.fadeDurationMs)
          if (fadeMultiplier <= 0) {
            activePaths.splice(i, 1)
            continue
          }
        }

        // Determine current drawing progress across segments
        let remaining = lifeMs
        let currentSegment = 0
        for (; currentSegment < path.segmentDurations.length; currentSegment++) {
          const d = path.segmentDurations[currentSegment]
          if (remaining < d) break
          remaining -= d
        }

        // Slightly more visible lines depending on theme
        const lineAlpha = (isDark ? 0.32 : 0.30) * fadeMultiplier
        context.strokeStyle = asRgba(preferredLine, lineAlpha)
        context.lineWidth = 1.6
        context.beginPath()

        const indices = path.indices
        const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

        // Move to first point
        const first = points[indices[0]]
        context.moveTo(first.x, first.y)

        // Draw fully completed segments
        for (let s = 0; s < currentSegment; s++) {
          const a = points[indices[s]]
          const b = points[indices[s + 1]]
          context.lineTo(b.x, b.y)
        }

        // Draw current segment partially
        if (currentSegment < path.segmentDurations.length) {
          const segProgress = clamp01(remaining / path.segmentDurations[currentSegment])
          const a = points[indices[currentSegment]]
          const b = points[indices[currentSegment + 1]]
          const x = a.x + (b.x - a.x) * segProgress
          const y = a.y + (b.y - a.y) * segProgress
          context.lineTo(x, y)
        } else {
          // All segments completed; keep full path while fading
          const last = points[indices[indices.length - 1]]
          context.lineTo(last.x, last.y)
        }

        context.stroke()
      }

      addRandomPath(nowMs)
      animationFrameId = requestAnimationFrame(draw)
    }

    function asRgba(color: string, alpha: number) {
      // If color already rgba, replace alpha; otherwise wrap
      if (color.startsWith("rgba")) {
        const parts = color.replace(/rgba\(|\)|\s/g, "").split(",")
        const [r, g, b] = parts
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
      }
      if (color.startsWith("rgb")) {
        const parts = color.replace(/rgb\(|\)|\s/g, "").split(",")
        const [r, g, b] = parts
        return `rgba(${r}, ${g}, ${b}, ${alpha})`
      }
      // Hex to rgba fallback
      const hex = color.trim()
      const rgb = hexToRgb(hex) || { r: 148, g: 163, b: 184 }
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`
    }

    function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
      let clean = hex.replace("#", "")
      if (clean.length === 3) {
        clean = clean.split("").map((c) => c + c).join("")
      }
      if (clean.length !== 6) return null
      const r = parseInt(clean.substring(0, 2), 16)
      const g = parseInt(clean.substring(2, 4), 16)
      const b = parseInt(clean.substring(4, 6), 16)
      return { r, g, b }
    }

    // Initial sizing + observe width changes
    resizeCanvas()
    const resizeObserver = new ResizeObserver(() => {
      deviceScale = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      resizeCanvas()
    })
    resizeObserver.observe(containerElement)

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
    }
  }, [rows, cols, height, dotRadius])

  return (
    <div ref={containerRef} className={className} style={{ height, position: "relative" }}>
      <canvas ref={canvasRef} className="w-full h-full block [color:rgb(148,163,184)]" />
      {/* Overlays to soften edges into background */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-y-0 left-0 w-[12%] bg-gradient-to-r from-background to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[12%] bg-gradient-to-l from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-background to-transparent" />
      </div>
    </div>
  )
}

export default DotConnectorGrid


