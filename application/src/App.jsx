"use client";

import { useState } from "react";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import VisualizationArea from "./components/visualization-area";
import ControlPanel from "./components/control-panel";
import CodeViewPanel from "./components/code-view-panel";
import CodeEditorPanel from "./components/code-editor-panel";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort");
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={`${theme === "dark" ? "dark" : ""}`}>
      <div className="flex flex-col app-root bg-background text-foreground">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
            <Sidebar
              isOpen={sidebarOpen}
              onToggle={() => setSidebarOpen(!sidebarOpen)}
              selectedAlgorithm={selectedAlgorithm}
              onSelectAlgorithm={setSelectedAlgorithm}
            />
          </div>

          {/* Main Content */}
          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 gap-4 p-4 overflow-hidden">
              {/* Visualization + Control Panel */}
              <div className="flex flex-col flex-1 gap-4 min-w-0">
                <div className="flex-1 card p-4">
                  <VisualizationArea
                    algorithm={selectedAlgorithm}
                    isPlaying={isPlaying}
                    speed={speed}
                  />
                </div>

                <div className="card p-4">
                  <ControlPanel
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    onStep={() => {}}
                    onReset={() => setIsPlaying(false)}
                    speed={speed}
                    onSpeedChange={setSpeed}
                  />
                </div>
              </div>

              {/* Side Panels */}
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
