"use client";

import { Card } from "./ui/card";
import { useEffect, useMemo, useRef, useState } from "react";

/* ================================
   STEP GENERATORS
   - Bubble: compare/swap
   - Quick:  compare/swap
   - Merge:  compare/set
   Each step uses one of:
   { op: "compare", a, b }
   { op: "swap", i, j }
   { op: "set", index, value }
==================================*/

// Bubble Sort
function generateBubbleSteps(arr) {
  const a = arr.slice();
  const steps = [];
  const n = a.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({ op: "compare", a: j, b: j + 1 });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ op: "swap", i: j, j: j + 1 });
      }
    }
  }
  return steps;
}

// Quick Sort
function generateQuickSteps(arr) {
  const a = arr.slice();
  const steps = [];

  function swap(i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }

  function partition(l, r) {
    const pivot = a[r];
    let i = l;
    for (let j = l; j < r; j++) {
      steps.push({ op: "compare", a: j, b: r }); // compare with pivot
      if (a[j] < pivot) {
        if (i !== j) {
          swap(i, j);
          steps.push({ op: "swap", i, j });
        }
        i++;
      }
    }
    if (i !== r) {
      swap(i, r);
      steps.push({ op: "swap", i, j: r });
    }
    return i;
  }

  function quick(l, r) {
    if (l >= r) return;
    const p = partition(l, r);
    quick(l, p - 1);
    quick(p + 1, r);
  }

  quick(0, a.length - 1);
  return steps;
}

// Merge Sort (uses "set" operations)
function generateMergeSteps(arr) {
  const a = arr.slice();
  const steps = [];

  function mergeSort(start, end) {
    if (end - start <= 1) return;
    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = a.slice(start, mid);
    const right = a.slice(mid, end);
    let i = 0, j = 0, k = start;

    while (i < left.length && j < right.length) {
      // visualize comparison of heads
      steps.push({ op: "compare", a: start + i, b: mid + j });

      if (left[i] <= right[j]) {
        a[k] = left[i];
        steps.push({ op: "set", index: k, value: left[i] });
        i++;
      } else {
        a[k] = right[j];
        steps.push({ op: "set", index: k, value: right[j] });
        j++;
      }
      k++;
    }

    while (i < left.length) {
      a[k] = left[i];
      steps.push({ op: "set", index: k, value: left[i] });
      i++; k++;
    }

    while (j < right.length) {
      a[k] = right[j];
      steps.push({ op: "set", index: k, value: right[j] });
      j++; k++;
    }
  }

  mergeSort(0, a.length);
  return steps;
}

/* ================================
   VISUALIZATION COMPONENT
==================================*/

export default function VisualizationArea({
  algorithm,
  isPlaying,
  speed,
  stepTick = 0,
  resetTick = 0,
}) {
  const [sourceArray, setSourceArray] = useState([]);
  const [array, setArray] = useState([]);
  const [active, setActive] = useState([]); // indices being highlighted
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  // Generate a random array on reset
  useEffect(() => {
    const newArray = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100) + 10
    );
    setSourceArray(newArray);
    setArray(newArray.slice());
    setStepIndex(0);
    setActive([]);
  }, [resetTick]);

  // Reset when algorithm changes
  useEffect(() => {
    setStepIndex(0);
    setActive([]);
    setArray(sourceArray.slice());
    setFinished(false);
  }, [algorithm, sourceArray]);

  // Pick steps per algorithm
  const steps = useMemo(() => {
    const name = (algorithm || "").toLowerCase();
    if (name.includes("quick")) return generateQuickSteps(sourceArray);
    if (name.includes("merge")) return generateMergeSteps(sourceArray);
    return generateBubbleSteps(sourceArray);
  }, [sourceArray, algorithm]);

  // Refs for stable playback
  const stepsRef = useRef(steps);
  useEffect(() => { stepsRef.current = steps; }, [steps]);

  const stepIndexRef = useRef(stepIndex);
  useEffect(() => { stepIndexRef.current = stepIndex; }, [stepIndex]);

  // Execute one visualization step
  const doStep = () => {
    const currentIndex = stepIndexRef.current;
    const s = stepsRef.current[currentIndex];
    if (!s) return;

    if (s.op === "compare" || s.compare) {
      // support legacy shape
      const ia = s.a ?? s.i;
      const jb = s.b ?? s.j;
      setActive([ia, jb].filter((v) => v !== undefined));
    } else if (s.op === "swap" || s.swapped) {
      const i = s.i, j = s.j;
      setArray((prev) => {
        const copy = prev.slice();
        [copy[i], copy[j]] = [copy[j], copy[i]];
        return copy;
      });
      setActive([i, j]);
    } else if (s.op === "set" || "value" in s) {
      const idx = s.index ?? s.i;
      setArray((prev) => {
        const copy = prev.slice();
        copy[idx] = s.value;
        return copy;
      });
      setActive([idx]);
    }

    setStepIndex((idx) => {
      const next = idx + 1;
      if (next >= (stepsRef.current?.length ?? 0)) {
        setFinished(true);
        setTimeout(() => setFinished(false), 1500);
      }
      return next;
    });
  };

  // Manual step
  const lastStepTick = useRef(stepTick);
  useEffect(() => {
    if (stepTick !== lastStepTick.current) {
      lastStepTick.current = stepTick;
      doStep();
    }
  }, [stepTick]);

  // Autoplay
  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = Math.max(50, Math.round(2000 - (speed / 100) * (2000 - 50)));
    const id = setInterval(doStep, intervalMs);
    return () => clearInterval(id);
  }, [isPlaying, speed]);

  return (
    <Card
      className="p-5 card"
      style={{
        backgroundColor: "#0b1220",
        border: "1px solid #1c2333",
        borderRadius: "10px",
        color: "#e0e0ff",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 600, marginLeft: 15 }}>{algorithm}</h2>
        <p style={{ fontSize: "13px", color: "#8b8fb3", marginLeft: 15 }}>
          Visualizing algorithm execution
        </p>
      </div>

      {/* Compact visualization area */}
      <div
        className={"visualization-bars" + (finished ? " sorted" : "")}
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          height: "220px",
          backgroundColor: "#111830",
          borderRadius: "8px",
          padding: "10px 6px",
          overflow: "hidden",
        }}
      >
        {array.map((value, idx) => (
          <div
            key={idx}
            className="visual-bar"
            style={{
              flex: 1,
              margin: "0 1px",
              borderRadius: "3px 3px 0 0",
              height: `${value * 1.75}px`,
              backgroundColor: active.includes(idx) ? "#ff4d6d" : "#5a3fc0",
              transition: "height 0.2s, background-color 0.2s",
            }}
          />
        ))}
      </div>
    </Card>
  );
}
