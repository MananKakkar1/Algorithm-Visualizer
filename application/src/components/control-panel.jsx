"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";

export default function ControlPanel({
  isPlaying,
  onPlayPause,
  onStep,
  onReset,
  speed,
  onSpeedChange,
}) {
  return (
    <Card
      className="p-4 card"
      style={{
        backgroundColor: "#0b1220", // dark navy background
        border: "1px solid #1c2333", // subtle dark border
        borderRadius: "8px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            className="btn--outline btn--icon"
            onClick={onPlayPause}
            style={{
              backgroundColor: isPlaying ? "#5a3fc0" : "#1a1f3b",
              color: isPlaying ? "#ffffff" : "#b39aff",
              border: "1px solid #3b2a6f",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#5a3fc0";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isPlaying
                ? "#5a3fc0"
                : "#1a1f3b";
              e.currentTarget.style.color = isPlaying ? "#ffffff" : "#b39aff";
            }}
          >
            {isPlaying ? <Pause className="h-4" /> : <Play className="h-4" />}
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="btn--outline btn--icon"
            onClick={onStep}
            style={{
              backgroundColor: "#1a1f3b",
              color: "#b39aff",
              border: "1px solid #3b2a6f",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              transition: "all 0.2s ease",
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
            <SkipForward className="h-4" />
          </Button>

          <Button
            size="icon"
            variant="outline"
            className="btn--outline btn--icon"
            onClick={onReset}
            style={{
              backgroundColor: "#1a1f3b",
              color: "#b39aff",
              border: "1px solid #3b2a6f",
              borderRadius: "6px",
              width: "36px",
              height: "36px",
              transition: "all 0.2s ease",
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
            <RotateCcw className="h-4" />
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <span
            className="text-sm text-muted-foreground"
            style={{ color: "#b0b3c1", fontSize: "0.875rem" }}
          >
            Speed
          </span>
          <Slider
            value={[speed]}
            onValueChange={(value) => onSpeedChange(value[0])}
            max={100}
            step={1}
            className="slider"
            style={{
              width: "130px",
              accentColor: "#5a3fc0", // slider thumb/purple track color
            }}
          />
          <span
            className="text-sm"
            style={{ color: "#b0b3c1", fontSize: "0.875rem" }}
          >
            {speed}
          </span>
        </div>
      </div>
    </Card>
  );
}
