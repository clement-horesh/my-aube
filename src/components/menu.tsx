export function Menu() {
  return (
    <nav className="w-full flex items-center justify-between py-4 px-6 sm:px-8 lg:px-12">
      {/* Logo */}
      <div className="flex items-center">
        <span className="text-xl font-bold bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Aube
        </span>
      </div>

      {/* Navigation Items */}
      <div className="flex items-center space-x-6">
        <a 
          href="#overview" 
          className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          Overview
        </a>
        <a 
          href="#core" 
          className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          Core
        </a>
        <a 
          href="#contact" 
          className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
        >
          Contact
        </a>
      </div>
    </nav>
  );
} 