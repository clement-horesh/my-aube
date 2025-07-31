import { Hero } from "@/components/hero";
import { Footer } from "@/components/footer";
import { Menu } from "@/components/menu";

export default function Home() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <Menu />
      <main className="flex-1 grid grid-rows-[1fr_auto] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20">
        <div className="flex justify-center items-center">
          <Hero />
        </div>
        <Footer />
      </main>
    </div>
  );
}
