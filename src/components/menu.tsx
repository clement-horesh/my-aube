"use client"

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Menu() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

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
          {isHome ? (
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
          ) : (
            <Link href="/" className="relative w-15 h-8 cursor-pointer block">
              <Image
                src="/Asset 1.svg"
                alt="Aube Logo"
                fill
                className="object-contain filter dark:invert"
                priority
              />
            </Link>
          )}
        </div>

        {/* Navigation Items */}
        <div className="flex items-center space-x-6">
          {isHome ? (
            <button 
              onClick={() => scrollToSection('core-offer')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Overview
            </button>
          ) : (
            <Link 
              href="/#core-offer"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Overview
            </Link>
          )}
          {isHome ? (
            <button 
              onClick={() => scrollToSection('latest-work')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Work
            </button>
          ) : (
            <Link 
              href="/#latest-work"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Work
            </Link>
          )}
          <Button asChild className="cursor-pointer">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
} 