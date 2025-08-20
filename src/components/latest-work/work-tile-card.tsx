import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type WorkTileCardProps = {
  href: string
  title: string
  subtitle: string
  imageSrc: string
  imageAlt: string
}

export function WorkTileCard({ href, title, subtitle, imageSrc, imageAlt }: WorkTileCardProps) {
  return (
    <div className="p-1">
      <Link href={href} className="block">
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
              src={imageSrc}
              alt={imageAlt}
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
                <div className="text-lg font-semibold">{title}</div>
                <div className="text-sm text-muted-foreground">{subtitle}</div>
              </div>
              <div aria-hidden className="inline-flex items-center justify-center rounded-full bg-transparent text-muted-foreground group-hover:bg-muted group-hover:text-foreground transition-colors border border-border/40 w-11 h-11">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}


