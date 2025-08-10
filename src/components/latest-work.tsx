import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

function SamsungModalContent() {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>Samsung — Data Analytics Enablement for B2B Growth</DialogTitle>
        <DialogDescription>
          Overhauled analytics foundations to support rapid decision-making across B2B e‑commerce, Channel and Marketing.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
        <p>
          To meet a sharp rise in analytical needs across the B2B organization, we rebuilt Samsung’s decision stack for the e‑commerce site, Channel operations and Marketing. We delivered a coherent analytics layer that executives and practitioners could rely on for faster, more confident decisions across sell‑in, sell‑through and campaign performance.
        </p>
        <p>
          We created roughly ten production‑grade dashboards and Excel assets to operationalize market and channel intelligence. These assets now support about thirty stakeholders, including management, with consistent definitions and drill‑downs that cut through noisy signals. We also rolled out an automated PDF generation flow that consolidates partner data for roughly twenty key account managers, eliminating manual assembly and improving cadence and accuracy for the field.
        </p>
        <p>
          Alongside the product organization, we supported launches with quantified business cases and live KPI tracking. This ensured that new product introductions were governed by data from day one, with alignment between Marketing, Channel and e‑commerce on goals, levers and corrective actions.
        </p>
      </div>
    </div>
  )
}

function HpeModalContent() {
  return (
    <div className="space-y-4">
      <DialogHeader>
        <DialogTitle>HPE — Channel Performance Intelligence</DialogTitle>
        <DialogDescription>
          Embedded with Channel Sales to operationalize KPI tracking and accelerate partner growth.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 text-sm leading-relaxed text-foreground/90">
        <p>
          Within HPE’s Channel Sales team, we built a scalable intelligence layer to steer partner and distributor performance. Our focus was to make KPIs such as sell‑in and sell‑out both reliable and actionable, so that channel managers could prioritize opportunities and correct course early.
        </p>
        <p>
          We developed a suite of Power BI dashboards—more than five core assets—covering partner and distributor health with drill‑throughs to product, segment and time. We automated recurring reporting using Power Query and Power Automate to reduce manual effort and latency, improving refresh consistency and freeing up time for analysis.
        </p>
        <p>
          With this foundation, we ran quantitative analyses to identify sales trends, growth pockets and deviations from target across the network, turning insight into concrete actions. To ensure adoption and long‑term autonomy, we trained about ten end users and produced approximately two hours of tutorials tailored to their workflows.
        </p>
      </div>
    </div>
  )
}

export function CarouselDemo() {
  return (
    <div id="latest-work" className="w-full bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900 dark:to-transparent" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-30">
      <h1 className="text-[56px] leading-[1.1] font-[538] tracking-[-0.0325em]">Our Latest<br/>Work</h1>
      <Carousel 
        className="w-full pt-15"
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
      >
        <CarouselContent>
          {/* Samsung */}
          <CarouselItem className="basis-1/3 md:basis-1/2 lg:basis-1/3">
            <Dialog>
              <DialogTrigger asChild>
                <div className="p-1 max-w-xs mx-auto">
                  <Card className="group cursor-pointer">
                    <CardContent className="relative flex aspect-square items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-semibold">Samsung</div>
                      </div>
                      <button aria-label="Open details" className="absolute bottom-0 right-3 inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground group-hover:bg-muted/80 group-hover:text-foreground transition-colors border border-border/40 w-11 h-11 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:rounded-lg">
                <SamsungModalContent />
              </DialogContent>
            </Dialog>
          </CarouselItem>

          {/* HPE */}
          <CarouselItem className="basis-1/3 md:basis-1/2 lg:basis-1/3">
            <Dialog>
              <DialogTrigger asChild>
                <div className="p-1 max-w-xs mx-auto">
                  <Card className="group cursor-pointer">
                    <CardContent className="relative flex aspect-square items-center justify-center p-6">
                      <div className="text-center">
                        <div className="text-3xl font-semibold">HPE</div>
                      </div>
                      <button aria-label="Open details" className="absolute bottom-0 right-3 inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground group-hover:bg-muted/80 group-hover:text-foreground transition-colors border border-border/40 w-11 h-11 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                          <path d="M12 5v14M5 12h14" />
                        </svg>
                      </button>
                    </CardContent>
                  </Card>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:rounded-lg">
                <HpeModalContent />
              </DialogContent>
            </Dialog>
          </CarouselItem>

          {/* More coming soon */}
          <CarouselItem className="basis-1/3 md:basis-1/2 lg:basis-1/3">
            <div className="p-1 max-w-xs mx-auto">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <div className="text-center">
                    <div className="text-2xl font-semibold">More coming soon</div>
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
