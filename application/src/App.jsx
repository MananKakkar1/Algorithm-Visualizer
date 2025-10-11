"use client"

import { useState } from "react"
import Navbar from "./components/navbar"
import Sidebar from "./components/sidebar"
import VisualizationArea from "./components/visualization-area"
import ControlPanel from "./components/control-panel"
import CodeViewPanel from "./components/code-view-panel"
import CodeEditorPanel from "./components/code-editor-panel"

export default function App() {
  const [theme, setTheme] = useState("dark")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Bubble Sort")
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="flex h-screen flex-col bg-background text-foreground">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            selectedAlgorithm={selectedAlgorithm}
            onSelectAlgorithm={setSelectedAlgorithm}
          />

          <main className="flex flex-1 flex-col overflow-hidden">
            <div className="flex flex-1 gap-4 p-4 overflow-hidden">
              <div className="flex flex-col flex-1 gap-4 min-w-0">
                <VisualizationArea algorithm={selectedAlgorithm} isPlaying={isPlaying} speed={speed} />
                <ControlPanel
                  isPlaying={isPlaying}
                  onPlayPause={() => setIsPlaying(!isPlaying)}
                  onStep={() => {}}
                  onReset={() => setIsPlaying(false)}
                  speed={speed}
                  onSpeedChange={setSpeed}
                />
              </div>

              <div className="flex flex-col gap-4 w-96">
                <CodeViewPanel algorithm={selectedAlgorithm} />
                <CodeEditorPanel />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
