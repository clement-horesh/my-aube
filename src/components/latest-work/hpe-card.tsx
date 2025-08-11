import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

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
          Within HPE's Channel Sales team, we built a scalable intelligence layer to steer partner and distributor performance. Our focus was to make KPIs such as sell‑in and sell‑out both reliable and actionable, so that channel managers could prioritize opportunities and correct course early.
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

export function HpeCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-1 max-w-xs mx-auto">
          <Card className="group cursor-pointer relative overflow-hidden py-0">
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
              <Image
                src="/HPE.svg"
                alt="HPE Logo"
                width={100}
                height={100}
                className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto opacity-60 grayscale contrast-75"
                priority={false}
              />
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
                  <div className="text-lg font-semibold">HPE</div>
                  <div className="text-sm text-muted-foreground">Channel Performance Intelligence</div>
                </div>
                <button aria-label="Open details" className="inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground group-hover:bg-muted/80 group-hover:text-foreground transition-colors border border-border/40 w-11 h-11 cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:rounded-lg">
        <HpeModalContent />
      </DialogContent>
    </Dialog>
  )
}
