import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Menu } from "@/components/menu";
import { CarouselDemo } from "@/components/caroussel";
import { TrustedBy } from "@/components/trusted-by";

export default function Home() {
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
          <Hero />
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="relative z-10 py-16">
        <TrustedBy />
      </section>

      {/* Carousel Section */}
      <section className="relative z-10 py-16">
        <CarouselDemo />
      </section>
      
      {/* Footer Section - No Grid */}
      <section className="relative z-10">
        <Footer />
      </section>
    </div>
  );
}
