import * as React from "react"
import { SimpleWorkCard } from "@/components/simple-work-card"

export function FeaturedWork() {
  return (
    <div className="w-full">
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-visible mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl leading-[1.1] font-[538] tracking-[-0.03em] mb-8">Sélection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
          <SimpleWorkCard
            href="/work/samsung"
            title="Samsung"
            subtitle="Marketing, Channel & E-Commerce"
            imageSrc="/SamsungS25.svg"
            imageAlt="Samsung Logo"
          />
          <SimpleWorkCard
            href="/work/hpe"
            title="HPE"
            subtitle="Channel Performance Intelligence"
            imageSrc="/HPE.svg"
            imageAlt="HPE Logo"
          />
          <SimpleWorkCard
            title="More Coming Soon"
          />
        </div>
      </div>
    </div>
  )
}



