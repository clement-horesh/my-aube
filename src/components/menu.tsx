"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Menu() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/20' 
        : 'bg-transparent'
    }`}>
      {/* Content container with max-width */}
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl transition-all duration-1000  mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={scrollToTop}
            className="relative w-15 h-8 cursor-pointer"
          >
            <Image
              src="/Asset 1.svg"
              alt="Aube Logo"
              fill
              className="object-contain filter dark:invert"
              priority
            />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => scrollToSection('core-offer')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Overview
          </button>
          <button 
            onClick={() => scrollToSection('latest-work')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            Work
          </button>
          <Button 
            className="cursor-pointer"
          >
            Contact
          </Button>
        </div>
      </div>
    </nav>
  );
} 