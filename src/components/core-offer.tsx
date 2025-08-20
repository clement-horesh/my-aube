"use client"

import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import DotConnectorGrid from "@/components/dot-grid"

export function GradientSection() {
  return (
    <div id="core-offer" className="w-full bg-gradient-to-b from-neutral-100 to-neutral-0 dark:from-neutral-900 dark:to-neutral-950" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-4 pt-50 pb-30">
        <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-[538] tracking-[-0.0325em] mb-10">Nos domaines<br/>d&apos;expertise</h1>
        
        {/* Top Section */}
        <h3 className="text-xl font-semibold text-foreground mb-5">Data Analyse</h3>

          <p className="max-w-full md:max-w-[60%] text-foreground/50 mb-6">
          Nous livrons des solutions d&apos;analyse de données à fort impact conçues, implémentées et opérées par nos consultants experts. Nous transformons les données brutes en insights clairs et exploitables, vous aidant à repérer les tendances, prendre des décisions éclairées et maximiser votre intelligence métier. </p>

      </div>
      
      {/* Image section that extends beyond container width */}
      <div className="w-full -mt-40 mb-2">
        <div 
          className="relative w-full max-w-7xl mx-auto h-120 md:h-160 responsive-mask"
        >
          <Image
            src="/Section 1.png"
            alt="Illustration ETL"
            fill
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 pb-30">
        {/* Separator */}
        <Separator />

        {/* Middle Section - Two side by side */}
        <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto_1fr] gap-0 items-stretch">
          <div className="flex items-stretch pt-10">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-foreground mb-5">Automatisation de Workflows</h3>
              <p className="max-w-full text-foreground/50 mb-10 mr-10">
              Elimine le travail manuel fastidieux, réduit les erreurs et accélère les opérations. Nos solutions sont créent sur mesure et s&apos;intègrent parfaitement dans vos processus, libérant votre équipe pour se concentrer sur ce qui compte. </p>

          <div className="relative">
            <div className="rounded-3xl p-2 border border-border/70">
              <div
                className="relative rounded-2xl pt-5 pl-5 border border-border bg-gradient-to-b from-foreground/3 to-transparent dark:from-foreground/5 dark:to-transparent bg-white/60 dark:bg-white/0 p-5 overflow-hidden"
                aria-hidden="true"
              >

                  <h2 className="text-lg font-semibold">Flux d&apos;Automatisation d&apos;Analyse</h2>
                  <div className="h-[22px]" />
                  <div className="flex flex-col gap-4">
                    {/* Timeline */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Flux</div>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-500 to-neutral-600 text-white text-xs font-semibold shadow-sm">1</div>
                          <div>
                            <div className="text-sm font-medium">Préparation</div>
                            <div className="text-sm text-muted-foreground">Collecte, nettoyage & standardisation des données</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-600 to-neutral-700 text-white text-xs font-semibold shadow-sm">2</div>
                          <div>
                            <div className="text-sm font-medium">Calculs</div>
                            <div className="text-sm text-muted-foreground">Injection des données puis exécution de modèles de calculs</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 text-white text-xs font-semibold shadow-sm">3</div>
                          <div>
                            <div className="text-sm font-medium">Utilisation</div>
                            <div className="text-sm text-muted-foreground">Publication des insights sur vos dashboards; envoie d&apos;alertes et déclenchement des workflows.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Résultats</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Moins d&apos;erreurs</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Heures économisées</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Alertes en temps réel</span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Wrapper overlays to cover borders and content on right/bottom */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Right edge gradient */}
              <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l to-transparent from-background/100" />
              {/* Bottom edge gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t to-transparent from-background/100" />
            </div>
          </div>
            </div>
          </div>
          <div className="hidden md:flex items-stretch justify-center">
            <Separator orientation="vertical" className="h-full w-px" />
          </div>
          <div className="flex items-stretch">
            <div className="w-full pt-10 sm:pl-10 ">
                  <h2 className="text-xl font-medium mb-5 font-semibold sm:mr-0 mr-10">ETL / Transformation de Données</h2>
                  <p className="max-w-full text-foreground/50 mb-10 sm:mr-0 mr-10">
            Nous concevons et opérons des pipelines ETL résilients qui collectent les données de vos systèmes centraux, les nettoient et les standardisent, et livrent des tables rapides et fiables à votre entrepôt de données et BI. Construits pour la fiabilité, l&apos;observabilité et l&apos;évolutivité.
          </p>
                 
                  <div className="relative">
            <div className="rounded-3xl p-2 border border-border/70">
              <div
                className="relative rounded-2xl pt-5 pl-5 border border-border bg-gradient-to-b from-foreground/3 to-transparent dark:from-foreground/5 dark:to-transparent bg-white/60 dark:bg-white/0 p-5 overflow-hidden"
                aria-hidden="true"
              >

                  <h2 className="text-lg font-semibold">Aperçu du Pipeline</h2>
                  <div className="h-[22px]" />
                  <div className="flex flex-col gap-4">
                    {/* Stages */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Étapes</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
                          Extraire
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-green-500" />
                          Transformer
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                          Charger
                        </span>
                      </div>
                    </div>

                    {/* Sources */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Sources</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-400" />
                          CRM
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" />
                          ERP
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500" />
                          E‑commerce
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" />
                          CSV/FTP
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-700" />
                          APIs
                        </span>
                      </div>
                    </div>

                    {/* Destinations */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Destinations</div>
                      <div className="flex items-center gap-3 flex-wrap mt-[2px]">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <Image src="/Snowflake.svg" alt="Entrepôt Snowflake" width={20} height={20} className="h-5 w-auto" />
                          <span>Entrepôt</span>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <Image src="/PostGres.svg" alt="Magasin Opérationnel Postgres" width={20} height={20} className="h-5 w-auto" />
                          <span>Magasin Opérationnel</span>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <Image src="/PBI.svg" alt="Tableaux de Bord Power BI" width={20} height={20} className="h-5 w-auto" />
                          <span>Tableaux de Bord BI</span>
                        </span>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            {/* Wrapper overlays to cover borders and content on right/bottom */}
            <div className="pointer-events-none absolute inset-0 z-10">
              {/* Right edge gradient */}
              <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l to-transparent from-background/100" />
              {/* Bottom edge gradient */}
              <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t to-transparent from-background/100" />
            </div>
          </div>
            </div>
            
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col pt-10">
          <h2 className="text-xl font-semibold text-foreground">Business Analyse</h2>
          <p className="max-w-full text-foreground/50 mb-10 mt-5">
            Nous aidons les équipes à relier les points entre données, processus et objectifs
            métiers. En partant des faits, nous clarifions les questions clés, identifions les
            leviers de croissance et transformons les signaux faibles en décisions concrètes.
            L&apos;analyse ne s&apos;arrête pas aux chiffres : elle connecte les informations éparses pour
            raconter une histoire utile, aligner les parties prenantes et guider l&apos;action.
          </p>
          <DotConnectorGrid rows={14} cols={21} height={520} dotRadius={3} className="bg-transparent" />
        </div>
      </div>
    </div>
  )
}