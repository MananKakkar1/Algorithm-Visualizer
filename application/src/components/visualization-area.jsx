"use client";

import { Card } from "./ui/card";
import { useEffect, useState } from "react";

export default function VisualizationArea({ algorithm, isPlaying, speed }) {
  const [array, setArray] = useState([]);
  const [comparing, setComparing] = useState([]);

  useEffect(() => {
    // Generate random array for visualization
    const newArray = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 10
    );
    setArray(newArray);
  }, [algorithm]);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        // Simulate comparison animation
        const idx1 = Math.floor(Math.random() * array.length);
        const idx2 = Math.floor(Math.random() * array.length);
        setComparing([idx1, idx2]);
      }, 1000 - speed * 10);

      return () => clearInterval(interval);
    }
  }, [isPlaying, speed, array.length]);

  return (
    <Card className="flex-1 p-6 card">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">{algorithm}</h2>
        <p className="text-sm text-muted-foreground">
          Visualizing algorithm execution
        </p>
      </div>

      <div className="visualization-bars">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="visual-bar"
            style={{
              height: `${value}%`,
              backgroundColor: comparing.includes(idx)
                ? "hsl(var(--destructive))"
                : "hsl(var(--primary))",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
