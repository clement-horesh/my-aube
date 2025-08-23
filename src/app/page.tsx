"use client"
import { Footer } from "@/components/footer";
import { CarouselDemo } from "@/components/latest-work";
import { TrustedBy } from "@/components/trusted-by";
import { Hero } from "@/components/hero";
import { GradientSection } from "@/components/core-offer";
import { FeaturedWork } from "@/components/featured-work";

export default function Home() {
  return (
    <main className="font-sans min-h-screen flex flex-col">
      {/* Hero Section */}
      <Hero />

      {/* Trusted By Section */}
      <section className="relative z-10 py-16">
        <TrustedBy />
      </section>



      {/* Gradient Section */}
      <section className="relative z-10">
        <GradientSection />
      </section>

      {/* Carousel Section */}
      <section className="relative z-10">
        <CarouselDemo />
      </section>
      
      {/* Footer Section - No Grid */}
      <section className="relative z-10">
        <Footer />
      </section>
    </main>
  );
}
