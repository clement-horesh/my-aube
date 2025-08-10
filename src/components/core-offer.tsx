"use client"

import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function GradientSection() {
  return (
    <div id="core-offer" className="w-full bg-gradient-to-b from-neutral-100 to-neutral-0 dark:from-neutral-900 dark:to-neutral-950" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-4 pt-50 pb-30">
        <h1 className="text-[56px] leading-[1.1] font-[538] tracking-[-0.0325em]">Production‑grade<br/>Data ETL</h1>
        
        {/* Top Section */}

          <p className="max-w-full md:max-w-[50%] mb-6 mt-8">
            We design and operate resilient ETL pipelines that collect data from your core systems, clean and standardize it, and deliver fast, trusted tables to your warehouse and BI. Built for reliability, observability and scale.
          </p>

      </div>
      
      {/* Image section that extends beyond container width */}
      <div className="w-full  -mt-40 mb-2">
        <div 
          className="relative w-full max-w-7xl mx-auto h-160 responsive-mask"
        >
          <Image
            src="/Section 1.png"
            alt="ETL Illustration"
            fill
            className="object-cover object-center"
            loading="lazy"
          />
        </div>
      </div>
      
      <div className="w-full max-w-5xl mx-auto px-4 pb-30">
        {/* Separator */}
        <Separator />

        {/* Middle Section - Two side by side */}
        <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto_1fr] gap-0 items-stretch">
          <div className="flex items-stretch pt-10">
            <div className="w-full">
              <h2 className="text-2xl sm:text-3xl font-medium mb-2">Production‑grade<br/>Data ETL</h2>
              <p className="max-w-full mb-6 mt-8">
            We design and operate resilient ETL pipelines that collect data from your core systems, clean and standardize it, and deliver fast, trusted tables to your warehouse and BI. Built for reliability, observability and scale.
          </p>
          <div className="relative">
            <div className="rounded-3xl p-2 border border-border/70">
              <div
                className="relative rounded-2xl pt-5 pl-5 border border-border bg-gradient-to-b from-foreground/3 to-transparent dark:from-foreground/5 dark:to-transparent bg-white/60 dark:bg-white/0 p-5 overflow-hidden"
                aria-hidden="true"
              >

                  <h2 className="text-lg font-semibold">Pipeline Overview</h2>
                  <div className="h-[22px]" />
                  <div className="flex flex-col gap-4">
                    {/* Stages */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Stages</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-yellow-400" />
                          Extract
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-gradient-to-r from-yellow-400 to-green-500" />
                          Transform
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500" />
                          Load
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
                          <img src="/Snowflake.svg" alt="Snowflake Warehouse" className="h-5 w-auto" />
                          <span>Warehouse</span>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <img src="/PostGres.svg" alt="Postgres Operational Store" className="h-5 w-auto" />
                          <span>Operational Store</span>
                        </span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">
                          <img src="/PBI.svg" alt="Power BI Dashboards" className="h-5 w-auto" />
                          <span>BI Dashboards</span>
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
          <div className="hidden md:flex items-stretch justify-center">
            <Separator orientation="vertical" className="h-full w-px" />
          </div>
          <div className="flex items-stretch">
            <div className="w-full">
                  <h3 className="text-xl font-semibold text-foreground">Orchestration & Monitoring</h3>
                  <div className="h-[16px]" />
                  <p className="text-sm text-foreground/80 leading-relaxed">
                    Pipelines are scheduled, versioned and observable. We implement dependency‑aware orchestration and push metrics and alerts across your stack to guarantee SLAs. From retries and idempotency to lineage and data tests, your ETL is production‑ready.
                  </p>
                
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Bottom Section */}
        <div className="h-[150px] flex items-center justify-center">
          <h2 className="text-2xl font-bold text-foreground">Data Quality & Governance</h2>
        </div>
      </div>
    </div>
  )
}