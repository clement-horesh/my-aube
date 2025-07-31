import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Hero Section with Grid Background */}
      <section className="h-screen relative">
        {/* Grid Background - Only for Hero */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to bottom, var(--grid-gradient-start) 0%, transparent 40%),
              linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px),
              linear-gradient(var(--grid-line-color) 1px, transparent 1px)
            `,
            backgroundSize: '100% 100%, 20px 20px, 20px 20px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 90%)',
          }}
        />
        
        {/* Menu Overlay */}
        <Menu />
        
        {/* Hero Content - Centered in viewport */}
        <div className="relative z-10 h-full flex items-center justify-center p-8 sm:p-20">
          <Hero />
        </div>
      </section>
      
      {/* Footer Section - No Grid */}
      <section className="relative z-10">
        <Footer />
      </section>
    </div>
  );
}
