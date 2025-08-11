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
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-30">
      <h1 className="text-6xl leading-[1.1] font-[538] tracking-[-0.0325em]">Our Latest<br/>Work</h1>
      <Carousel 
        className="w-full pt-15"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent>
          {/* Samsung */}
          <CarouselItem className="basis-1/1 md:basis-1/2 lg:basis-1/2">
            <SamsungCard />
          </CarouselItem>

          {/* HPE */}
          <CarouselItem className="basis-1/1 md:basis-1/2 lg:basis-1/2">
            <HpeCard />
          </CarouselItem>

          {/* More coming soon */}
          <CarouselItem className="basis-1/1 md:basis-1/2 lg:basis-1/2">
            <div className="p-1 max-w-xs mx-auto">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-lg">More coming soon</div>
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
