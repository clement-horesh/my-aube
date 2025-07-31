import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="font-sans grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full max-w-6xl relative">
      {/* Gradient Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, var(--grid-gradient-start) 0%, transparent 100%),
            linear-gradient(90deg, var(--grid-line-color) 1px, transparent 1px),
            linear-gradient(var(--grid-line-color) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 20px 20px, 20px 20px',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-[32px] items-start">
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
            Build better interfaces with modern components
          </h1>
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

      {/* Right Column - Image Placeholder */}
      <div className="relative z-10 flex justify-center lg:justify-end">
        <div className="w-full max-w-md h-80 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-2">🖼️</div>
            <p className="text-sm">Image Placeholder</p>
            <p className="text-xs opacity-70">Add your hero image here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
