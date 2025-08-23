import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

type SimpleWorkCardProps = {
  href?: string
  title: string
  subtitle?: string
  imageSrc?: string
  imageAlt?: string
}

export function SimpleWorkCard({ href, title, subtitle, imageSrc, imageAlt }: SimpleWorkCardProps) {
  const CardInner = (
    <Card className="group relative overflow-hidden py-0 h-full">
      {/* Background SVG (optional) */}
      {imageSrc ? (
        <div className="absolute inset-0 z-10 overflow-hidden">
          <Image
            src={imageSrc}
            alt={imageAlt ?? ""}
            width={100}
            height={100}
            className="absolute left-1/2 top-[40%] transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-auto opacity-60 grayscale contrast-75 dark:invert"
            priority={false}
          />
        </div>
      ) : null}

      {/* Edge Gradients (mask only background + svg) */}
      <div className="absolute bottom-0 left-0 right-0 h-38 bg-gradient-to-t from-card via-card/90 to-transparent pointer-events-none z-20" />

      <CardContent className="relative flex flex-col aspect-3/4 z-30">
        <div className="flex-1" />
        <div className="pb-6">
          <div className="text-lg font-semibold">{title}</div>
          {subtitle ? (
            <div className="text-sm text-muted-foreground">{subtitle}</div>
          ) : null}
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="p-1">
      {href ? (
        <Link href={href} className="block">
          {CardInner}
        </Link>
      ) : (
        CardInner
      )}
    </div>
  )
}



