import * as React from "react"
import Image from "next/image"

export function HpeBanner() {
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
        src="/HPE.svg"
        alt="HPE Logo"
        width={200}
        height={100}
        className="absolute top-3 right-3 w-[180px] h-auto opacity-60 grayscale contrast-75 dark:invert pointer-events-none z-10"
        priority={false}
      />
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent pointer-events-none z-20" />
    </div>
  )
}

export function HpeBody() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">HPE — Channel Performance Intelligence</h1>
        <p className="text-muted-foreground">
          Embedded with Channel Sales to operationalize KPI tracking and accelerate partner growth.
        </p>
      </div>
      <div className="space-y-5 text-sm leading-relaxed text-foreground/90">
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Contexte et objectif</h3>
          <p>
            Au sein de l’équipe Channel Sales d’HPE, nous avons conçu une couche d’intelligence scalable pour piloter la performance des partenaires et distributeurs. Notre priorité : rendre des KPI comme le sell‑in et le sell‑out fiables et actionnables, afin que les responsables Channel puissent prioriser et corriger rapidement.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Livrables clés</h3>
          <p>
            Nous avons développé une suite de tableaux de bord Power BI (plus de cinq actifs principaux) couvrant la santé partenaires/distributeurs avec des drill‑downs par produit, segment et période. Nous avons automatisé les reportings récurrents via Power Query et Power Automate pour réduire l’effort manuel et la latence, améliorant la fréquence des rafraîchissements et libérant du temps pour l’analyse.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold">Analyses et adoption</h3>
          <p>
            Sur cette base, nous avons mené des analyses quantitatives pour détecter tendances, poches de croissance et écarts aux objectifs sur le réseau, transformant l’insight en actions concrètes. Pour assurer l’adoption et l’autonomie, nous avons formé une dizaine d’utilisateurs finaux et produit environ deux heures de tutoriels adaptés à leurs usages.
          </p>
        </div>
      </div>
    </div>
  )
}

export function HpeContent() {
  return (
    <div className="space-y-4">
      <HpeBanner />
      <HpeBody />
    </div>
  )
}


