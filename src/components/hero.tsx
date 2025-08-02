import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <div>
      {/* Content */}
      <div className="flex flex-col gap-6 lg:gap-8 w-full max-w-150 text-center justify-center">
        <div className="text-center w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 lg:mb-4 bg-gradient-to-r from-black via-gray-700 to-gray-500 dark:from-white dark:via-gray-200 dark:to-gray-400 bg-clip-text text-transparent leading-tight">
            Build better interfaces with modern components
          </h1>
          <h2 className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            A professionally designed component library for creating beautiful,
            responsive applications that match your brand.
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-center">
          <Button className="w-full sm:w-auto">Get Started</Button>
          <Button variant="outline" className="w-full sm:w-auto">Learn More</Button>
        </div>
      </div>
      
      {/* Image */}
      <div className="flex justify-center mt-20 w-full">
        <div className="w-full max-w-5xl lg:max-w-6xl">
          <div className="bg-gray-300/50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-gray-600/30 dark:border-gray-300/30">
            <div className="bg-gray-300/50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-gray-600/30 dark:border-gray-300/30">
              <div className="bg-gray-300/50 dark:bg-gray-800/50 p-2.5 rounded-lg border border-gray-600/30 dark:border-gray-300/30">
                <Image
                  src="/img/DistributorReport.png"
                  alt="Distributor Report"
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
