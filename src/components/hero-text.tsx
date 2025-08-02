"use client"
import { Button } from "@/components/ui/button";

export function HeroText() {
  return (
    <div className="flex flex-col gap-6 lg:gap-4 text-left relative z-20">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl max-w-3xl font-bold bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
        Build better interfaces with modern components
      </h1>
      <p className="text-base sm:text-lg max-w-xl text-muted-foreground leading-relaxed">
        A professionally designed component library for creating beautiful,
        responsive applications that match your brand.
      </p>
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4 mt-5">
        <Button className="w-full sm:w-auto">Get Started</Button>
        <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
      </div>
    </div>
  );
} 