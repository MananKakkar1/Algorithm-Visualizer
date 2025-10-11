"use client"

import { Button } from "./ui/button"
import { Moon, Sun, Github } from "lucide-react"

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <span className="text-lg font-bold text-primary-foreground">A</span>
        </div>
        <h1 className="text-xl font-bold">Algorithm Visualizer</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
        <Button variant="ghost" size="icon" asChild>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </header>
  )
}


