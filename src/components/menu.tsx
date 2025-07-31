"use client"

import { useEffect, useState } from "react";

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
    <nav className={`fixed top-0 left-0 right-0 flex items-center justify-between py-4 px-6 sm:px-8 lg:px-12 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-md border-b border-border/20' 
        : 'bg-transparent'
    }`}>
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Aube
        </span>
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
    </nav>
  );
} 