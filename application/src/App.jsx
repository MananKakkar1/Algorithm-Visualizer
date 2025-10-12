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

        <div className="flex flex-1">
          {/* Sticky Scrollable Sidebar with Custom Scrollbar */}
          <div
            className="sidebar"
            style={{
              width: "260px",
              backgroundColor: "#0b1220",
              borderRight: "1px solid #1c2333",
              color: "#e0e0ff",
              position: "sticky",
              top: "60px", // sticks below navbar
              alignSelf: "flex-start",
              height: "calc(100vh - 60px)",
              overflowY: "auto",
              overflowX: "hidden",
              paddingRight: "6px", // avoids scrollbar overlap
              flexShrink: 0,
              zIndex: 10,
              scrollbarWidth: "thin",
              scrollbarColor: "#5a3fc0 #0b1220",
            }}
          >
            <style jsx>{`
              .sidebar::-webkit-scrollbar {
                width: 8px;
              }
              .sidebar::-webkit-scrollbar-track {
                background: #0b1220;
              }
              .sidebar::-webkit-scrollbar-thumb {
                background-color: #5a3fc0;
                border-radius: 6px;
                border: 2px solid #0b1220;
              }
              .sidebar::-webkit-scrollbar-thumb:hover {
                background-color: #7d61ff;
              }
            `}</style>

            <Sidebar
              isOpen={true}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
            />
          </div>

          {/* Main Content */}
          <main className="flex flex-1 flex-col">
            <div className="flex flex-1 gap-4 p-4">
              <div className="flex flex-col flex-1 gap-4 min-w-0">
                {/* Visualization Area */}
                <div
                  className="card p-4"
                  style={{
                    flex: "0 0 auto",
                    height: "420px",
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

                {/* Two-Panel Row (Code View + Editor) */}
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
