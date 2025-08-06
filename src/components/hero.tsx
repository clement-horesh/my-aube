"use client"
import { Menu } from "@/components/menu";
import { useTheme } from "@/hooks/use-theme";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

function HeroText() {
  return (
    <div className="flex flex-col gap-4 text-center sm:text-left relative z-20">
      <h1 className="text-5xl sm:text-5xl lg:text-6xl max-w-3xl transition-all duration-1000 font-bold bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-gray-400 dark:via-gray-200 dark:to-white bg-clip-text text-transparent leading-none">
      Levez la <span className="bg-gradient-to-r from-pink-300 via-orange-300 to-yellow-300 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(251,146,60,0.3)] dark:drop-shadow-[0_0_10px_rgba(251,146,60,0.4)] animate-[pulse_2s_ease_forwards]">lumière</span> <br/>sur vos données.

      </h1>
      <p className="text-base sm:text-lg max-w-2xl text-muted-foreground transition-all duration-1000 leading-relaxed">
      Transformez vos tableaux bruts en leviers de performance. Du reporting clair aux dashboards interactifs, gagnez en visibilité sur ce qui compte.

      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mx-auto sm:mx-0">
        <Button  className="w-fit">Analysons</Button>
        <Button variant="ghost" className="w-fit">
          Nous Contacter
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

function HeroImage() {
  const [showCard1, setShowCard1] = useState(false);
  const [showCard2, setShowCard2] = useState(false);
  const [showMainCard, setShowMainCard] = useState(false);

  useEffect(() => {
    // Staggered animation timing
    const timer1 = setTimeout(() => setShowCard1(true), 300);
    const timer2 = setTimeout(() => setShowCard2(true), 600);
    const timer3 = setTimeout(() => setShowMainCard(true), 900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="pt-15 sm:pt-20 lg:pt-25 w-full max-w-7xl h-80 sm:h-120 lg:h-150 overflow-hidden relative z-20">
      <div className="relative max-w-[91%] mx-auto">
        {/* Background cards for stacked effect - vertical stacking with scaling */}
        <div 
          className={`absolute -top-2 sm:-top-4 lg:-top-10 left-1/2 transform backdrop-blur-xs -translate-x-1/2 w-[90%] h-full bg-neutral-300/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-600/10 dark:border-neutral-300/10 scale-100 transition-all duration-1000 ease-out ${
            showCard1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        ></div>
        <div 
          className={`absolute -top-1 sm:-top-2 lg:-top-5 left-1/2 transform backdrop-blur-xs -translate-x-1/2 w-[95%] h-full bg-neutral-300/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-600/10 dark:border-neutral-300/10 scale-100 transition-all duration-1000 ease-out ${
            showCard2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        ></div>

        {/* Main card */}
        <div 
          className={`relative bg-neutral-300/50 dark:bg-neutral-800/50 rounded-lg border border-neutral-600/10 backdrop-blur-xs dark:border-neutral-300/10 p-1 sm:p-2 lg:p-5 transition-all duration-1000 ease-out ${
            showMainCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <Image
            src="/img/DistributorReport.png"
            alt="Distributor Report"
            width={800}
            height={300}
            className="w-full h-auto border border-neutral-600/10 dark:border-neutral-300/30 rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { theme, mounted } = useTheme();

  return (
    <section className="relative">
      {/* Grid Background - Only for Hero */}
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
      
      {/* Menu Overlay */}
      <Menu />
      
      {/* Hero Content - With appropriate top padding for menu */}
      <div className="relative z-20 pt-32 ">
        <div className="flex flex-col items-center  relative">
          {/* Text Content - Limited to 5xl width and centered */}
          <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl transition-all duration-1000 xl:max-w-5xl px-4 mx-auto">
            <HeroText />
          </div>
          
          {/* Image Content */}
          <HeroImage />
          
          {/* Gradient overlay for the entire hero section - positioned above everything */}
          {mounted && (
            <div 
              className="absolute inset-0 pointer-events-none z-30"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, transparent 60%, ${theme === 'dark' ? 'rgba(10, 10, 10, 1)' : 'rgba(255, 255, 255, 1)'} 100%)`,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
} 