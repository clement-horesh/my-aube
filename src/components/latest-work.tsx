import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { SamsungCard, HpeCard } from "./latest-work/index"

export function CarouselDemo() {
  return (
    <div id="latest-work" className="w-full bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900 dark:to-transparent" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl overflow-visible mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-30">
      <h1 className="text-6xl leading-[1.1] font-[538] tracking-[-0.0325em]">Our Latest<br/>Work</h1>
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
            <SamsungCard />
          </CarouselItem>

          {/* HPE */}
          <CarouselItem className="pl-0 basis-auto min-w-[320px]">
            <HpeCard />
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

                {/* Background SVG */}
                <div className="absolute inset-0 z-10 overflow-hidden">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto opacity-60 grayscale contrast-75">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="40" fill="currentColor" opacity="0.3"/>
                      <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="12" opacity="0.6">+</text>
                    </svg>
                  </div>
                </div>

                {/* Opacity overlay that disappears on hover */}
                <div className="absolute inset-0 bg-background/30 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none z-15" />

                {/* Edge Gradients (mask only background + svg) */}
                <div className="absolute bottom-0 left-0 right-0 h-38 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none z-20" />
                
                <CardContent className="relative flex flex-col aspect-3/4 z-30">
                  {/* Spacer content area to keep layout consistent */}
                  <div className="flex-1" />
                  
                  {/* Bottom section with text and button */}
                  <div className="flex items-center justify-between pb-6">
                    <div className="text-left">
                      <div className="text-lg font-semibold">More Coming</div>
                      <div className="text-sm text-muted-foreground">Stay tuned for updates</div>
                    </div>
                    <button aria-label="Coming soon" className="inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground group-hover:bg-muted/80 group-hover:text-foreground transition-colors border border-border/40 w-11 h-11 cursor-pointer">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
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
