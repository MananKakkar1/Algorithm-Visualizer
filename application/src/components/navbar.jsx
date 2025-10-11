"use client";

import { Button } from "./ui/button";
import { Moon, Sun, Github } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header className="navbar">
      <div className="flex items-center gap-3">
        <div className="navbar logo" aria-hidden>
          <span className="text-lg font-bold text-primary-foreground">A</span>
        </div>
        <h1>Algorithm Visualizer</h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="btn--ghost btn--icon"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Sun className="h-5" />
          ) : (
            <Moon className="h-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="btn--ghost btn--icon"
          asChild
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5" />
          </a>
        </Button>
      </div>
    </header>
  );
}
