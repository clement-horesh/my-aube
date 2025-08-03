"use client"
import { HeroText } from "@/components/hero-text";
import { HeroImage } from "@/components/hero-image";
import { Menu } from "@/components/menu";
import { useTheme } from "@/hooks/use-theme";

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
          <div className="w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl px-4 mx-auto">
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