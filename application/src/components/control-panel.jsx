"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Slider } from "./ui/slider"
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react"

export default function ControlPanel({ isPlaying, onPlayPause, onStep, onReset, speed, onSpeedChange }) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={onPlayPause}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="outline" onClick={onStep}>
            <SkipForward className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">Speed</span>
          <Slider
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            max={100}
            step={1}
            className="w-32"
          />
        </div>
      </div>
    </Card>
  )
}


