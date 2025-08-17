"use client"

import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function GradientSection() {
  return (
    <div id="core-offer" className="w-full bg-gradient-to-b from-neutral-100 to-neutral-0 dark:from-neutral-900 dark:to-neutral-950" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 lg:px-4 pt-50 pb-30">
        <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-[538] tracking-[-0.0325em]">Turning Data Analysis<br/> into Business Value</h1>
        
        {/* Top Section */}

          <p className="max-w-full md:max-w-[60%] text-foreground/50 mb-6 mt-5">
          We deliver high-impact data analysis solutions that aredesigned, implemented, and operated by our expert consultants. We turn raw data into clear and actionable insights, helping you spot patterns, make informed decisions, and maximize your business intelligence. </p>

      </div>
      
      {/* Image section that extends beyond container width */}
      <div className="w-full -mt-40 mb-2">
        <div 
          className="relative w-full max-w-7xl mx-auto h-120 md:h-160 responsive-mask"
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
      
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto px-4 pb-30">
        {/* Separator */}
        <Separator />

        {/* Middle Section - Two side by side */}
        <div className="grid grid-cols-1 md:[grid-template-columns:1fr_auto_1fr] gap-0 items-stretch">
          <div className="flex items-stretch pt-10">
            <div className="w-full">
              <h3 className="text-xl font-semibold text-foreground mb-5">File Automation for Faster Workflows</h3>
              <p className="max-w-full text-foreground/50 mb-10 mr-10">
              We build tailored file automation systems that remove tedious manual work, cut errors, and speed up your operations. Solutions that fit seamlessly into your processes, freeing your team to focus on higher-value work. </p>
              
          <div className="relative">
            <div className="rounded-3xl p-2 border border-border/70">
              <div
                className="relative rounded-2xl pt-5 pl-5 border border-border bg-gradient-to-b from-foreground/3 to-transparent dark:from-foreground/5 dark:to-transparent bg-white/60 dark:bg-white/0 p-5 overflow-hidden"
                aria-hidden="true"
              >

                  <h2 className="text-lg font-semibold">Analysis Automation Flow</h2>
                  <div className="h-[22px]" />
                  <div className="flex flex-col gap-4">
                    {/* Timeline */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Flow</div>
                      <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-violet-600 text-white text-xs font-semibold shadow-sm">1</div>
                          <div>
                            <div className="text-sm font-medium">Gather & Prepare</div>
                            <div className="text-sm text-muted-foreground">Automatically collect from files, apps, and APIs; clean, standardize, and enrich.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-violet-700 text-white text-xs font-semibold shadow-sm">2</div>
                          <div>
                            <div className="text-sm font-medium">Analyze & Detect</div>
                            <div className="text-sm text-muted-foreground">Run scheduled models to compute KPIs, segment data, and flag anomalies or trends.</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-violet-800 text-white text-xs font-semibold shadow-sm">3</div>
                          <div>
                            <div className="text-sm font-medium">Distribute & Notify</div>
                            <div className="text-sm text-muted-foreground">Publish insights to dashboards and docs; send alerts and trigger workflows.</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outcomes */}
                    <div className="grid grid-cols-[120px_1fr] items-start gap-4">
                      <div className="text-sm font-medium text-muted-foreground">Outcomes</div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Fewer errors</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Hours saved</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">Real-time alerts</span>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-border/40 px-3 py-1 text-sm">End-to-end visibility</span>
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
                  <h2 className="text-xl font-medium mb-5 font-semibold sm:mr-0 mr-10">Production‑grade Data ETL</h2>
                  <p className="max-w-full text-foreground/50 mb-10 sm:mr-0 mr-10">
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
        </div>

        {/* Separator */}
        <Separator />

        {/* Bottom Section */}
        <div className="flex flex-col pt-10">
          <h2 className="text-xl font-semibold text-foreground">Business Analyse</h2>
          <p className="max-w-full text-foreground/50 mb-10 mt-5">Ceci est un texte de test</p>
        </div>
      </div>
    </div>
  )
}