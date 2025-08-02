"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTheme } from "@/hooks/use-theme";

export function Hero() {
  const { theme, mounted } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center px-4 relative">
      {/* Content */}
      <div className="flex flex-col gap-6 lg:gap-4 max-w-2xl text-left relative z-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
          Build better interfaces with modern components
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          A professionally designed component library for creating beautiful,
          responsive applications that match your brand.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-5">
          <Button className="w-full sm:w-auto">Get Started</Button>
          <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </div>
      </div>
      
      {/* Stacked Card Image */}
      <div className="mt-30 w-full max-w-5xl relative z-20">
        <div className="relative max-w-[91%] mx-auto">
          {/* Background cards for stacked effect - vertical stacking with scaling */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[90%] h-full bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 scale-100"></div>
          <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-[95%] h-full bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 scale-100"></div>

          {/* Main card */}
          <div className="relative bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 p-5">
            <Image
              src="/img/DistributorReport.png"
              alt="Distributor Report"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
              priority
            />
          </div>
        </div>
      </div>
      
      {/* Gradient overlay for the entire hero section - positioned above everything */}
      {mounted && (
        <div 
          className="absolute inset-0 pointer-events-none z-30"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, transparent 35%, ${theme === 'dark' ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)'} 75%)`,
          }}
        />
      )}
    </div>
  );
}
