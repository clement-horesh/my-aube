"use client"

import { useEffect, useState } from "react";
import Image from "next/image";

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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/20' 
        : 'bg-transparent'
    }`}>
      {/* Content container with max-width */}
      <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto flex items-center justify-between py-3 px-4">
        {/* Logo */}
        <div className="flex items-center">
          <div className="relative w-15 h-8">
            <Image
              src="/Asset 1.svg"
              alt="Aube Logo"
              fill
              className="object-contain filter dark:invert"
              priority
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          <a 
            href="#overview" 
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Overview
          </a>
          <a 
            href="#core" 
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Core
          </a>
          <a 
            href="#contact" 
            className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
} 