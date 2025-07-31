"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("light")}
        className={theme === "light" ? "bg-accent" : ""}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("dark")}
        className={theme === "dark" ? "bg-accent" : ""}
      >
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">Dark mode</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme("system")}
        className={theme === "system" ? "bg-accent" : ""}
      >
        <Monitor className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        <span className="sr-only">System mode</span>
      </Button>
    </div>
  )
} 