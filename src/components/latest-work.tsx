import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { WorkTileCard } from "./latest-work/work-tile-card"

export function CarouselDemo() {
  return (
    <div id="latest-work" className="w-full overflow-x-hidden bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900 dark:to-transparent" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-visible mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-30">
      <h1 className="text-6xl leading-[1.1] font-[538] tracking-[-0.0325em]">Travaux<br/>récents</h1>
      <Carousel 
        className="w-full pt-15"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent className="-ml-0">
          {/* Samsung */}
          <CarouselItem className="pl-0 basis-auto min-w-[320px]">
            <WorkTileCard
              href="/work/samsung"
              title="Samsung"
              subtitle="Data Analytics Enablement"
              imageSrc="/SamsungS25.svg"
              imageAlt="Samsung Logo"
            />
          </CarouselItem>

          {/* HPE */}
          <CarouselItem className="pl-0 basis-auto min-w-[320px]">
            <WorkTileCard
              href="/work/hpe"
              title="HPE"
              subtitle="Channel Performance Intelligence"
              imageSrc="/HPE.svg"
              imageAlt="HPE Logo"
            />
          </CarouselItem>

          {/* More coming soon */}
          <CarouselItem className="pl-0 basis-auto min-w-[320px]">
            <div className="p-1">
              <Card className="group cursor-pointer relative overflow-hidden py-0 h-full">
                {/* Grid Background */}
                <div 
                  className="absolute inset-0 pointer-events-none z-0"
                  style={{
                    backgroundImage: `
                      linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px),
                      linear-gradient(var(--grid-line-color) 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px, 20px 20px',
                  }}
                />



                {/* Opacity overlay that disappears on hover */}
                <div className="absolute inset-0 bg-background/30 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none z-15" />

                {/* Edge Gradients (mask only background + svg) */}
                <div className="absolute bottom-0 left-0 right-0 h-38 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none z-20" />
                
                <CardContent className="relative flex flex-col aspect-3/4 z-30">
                  {/* Spacer content area to keep layout consistent */}
                  <div className="flex-1" />
                  
                  {/* Bottom section with text only */}
                  <div className="pb-6">
                    <div className="text-lg font-semibold">More Coming Soon</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-center items-center gap-4 mt-8">
          <CarouselPrevious className="relative left-0 top-0 translate-x-0 translate-y-0" />
          <CarouselNext className="relative right-0 top-0 translate-x-0 translate-y-0" />
        </div>
      </Carousel>
      </div>
    </div>
  )
}
