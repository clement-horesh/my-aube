"use client"

import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export function GradientSection() {
  return (
    <div id="core-offer" className="w-full bg-gradient-to-b from-neutral-100 to-transparent dark:from-neutral-900 dark:to-transparent" style={{ backgroundSize: '100% 250px', backgroundRepeat: 'no-repeat' }}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-50 pb-30">
        <h1 className="text-[56px] leading-[1.1] font-[538] tracking-[-0.0325em]">Expertize that<br/>skyrockets yours</h1>
        
        {/* Top Section */}
        <div className="h-auto flex flex-col items-left justify-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Data Analyse
          </h2>
          <p className="max-w-full md:max-w-[50%] mb-6">Align your team around a unified data strategy. Plan, manage, and track all analysis initiatives with Aube visual data planning tools.</p>
          <div className="relative w-full h-10">
            <Image
              src="/Section 1.png"
              alt="Data Analysis Section"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Middle Section - Two side by side */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="h-[150px] flex items-center justify-center">
            <h3 className="text-xl font-semibold text-foreground">
              ETL
            </h3>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <Separator orientation="vertical" className="h-[150px]" />
          </div>
          <div className="h-[150px] flex items-center justify-center">
            <h3 className="text-xl font-semibold text-foreground">
              Automation
            </h3>
          </div>
        </div>

        {/* Separator */}
        <Separator />

        {/* Bottom Section */}
        <div className="h-[150px] flex items-center justify-center">
          <h2 className="text-2xl font-bold text-foreground">
          Business Analyse
          </h2>
        </div>
      </div>
    </div>
  )
} 