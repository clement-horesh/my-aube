"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroImage() {
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
    <div className="mt-25 w-full max-w-5xl relative z-20">
      <div className="relative max-w-[91%] mx-auto">
        {/* Background cards for stacked effect - vertical stacking with scaling */}
        <div 
          className={`absolute -top-10 left-1/2 transform -translate-x-1/2 w-[90%] h-full bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 scale-100 transition-all duration-1000 ease-out ${
            showCard1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        ></div>
        <div 
          className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-[95%] h-full bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 scale-100 transition-all duration-1000 ease-out ${
            showCard2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        ></div>

        {/* Main card */}
        <div 
          className={`relative bg-gray-300/50 dark:bg-gray-800/50 rounded-lg border border-gray-600/30 dark:border-gray-300/30 p-5 transition-all duration-1000 ease-out ${
            showMainCard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
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
  );
} 