import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] items-center sm:items-start max-w-2xl">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold mb-4">Build better interfaces with modern components</h1>
          <h2 className="text-lg text-muted-foreground">
            A professionally designed component library for creating beautiful,
            responsive applications that match your brand.
          </h2>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button>Get Started</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </main>
      
      <footer className="flex gap-[24px] flex-wrap items-center justify-center text-sm text-muted-foreground">
        <span>© 2024 My Aube. All rights reserved.</span>
      </footer>
    </div>
  );
}
