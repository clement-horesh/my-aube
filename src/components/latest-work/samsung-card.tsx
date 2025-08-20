import * as React from "react"
import { WorkTileCard } from "./work-tile-card"

export function SamsungCard() {
  return (
    <WorkTileCard
      href="/work/samsung"
      title="Samsung"
      subtitle="Data Analytics Enablement"
      imageSrc="/SamsungS25.svg"
      imageAlt="Samsung Logo"
    />
  )
}
