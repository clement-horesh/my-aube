"use client"
import { HeroText } from "@/components/hero-text";
import { HeroImage } from "@/components/hero-image";
import { Footer } from "@/components/footer";
import { Menu } from "@/components/menu";
import { CarouselDemo } from "@/components/caroussel";
import { TrustedBy } from "@/components/trusted-by";
import { useTheme } from "@/hooks/use-theme";

export default function Home() {
  const { theme, mounted } = useTheme();

  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Hero Section with Grid Background */}
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
        <div className="relative z-20 h-250 pt-32 overflow-hidden">
          <div className="flex flex-col items-center px-4 relative">
            {/* Text Content - Limited to 5xl width and centered */}
            <div className="w-full max-w-5xl mx-auto">
              <HeroText />
            </div>
            
            {/* Image Content */}
            <HeroImage />
            
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
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative z-10 py-16">
        <TrustedBy />
      </section>

      {/* Carousel Section */}
      <section className="relative mt-40 z-10 py-16">
        <CarouselDemo />
      </section>
      
      {/* Footer Section - No Grid */}
      <section className="relative z-10">
        <Footer />
      </section>
    </div>
  );
}
