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
      {/* Top header area with grid, gradient, and logo */}
      <div className="relative h-[140px] overflow-hidden -mx-6">
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
        <Image
          src="/SamsungS25.svg"
          alt="Samsung Logo"
          width={200}
          height={100}
          className="absolute top-3 right-3 w-[180px] h-auto opacity-60 grayscale contrast-75 dark:invert pointer-events-none z-10"
          priority={false}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-20" />
      </div>
      <DialogHeader>
        <DialogTitle>Samsung — Data Analytics Enablement for B2B Growth</DialogTitle>
        <DialogDescription>
          Overhauled analytics foundations to support rapid decision-making across B2B e‑commerce, Channel and Marketing.
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-5 text-sm leading-relaxed text-foreground/90">
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Contexte et objectif</h3>
          <p>
            Pour répondre à une forte hausse des besoins analytiques au sein de l’organisation B2B, nous avons refondu la chaîne de décision de Samsung pour l’e‑commerce, les opérations Channel et le Marketing. Nous avons livré une couche d’analytique cohérente, fiable pour les dirigeants et les équipes, accélérant des décisions plus sûres sur le sell‑in, le sell‑out et la performance des campagnes.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Livrables clés</h3>
          <p>
            Nous avons créé une dizaine de tableaux de bord et actifs Excel prêts pour la production afin d’opérationnaliser l’intelligence marché et channel. Ces actifs servent désormais ~30 parties prenantes, management inclus, avec des définitions alignées et des explorations qui filtrent le bruit. Nous avons également déployé un flux d’automatisation PDF consolidant les données partenaires pour ~20 KAM, supprimant l’assemblage manuel et améliorant la cadence et la fiabilité sur le terrain.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Pilotage des lancements</h3>
          <p>
            Aux côtés de l’organisation produit, nous avons soutenu les lancements par des business cases chiffrés et un suivi des KPI en temps réel. Les lancements ont ainsi été pilotés par la donnée dès J0, avec un alignement Marketing, Channel et e‑commerce sur les objectifs, leviers et actions correctives.
          </p>
        </div>
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
      <DialogContent className="sm:rounded-lg pt-0">
        <SamsungModalContent />
      </DialogContent>
    </Dialog>
  )
}
