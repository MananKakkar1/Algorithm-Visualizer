"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import VisualizationArea from "./components/visualization-area";
import ControlPanel from "./components/control-panel";
import CodeViewPanel from "./components/code-view-panel";
import CodeEditorPanel from "./components/code-editor-panel";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [stepTick, setStepTick] = useState(0);
  const [resetTick, setResetTick] = useState(0);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  // Sync theme globally
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="flex flex-col app-root bg-background text-foreground min-h-screen">
        {/* Navbar */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar — always visible, sticky */}
          <div
            className="sidebar"
            style={{
              width: "260px",
              backgroundColor: "#0b1220",
              borderRight: "1px solid #1c2333",
              color: "#e0e0ff",
              position: "sticky",
              top: "0",
              height: "calc(100vh - 60px)", // below navbar
              overflowY: "auto",
              scrollbarWidth: "none",
              flexShrink: 0,
            }}
          >
            <Sidebar
              isOpen={true} // Always open
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
            />
          </div>

          {/* Main Content */}
          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 gap-4 p-4 overflow-hidden">
              {/* Left main column (full width next to sidebar) */}
              <div className="flex flex-col flex-1 gap-4 min-w-0">
                {/* Visualization Area — increased height */}
                <div
                  className="card p-4"
                  style={{
                    flex: "0 0 auto",
                    height: "420px", // visualization height
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <VisualizationArea
                    algorithm={selectedAlgorithm}
                    isPlaying={isPlaying}
                    speed={speed}
                    stepTick={stepTick}
                    resetTick={resetTick}
                  />
                </div>

                {/* Control Panel */}
                <div className="card p-4">
                  <ControlPanel
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    onStep={() => setStepTick((s) => s + 1)}
                    onReset={() => {
                      setIsPlaying(false);
                      setResetTick((r) => r + 1);
                    }}
                    speed={speed}
                    onSpeedChange={setSpeed}
                  />
                </div>

                {/* NEW: Two-panels row under control panel (50% / 50%) */}
                <div
                  className="cardless-row"
                  style={{
                    display: "flex",
                    gap: "16px",
                    width: "100%",
                    alignItems: "stretch",
                    minWidth: 0,
                  }}
                >
                  {/* Pseudocode / Code View */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: "1px solid #1c2333",
                      borderRadius: "10px",
                      backgroundColor: "#0b1220",
                      display: "flex",
                    }}
                  >
                    <CodeViewPanel algorithm={selectedAlgorithm} />
                  </div>

                  {/* Code Editor */}
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      border: "1px solid #1c2333",
                      borderRadius: "10px",
                      backgroundColor: "#0b1220",
                      display: "flex",
                    }}
                  >
                    <CodeEditorPanel algorithm={selectedAlgorithm} />
                  </div>
                </div>
              </div>

              {/* (Removed previous right-side column) */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
