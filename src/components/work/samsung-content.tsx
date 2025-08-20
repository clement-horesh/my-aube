import * as React from "react"
import Image from "next/image"

export function SamsungBanner() {
  return (
    <div className="relative h-[240px] overflow-hidden mt-10">
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
  )
}

export function SamsungBody() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">Samsung — Data Analytics Enablement for B2B Growth</h1>
        <p className="text-muted-foreground">
          Overhauled analytics foundations to support rapid decision-making across B2B e‑commerce, Channel and Marketing.
        </p>
      </div>
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

export function SamsungContent() {
  return (
    <div className="space-y-4">
      <SamsungBanner />
      <SamsungBody />
    </div>
  )
}


