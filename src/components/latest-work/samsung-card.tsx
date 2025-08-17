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
          To meet a sharp rise in analytical needs across the B2B organization, we rebuilt Samsung's decision stack for the e‑commerce site, Channel operations and Marketing. We delivered a coherent analytics layer that executives and practitioners could rely on for faster, more confident decisions across sell‑in, sell‑through and campaign performance.
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

export function SamsungCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
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
              <Image
                src="/SamsungS25.svg"
                alt="Samsung Logo"
                width={100}
                height={100}
                className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto opacity-60 grayscale contrast-75 dark:invert"
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
                  <div className="text-lg font-semibold">Samsung</div>
                  <div className="text-sm text-muted-foreground">Data Analytics Enablement</div>
                </div>
                <button aria-label="Open details" className="inline-flex items-center justify-center rounded-full bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground group-hover:bg-muted group-hover:text-foreground transition-colors border border-border/40 w-11 h-11 cursor-pointer">
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
        <SamsungModalContent />
      </DialogContent>
    </Dialog>
  )
}
