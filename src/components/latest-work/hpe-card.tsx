import * as React from "react"
import { WorkTileCard } from "./work-tile-card"

export function HpeCard() {
  return (
    <WorkTileCard
      href="/work/hpe"
      title="HPE"
      subtitle="Channel Performance Intelligence"
      imageSrc="/HPE.svg"
      imageAlt="HPE Logo"
    />
  )
}
