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
              {/* Visualization + Control Panel */}
              <div className="flex flex-col flex-1 gap-4 min-w-0">
                {/* Visualization Area (keeps same height as before) */}
                <div className="flex-1 card p-4">
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
              </div>

              {/* Code Panels */}
              <div className="flex flex-col gap-4 w-96 min-w-[24rem]">
                <div className="card shadow flex-1">
                  <CodeViewPanel algorithm={selectedAlgorithm} />
                </div>
                <div className="card shadow flex-1">
                  <CodeEditorPanel algorithm={selectedAlgorithm} />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
