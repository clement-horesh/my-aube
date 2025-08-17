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

    // Non-null aliases for downstream helpers
    const containerEl = containerElement as HTMLDivElement
    const canvasEl = canvasElement as HTMLCanvasElement
    const ctx = context as CanvasRenderingContext2D

    let animationFrameId = 0
    let isDisposed = false
    let deviceScale = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    // Effective, responsive grid dimensions; start with provided props as max
    let effRows = rows
    let effCols = cols
    let lastEffRows = effRows
    let lastEffCols = effCols

    const points: Array<{ x: number; y: number }> = []
    type SingleRoute = {
      indices: number[]
      startMs: number
      segmentDurations: number[]
      totalDurationMs: number
    }
    type DualRoute = {
      target: number
      routes: [SingleRoute, SingleRoute]
      labels: [string, string] // aligned with routes
      phase: "drawing" | "hold" | "fading"
      holdStartMs: number | null
      holdDurationMs: number
      fadeStartMs: number | null
      fadeDurationMs: number
    }
    let currentDual: DualRoute | null = null

    const padding = 16
    // Minimal delay between route rebuilds
    const addEveryMs = 800
    let lastAddMs = 0

    function computeResponsiveDims(width: number): { r: number; c: number; hScale: number } {
      // Keep rows and height constant; reduce columns on smaller widths
      let colScale = 1
      if (width < 480) colScale = 0.5
      else if (width < 640) colScale = 0.6
      else if (width < 768) colScale = 0.75
      else if (width < 1024) colScale = 0.9
      else colScale = 1
      const r = rows // keep rows constant
      const c = Math.max(8, Math.floor(cols * colScale))
      return { r, c, hScale: 1 }
    }

    function computePoints(width: number, heightPx: number) {
      points.length = 0
      if (effCols <= 1 || effRows <= 1) return
      const innerWidth = Math.max(1, width - padding * 2)
      const innerHeight = Math.max(1, heightPx - padding * 2)
      const stepX = innerWidth / (effCols - 1)
      const stepY = innerHeight / (effRows - 1)
      for (let rowIndex = 0; rowIndex < effRows; rowIndex++) {
        for (let colIndex = 0; colIndex < effCols; colIndex++) {
          points.push({
            x: padding + colIndex * stepX,
            y: padding + rowIndex * stepY,
          })
        }
      }
      dotActivityRef.current = new Float32Array(points.length)
    }

    function resizeCanvas() {
      const width = containerEl.clientWidth
      const dims = computeResponsiveDims(width)
      effRows = dims.r
      effCols = dims.c
      const heightPx = height // keep height constant

      canvasEl.style.width = `${width}px`
      canvasEl.style.height = `${heightPx}px`
      canvasEl.width = Math.floor(width * deviceScale)
      canvasEl.height = Math.floor(heightPx * deviceScale)
      ctx.setTransform(deviceScale, 0, 0, deviceScale, 0, 0)

      computePoints(width, heightPx)

      // If grid dims changed, reset current route to avoid glitches
      if (effRows !== lastEffRows || effCols !== lastEffCols) {
        currentDual = null
        lastEffRows = effRows
        lastEffCols = effCols
      }
    }

    function randomIndex(maxExclusive: number) {
      return Math.floor(Math.random() * maxExclusive)
    }

    // Grid helpers and pathfinding (A*)
    function indexToRowCol(index: number): { r: number; c: number } {
      return { r: Math.floor(index / effCols), c: index % effCols }
    }
    function rowColToIndex(r: number, c: number): number {
      return r * effCols + c
    }
    function neighborsOf(index: number): number[] {
      const { r, c } = indexToRowCol(index)
      // Only orthogonal neighbors to avoid diagonal crossing
      const deltas = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
      ] as const
      const result: number[] = []
      for (const [dr, dc] of deltas) {
        const nr = r + dr
        const nc = c + dc
        if (nr >= 0 && nr < effRows && nc >= 0 && nc < effCols) {
          result.push(rowColToIndex(nr, nc))
        }
      }
      return result
    }
    function heuristic(a: number, b: number): number {
      const ar = Math.floor(a / effCols), ac = a % effCols
      const br = Math.floor(b / effCols), bc = b % effCols
      const dr = ar - br
      const dc = ac - bc
      return Math.hypot(dr, dc)
    }
    function manhattan(a: number, b: number): number {
      const ar = Math.floor(a / effCols), ac = a % effCols
      const br = Math.floor(b / effCols), bc = b % effCols
      return Math.abs(ar - br) + Math.abs(ac - bc)
    }
    function edgeKey(a: number, b: number): string {
      return a < b ? `${a}-${b}` : `${b}-${a}`
    }
    function interiorPadding(): number {
      // Use smaller padding on small grids
      if (effRows <= 8 || effCols <= 10) return 1
      return 2
    }
    function minSeparation(): number {
      // Dynamic minimum manhattan distance between the three points
      const base = Math.floor(Math.min(effRows, effCols) / 3)
      // Clamp between 2 and 6
      return Math.max(2, Math.min(6, base))
    }
    function requiredExtraForAube(): number {
      // On small grids, require only +1, otherwise +2
      return Math.min(2, Math.max(1, Math.floor(Math.min(effRows, effCols) / 8)))
    }
    function computeAStarPath(start: number, goal: number, blockedEdges?: Set<string>, blockedPoints?: Set<number>): number[] | null {
      const totalNodes = effRows * effCols
      const openSet: number[] = [start]
      const cameFrom = new Int32Array(totalNodes).fill(-1)
      const gScore = new Float32Array(totalNodes).fill(Infinity)
      const fScore = new Float32Array(totalNodes).fill(Infinity)
      const inOpen = new Uint8Array(totalNodes)
      const noise = new Float32Array(totalNodes)
      for (let i = 0; i < totalNodes; i++) noise[i] = Math.random()
      const noiseWeight = 1.25 // stronger meander

      gScore[start] = 0
      fScore[start] = heuristic(start, goal)
      inOpen[start] = 1

      while (openSet.length > 0) {
        // pick node with lowest fScore
        let bestIdx = 0
        let bestNode = openSet[0]
        let bestF = fScore[bestNode]
        for (let i = 1; i < openSet.length; i++) {
          const node = openSet[i]
          const f = fScore[node]
          if (f < bestF) {
            bestF = f
            bestIdx = i
            bestNode = node
          }
        }
        const current = bestNode
        openSet.splice(bestIdx, 1)
        inOpen[current] = 0

        if (current === goal) {
          const path: number[] = [current]
          let k = current
          while (cameFrom[k] !== -1) {
            k = cameFrom[k]
            path.push(k)
          }
          path.reverse()
          return path
        }

        const neigh = neighborsOf(current)
        for (const n of neigh) {
          // Avoid blocked edges and blocked points (except the goal)
          if (blockedEdges && blockedEdges.has(edgeKey(current, n))) continue
          if (blockedPoints && n !== goal && blockedPoints.has(n)) continue
          const stepCost = Math.hypot(
            (n % effCols) - (current % effCols),
            Math.floor(n / effCols) - Math.floor(current / effCols)
          )
          const tentative = gScore[current] + stepCost + noise[n] * noiseWeight
          if (tentative < gScore[n]) {
            cameFrom[n] = current
            gScore[n] = tentative
            fScore[n] = tentative + heuristic(n, goal)
            if (!inOpen[n]) {
              openSet.push(n)
              inOpen[n] = 1
            }
          }
        }
      }
      return null
    }
    function randomInteriorIndex(): number {
      const pad = interiorPadding()
      const maxR = Math.max(1, effRows - pad * 2)
      const maxC = Math.max(1, effCols - pad * 2)
      const r = pad + Math.floor(Math.random() * maxR)
      const c = pad + Math.floor(Math.random() * maxC)
      return r * effCols + c
    }
    function pickThreeSeparated(): [number, number, number] | null {
      const minSep = minSeparation()
      for (let tries = 0; tries < 150; tries++) {
        const a = randomInteriorIndex()
        const b = randomInteriorIndex()
        const c = randomInteriorIndex()
        if (a === b || a === c || b === c) continue
        if (manhattan(a, b) < minSep) continue
        if (manhattan(a, c) < minSep) continue
        if (manhattan(b, c) < minSep) continue
        return [a, b, c]
      }
      return null
    }
    function ensureCurrentDual(nowMs: number) {
      if (currentDual) return
      if (nowMs - lastAddMs < addEveryMs) return
      lastAddMs = nowMs

      // Try several times to satisfy length constraint for Aube path
      for (let attempt = 0; attempt < 25; attempt++) {
        const triple = pickThreeSeparated()
        if (!triple) continue
        // choose two starts and one target randomly
        const order = [...triple]
        for (let i = order.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[order[i], order[j]] = [order[j], order[i]]
        }
        const startA = order[0]
        const startB = order[1]
        const target = order[2]

        const pathCompany = computeAStarPath(startA, target)
        if (!pathCompany) continue
        // Block along company path (edges and intermediate points)
        const blockedEdges = new Set<string>()
        const blockedPoints = new Set<number>()
        for (let i = 0; i < pathCompany.length - 1; i++) {
          blockedEdges.add(edgeKey(pathCompany[i], pathCompany[i + 1]))
        }
        for (let i = 0; i < pathCompany.length - 1; i++) {
          blockedPoints.add(pathCompany[i])
        }
        let pathAube = computeAStarPath(startB, target, blockedEdges, blockedPoints)
        if (!pathAube) continue
        const extra = requiredExtraForAube()
        // Enforce minimal length difference. If not satisfied, try expanding blocks around company path
        if (pathAube.length < pathCompany.length + extra) {
          const expand = new Set<number>(blockedPoints)
          // Block neighbors of company path (excluding target)
          for (let i = 0; i < pathCompany.length - 1; i++) {
            const idx = pathCompany[i]
            neighborsOf(idx).forEach((n) => { if (n !== target) expand.add(n) })
          }
          pathAube = computeAStarPath(startB, target, blockedEdges, expand) || pathAube
        }
        if (pathAube.length < pathCompany.length + extra) {
          // Try swapping starts (maybe other start gives longer Aube path)
          const pathCompany2 = computeAStarPath(startB, target)
          if (!pathCompany2) continue
          const blockedEdges2 = new Set<string>()
          const blockedPoints2 = new Set<number>()
          for (let i = 0; i < pathCompany2.length - 1; i++) blockedEdges2.add(edgeKey(pathCompany2[i], pathCompany2[i + 1]))
          for (let i = 0; i < pathCompany2.length - 1; i++) blockedPoints2.add(pathCompany2[i])
          const pathAube2 = computeAStarPath(startA, target, blockedEdges2, blockedPoints2)
          if (!pathAube2) continue
          if (pathAube2.length < pathCompany2.length + extra) continue
          // Use swapped arrangement
          const startAt = nowMs + 1000
          const segCompany: number[] = []
          let totalCompany = 0
          for (let s = 0; s < pathCompany2.length - 1; s++) { const d = 420 + Math.floor(Math.random() * 380); segCompany.push(d); totalCompany += d }
          const segAube: number[] = []
          let totalAube = 0
          for (let s = 0; s < pathAube2.length - 1; s++) { const d = 420 + Math.floor(Math.random() * 380); segAube.push(d); totalAube += d }
          currentDual = {
            target,
            routes: [
              { indices: pathCompany2, startMs: startAt, segmentDurations: segCompany, totalDurationMs: totalCompany },
              { indices: pathAube2, startMs: startAt, segmentDurations: segAube, totalDurationMs: totalAube },
            ],
            labels: ["Your Company", "Aube"],
            phase: "drawing",
            holdStartMs: null,
            holdDurationMs: 3000,
            fadeStartMs: null,
            fadeDurationMs: 800,
          }
          break
        } else {
          // Use initial arrangement (Company from startA, Aube from startB)
          const startAt = nowMs + 1000
          const segCompany: number[] = []
          let totalCompany = 0
          for (let s = 0; s < pathCompany.length - 1; s++) { const d = 420 + Math.floor(Math.random() * 380); segCompany.push(d); totalCompany += d }
          const segAube: number[] = []
          let totalAube = 0
          for (let s = 0; s < pathAube.length - 1; s++) { const d = 420 + Math.floor(Math.random() * 380); segAube.push(d); totalAube += d }
          currentDual = {
            target,
            routes: [
              { indices: pathCompany, startMs: startAt, segmentDurations: segCompany, totalDurationMs: totalCompany },
              { indices: pathAube, startMs: startAt, segmentDurations: segAube, totalDurationMs: totalAube },
            ],
            labels: ["Your Company", "Aube"],
            phase: "drawing",
            holdStartMs: null,
            holdDurationMs: 3000,
            fadeStartMs: null,
            fadeDurationMs: 800,
          }
          break
        }
      }
    }

    function getThemeAwareColors() {
      const computed = getComputedStyle(containerEl)
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
      const { width, height: heightPx } = canvasEl
      // width/height here are device pixels; context was scaled back to CSS pixels
      ctx.clearRect(0, 0, width, heightPx)
      const { dot: dotColor, preferredLine, isDark } = getThemeAwareColors()
      const lastNow = lastNowRef.current || nowMs
      const deltaMs = Math.max(0, nowMs - lastNow)
      lastNowRef.current = nowMs
      const smoothingMs = 180
      const lerpFactor = 1 - Math.exp(-deltaMs / smoothingMs)

      // Ensure we have a dual route and collect active dots for smoothing/highlighting
      ensureCurrentDual(nowMs)
      const activeDotIndices = new Set<number>()
      if (currentDual) {
        const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
        const drawing = currentDual.phase === "drawing"
        for (let r = 0; r < 2; r++) {
          const route = currentDual.routes[r]
          const lifeMs = nowMs - route.startMs
          if (lifeMs < 0) continue // not started yet
          let remaining = lifeMs
          let currentSegment = 0
          for (; currentSegment < route.segmentDurations.length; currentSegment++) {
            const d = route.segmentDurations[currentSegment]
            if (remaining < d) break
            remaining -= d
          }
          const indices = route.indices
          if (!drawing) {
            for (let k = 0; k < indices.length; k++) activeDotIndices.add(indices[k])
          } else {
            activeDotIndices.add(indices[0])
            for (let s = 0; s < currentSegment; s++) {
              activeDotIndices.add(indices[s])
              activeDotIndices.add(indices[s + 1])
            }
            if (currentSegment < route.segmentDurations.length) {
              const segProgress = clamp01(remaining / route.segmentDurations[currentSegment])
              if (segProgress > 0) activeDotIndices.add(indices[currentSegment])
              if (segProgress >= 1) activeDotIndices.add(indices[currentSegment + 1])
            } else if (lifeMs >= 0) {
              activeDotIndices.add(indices[indices.length - 1])
            }
          }
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
      const blue = "rgb(59, 130, 246)" // Tailwind blue-500
      let blueMix = 0
      if (currentDual && currentDual.phase === "hold" && currentDual.holdStartMs) {
        const t = Math.max(0, Math.min(1, (nowMs - currentDual.holdStartMs) / 300))
        blueMix = t // light transition to blue
      } else if (currentDual && currentDual.phase === "fading") {
        blueMix = 1
      }
      const highlightBase = mixRgb(preferredLine, blue, blueMix)
      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        const a = activity[i] || 0
        // Base dot
        ctx.fillStyle = asRgba(dotColor, baseAlpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, dotRadius, 0, Math.PI * 2)
        ctx.fill()

        if (a > 0.001) {
          // Overlay highlight with increased radius and line color
          const radius = dotRadius * (1 + 0.5 * a)
          ctx.fillStyle = asRgba(highlightBase, highlightAlpha * a)
          ctx.beginPath()
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // Draw both routes; turn blue only when both connected, then fade, then restart
      if (currentDual) {
        const now = nowMs
        const bothFinished = currentDual.routes.every((r) => now - r.startMs >= r.totalDurationMs)
        if (currentDual.phase === "drawing" && bothFinished) {
          currentDual.phase = "hold"
          currentDual.holdStartMs = now
        } else if (currentDual.phase === "hold" && currentDual.holdStartMs !== null && now - currentDual.holdStartMs >= currentDual.holdDurationMs) {
          currentDual.phase = "fading"
          currentDual.fadeStartMs = now
        } else if (currentDual.phase === "fading" && currentDual.fadeStartMs !== null && now - currentDual.fadeStartMs >= currentDual.fadeDurationMs) {
          currentDual = null
        }

        let fadeMultiplier = 1
        if (currentDual && currentDual.phase === "fading" && currentDual.fadeStartMs !== null) {
          const fadeElapsed = now - currentDual.fadeStartMs
          fadeMultiplier = Math.max(0, 1 - fadeElapsed / currentDual.fadeDurationMs)
        }

        const isBluePhase = currentDual ? currentDual.phase !== "drawing" : false
        const baseColor = isBluePhase ? mixRgb(preferredLine, blue, blueMix) : preferredLine
        const lineAlpha = (isBluePhase ? 0.70 : (isDark ? 0.34 : 0.32)) * fadeMultiplier

        // Draw glow first during hold/fade
        if (isBluePhase) {
          ctx.save()
          ctx.strokeStyle = asRgba(blue, Math.min(0.45, 0.45 * fadeMultiplier))
          ctx.shadowColor = asRgba(blue, Math.min(0.8, 0.8 * fadeMultiplier))
          ctx.shadowBlur = 12
          ctx.lineWidth = 4
          const dual = currentDual
          if (dual) {
            for (let r = 0; r < 2; r++) {
              drawRoutePath(ctx, points, dual.routes[r], now)
            }
          }
          ctx.restore()
        }

        // Draw crisp path on top
        ctx.strokeStyle = asRgba(baseColor, lineAlpha)
        ctx.lineWidth = 1.8
        for (let r = 0; currentDual && r < 2; r++) {
          drawRoutePath(ctx, points, currentDual.routes[r], now, currentDual.phase === "drawing")
        }

        // Labels with fade in/out and solid backgrounds; start labels disappear with Solution
        if (currentDual) {
          drawLabels(ctx, currentDual, points, now, preferredLine, isDark)
        }
      }

      // Dual-route lifecycle is managed here
      animationFrameId = requestAnimationFrame(draw)
    }

    function drawRoutePath(
      ctx: CanvasRenderingContext2D,
      points: Array<{ x: number; y: number }>,
      route: SingleRoute,
      now: number,
      clipToCurrentSegment: boolean = false,
    ) {
      const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
      const lifeMs = now - route.startMs
      if (lifeMs < 0) return
      let remaining = lifeMs
      let currentSegment = 0
      for (; currentSegment < route.segmentDurations.length; currentSegment++) {
        const d = route.segmentDurations[currentSegment]
        if (remaining < d) break
        remaining -= d
      }
      ctx.beginPath()
      const indices = route.indices
      const first = points[indices[0]]
      ctx.moveTo(first.x, first.y)
      for (let s = 0; s < currentSegment; s++) {
        const b = points[indices[s + 1]]
        ctx.lineTo(b.x, b.y)
      }
      if (clipToCurrentSegment && currentSegment < route.segmentDurations.length) {
        const a = points[indices[currentSegment]]
        const b = points[indices[currentSegment + 1]]
        const segProgress = clamp01(remaining / route.segmentDurations[currentSegment])
        const x = a.x + (b.x - a.x) * segProgress
        const y = a.y + (b.y - a.y) * segProgress
        ctx.lineTo(x, y)
      } else {
        const last = points[indices[indices.length - 1]]
        ctx.lineTo(last.x, last.y)
      }
      ctx.stroke()
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

    function mixRgb(a: string, b: string, t: number): string {
      const parse = (c: string) => {
        if (c.startsWith("rgb")) {
          const parts = c.replace(/rgba?\(|\)|\s/g, "").split(",").map(Number)
          return { r: parts[0] || 0, g: parts[1] || 0, b: parts[2] || 0 }
        }
        const h = c.trim()
        const rgb = hexToRgb(h) || { r: 0, g: 0, b: 0 }
        return rgb
      }
      const ca = parse(a)
      const cb = parse(b)
      const r = Math.round(ca.r + (cb.r - ca.r) * t)
      const g = Math.round(ca.g + (cb.g - ca.g) * t)
      const b2 = Math.round(ca.b + (cb.b - ca.b) * t)
      return `rgb(${r}, ${g}, ${b2})`
    }

    function drawLabels(
      ctx: CanvasRenderingContext2D,
      dual: DualRoute,
      pts: Array<{ x: number; y: number }>,
      now: number,
      preferredLine: string,
      isDark: boolean
    ) {
      const font = "12px ui-sans-serif, -apple-system, system-ui, Segoe UI, Roboto"
      ctx.font = font
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      const padX = 12 // px-3
      const padY = 6 // py-1.5
      const radius = 999
      const bgColor = isDark ? "rgb(23,23,23)" : "rgb(245,245,245)" // neutral-900 / neutral-100
      const borderColor = asRgba(preferredLine, 0.15) // border-foreground/15
      const textColor = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.7)"

      const startIdx0 = dual.routes[0].indices[0]
      const startIdx1 = dual.routes[1].indices[0]
      const label0 = dual.labels[0]
      const label1 = dual.labels[1]
      const startAt = dual.routes[0].startMs // both delayed equally

      // Fade for start labels: fade in over 300ms starting 1s before start; stay visible through hold; fade out during fading
      let startAlpha = 0
      if (now < startAt) {
        const t = Math.min(1, Math.max(0, (now - (startAt - 1000)) / 300))
        startAlpha = t
      } else if (dual.phase === "drawing" || dual.phase === "hold") {
        startAlpha = 1
      } else if (dual.phase === "fading" && dual.fadeStartMs) {
        const fadeElapsed = now - dual.fadeStartMs
        startAlpha = Math.max(0, 1 - fadeElapsed / dual.fadeDurationMs)
      }

      if (startAlpha > 0) {
        drawPill(ctx, pts[startIdx0].x, pts[startIdx0].y - 16, label0, padX, padY, radius, bgColor, borderColor, textColor, startAlpha)
        drawPill(ctx, pts[startIdx1].x, pts[startIdx1].y - 16, label1, padX, padY, radius, bgColor, borderColor, textColor, startAlpha)
      }

      // Solution label: fade in when hold starts (both paths connected), fade out with route fading
      if (dual.phase === "hold" && dual.holdStartMs) {
        const t = Math.min(1, Math.max(0, (now - dual.holdStartMs) / 300))
        drawPill(ctx, pts[dual.target].x, pts[dual.target].y - 16, "Solution", padX, padY, radius, bgColor, borderColor, textColor, t)
      } else if (dual.phase === "fading" && dual.fadeStartMs) {
        const fadeElapsed = now - dual.fadeStartMs
        const fadeT = Math.max(0, 1 - fadeElapsed / dual.fadeDurationMs)
        drawPill(ctx, pts[dual.target].x, pts[dual.target].y - 16, "Solution", padX, padY, radius, bgColor, borderColor, textColor, fadeT)
      }
    }

    function drawPill(
      ctx: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      text: string,
      padX: number,
      padY: number,
      radius: number,
      bgColor: string,
      borderColor: string,
      textColor: string,
      alpha: number
    ) {
      const metrics = ctx.measureText(text)
      const w = metrics.width + padX * 2
      const h = 22 // fixed height for pill look
      const x = cx - w / 2
      const y = cy - h

      const prevAlpha = ctx.globalAlpha
      ctx.globalAlpha = alpha

      // Rounded pill
      ctx.beginPath()
      const r = Math.min(radius, h / 2)
      ctx.moveTo(x + r, y)
      ctx.lineTo(x + w - r, y)
      ctx.quadraticCurveTo(x + w, y, x + w, y + r)
      ctx.lineTo(x + w, y + h - r)
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      ctx.lineTo(x + r, y + h)
      ctx.quadraticCurveTo(x, y + h, x, y + h - r)
      ctx.lineTo(x, y + r)
      ctx.quadraticCurveTo(x, y, x + r, y)
      ctx.closePath()

      ctx.fillStyle = bgColor
      ctx.fill()
      ctx.strokeStyle = borderColor
      ctx.lineWidth = 1
      ctx.stroke()

      // Text
      ctx.fillStyle = textColor
      ctx.fillText(text, cx, y + h / 2)

      ctx.globalAlpha = prevAlpha
    }

    // Initial sizing + observe width changes
    resizeCanvas()
    const resizeObserver = new ResizeObserver(() => {
      deviceScale = Math.max(1, Math.min(2, window.devicePixelRatio || 1))
      resizeCanvas()
    })
    resizeObserver.observe(containerEl)

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


