import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="font-sans flex flex-col gap-[32px] items-center sm:items-start max-w-2xl">
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
    </div>
  );
} 