"use client"
import { Footer } from "@/components/footer";
import { CarouselDemo } from "@/components/caroussel";
import { TrustedBy } from "@/components/trusted-by";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      {/* Hero Section */}
      <Hero />

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
