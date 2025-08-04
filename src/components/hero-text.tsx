"use client"
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function HeroText() {
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