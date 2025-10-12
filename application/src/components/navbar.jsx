"use client";

import { Button } from "./ui/button";
import { Moon, Sun, Github } from "lucide-react";

export default function Navbar({ theme, toggleTheme }) {
  return (
    <header
      className="navbar"
      style={{
        backgroundColor: "#0b1220",
        borderBottom: "1px solid #1c2333",
        padding: "12px 6vw", // ⬅️ balanced left & right spacing (6% of viewport)
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left side: logo + title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          flexShrink: 0,
        }}
      >
        {/* <div
          className="navbar logo"
          aria-hidden
          style={{
            backgroundColor: "#1a1f3b",
            border: "1px solid #3b2a6f",
            color: "#b39aff",
            borderRadius: "8px",
            width: "38px",
            height: "38px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "17px",
            flexShrink: 0,
          }}
        >
          A
        </div> */}
        <h1
          style={{
            fontSize: "21px",
            fontWeight: "600",
            color: "#e0e0ff",
            letterSpacing: "0.4px",
            whiteSpace: "nowrap",
          }}
        >
          Algorithm Visualizer
        </h1>
      </div>

      {/* Right side: icons */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexShrink: 0,
        }}
      >
        {/* <Button
          variant="ghost"
          size="icon"
          className="btn--ghost btn--icon"
          onClick={toggleTheme}
          style={{
            backgroundColor: "#1a1f3b",
            border: "1px solid #3b2a6f",
            borderRadius: "6px",
            width: "38px",
            height: "38px",
            color: "#b39aff",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5a3fc0";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1f3b";
            e.currentTarget.style.color = "#b39aff";
          }}
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button> */}

        {/* <Button
          variant="ghost"
          size="icon"
          className="btn--ghost btn--icon"
          asChild
          style={{
            backgroundColor: "#1a1f3b",
            border: "1px solid #3b2a6f",
            borderRadius: "6px",
            width: "38px",
            height: "38px",
            color: "#b39aff",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#5a3fc0";
            e.currentTarget.style.color = "#ffffff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#1a1f3b";
            e.currentTarget.style.color = "#b39aff";
          }}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "inherit",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <Github className="h-5 w-5" />
          </a>
        </Button> */}
      </div>
    </header>
  );
}
