"use client"

import * as React from "react"
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"

import { Button } from "@/components/ui/button"

export function ThemeToggleDropdown() {
  const { theme, setTheme, mounted } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Sun className="h-4 w-4" />
        <ChevronDown className="h-4 w-4 ml-1" />
      </Button>
    )
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const getThemeLabel = () => {
    switch (theme) {
      case "light":
        return "Light"
      case "dark":
        return "Dark"
      default:
        return "System"
    }
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        {getThemeIcon()}
        <span>{getThemeLabel()}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-card border">
          <div className="py-1">
            <button
              onClick={() => {
                setTheme("light")
                setIsOpen(false)
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              <Sun className="h-4 w-4" />
              Light
            </button>
            <button
              onClick={() => {
                setTheme("dark")
                setIsOpen(false)
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              <Moon className="h-4 w-4" />
              Dark
            </button>
            <button
              onClick={() => {
                setTheme("system")
                setIsOpen(false)
              }}
              className="flex items-center gap-3 w-full px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              <Monitor className="h-4 w-4" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 