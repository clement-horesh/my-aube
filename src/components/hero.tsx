import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="font-sans flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full max-w-6xl px-4 sm:px-6 lg:px-8">
      {/* Content */}
      <div className="flex flex-col gap-6 lg:gap-8 items-start w-full">
        <div className="text-left w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
            Build better interfaces with modern components
          </h1>
          <h2 className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A professionally designed component library for creating beautiful,
            responsive applications that match your brand.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <Button className="w-full sm:w-auto">Get Started</Button>
          <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </div>
      </div>

      {/* Image Placeholder - always last on mobile, right on desktop */}
      <div className="flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
        <div className="w-full max-w-sm lg:max-w-md h-64 sm:h-72 lg:h-80 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <div className="text-3xl lg:text-4xl mb-2">🖼️</div>
            <p className="text-sm">Image Placeholder</p>
            <p className="text-xs opacity-70">Add your hero image here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
